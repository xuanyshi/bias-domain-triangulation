###############################################################################
# Primary stratified meta-analysis (locked 16-construct mapping)
#
# Produces: Figure 2 (confounder matrix), Figure 3 (B1 forest),
#           Supplementary Figures S3-S5 (B2, B3, overall forests),
#           Table S4 pooled estimates, leave-one-out diagnostics
#
# Run from the repository root:
#   Rscript code/meta_analysis_primary.R
###############################################################################

library(readxl)
library(dplyr)
library(tidyr)
library(ggplot2)
library(metaconfoundr)
library(metafor)

base_dir    <- getwd()
ratings_path <- file.path(base_dir, "data", "ratings_locked16.xlsx")
records_path <- file.path(base_dir, "data", "effect_estimates_and_ratings.xlsx")
out_dir      <- file.path(base_dir, "output")
dir.create(out_dir, showWarnings = FALSE, recursive = TRUE)

###############################################################################
# 1. READ & PREPARE DATA
###############################################################################

ratings_raw <- read_excel(ratings_path)

extract_pmid <- function(s) {
  m <- regmatches(s, gregexpr("[0-9]{7,}", s))
  sapply(m, function(x) if (length(x) == 0) NA_character_ else tail(x, 1))
}

clean_study_names <- function(studies) {
  base_names <- vapply(studies, function(s) {
    s_clean <- gsub("^(new |adhd |asd |New )+", "", s)
    author <- sub("^([A-Za-z ]+?)\\s+\\d{4}.*", "\\1", s_clean)
    author <- trimws(gsub("_", " ", author))
    year   <- regmatches(s_clean, regexpr("\\b(19|20)\\d{2}\\b", s_clean))
    if (length(year) == 0) return(trimws(s_clean))
    paste0(author, " ", year)
  }, character(1), USE.NAMES = FALSE)
  duped <- base_names[duplicated(base_names)]
  if (length(duped) > 0) {
    for (i in seq_along(base_names)) {
      if (base_names[i] %in% duped) {
        s <- studies[i]
        s_clean <- gsub("^(new |adhd |asd |New )+", "", s)
        detail <- ""
        paren <- regmatches(s_clean, regexpr("\\(.*?\\)", s_clean))
        if (length(paren) > 0) {
          detail <- paren
        } else {
          after_year <- sub("^.*?\\b(19|20)\\d{2}\\b\\s*", "", s_clean)
          after_year <- gsub("\\d{7,}", "", after_year)
          after_year <- trimws(after_year)
          if (nchar(after_year) > 0) detail <- sub("\\s.*", "", after_year)
        }
        if (nchar(detail) > 0)
          base_names[i] <- paste0(base_names[i], " [", detail, "]")
      }
    }
    still_duped <- base_names[duplicated(base_names)]
    if (length(still_duped) > 0) {
      for (d in unique(still_duped)) {
        idx <- which(base_names == d)
        for (j in seq_along(idx))
          base_names[idx[j]] <- paste0(base_names[idx[j]], letters[j])
      }
    }
  }
  base_names
}

ratings <- ratings_raw %>%
  filter(!B1_rating %in% c("N/A", NA)) %>%
  mutate(
    pmid_str = extract_pmid(study),
    study_clean = clean_study_names(study),
    B1_qual = case_when(B1_rating == "Strong" ~ 2L,
                        B1_rating == "Moderate" ~ 1L,
                        B1_rating == "Weak" ~ 0L),
    B2_qual = case_when(B2_rating == "Strong" ~ 2L,
                        B2_rating == "Moderate" ~ 1L,
                        B2_rating == "Weak" ~ 0L),
    B3_qual = case_when(B3_rating == "Strong" ~ 2L,
                        B3_rating == "Moderate" ~ 1L,
                        B3_rating == "Weak" ~ 0L),
    overall_qual = case_when(
      B1_qual == 2L & B2_qual == 2L & B3_qual == 2L ~ 2L,
      B1_qual == 0L | B2_qual == 0L | B3_qual == 0L ~ 0L,
      TRUE ~ 1L)
  )

cat("Studies with complete ratings:", nrow(ratings), "\n")

records <- read_excel(records_path, sheet = "All_Records_Evalues") %>%
  mutate(pmid = as.character(pmid))

rating_lookup <- ratings %>%
  select(pmid_str, study, B1_rating, B2_rating, B3_rating, B1_qual, B2_qual, B3_qual) %>%
  rename(rating_study_raw = study)

rating_lookup$author_year <- tolower(trimws(gsub(
  "^(new |adhd |asd |New )+", "",
  sub("\\s+\\d{7,}.*", "",
      sub("\\s+(jamapsychiatry|JAMA|IJE|PPE|Pharma|JCP|AJE|PDS|Autism Research|JAMA Pediatr|Nature mental health|frontiers|bmc psych|plos one|Jama Pediatrics|brainsci|Pediatrics|peditric research|pediatric research|J affect discord|Int J Environ|Toxilogical|J Psychiatr Res|European Psychiatry|human reproduction|J Obstet Gynaecol Can|Neurotoxicol Teratol).*", "",
          rating_lookup$rating_study_raw, ignore.case = TRUE)))))

records <- records %>%
  left_join(
    rating_lookup %>% filter(!is.na(pmid_str)) %>%
      select(pmid_str, B1_rating, B2_rating, B3_rating, B1_qual, B2_qual, B3_qual),
    by = c("pmid" = "pmid_str"))

unmatched_idx <- which(is.na(records$B2_rating))
if (length(unmatched_idx) > 0) {
  for (i in unmatched_idx) {
    rec_key <- tolower(records$study[i])
    match_row <- rating_lookup %>%
      filter(grepl(rec_key, author_year, fixed = TRUE) |
             grepl(sub(" .*", "", rec_key), author_year))
    if (nrow(match_row) == 1) {
      records$B1_rating[i] <- match_row$B1_rating
      records$B2_rating[i] <- match_row$B2_rating
      records$B3_rating[i] <- match_row$B3_rating
      records$B1_qual[i]   <- match_row$B1_qual
      records$B2_qual[i]   <- match_row$B2_qual
      records$B3_qual[i]   <- match_row$B3_qual
    }
  }
}

records <- records %>%
  mutate(yi  = log(effect),
         sei = (log(ci_upper) - log(ci_lower)) / (2 * qnorm(0.975)))

# Fix ratings based on full-text verification
sibling_studies <- c("Ahlqvist 2024", "Gustavson 2021", "Okubo 2025", "Lee 2026")
records <- records %>%
  mutate(B1 = ifelse(study %in% sibling_studies & B1 == "Weak", "Moderate", B1))
records <- records %>%
  mutate(B1 = ifelse(study == "Pleau 2026" & B1 == "Weak", "Moderate", B1))
records <- records %>%
  mutate(
    B2_rating = ifelse(study == "Lee 2026" & is.na(B2_rating), "Moderate", B2_rating),
    B3_rating = ifelse(study == "Lee 2026" & is.na(B3_rating), "Strong", B3_rating),
    B2_qual = ifelse(study == "Lee 2026" & is.na(B2_qual), 1L, B2_qual),
    B3_qual = ifelse(study == "Lee 2026" & is.na(B3_qual), 2L, B3_qual))

# Label studies: a/b for multi-design, (1)/(2) for same-name-different-PMID
records <- records %>%
  group_by(study) %>%
  mutate(has_multi_design = any(B1 == "Strong") & any(B1 != "Strong"),
         n_pmids = n_distinct(pmid)) %>%
  ungroup() %>%
  mutate(design_suffix = case_when(
    has_multi_design & B1 != "Strong" ~ "a",
    has_multi_design & B1 == "Strong" ~ "b",
    TRUE ~ ""))

liew2016_pmids <- records %>% filter(study == "Liew 2016") %>%
  pull(pmid) %>% unique() %>% sort()
if (length(liew2016_pmids) > 1) {
  records <- records %>%
    mutate(pmid_suffix = case_when(
      study == "Liew 2016" & pmid == liew2016_pmids[1] ~ "1",
      study == "Liew 2016" & pmid == liew2016_pmids[2] ~ "2",
      TRUE ~ ""))
} else {
  records$pmid_suffix <- ""
}

records <- records %>%
  mutate(
    study_display = trimws(paste0(study, design_suffix,
      ifelse(pmid_suffix == "", "", paste0(" (", pmid_suffix, ")")))),
    label = paste0(study_display, " (", condition, ")"))

cat("Effect records:", nrow(records), "\n")

###############################################################################
# 2. CONFOUNDER MATRIX (Figure 2)
###############################################################################

domain_labels <- c("B1" = "B1:\nFamily/\nGenetic",
                   "B2" = "B2:\nIndication",
                   "B3" = "B3:\nSocial-\nbehavioral",
                   "OV" = "Overall")

mc_rows <- records %>%
  mutate(B1_qual_record = case_when(
    B1 == "Strong" ~ 2L, B1 == "Moderate" ~ 1L, B1 == "Weak" ~ 0L)) %>%
  select(study_display, B1_qual_record, B2_qual, B3_qual) %>%
  distinct() %>%
  rename(B1_qual = B1_qual_record) %>%
  mutate(overall_qual = case_when(
    B1_qual == 2L & B2_qual == 2L & B3_qual == 2L ~ 2L,
    B1_qual == 0L | B2_qual == 0L | B3_qual == 0L ~ 0L,
    TRUE ~ 1L))

mc_data <- bind_rows(
  mc_rows %>% transmute(construct = domain_labels["B1"], variable = domain_labels["B1"],
                        is_confounder = "Y", study = study_display, control_quality = B1_qual),
  mc_rows %>% transmute(construct = domain_labels["B2"], variable = domain_labels["B2"],
                        is_confounder = "Y", study = study_display, control_quality = B2_qual),
  mc_rows %>% transmute(construct = domain_labels["B3"], variable = domain_labels["B3"],
                        is_confounder = "Y", study = study_display, control_quality = B3_qual),
  mc_rows %>% transmute(construct = domain_labels["OV"], variable = domain_labels["OV"],
                        is_confounder = "Y", study = study_display, control_quality = overall_qual))

mc_data$construct <- factor(mc_data$construct, levels = unname(domain_labels))
mc_obj <- metaconfoundr(mc_data)

study_order <- mc_rows %>%
  mutate(year = as.numeric(regmatches(study_display, regexpr("\\d{4}", study_display)))) %>%
  arrange(year, study_display) %>% pull(study_display)
mc_obj$study <- factor(mc_obj$study, levels = rev(study_order))

n_forest <- nrow(mc_rows)
p_matrix <- ggplot(mc_obj, aes(x = variable, y = study)) +
  geom_point(aes(fill = control_quality), size = 5.5, shape = 21,
             color = "black", stroke = 0.3) +
  scale_fill_manual(
    values = c("adequate" = "#4DAF4A", "some concerns" = "#FFD92F", "inadequate" = "#E41A1C"),
    labels = c("adequate" = "Strong", "some concerns" = "Moderate", "inadequate" = "Weak"),
    name = "Control quality", drop = FALSE) +
  facet_grid(. ~ construct, scales = "free_x", space = "free_x") +
  theme_minimal(base_size = 10) +
  theme(axis.text.x = element_blank(), axis.ticks.x = element_blank(),
        axis.title = element_blank(), axis.text.y = element_text(size = 9),
        strip.text = element_text(face = "bold", size = 9),
        panel.grid.major.x = element_blank(), panel.grid.minor = element_blank(),
        legend.position = "bottom",
        plot.title = element_text(face = "bold", size = 11),
        plot.margin = margin(5, 15, 5, 5)) +
  labs(title = "Bias domain matrix",
       subtitle = paste0("n = ", n_forest, " studies included in quantitative synthesis"))

ggsave(file.path(out_dir, "Figure2_confounder_matrix.pdf"),
       p_matrix, width = 6, height = max(6, n_forest * 0.35 + 1), units = "in")
ggsave(file.path(out_dir, "Figure2_confounder_matrix.png"),
       p_matrix, width = 6, height = max(6, n_forest * 0.35 + 1), units = "in", dpi = 300)
cat("Figure 2 saved.\n")

###############################################################################
# 3. STRATIFIED FOREST PLOTS (Figure 3; Supplementary Figs S3-S5)
###############################################################################

make_stratified_forest <- function(data, domain_col, domain_label, filename) {
  data$domain_rating <- data[[domain_col]]
  data <- data %>% filter(!is.na(domain_rating))
  level_order  <- c("Strong", "Moderate", "Weak")
  data$domain_rating <- factor(data$domain_rating, levels = level_order)
  data$year <- as.numeric(regmatches(data$study, regexpr("\\d{4}", data$study)))
  data <- data %>% arrange(domain_rating, year, study)
  if (!"label" %in% names(data) || all(is.na(data$label)))
    data$label <- paste0(data$study, " (", data$condition, ")")
  n <- nrow(data)
  if (n == 0) { cat("No data for", domain_label, "\n"); return(invisible(NULL)) }

  subgroup_results <- list()
  for (lvl in level_order) {
    sub <- data %>% filter(domain_rating == lvl)
    if (nrow(sub) == 0) next
    if (nrow(sub) == 1) {
      subgroup_results[[lvl]] <- list(
        n = 1, b = sub$yi, ci.lb = log(sub$ci_lower),
        ci.ub = log(sub$ci_upper), I2 = NA, tau2 = NA)
    } else {
      fit <- rma(yi = yi, sei = sei, data = sub, method = "REML", test = "knha")
      subgroup_results[[lvl]] <- list(
        n = nrow(sub), b = as.numeric(fit$beta),
        ci.lb = fit$ci.lb, ci.ub = fit$ci.ub, I2 = fit$I2, tau2 = fit$tau2)
    }
  }

  fit_overall <- rma(yi = yi, sei = sei, data = data, method = "REML", test = "knha")

  interaction_p <- NA
  if (length(unique(na.omit(data$domain_rating))) > 1) {
    fit_mod <- rma(yi = yi, sei = sei,
                   mods = ~ factor(domain_rating, levels = level_order),
                   data = data, method = "REML", test = "knha")
    interaction_p <- fit_mod$QMp
  }

  grp_header_pos  <- list()
  grp_study_rows  <- list()
  grp_summary_pos <- list()
  row_pos <- numeric(0)
  current_top <- n + 3 * length(subgroup_results)
  for (lvl in level_order) {
    sub <- data %>% filter(domain_rating == lvl)
    if (nrow(sub) == 0) next
    grp_header_pos[[lvl]] <- current_top - 0.3
    study_rows <- seq(current_top - 1, current_top - nrow(sub), by = -1)
    grp_study_rows[[lvl]] <- study_rows
    row_pos <- c(row_pos, study_rows)
    grp_summary_pos[[lvl]] <- current_top - nrow(sub) - 1
    current_top <- current_top - nrow(sub) - 2.5
  }

  data_ordered <- data %>% arrange(domain_rating, year, study)
  bottom_row <- min(unlist(grp_summary_pos)) - 2
  top_row    <- max(row_pos) + 4

  draw_forest <- function() {
    par(mar = c(5, 4, 2, 2))
    forest(x = data_ordered$yi, sei = data_ordered$sei,
           slab = data_ordered$label, rows = row_pos,
           ylim = c(bottom_row - 2, top_row), xlim = c(-3, 3),
           alim = c(log(0.2), log(10)), at = log(c(0.5, 1, 2, 5)),
           atransf = exp, refline = 0, cex = 1.0,
           header = c(paste0("Study (N = ", n, ")"), "Effect Ratio [95% CI]"),
           main = paste0("Meta-analysis stratified by ", domain_label, " control"))
    for (lvl in level_order) {
      if (!lvl %in% names(subgroup_results)) next
      res <- subgroup_results[[lvl]]
      lbl <- paste0(lvl, " (n = ", res$n, ")")
      text(-3, grp_header_pos[[lvl]], pos = 4, cex = 1.05, font = 2, lbl)
      if (res$n > 1) {
        mlab_txt <- paste0("RE Model: I² = ",
          formatC(res$I2, format = "f", digits = 0),
          "%, τ² = ", formatC(res$tau2, format = "f", digits = 4))
        addpoly(res$b, ci.lb = res$ci.lb, ci.ub = res$ci.ub,
                rows = grp_summary_pos[[lvl]], cex = 1.0,
                atransf = exp, mlab = mlab_txt)
      }
    }
    addpoly(fit_overall, row = bottom_row, cex = 1.0, atransf = exp,
            mlab = paste0("Overall RE Model: I² = ",
              formatC(fit_overall$I2, format = "f", digits = 0),
              "%, τ² = ", formatC(fit_overall$tau2, format = "f", digits = 4)))
    if (!is.na(interaction_p))
      text(-3, bottom_row - 1.2, pos = 4, cex = 0.95, font = 3,
           paste0("Interaction test p = ", formatC(interaction_p, format = "f", digits = 4)))
  }

  h <- max(6, n * 0.28 + 5)
  pdf(file.path(out_dir, paste0(filename, ".pdf")), width = 12, height = h)
  draw_forest(); dev.off()
  png(file.path(out_dir, paste0(filename, ".png")),
      width = 12, height = h, units = "in", res = 300)
  draw_forest(); dev.off()

  cat(domain_label, "forest plot saved.\n")
  for (lvl in level_order) {
    if (!lvl %in% names(subgroup_results)) next
    res <- subgroup_results[[lvl]]
    cat("  ", lvl, "(n=", res$n, "): ",
        formatC(exp(res$b), format = "f", digits = 2),
        " [", formatC(exp(res$ci.lb), format = "f", digits = 2),
        "; ", formatC(exp(res$ci.ub), format = "f", digits = 2), "]\n")
  }
  if (!is.na(interaction_p))
    cat("  Interaction p =", formatC(interaction_p, format = "f", digits = 4), "\n")
  invisible(list(overall = fit_overall, subgroups = subgroup_results,
                 interaction_p = interaction_p))
}

cat("\n=== B1: Familial/Genetic (Figure 3) ===\n")
res_b1 <- make_stratified_forest(records, "B1", "B1: Familial/Genetic",
                                  "Figure3_forest_B1")

cat("\n=== B2: Indication (Supplementary Figure S3) ===\n")
res_b2 <- make_stratified_forest(records, "B2_rating", "B2: Indication",
                                  "FigureS3_forest_B2")

cat("\n=== B3: Social-behavioral (Supplementary Figure S4) ===\n")
res_b3 <- make_stratified_forest(records, "B3_rating", "B3: Social-behavioral",
                                  "FigureS4_forest_B3")

###############################################################################
# 4. OVERALL-STRATIFIED FOREST (Supplementary Figure S5)
###############################################################################

records <- records %>%
  mutate(
    B1_qual_rec = case_when(B1 == "Strong" ~ 2L, B1 == "Moderate" ~ 1L, TRUE ~ 0L),
    overall_qual = case_when(
      B1_qual_rec == 2L & B2_qual == 2L & B3_qual == 2L ~ 2L,
      B1_qual_rec == 0L | B2_qual == 0L | B3_qual == 0L ~ 0L,
      TRUE ~ 1L),
    overall_rating = case_when(
      overall_qual == 2L ~ "Strong", overall_qual == 1L ~ "Moderate", TRUE ~ "Weak"))

cat("\n=== Overall (Supplementary Figure S5) ===\n")
res_ov <- make_stratified_forest(records, "overall_rating", "Overall confounding",
                                  "FigureS5_forest_overall")

###############################################################################
# 5. HR/aHR SENSITIVITY (Table S5b)
###############################################################################

records_hr <- records %>% filter(measure_family == "HR/aHR")
cat("\n=== SENSITIVITY: HR/aHR only (n =", nrow(records_hr), ") ===\n")
if (nrow(records_hr) >= 3) {
  make_stratified_forest(records_hr, "B1", "B1 [HR only]", "sensitivity_HR_B1")
  make_stratified_forest(records_hr, "B2_rating", "B2 [HR only]", "sensitivity_HR_B2")
  make_stratified_forest(records_hr, "B3_rating", "B3 [HR only]", "sensitivity_HR_B3")
}

###############################################################################
# 6. LEAVE-ONE-OUT (Table S5c)
###############################################################################

cat("\n=== Leave-One-Out ===\n")
fit_full <- rma(yi = yi, sei = sei, data = records, method = "REML", test = "knha")
loo <- leave1out(fit_full, transf = exp)
cat("Overall:", formatC(exp(fit_full$beta), format = "f", digits = 2),
    "[", formatC(exp(fit_full$ci.lb), format = "f", digits = 2),
    ";", formatC(exp(fit_full$ci.ub), format = "f", digits = 2), "]\n")
cat("Leave-one-out range:",
    formatC(min(loo$estimate), format = "f", digits = 2), "-",
    formatC(max(loo$estimate), format = "f", digits = 2), "\n")

cat("\nAll outputs saved to:", out_dir, "\n")
