# DAG expert review

Static GitHub Pages tool: open `index.html` directly or serve this folder. No build step, external libraries, backend or analytics.

- 27 nodes and 50 arrows from the manuscript DAG, with stable `E001–E050` identifiers.
- Node roles use Supplementary Information 2026-09-04 v3, Table S1. Current-pregnancy obstetric complications remain non-core / timing-dependent; arrows are hypotheses for review.
- Raw covariate labels come from the 2026-09-04 extracted mapping. They retain aliases and design/model terms, and are not a complete or adjudicated construct membership list. Public source links identify studies, not evidence proving an arrow.
- Reviewer decisions start blank. Agree and outside-expertise responses count as completed; change and uncertain responses require a reason. Progress is not a validity score.
- Browser storage is namespaced by dataset version and hash. JSON exports include all review fields and graph identifiers; CSV exports contain 50 edge rows, 27 node rows and three overall rows. JSON imports reject mismatched versions, unknown identifiers and invalid decisions.
- Nothing is submitted to a server. Reviewers must download and return their file to the research team. Clearing browser data removes the local draft.

Run logic and data checks: `node --test docs/dag-review/review-core.test.cjs` from the repository root.

The original DAG is included as `original-dag.png`. SHA-256: `a78a4ddb3ee95d09edb52398648b58ba75c80c5c204bf2a7517b50479cb3f6d9`.
