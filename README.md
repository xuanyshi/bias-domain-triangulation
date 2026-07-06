# Bias-domain triangulation of prenatal paracetamol and offspring neurodevelopment

Code and data for:

> Shi X, Deng G, Du J. Why observational evidence fails to converge in behavioural health research: bias-domain triangulation of prenatal paracetamol and offspring neurodevelopment.

## Reusable protocol (tutorial)

A step-by-step guide to applying the bias-domain triangulation framework to any exposure–outcome question is hosted as a web tutorial:

**https://xuanyshi.github.io/bias-domain-triangulation/**

The same content is in [`docs/`](docs/) as HTML, Markdown, and Word. It mirrors the reusable-protocol section of the paper's Supplementary Information; the version of record is the journal article and its Supplementary Information.

## Repository structure

```
├── docs/                          # Reusable-protocol tutorial -> GitHub Pages
│   ├── index.html                          # Web tutorial (hosted at the URL above)
│   ├── Supplementary_Protocol_bias_domain_triangulation.md    # Markdown source
│   └── Supplementary_Protocol_bias_domain_triangulation.docx  # Word version
│
├── data/                          # All input data (no individual-level participant data)
│   ├── effect_estimates_and_ratings.xlsx   # 33 extracted ratio-type estimates with B1 ratings
│   ├── main_model_covariates.xlsx          # Per-record main-model covariate sets (Track A)
│   ├── ratings_locked16.xlsx               # Study-level B1/B2/B3 ratings (primary: 16 constructs)
│   ├── ratings_coarse.xlsx                 # Sensitivity: coarse granularity (Gemini, 11 constructs)
│   ├── ratings_fine.xlsx                   # Sensitivity: fine granularity (GPT-5.5, 19 constructs)
│   ├── pooled_strata_estimates.csv         # Stratified meta-analysis pooled results
│   ├── trackB_pooled_variables.json        # 1,357 LLM-generated candidate variables (Track B input)
│   ├── trackB_final_mapping_locked.json    # Locked construct mapping (16 core confounders)
│   └── LLM_DAG_recall_ABC_3model.xlsx      # Table S2: per-model, per-prompt recall
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

Produces Figure 2 (confounder matrix), Figure 3 (B1 forest plot), Supplementary Figures S3--S5, Table S4, HR-only sensitivity (Table S5b), and leave-one-out diagnostics.

```bash
Rscript code/meta_analysis_primary.R
```

Outputs are written to `output/`.

### 3. Sensitivity analysis (construct granularity)

Repeats the stratified pooled estimates under coarse (11 constructs) and fine (19 constructs) mappings (Table S5a). B1 is design-gated, so the B1 gradient is identical across all granularities.

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
| `effect_estimates_and_ratings.xlsx` | 33 adjusted ratio-type estimates from 22 studies (PMID, study, outcome, effect measure, point estimate, 95% CI, B1 rating) |
| `main_model_covariates.xlsx` | Per-record main-model covariate sets (the empirical Track A inspection) |
| `ratings_locked16.xlsx` | Study-level bias-domain ratings (B1/B2/B3) under the locked 16-construct two-source mapping |
| `pooled_strata_estimates.csv` | Stratified meta-analysis pooled estimates by control level |
| `trackB_pooled_variables.json` | 1,357 unique candidate variables pooled across 3 models, 3 prompting strategies, and 2 outcomes |
| `trackB_final_mapping_locked.json` | Final locked construct mapping with causal-role adjudication |
| `LLM_DAG_recall_ABC_3model.xlsx` | Per-model, per-prompting-strategy variable-level recall of Track A confounder constructs |

## Correspondence

Jian Du (dujian@bjmu.edu.cn), Institute of Medical Technology, Peking University Health Science Center.

## License

This project is licensed under the MIT License.
