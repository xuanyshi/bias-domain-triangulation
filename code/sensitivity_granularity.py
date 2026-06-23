#!/usr/bin/env python3
"""Granularity sensitivity: re-rate B2/B3 at COARSE (~11, Gemini-like) and FINE (~19, gpt-like)
granularities, by deterministically MERGING / SPLITTING the verified medium-16 construct assignments.
Builds meta-ready ratings drop-ins (clone old schema, swap B2/B3 by PMID). B1 stays canonical (Apr-26)."""
import os, sys, re, openpyxl, shutil
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
RATINGS_DIR = HERE
sys.path.insert(0, RATINGS_DIR)
from ratings_locked16 import classify, SRC, B2 as MED_B2, B3 as MED_B3

OLD = os.path.join(os.path.dirname(HERE), "data", "ratings_locked16.xlsx")
NUM = {"Strong": 3, "Moderate": 2, "Weak": 1}
def pm(s):
    m = re.findall(r"\d{7,8}", str(s)); return m[-1] if m else None

# COARSE: merge medium constructs (Gemini-like ~11)
COARSE = {
 "infection_fever": "acute_indication", "pain_headache": "acute_indication",
 "chronic_conditions": "chronic_metabolic", "metabolic_adiposity": "chronic_metabolic",
 "concomitant_meds": "comeds",
 "ses": "ses_demographic", "demographic_regional": "ses_demographic",
 "lifestyle_substance": "lifestyle", "psychosocial_stress": "psychosocial",
 "maternal_demographic": "demo_reproductive", "reproductive_parity": "demo_reproductive",
 "family_structure": "demo_reproductive", "temporal": "temporal",
}
COARSE_B2 = {"acute_indication", "chronic_metabolic", "comeds"}                 # 3
COARSE_B3 = {"ses_demographic", "lifestyle", "psychosocial", "demo_reproductive", "temporal"}  # 5

def fine_of(med, var):
    """Split medium -> fine (gpt-like ~19) using sub-keywords on the variable."""
    v = " " + re.sub(r"[^a-z]+", " ", var.lower()).strip() + " "
    if med == "chronic_conditions":
        return "immune_respiratory" if re.search(r"asthma|autoimmune|rheumatoid|allerg|atop|lupus|\bsle\b|inflammatory bowel", v) else "chronic_other"
    if med == "lifestyle_substance":
        return "diet" if re.search(r"\bdiet\b|caffeine|coffee|nutrition|organic", v) else "substance"
    if med == "reproductive_parity":
        return "fertility_planning" if re.search(r"planned|fertility|previous", v) else "parity"
    return med
FINE_B2 = {"infection_fever", "pain_headache", "immune_respiratory", "chronic_other", "metabolic_adiposity", "concomitant_meds"}  # 6
FINE_B3 = {"ses", "demographic_regional", "substance", "diet", "psychosocial_stress", "maternal_demographic", "parity", "fertility_planning", "family_structure", "temporal"}  # 10

# thresholds: Strong = >=half, Moderate = >=1, Weak = 0
THRESH = {"coarse": {"B2": 2, "B3": 3}, "medium": {"B2": 3, "B3": 4}, "fine": {"B2": 3, "B3": 5}}
def level(n, strong): return "Strong" if n >= strong else ("Moderate" if n >= 1 else "Weak")

# accumulate per study, per granularity
nd = list(openpyxl.load_workbook(SRC, data_only=True)["Node Detail"].iter_rows(values_only=True))[1:]
sets = {g: {"B2": defaultdict(set), "B3": defaultdict(set)} for g in ("coarse", "medium", "fine")}
for r in nd:
    study, var = r[0], str(r[1])
    med, scored, why = classify(var)
    if not scored: continue
    if med in MED_B2:
        sets["medium"]["B2"][study].add(med)
        sets["coarse"]["B2"][study].add(COARSE[med])
        sets["fine"]["B2"][study].add(fine_of(med, var))
    elif med in MED_B3:
        sets["medium"]["B3"][study].add(med)
        sets["coarse"]["B3"][study].add(COARSE[med])
        sets["fine"]["B3"][study].add(fine_of(med, var))

studies = sorted({r[0] for r in nd if r[0]})
ratings = {g: {} for g in sets}   # g -> pmid -> (B2_level, B3_level)
for g in sets:
    for s in studies:
        p = pm(s)
        if not p: continue
        n2, n3 = len(sets[g]["B2"][s]), len(sets[g]["B3"][s])
        ratings[g][p] = (level(n2, THRESH[g]["B2"]), level(n3, THRESH[g]["B3"]))

# build coarse & fine ratings drop-ins (clone old schema, swap B2/B3 by PMID)
from collections import Counter
out_dir = os.path.join(os.path.dirname(HERE), "output")
os.makedirs(out_dir, exist_ok=True)
for g in ("coarse", "fine"):
    OUT = os.path.join(out_dir, f"ratings_{g}.xlsx"); shutil.copy(OLD, OUT)
    wb = openpyxl.load_workbook(OUT); ws = wb["Domain Ratings"]; h = [c.value for c in ws[1]]
    iB2, iB2n, iB3, iB3n, ist = h.index("B2_rating"), h.index("B2_numeric"), h.index("B3_rating"), h.index("B3_numeric"), h.index("study")
    nsw = 0
    for row in ws.iter_rows(min_row=2):
        if not row[ist].value: continue
        p = pm(row[ist].value)
        if p in ratings[g]:
            b2, b3 = ratings[g][p]
            row[iB2].value = b2; row[iB2n].value = NUM[b2]; row[iB3].value = b3; row[iB3n].value = NUM[b3]; nsw += 1
    wb.save(OUT)
    d2 = Counter(ratings[g][p][0] for p in ratings[g]); d3 = Counter(ratings[g][p][1] for p in ratings[g])
    print(f"[{g}] swapped {nsw} rows | B2 {dict(d2)} | B3 {dict(d3)}")
print("medium (reference):", {p: ratings['medium'][p] for p in list(ratings['medium'])[:1]}, "...")
