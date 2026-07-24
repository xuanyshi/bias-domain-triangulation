###############################################################################
# Primary stratified meta-analysis (NHB method; locked 16-construct mapping)
#
# This script preserves the analysis used in the NHB submission:
#   - ratio-type estimates analysed on the log scale;
#   - conventional random-effects meta-analysis estimated by REML;
#   - Knapp-Hartung inference;
#   - categorical moderator Q-tests;
#   - HR/aHR-only and leave-one-effect-out sensitivity analyses.
#
# The only evidence update is the addition of the Prahm and Luo articles.
#
# Run from the repository root:
#   Rscript code/meta_analysis_primary.R
###############################################################################

suppressPackageStartupMessages({
  library(readxl)
  library(dplyr)
  library(tidyr)
  library(ggplot2)
  library(metafor)
  library(patchwork)
  library(jsonlite)
})
try(Sys.setlocale("LC_CTYPE", "en_US.UTF-8"), silent = TRUE)

base_dir <- getwd()
source_path <- file.path(
  base_dir,
  "data",
  "SourceData_meta_analysis_20260723_B1Strong.xlsx"
)
out_dir <- file.path(base_dir, "output")
dir.create(out_dir, recursive = TRUE, showWarnings = FALSE)

rating_levels <- c("Strong", "Moderate", "Weak")

records <- read_excel(source_path, sheet = "Effect estimates") %>%
  mutate(
    record_id = as.character(record_id),
    pmid = as.character(pmid),
    effect = as.numeric(effect),
    ci_lower = as.numeric(ci_lower),
    ci_upper = as.numeric(ci_upper),
    yi = log(effect),
    sei = (log(ci_upper) - log(ci_lower)) / (2 * qnorm(0.975)),
    label = paste0(study_display, " (", condition, ")"),
    year = as.numeric(regmatches(study_display, regexpr("\\d{4}", study_display)))
  )

required_columns <- c(
  "record_id", "pmid", "study", "study_display", "condition",
  "measure_family", "effect", "ci_lower", "ci_upper", "yi", "sei",
  "B1_rating", "B2_rating", "B3_rating", "overall"
)
missing_columns <- setdiff(required_columns, names(records))
if (length(missing_columns) > 0) {
  stop("Missing required columns: ", paste(missing_columns, collapse = ", "))
}
if (anyDuplicated(records$record_id)) {
  stop("record_id must be unique.")
}
if (nrow(records) != 39 || n_distinct(records$pmid) != 24) {
  stop("Expected 39 effect estimates from 24 articles.")
}

fit_intercept <- function(data) {
  if (nrow(data) == 0) {
    return(list(
      fit = NULL,
      row = data.frame(
        n_effects = 0, n_articles = 0, estimate = NA_real_,
        ci_lower = NA_real_, ci_upper = NA_real_, I2 = NA_real_,
        tau2 = NA_real_, p_value = NA_real_
      )
    ))
  }
  if (nrow(data) == 1) {
    return(list(
      fit = NULL,
      row = data.frame(
        n_effects = 1,
        n_articles = n_distinct(data$pmid),
        estimate = data$effect[1],
        ci_lower = data$ci_lower[1],
        ci_upper = data$ci_upper[1],
        I2 = NA_real_,
        tau2 = NA_real_,
        p_value = NA_real_
      )
    ))
  }
  fit <- rma(
    yi = yi,
    sei = sei,
    data = data,
    method = "REML",
    test = "knha"
  )
  list(
    fit = fit,
    row = data.frame(
      n_effects = nrow(data),
      n_articles = n_distinct(data$pmid),
      estimate = exp(as.numeric(fit$beta)),
      ci_lower = exp(fit$ci.lb),
      ci_upper = exp(fit$ci.ub),
      I2 = fit$I2,
      tau2 = fit$tau2,
      p_value = fit$pval
    )
  )
}

fit_domain <- function(data, rating_column, domain, analysis = "Primary") {
  present <- data %>% filter(!is.na(.data[[rating_column]]))
  present$domain_rating <- factor(
    present[[rating_column]],
    levels = rating_levels
  )
  moderator <- rma(
    yi = yi,
    sei = sei,
    mods = ~ domain_rating,
    data = present,
    method = "REML",
    test = "knha"
  )
  rows <- lapply(rating_levels, function(level) {
    result <- fit_intercept(
      present %>% filter(.data[[rating_column]] == level)
    )$row
    cbind(
      data.frame(
        analysis = analysis,
        domain = domain,
        level = level,
        moderator_p = moderator$QMp,
        stringsAsFactors = FALSE
      ),
      result
    )
  })
  bind_rows(rows)
}

primary_total <- cbind(
  data.frame(
    analysis = "Primary REML random-effects model with Knapp-Hartung inference",
    stringsAsFactors = FALSE
  ),
  fit_intercept(records)$row
)

pooled_strata <- bind_rows(
  fit_domain(records, "B1_rating", "B1"),
  fit_domain(records, "B2_rating", "B2"),
  fit_domain(records, "B3_rating", "B3"),
  fit_domain(records, "overall", "Overall")
)

###############################################################################
# NHB sensitivity analyses
###############################################################################

hr_records <- records %>% filter(measure_family == "HR/aHR")
hr_total <- cbind(
  data.frame(
    analysis = "HR/aHR estimates only",
    domain = "Total",
    level = "All",
    stringsAsFactors = FALSE
  ),
  fit_intercept(hr_records)$row
)
hr_strata <- bind_rows(
  fit_domain(hr_records, "B1_rating", "B1", "HR/aHR estimates only"),
  fit_domain(hr_records, "B2_rating", "B2", "HR/aHR estimates only"),
  fit_domain(hr_records, "B3_rating", "B3", "HR/aHR estimates only"),
  fit_domain(hr_records, "overall", "Overall", "HR/aHR estimates only")
)

full_fit <- fit_intercept(records)$fit
loo_raw <- leave1out(full_fit, transf = exp)
leave_one_effect_out <- data.frame(
  omitted_index = seq_len(nrow(records)),
  omitted_record_id = records$record_id,
  omitted_article = records$study_display,
  omitted_outcome = records$condition,
  estimate = loo_raw$estimate,
  ci_lower = loo_raw$ci.lb,
  ci_upper = loo_raw$ci.ub,
  I2 = loo_raw$I2,
  tau2 = loo_raw$tau2,
  p_value = loo_raw$pval,
  stringsAsFactors = FALSE
)

###############################################################################
# Figure 3: confounder matrix
###############################################################################

matrix_rows <- records %>%
  select(study_display, year, B1_rating, B2_rating, B3_rating, overall) %>%
  distinct() %>%
  arrange(year, study_display)

if (nrow(matrix_rows) != 30) {
  stop("Expected 30 article-design combinations for the confounder matrix.")
}

matrix_long <- matrix_rows %>%
  pivot_longer(
    cols = c(B1_rating, B2_rating, B3_rating, overall),
    names_to = "domain",
    values_to = "rating"
  ) %>%
  mutate(
    domain = recode(
      domain,
      B1_rating = "B1",
      B2_rating = "B2",
      B3_rating = "B3",
      overall = "Overall"
    ),
    domain = factor(domain, levels = c("B1", "B2", "B3", "Overall")),
    study_display = factor(
      study_display,
      levels = rev(matrix_rows$study_display)
    ),
    rating = factor(rating, levels = c("Weak", "Moderate", "Strong"))
  )

p_matrix <- ggplot(matrix_long, aes(x = domain, y = study_display)) +
  geom_hline(
    yintercept = seq(1.5, nrow(matrix_rows) - 0.5, by = 1),
    color = "#E6E6E6",
    linewidth = 0.35
  ) +
  geom_point(
    aes(fill = rating),
    shape = 21,
    size = 5.4,
    colour = "#303030",
    stroke = 0.6
  ) +
  scale_fill_manual(
    values = c(
      "Weak" = "#E45A5A",
      "Moderate" = "#F7C443",
      "Strong" = "#60A85A"
    ),
    drop = FALSE
  ) +
  labs(
    title = "Confounder matrix by bias domain",
    subtitle = "30 article-design combinations; 24 articles; locked 16-construct mapping",
    x = NULL,
    y = NULL,
    fill = "Control quality"
  ) +
  theme_minimal(base_size = 13) +
  theme(
    panel.grid = element_blank(),
    axis.text.x = element_text(face = "bold", colour = "black"),
    axis.text.y = element_text(colour = "black"),
    plot.title = element_text(face = "bold", size = 18),
    plot.subtitle = element_text(size = 13, colour = "#555555"),
    legend.position = "bottom",
    legend.title = element_text(face = "bold"),
    plot.margin = margin(10, 18, 8, 8)
  )

ggsave(
  file.path(out_dir, "Figure3_confounder_matrix.png"),
  p_matrix,
  width = 6.2,
  height = 10.8,
  dpi = 300
)
ggsave(
  file.path(out_dir, "Figure3_confounder_matrix.pdf"),
  p_matrix,
  width = 6.2,
  height = 10.8
)

###############################################################################
# Forest plots: Figure 4 and Supplementary Figures S3-S5
###############################################################################

format_p <- function(p) {
  if (is.na(p)) return("NA")
  if (p < 0.0001) return("<0.0001")
  formatC(p, format = "f", digits = 4)
}

make_forest <- function(data, rating_column, domain_label, filename) {
  data <- data %>% filter(!is.na(.data[[rating_column]]))
  data$domain_rating <- factor(data[[rating_column]], levels = rating_levels)
  data <- data %>% arrange(domain_rating, year, study_display, condition)

  moderator <- rma(
    yi = yi,
    sei = sei,
    mods = ~ domain_rating,
    data = data,
    method = "REML",
    test = "knha"
  )
  overall_fit <- rma(
    yi = yi,
    sei = sei,
    data = data,
    method = "REML",
    test = "knha"
  )

  subgroup_fits <- list()
  present_levels <- rating_levels[
    rating_levels %in% as.character(unique(data$domain_rating))
  ]
  for (level in present_levels) {
    subset <- data %>% filter(domain_rating == level)
    subgroup_fits[[level]] <- fit_intercept(subset)
  }

  row_map <- list()
  header_map <- list()
  summary_map <- list()
  current <- nrow(data) + 3 * length(present_levels)
  ordered_parts <- list()
  for (level in present_levels) {
    subset <- data %>% filter(domain_rating == level)
    header_map[[level]] <- current - 0.25
    rows <- seq(current - 1, current - nrow(subset), by = -1)
    row_map[[level]] <- rows
    summary_map[[level]] <- current - nrow(subset) - 1
    ordered_parts[[level]] <- subset
    current <- current - nrow(subset) - 2.5
  }
  ordered <- bind_rows(ordered_parts)
  plot_rows <- unlist(row_map, use.names = FALSE)
  overall_row <- min(unlist(summary_map)) - 2.2
  top_row <- max(plot_rows) + 3.3

  draw <- function() {
    par(mar = c(5, 4, 2.2, 2))
    forest(
      x = ordered$yi,
      sei = ordered$sei,
      slab = ordered$label,
      rows = plot_rows,
      ylim = c(overall_row - 2.2, top_row),
      xlim = c(-3, 3),
      alim = log(c(0.2, 10)),
      at = log(c(0.5, 1, 2, 5)),
      atransf = exp,
      refline = 0,
      cex = 1.0,
      pch = 15,
      header = c("Study", "Effect Ratio [95% CI]"),
      main = paste0("Meta-analysis stratified by ", domain_label, " control"),
      xlab = "Observed Outcome"
    )

    for (level in present_levels) {
      result <- subgroup_fits[[level]]
      text(
        -3,
        header_map[[level]],
        pos = 4,
        cex = 1.05,
        font = 2,
        paste0(level, " (n = ", result$row$n_effects, ")")
      )
      if (!is.null(result$fit)) {
        addpoly(
          result$fit,
          row = summary_map[[level]],
          atransf = exp,
          cex = 1.0,
          mlab = paste0(
            "Subgroup pooled (n = ", result$row$n_effects,
            "), I² = ", formatC(result$row$I2, format = "f", digits = 0), "%"
          )
        )
      }
    }

    addpoly(
      overall_fit,
      row = overall_row,
      atransf = exp,
      cex = 1.0,
      mlab = paste0(
        "Overall pooled (n = ", nrow(data),
        "), I² = ", formatC(overall_fit$I2, format = "f", digits = 0), "%"
      )
    )
    text(
      -3,
      overall_row - 1.2,
      pos = 4,
      cex = 0.95,
      font = 3,
      if (moderator$QMp < 0.0001) {
        "Interaction test p < 0.0001"
      } else {
        paste0("Interaction test p = ", format_p(moderator$QMp))
      }
    )
  }

  height <- max(6, nrow(data) * 0.28 + 5)
  pdf(file.path(out_dir, paste0(filename, ".pdf")), width = 12, height = height)
  draw()
  dev.off()
  png(
    file.path(out_dir, paste0(filename, ".png")),
    width = 12,
    height = height,
    units = "in",
    res = 300
  )
  draw()
  dev.off()
}

make_forest(
  records,
  "B1_rating",
  "B1: Family/Genetic",
  "Figure4_forest_B1"
)
make_forest(
  records,
  "B2_rating",
  "B2: Indication",
  "FigureS3_forest_B2"
)
make_forest(
  records,
  "B3_rating",
  "B3: Social-behavioral",
  "FigureS4_forest_B3"
)
make_forest(
  records,
  "overall",
  "Overall confounding",
  "FigureS5_forest_overall"
)

###############################################################################
# Figure 5: within- and cross-domain convergence
###############################################################################

plot_levels <- c("Weak", "Moderate", "Strong")

make_domain_panel <- function(domain, title) {
  data <- pooled_strata %>%
    filter(.data$domain == .env$domain) %>%
    mutate(level = factor(level, levels = plot_levels))

  ggplot(data, aes(x = level, y = estimate)) +
    geom_hline(
      yintercept = 1,
      linetype = "dashed",
      colour = "#4477AA",
      linewidth = 0.65
    ) +
    geom_errorbar(
      aes(ymin = ci_lower, ymax = ci_upper),
      width = 0.09,
      linewidth = 0.9,
      na.rm = TRUE
    ) +
    geom_point(shape = 18, size = 4.2, na.rm = TRUE) +
    geom_text(
      data = data %>% filter(is.na(estimate)),
      aes(x = level, y = 1.23, label = "no\nstudies"),
      inherit.aes = FALSE,
      colour = "#888888",
      fontface = "italic",
      size = 4
    ) +
    coord_cartesian(ylim = c(0.85, 3.0)) +
    scale_y_continuous(breaks = seq(1.0, 3.0, by = 0.5)) +
    labs(title = title, x = "Control level", y = "Pooled Effect Estimate") +
    theme_minimal(base_size = 13) +
    theme(
      panel.grid.major.x = element_blank(),
      panel.grid.minor = element_blank(),
      plot.title = element_text(face = "bold", size = 14),
      axis.text.x = element_text(face = "bold", colour = "black")
    )
}

strong_domain <- pooled_strata %>%
  filter(domain %in% c("B1", "B2", "B3"), level == "Strong") %>%
  mutate(domain = factor(domain, levels = c("B1", "B2", "B3")))

p_cross <- ggplot(strong_domain, aes(x = domain, y = estimate)) +
  geom_hline(
    yintercept = 1,
    linetype = "dashed",
    colour = "#4477AA",
    linewidth = 0.65
  ) +
  geom_errorbar(
    aes(ymin = ci_lower, ymax = ci_upper),
    width = 0.09,
    linewidth = 0.9
  ) +
  geom_point(shape = 18, size = 4.2) +
  coord_cartesian(ylim = c(0.9, 1.5)) +
  scale_y_continuous(breaks = seq(0.9, 1.5, by = 0.1)) +
  labs(
    title = "D. Strong-control pooled effects across the three domains",
    x = "Bias domain (Strong control only)",
    y = "Pooled Effect Estimate"
  ) +
  theme_minimal(base_size = 13) +
  theme(
    panel.grid.major.x = element_blank(),
    panel.grid.minor = element_blank(),
    plot.title = element_text(face = "bold", size = 14),
    axis.text.x = element_text(face = "bold", colour = "black")
  )

p_dashboard <- (
  make_domain_panel("B1", "A. B1: genetic / familial") +
  make_domain_panel("B2", "B. B2: confounding by indication / maternal health") +
  make_domain_panel("B3", "C. B3: behavioural / lifestyle") +
  p_cross
) + plot_layout(ncol = 2)

ggsave(
  file.path(out_dir, "Figure5_convergence.png"),
  p_dashboard,
  width = 13,
  height = 10,
  dpi = 300
)
ggsave(
  file.path(out_dir, "Figure5_convergence.pdf"),
  p_dashboard,
  width = 13,
  height = 10
)

###############################################################################
# Reproducible outputs
###############################################################################

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
  bind_rows(hr_total, hr_strata),
  file.path(out_dir, "hr_sensitivity.csv"),
  row.names = FALSE,
  na = ""
)
write.csv(
  leave_one_effect_out,
  file.path(out_dir, "leave_one_effect_out.csv"),
  row.names = FALSE,
  na = ""
)
write.csv(
  pooled_strata,
  file.path(base_dir, "data", "pooled_strata_estimates.csv"),
  row.names = FALSE,
  na = ""
)

write_json(
  list(
    primary_total = primary_total,
    pooled_strata = pooled_strata,
    hr_total = hr_total,
    hr_strata = hr_strata,
    leave_one_effect_out = leave_one_effect_out,
    counts = list(
      articles = n_distinct(records$pmid),
      effects = nrow(records),
      article_design_combinations = nrow(matrix_rows),
      hr_effects = nrow(hr_records)
    )
  ),
  file.path(out_dir, "nhb_results.json"),
  pretty = TRUE,
  digits = 10,
  auto_unbox = TRUE,
  na = "null"
)

cat("NHB-method analysis complete.\n")
cat(
  "Primary total:",
  sprintf(
    "%.2f [%.2f, %.2f]\n",
    primary_total$estimate,
    primary_total$ci_lower,
    primary_total$ci_upper
  )
)
cat(
  "Leave-one-effect-out range:",
  sprintf(
    "%.2f-%.2f\n",
    min(leave_one_effect_out$estimate),
    max(leave_one_effect_out$estimate)
  )
)
