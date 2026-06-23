# Supplementary Methods — LLM elicitation prompt for causal-role identification

Prompt used for the large-language-model elicitation of candidate variables and their causal roles
(confounder / mediator / collider) for the prenatal-paracetamol → offspring ASD/ADHD question. Each of
three models (GPT-5.5, Gemini 3.1 Pro, DeepSeek V4 Pro) was queried under three prompting strategies
(A–C below). The shared input block is byte-identical across prompting strategies, so only the prompting strategy
differs; role definitions anchor temporality explicitly (a post-exposure variable cannot be a
confounder). Queries used temperature 0. A construct identified by three models was graded Strong, by
two Moderate, and by one Low.

---

## Shared block (identical in every variant — only the prompting strategy differs)

```
You are an expert in epidemiology and causal inference.

Input:
Exposure: taking paracetamol (acetaminophen) during pregnancy
Outcome: autism spectrum disorder (ASD) diagnosed in the child during childhood
Research question: the effect of taking paracetamol during pregnancy on the risk of
autism spectrum disorder in the offspring.

Your task:
Generate an exhaustive candidate list of third-party variables that may be relevant to
the causal relationship between the exposure and the outcome. Do not provide only the most obvious
variables — think broadly and systematically across all relevant epidemiologic domains.

For each variable, first locate it in time, then assign exactly one causal role.

Temporal position (relative to the exposure = paracetamol use during pregnancy, and the
outcome = ASD diagnosed in childhood):
- pre_exposure: can occur before paracetamol use begins.
- post_exposure_pre_outcome: can only occur after paracetamol use but before ASD diagnosis
  (e.g., gestational age, preterm birth, birth weight, delivery mode, breastfeeding).
- post_outcome: follows the ASD diagnosis.

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
- Prefer specific and measurable variables.

Output only valid JSON in the following format (no prose, no markdown):
{
  "variables": [
    {
      "name": "variable name",
      "timing": "pre_exposure | post_exposure_pre_outcome | post_outcome",
      "role": "confounder | mediator | collider",
      "domain": "short category, e.g. familial/genetic, indication, socioeconomic, lifestyle, perinatal, healthcare access, environmental"
    }
  ]
}
```

---

## Variant A — Zero-shot

Use the shared block exactly as above. No prompting strategy added.

---

## Variant B — Generic chain-of-thought

Append to the shared block, immediately before the "Output only valid JSON" line:

```
Reason through this step by step internally before answering. Do not include your reasoning in
the response — output only the final JSON.
```

---

## Variant C — Framework chain-of-thought

Append to the shared block, immediately before the "Output only valid JSON" line:

```
Framework for causal reasoning — reason internally using these steps; do NOT output the steps:
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
        - consequence of both, or a selection/ascertainment mechanism -> collider
```
