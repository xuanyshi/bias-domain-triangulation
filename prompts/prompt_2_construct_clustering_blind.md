# Track B — blind construct induction prompt

Purpose: induce Track B's OWN construct taxonomy from the pooled LLM-generated variables,
**independently** of the empirical (Track A) 16-construct scheme. This is the missing Stage-1B step
("Pool and harmonize candidate nodes" → "Background causal candidate graph") in Fig. 1.

Independence is the whole point: the model must NOT be shown, and must NOT reproduce, any
pre-existing classification (no B1/B2/B3, no named confounder taxonomy). The taxonomy must emerge
purely from the variables themselves. The resulting Track-B constructs are later cross-walked
against Track A — convergence = validation, divergence = blind spots / over-adjustment.

Input: `trackB_pooled_variables.json` — 1,357 unique variables, each with `name`, `role`
(confounder/mediator/collider), `timing` (pre_exposure / post_exposure_pre_outcome / post_outcome).
Pooled and de-duplicated across gpt-5.5, deepseek-v4-pro and gemini-3.1-pro (three prompting strategies each) prompt variants.

Run on: gpt-5.5 (and optionally deepseek-v4-pro as a robustness replicate). temperature default
(reasoning), reasoning_effort=medium, response_format=json_object, max_completion_tokens high.

---

## PROMPT

```
You are a causal epidemiologist building a taxonomy from scratch.

Background causal question (context only — do not answer it):
  Exposure  = taking paracetamol (acetaminophen) during pregnancy
  Outcome   = offspring autism spectrum disorder (ASD) and/or attention-deficit/hyperactivity
               disorder (ADHD), diagnosed in childhood

You are given a long list of candidate third-party variables that multiple experts independently
proposed for this exposure-outcome question. Each variable carries a causal role (confounder /
mediator / collider) and a temporal position relative to the exposure and the outcome.

TASK
Inductively derive a parsimonious set of higher-level CONSTRUCTS, purely from these variables.
A CONSTRUCT is one latent causal factor that several specific measured variables are proxies or
instances of (for example, many specific infections, fevers and inflammatory markers all
instantiate a single underlying maternal-infection construct).

INDEPENDENCE - STRICT
- Build the taxonomy ONLY from the variables given.
- Do NOT use, name, or map onto any pre-existing or standard classification scheme, framework,
  or domain labels. Let the structure emerge from the data alone.
- Do not invent variables that are not in the list.

GRANULARITY
- Mid-level constructs, each a distinct causal mechanism or common cause.
- Merge near-synonyms and wording/spelling variants AGGRESSIVELY (e.g. "maternal education level",
  "maternal educational attainment" and "maternal education" are ONE construct member set).
- Split only when two groups are genuinely causally distinct.
- Such taxonomies typically have on the order of 15-40 constructs; choose whatever best fits.

COVERAGE
- Cluster ALL variables regardless of role. Mediators, colliders, and selection / ascertainment
  variables MUST form their own constructs too (do not drop them).

OUTPUT - for each construct give:
  id; name (your own wording); one-sentence causal definition; dominant_role (confounder /
  mediator / collider / mixed); typical_timing (pre_exposure / post_exposure_pre_outcome /
  post_outcome / mixed); example_members = 5-8 representative variable names copied verbatim from
  the input (representative examples only, NOT the full membership).

Output ONLY valid JSON (no prose, no markdown):
{
  "constructs": [
    {"id":"C1","name":"...","definition":"...","dominant_role":"...","typical_timing":"...",
     "example_members":["...","..."]}
  ],
  "optional_super_groups": [ {"name":"...","construct_ids":["C1","C4"]} ]
}

INPUT VARIABLES (name | role | timing):
<<< the 1,357 pooled variables are inserted here, one per line >>>
```

---

## Notes on running

- The prompt asks for 5-8 example members per construct (not full assignment) to avoid output
  truncation. If `finish_reason=length` still occurs, split the input into 2 halves with the SAME
  instruction, induce a taxonomy on each, then reconcile.
- Run the identical prompt on gpt-5.5, deepseek-v4-pro, and gemini-3.1-pro. Their mutual agreement
  is itself a robustness check before crosswalking to Track A.
- `freq` (cross-run consensus count) is deliberately withheld from the model so clustering is driven
  by causal meaning, not popularity; we keep `freq` for later weighting.
