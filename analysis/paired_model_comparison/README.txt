Paired population and family model comparison

This directory reproduces the descriptive comparison in Supplementary Table S11.
Ten outcome-specific pairs from six articles contribute 20 retained estimates.
Pairing requires the same article, outcome, exposure contrast and HR scale.
Nine pairs document within-family identification. Prahm is an exposure-discordant
sibling restriction with maternal-ID clustering and is reported separately.

Inputs
all_39_models.csv supplies the effect estimates, confidence intervals, grades,
exposure contrasts and model descriptions. current_Table_S3_extract.json provides
model-specific source locators; model_comparability.json records sample and
covariate differences. Source qualifications for Luo and the Okubo ASD
narrative/Table 2 discrepancy are retained in the supporting records.

Measures
RHR = second-model HR / population HR.
A decrease requires second-model HR < population HR.
Movement towards the null requires a smaller absolute log-HR.
Sampling covariance is unavailable and outcomes within articles are dependent;
paired-change intervals, P values and pooled changes are therefore not reported.
Samples and covariates may differ between paired models.

Reproduction
Run from this directory with Python 3 (standard library):
  python3 code/analyze_pairs.py

Outputs
results/paired_estimates.csv: paired estimates and descriptive changes.
results/descriptive_summary.csv: overall and restricted direction counts.
results/leave_one_article_out.csv: omission of each documented-control article.
results/source_alternative.csv: Okubo ASD population HR 1.07 in place of 1.06.
results/summary.json: numerical summaries and inference availability.
