###############################################################################
# Framework-development-set sensitivity: construct granularity (Table S5a)
#
# Repeats the historical 22-study/33-estimate development-set analysis under
# coarse (Gemini, 11 constructs) and fine (GPT-5.5, 19 constructs)
# granularities. These outputs are retained for Table S5a and are not the
# current 24-article/39-estimate primary meta-analysis.
#
# Run from the repository root:
#   Rscript code/meta_analysis_sensitivity.R
###############################################################################

library(readxl)
library(dplyr)
library(metafor)

base_dir     <- getwd()
records_path <- file.path(base_dir, "data", "effect_estimates_and_ratings.xlsx")
out_dir      <- file.path(base_dir, "output", "sensitivity")
dir.create(out_dir, showWarnings = FALSE, recursive = TRUE)

run_sensitivity <- function(ratings_path, granularity_label) {

  cat("\n###", granularity_label, "###\n")

  ratings_raw <- read_excel(ratings_path)
  extract_pmid <- function(s) {
    m <- regmatches(s, gregexpr("[0-9]{7,}", s))
    sapply(m, function(x) if (length(x) == 0) NA_character_ else tail(x, 1))
  }

  ratings <- ratings_raw %>%
    filter(!B1_rating %in% c("N/A", NA)) %>%
    mutate(
      pmid_str = extract_pmid(study),
      B1_qual = case_when(B1_rating == "Strong" ~ 2L, B1_rating == "Moderate" ~ 1L,
                          B1_rating == "Weak" ~ 0L),
      B2_qual = case_when(B2_rating == "Strong" ~ 2L, B2_rating == "Moderate" ~ 1L,
                          B2_rating == "Weak" ~ 0L),
      B3_qual = case_when(B3_rating == "Strong" ~ 2L, B3_rating == "Moderate" ~ 1L,
                          B3_rating == "Weak" ~ 0L))

  rating_lookup <- ratings %>%
    select(pmid_str, study, B1_rating, B2_rating, B3_rating, B1_qual, B2_qual, B3_qual) %>%
    rename(rating_study_raw = study)
  rating_lookup$author_year <- tolower(trimws(gsub(
    "^(new |adhd |asd |New )+", "",
    sub("\\s+\\d{7,}.*", "",
        sub("\\s+(jamapsychiatry|JAMA|IJE|PPE|Pharma|JCP|AJE|PDS|Autism Research|JAMA Pediatr|Nature mental health|frontiers|bmc psych|plos one|Jama Pediatrics|brainsci|Pediatrics|peditric research|pediatric research|J affect discord|Int J Environ|Toxilogical|J Psychiatr Res|European Psychiatry|human reproduction|J Obstet Gynaecol Can|Neurotoxicol Teratol).*", "",
            rating_lookup$rating_study_raw, ignore.case = TRUE)))))

  records <- read_excel(records_path, sheet = "All_Records_Evalues") %>%
    mutate(pmid = as.character(pmid))

  records <- records %>%
    left_join(
      rating_lookup %>% filter(!is.na(pmid_str)) %>%
        select(pmid_str, B2_rating, B3_rating, B2_qual, B3_qual),
      by = c("pmid" = "pmid_str"))

  unmatched_idx <- which(is.na(records$B2_rating))
  if (length(unmatched_idx) > 0) {
    for (i in unmatched_idx) {
      rec_key <- tolower(records$study[i])
      match_row <- rating_lookup %>%
        filter(grepl(rec_key, author_year, fixed = TRUE) |
               grepl(sub(" .*", "", rec_key), author_year))
      if (nrow(match_row) == 1) {
        records$B2_rating[i] <- match_row$B2_rating
        records$B3_rating[i] <- match_row$B3_rating
        records$B2_qual[i]   <- match_row$B2_qual
        records$B3_qual[i]   <- match_row$B3_qual
      }
    }
  }

  records <- records %>%
    mutate(yi = log(effect),
           sei = (log(ci_upper) - log(ci_lower)) / (2 * qnorm(0.975)))

  sibling_studies <- c("Ahlqvist 2024", "Gustavson 2021", "Okubo 2025", "Lee 2026")
  records <- records %>%
    mutate(B1 = ifelse(study %in% sibling_studies & B1 == "Weak", "Moderate", B1),
           B1 = ifelse(study == "Pleau 2026" & B1 == "Weak", "Moderate", B1),
           B2_rating = ifelse(study == "Lee 2026" & is.na(B2_rating), "Moderate", B2_rating),
           B3_rating = ifelse(study == "Lee 2026" & is.na(B3_rating), "Strong", B3_rating))

  run_domain <- function(data, domain_col, domain_label) {
    data$domain_rating <- data[[domain_col]]
    data <- data %>% filter(!is.na(domain_rating))
    for (lvl in c("Strong", "Moderate", "Weak")) {
      sub <- data %>% filter(domain_rating == lvl)
      if (nrow(sub) == 0) next
      if (nrow(sub) == 1) {
        cat("  ", domain_label, lvl, "(n=1):",
            formatC(sub$effect, format = "f", digits = 2), "\n")
      } else {
        fit <- rma(yi = yi, sei = sei, data = sub, method = "REML", test = "knha")
        cat("  ", domain_label, lvl, "(n=", nrow(sub), "):",
            formatC(exp(fit$beta), format = "f", digits = 2),
            "[", formatC(exp(fit$ci.lb), format = "f", digits = 2),
            ";", formatC(exp(fit$ci.ub), format = "f", digits = 2), "]\n")
      }
    }
  }

  run_domain(records, "B1", "B1")
  run_domain(records, "B2_rating", "B2")
  run_domain(records, "B3_rating", "B3")
}

run_sensitivity(file.path(base_dir, "data", "ratings_coarse.xlsx"),
                "Coarse (Gemini, 11 constructs)")
run_sensitivity(file.path(base_dir, "data", "ratings_fine.xlsx"),
                "Fine (GPT-5.5, 19 constructs)")

cat("\nSensitivity analysis complete.\n")
