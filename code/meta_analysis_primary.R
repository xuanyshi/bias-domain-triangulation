###############################################################################
# Primary dependence-adjusted meta-analysis
#
# Reproduces the current submission results from:
#   data/SourceData_meta_analysis_20260723_B1Strong.xlsx
#
# Model:
#   - log ratio-type estimates;
#   - REML multilevel meta-analysis;
#   - random intercepts for dependence cluster and effect estimate;
#   - working within-cluster sampling correlation rho = 0.5;
#   - cluster-robust CR2 inference with Satterthwaite degrees of freedom;
#   - HTZ small-sample Wald tests for between-level moderator contrasts.
#
# Run from the repository root:
#   Rscript code/meta_analysis_primary.R
#
# Computed CSV files and a validation report are written to output/.
###############################################################################

suppressPackageStartupMessages({
  library(readxl)
  library(dplyr)
  library(metafor)
  library(clubSandwich)
})

base_dir <- getwd()
source_path <- file.path(
  base_dir,
  "data",
  "SourceData_meta_analysis_20260723_B1Strong.xlsx"
)
out_dir <- file.path(base_dir, "output")
dir.create(out_dir, showWarnings = FALSE, recursive = TRUE)

analysis_primary <- "Primary dependence-adjusted multilevel model"
rating_levels <- c("Weak", "Moderate", "Strong")

numeric_columns <- c(
  "effect", "ci_lower", "ci_upper", "ln_theta", "sei",
  "Evalue_point", "Evalue_CI"
)

records <- read_excel(source_path, sheet = "Effect estimates") %>%
  mutate(
    across(any_of(numeric_columns), ~ suppressWarnings(as.numeric(.x))),
    record_id = as.character(record_id),
    pmid = as.character(pmid),
    dependency_cluster = as.character(dependency_cluster),
    yi = log(effect),
    sei = (log(ci_upper) - log(ci_lower)) / (2 * qnorm(0.975)),
    vi = sei^2
  )

required_columns <- c(
  "record_id", "pmid", "study", "study_display", "condition",
  "measure_family", "effect", "ci_lower", "ci_upper", "yi", "vi",
  "B1_rating", "B2_rating", "B3_rating", "overall",
  "dependency_cluster"
)
missing_columns <- setdiff(required_columns, names(records))
if (length(missing_columns) > 0) {
  stop("Missing required columns: ", paste(missing_columns, collapse = ", "))
}
if (anyDuplicated(records$record_id)) {
  stop("record_id must be unique.")
}
if (any(!is.finite(records$yi)) || any(!is.finite(records$vi))) {
  stop("All log estimates and sampling variances must be finite.")
}

prepare_subset <- function(data) {
  data %>%
    mutate(
      record_id = factor(record_id),
      dependency_cluster = factor(dependency_cluster)
    ) %>%
    droplevels()
}

working_covariance <- function(data, rho) {
  suppressWarnings(
    impute_covariance_matrix(
      vi = data$vi,
      cluster = data$dependency_cluster,
      r = rho,
      smooth_vi = FALSE
    )
  )
}

fit_intercept <- function(data, rho = 0.5) {
  data <- prepare_subset(data)
  V <- working_covariance(data, rho)
  fit <- rma.mv(
    yi = yi,
    V = V,
    random = ~ 1 | dependency_cluster / record_id,
    data = data,
    method = "REML"
  )
  robust_test <- coef_test(
    fit,
    vcov = "CR2",
    cluster = data$dependency_cluster,
    test = "Satterthwaite"
  )
  robust_ci <- conf_int(
    fit,
    vcov = "CR2",
    cluster = data$dependency_cluster,
    test = "Satterthwaite"
  )

  data.frame(
    n_effects = nrow(data),
    n_articles = n_distinct(data$pmid),
    n_clusters = n_distinct(data$dependency_cluster),
    estimate = exp(robust_ci$beta[1]),
    ci_lower = exp(robust_ci$CI_L[1]),
    ci_upper = exp(robust_ci$CI_U[1]),
    se_log = robust_test$SE[1],
    df_satterthwaite = robust_test$df_Satt[1],
    p_value = robust_test$p_Satt[1],
    sigma2_cluster = fit$sigma2[1],
    sigma2_effect = fit$sigma2[2],
    stringsAsFactors = FALSE
  )
}

fit_moderator <- function(data, rating_column, rho = 0.5) {
  data <- prepare_subset(data)
  present_levels <- rating_levels[rating_levels %in% unique(data[[rating_column]])]
  data$rating <- factor(data[[rating_column]], levels = present_levels)
  V <- working_covariance(data, rho)
  fit <- rma.mv(
    yi = yi,
    V = V,
    mods = ~ 0 + rating,
    random = ~ 1 | dependency_cluster / record_id,
    data = data,
    method = "REML"
  )
  test <- Wald_test(
    fit,
    constraints = constrain_equal(seq_along(present_levels)),
    vcov = "CR2",
    cluster = data$dependency_cluster,
    test = "HTZ"
  )
  data.frame(
    moderator_f = test$Fstat[1],
    moderator_df_num = test$df_num[1],
    moderator_df_denom = test$df_denom[1],
    moderator_p = test$p_val[1],
    stringsAsFactors = FALSE
  )
}

fit_strata <- function(
    data,
    rating_column,
    domain,
    analysis = analysis_primary,
    rho = 0.5
) {
  moderator <- fit_moderator(data, rating_column, rho)
  rows <- lapply(rating_levels, function(level) {
    subset <- data[data[[rating_column]] == level, , drop = FALSE]
    if (nrow(subset) == 0) {
      result <- data.frame(
        n_effects = 0,
        n_articles = 0,
        n_clusters = 0,
        estimate = NA_real_,
        ci_lower = NA_real_,
        ci_upper = NA_real_,
        se_log = NA_real_,
        df_satterthwaite = NA_real_,
        p_value = NA_real_,
        sigma2_cluster = NA_real_,
        sigma2_effect = NA_real_
      )
    } else {
      result <- fit_intercept(subset, rho)
    }
    cbind(
      data.frame(
        analysis = analysis,
        rho = rho,
        domain = domain,
        level = level,
        stringsAsFactors = FALSE
      ),
      result,
      moderator
    )
  })
  bind_rows(rows)
}

fit_total_row <- function(data, analysis, rho = 0.5, include_domain = FALSE) {
  result <- fit_intercept(data, rho)
  prefix <- data.frame(
    analysis = analysis,
    rho = rho,
    stringsAsFactors = FALSE
  )
  if (include_domain) {
    prefix$domain <- "Total"
    prefix$level <- "All"
  }
  cbind(prefix, result)
}

fit_analysis_bundle <- function(data, analysis, rho = 0.5) {
  bind_rows(
    fit_total_row(data, analysis, rho, include_domain = TRUE) %>%
      mutate(
        moderator_f = NA_real_,
        moderator_df_num = NA_real_,
        moderator_df_denom = NA_real_,
        moderator_p = NA_real_
      ),
    fit_strata(data, "B1_rating", "B1", analysis, rho)
  )
}

primary_total <- fit_total_row(records, analysis_primary, rho = 0.5)

pooled_strata <- bind_rows(
  fit_strata(records, "B1_rating", "B1"),
  fit_strata(records, "B2_rating", "B2"),
  fit_strata(records, "B3_rating", "B3"),
  fit_strata(records, "overall", "Overall")
)

rho_sensitivity <- bind_rows(lapply(c(0, 0.3, 0.5, 0.7, 0.9), function(rho) {
  fit_total_row(records, "Working-correlation sensitivity", rho)
}))

without_liew <- records %>% filter(record_id != "26688372_ASD")
without_prahm <- records %>% filter(pmid != "41973453")

independent_clusters <- records %>%
  mutate(
    dependency_cluster = case_when(
      record_id == "26688372_ASD" ~ "26688372",
      pmid == "41973453" ~ "41973453",
      TRUE ~ dependency_cluster
    )
  )

prahm_moderate <- records %>%
  mutate(
    B1_rating = if_else(
      record_id == "41973453_ASD_sib",
      "Moderate",
      B1_rating
    )
  )

hr_rate_records <- records %>%
  filter(measure_family %in% c("HR/aHR", "RR/IRR"))

model_sensitivity <- bind_rows(
  fit_analysis_bundle(without_liew, "Exclude Liew 2016a ASD"),
  fit_analysis_bundle(without_prahm, "Exclude Prahm 2026"),
  fit_analysis_bundle(
    independent_clusters,
    "Treat Liew 2016a and Prahm 2026 as independent clusters"
  ),
  fit_analysis_bundle(
    prahm_moderate,
    "Rate Prahm sibling cohort as B1 Moderate"
  ),
  fit_analysis_bundle(hr_rate_records, "Hazard/rate ratios only")
)

hr_rate_strata <- bind_rows(
  fit_strata(
    hr_rate_records,
    "B1_rating",
    "B1",
    "Hazard/rate ratios only"
  ),
  fit_strata(
    hr_rate_records,
    "B2_rating",
    "B2",
    "Hazard/rate ratios only"
  ),
  fit_strata(
    hr_rate_records,
    "B3_rating",
    "B3",
    "Hazard/rate ratios only"
  ),
  fit_strata(
    hr_rate_records,
    "overall",
    "Overall",
    "Hazard/rate ratios only"
  )
)

dependence_specification <- read_excel(
  source_path,
  sheet = "Dependence specification"
)

leave_one_cluster_out <- bind_rows(lapply(
  unique(records$dependency_cluster),
  function(cluster) {
    omitted <- records %>% filter(dependency_cluster == cluster)
    retained <- records %>% filter(dependency_cluster != cluster)
    cbind(
      data.frame(
        omitted_cluster = cluster,
        omitted_pmids = as.character(
          dependence_specification$pmids[
            match(
              cluster,
              as.character(dependence_specification$dependency_cluster)
            )
          ]
        ),
        omitted_effects = nrow(omitted),
        stringsAsFactors = FALSE
      ),
      fit_intercept(retained, rho = 0.5)
    )
  }
))

write.csv(
  primary_total,
  file.path(out_dir, "primary_total.csv"),
  row.names = FALSE,
  na = ""
)
write.csv(
  pooled_strata,
  file.path(out_dir, "pooled_strata_estimates.csv"),
  row.names = FALSE,
  na = ""
)
write.csv(
  rho_sensitivity,
  file.path(out_dir, "rho_sensitivity.csv"),
  row.names = FALSE,
  na = ""
)
write.csv(
  model_sensitivity,
  file.path(out_dir, "model_sensitivity.csv"),
  row.names = FALSE,
  na = ""
)
write.csv(
  hr_rate_strata,
  file.path(out_dir, "hr_rate_strata.csv"),
  row.names = FALSE,
  na = ""
)
write.csv(
  dependence_specification,
  file.path(out_dir, "dependence_specification.csv"),
  row.names = FALSE,
  na = ""
)
write.csv(
  leave_one_cluster_out,
  file.path(out_dir, "leave_one_cluster_out.csv"),
  row.names = FALSE,
  na = ""
)

numeric_result_columns <- c(
  "rho", "n_effects", "n_articles", "n_clusters",
  "estimate", "ci_lower", "ci_upper", "se_log", "df_satterthwaite",
  "p_value", "sigma2_cluster", "sigma2_effect", "moderator_f",
  "moderator_df_num", "moderator_df_denom", "moderator_p",
  "omitted_effects"
)

validate_table <- function(
    generated,
    sheet_name,
    character_columns = character(),
    tolerance = 1e-6
) {
  expected <- read_excel(source_path, sheet = sheet_name)
  if (nrow(generated) != nrow(expected)) {
    stop(
      sheet_name,
      ": generated ",
      nrow(generated),
      " rows but Source Data contains ",
      nrow(expected),
      "."
    )
  }

  common_numeric <- intersect(
    intersect(names(generated), names(expected)),
    numeric_result_columns
  )
  max_difference <- 0
  for (column in common_numeric) {
    observed <- suppressWarnings(as.numeric(generated[[column]]))
    target <- suppressWarnings(as.numeric(expected[[column]]))
    comparable <- is.finite(observed) & is.finite(target)
    if (any(xor(is.na(observed), is.na(target)))) {
      stop(sheet_name, ": missing-value mismatch in ", column, ".")
    }
    if (any(comparable)) {
      column_difference <- max(abs(observed[comparable] - target[comparable]))
      max_difference <- max(max_difference, column_difference)
    }
  }

  for (column in intersect(character_columns, names(expected))) {
    observed <- ifelse(is.na(generated[[column]]), "", generated[[column]])
    target <- ifelse(is.na(expected[[column]]), "", expected[[column]])
    if (!identical(as.character(observed), as.character(target))) {
      stop(sheet_name, ": character mismatch in ", column, ".")
    }
  }

  if (max_difference > tolerance) {
    stop(
      sheet_name,
      ": maximum numeric difference ",
      format(max_difference, scientific = TRUE),
      " exceeds tolerance ",
      tolerance,
      "."
    )
  }
  data.frame(
    sheet = sheet_name,
    rows = nrow(expected),
    max_numeric_difference = max_difference,
    tolerance = tolerance,
    status = "PASS",
    stringsAsFactors = FALSE
  )
}

validation <- bind_rows(
  validate_table(
    primary_total,
    "Primary total",
    c("analysis")
  ),
  validate_table(
    pooled_strata,
    "Pooled strata",
    c("analysis", "domain", "level")
  ),
  validate_table(
    rho_sensitivity,
    "Rho sensitivity",
    c("analysis")
  ),
  validate_table(
    model_sensitivity,
    "Model sensitivity",
    c("analysis", "domain", "level")
  ),
  validate_table(
    hr_rate_strata,
    "HR-rate strata",
    c("analysis", "domain", "level")
  ),
  validate_table(
    leave_one_cluster_out,
    "Leave-one-cluster-out",
    c("omitted_cluster", "omitted_pmids")
  )
)

write.csv(
  validation,
  file.path(out_dir, "validation_against_source_data.csv"),
  row.names = FALSE
)

cat("Effects:", nrow(records), "\n")
cat("Independent articles:", n_distinct(records$pmid), "\n")
cat("Dependence clusters:", n_distinct(records$dependency_cluster), "\n")
cat(
  "Primary estimate:",
  sprintf(
    "%.2f [%.2f, %.2f]",
    primary_total$estimate,
    primary_total$ci_lower,
    primary_total$ci_upper
  ),
  "\n"
)
cat("Validation: all current Source Data result tables reproduced.\n")
cat("Outputs:", out_dir, "\n")
