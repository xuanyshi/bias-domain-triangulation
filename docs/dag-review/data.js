window.DAG_DATA = {
  "version": "2026-09-10.s1-v2",
  "graphHash": "4d57e018cefebc57f41f16ed978624073bbc970ed820851c40aec3ef3860c0a1",
  "source": "Supplementary Information 2026-09-04 v3, Table S1: all 29 constructs plus exposure and outcome. The original manuscript supplies 50 directed edges; four S1-only constructs have no prespecified edges. Extracted covariate-label mapping 2026-09-04.",
  "nodes": [
    {
      "id": "dag-01",
      "name": "Prenatal acetaminophen",
      "zh": "孕期对乙酰氨基酚使用",
      "domain": "Exposure",
      "role": "Exposure",
      "scope": "Prenatal acetaminophen",
      "rationale": "研究问题中的暴露",
      "constructId": "",
      "labels": [],
      "note": ""
    },
    {
      "id": "dag-02",
      "name": "Offspring ASD/ADHD",
      "zh": "子代 ASD / ADHD",
      "domain": "Outcome",
      "role": "Outcome",
      "scope": "Offspring ASD/ADHD",
      "rationale": "研究问题中的结局",
      "constructId": "",
      "labels": [],
      "note": "目前合并 ASD 与 ADHD，请判断是否需要分别建立结局图。"
    },
    {
      "id": "dag-03",
      "name": "Shared familial/genetic background",
      "zh": "家族共享环境及遗传背景",
      "domain": "B1",
      "role": "Confounder",
      "scope": "Shared familial/genetic background",
      "rationale": "Latent shared-familial back-door; design-gated",
      "constructId": "C01",
      "labels": [
        {
          "label": "+ family_stratum(家庭分层, cluster-robust SE)",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41801232/"
          ]
        },
        {
          "label": "+ family_stratum(家庭固定效应)",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/"
          ]
        },
        {
          "label": "family_mean_exposure",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/37431475/"
          ]
        },
        {
          "label": "family_stratum",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "family_stratum(以家庭为层的 stratified Cox)",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ]
        },
        {
          "label": "maternal_ID_cluster",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ]
        }
      ],
      "note": "下列标签含家庭分层、聚类等设计或模型术语，不能逐一视为临床变量。",
      "s1Order": 1,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)"
    },
    {
      "id": "dag-04",
      "name": "Maternal neurodevelopmental liability",
      "zh": "母亲神经发育易感性",
      "domain": "B1",
      "role": "Confounder",
      "scope": "Maternal neurodevelopmental liability",
      "rationale": "B1 proxy (maternal ADHD/ASD traits)",
      "constructId": "C02",
      "labels": [
        {
          "label": "ADHD_med",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ]
        },
        {
          "label": "maternal_ADHD",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "maternal_ASD",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "maternal_IQ",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/27353198/",
            "https://pubmed.ncbi.nlm.nih.gov/28031314/"
          ]
        },
        {
          "label": "maternal_adhd",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ]
        },
        {
          "label": "maternal_asd",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/"
          ]
        },
        {
          "label": "maternal_intellectual_dis",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/"
          ]
        },
        {
          "label": "maternal_intellectual_disability",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "parental_adhd",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/29084830/"
          ]
        }
      ],
      "note": "",
      "s1Order": 2,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)"
    },
    {
      "id": "dag-05",
      "name": "Maternal psychiatric vulnerability",
      "zh": "母亲精神心理易感性",
      "domain": "B1",
      "role": "Confounder",
      "scope": "Maternal psychiatric vulnerability",
      "rationale": "B1 proxy (depression/anxiety; shared heritable variance)",
      "constructId": "C03",
      "labels": [
        {
          "label": "antidepressant",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/41973453/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "antipsychotics",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ]
        },
        {
          "label": "anxiety",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/29084830/"
          ]
        },
        {
          "label": "anxiety/depression",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/36170224/",
            "https://pubmed.ncbi.nlm.nih.gov/37431475/"
          ]
        },
        {
          "label": "depression",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/29084830/"
          ]
        },
        {
          "label": "depression/anxiety",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ]
        },
        {
          "label": "family_mental_health_disorders",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40964537/"
          ]
        },
        {
          "label": "maternal_mental_health",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/28031314/"
          ]
        },
        {
          "label": "maternal_mental_health_disorders",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/31509360/"
          ]
        },
        {
          "label": "maternal_mood_disorder",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/30458756/"
          ]
        },
        {
          "label": "maternal_psychiatric",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/"
          ]
        },
        {
          "label": "maternal_psychiatric_disorder",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "maternal_psychiatric_disorders",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41801232/"
          ]
        },
        {
          "label": "maternal_psychiatric_illness",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/24566677/",
            "https://pubmed.ncbi.nlm.nih.gov/26688372/",
            "https://pubmed.ncbi.nlm.nih.gov/27533796/",
            "https://pubmed.ncbi.nlm.nih.gov/33230558/"
          ]
        },
        {
          "label": "maternal_sibling_psychiatric_history",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ]
        },
        {
          "label": "other_mental_health",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ]
        },
        {
          "label": "paternal_psychiatric_history",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ]
        },
        {
          "label": "psychiatric_condition",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ]
        },
        {
          "label": "psychiatric_disease",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ]
        },
        {
          "label": "psycholeptic",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ]
        }
      ],
      "note": "",
      "s1Order": 3,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)"
    },
    {
      "id": "dag-06",
      "name": "Acute infection / fever indication",
      "zh": "急性感染或发热适应证",
      "domain": "B2",
      "role": "Confounder",
      "scope": "Acute infection / fever indication",
      "rationale": "Indication common cause",
      "constructId": "C04",
      "labels": [
        {
          "label": "fever",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/24566677/",
            "https://pubmed.ncbi.nlm.nih.gov/26688372/",
            "https://pubmed.ncbi.nlm.nih.gov/27353198/",
            "https://pubmed.ncbi.nlm.nih.gov/33230558/",
            "https://pubmed.ncbi.nlm.nih.gov/34679367/",
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/40898607/",
            "https://pubmed.ncbi.nlm.nih.gov/41238184/",
            "https://pubmed.ncbi.nlm.nih.gov/41973453/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "fever/infection",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/37431475/"
          ]
        },
        {
          "label": "fever/infection/inflammation",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/28031314/"
          ]
        },
        {
          "label": "gestational_infections",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/31509360/"
          ]
        },
        {
          "label": "infection",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/27533796/",
            "https://pubmed.ncbi.nlm.nih.gov/30458756/",
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/40898607/",
            "https://pubmed.ncbi.nlm.nih.gov/41973453/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "infection/inflammation",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/24566677/",
            "https://pubmed.ncbi.nlm.nih.gov/26688372/",
            "https://pubmed.ncbi.nlm.nih.gov/33230558/"
          ]
        },
        {
          "label": "intrauterine_infection/inflammation",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/29970852/"
          ]
        },
        {
          "label": "maternal_fever",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/29970852/"
          ]
        },
        {
          "label": "maternal_inflammation/infection",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41801232/"
          ]
        },
        {
          "label": "urinary_tract_infection",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/27353198/"
          ]
        }
      ],
      "note": "",
      "s1Order": 4,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)"
    },
    {
      "id": "dag-07",
      "name": "Pain / headache / migraine indication",
      "zh": "疼痛、头痛或偏头痛适应证",
      "domain": "B2",
      "role": "Confounder",
      "scope": "Pain / headache / migraine indication",
      "rationale": "Indication common cause",
      "constructId": "C05",
      "labels": [
        {
          "label": "chronic_pain",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/40898607/",
            "https://pubmed.ncbi.nlm.nih.gov/41973453/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "diagnosed_headache",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ]
        },
        {
          "label": "fibromyalgia",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ]
        },
        {
          "label": "headache",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/27533796/",
            "https://pubmed.ncbi.nlm.nih.gov/36937866/",
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/40898607/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "migraine",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/27533796/",
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/40898607/",
            "https://pubmed.ncbi.nlm.nih.gov/41973453/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "muscle_joint_disease",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/24566677/",
            "https://pubmed.ncbi.nlm.nih.gov/26688372/",
            "https://pubmed.ncbi.nlm.nih.gov/27533796/",
            "https://pubmed.ncbi.nlm.nih.gov/33230558/"
          ]
        },
        {
          "label": "neuropathic_pain",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ]
        },
        {
          "label": "pain",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/37431475/",
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ]
        },
        {
          "label": "pain/musculoskeletal",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/28031314/"
          ]
        }
      ],
      "note": "",
      "s1Order": 5,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)"
    },
    {
      "id": "dag-08",
      "name": "Chronic maternal medical conditions",
      "zh": "母亲慢性疾病",
      "domain": "B2",
      "role": "Confounder",
      "scope": "Chronic maternal medical conditions",
      "rationale": "Pre-existing maternal disease",
      "constructId": "C06",
      "labels": [
        {
          "label": "SLE",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ]
        },
        {
          "label": "asthma",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/",
            "https://pubmed.ncbi.nlm.nih.gov/41238184/",
            "https://pubmed.ncbi.nlm.nih.gov/41973453/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "chronic_autoimmune/inflammatory",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/37431475/"
          ]
        },
        {
          "label": "chronic_hypertension",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ]
        },
        {
          "label": "chronic_illness",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/27353198/"
          ]
        },
        {
          "label": "chronic_kidney_disease",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "diabetes",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/",
            "https://pubmed.ncbi.nlm.nih.gov/41973453/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "epilepsy",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ]
        },
        {
          "label": "hypertension",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ]
        },
        {
          "label": "hypertensive_disease",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "rheumatoid_arthritis",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/40898607/",
            "https://pubmed.ncbi.nlm.nih.gov/41973453/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "thyroid_condition",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/36170224/"
          ]
        }
      ],
      "note": "",
      "s1Order": 6,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)"
    },
    {
      "id": "dag-09",
      "name": "Concomitant medication / treatment context",
      "zh": "合并用药及治疗背景",
      "domain": "B2",
      "role": "Confounder",
      "scope": "Concomitant medication / treatment context",
      "rationale": "Co-medication / treatment context",
      "constructId": "C07",
      "labels": [
        {
          "label": "CCB",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ]
        },
        {
          "label": "H2_blocker",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ]
        },
        {
          "label": "NSAID",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/33230558/",
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/40964537/",
            "https://pubmed.ncbi.nlm.nih.gov/41238184/",
            "https://pubmed.ncbi.nlm.nih.gov/41973453/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "NSAIDs",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ]
        },
        {
          "label": "PPI",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ]
        },
        {
          "label": "antibiotic",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40964537/"
          ]
        },
        {
          "label": "antibiotics",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ]
        },
        {
          "label": "antidiabetics",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ]
        },
        {
          "label": "antiemetic",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ]
        },
        {
          "label": "antiepileptic",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "antiepileptics",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ]
        },
        {
          "label": "antihistamine",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ]
        },
        {
          "label": "antihypertensive",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "antimigraine",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/40898607/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "antiseizure",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ]
        },
        {
          "label": "antithyroid",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ]
        },
        {
          "label": "aspirin",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/26688372/",
            "https://pubmed.ncbi.nlm.nih.gov/28031314/",
            "https://pubmed.ncbi.nlm.nih.gov/30923825/",
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/40898607/",
            "https://pubmed.ncbi.nlm.nih.gov/41973453/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "aspirin_or_ibuprofen",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41801232/"
          ]
        },
        {
          "label": "aspirin_or_ibuprofen(合并1项)",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41801232/"
          ]
        },
        {
          "label": "asthma_drugs",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ]
        },
        {
          "label": "beta_blockers",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ]
        },
        {
          "label": "corticosteroids",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ]
        },
        {
          "label": "folic_acid",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/26688372/"
          ]
        },
        {
          "label": "glucose_lowering_agent",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "ibuprofen",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/26688372/",
            "https://pubmed.ncbi.nlm.nih.gov/28031314/"
          ]
        },
        {
          "label": "lipid_lowering",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ]
        },
        {
          "label": "lipid_regulating_drug",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "migraine_med",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ]
        },
        {
          "label": "migraine_medication",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ]
        },
        {
          "label": "n_co-medications",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/37431475/"
          ]
        },
        {
          "label": "n_other_medications",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ]
        },
        {
          "label": "opioid",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/41238184/",
            "https://pubmed.ncbi.nlm.nih.gov/41973453/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "other_NSAIDs",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/30923825/"
          ]
        },
        {
          "label": "other_analgesic",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/30458756/"
          ]
        },
        {
          "label": "other_medication",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/27353198/"
          ]
        }
      ],
      "note": "",
      "s1Order": 7,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)"
    },
    {
      "id": "dag-10",
      "name": "Maternal metabolic / adiposity status",
      "zh": "母亲代谢及肥胖状态",
      "domain": "B2",
      "role": "Confounder",
      "scope": "Maternal metabolic / adiposity status",
      "rationale": "BMI / diabetes / metabolic",
      "constructId": "C08",
      "labels": [
        {
          "label": "BMI",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/34679367/"
          ]
        },
        {
          "label": "dyslipidemia",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "maternal_BMI",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/"
          ]
        },
        {
          "label": "maternal_bmi",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/31664451/"
          ]
        },
        {
          "label": "obesity",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ]
        },
        {
          "label": "prepreg_BMI",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/24566677/",
            "https://pubmed.ncbi.nlm.nih.gov/26688372/",
            "https://pubmed.ncbi.nlm.nih.gov/27533796/",
            "https://pubmed.ncbi.nlm.nih.gov/28031314/",
            "https://pubmed.ncbi.nlm.nih.gov/29970852/",
            "https://pubmed.ncbi.nlm.nih.gov/30458756/",
            "https://pubmed.ncbi.nlm.nih.gov/32986124/",
            "https://pubmed.ncbi.nlm.nih.gov/33230558/",
            "https://pubmed.ncbi.nlm.nih.gov/40964537/"
          ]
        },
        {
          "label": "prepregnancy_BMI",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ]
        },
        {
          "label": "week17_BMI",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/29084830/"
          ]
        }
      ],
      "note": "",
      "s1Order": 8,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)"
    },
    {
      "id": "dag-11",
      "name": "Socioeconomic position",
      "zh": "社会经济地位",
      "domain": "B3",
      "role": "Confounder",
      "scope": "Socioeconomic position",
      "rationale": "SES / education / income",
      "constructId": "C09",
      "labels": [
        {
          "label": "SES",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/24566677/",
            "https://pubmed.ncbi.nlm.nih.gov/26688372/",
            "https://pubmed.ncbi.nlm.nih.gov/27533796/"
          ]
        },
        {
          "label": "education",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/31664451/",
            "https://pubmed.ncbi.nlm.nih.gov/32986124/",
            "https://pubmed.ncbi.nlm.nih.gov/34679367/",
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/40964537/",
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ]
        },
        {
          "label": "employment_status",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41801232/"
          ]
        },
        {
          "label": "familial_income",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/32986124/"
          ]
        },
        {
          "label": "family_income",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41801232/"
          ]
        },
        {
          "label": "household_income",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/40964537/"
          ]
        },
        {
          "label": "income",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/31509360/"
          ]
        },
        {
          "label": "income_quartile",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ]
        },
        {
          "label": "maternal education",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/36937866/"
          ]
        },
        {
          "label": "maternal_education",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/27353198/",
            "https://pubmed.ncbi.nlm.nih.gov/29084830/",
            "https://pubmed.ncbi.nlm.nih.gov/29970852/",
            "https://pubmed.ncbi.nlm.nih.gov/30458756/",
            "https://pubmed.ncbi.nlm.nih.gov/36937866/",
            "https://pubmed.ncbi.nlm.nih.gov/37431475/"
          ]
        },
        {
          "label": "national_economic_index",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/30458756/"
          ]
        },
        {
          "label": "neighborhood_deprivation_index",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40964537/"
          ]
        },
        {
          "label": "parental_education",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/28031314/"
          ]
        },
        {
          "label": "social_class",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/27353198/"
          ]
        },
        {
          "label": "socio-occupational_status",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/33230558/"
          ]
        }
      ],
      "note": "",
      "s1Order": 9,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)"
    },
    {
      "id": "dag-12",
      "name": "Demographic / regional context",
      "zh": "人口及地区背景",
      "domain": "B3",
      "role": "Confounder",
      "scope": "Demographic / regional context",
      "rationale": "Race / ethnicity / region",
      "constructId": "C10",
      "labels": [
        {
          "label": "birth_in_Denmark",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ]
        },
        {
          "label": "country",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/"
          ]
        },
        {
          "label": "ethnicity",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40964537/"
          ]
        },
        {
          "label": "maternal race",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/36937866/"
          ]
        },
        {
          "label": "maternal_skin_color",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/30458756/"
          ]
        },
        {
          "label": "race",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/34679367/"
          ]
        },
        {
          "label": "race/ethnicity",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/29970852/",
            "https://pubmed.ncbi.nlm.nih.gov/31664451/"
          ]
        },
        {
          "label": "region/cohort",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/27353198/"
          ]
        },
        {
          "label": "residence",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ]
        },
        {
          "label": "urban_residency",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ]
        },
        {
          "label": "urbanization",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/31509360/",
            "https://pubmed.ncbi.nlm.nih.gov/41801232/"
          ]
        }
      ],
      "note": "",
      "s1Order": 10,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)"
    },
    {
      "id": "dag-13",
      "name": "Lifestyle / substance use",
      "zh": "生活方式及物质使用",
      "domain": "B3",
      "role": "Confounder",
      "scope": "Lifestyle / substance use",
      "rationale": "Smoking / alcohol / substance",
      "constructId": "C11",
      "labels": [
        {
          "label": "alcohol",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/24566677/",
            "https://pubmed.ncbi.nlm.nih.gov/26688372/",
            "https://pubmed.ncbi.nlm.nih.gov/27533796/",
            "https://pubmed.ncbi.nlm.nih.gov/28031314/",
            "https://pubmed.ncbi.nlm.nih.gov/29084830/",
            "https://pubmed.ncbi.nlm.nih.gov/29970852/",
            "https://pubmed.ncbi.nlm.nih.gov/30458756/",
            "https://pubmed.ncbi.nlm.nih.gov/31664451/",
            "https://pubmed.ncbi.nlm.nih.gov/32986124/",
            "https://pubmed.ncbi.nlm.nih.gov/33230558/",
            "https://pubmed.ncbi.nlm.nih.gov/34679367/",
            "https://pubmed.ncbi.nlm.nih.gov/36170224/",
            "https://pubmed.ncbi.nlm.nih.gov/36937866/",
            "https://pubmed.ncbi.nlm.nih.gov/37431475/",
            "https://pubmed.ncbi.nlm.nih.gov/40964537/",
            "https://pubmed.ncbi.nlm.nih.gov/41801232/"
          ]
        },
        {
          "label": "alcohol drinking during pregnancy",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/36937866/"
          ]
        },
        {
          "label": "alcohol_abuse",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ]
        },
        {
          "label": "drug_abuse",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ]
        },
        {
          "label": "smoking",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/24566677/",
            "https://pubmed.ncbi.nlm.nih.gov/26688372/",
            "https://pubmed.ncbi.nlm.nih.gov/27533796/",
            "https://pubmed.ncbi.nlm.nih.gov/28031314/",
            "https://pubmed.ncbi.nlm.nih.gov/29084830/",
            "https://pubmed.ncbi.nlm.nih.gov/29970852/",
            "https://pubmed.ncbi.nlm.nih.gov/30458756/",
            "https://pubmed.ncbi.nlm.nih.gov/31664451/",
            "https://pubmed.ncbi.nlm.nih.gov/32986124/",
            "https://pubmed.ncbi.nlm.nih.gov/33230558/",
            "https://pubmed.ncbi.nlm.nih.gov/34679367/",
            "https://pubmed.ncbi.nlm.nih.gov/36937866/",
            "https://pubmed.ncbi.nlm.nih.gov/37431475/",
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/41801232/",
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ]
        },
        {
          "label": "smoking during pregnancy",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/36937866/"
          ]
        },
        {
          "label": "tobacco",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40964537/"
          ]
        },
        {
          "label": "tobacco_abuse",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ]
        }
      ],
      "note": "",
      "s1Order": 11,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)"
    },
    {
      "id": "dag-14",
      "name": "Psychosocial stress",
      "zh": "心理社会压力",
      "domain": "B3",
      "role": "Confounder",
      "scope": "Psychosocial stress",
      "rationale": "Prenatal stress / adversity",
      "constructId": "C12",
      "labels": [
        {
          "label": "stress",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/31664451/",
            "https://pubmed.ncbi.nlm.nih.gov/34679367/",
            "https://pubmed.ncbi.nlm.nih.gov/36170224/",
            "https://pubmed.ncbi.nlm.nih.gov/40964537/"
          ]
        }
      ],
      "note": "",
      "s1Order": 12,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)"
    },
    {
      "id": "dag-15",
      "name": "Maternal demographic context",
      "zh": "父母年龄等人口学特征",
      "domain": "B3",
      "role": "Confounder",
      "scope": "Maternal demographic context",
      "rationale": "Maternal / paternal age",
      "constructId": "C13",
      "labels": [
        {
          "label": "maternal age at delivery",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/36937866/"
          ]
        },
        {
          "label": "maternal_age",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/24566677/",
            "https://pubmed.ncbi.nlm.nih.gov/26688372/",
            "https://pubmed.ncbi.nlm.nih.gov/27533796/",
            "https://pubmed.ncbi.nlm.nih.gov/28031314/",
            "https://pubmed.ncbi.nlm.nih.gov/29084830/",
            "https://pubmed.ncbi.nlm.nih.gov/29970852/",
            "https://pubmed.ncbi.nlm.nih.gov/30458756/",
            "https://pubmed.ncbi.nlm.nih.gov/30923825/",
            "https://pubmed.ncbi.nlm.nih.gov/31664451/",
            "https://pubmed.ncbi.nlm.nih.gov/32986124/",
            "https://pubmed.ncbi.nlm.nih.gov/33230558/",
            "https://pubmed.ncbi.nlm.nih.gov/34679367/",
            "https://pubmed.ncbi.nlm.nih.gov/36170224/",
            "https://pubmed.ncbi.nlm.nih.gov/36937866/",
            "https://pubmed.ncbi.nlm.nih.gov/37431475/",
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/40898607/",
            "https://pubmed.ncbi.nlm.nih.gov/40964537/",
            "https://pubmed.ncbi.nlm.nih.gov/41238184/",
            "https://pubmed.ncbi.nlm.nih.gov/41801232/",
            "https://pubmed.ncbi.nlm.nih.gov/41973453/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "paternal age at delivery",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/36937866/"
          ]
        },
        {
          "label": "paternal_age",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ]
        }
      ],
      "note": "",
      "s1Order": 13,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)"
    },
    {
      "id": "dag-16",
      "name": "Reproductive history / parity",
      "zh": "生育史及产次",
      "domain": "B3",
      "role": "Confounder",
      "scope": "Reproductive history / parity",
      "rationale": "Parity; absorbs pre-exposure obstetric history",
      "constructId": "C14",
      "labels": [
        {
          "label": "birth_order",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ]
        },
        {
          "label": "child_birth_order",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/30923825/"
          ]
        },
        {
          "label": "gravidity",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/36937866/",
            "https://pubmed.ncbi.nlm.nih.gov/40964537/"
          ]
        },
        {
          "label": "parity",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/24566677/",
            "https://pubmed.ncbi.nlm.nih.gov/26688372/",
            "https://pubmed.ncbi.nlm.nih.gov/27533796/",
            "https://pubmed.ncbi.nlm.nih.gov/28031314/",
            "https://pubmed.ncbi.nlm.nih.gov/29084830/",
            "https://pubmed.ncbi.nlm.nih.gov/29970852/",
            "https://pubmed.ncbi.nlm.nih.gov/30458756/",
            "https://pubmed.ncbi.nlm.nih.gov/31664451/",
            "https://pubmed.ncbi.nlm.nih.gov/33230558/",
            "https://pubmed.ncbi.nlm.nih.gov/34679367/",
            "https://pubmed.ncbi.nlm.nih.gov/36937866/",
            "https://pubmed.ncbi.nlm.nih.gov/37431475/",
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/41801232/",
            "https://pubmed.ncbi.nlm.nih.gov/41973453/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "planned pregnancy",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/36937866/"
          ]
        }
      ],
      "note": "",
      "s1Order": 14,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)"
    },
    {
      "id": "dag-17",
      "name": "Family structure",
      "zh": "家庭结构",
      "domain": "B3",
      "role": "Confounder",
      "scope": "Family structure",
      "rationale": "Marital / partnership context",
      "constructId": "C15",
      "labels": [
        {
          "label": "cohabitation",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ]
        },
        {
          "label": "marital status",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/36937866/"
          ]
        },
        {
          "label": "marital_status",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/29084830/",
            "https://pubmed.ncbi.nlm.nih.gov/31664451/",
            "https://pubmed.ncbi.nlm.nih.gov/34679367/",
            "https://pubmed.ncbi.nlm.nih.gov/36937866/"
          ]
        }
      ],
      "note": "",
      "s1Order": 15,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)"
    },
    {
      "id": "dag-18",
      "name": "Temporal context",
      "zh": "日历时期背景",
      "domain": "B3",
      "role": "Confounder",
      "scope": "Temporal context",
      "rationale": "Birth year / calendar period",
      "constructId": "C16",
      "labels": [
        {
          "label": "birth_year",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/24566677/",
            "https://pubmed.ncbi.nlm.nih.gov/26688372/",
            "https://pubmed.ncbi.nlm.nih.gov/29084830/",
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/40898607/",
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ]
        },
        {
          "label": "calendar_year",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ]
        },
        {
          "label": "child_birth_year",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/30923825/",
            "https://pubmed.ncbi.nlm.nih.gov/33230558/",
            "https://pubmed.ncbi.nlm.nih.gov/37431475/",
            "https://pubmed.ncbi.nlm.nih.gov/41801232/"
          ]
        },
        {
          "label": "delivery_year",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "period_delivery",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/"
          ]
        },
        {
          "label": "season_of_delivery",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ]
        }
      ],
      "note": "",
      "s1Order": 16,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(2/3)"
    },
    {
      "id": "dag-23",
      "name": "Perinatal mediators",
      "zh": "围产期中介因素",
      "domain": "B4",
      "role": "Mediator",
      "scope": "Perinatal mediators (GA, preterm, birth weight, delivery mode)",
      "rationale": "Blocks APAP→outcome path",
      "constructId": "N01",
      "labels": [
        {
          "label": "Apgar_1min",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "Apgar_5min",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "birth_trauma",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "birth_weight",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/24566677/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "birthweight",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/29970852/"
          ]
        },
        {
          "label": "comorbid_perinatal_conditions",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/31509360/"
          ]
        },
        {
          "label": "delivery_method",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40964537/"
          ]
        },
        {
          "label": "delivery_mode",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "delivery_type",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/29970852/",
            "https://pubmed.ncbi.nlm.nih.gov/31664451/",
            "https://pubmed.ncbi.nlm.nih.gov/34679367/"
          ]
        },
        {
          "label": "gestational_age",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/24566677/",
            "https://pubmed.ncbi.nlm.nih.gov/27353198/",
            "https://pubmed.ncbi.nlm.nih.gov/29970852/"
          ]
        },
        {
          "label": "labor_type",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40964537/"
          ]
        },
        {
          "label": "low_birth_weight",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/31664451/"
          ]
        },
        {
          "label": "low_birthweight",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/34679367/"
          ]
        },
        {
          "label": "malpresentation",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ]
        },
        {
          "label": "premature_contractions",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ]
        },
        {
          "label": "premature_rupture_membrane",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ]
        },
        {
          "label": "preterm_birth",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/31664451/",
            "https://pubmed.ncbi.nlm.nih.gov/34679367/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "small_for_gestational_age",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ]
        }
      ],
      "note": "",
      "s1Order": 17,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)"
    },
    {
      "id": "dag-24",
      "name": "Current-pregnancy obstetric complications",
      "zh": "本次妊娠并发症",
      "domain": "non-core",
      "role": "Timing-dependent",
      "scope": "Current-pregnancy obstetric complications (preeclampsia/GDM/haemorrhage)",
      "rationale": "Not assigned to B4 because timing depends on the exposure window",
      "constructId": "N02",
      "labels": [
        {
          "label": "antepartum_hemorrhage",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ]
        },
        {
          "label": "gestational_diabetes",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/30923825/",
            "https://pubmed.ncbi.nlm.nih.gov/41238184/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "gestational_hypertension",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "preeclampsia",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/30923825/"
          ]
        }
      ],
      "note": "目前列为 non-core、Timing-dependent。需按暴露窗口判断发生顺序，图中箭头仍待专家审核。",
      "s1Order": 18,
      "s1Status": "Estimate-specific classification",
      "s1Consensus": "(3/3)"
    },
    {
      "id": "dag-25",
      "name": "Breastfeeding / lactation",
      "zh": "母乳喂养",
      "domain": "B4",
      "role": "Mediator",
      "scope": "Breastfeeding / lactation",
      "rationale": "Postnatal; blocks part of path",
      "constructId": "N03",
      "labels": [
        {
          "label": "breastfeeding",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/29970852/"
          ]
        }
      ],
      "note": "",
      "s1Order": 19,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)"
    },
    {
      "id": "dag-28",
      "name": "Early-child infection / microbiome / atopy",
      "zh": "儿童早期感染、微生物组及过敏",
      "constructId": "N04",
      "labels": [],
      "s1Only": true,
      "note": "Table S1 已列入此构念，原始 DAG 未单独绘制。请审核定义与归属；如需连接，请通过“新增箭头”提出建议。",
      "scope": "Early-child infection / microbiome / atopy",
      "domain": "B4",
      "role": "Mediator",
      "rationale": "Post-birth; relabelled from child characteristic",
      "s1Order": 20,
      "s1Status": "Reclassified",
      "s1Consensus": "(3/3)"
    },
    {
      "id": "dag-29",
      "name": "Early developmental / regulatory phenotype",
      "zh": "早期发育及调节表型",
      "constructId": "N05",
      "labels": [],
      "s1Only": true,
      "note": "Table S1 已列入此构念，原始 DAG 未单独绘制。请审核定义与归属；如需连接，请通过“新增箭头”提出建议。",
      "scope": "Early developmental / regulatory phenotype",
      "domain": "B4",
      "role": "Mediator",
      "rationale": "Early form of the outcome; never adjust",
      "s1Order": 21,
      "s1Status": "Reclassified",
      "s1Consensus": "(3/3)"
    },
    {
      "id": "dag-30",
      "name": "Mechanistic chain (oxidative stress, inflammation, hormonal, epigenetic, placental, fetal brain)",
      "zh": "生物学机制链",
      "constructId": "N06",
      "labels": [],
      "s1Only": true,
      "note": "Table S1 已列入此构念，原始 DAG 未单独绘制。请审核定义与归属；如需连接，请通过“新增箭头”提出建议。",
      "scope": "Mechanistic chain (oxidative stress, inflammation, hormonal, epigenetic, placental, fetal brain)",
      "domain": "B4",
      "role": "Mediator",
      "rationale": "Background biological pathway; post-exposure",
      "s1Order": 22,
      "s1Status": "Track B (articulated)",
      "s1Consensus": "(3/3)"
    },
    {
      "id": "dag-26",
      "name": "Selection / inclusion / cohort entry",
      "zh": "选择、纳入及队列进入",
      "domain": "B4",
      "role": "Collider / selection node",
      "scope": "Selection / inclusion / cohort entry",
      "rationale": "General participation or live-birth selection is recorded separately unless the pooled model conditions on the node or a descendant",
      "constructId": "",
      "labels": [],
      "note": "",
      "s1Order": 23,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)"
    },
    {
      "id": "dag-27",
      "name": "Diagnostic / ascertainment",
      "zh": "诊断及结局识别",
      "domain": "B4",
      "role": "Collider / descendant",
      "scope": "Diagnostic / ascertainment",
      "rationale": "Outcome-detection mechanism; classified as B4 Yes only when the model includes the variable or conditioning operation",
      "constructId": "",
      "labels": [],
      "note": "",
      "s1Order": 24,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)"
    },
    {
      "id": "dag-31",
      "name": "Healthcare utilisation leading to outcome detection",
      "zh": "影响结局检出的医疗服务利用",
      "constructId": "N09",
      "labels": [],
      "s1Only": true,
      "note": "Table S1 已列入此构念，原始 DAG 未单独绘制。请审核定义与归属；如需连接，请通过“新增箭头”提出建议。",
      "scope": "Healthcare utilisation leading to outcome detection",
      "domain": "B4",
      "role": "Collider / descendant",
      "rationale": "Restricted to outcome ascertainment; prenatal or antenatal visits do not instantiate this construct",
      "s1Order": 25,
      "s1Status": "Reclassified",
      "s1Consensus": "(3/3)"
    },
    {
      "id": "dag-22",
      "name": "Child sex; age at assessment",
      "zh": "儿童性别及评估年龄",
      "domain": "non-core",
      "role": "Precision",
      "scope": "Child sex; age at assessment",
      "rationale": "Precision / measurement-timing, not a confounder",
      "constructId": "N10",
      "labels": [
        {
          "label": "age_at_testing",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/27353198/"
          ]
        },
        {
          "label": "child_age",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/31509360/"
          ]
        },
        {
          "label": "child_age_at_visit",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40964537/"
          ]
        },
        {
          "label": "child_sex",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/24566677/",
            "https://pubmed.ncbi.nlm.nih.gov/26688372/",
            "https://pubmed.ncbi.nlm.nih.gov/27353198/",
            "https://pubmed.ncbi.nlm.nih.gov/28031314/",
            "https://pubmed.ncbi.nlm.nih.gov/29970852/",
            "https://pubmed.ncbi.nlm.nih.gov/31509360/",
            "https://pubmed.ncbi.nlm.nih.gov/31664451/",
            "https://pubmed.ncbi.nlm.nih.gov/32986124/",
            "https://pubmed.ncbi.nlm.nih.gov/34679367/",
            "https://pubmed.ncbi.nlm.nih.gov/37431475/",
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/40964537/",
            "https://pubmed.ncbi.nlm.nih.gov/41801232/",
            "https://pubmed.ncbi.nlm.nih.gov/41973453/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ]
        },
        {
          "label": "infant sex",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/36937866/"
          ]
        },
        {
          "label": "tester",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/28031314/"
          ]
        }
      ],
      "note": "当前合并儿童性别和评估年龄，请判断是否需要拆分。",
      "s1Order": 26,
      "s1Status": "Both (convergent)",
      "s1Consensus": "n/a"
    },
    {
      "id": "dag-19",
      "name": "Environmental / occupational exposures",
      "zh": "环境及职业暴露",
      "domain": "Blind-spot",
      "role": "Confounder",
      "scope": "Environmental / occupational exposures (air pollution, pesticides, lead)",
      "rationale": "Systematically unadjusted; reported, not scored",
      "constructId": "",
      "labels": [],
      "note": "",
      "s1Order": 27,
      "s1Status": "Track B (3/3 labs)",
      "s1Consensus": "(3/3)"
    },
    {
      "id": "dag-20",
      "name": "Acetaminophen pharmacogenetics",
      "zh": "对乙酰氨基酚药物遗传因素",
      "domain": "Blind-spot",
      "role": "Confounder",
      "scope": "Acetaminophen pharmacogenetics (GSTT1/GSTM1, CYP2E1)",
      "rationale": "Only purely-new confounder; unmeasured; reported",
      "constructId": "",
      "labels": [],
      "note": "",
      "s1Order": 28,
      "s1Status": "Track B (2/3 models)",
      "s1Consensus": "(2/3)"
    },
    {
      "id": "dag-21",
      "name": "Medication-seeking propensity",
      "zh": "用药寻求倾向",
      "domain": "Blind-spot / split",
      "role": "Confounder when pre-exposure; timing-dependent when antenatal",
      "scope": "Medication-seeking propensity / antenatal-care use",
      "rationale": "Separates exposure propensity and antenatal care from offspring outcome-detection utilisation",
      "constructId": "N13",
      "labels": [
        {
          "label": "antenatal_hospital_visits",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ]
        },
        {
          "label": "antenatal_visits",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/"
          ]
        },
        {
          "label": "drug_coverage",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ]
        },
        {
          "label": "emergency_visit",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ]
        },
        {
          "label": "healthcare_visits_pre_preg",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/"
          ]
        },
        {
          "label": "hospital_visits_year_before_pregnancy",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ]
        },
        {
          "label": "insurance_coverage",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/36170224/"
          ]
        },
        {
          "label": "obstetrician_followup",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ]
        },
        {
          "label": "prepreg_health_checkup",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ]
        },
        {
          "label": "prescriptions_year_before_pregnancy",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ]
        }
      ],
      "note": "需区分用药前的就医或用药倾向与孕期产检，具体作用取决于发生时间。",
      "s1Order": 29,
      "s1Status": "Reclassified",
      "s1Consensus": "(3/3)"
    }
  ],
  "edges": [
    {
      "id": "E001",
      "from": "dag-03",
      "to": "dag-01"
    },
    {
      "id": "E002",
      "from": "dag-03",
      "to": "dag-02"
    },
    {
      "id": "E003",
      "from": "dag-04",
      "to": "dag-01"
    },
    {
      "id": "E004",
      "from": "dag-04",
      "to": "dag-02"
    },
    {
      "id": "E005",
      "from": "dag-05",
      "to": "dag-01"
    },
    {
      "id": "E006",
      "from": "dag-05",
      "to": "dag-02"
    },
    {
      "id": "E007",
      "from": "dag-06",
      "to": "dag-01"
    },
    {
      "id": "E008",
      "from": "dag-06",
      "to": "dag-02"
    },
    {
      "id": "E009",
      "from": "dag-07",
      "to": "dag-01"
    },
    {
      "id": "E010",
      "from": "dag-07",
      "to": "dag-02"
    },
    {
      "id": "E011",
      "from": "dag-08",
      "to": "dag-01"
    },
    {
      "id": "E012",
      "from": "dag-08",
      "to": "dag-02"
    },
    {
      "id": "E013",
      "from": "dag-09",
      "to": "dag-01"
    },
    {
      "id": "E014",
      "from": "dag-09",
      "to": "dag-02"
    },
    {
      "id": "E015",
      "from": "dag-10",
      "to": "dag-01"
    },
    {
      "id": "E016",
      "from": "dag-10",
      "to": "dag-02"
    },
    {
      "id": "E017",
      "from": "dag-11",
      "to": "dag-01"
    },
    {
      "id": "E018",
      "from": "dag-11",
      "to": "dag-02"
    },
    {
      "id": "E019",
      "from": "dag-12",
      "to": "dag-01"
    },
    {
      "id": "E020",
      "from": "dag-12",
      "to": "dag-02"
    },
    {
      "id": "E021",
      "from": "dag-13",
      "to": "dag-01"
    },
    {
      "id": "E022",
      "from": "dag-13",
      "to": "dag-02"
    },
    {
      "id": "E023",
      "from": "dag-14",
      "to": "dag-01"
    },
    {
      "id": "E024",
      "from": "dag-14",
      "to": "dag-02"
    },
    {
      "id": "E025",
      "from": "dag-15",
      "to": "dag-01"
    },
    {
      "id": "E026",
      "from": "dag-15",
      "to": "dag-02"
    },
    {
      "id": "E027",
      "from": "dag-16",
      "to": "dag-01"
    },
    {
      "id": "E028",
      "from": "dag-16",
      "to": "dag-02"
    },
    {
      "id": "E029",
      "from": "dag-17",
      "to": "dag-01"
    },
    {
      "id": "E030",
      "from": "dag-17",
      "to": "dag-02"
    },
    {
      "id": "E031",
      "from": "dag-18",
      "to": "dag-01"
    },
    {
      "id": "E032",
      "from": "dag-18",
      "to": "dag-02"
    },
    {
      "id": "E033",
      "from": "dag-19",
      "to": "dag-01"
    },
    {
      "id": "E034",
      "from": "dag-19",
      "to": "dag-02"
    },
    {
      "id": "E035",
      "from": "dag-20",
      "to": "dag-01"
    },
    {
      "id": "E036",
      "from": "dag-20",
      "to": "dag-02"
    },
    {
      "id": "E037",
      "from": "dag-21",
      "to": "dag-01"
    },
    {
      "id": "E038",
      "from": "dag-21",
      "to": "dag-02"
    },
    {
      "id": "E039",
      "from": "dag-01",
      "to": "dag-02"
    },
    {
      "id": "E040",
      "from": "dag-01",
      "to": "dag-23"
    },
    {
      "id": "E041",
      "from": "dag-23",
      "to": "dag-02"
    },
    {
      "id": "E042",
      "from": "dag-01",
      "to": "dag-24"
    },
    {
      "id": "E043",
      "from": "dag-24",
      "to": "dag-02"
    },
    {
      "id": "E044",
      "from": "dag-01",
      "to": "dag-25"
    },
    {
      "id": "E045",
      "from": "dag-25",
      "to": "dag-02"
    },
    {
      "id": "E046",
      "from": "dag-01",
      "to": "dag-26"
    },
    {
      "id": "E047",
      "from": "dag-02",
      "to": "dag-26"
    },
    {
      "id": "E048",
      "from": "dag-01",
      "to": "dag-27"
    },
    {
      "id": "E049",
      "from": "dag-02",
      "to": "dag-27"
    },
    {
      "id": "E050",
      "from": "dag-22",
      "to": "dag-02"
    }
  ],
  "previousBaseline": {
    "version": "2026-09-09.v1",
    "graphHash": "6393191f73e222072947e4bc8a4a1f2495db99e4aca3c628dcfbc1fcc91f1e81",
    "nodeIds": [
      "dag-01",
      "dag-02",
      "dag-03",
      "dag-04",
      "dag-05",
      "dag-06",
      "dag-07",
      "dag-08",
      "dag-09",
      "dag-10",
      "dag-11",
      "dag-12",
      "dag-13",
      "dag-14",
      "dag-15",
      "dag-16",
      "dag-17",
      "dag-18",
      "dag-19",
      "dag-20",
      "dag-21",
      "dag-22",
      "dag-23",
      "dag-24",
      "dag-25",
      "dag-26",
      "dag-27"
    ]
  }
};
