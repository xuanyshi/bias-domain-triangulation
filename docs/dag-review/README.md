# DAG expert review — protocol v2

Static GitHub Pages pages with no backend, analytics or external runtime libraries. Open `index.html` directly or serve this directory. Data remains in the current browser and explicit downloads.

## Expert workflow

1. Use a stable reviewer identifier and record expertise. Review the 18 B1–B4 constructs represented in the current pooled-model trace, plus exposure and outcome (20 nodes), alongside the 37 original manuscript edges whose endpoints remain in scope. Table S1 domain labels are shown beside each node; raw label examples remain expandable. The candidate graph is visible, so this is not de novo blinded DAG construction.
2. Review the four domain definitions and scoring rules in the separate B1–B4 view. B3 is displayed as Sociodemographic/lifestyle. Rules were transcribed from MainText 2026-09-04 Table 1, with the timing-dependent B4 boundary from Supplementary Information 2026-09-04 v3.
3. Submit structured proposals for new constructs, split nodes, additional within-construct variables, or missing arrows. Define timing, connections and rationale. These stay outside the baseline graph and scoring system until adjudicated. The app does not implement or certify revised graphs.
4. Export JSON for return to the research team. CSV includes edge, node, domain, proposal and overall responses. JSON is needed to continue the workflow.
5. Import the team's second-round package. This saves a separate first-round snapshot, displays anonymized reviewer labels and candidate proposals, and lets the reviewer revise disputed items. Snapshots are preserved in JSON and CSV. They are application-level history, not cryptographically authenticated records.

Node reviews use “未发现问题 / 有问题 / 无法判断”; node problems require a comment to count as complete. Edge, domain and proposal reviews use “保留 / 修改 / 不确定 / 超出专长”. Changes require a subtype and reason; uncertainty requires a reason. Completion is workload progress, not validity. Scope and reference labels help interpretation, and do not prove causal arrows.

## Research-team workflow

Open `team.html`. Import the latest JSON for each expert (default planned panel size: 3). Reviewer IDs must be distinct. Older timestamped copies and duplicate reviewer names are rejected. Batch import is all-or-nothing.

- Review first-round distributions separately from current mixed first/second-round records.
- “明确判断” counts retain or modify responses. Coverage requires at least two such judgments.
- Any modification or uncertainty triggers review. “一致支持” requires all planned experts to have returned an answer to that edge, at least two to retain it, and any remaining answers to be outside expertise. Missing responses are never agreement. This is a project-specific processing rule, not a validated consensus scale.
- Review node issues, domain issues, whole-graph comments and proposals. Record adjudication, whether the graph changes, whether scoring changes, rationale, and impacted paths or analyses separately. Withdrawn first-round proposals remain in the history for adjudication.
- Export a second-round package with anonymous labels. Check free text for identity clues before sharing; removing structured reviewer names does not guarantee anonymity.
- Record verified graph changes and analysis effects against the original 39 estimates. This app does not recalculate adjustment sets, ratings or meta-analysis. Use the result fields for actual completed checks and retain links/version references.
- Export the full team JSON for backup, the edge statistics CSV and the revision-log CSV. Team JSON contains expert identity and raw comments; do not commit completed files to the public site.

## Provenance and migration

The active dataset is `2026-09-10.s1-domains-v4`. The analysis scope is the union of constructs represented in the final model-level trace for all 39 estimates and the 26 retained after excluding B4=Yes. The review further restricts this union to Table S1 domains B1–B4, yielding 18 constructs (16 in the retained subset), plus the two anchors. The original 50-edge graph is restricted to the retained nodes (37 edges); no new arrows are inferred from covariate presence. S1 continues to supply construct definitions, domains and roles.

Raw labels are drawn from the 2026-09-04 final covariate trace. Counts describe appearances in model records, including measured covariates, propensity-score inputs and design terms; they do not establish adequate control. Prahm label details follow its final targeted extraction, including absence of fibromyalgia from the sibling model. Non-core, blind-spot and unmapped labels are excluded from the active review. No primary effect estimate, domain rating, B4 flag or meta computation is changed.

The exact prior S1 (31-node) and original (27-node) baselines remain readable. Migration restricts active reviews to current IDs and preserves original normalized records, including excluded judgments and first-round history, in `baselineSnapshot`. Previous local-storage keys are not overwritten. Round-two issues outside the current scope are omitted from the active package; original imported records preserve their historical context. Other versions and malformed records are rejected.

The original DAG image SHA-256 is `a78a4ddb3ee95d09edb52398648b58ba75c80c5c204bf2a7517b50479cb3f6d9`. Extracted covariate labels retain aliases and model/design terms; they are not a complete or adjudicated membership list. Current-pregnancy obstetric complications remain non-core / timing-dependent in the source dictionary.

References for the review design:
- Petersen et al., AJE 2023: https://doi.org/10.1093/aje/kwad144
- Rodrigues et al., IJE 2022: https://doi.org/10.1093/ije/dyac135
- ACCORD, PLOS Medicine 2024: https://doi.org/10.1371/journal.pmed.1004326

This review is undertaken after the existing analysis. Preserve the original analysis, record the review date, and report review-driven changes and sensitivity analyses separately.

Run logic/data tests: `node --test docs/dag-review/review-core.test.cjs`. Browser interaction/visual QA is separate and was not part of this update's requested testing.

## Dedicated overview

`overview.html` displays the original manuscript DAG image (`original-dag.png`) without redrawing its layout. The image links to its full-resolution file. The original image remains a historical 27-node/50-edge reference, explicitly distinguished from the current 20-node/37-edge review scope. The review page renders at most three original edges. Exposure and outcome entries review their definitions and the main exposure–outcome edge; other relationships remain accessible through their associated nodes. Only original edges whose endpoints remain in the active scope are reviewed.

## Simplified expert interface

The default view shows variable selection, the focused triangle, four decision options and next/export actions. Reasons expand for modification or uncertainty. Node-definition review, domain rules and proposals live under Supplementary review; import/export variants, expertise and team links live under More. Completion prompts distinguish the 37 arrows from outstanding node/domain reviews. Existing judgment fields are unchanged; storage keys follow the dataset version.

## Completed reviews only

Expert JSON and CSV exports require a reviewer identifier, all 37 edge judgments, 20 node judgments, and four domain-rule judgments. Required reasons and modification types must be complete. In round 2, every proposal in the review package must also have a complete judgment; any saved proposals must have all required fields. Uncertainty and out-of-expertise remain valid responses under the existing completion rules. General comments and new proposals are optional. Both export buttons are disabled until these conditions are met, and the export action validates them again. Incomplete drafts remain in browser local storage. “继续未完成项” opens the next outstanding item.
