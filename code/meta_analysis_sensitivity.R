###############################################################################
# Current-39 sensitivity analyses: construct granularity and rating thresholds
#
# Run from the repository root:
#   python3 code/sensitivity_granularity.py
#   Rscript code/meta_analysis_sensitivity.R
###############################################################################

library(readxl)
library(dplyr)
library(metafor)

base_dir <- getwd()
effect_path <- file.path(base_dir, "data", "SourceData_meta_analysis_20260727_B1Strong.xlsx")
ratings_path <- file.path(base_dir, "output", "sensitivity", "ratings_sensitivity_current39.csv")
out_dir <- file.path(base_dir, "output", "sensitivity")
dir.create(out_dir, showWarnings = FALSE, recursive = TRUE)

effects <- read_excel(effect_path, sheet = "Effect estimates") %>%
  mutate(
    record_id = as.character(record_id),
    pmid = as.character(pmid),
    effect = as.numeric(effect),
    ci_lower = as.numeric(ci_lower),
    ci_upper = as.numeric(ci_upper),
    yi = log(effect),
    sei = (log(ci_upper) - log(ci_lower)) / (2 * qnorm(0.975))
  )

ratings <- read.csv(ratings_path, stringsAsFactors = FALSE) %>%
  mutate(
    record_id = as.character(record_id),
    pmid = as.character(pmid)
  )

records <- effects %>%
  select(record_id, pmid, study, condition, effect, ci_lower, ci_upper, yi, sei) %>%
  left_join(ratings, by = c("record_id", "pmid", "study", "condition"))

if (nrow(records) != 39 || anyNA(records$B1_rating)) {
  stop("Current-39 join failed or produced missing ratings.")
}

pool_stratum <- function(data) {
  if (nrow(data) == 1) {
    return(data.frame(
      n_estimates = 1L,
      n_articles = length(unique(data$pmid)),
      estimate = data$effect,
      ci_lower = data$ci_lower,
      ci_upper = data$ci_upper,
      p_value = NA_real_,
      I2 = NA_real_,
      tau2 = NA_real_
    ))
  }
  fit <- rma(yi = yi, sei = sei, data = data, method = "REML", test = "knha")
  data.frame(
    n_estimates = nrow(data),
    n_articles = length(unique(data$pmid)),
    estimate = exp(as.numeric(fit$beta)),
    ci_lower = exp(fit$ci.lb),
    ci_upper = exp(fit$ci.ub),
    p_value = fit$pval,
    I2 = fit$I2,
    tau2 = fit$tau2
  )
}

moderator_p <- function(data, rating_column) {
  data$rating <- factor(data[[rating_column]], levels = c("Weak", "Moderate", "Strong"))
  data <- data[!is.na(data$rating), ]
  data$rating <- droplevels(data$rating)
  if (length(unique(data$rating)) < 2) {
    return(NA_real_)
  }
  fit <- rma(yi = yi, sei = sei, mods = ~ rating, data = data, method = "REML", test = "knha")
  fit$QMp
}

run_specification <- function(data, family, specification, b2_column, b3_column) {
  domain_columns <- c(B1 = "B1_rating", B2 = b2_column, B3 = b3_column)
  output <- list()
  for (domain in names(domain_columns)) {
    rating_column <- domain_columns[[domain]]
    p_mod <- moderator_p(data, rating_column)
    for (level in c("Strong", "Moderate", "Weak")) {
      stratum <- data[data[[rating_column]] == level, ]
      if (nrow(stratum) == 0) {
        next
      }
      pooled <- pool_stratum(stratum)
      pooled$analysis_family <- family
      pooled$specification <- specification
      pooled$domain <- domain
      pooled$level <- level
      pooled$moderator_p <- p_mod
      output[[length(output) + 1]] <- pooled
    }
  }
  bind_rows(output) %>%
    select(
      analysis_family, specification, domain, level,
      n_estimates, n_articles, estimate, ci_lower, ci_upper,
      p_value, I2, tau2, moderator_p
    )
}

granularity <- bind_rows(
  run_specification(records, "Construct granularity", "Coarse (11 constructs)",
                    "coarse_B2_rating", "coarse_B3_rating"),
  run_specification(records, "Construct granularity", "Medium (16 constructs; primary)",
                    "medium_B2_rating", "medium_B3_rating"),
  run_specification(records, "Construct granularity", "Fine (19 constructs)",
                    "fine_B2_rating", "fine_B3_rating")
)

thresholds <- bind_rows(
  run_specification(records, "Rating threshold", "Looser (B2 >=2/5; B3 >=3/8)",
                    "looser_B2_rating", "looser_B3_rating"),
  run_specification(records, "Rating threshold", "Primary (B2 >=3/5; B3 >=4/8)",
                    "primary_B2_rating", "primary_B3_rating"),
  run_specification(records, "Rating threshold", "Stricter (B2 >=4/5; B3 >=5/8)",
                    "stricter_B2_rating", "stricter_B3_rating")
)

write.csv(
  granularity,
  file.path(out_dir, "granularity_sensitivity_current39.csv"),
  row.names = FALSE,
  na = ""
)
write.csv(
  thresholds,
  file.path(out_dir, "threshold_sensitivity_current39.csv"),
  row.names = FALSE,
  na = ""
)

summary_rows <- bind_rows(granularity, thresholds) %>%
  filter(level == "Strong") %>%
  arrange(analysis_family, specification, domain)
write.csv(
  summary_rows,
  file.path(out_dir, "sensitivity_strong_strata_current39.csv"),
  row.names = FALSE,
  na = ""
)

print(summary_rows %>%
        mutate(across(c(estimate, ci_lower, ci_upper, moderator_p), ~ round(.x, 4))))
cat("\nCurrent-39 sensitivity analyses complete.\n")
