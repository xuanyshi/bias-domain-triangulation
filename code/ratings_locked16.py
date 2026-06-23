#!/usr/bin/env python3
"""Re-rate B2/B3 by CONSTRUCT-COUNTING under the locked 16-confounder mapping (medium granularity).
Non-destructive: reads the existing Node Detail; writes ONLY into 09_trackB_integration_20260611/.
B1 is left to the records file in the meta (design-gated, unchanged). We recompute B2 and B3.

Rubric (locked, construct-counting):
  B2 (5 constructs): infection_fever, pain_headache, chronic_conditions, concomitant_meds, metabolic_adiposity
     Strong >=3/5 ; Moderate 1-2 ; Weak 0.    (obstetric complications -> mediator, excluded)
  B3 (8 constructs): ses, demographic_regional, lifestyle_substance, psychosocial_stress,
     maternal_demographic, reproductive_parity, family_structure, temporal
     Strong >=4/8 ; Moderate 1-3 ; Weak 0.    (maternal mental health -> B1; healthcare-seeking/environmental
     -> reported-not-scored; mediators/precision excluded)
"""
import os, re, openpyxl
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(os.path.dirname(HERE), "data", "ratings_locked16.xlsx")

# ---- variable-level re-classifier: raw dag_node -> (new_construct, scored_bool, why) ----
# Each rule: (compiled regex on lowercased var, new_construct_key)
# new_construct_key in B2/B3 sets are scored; '_excl:*' are excluded (reason after colon).
B2 = {"infection_fever","pain_headache","chronic_conditions","concomitant_meds","metabolic_adiposity"}
B3 = {"ses","demographic_regional","lifestyle_substance","psychosocial_stress",
      "maternal_demographic","reproductive_parity","family_structure","temporal"}

def classify(var):
    raw = var.lower()
    if "_x_" in raw: return None, False, "excluded: interaction/product term"
    v = " " + re.sub(r"[^a-z]+", " ", raw).strip() + " "
    def has(p): return re.search(p, v) is not None
    # ---- EXCLUSIONS first (order: specific exclusions before scored constructs) ----
    if has(r"birth ?weight|birthweight|\bbw\b|low birthweight|child weight|apgar|preterm|premature|\bsga\b|small for gest|ges age|gest age|gestational age|delivery type|birth mode|labor type|malpresent|rupture membrane|premature contraction|comorbid perinatal"):
        return None, False, "mediator: perinatal"
    if has(r"breastfe|breast milk|breastfed|lactation"): return None, False, "mediator: lactation"
    if has(r"preeclamp|eclampsia|gestational diabet|ges diabet|antepartum hemorrhage|placental|threatened misc"):
        return None, False, "mediator: current-pregnancy obstetric complication (Decision A)"
    # post-exposure (postnatal) stress measures are downstream, not pre-exposure confounders
    if (has(r"\bpss\b|stress")) and has(r"infan|early childhood|\bslas\b|postnatal|post natal"):
        return None, False, "excluded: post-exposure (postnatal) stress measure"
    if has(r"child sex|infant sex|offspring sex|baby gender|\bsex\b|child age|age assessment|age at assessment|age at test|age last visit|age months|quality of test|tester|resting state|celltype|brain connectivity|motor impairment|externaliz|internaliz|temperament|communication problem|child activity|child microbiome|child lead"):
        return None, False, "precision / child outcome / measurement"
    if has(r"\bapap\b|paracetamol|acetaminophen"): return None, False, "exposure / negative-control (B1)"
    if has(r"paternal|partner(?! status)"): return None, False, "B1 negative-control / paternal"
    if has(r"depress|anxiet|psychiatr|psychi|antidepress|\bssri\b|\bsnri\b|antipsychot|epds|\bscl\b|mental|mood|distress|benzodiazepine|psych"):
        return None, False, "-> B1 maternal psychiatric (records B1, not B3)"
    if has(r"\badhd\b|\basd\b|maternal asd|autis|intellectual dis|neurodev|polygenic|\bprs\b|genetic risk|genetic prs|familial confound|family history|raven|behavior score|\biq\b|cognit"):
        return None, False, "-> B1 familial/neurodev proxy"
    if has(r"antenatal visit|emergency visit|healthcare visit|prenatal visit|prenatal care|care visit|drug coverage|insurance coverage|number of visit|antenatal care|gp visit|obstetrician followup|health care util|medical care"):
        return None, False, "reported-not-scored: healthcare-seeking"
    if has(r"domestic chemical|cleaning chem|occ exp|occupational|pesticide|pollut|\blead\b|phthalate|solvent|air pollut|\bnoise\b|endocrine disrupt|organic eating"):
        return None, False, "reported-not-scored: environmental/occupational"
    if has(r"general health|poor health|self rated health|maternal health late|underlying disease|\bindigestion\b"):
        return None, False, "excluded: non-specific health, not a named pre-existing chronic condition"
    if has(r"beadchip|bisulfite|microbiome|methylation|\bcd\b|\bplate\b|home score|home size|inclusion|participation|missing baseline|selection|ipsw|ipw|unmeasured confound|family problem"):
        return None, False, "excluded: biomarker / selection / other"
    # ---- B2 (concomitant meds checked FIRST so anti-* drugs are not mis-routed to infection/chronic) ----
    if has(r"\bmed\b|meds|medication|nsaid|antibiotic|aspirin|anti ?inflamm|antiepilept|antiseizure|analges|folic|folate|supplement|vitamin|vaccin|opioid|ibuprofen|stimulant|antimigraine|triptan|co medication"):
        return "concomitant_meds", True, "B2 concomitant meds"
    if has(r"fever|infection|infect|\bcold|colds|\bflu\b|influenza|covid|sars|urinary|\buti\b|chorioamnion|\bcrp\b|interleukin"):
        return "infection_fever", True, "B2 infection/fever"
    if has(r"\bpain\b|painkiller|headache|migraine|muscle joint|back pain|abdominal pain"):
        return "pain_headache", True, "B2 pain/headache"
    if has(r"\bbmi\b|body mass|obesit|adiposit|overweight|weight gain|maternal weight|\bhdl\b|dyslipid"):
        return "metabolic_adiposity", True, "B2 metabolic/adiposity"
    if has(r"asthma|epilep|autoimmune|rheumatoid|hypertens|\bdiabetes\b|maternal diabetes|chronic illness|chronic disease|chronic autoimmune|thyroid|lupus|\bsle\b|inflammatory bowel|infectious disease|chronic"):
        return "chronic_conditions", True, "B2 chronic conditions"
    # ---- B3 ----
    if has(r"smok|tobacco|alcohol|drink|caffeine|coffee|cannabis|illicit|illegal drug|drug abuse|recreational|substance|healthy diet|diet score|\bdiet\b|nutrition"):
        return "lifestyle_substance", True, "B3 lifestyle/substance"
    if has(r"stress|\bpss\b|adversit|life event|life crisis|social support|violence|\babuse\b"):
        return "psychosocial_stress", True, "B3 psychosocial stress"
    if has(r"\bses\b|socioeconomic|\bincome\b|education|educ|occupation|work situation|wealth|insurance|depriv|neigh|\bschool\b|employ|social class|social standing|nation econom|economic index"):
        return "ses", True, "B3 socioeconomic"
    if has(r"\brace\b|ethnic|skin color|\bcountry\b|\bregion\b|residence|rural|urban|nativ|language|birth location"):
        return "demographic_regional", True, "B3 demographic/regional"
    if has(r"parity|gravid|birth order|older sibling|planned pregnan|reproductive|previous "):
        return "reproductive_parity", True, "B3 reproductive/parity"
    if has(r"marital|cohabit|single p|living with|family structure|partner status"):
        return "family_structure", True, "B3 family structure"
    if has(r"maternal age|\bmat age\b|matenal age|delivery age|age mother|age at deliver|maternal demograph"):
        return "maternal_demographic", True, "B3 maternal demographic (age)"
    if has(r"birth year|period deliver|season|calendar|cohort year"):
        return "temporal", True, "B3 temporal"
    return None, False, "unmatched -> excluded"

def main():
    wb = openpyxl.load_workbook(SRC, data_only=True)
    nd = list(wb["Node Detail"].iter_rows(values_only=True))[1:]
    # per study: sets of B2 and B3 constructs covered
    b2 = defaultdict(set); b3 = defaultdict(set)
    audit = []  # (study, var, old_construct, new_construct, scored, why)
    for r in nd:
        study, var, old_dom, old_con, old_sub = r[0], str(r[1]), r[2], r[3], r[4]
        new_con, scored, why = classify(var)
        if scored and new_con in B2: b2[study].add(new_con)
        elif scored and new_con in B3: b3[study].add(new_con)
        audit.append((study, var, f"{old_dom}|{old_con}", new_con or "-", "Y" if scored else "N", why))

    def level(n, strong, n_total):
        if n >= strong: return "Strong"
        if n >= 1: return "Moderate"
        return "Weak"

    studies = sorted(set(r[0] for r in nd))
    ratings = []
    for s in studies:
        n2, n3 = len(b2[s]), len(b3[s])
        ratings.append((s, n2, level(n2,3,5), sorted(b2[s]), n3, level(n3,4,8), sorted(b3[s])))

    # ---- write ratings xlsx (meta-compatible: first sheet, study + B2_rating + B3_rating) ----
    out = openpyxl.Workbook(); ws = out.active; ws.title = "Domain Ratings"
    ws.append(["study","B1_rating","B2_rating","B2_n","B2_constructs","B3_rating","B3_n","B3_constructs"])
    for s,n2,l2,c2,n3,l3,c3 in ratings:
        ws.append([s, "", l2, n2, "; ".join(c2), l3, n3, "; ".join(c3)])
    aud = out.create_sheet("Variable Audit")
    aud.append(["study","variable","old_domain|construct","new_construct","scored","rationale"])
    for row in audit: aud.append(list(row))
    out_dir = os.path.join(os.path.dirname(HERE), "output")
    os.makedirs(out_dir, exist_ok=True)
    outpath = os.path.join(out_dir, "study_bias_domain_ratings_locked16.xlsx")
    out.save(outpath)
    print("written:", outpath)
    print(f"studies rated: {len(ratings)} | audit rows: {len(audit)}")
    from collections import Counter
    print("B2:", dict(Counter(l for *_,l,_ in [(r[0],r[2]) for r in ratings] if True)) if False else dict(Counter(r[2] for r in ratings)))
    print("B3:", dict(Counter(r[5] for r in ratings)))

if __name__ == "__main__":
    main()
