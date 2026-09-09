# DAG expert review — protocol v2

Static GitHub Pages pages with no backend, analytics or external runtime libraries. Open `index.html` directly or serve this directory. Data remains in the current browser and explicit downloads.

## Expert workflow

1. Use a stable reviewer identifier and record expertise. Review the frozen baseline's 27 nodes and 50 edges independently. Graph-level domain and role labels are deferred to the rules view; raw label examples remain expandable. The candidate graph is visible, so this is not de novo blinded DAG construction.
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

The graph itself remains dataset `2026-09-09.v1`; the questionnaire and record schema are v2. Storage uses a new v2 key and can migrate v1 drafts without overwriting the old key. Legacy “同意” becomes “保留”; old modification comments are retained with subtype “其他”. New node/domain judgments start blank. Mismatched graph versions/hashes and malformed review packages are rejected before replacing current state.

The original DAG image SHA-256 is `a78a4ddb3ee95d09edb52398648b58ba75c80c5c204bf2a7517b50479cb3f6d9`. Extracted covariate labels retain aliases and model/design terms; they are not a complete or adjudicated membership list. Current-pregnancy obstetric complications remain non-core / timing-dependent in the source dictionary.

References for the review design:
- Petersen et al., AJE 2023: https://doi.org/10.1093/aje/kwad144
- Rodrigues et al., IJE 2022: https://doi.org/10.1093/ije/dyac135
- ACCORD, PLOS Medicine 2024: https://doi.org/10.1371/journal.pmed.1004326

This review is undertaken after the existing analysis. Preserve the original analysis, record the review date, and report review-driven changes and sensitivity analyses separately.

Run logic/data tests: `node --test docs/dag-review/review-core.test.cjs`. Browser interaction/visual QA is separate and was not part of this update's requested testing.
