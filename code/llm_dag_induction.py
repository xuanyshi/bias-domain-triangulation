#!/usr/bin/env python3
"""
LLM-DAG v2 runner — query a model with the 5 v2 prompt variants, save raw JSON.
Key is read from ~/.llm_dag_keys.env (never hardcoded, never in the project tree).

Usage:
    python3 code/llm_dag_induction.py A            # run only variant A
    python3 code/llm_dag_induction.py A B C D E    # run several
    python3 code/llm_dag_induction.py all          # run all five
"""
import os, sys, json, time, urllib.request, urllib.error

KEYFILE = os.path.expanduser("~/.llm_dag_keys.env")
HERE    = os.path.dirname(os.path.abspath(__file__))
MODEL   = "deepseek-v4-pro"          # reasoning model
MAXTOK  = 32000
TEMP    = 0

# outcome configs: (long form with abbrev, plain name, short abbrev)
OUTCOMES = {
 "ASD":  ("autism spectrum disorder (ASD)", "autism spectrum disorder", "ASD"),
 "ADHD": ("attention-deficit/hyperactivity disorder (ADHD)", "attention-deficit/hyperactivity disorder", "ADHD"),
}

# ---- load key ----
def load_key(name):
    with open(KEYFILE) as f:
        for line in f:
            line = line.strip()
            if line.startswith(name + "="):
                return line.split("=", 1)[1].strip()
    return ""

# ---------------------------------------------------------------------------
# v2 prompt assembly:  PART1 + SCAFFOLD(variant) + OUTPUT
# ---------------------------------------------------------------------------
def build_part1(outcome="ASD"):
    LONG, PLAIN, SHORT = OUTCOMES[outcome]
    return f"""You are an expert in epidemiology and causal inference.

Input:
Exposure: taking paracetamol (acetaminophen) during pregnancy
Outcome: {LONG} diagnosed in the child during childhood
Research question: the effect of taking paracetamol during pregnancy on the risk of
{PLAIN} in the offspring.

Your task:
Generate an exhaustive candidate list of third-party variables that may be relevant to
the causal relationship between the exposure and the outcome. Do not provide only the most obvious
variables - think broadly and systematically across all relevant epidemiologic domains.

For each variable, first locate it in time, then assign exactly one causal role.

Temporal position (relative to the exposure = paracetamol use during pregnancy, and the
outcome = {SHORT} diagnosed in childhood):
- pre_exposure: can occur before paracetamol use begins.
- post_exposure_pre_outcome: can only occur after paracetamol use but before {SHORT} diagnosis
  (e.g., gestational age, preterm birth, birth weight, delivery mode, breastfeeding).
- post_outcome: follows the {SHORT} diagnosis.

Causal roles:
- confounder: a common cause of BOTH the exposure and the outcome. It is present before the
  exposure and is not caused by the exposure (timing = pre_exposure).
- mediator: a variable on the causal pathway from exposure to outcome. It is caused by the
  exposure and in turn affects the outcome (timing = post_exposure_pre_outcome).
- collider: a variable caused by both the exposure and the outcome, or a selection /
  ascertainment mechanism influenced by both.

Critical rule: a variable that can only arise after the exposure CANNOT be a confounder, even if
prior studies adjusted for it. Use the temporal position to discipline the role assignment.

Rules:
- Do not include the exposure itself or the outcome itself.
- Each variable must have exactly one role.
- Prefer specific and measurable variables."""

OUTPUT = """Output only valid JSON in the following format (no prose, no markdown):
{
  "variables": [
    {
      "name": "variable name",
      "timing": "pre_exposure | post_exposure_pre_outcome | post_outcome",
      "role": "confounder | mediator | collider",
      "domain": "short category, e.g. familial/genetic, indication, socioeconomic, lifestyle, perinatal, healthcare access, environmental"
    }
  ]
}"""

SCAFFOLD = {
"A": "",
"B": """Reason through this step by step internally before answering. Do not include your reasoning in
the response - output only the final JSON.""",
"C": """Framework for causal reasoning - reason internally using these steps; do NOT output the steps:
Step 1. List variables that can directly influence whether the exposure occurs (e.g., indications
        for the medication, maternal health conditions, healthcare access, prescribing behavior,
        sociodemographic and behavioral factors).
Step 2. List variables that can be directly affected by the exposure (biological, physiological,
        pregnancy-related, perinatal, or healthcare consequences occurring after the exposure).
Step 3. List variables that can directly influence whether the outcome occurs (genetic, familial,
        prenatal, perinatal, postnatal, environmental, healthcare, diagnostic, child-level factors).
Step 4. List variables that can be directly affected by the outcome (diagnostic pathways,
        healthcare use, developmental assessment, parental behavior, selection into records).
Step 5. Assign roles:
        - cause of both exposure and outcome  -> confounder
        - consequence of exposure AND cause of outcome -> mediator
        - consequence of both, or a selection/ascertainment mechanism -> collider""",
"D": """Framework for causal reasoning - reason internally using these steps; do NOT output the steps:
Step 1. List variables that can directly influence whether the exposure occurs.
Step 2. List variables that can be directly affected by the exposure.
Step 3. List variables that can directly influence whether the outcome occurs.
Step 4. List variables that can be directly affected by the outcome.
Step 5. Assign roles: cause of both -> confounder; consequence of exposure and cause of outcome ->
        mediator; consequence of both or a selection mechanism -> collider.

Before finalizing, make sure you have considered candidate variables in EACH of the following
epidemiologic domains (a domain may legitimately contain zero variables):
1. Familial / genetic liability (parental neurodevelopmental and psychiatric history, heritable risk)
2. Indication for the medication (infection/fever, pain/headache/migraine, chronic conditions)
3. Maternal physical and metabolic health (BMI/adiposity, diabetes, thyroid, autoimmune)
4. Concomitant medications and healthcare-seeking behavior
5. Socioeconomic position (education, income, occupation, insurance, region/ethnicity)
6. Lifestyle and substance use (smoking, alcohol, illicit drugs, diet, supplements)
7. Psychosocial stress and maternal mental state
8. Reproductive and demographic context (maternal/paternal age, parity, family structure, birth year)
9. Perinatal factors (gestational age, birth weight, delivery mode, breastfeeding)
10. Environmental / occupational exposures (air pollution, pesticides, endocrine disruptors)
11. Ascertainment / selection mechanisms (cohort entry, diagnostic access, follow-up loss)
For each domain, still assign timing and role per the rules above - many perinatal and
ascertainment items will be mediators or colliders, not confounders.""",
"E": """Worked examples (for a DIFFERENT question: maternal smoking during pregnancy -> childhood asthma).
These illustrate the reasoning and output format only; do not copy these variables into your answer.

{
  "variables": [
    { "name": "household socioeconomic status",        "timing": "pre_exposure",              "role": "confounder", "domain": "socioeconomic" },
    { "name": "maternal pre-pregnancy asthma/atopy",   "timing": "pre_exposure",              "role": "confounder", "domain": "maternal health" },
    { "name": "birth weight",                          "timing": "post_exposure_pre_outcome", "role": "mediator",   "domain": "perinatal" },
    { "name": "selection into a cohort with available lung-function testing", "timing": "post_outcome", "role": "collider", "domain": "ascertainment" }
  ]
}

Now answer for the ACTUAL exposure and outcome given in the Input above.""",
}

def build_prompt(v, outcome="ASD"):
    parts = [build_part1(outcome)]
    if SCAFFOLD[v].strip():
        parts.append(SCAFFOLD[v])
    parts.append(OUTPUT)
    return "\n\n".join(parts)

def call_deepseek(prompt, key):
    body = json.dumps({
        "model": MODEL, "temperature": TEMP, "max_tokens": MAXTOK,
        "response_format": {"type": "json_object"},
        "messages": [{"role": "user", "content": prompt}],
    }).encode()
    req = urllib.request.Request(
        "https://api.deepseek.com/chat/completions", data=body,
        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"})
    t0 = time.time()
    with urllib.request.urlopen(req, timeout=600) as r:
        d = json.load(r)
    d["_elapsed_s"] = round(time.time() - t0, 1)
    return d

def main():
    args = [a.upper() for a in sys.argv[1:]] or ["A"]
    outcome = "ASD"
    if args and args[0] in OUTCOMES:
        outcome = args.pop(0)
    if args == ["ALL"] or not args:
        args = ["A", "B", "C", "D", "E"]
    OUTDIR = os.path.join(HERE, "runs_v2_deepseek" + ("" if outcome == "ASD" else "_" + outcome.lower()))
    key = load_key("DEEPSEEK_API_KEY")
    assert key, "DEEPSEEK_API_KEY not set in " + KEYFILE
    os.makedirs(OUTDIR, exist_ok=True)
    print(f"outcome={outcome}  ->  {OUTDIR}")
    tot_in = tot_out = tot_reason = 0
    print(f"{'var':>3} | {'in':>6} | {'out':>6} | {'reason':>6} | {'vars':>5} | {'fin':>6} | {'sec':>5}")
    print("-"*56)
    for v in args:
        prompt = build_prompt(v, outcome)
        d = call_deepseek(prompt, key)
        ch = d["choices"][0]
        content = ch["message"]["content"]
        fin = ch.get("finish_reason")
        u = d.get("usage", {})
        pin = u.get("prompt_tokens", 0); pout = u.get("completion_tokens", 0)
        rt = u.get("completion_tokens_details", {}).get("reasoning_tokens", 0)
        try:
            nvars = len(json.loads(content).get("variables", []))
        except Exception:
            nvars = -1   # unparseable / truncated
        tot_in += pin; tot_out += pout; tot_reason += rt
        with open(os.path.join(OUTDIR, f"v2_{MODEL}_{v}.json"), "w") as f:
            json.dump({"variant": v, "prompt": prompt, "response": d}, f, ensure_ascii=False, indent=2)
        print(f"{v:>3} | {pin:>6} | {pout:>6} | {rt:>6} | {nvars:>5} | {fin:>6} | {d['_elapsed_s']:>5}")
    print("-"*56)
    print(f"TOT | {tot_in:>6} | {tot_out:>6} | {tot_reason:>6}")
    print(f"\nsaved to {OUTDIR}/")
    # token totals for cost estimate
    print(f"\n== token totals ==  input={tot_in}  output={tot_out}  (output incl reasoning={tot_reason})")

if __name__ == "__main__":
    main()
