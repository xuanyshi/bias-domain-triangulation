SOURCE DATA AND ANALYSIS CODE

This directory contains the data and code for the current manuscript.
The inventory contains 39 estimates from 24 articles. The primary analysis
retains 38 estimates from 23 articles after the C14 exclusion.

SUPPLEMENTARY TABLES
The supplementary_tables/ directory contains:
  Supplementary_Table_S2_Construct_Recall.xlsx
  Supplementary_Table_S10_Edge_Judgments.xlsx
  Source_Data_Model_Ratings.xlsx

CONTENTS AND MANUSCRIPT REFERENCES
  graph/: 19-node, 132-edge DAG, adjustment sets, 342 directional judgments
    and integration decisions (Methods; Supplementary Figure S2; Table S10).
    FigureS2.dagitty preserves the displayed layout and English labels;
    DAG132_v1.dagitty is the analysis specification.
  edge_protocol/: pairwise assessment protocol, model settings and 171 pairs
    (Methods, graph construction; Supplementary Methods).
  decision_rule/ and ratings/: construct definitions, selected-model covariates,
    timing assessments, ratings and source locators (Figure 3; Tables S1 and S3).
  meta/: analysis inputs, primary pools, sensitivity analyses, subset membership
    and figure-level numerical records (Figures 5-6 and S3-S5; Tables S4-S5).
  supplementary_restrictions/: post-exposure-adjustment and outcome restrictions
    (Supplementary sensitivity analyses).
  paired_model_comparison/: paired estimates, model comparability, source
    qualifications and descriptive checks (Supplementary Table S11).
  figure_source_data/matrix/: numerical source data for Figure 4.
  figure_source_data/comparison/: numerical source data for Figure 7 and Table S7.

Some source-data filenames retain earlier figure numbers: matrix Figure3 is
manuscript Figure4; forest Figure4 is manuscript Figure5; convergence Figure5
is manuscript Figure6; comparison Figure6 is manuscript Figure7.

REPRODUCTION
From the analysis/ directory:
  python3 decision_rule/reapply_ratings.py
  Rscript meta/code/analyze.R meta
  Rscript supplementary_restrictions/code/supplementary_restrictions.R supplementary_restrictions
  python3 paired_model_comparison/code/analyze_pairs.py

Requirements: Python 3 (standard library); R with metafor and jsonlite.
R session information is supplied with the analysis results.
Copies of the 39-record input in individual analysis folders are retained so
that each analysis script has its documented input at the expected path.
B4_0904 identifies the historical post-exposure-adjustment indicator used in
the reported restriction; it does not replace the current DAG-based exclusion.

ORIGINAL-LANGUAGE RECORDS
Verbatim prompts and Chinese-language model outputs are retained separately
by the authors, outside this repository directory. Recall-workbook
source locators refer to those original records. The English edge protocol
is a methods summary; author rationales are translations of recorded decisions.

PACKAGE_MANIFEST.json lists the files and their SHA-256 hashes.

Source locations
Local source_path values are replaced by public article URLs. Source-file
labels in evidence records identify the authors' text extractions; those
full-text files are not distributed here. Article identifiers, section and
table references remain available for checking the published reports.
