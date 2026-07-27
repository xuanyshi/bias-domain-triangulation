#!/usr/bin/env python3
"""Build current-39 ratings for construct-granularity and threshold sensitivity.

The medium/primary ratings are the adjudicated ratings in the current source
data. Coarse and fine ratings are deterministic merges/splits of the locked
16-construct mapping. Looser and stricter alternatives change only the
count-based B2/B3 Strong cut-points.
"""

import csv
import os
import re
import sys
from collections import defaultdict

import openpyxl

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
DATA = os.path.join(REPO, "data")
OUT_DIR = os.path.join(REPO, "output", "sensitivity")
META_PATH = os.path.join(DATA, "SourceData_meta_analysis_20260727_B1Strong.xlsx")
COV_PATH = os.path.join(DATA, "SourceData_main_model_covariates_20260723_B1Strong.xlsx")
OUT_PATH = os.path.join(OUT_DIR, "ratings_sensitivity_current39.csv")
AUDIT_PATH = os.path.join(OUT_DIR, "construct_counts_current39.csv")

sys.path.insert(0, HERE)
from ratings_locked16 import B2 as MEDIUM_B2  # noqa: E402
from ratings_locked16 import B3 as MEDIUM_B3  # noqa: E402
from ratings_locked16 import classify  # noqa: E402


COARSE_MAP = {
    "infection_fever": "acute_indication",
    "pain_headache": "acute_indication",
    "chronic_conditions": "chronic_metabolic",
    "metabolic_adiposity": "chronic_metabolic",
    "concomitant_meds": "concomitant_treatment",
    "ses": "socioeconomic_demographic",
    "demographic_regional": "socioeconomic_demographic",
    "lifestyle_substance": "lifestyle",
    "psychosocial_stress": "psychosocial",
    "maternal_demographic": "demographic_reproductive",
    "reproductive_parity": "demographic_reproductive",
    "family_structure": "demographic_reproductive",
    "temporal": "temporal",
}

COARSE_TOTAL = {"B2": 3, "B3": 5}
MEDIUM_TOTAL = {"B2": 5, "B3": 8}
FINE_TOTAL = {"B2": 6, "B3": 10}
PRIMARY_STRONG = {"B2": 3, "B3": 4}
LOOSER_STRONG = {"B2": 2, "B3": 3}
STRICTER_STRONG = {"B2": 4, "B3": 5}


def read_sheet(path, sheet):
    ws = openpyxl.load_workbook(path, read_only=True, data_only=True)[sheet]
    rows = list(ws.iter_rows(values_only=True))
    header = [str(x) for x in rows[0]]
    return [dict(zip(header, row)) for row in rows[1:] if any(x is not None for x in row)]


def split_variables(value):
    return [x.strip() for x in str(value or "").split(";") if x and x.strip()]


def fine_of(medium_construct, variable):
    v = " " + re.sub(r"[^a-z]+", " ", variable.lower()).strip() + " "
    if medium_construct == "chronic_conditions":
        if re.search(r"asthma|autoimmune|rheumatoid|allerg|atop|lupus|\bsle\b|inflammatory bowel", v):
            return "immune_respiratory"
        return "chronic_other"
    if medium_construct == "lifestyle_substance":
        if re.search(r"\bdiet\b|caffeine|coffee|nutrition|organic", v):
            return "diet"
        return "substance"
    if medium_construct == "reproductive_parity":
        if re.search(r"planned|fertility|previous", v):
            return "fertility_planning"
        return "parity"
    return medium_construct


def level(count, strong_cut):
    if count >= strong_cut:
        return "Strong"
    if count >= 1:
        return "Moderate"
    return "Weak"


def classify_row(row):
    sets = {
        "coarse": {"B2": set(), "B3": set()},
        "medium": {"B2": set(), "B3": set()},
        "fine": {"B2": set(), "B3": set()},
    }
    for variable in split_variables(row["main_model_variables"]):
        medium_construct, scored, _ = classify(variable)
        if not scored:
            continue
        domain = "B2" if medium_construct in MEDIUM_B2 else "B3" if medium_construct in MEDIUM_B3 else None
        if domain is None:
            continue
        sets["medium"][domain].add(medium_construct)
        sets["coarse"][domain].add(COARSE_MAP[medium_construct])
        sets["fine"][domain].add(fine_of(medium_construct, variable))
    return sets


def copy_sets(source):
    return {
        granularity: {domain: set(values) for domain, values in domains.items()}
        for granularity, domains in source.items()
    }


def main():
    meta = read_sheet(META_PATH, "Effect estimates")
    covariates = read_sheet(COV_PATH, "Main_model_audit")
    if len(meta) != 39 or len(covariates) != 39:
        raise RuntimeError(f"Expected 39 current estimates; found meta={len(meta)}, covariates={len(covariates)}")

    meta_by_id = {str(row["record_id"]): row for row in meta}
    cov_by_id = {str(row["record_id"]): row for row in covariates}
    if set(meta_by_id) != set(cov_by_id):
        missing_meta = sorted(set(cov_by_id) - set(meta_by_id))
        missing_cov = sorted(set(meta_by_id) - set(cov_by_id))
        raise RuntimeError(f"Record mismatch: missing_meta={missing_meta}; missing_covariates={missing_cov}")

    sets_by_id = {record_id: classify_row(cov_by_id[record_id]) for record_id in meta_by_id}

    # The Okubo within-family rows use the same measured adjustment set as their
    # population counterparts; the family stratum changes B1, not B2/B3.
    for outcome in ("ADHD", "ASD"):
        sibling_id = f"40898607_{outcome}_sib"
        population_id = f"40898607_{outcome}_pop"
        sets_by_id[sibling_id] = copy_sets(sets_by_id[population_id])

    rows = []
    audits = []
    for record_id, meta_row in meta_by_id.items():
        sets = sets_by_id[record_id]
        coarse_b2_n = len(sets["coarse"]["B2"])
        coarse_b3_n = len(sets["coarse"]["B3"])
        medium_b2_n = len(sets["medium"]["B2"])
        medium_b3_n = len(sets["medium"]["B3"])
        fine_b2_n = len(sets["fine"]["B2"])
        fine_b3_n = len(sets["fine"]["B3"])

        coarse_b2 = level(coarse_b2_n, 2)
        coarse_b3 = level(coarse_b3_n, 3)
        fine_b2 = level(fine_b2_n, 3)
        fine_b3 = level(fine_b3_n, 5)

        # This study's inverse-probability weighting included indication-related
        # variables that are not itemised in the compact covariate string.
        if record_id == "36937866_ADHD":
            coarse_b2 = fine_b2 = "Moderate"

        looser_b2 = level(medium_b2_n, LOOSER_STRONG["B2"])
        looser_b3 = level(medium_b3_n, LOOSER_STRONG["B3"])
        stricter_b2 = level(medium_b2_n, STRICTER_STRONG["B2"])
        stricter_b3 = level(medium_b3_n, STRICTER_STRONG["B3"])
        if record_id == "36937866_ADHD":
            looser_b2 = stricter_b2 = "Moderate"

        rows.append(
            {
                "record_id": record_id,
                "pmid": str(meta_row["pmid"]),
                "study": meta_row["study"],
                "condition": meta_row["condition"],
                "B1_rating": meta_row["B1_rating"],
                "coarse_B2_rating": coarse_b2,
                "coarse_B3_rating": coarse_b3,
                "medium_B2_rating": meta_row["B2_rating"],
                "medium_B3_rating": meta_row["B3_rating"],
                "fine_B2_rating": fine_b2,
                "fine_B3_rating": fine_b3,
                "looser_B2_rating": looser_b2,
                "looser_B3_rating": looser_b3,
                "primary_B2_rating": meta_row["B2_rating"],
                "primary_B3_rating": meta_row["B3_rating"],
                "stricter_B2_rating": stricter_b2,
                "stricter_B3_rating": stricter_b3,
            }
        )
        audits.append(
            {
                "record_id": record_id,
                "study": meta_row["study"],
                "condition": meta_row["condition"],
                "coarse_B2_n": coarse_b2_n,
                "coarse_B3_n": coarse_b3_n,
                "medium_B2_n": medium_b2_n,
                "medium_B3_n": medium_b3_n,
                "fine_B2_n": fine_b2_n,
                "fine_B3_n": fine_b3_n,
                "medium_B2_constructs": "; ".join(sorted(sets["medium"]["B2"])),
                "medium_B3_constructs": "; ".join(sorted(sets["medium"]["B3"])),
            }
        )

    os.makedirs(OUT_DIR, exist_ok=True)
    with open(OUT_PATH, "w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)
    with open(AUDIT_PATH, "w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(audits[0]))
        writer.writeheader()
        writer.writerows(audits)

    print(f"Wrote {len(rows)} ratings: {OUT_PATH}")
    print(f"Wrote {len(audits)} construct-count audit rows: {AUDIT_PATH}")


if __name__ == "__main__":
    main()
