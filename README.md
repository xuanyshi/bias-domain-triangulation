# Bias-domain triangulation of prenatal paracetamol and offspring neurodevelopment

Data and code for the DAG132 analysis of prenatal paracetamol exposure and offspring neurodevelopment.

## Current analysis

The [analysis directory](analysis/) contains the data, graph, rating rules and scripts used for the current manuscript. The inventory comprises 39 estimates from 24 articles. The primary analysis retains 38 estimates from 23 articles after the specified post-exposure-adjustment exclusion.

The adopted graph contains 19 nodes and 132 directed edges. Coverage grades describe the reported adjustment of each selected study model under this graph and its decision rules. Statistical synthesis uses intercept-only random-effects models with REML estimation and Knapp–Hartung intervals. The paired population–family model comparison is descriptive.

| Material | Location |
| --- | --- |
| Run instructions and file descriptions | [analysis/README.txt](analysis/README.txt) |
| Analysis input and results | [analysis/meta/](analysis/meta/) |
| DAG and adjustment sets | [analysis/graph/](analysis/graph/) |
| Coverage rules and model ratings | [analysis/decision_rule/](analysis/decision_rule/) and [analysis/ratings/](analysis/ratings/) |
| Supplementary restrictions | [analysis/supplementary_restrictions/](analysis/supplementary_restrictions/) |
| Population–family model comparison | [analysis/paired_model_comparison/](analysis/paired_model_comparison/) |
| Figure source data | [analysis/figure_source_data/](analysis/figure_source_data/) |
| Model ratings and supplementary Tables S2 and S10 | [analysis/supplementary_tables/](analysis/supplementary_tables/) |
| Edge-assessment protocol and model settings | [analysis/edge_protocol/](analysis/edge_protocol/) |

## Reproduction

Requirements: Python 3 and R with `metafor` and `jsonlite`. The Python analysis scripts use the standard library.

From the repository root:

```sh
Rscript -e 'install.packages(c("metafor", "jsonlite"), repos="https://cloud.r-project.org")'
cd analysis
python3 decision_rule/reapply_ratings.py
Rscript meta/code/analyze.R meta
Rscript supplementary_restrictions/code/supplementary_restrictions.R supplementary_restrictions
python3 paired_model_comparison/code/analyze_pairs.py
```

Use the commit identifier cited in the manuscript to obtain the corresponding version. File checksums are recorded in [analysis/PACKAGE_MANIFEST.json](analysis/PACKAGE_MANIFEST.json).

## Methods and source records

The [tutorial](https://xuanyshi.github.io/bias-domain-triangulation/) describes the ten-step framework. The [search strategy](SEARCH_STRATEGY.md) documents the systematic review registered as PROSPERO CRD420261365276.

The source data were extracted from published study reports; no individual-level participant data are included. Model-assisted construct mapping, directional judgments and author adjudications retain their recorded provenance. Published prompts and discovery outputs from the earlier release remain in [prompts/](prompts/) and [llm_outputs/](llm_outputs/). The current edge-assessment protocol is described in English in `analysis/edge_protocol/`; the verbatim original-language edge-assessment records are held separately by the authors.

## Earlier analysis

The top-level `code/` and `data/` directories contain the earlier 24-article, 39-estimate analysis. Use `analysis/` to reproduce the current DAG132 results.

## License

Code is distributed under the [MIT license](LICENSE). Source publications remain subject to their respective terms.
