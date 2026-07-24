# Bias-domain triangulation of prenatal paracetamol and offspring neurodevelopment

Code and data for:

> Shi X, Deng G, Du J. Bias-domain triangulation of non-convergent observational evidence in mental health research.

## Reusable protocol (tutorial)

A step-by-step guide to applying the bias-domain triangulation framework to any exposure–outcome question is hosted as a web tutorial:

**https://xuanyshi.github.io/bias-domain-triangulation/**

The same content is in [`docs/`](docs/) as HTML, Markdown, and Word. It mirrors the reusable-protocol section of the paper's Supplementary Information; the version of record is the journal article and its Supplementary Information.

## Systematic review search strategy

The full electronic search strategies (MEDLINE via PubMed and Embase, searched from inception to 1 July 2026), the eligibility criteria, and the PRISMA study-selection flow are documented in [`SEARCH_STRATEGY.md`](SEARCH_STRATEGY.md). The review is registered on PROSPERO (CRD420261365276).

## Repository structure

```
├── docs/                          # Reusable-protocol tutorial -> GitHub Pages
│   ├── index.html                          # Web tutorial (hosted at the URL above)
│   ├── Supplementary_Protocol_bias_domain_triangulation.md    # Markdown source
│   └── Supplementary_Protocol_bias_domain_triangulation.docx  # Word version
│
├── data/                          # All input data (no individual-level participant data)
│   ├── SourceData_meta_analysis_20260723_B1Strong.xlsx
│   │                                         # Current 24-article, 39-estimate meta-analysis Source Data
│   ├── SourceData_main_model_covariates_20260723_B1Strong.xlsx
│   │                                         # Current per-record main-model covariate audit
│   ├── Extraction_adjudication_and_interrater_reliability.xlsx
│   │                                         # Extraction audit, agreement statistics, and final adjudication
│   ├── effect_estimates_and_ratings.xlsx   # Historical 22-study/33-estimate development set for Table S5a
│   ├── main_model_covariates.xlsx          # Stable-path copy of the current covariate Source Data
│   ├── ratings_locked16.xlsx               # Study-level B1/B2/B3 ratings (primary: 16 constructs)
│   ├── ratings_coarse.xlsx                 # Sensitivity: coarse granularity (Gemini, 11 constructs)
│   ├── ratings_fine.xlsx                   # Sensitivity: fine granularity (GPT-5.5, 19 constructs)
│   ├── pooled_strata_estimates.csv         # Current NHB-method stratified pooled results
│   ├── trackB_pooled_variables.json        # 1,357 LLM-generated candidate variables (Track B input)
│   ├── trackB_final_mapping_locked.json    # Locked construct mapping (16 core confounders)
│   └── LLM-DAG_recall_ABC_3model.xlsx      # Table S2: per-model/per-prompt recall (matrix + Recall summary sheet)
│
├── code/                          # Analysis scripts
│   ├── meta_analysis_primary.R             # Main stratified meta-analysis (Figs 2-3, S3-S5, Tables S4-S5)
│   ├── meta_analysis_sensitivity.R         # Sensitivity: coarse/fine granularity (Table S5a)
│   ├── ratings_locked16.py                 # Bias-domain rating engine (16-construct mapping)
│   ├── sensitivity_granularity.py          # Generate coarse/fine ratings from alternative taxonomies
│   ├── llm_dag_induction.py               # Track B Prompt 1: per-study causal-role induction
│   ├── llm_dag_induction_gemini.py        # Gemini-specific API wrapper
│   ├── llm_dag_clustering.py              # Track B Prompt 2: blind construct clustering
│   ├── llm_crosswalk.py                   # Cross-model construct crosswalk
│   └── llm_recluster.py                   # Multi-model recluster reconciliation
│
├── prompts/                       # Exact LLM prompts (byte-identical to what was sent)
│   ├── prompt_1_perstudy_causal_role_induction.md   # Three variants (A/B/C)
│   └── prompt_2_construct_clustering_blind.md        # Blind taxonomy induction
│
├── llm_outputs/                   # Raw LLM taxonomy outputs (Track B)
│   ├── trackB_taxonomy_deepseek-v4-pro.json
│   ├── trackB_taxonomy_gemini-3.1-pro-preview.json
│   └── trackB_taxonomy_gpt-5.5.json
│
├── requirements.txt               # Python dependencies
└── r_packages.txt                 # R dependencies
```

## Reproducing the main results

All commands are run from the repository root.

### 1. Install dependencies

```bash
pip install -r requirements.txt
Rscript -e 'install.packages(readLines("r_packages.txt")[!grepl("^#|^$", readLines("r_packages.txt"))])'
```

### 2. Primary stratified meta-analysis

Recomputes the primary analysis using the method applied in the NHB submission: REML random-effects models with Knapp–Hartung inference, categorical moderator Q-tests for B1/B2/B3/overall strata, an HR/aHR-only sensitivity analysis, and leave-one-effect-out diagnostics. The current analysis contains 39 adjusted estimates from 24 independent articles; the locked 16-construct mapping and rating thresholds are unchanged.

```bash
Rscript code/meta_analysis_primary.R
```

Computed CSV and JSON result files and the publication figures are written to `output/`; the tracked pooled-strata table is updated in `data/`.

### 3. Sensitivity analysis (construct granularity)

Repeats the framework-development-set analysis under coarse (11 constructs) and fine (19 constructs) mappings for Table S5a. This historical 22-study/33-estimate analysis is retained for the prespecified construct-granularity comparison and is not the current 24-article/39-estimate primary meta-analysis.

```bash
Rscript code/meta_analysis_sensitivity.R
```

### 4. Track B: LLM-based background DAG (optional re-run)

Track B used three LLMs (GPT-5.5, DeepSeek-V4-pro, Gemini-3.1-pro) to independently generate candidate causal structures. Re-running requires API access; all outputs are provided in `llm_outputs/`.

```bash
# Step 1: Per-study causal-role induction (Prompt 1, three prompting strategies)
python code/llm_dag_induction.py        # DeepSeek / OpenAI
python code/llm_dag_induction_gemini.py # Gemini

# Step 2: Blind construct clustering (Prompt 2)
python code/llm_dag_clustering.py

# Step 3: Cross-model crosswalk and reconciliation
python code/llm_crosswalk.py
python code/llm_recluster.py
```

API keys are read from a local key file (`~/.llm_dag_keys.env`) via `dotenv` and are not included in this repository. Some scripts also require intermediate files not shipped in this repository; the scripts and prompts are provided for transparency.

## Data description

All data are extracted from published study reports. No individual-level participant data are used.

| File | Description |
|------|-------------|
| `SourceData_meta_analysis_20260723_B1Strong.xlsx` | Current primary dataset: 24 independent articles, 39 adjusted ratio-type estimates, NHB-method stratified estimates, HR/aHR-only sensitivity analysis and leave-one-effect-out diagnostics |
| `SourceData_main_model_covariates_20260723_B1Strong.xlsx` | Current 39-record main-model covariate audit used for the empirical Track A inspection |
| `Extraction_adjudication_and_interrater_reliability.xlsx` | Independent extraction audit, inter-rater agreement, discrepancy resolution and final Senior-adjudicated values; its 33-estimate page is explicitly retained as an historical NHB development-set audit |
| `effect_estimates_and_ratings.xlsx` | Historical 22-study/33-estimate framework-development set retained only for the construct-granularity analysis in Table S5a |
| `main_model_covariates.xlsx` | Stable-path copy of the current main-model covariate Source Data |
| `ratings_locked16.xlsx` | Study-level bias-domain ratings (B1/B2/B3) under the locked 16-construct two-source mapping |
| `pooled_strata_estimates.csv` | Current REML/Knapp–Hartung pooled estimates by bias domain and control level |
| `trackB_pooled_variables.json` | 1,357 unique candidate variables pooled across 3 models, 3 prompting strategies, and 2 outcomes |
| `trackB_final_mapping_locked.json` | Final locked construct mapping with causal-role adjudication |
| `LLM-DAG_recall_ABC_3model.xlsx` | Per-model, per-prompting-strategy variable-level recall of Track A confounder constructs. The evidence matrix (which variables each model x scaffold elicited per construct) plus a `Recall summary` sheet with the computed recall (per run, per model, and construct-level consensus). |

## Correspondence

Jian Du (dujian@bjmu.edu.cn), Institute of Medical Technology, Peking University Health Science Center.

## License

This project is licensed under the MIT License.
