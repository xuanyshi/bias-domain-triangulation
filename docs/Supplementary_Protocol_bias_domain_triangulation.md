# Bias-domain triangulation tutorial

Updated 10 October 2026 · Public tutorial version 2026-10-10

This tutorial explains how to compare reported adjustment with requirements derived from an explicit directed acyclic graph (DAG). It follows the ten-step protocol in the current manuscript and illustrates the rules with prenatal acetaminophen and offspring neurodevelopment. The application-specific graph and grading rules require reassessment before use for another question.

**What the grades mean.** Strong, Moderate and Weak describe reported construct coverage under the adopted graph and decision rules. They do not measure overall risk of bias, establish sufficient real-world adjustment or prove the absence of a causal effect.

**Version scope.** This update replaces the earlier count-threshold tutorial. It incorporates the 19-node, 132-edge working DAG, complete coverage of either adjustment set, and the C13 timing qualification. These DAG and grading revisions were exploratory, rather than prespecified in PROSPERO CRD420261365276. Independent human adjudication of the current AI-assisted construct mapping remains outstanding.

## Overview

Track A records what selected study models adjusted for. Track B independently generates candidate causal variables, without seeing Track A or the proposed bias domains. Integration produces node definitions, followed by edge assessment, graph construction and adjustment-set derivation. Model ratings then organise the evidence for descriptive stratified synthesis.

1. Define the question and read primary-study reports.
2. Extract the exact adjustment used by each selected model.
3. Map variables to constructs with explicit boundaries.
4. Generate candidate causal variables independently.
5. Define the graph nodes and omitted processes.
6. Assess edges and assemble an acyclic graph.
7. Derive adjustment requirements under that graph.
8. Define reference domains and exclusion rules.
9. Apply the decision tree to each selected estimate.
10. Pool compatible estimates within coverage strata and assess limitations.

Agreement between candidate sources helps assess construct recall. It does not independently validate causal roles, individual arrows or model ratings.

## 1 Define the question and read primary reports

Specify the population, exposure, comparator, exposure window, outcome, follow-up and target effect before extracting estimates. Total-effect and direct-effect questions require different adjustment decisions. Read full texts and supplements, retaining exact source locations for every extracted claim.

Create one record per selected model, outcome and exposure contrast. Record the article identifier, source cohort or register, sample restrictions, effect measure, estimate and confidence interval. Keep population and within-family estimates separate and link records sharing an article or source population.

**Deliverable:** an estimate inventory with stable identifiers and source links. Here, the inventory contains 39 estimates from 24 articles; the fixed B4 rule retains 38 estimates from 23 articles. Inventory membership and analysis retention are separate fields.

## 2 Extract what each selected model controlled

Extract the covariates and design components used by the model supplying the selected estimate. Document adjustment, stratification, matching, weighting and sample restrictions. Do not transfer controls from sensitivity models, mediation analyses or other outcome models.

Retain original wording, model labels, source locations and timing uncertainties. For weighting, record the variables entering the weight model. Verify how family designs achieve within-family identification; clustering standard errors by maternal identifier alone does not establish such identification.

Use independent extraction and source-based adjudication where feasible. Preserve raw annotations and resolved values separately. Agreement statistics from an earlier extraction exercise do not establish reliability of a later graph-based reclassification.

## 3 Map variables to constructs

Define constructs by subject, components, measurement and temporal boundaries. Related covariates can represent one construct, but they are not automatically interchangeable. Multiple qualifying measurements within a construct count once for coverage.

- **Yes:** an explicit selected-model control or qualifying design component represents the construct within its stated boundaries.
- **No:** inspection of the model specification confirms no qualifying control.
- **Unclear:** reporting, timing or interpretation is insufficient to decide. Missing reporting alone does not establish No.

These are input-evidence states. The only assigned grades are Strong, Moderate and Weak; exclusion and pending verification are separate dispositions. Representative coverage does not establish complete measurement or elimination of residual confounding.

**Boundary examples.** Child sex alone does not cover maternal or family context under C02. Current-pregnancy complications belong to C13; established maternal physical or metabolic disease belongs to C06. Occupation or residence alone does not establish exposure to an environmental agent under C12.

## 4 Generate candidate causal variables independently

Identify candidate variables from background knowledge while keeping Track B blind to Track A and the domain scheme until integration. Preserve prompts, model identifiers, dates, settings, outputs and evidence sources. Multiple models can share training material and errors; developer diversity does not establish independent evidence.

The application used GPT-5.5, DeepSeek-V4-pro and Gemini-3.1-pro-preview for discovery, with three prompting strategies for ASD and ADHD separately. The pooled list contained 1,357 unique candidates. These discovery models were distinct from those used for subsequent edge assessment.

Model settings differed. DeepSeek used temperature 0 in both discovery phases; GPT used medium reasoning effort without an explicit temperature parameter. Gemini used temperature 0 for variable induction and no explicit temperature parameter for clustering. Record supported settings rather than imposing a uniform parameter that a model may not support.

**Adaptable prompt outline:**

> For the specified population, exposure, comparator, exposure window and outcome, identify candidate causal variables from background knowledge. State the subject, temporal position, proposed causal relations, evidence sources and uncertainty. Distinguish measured variables from constructs and study-design features. Treat proposed roles as hypotheses for later graph assessment. Do not use the empirical adjustment inventory or anticipated pooled results.

Pool and deduplicate candidates, then cluster related variables with explicit definitions. Preserve raw-candidate mappings. Candidate recall, taxonomy alignment and causal-edge support are distinct assessments.

## 5 Define graph nodes and scope

Align empirical and model-generated constructs before assessing edges. Specify exposure X, outcome Y, component meanings and temporal boundaries. Record unresolved alternatives and processes omitted from the graph.

The application uses 17 construct nodes plus X and Y. These short labels support the examples; actual coverage also requires the component and timing boundaries in the downloadable construct dictionary.

| Node | Construct | Grading role |
| --- | --- | --- |
| C01 | Familial and genetic background | B1 required |
| C02 | Sociodemographic and family characteristics | B3 required |
| C03 | Socioeconomic position | B3 required |
| C04 | Geographical and calendar context | B3 required |
| C05 | Established maternal neuropsychiatric health | B1 required |
| C06 | Maternal physical and metabolic health | B2 required |
| C07 | Maternal indications and symptoms | B2 required |
| C08 | Reproductive and prior obstetric history | No domain grade |
| C09 | Psychosocial conditions and health behaviours | Additional B3 coverage; set B |
| C10 | Maternal healthcare seeking and use | B2 required; set A |
| C11 | Other medications and treatments | B2 required |
| C12 | Environmental and occupational exposures | Additional B3 coverage; set B |
| C13 | Current-pregnancy obstetric and perinatal health | Qualifying antecedent component for set B |
| C14 | Infant feeding and breastfeeding | Fixed B4 exclusion if conditioned on |
| C15 | Early childhood physical and immune health | No domain grade |
| C16 | Early neurodevelopmental and regulatory phenotypes | Fixed B4 exclusion if conditioned on |
| C17 | Biological and pharmacological response processes | Fixed B4 exclusion if conditioned on |

Outcome ascertainment and study selection are outside this graph and grading specification. Eligibility restrictions, attrition, diagnostic contacts and complete-case selection can therefore remain sources of bias after grading.

## 6 Assess edges and assemble the DAG

Assess both directions for each node pair against common definitions and evidence. Record temporal compatibility, construct compatibility and support for a direct pathway. Each pair permits at most one Pass under this protocol; unresolved judgments require explicit disposition.

Separate model judgments, human corrections, accepted candidates and final DAG inclusion. Combining accepted edges can create directed cycles. Record every integration omission and its rationale, preserving the original directional judgments.

The application assessed 171 pairs, comprising 342 candidate directions, using deepseek-flash, gpt-6.1-sol and gpt-6-astra. Each used high reasoning effort, a fresh context per pair and initial judgment followed by within-model review. The author supplied 63 explicit directional adjudications; 279 directions retained three-model consensus. These decisions yielded 135 Pass edges.

The initial graph contained ten cycles. Omitting C12→C08, C17→C13 and C14→C15 produced the adopted 132-edge DAG. X→Y was retained as the research hypothesis; its Pass designation did not establish a direct causal effect. Acyclicity and adjustment-set checks describe properties of the supplied assumptions, without empirically validating the arrows.

**Causal roles are path-specific.** A collider has both adjacent arrows pointing into it on a specified path. A node can be a collider on one path and a non-collider on another. Assess the complete conditioning set and relevant paths when considering adjustment validity.

## 7 Derive adjustment requirements

Declare the target effect and enumerate minimal sufficient adjustment sets under the adopted DAG. DAGitty 0.3.4 returned two sets for the total effect in this application. Independent d-separation and single-member deletion checks confirmed sufficiency and minimality for that graph.

- **Set A:** C01, C02, C03, C04, C05, C06, C07, C10, C11.
- **Set B:** C01, C02, C03, C04, C05, C06, C07, C09, C11, C12, C13.

The sets share eight constructs. Set A additionally requires C10; set B additionally requires C09, C12 and qualifying C13. Complete coverage must occur within the same model, outcome and exposure window. Incomplete fragments from different sets or models cannot be combined.

**C10 timing.** Only actual maternal healthcare contacts before target exposure qualify. Care propensity, access and offspring diagnostic contacts are distinct. Pregnancy-wide utilisation alone does not establish pre-exposure coverage.

**C13 timing.** Set B requires a controlled obstetric condition documented before the selected exposure window and compatible with the graph's antecedent component. The condition must not result from earlier target exposure. Gestational age at birth, birthweight, delivery mode and neonatal outcomes do not qualify. Pregnancy-wide complications without onset ordering remain Unclear. Biomarker collection at delivery does not establish when prenatal exposure began.

Formal enumeration retains set B under this antecedent interpretation. The broad C13 label is not a jointly measured baseline variable. Complete construct coverage also does not establish that every additional covariate in the actual model is valid.

## 8 Define domains and apply the B4 screen

Define domain membership and thresholds before comparing pooled results. For a new question, derive these from its constructs and graph. This application uses three reference domains and a separate fixed exclusion rule.

| Domain | Strong | Moderate | Weak |
| --- | --- | --- | --- |
| B1 Familial/genetic liability | C01 and C05 covered | Either one covered | Neither covered |
| B2 Indication/maternal health | C06, C07, C10 and C11 covered | At least one, without all four | None covered |
| B3 Social-behavioural context | C02, C03 and C04 covered | Any of C02, C03, C04, C09 or C12, without all three required constructs | None covered |

**B4 exclusion.** Exclude the selected estimate when its model actually conditions on C14, C16 or C17 through adjustment, stratification, matching, weighting or restriction. Measurement or discussion alone does not trigger exclusion. A variable used as the selected outcome belongs to Y, rather than automatically constituting a conditioned C16 variable.

B4 is a restricted operational policy. Other post-exposure variables do not automatically trigger this fixed exclusion, but can still introduce bias. Retention does not certify absence of collider bias, overadjustment or selection bias.

## 9 Assign domain and overall grades

After B4, apply domain rules to the recorded coverage. Verified within-family identification or representative genetic or family-history controls can contribute to B1 under explicit assumptions. These controls do not establish complete genetic control.

Apply the overall decision in this order:

1. If the selected model completely covers set A or set B, assign Overall Strong.
2. If neither set is complete and any reference domain is Weak, assign Overall Weak.
3. Otherwise, assign Overall Moderate.

Domain grades retain set A as their fixed reference. Complete set B can therefore give Overall Strong with B2 Moderate. The earlier weakest-domain rule alone is insufficient for this version.

**Uncertain inputs.** Recalculate under every admissible Yes/No assignment. Assign a grade only when all assignments produce the same result; otherwise retain pending verification. Apply the same principle to uncertain B4 disposition.

**Illustrative rule checks, not study findings:**

| Coverage or conditioning | B1 / B2 / B3 | Overall disposition |
| --- | --- | --- |
| Complete A; no B4 trigger | Strong / Strong / Strong | Strong |
| Complete B with qualifying C13; C10 absent | Strong / Moderate / Strong | Strong |
| Shared eight plus C09 and C12; C10 absent; C13 No | Strong / Moderate / Strong | Moderate |
| Same preceding example, but C13 Unclear | Strong / Moderate / Strong | Pending: C13 changes Overall |
| Complete A plus conditioning on C14 | Domain grading not applied | Excluded under B4 |

Keep estimate identifiers, raw controls, construct assignments, source locators, timing notes, B4 dispositions, domain grades and missing members of each set.

## 10 Perform stratified synthesis and interpret results

Pool compatible estimates separately within each domain and grade. This application uses intercept-only random-effects models with restricted maximum likelihood (REML) and Knapp–Hartung intervals. It performs no meta-regression or between-grade tests. A stratum containing one estimate retains its published interval.

Report estimate, article and source-group counts. Preserve effect-measure and outcome differences; the combined HR, RR and OR synthesis is descriptive. Repeated outcomes and shared cohorts reduce independent information. Knapp–Hartung inference does not itself model these correlations.

Examine restrictions by effect measure, outcome and the separate post-exposure-adjustment classification, alongside leave-one-estimate, article and source-group analyses. The binary post-exposure classification and fixed B4 rule are distinct. Restricting membership does not estimate the effect of adjustment within otherwise identical models.

Smaller estimates in stronger-coverage strata can inform causal explanations, but population, measurement, outcome and model-selection differences may also contribute. An interval spanning the null does not prove no effect. Overlapping strata cannot isolate a unique bias mechanism. Triangulation considers whether approaches have different sources of bias; repeated analyses of shared data do not supply independent confirmation [1].

## Reuse and reporting checklist

Retain question definitions, estimate inventories, raw covariates, construct dictionaries, mapping evidence and unresolved inputs. Preserve discovery records, directional judgments, human adjudications, integration decisions, final graphs, adjustment sets and versioned rules. Report the retained evidence set and dependence structure alongside statistical outputs.

Separate prespecified decisions from exploratory revisions and state which stages received independent human review. For a new question, reassess node definitions, timing, admissible controls, domain partitions and thresholds before applying the framework.

**Release resources.** The webpage, Markdown and Word downloads carry the same tutorial version. The accompanying graph, construct dictionary and rule JSON document this application. Older repository analysis files and the separate expert-review interface describe earlier versions; they do not reproduce or validate the current tutorial by themselves.

## Methods references

1. Lawlor DA, Tilling K, Davey Smith G. Triangulation in aetiological epidemiology. *International Journal of Epidemiology* 45, 1866–1886 (2016). https://doi.org/10.1093/ije/dyw314
2. Textor J, van der Zander B, Gilthorpe MS, Liśkiewicz M, Ellison GTH. Robust causal inference using directed acyclic graphs: the R package dagitty. *International Journal of Epidemiology* 45, 1887–1894 (2016). https://doi.org/10.1093/ije/dyw341
3. DAGitty documentation. Adjustment-set enumeration and interpretation are conditional on the supplied graph [2]. https://www.dagitty.net/manual-3.x.pdf
