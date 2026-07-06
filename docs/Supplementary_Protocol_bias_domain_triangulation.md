# Supplementary Protocol: A reusable bias-domain triangulation framework for non-convergent observational evidence

This protocol sets out the procedure used in the main analysis as a transferable, step-by-step
method, so that it can be applied to other exposure–outcome questions in which observational estimates
fail to converge. Given a body of observational studies that disagree, the protocol aims to identify
which bias structure, rather than which study, accounts for the reported association.

The framework rests on one idea. Most appraisal tools reconstruct a causal structure from the
included studies and then use that same structure to judge those studies, so the instrument and the
object of appraisal are entangled. Bias-domain triangulation instead builds the appraisal instrument
from two independent sources, an empirical audit of what studies adjusted for (Track A) and an
independently generated structure of what should be considered (Track B), partitions the resulting
confounders into a small number of bias domains, scores each study's control within each domain, and
then reads the stratified meta-analysis for a triangulation signature: the association attenuates
along the axis of the bias structure that actually generates it, not with adjustment in general.

Throughout, curly-brace tokens such as {EXPOSURE} and {OUTCOME} are placeholders to be replaced with
the target question.

---

## 0. Scope and prerequisites

Use this protocol when all of the following hold.

1. The evidence is observational and reports ratio-type effect estimates (hazard, risk, or odds
   ratios) that can be pooled on the log scale.
2. Repeated syntheses have not converged, or disagree in direction or magnitude, despite covering a
   similar literature.
3. The exposure is plausibly structured by background liability, clinical indication, health-seeking
   behaviour, or social context, so that confounding is expected to be patterned rather than random.
4. The study pool is heterogeneous in adjustment, and ideally contains at least a few design-based
   studies (for example sibling comparison, family fixed effects, twin, or negative-control designs)
   that can anchor a latent-liability domain.

Inputs required: a defined study pool with extractable main-model adjustment sets and pooled
estimates; access to at least three large language models from independent developers; and a
pre-registered analysis plan. Outputs produced: a locked two-source construct set with causal roles,
a per-estimate bias-domain rating table, a stratified meta-analysis, and a triangulation read-out.

The pipeline has six stages. Stages 1 and 2 run in parallel and must stay blind to each other.

```
Stage 1  Track A  empirical adjustment-set audit        ─┐
                                                          ├─►  Stage 3  Integration and
Stage 2  Track B  independent background DAG (LLMs)      ─┘             causal-role adjudication
                                                                              │
                                          Stage 4  Define bias domains  ◄──────┘
                                                                              │
                                          Stage 5  Score confounding control
                                                                              │
                                          Stage 6  Stratified meta-analysis and
                                                   triangulation read-out
```

---

## 1. Stage 1, Track A: empirical adjustment-set audit

Goal: record what the focal literature actually controlled for, expressed at the level of constructs
so that studies adjusting for different variables remain comparable.

### 1.1 Identify the main adjusted model

For each included study, select the single model whose estimate enters the meta-analysis. This is the
study's primary fully adjusted model as designated by its authors. Extract covariates from that model
only. Exclude variables used solely in sensitivity, stratified, mediation, or selection analyses, and
exclude variables that define a subgroup rather than a covariate. Applying one rule consistently is
more important than the rule itself; the main-model rule keeps the audit from rewarding studies for
adjustments they reported but did not use for their headline estimate.

For sibling-comparison or family-design papers that report both a population-adjusted and a
within-family estimate, record both as separate rows, because they occupy different positions on the
latent-liability domain defined in Stage 4.

### 1.2 Transcribe variables and the estimate

Record, verbatim, the raw covariate list, the pooled point estimate with its confidence interval,
and the effect scale (HR, RR, or OR). Two annotators extract independently from the source PDFs.

### 1.3 Harmonise raw variables into constructs

A construct is a single latent causal factor that several measured variables instantiate or proxy.
For example, parental education, household income, and health-insurance status all index one
socioeconomic-position construct. Map each raw variable onto a construct following a confounder-matrix
logic, so that confounding control can be assessed even when studies adjust for different variable
sets. A construct counts as controlled for a study when any adequate proxy for it is adjusted.

### 1.4 Quality control and adjudication

Quantify inter-annotator agreement: a chance-corrected coefficient (for example Cohen's kappa) for
construct-level coding, and an agreement statistic (for example the intraclass correlation and Lin's
concordance) for effect-size transcription. Resolve every discrepancy by re-checking the source PDF,
escalating unresolved cases to senior adjudication, and analyse the adjudicated dataset throughout.

Output of Stage 1: the Track A construct list, and a per-study vector recording which constructs each
study controlled, alongside the harmonised estimate table.

---

## 2. Stage 2, Track B: independent background DAG via large language models

Goal: derive what should be considered for this exposure and outcome, independently of what the
studies happened to adjust for. Track B must never see the Track A construct list or any bias-domain
labels; independence is what lets convergence between the two tracks count as validation and
divergence count as a blind spot.

### 2.1 Model and reasoning-scaffold matrix

Use at least three large language models from independent developers, which reduces reliance on any
single model's idiosyncrasies. Query each model under three reasoning scaffolds. The reproducible
arm uses temperature 0; an optional high-recall arm repeats each configuration at a higher temperature
across several samples and takes the per-model union, reported separately and never mixed with the
temperature-0 arm.

Two prompts are used in sequence: a per-variable role-induction prompt (Section 2.2), then a blind
construct-clustering prompt (Section 2.3).

### 2.2 Prompt 1: causal-role induction (generalised template)

The shared block is byte-identical across scaffolds; only the reasoning scaffold appended before the
output instruction varies. Replace the placeholders and keep the temporal discipline, which prevents
post-exposure variables from being labelled confounders.

**Shared block**

```
You are an expert in epidemiology and causal inference.

Input:
Exposure: {EXPOSURE, including its timing window, e.g. taking drug X during pregnancy}
Outcome: {OUTCOME, including who and when, e.g. condition Y diagnosed in the child during childhood}
Research question: the effect of {EXPOSURE} on the risk of {OUTCOME}.

Your task:
Generate an exhaustive candidate list of third-party variables that may be relevant to the causal
relationship between the exposure and the outcome. Do not provide only the most obvious variables;
think broadly and systematically across all relevant epidemiologic domains.

For each variable, first locate it in time, then assign exactly one causal role.

Temporal position (relative to the exposure = {EXPOSURE_WINDOW}, and the outcome = {OUTCOME_WINDOW}):
- pre_exposure: can occur before the exposure begins.
- post_exposure_pre_outcome: can only occur after the exposure but before the outcome.
- post_outcome: follows the outcome.

Causal roles:
- confounder: a common cause of BOTH the exposure and the outcome. It is present before the
  exposure and is not caused by the exposure (timing = pre_exposure).
- mediator: a variable on the causal pathway from exposure to outcome. It is caused by the exposure
  and in turn affects the outcome (timing = post_exposure_pre_outcome).
- collider: a variable caused by both the exposure and the outcome, or a selection / ascertainment
  mechanism influenced by both.

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
      "domain": "short self-chosen category, e.g. familial/genetic, indication, socioeconomic, lifestyle, perinatal, healthcare access, environmental"
    }
  ]
}
```

**Scaffold variants** (appended immediately before the "Output only valid JSON" line)

- A. Zero-shot: shared block only, no scaffold.
- B. Generic chain-of-thought:
  ```
  Reason through this step by step internally before answering. Do not include your reasoning in the
  response; output only the final JSON.
  ```
- C. Framework chain-of-thought:
  ```
  Framework for causal reasoning, reason internally using these steps and do NOT output the steps:
  Step 1. List variables that can directly influence whether the exposure occurs.
  Step 2. List variables that can be directly affected by the exposure.
  Step 3. List variables that can directly influence whether the outcome occurs.
  Step 4. List variables that can be directly affected by the outcome.
  Step 5. Assign roles:
          - cause of both exposure and outcome -> confounder
          - consequence of exposure AND cause of outcome -> mediator
          - consequence of both, or a selection / ascertainment mechanism -> collider
  ```
Additional scaffolds (a domain checklist, and few-shot examples drawn from an unrelated
exposure–outcome pair) can raise recall but were not used in the reported analysis.

### 2.3 Prompt 2: blind construct induction (generalised template)

Pool the role-tagged variables across models, scaffolds, and any sub-outcomes, then de-duplicate to a
single candidate list. Have each model induce its own construct taxonomy from that list, still blind
to Track A and to any named classification.

```
You are a causal epidemiologist building a taxonomy from scratch.

Background causal question (context only, do not answer it):
  Exposure = {EXPOSURE}
  Outcome  = {OUTCOME}

You are given a long list of candidate third-party variables that multiple experts independently
proposed for this exposure-outcome question. Each variable carries a causal role (confounder /
mediator / collider) and a temporal position relative to the exposure and the outcome.

YOUR TASK
Inductively group these variables into a parsimonious set of higher-level CONSTRUCTS, purely from
the variables themselves. A CONSTRUCT is a single latent causal factor that several specific measured
variables are proxies or instances of; broader than one measured variable, narrower than a whole
thematic domain.

INDEPENDENCE (STRICT)
- Build the taxonomy ONLY from the variables given.
- Do NOT use, name, or map onto any pre-existing classification scheme, framework, or domain labels.
- Do not invent variables that are not in the list.

GRANULARITY
- Aim for mid-level constructs, each a distinct causal mechanism or common cause.
- As a rough guide expect on the order of 15-35 constructs, but choose whatever number best fits;
  merge near-synonyms aggressively, split only when two groups are genuinely causally distinct.
- Cluster ALL variables regardless of role; mediators, colliders, and selection variables must form
  their own constructs too.

FOR EACH CONSTRUCT report: a short descriptive name; a one-sentence causal definition; dominant_role
(confounder / mediator / collider / mixed); typical_timing (pre_exposure / post_exposure_pre_outcome
/ post_outcome / mixed); and member_variables (every input variable assigned to exactly one construct).

Output ONLY valid JSON (no prose, no markdown):
{
  "constructs": [
    { "id": "C1", "name": "...", "definition": "...", "dominant_role": "...",
      "typical_timing": "...", "member_variables": ["...", "..."] }
  ],
  "optional_super_groups": [ { "name": "...", "construct_ids": ["C1", "C4"] } ]
}

INPUT VARIABLES (name | role | timing):
<<< the pooled candidate variables are inserted here, one per line >>>
```

Cross-run consensus counts are withheld from the model so that clustering is driven by causal meaning
rather than popularity; consensus is kept for later weighting. If the output truncates, split the
input, induce a taxonomy on each half, then reconcile, or switch to a taxonomy-only pass followed by a
cheap second classification pass that assigns every variable to the induced taxonomy.

Output of Stage 2: several independently induced Track B taxonomies (kept as replicates) and the
pooled candidate variables tagged with role and timing.

---

## 3. Stage 3: Integration and causal-role adjudication

Goal: reconcile the two tracks into one locked construct set in which every construct carries an
agreed causal role and a domain assignment.

1. Adopt the most complete Track B taxonomy as the spine after verifying that it contains a semantic
   equivalent of every construct in the other replicates. Keep the other taxonomies as alternative
   granularities for sensitivity analysis (Stage 5).
2. Cross-walk Track B onto Track A by semantic correspondence. Label each construct convergent (present
   in both tracks), blind-spot (Track B only), or role-conflicting (a different causal role across
   tracks). Convergence is evidence of construct validity; a blind spot is a confounder that theory
   flags but the focal literature rarely measures.
3. Adjudicate each construct's causal role against pre-specified admissibility criteria: temporality
   (is it pre-exposure?), biological or causal plausibility, back-door relevance (does it open a
   confounding path?), adjustment admissibility (it must not be a mediator, collider, or instrument),
   and cross-source concordance.
4. Separate core from non-core. Core constructs are pre-exposure common causes of both exposure and
   outcome; only these are scored. Non-core constructs (mediators, colliders, instruments, and
   precision or outcome-only covariates) stay in the matrix for transparency but are excluded from
   scoring. Track-B-only blind spots that the focal literature almost never measures are reported as
   candidate unmeasured structures but not scored, because no study would receive credit for them.

Adjudication commonly produces refinements worth logging explicitly, for example splitting a causally
heterogeneous label (a variable whose pre-exposure form is a confounder but whose during-exposure form
is a mediator) into separate constructs, or splitting a health-utilisation label into a pre-exposure
seeking-propensity confounder and a post-outcome ascertainment collider.

Output of Stage 3: the locked core confounder set with roles, plus the non-core and blind-spot
constructs recorded for transparency.

---

## 4. Stage 4: Defining bias domains for any problem

Goal: group the core confounders into bias domains. Domains, not individual constructs, are the unit
of stratification.

The scheme is not unique. Neither the number of domains nor the way constructs are partitioned among
them is fixed: it is a pre-registered modelling choice that trades attribution against power. A finer
scheme localises bias to a more specific axis but spreads the estimates thinly across strata; a
coarser scheme is better powered but attributes bias more bluntly. A handful of domains, often two to
four, is usually a workable balance, and the choice should be tested for robustness by re-running
under coarser and finer schemes (Stage 5).

**What generalises** is the organising principle, not a fixed list or a fixed count. Place two
constructs in the same domain when they share both (i) a bias-generating mechanism, the reason they
open a back-door path, and (ii) the means required to close that path, whether design or measurement.
The one invariant is to separate the latent or structural common causes, which can be addressed only
by design (a sibling or fixed-effects comparison, a negative control, and so on), from the measured
common causes that regression can adjust; within the measured set, the partition into mechanism-based
domains is itself one reasonable scheme among several.

The content of each domain is problem-specific. In particular, the latent domain is shared familial
and genetic liability for a heritable outcome such as the one studied here, but it may instead be a
shared environment, a clinic or site, a region, or a secular time trend in other questions, where
familial and genetic liability need not appear at all. The archetypes below recur across questions,
organised by the control mechanism that generalises.

| Domain archetype | What it captures (content is problem-specific) | How it is closed | Control |
|---|---|---|---|
| Latent or structural common cause | Unmeasured shared causes regression cannot reach, e.g. familial or genetic liability (heritable outcomes), shared environment, clinic, site or region, or secular time trend | Differenced out by design (sibling, twin, family or unit fixed effects, negative-control) | Design |
| Drivers of exposure assignment | Why the exposure occurs: clinical indication, channeling, provider behaviour, selection into exposure, reverse-causation drivers | Measured and adjusted | Measurement |
| Background context | Broad observed background: socioeconomic position, demographics, lifestyle, psychosocial factors | Measured and adjusted with standard regression | Measurement |

These three rows are a common pattern, not a required count: a question may use as few as two domains
(latent versus measured) or more. The instantiation used in this study (B1 familial/genetic liability,
B2 clinical indication and maternal health, B3 social-behavioural context) is one scheme among
several.

Output of Stage 4: each core construct assigned to exactly one bias domain, with the assignment
pre-registered.

---

## 5. Stage 5: Scoring confounding control

Goal: rate each estimate's control as Strong, Moderate, or Weak within every domain, then aggregate to
an overall rating. A rating reflects how many of a domain's back-door pathways are closed, not a raw
variable count, and a construct counts as closed when any adequate proxy is adjusted.

### 5.1 Measurement-controllable domains (count-based)

Within a measured domain, count the constructs controlled and map the count to a level using a
pre-specified threshold. Set Strong to require control of a substantial share of the domain's
constructs, Moderate to require at least one but fewer than the Strong cut, and Weak to mean none. The
exact cut is pre-registered per domain and tested for robustness in Section 5.3. A general default is a
majority rule, Strong at roughly half or more of the domain's constructs; the analysis reported in the main text used at
least three of five for the indication domain and at least four of eight for the contextual domain.

| Level | Rule (count-based domain of K constructs) |
|---|---|
| Strong | At least the pre-registered cut (a substantial share of K) controlled |
| Moderate | At least one construct controlled, but below the Strong cut |
| Weak | No construct in the domain controlled |

### 5.2 Latent domains (design-gated)

A domain whose central construct is latent cannot be closed by regression on measured proxies, so it is
not scored by counting. Use a design-gated rule instead.

| Level | Rule (design-gated latent domain) |
|---|---|
| Strong | An eligible design that differences out the latent common cause (sibling, twin, family fixed effects, or negative-control) |
| Moderate | A population analysis adjusting for at least one measured proxy of the latent factor |
| Weak | Neither a design-based control nor any measured proxy |

### 5.3 Aggregation and sensitivity

Aggregate the domain ratings to one overall rating with a conservative weakest-link rule: Strong only
if every domain is Strong; Weak if any domain is Weak; Moderate otherwise. This mirrors the
adequate / some-concerns / inadequate logic of risk-of-bias tools and refuses to let strong control in
one domain mask weak control in another.

Because every threshold and every construct granularity is a modelling choice, repeat the rating and
the downstream meta-analysis under alternative specifications: stricter and looser thresholds, and
coarser and finer construct granularities (the alternative Track B taxonomies from Stage 3 supply these
directly). Report the gradient under each specification and state which conclusions are invariant.

Output of Stage 5: a per-estimate table of domain ratings and an overall rating, plus the sensitivity
grid.

---

## 6. Stage 6: Stratified meta-analysis and triangulation read-out

Goal: pool the estimates within control strata and read the pattern of attenuation as a causal-structure
signal.

Pool with random-effects models (REML with the Knapp–Hartung adjustment), combining hazard, risk, and
odds ratios on the log scale. Test subgroup differences with a categorical-moderator Q-test and run
leave-one-out diagnostics. Then read three things in order.

1. Unstratified pool. Report the overall association and confirm with leave-one-out that no single
   estimate drives it. This is the number a conventional meta-analysis would report.
2. Within-domain gradient. For each domain separately, ask whether the pooled estimate moves toward the
   null as control strengthens from Weak to Moderate to Strong. A monotone gradient to the null within a
   domain implicates that domain's bias structure as a source of the association.
3. Cross-domain convergence at the strong tier. Compare the strong-control pooled estimate across
   domains. If strong control of one domain reaches the null while strong control of the others does
   not, the domains do not converge, and the evidence is more compatible with that one domain's bias
   structure than with a population-level causal effect. If, instead, all domains converged to the null
   under strong control, the evidence would be more compatible either with a genuine effect once
   confounding is removed or with a shared residual bias common to all domains.

This ordered read-out is the triangulation signature: attenuation that tracks one bias axis specifically
is interpreted differently from attenuation that appears under any kind of stronger adjustment.

Output of Stage 6: the stratified forest plots, the within-domain gradients, the cross-domain
comparison at the strong tier, and the triangulation conclusion.
