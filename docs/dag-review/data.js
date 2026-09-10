window.DAG_DATA = {
  "version": "2026-09-10.meta-scope-v3",
  "graphHash": "c718d724d14956a2fcd6f757bb387456c98370c6b200a477f4ae23179ad9c79e",
  "source": "Current manuscript (2026-09-04): all 39 estimates and 26 estimates retained after B4 exclusion. Review includes only constructs represented in the final model-level covariate/design trace; Table S1 defines their domains and roles. Existing manuscript edges are restricted to these nodes.",
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
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "41801232_ADHD_sib",
              "41801232_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Design / family stratum"
          ],
          "mappingStatus": [
            "Archived design gate"
          ]
        },
        {
          "label": "+ family_stratum(家庭固定效应)",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "38592388_ADHD_sib",
              "38592388_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Design / family stratum"
          ],
          "mappingStatus": [
            "Archived design gate"
          ]
        },
        {
          "label": "family_mean_exposure",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/37431475/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 0,
            "b4No": 1,
            "recordIds": [
              "37431475_ADHD_sib"
            ]
          },
          "controlRoutes": [
            "Sibling within-between model"
          ],
          "mappingStatus": [
            "Archived design gate"
          ]
        },
        {
          "label": "family_stratum",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 2,
            "b4No": 0,
            "recordIds": [
              "42371637_ADHD_sib",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Design / family stratum"
          ],
          "mappingStatus": [
            "Archived design gate"
          ]
        },
        {
          "label": "family_stratum(以家庭为层的 stratified Cox)",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "40898607_ADHD_sib",
              "40898607_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Design / family stratum"
          ],
          "mappingStatus": [
            "Archived design gate"
          ]
        },
        {
          "label": "maternal_ID_cluster",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 0,
            "b4No": 1,
            "recordIds": [
              "41973453_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Variance clustering"
          ],
          "mappingStatus": [
            "Gate requires review"
          ]
        }
      ],
      "note": "下列标签含家庭分层、聚类等设计或模型术语，不能逐一视为临床变量。 本页仅显示当前纳入模型记录中的变量标签及设计项；出现次数不代表控制充分。",
      "s1Order": 1,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)",
      "analysisUse": {
        "all": 10,
        "b4Yes": 2,
        "b4No": 8,
        "recordIds": [
          "37431475_ADHD_sib",
          "38592388_ADHD_sib",
          "38592388_ASD_sib",
          "40898607_ADHD_sib",
          "40898607_ASD_sib",
          "41801232_ADHD_sib",
          "41801232_ASD_sib",
          "41973453_ASD_sib",
          "42371637_ADHD_sib",
          "42371637_ASD_sib"
        ]
      }
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
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "40898607_ADHD_pop",
              "40898607_ASD_pop"
            ]
          },
          "controlRoutes": [
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Archived proxy mapping"
          ]
        },
        {
          "label": "maternal_ADHD",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ],
          "analysisUse": {
            "all": 4,
            "b4Yes": 4,
            "b4No": 0,
            "recordIds": [
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Archived proxy mapping"
          ]
        },
        {
          "label": "maternal_ASD",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ],
          "analysisUse": {
            "all": 4,
            "b4Yes": 4,
            "b4No": 0,
            "recordIds": [
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Archived proxy mapping"
          ]
        },
        {
          "label": "maternal_IQ",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/27353198/",
            "https://pubmed.ncbi.nlm.nih.gov/28031314/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 1,
            "b4No": 1,
            "recordIds": [
              "27353198_ADHD",
              "28031314_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "No credit under archived adequacy decision"
          ]
        },
        {
          "label": "maternal_adhd",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ],
          "analysisUse": {
            "all": 3,
            "b4Yes": 1,
            "b4No": 2,
            "recordIds": [
              "38592388_ADHD_pop",
              "38592388_ASD_pop",
              "41238184_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Archived proxy mapping"
          ]
        },
        {
          "label": "maternal_asd",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "38592388_ADHD_pop",
              "38592388_ASD_pop"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Archived proxy mapping"
          ]
        },
        {
          "label": "maternal_intellectual_dis",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "38592388_ADHD_pop",
              "38592388_ASD_pop"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Archived proxy mapping"
          ]
        },
        {
          "label": "maternal_intellectual_disability",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ],
          "analysisUse": {
            "all": 4,
            "b4Yes": 4,
            "b4No": 0,
            "recordIds": [
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Archived proxy mapping"
          ]
        },
        {
          "label": "parental_adhd",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/29084830/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 0,
            "b4No": 1,
            "recordIds": [
              "29084830_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Archived proxy mapping"
          ]
        }
      ],
      "note": "本页仅显示当前纳入模型记录中的变量标签及设计项；出现次数不代表控制充分。",
      "s1Order": 2,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)",
      "analysisUse": {
        "all": 12,
        "b4Yes": 6,
        "b4No": 6,
        "recordIds": [
          "27353198_ADHD",
          "28031314_ADHD",
          "29084830_ADHD",
          "38592388_ADHD_pop",
          "38592388_ASD_pop",
          "40898607_ADHD_pop",
          "40898607_ASD_pop",
          "41238184_ADHD",
          "42371637_ADHD_pop",
          "42371637_ADHD_sib",
          "42371637_ASD_pop",
          "42371637_ASD_sib"
        ]
      }
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
          ],
          "analysisUse": {
            "all": 10,
            "b4Yes": 4,
            "b4No": 6,
            "recordIds": [
              "38592388_ADHD_pop",
              "38592388_ADHD_sib",
              "38592388_ASD_pop",
              "38592388_ASD_sib",
              "41973453_ASD_pop",
              "41973453_ASD_sib",
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Archived proxy mapping"
          ]
        },
        {
          "label": "antipsychotics",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "40898607_ADHD_pop",
              "40898607_ASD_pop"
            ]
          },
          "controlRoutes": [
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Archived proxy mapping"
          ]
        },
        {
          "label": "anxiety",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/29084830/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 0,
            "b4No": 1,
            "recordIds": [
              "29084830_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Archived proxy mapping"
          ]
        },
        {
          "label": "anxiety/depression",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/36170224/",
            "https://pubmed.ncbi.nlm.nih.gov/37431475/"
          ],
          "analysisUse": {
            "all": 3,
            "b4Yes": 0,
            "b4No": 3,
            "recordIds": [
              "36170224_ADHD",
              "37431475_ADHD_pop",
              "37431475_ADHD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment",
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Archived proxy mapping"
          ]
        },
        {
          "label": "depression",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/29084830/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 0,
            "b4No": 1,
            "recordIds": [
              "29084830_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Archived proxy mapping"
          ]
        },
        {
          "label": "depression/anxiety",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "41238184_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Archived proxy mapping"
          ]
        },
        {
          "label": "family_mental_health_disorders",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40964537/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "40964537_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Broader family proxy; S1 wording review"
          ]
        },
        {
          "label": "maternal_mental_health",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/28031314/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 0,
            "b4No": 1,
            "recordIds": [
              "28031314_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Archived proxy mapping"
          ]
        },
        {
          "label": "maternal_mental_health_disorders",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/31509360/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "31509360_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Archived proxy mapping"
          ]
        },
        {
          "label": "maternal_mood_disorder",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/30458756/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 0,
            "b4No": 1,
            "recordIds": [
              "30458756_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Archived proxy mapping"
          ]
        },
        {
          "label": "maternal_psychiatric",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "38592388_ADHD_pop",
              "38592388_ASD_pop"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Archived proxy mapping"
          ]
        },
        {
          "label": "maternal_psychiatric_disorder",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ],
          "analysisUse": {
            "all": 4,
            "b4Yes": 4,
            "b4No": 0,
            "recordIds": [
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Archived proxy mapping"
          ]
        },
        {
          "label": "maternal_psychiatric_disorders",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41801232/"
          ],
          "analysisUse": {
            "all": 4,
            "b4Yes": 0,
            "b4No": 4,
            "recordIds": [
              "41801232_ADHD_pop",
              "41801232_ADHD_sib",
              "41801232_ASD_pop",
              "41801232_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Archived proxy mapping"
          ]
        },
        {
          "label": "maternal_psychiatric_illness",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/24566677/",
            "https://pubmed.ncbi.nlm.nih.gov/26688372/",
            "https://pubmed.ncbi.nlm.nih.gov/27533796/",
            "https://pubmed.ncbi.nlm.nih.gov/33230558/"
          ],
          "analysisUse": {
            "all": 4,
            "b4Yes": 1,
            "b4No": 3,
            "recordIds": [
              "24566677_ADHD",
              "26688372_ASD",
              "27533796_ADHD",
              "33230558_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Archived proxy mapping"
          ]
        },
        {
          "label": "maternal_sibling_psychiatric_history",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "41973453_ASD_pop",
              "41973453_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Broader family proxy; S1 wording review"
          ]
        },
        {
          "label": "other_mental_health",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "41238184_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Archived proxy mapping"
          ]
        },
        {
          "label": "paternal_psychiatric_history",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "41973453_ASD_pop",
              "41973453_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Broader family proxy; S1 wording review"
          ]
        },
        {
          "label": "psychiatric_condition",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "40898607_ADHD_pop",
              "40898607_ASD_pop"
            ]
          },
          "controlRoutes": [
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Archived proxy mapping"
          ]
        },
        {
          "label": "psychiatric_disease",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "41973453_ASD_pop",
              "41973453_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Archived proxy mapping"
          ]
        },
        {
          "label": "psycholeptic",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ],
          "analysisUse": {
            "all": 6,
            "b4Yes": 0,
            "b4No": 6,
            "recordIds": [
              "38592388_ADHD_pop",
              "38592388_ADHD_sib",
              "38592388_ASD_pop",
              "38592388_ASD_sib",
              "41973453_ASD_pop",
              "41973453_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Archived proxy mapping"
          ]
        }
      ],
      "note": "本页仅显示当前纳入模型记录中的变量标签及设计项；出现次数不代表控制充分。",
      "s1Order": 3,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)",
      "analysisUse": {
        "all": 29,
        "b4Yes": 8,
        "b4No": 21,
        "recordIds": [
          "24566677_ADHD",
          "26688372_ASD",
          "27533796_ADHD",
          "28031314_ADHD",
          "29084830_ADHD",
          "30458756_ADHD",
          "31509360_ADHD",
          "33230558_ADHD",
          "36170224_ADHD",
          "37431475_ADHD_pop",
          "37431475_ADHD_sib",
          "38592388_ADHD_pop",
          "38592388_ADHD_sib",
          "38592388_ASD_pop",
          "38592388_ASD_sib",
          "40898607_ADHD_pop",
          "40898607_ASD_pop",
          "40964537_ADHD",
          "41238184_ADHD",
          "41801232_ADHD_pop",
          "41801232_ADHD_sib",
          "41801232_ASD_pop",
          "41801232_ASD_sib",
          "41973453_ASD_pop",
          "41973453_ASD_sib",
          "42371637_ADHD_pop",
          "42371637_ADHD_sib",
          "42371637_ASD_pop",
          "42371637_ASD_sib"
        ]
      }
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
          ],
          "analysisUse": {
            "all": 18,
            "b4Yes": 8,
            "b4No": 10,
            "recordIds": [
              "24566677_ADHD",
              "26688372_ASD",
              "27353198_ADHD",
              "33230558_ADHD",
              "34679367_ADHD",
              "38592388_ADHD_pop",
              "38592388_ADHD_sib",
              "38592388_ASD_pop",
              "38592388_ASD_sib",
              "40898607_ADHD_pop",
              "40898607_ASD_pop",
              "41238184_ADHD",
              "41973453_ASD_pop",
              "41973453_ASD_sib",
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment",
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "fever/infection",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/37431475/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "37431475_ADHD_pop",
              "37431475_ADHD_sib"
            ]
          },
          "controlRoutes": [
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "fever/infection/inflammation",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/28031314/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 0,
            "b4No": 1,
            "recordIds": [
              "28031314_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "gestational_infections",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/31509360/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "31509360_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
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
          ],
          "analysisUse": {
            "all": 14,
            "b4Yes": 4,
            "b4No": 10,
            "recordIds": [
              "27533796_ADHD",
              "30458756_ADHD",
              "38592388_ADHD_pop",
              "38592388_ADHD_sib",
              "38592388_ASD_pop",
              "38592388_ASD_sib",
              "40898607_ADHD_pop",
              "40898607_ASD_pop",
              "41973453_ASD_pop",
              "41973453_ASD_sib",
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment",
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "infection/inflammation",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/24566677/",
            "https://pubmed.ncbi.nlm.nih.gov/26688372/",
            "https://pubmed.ncbi.nlm.nih.gov/33230558/"
          ],
          "analysisUse": {
            "all": 3,
            "b4Yes": 1,
            "b4No": 2,
            "recordIds": [
              "24566677_ADHD",
              "26688372_ASD",
              "33230558_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "intrauterine_infection/inflammation",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/29970852/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "29970852_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "maternal_fever",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/29970852/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "29970852_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "maternal_inflammation/infection",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41801232/"
          ],
          "analysisUse": {
            "all": 4,
            "b4Yes": 0,
            "b4No": 4,
            "recordIds": [
              "41801232_ADHD_pop",
              "41801232_ADHD_sib",
              "41801232_ASD_pop",
              "41801232_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "urinary_tract_infection",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/27353198/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "27353198_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        }
      ],
      "note": "本页仅显示当前纳入模型记录中的变量标签及设计项；出现次数不代表控制充分。",
      "s1Order": 4,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)",
      "analysisUse": {
        "all": 29,
        "b4Yes": 10,
        "b4No": 19,
        "recordIds": [
          "24566677_ADHD",
          "26688372_ASD",
          "27353198_ADHD",
          "27533796_ADHD",
          "28031314_ADHD",
          "29970852_ADHD",
          "30458756_ADHD",
          "31509360_ADHD",
          "33230558_ADHD",
          "34679367_ADHD",
          "37431475_ADHD_pop",
          "37431475_ADHD_sib",
          "38592388_ADHD_pop",
          "38592388_ADHD_sib",
          "38592388_ASD_pop",
          "38592388_ASD_sib",
          "40898607_ADHD_pop",
          "40898607_ASD_pop",
          "41238184_ADHD",
          "41801232_ADHD_pop",
          "41801232_ADHD_sib",
          "41801232_ASD_pop",
          "41801232_ASD_sib",
          "41973453_ASD_pop",
          "41973453_ASD_sib",
          "42371637_ADHD_pop",
          "42371637_ADHD_sib",
          "42371637_ASD_pop",
          "42371637_ASD_sib"
        ]
      }
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
          ],
          "analysisUse": {
            "all": 12,
            "b4Yes": 4,
            "b4No": 8,
            "recordIds": [
              "38592388_ADHD_pop",
              "38592388_ADHD_sib",
              "38592388_ASD_pop",
              "38592388_ASD_sib",
              "40898607_ADHD_pop",
              "40898607_ASD_pop",
              "41973453_ASD_pop",
              "41973453_ASD_sib",
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment",
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "diagnosed_headache",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "41973453_ASD_pop",
              "41973453_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "fibromyalgia",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 0,
            "b4No": 1,
            "recordIds": [
              "41973453_ASD_pop"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Named pain condition"
          ]
        },
        {
          "label": "headache",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/27533796/",
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/40898607/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ],
          "analysisUse": {
            "all": 11,
            "b4Yes": 4,
            "b4No": 7,
            "recordIds": [
              "27533796_ADHD",
              "38592388_ADHD_pop",
              "38592388_ADHD_sib",
              "38592388_ASD_pop",
              "38592388_ASD_sib",
              "40898607_ADHD_pop",
              "40898607_ASD_pop",
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment",
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
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
          ],
          "analysisUse": {
            "all": 13,
            "b4Yes": 4,
            "b4No": 9,
            "recordIds": [
              "27533796_ADHD",
              "38592388_ADHD_pop",
              "38592388_ADHD_sib",
              "38592388_ASD_pop",
              "38592388_ASD_sib",
              "40898607_ADHD_pop",
              "40898607_ASD_pop",
              "41973453_ASD_pop",
              "41973453_ASD_sib",
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment",
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "muscle_joint_disease",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/24566677/",
            "https://pubmed.ncbi.nlm.nih.gov/26688372/",
            "https://pubmed.ncbi.nlm.nih.gov/27533796/",
            "https://pubmed.ncbi.nlm.nih.gov/33230558/"
          ],
          "analysisUse": {
            "all": 4,
            "b4Yes": 1,
            "b4No": 3,
            "recordIds": [
              "24566677_ADHD",
              "26688372_ASD",
              "27533796_ADHD",
              "33230558_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "neuropathic_pain",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "41973453_ASD_pop",
              "41973453_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "pain",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/37431475/",
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ],
          "analysisUse": {
            "all": 3,
            "b4Yes": 1,
            "b4No": 2,
            "recordIds": [
              "37431475_ADHD_pop",
              "37431475_ADHD_sib",
              "41238184_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment",
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "pain/musculoskeletal",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/28031314/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 0,
            "b4No": 1,
            "recordIds": [
              "28031314_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        }
      ],
      "note": "本页仅显示当前纳入模型记录中的变量标签及设计项；出现次数不代表控制充分。",
      "s1Order": 5,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)",
      "analysisUse": {
        "all": 20,
        "b4Yes": 6,
        "b4No": 14,
        "recordIds": [
          "24566677_ADHD",
          "26688372_ASD",
          "27533796_ADHD",
          "28031314_ADHD",
          "33230558_ADHD",
          "37431475_ADHD_pop",
          "37431475_ADHD_sib",
          "38592388_ADHD_pop",
          "38592388_ADHD_sib",
          "38592388_ASD_pop",
          "38592388_ASD_sib",
          "40898607_ADHD_pop",
          "40898607_ASD_pop",
          "41238184_ADHD",
          "41973453_ASD_pop",
          "41973453_ASD_sib",
          "42371637_ADHD_pop",
          "42371637_ADHD_sib",
          "42371637_ASD_pop",
          "42371637_ASD_sib"
        ]
      }
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
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "40898607_ADHD_pop",
              "40898607_ASD_pop"
            ]
          },
          "controlRoutes": [
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "asthma",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/",
            "https://pubmed.ncbi.nlm.nih.gov/41238184/",
            "https://pubmed.ncbi.nlm.nih.gov/41973453/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ],
          "analysisUse": {
            "all": 9,
            "b4Yes": 5,
            "b4No": 4,
            "recordIds": [
              "40898607_ADHD_pop",
              "40898607_ASD_pop",
              "41238184_ADHD",
              "41973453_ASD_pop",
              "41973453_ASD_sib",
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment",
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "chronic_autoimmune/inflammatory",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/37431475/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "37431475_ADHD_pop",
              "37431475_ADHD_sib"
            ]
          },
          "controlRoutes": [
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "chronic_hypertension",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "41238184_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "chronic_illness",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/27353198/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "27353198_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "chronic_kidney_disease",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ],
          "analysisUse": {
            "all": 4,
            "b4Yes": 4,
            "b4No": 0,
            "recordIds": [
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "diabetes",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/",
            "https://pubmed.ncbi.nlm.nih.gov/41973453/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ],
          "analysisUse": {
            "all": 7,
            "b4Yes": 5,
            "b4No": 2,
            "recordIds": [
              "41238184_ADHD",
              "41973453_ASD_pop",
              "41973453_ASD_sib",
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "epilepsy",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "41238184_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "hypertension",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "40898607_ADHD_pop",
              "40898607_ASD_pop"
            ]
          },
          "controlRoutes": [
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "hypertensive_disease",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ],
          "analysisUse": {
            "all": 4,
            "b4Yes": 4,
            "b4No": 0,
            "recordIds": [
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "rheumatoid_arthritis",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/40898607/",
            "https://pubmed.ncbi.nlm.nih.gov/41973453/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ],
          "analysisUse": {
            "all": 12,
            "b4Yes": 4,
            "b4No": 8,
            "recordIds": [
              "38592388_ADHD_pop",
              "38592388_ADHD_sib",
              "38592388_ASD_pop",
              "38592388_ASD_sib",
              "40898607_ADHD_pop",
              "40898607_ASD_pop",
              "41973453_ASD_pop",
              "41973453_ASD_sib",
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment",
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "thyroid_condition",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/36170224/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 0,
            "b4No": 1,
            "recordIds": [
              "36170224_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        }
      ],
      "note": "本页仅显示当前纳入模型记录中的变量标签及设计项；出现次数不代表控制充分。",
      "s1Order": 6,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)",
      "analysisUse": {
        "all": 17,
        "b4Yes": 6,
        "b4No": 11,
        "recordIds": [
          "27353198_ADHD",
          "36170224_ADHD",
          "37431475_ADHD_pop",
          "37431475_ADHD_sib",
          "38592388_ADHD_pop",
          "38592388_ADHD_sib",
          "38592388_ASD_pop",
          "38592388_ASD_sib",
          "40898607_ADHD_pop",
          "40898607_ASD_pop",
          "41238184_ADHD",
          "41973453_ASD_pop",
          "41973453_ASD_sib",
          "42371637_ADHD_pop",
          "42371637_ADHD_sib",
          "42371637_ASD_pop",
          "42371637_ASD_sib"
        ]
      }
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
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "40898607_ADHD_pop",
              "40898607_ASD_pop"
            ]
          },
          "controlRoutes": [
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Documented alias correction"
          ]
        },
        {
          "label": "H2_blocker",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "40898607_ADHD_pop",
              "40898607_ASD_pop"
            ]
          },
          "controlRoutes": [
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Documented alias correction"
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
          ],
          "analysisUse": {
            "all": 13,
            "b4Yes": 6,
            "b4No": 7,
            "recordIds": [
              "33230558_ADHD",
              "38592388_ADHD_pop",
              "38592388_ADHD_sib",
              "38592388_ASD_pop",
              "38592388_ASD_sib",
              "40964537_ADHD",
              "41238184_ADHD",
              "41973453_ASD_pop",
              "41973453_ASD_sib",
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "NSAIDs",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "40898607_ADHD_pop",
              "40898607_ASD_pop"
            ]
          },
          "controlRoutes": [
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "PPI",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "40898607_ADHD_pop",
              "40898607_ASD_pop"
            ]
          },
          "controlRoutes": [
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Documented alias correction"
          ]
        },
        {
          "label": "antibiotic",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40964537/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "40964537_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "antibiotics",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "40898607_ADHD_pop",
              "40898607_ASD_pop"
            ]
          },
          "controlRoutes": [
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "antidiabetics",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "40898607_ADHD_pop",
              "40898607_ASD_pop"
            ]
          },
          "controlRoutes": [
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Documented alias correction"
          ]
        },
        {
          "label": "antiemetic",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "40898607_ADHD_pop",
              "40898607_ASD_pop"
            ]
          },
          "controlRoutes": [
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Documented alias correction"
          ]
        },
        {
          "label": "antiepileptic",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ],
          "analysisUse": {
            "all": 4,
            "b4Yes": 4,
            "b4No": 0,
            "recordIds": [
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "antiepileptics",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "40898607_ADHD_pop",
              "40898607_ASD_pop"
            ]
          },
          "controlRoutes": [
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "antihistamine",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "40898607_ADHD_pop",
              "40898607_ASD_pop"
            ]
          },
          "controlRoutes": [
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Documented alias correction"
          ]
        },
        {
          "label": "antihypertensive",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ],
          "analysisUse": {
            "all": 4,
            "b4Yes": 4,
            "b4No": 0,
            "recordIds": [
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Medication alias corrected"
          ]
        },
        {
          "label": "antimigraine",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/40898607/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ],
          "analysisUse": {
            "all": 10,
            "b4Yes": 4,
            "b4No": 6,
            "recordIds": [
              "38592388_ADHD_pop",
              "38592388_ADHD_sib",
              "38592388_ASD_pop",
              "38592388_ASD_sib",
              "40898607_ADHD_pop",
              "40898607_ASD_pop",
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment",
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "antiseizure",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ],
          "analysisUse": {
            "all": 6,
            "b4Yes": 0,
            "b4No": 6,
            "recordIds": [
              "38592388_ADHD_pop",
              "38592388_ADHD_sib",
              "38592388_ASD_pop",
              "38592388_ASD_sib",
              "41973453_ASD_pop",
              "41973453_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "antithyroid",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "40898607_ADHD_pop",
              "40898607_ASD_pop"
            ]
          },
          "controlRoutes": [
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Medication alias corrected"
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
          ],
          "analysisUse": {
            "all": 15,
            "b4Yes": 4,
            "b4No": 11,
            "recordIds": [
              "26688372_ASD",
              "28031314_ADHD",
              "30923825_ADHD",
              "38592388_ADHD_pop",
              "38592388_ADHD_sib",
              "38592388_ASD_pop",
              "38592388_ASD_sib",
              "40898607_ADHD_pop",
              "40898607_ASD_pop",
              "41973453_ASD_pop",
              "41973453_ASD_sib",
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment",
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "aspirin_or_ibuprofen",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41801232/"
          ],
          "analysisUse": {
            "all": 3,
            "b4Yes": 0,
            "b4No": 3,
            "recordIds": [
              "41801232_ADHD_sib",
              "41801232_ASD_pop",
              "41801232_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "aspirin_or_ibuprofen(合并1项)",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41801232/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 0,
            "b4No": 1,
            "recordIds": [
              "41801232_ADHD_pop"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "asthma_drugs",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "40898607_ADHD_pop",
              "40898607_ASD_pop"
            ]
          },
          "controlRoutes": [
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Medication alias corrected"
          ]
        },
        {
          "label": "beta_blockers",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "40898607_ADHD_pop",
              "40898607_ASD_pop"
            ]
          },
          "controlRoutes": [
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Documented alias correction"
          ]
        },
        {
          "label": "corticosteroids",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "40898607_ADHD_pop",
              "40898607_ASD_pop"
            ]
          },
          "controlRoutes": [
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Documented alias correction"
          ]
        },
        {
          "label": "folic_acid",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/26688372/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 0,
            "b4No": 1,
            "recordIds": [
              "26688372_ASD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "glucose_lowering_agent",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ],
          "analysisUse": {
            "all": 4,
            "b4Yes": 4,
            "b4No": 0,
            "recordIds": [
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Documented alias correction"
          ]
        },
        {
          "label": "ibuprofen",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/26688372/",
            "https://pubmed.ncbi.nlm.nih.gov/28031314/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "26688372_ASD",
              "28031314_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "lipid_lowering",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "40898607_ADHD_pop",
              "40898607_ASD_pop"
            ]
          },
          "controlRoutes": [
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Documented alias correction"
          ]
        },
        {
          "label": "lipid_regulating_drug",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ],
          "analysisUse": {
            "all": 4,
            "b4Yes": 4,
            "b4No": 0,
            "recordIds": [
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Documented alias correction"
          ]
        },
        {
          "label": "migraine_med",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "40898607_ADHD_pop",
              "40898607_ASD_pop"
            ]
          },
          "controlRoutes": [
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "migraine_medication",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "41973453_ASD_pop",
              "41973453_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "n_co-medications",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/37431475/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "37431475_ADHD_pop",
              "37431475_ADHD_sib"
            ]
          },
          "controlRoutes": [
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "n_other_medications",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "41238184_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "opioid",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/41238184/",
            "https://pubmed.ncbi.nlm.nih.gov/41973453/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ],
          "analysisUse": {
            "all": 11,
            "b4Yes": 5,
            "b4No": 6,
            "recordIds": [
              "38592388_ADHD_pop",
              "38592388_ADHD_sib",
              "38592388_ASD_pop",
              "38592388_ASD_sib",
              "41238184_ADHD",
              "41973453_ASD_pop",
              "41973453_ASD_sib",
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "other_NSAIDs",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/30923825/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 0,
            "b4No": 1,
            "recordIds": [
              "30923825_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "other_analgesic",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/30458756/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 0,
            "b4No": 1,
            "recordIds": [
              "30458756_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "other_medication",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/27353198/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "27353198_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        }
      ],
      "note": "本页仅显示当前纳入模型记录中的变量标签及设计项；出现次数不代表控制充分。",
      "s1Order": 7,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)",
      "analysisUse": {
        "all": 26,
        "b4Yes": 7,
        "b4No": 19,
        "recordIds": [
          "26688372_ASD",
          "27353198_ADHD",
          "28031314_ADHD",
          "30458756_ADHD",
          "30923825_ADHD",
          "33230558_ADHD",
          "37431475_ADHD_pop",
          "37431475_ADHD_sib",
          "38592388_ADHD_pop",
          "38592388_ADHD_sib",
          "38592388_ASD_pop",
          "38592388_ASD_sib",
          "40898607_ADHD_pop",
          "40898607_ASD_pop",
          "40964537_ADHD",
          "41238184_ADHD",
          "41801232_ADHD_pop",
          "41801232_ADHD_sib",
          "41801232_ASD_pop",
          "41801232_ASD_sib",
          "41973453_ASD_pop",
          "41973453_ASD_sib",
          "42371637_ADHD_pop",
          "42371637_ADHD_sib",
          "42371637_ASD_pop",
          "42371637_ASD_sib"
        ]
      }
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
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "34679367_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "dyslipidemia",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ],
          "analysisUse": {
            "all": 6,
            "b4Yes": 4,
            "b4No": 2,
            "recordIds": [
              "40898607_ADHD_pop",
              "40898607_ASD_pop",
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment",
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "maternal_BMI",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/"
          ],
          "analysisUse": {
            "all": 4,
            "b4Yes": 0,
            "b4No": 4,
            "recordIds": [
              "38592388_ADHD_pop",
              "38592388_ADHD_sib",
              "38592388_ASD_pop",
              "38592388_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "maternal_bmi",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/31664451/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 2,
            "b4No": 0,
            "recordIds": [
              "31664451_ADHD",
              "31664451_ASD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "obesity",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "41238184_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
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
          ],
          "analysisUse": {
            "all": 9,
            "b4Yes": 3,
            "b4No": 6,
            "recordIds": [
              "24566677_ADHD",
              "26688372_ASD",
              "27533796_ADHD",
              "28031314_ADHD",
              "29970852_ADHD",
              "30458756_ADHD",
              "32986124_ADHD",
              "33230558_ADHD",
              "40964537_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "prepregnancy_BMI",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "41973453_ASD_pop",
              "41973453_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "week17_BMI",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/29084830/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 0,
            "b4No": 1,
            "recordIds": [
              "29084830_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        }
      ],
      "note": "本页仅显示当前纳入模型记录中的变量标签及设计项；出现次数不代表控制充分。",
      "s1Order": 8,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)",
      "analysisUse": {
        "all": 26,
        "b4Yes": 11,
        "b4No": 15,
        "recordIds": [
          "24566677_ADHD",
          "26688372_ASD",
          "27533796_ADHD",
          "28031314_ADHD",
          "29084830_ADHD",
          "29970852_ADHD",
          "30458756_ADHD",
          "31664451_ADHD",
          "31664451_ASD",
          "32986124_ADHD",
          "33230558_ADHD",
          "34679367_ADHD",
          "38592388_ADHD_pop",
          "38592388_ADHD_sib",
          "38592388_ASD_pop",
          "38592388_ASD_sib",
          "40898607_ADHD_pop",
          "40898607_ASD_pop",
          "40964537_ADHD",
          "41238184_ADHD",
          "41973453_ASD_pop",
          "41973453_ASD_sib",
          "42371637_ADHD_pop",
          "42371637_ADHD_sib",
          "42371637_ASD_pop",
          "42371637_ASD_sib"
        ]
      }
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
          ],
          "analysisUse": {
            "all": 3,
            "b4Yes": 1,
            "b4No": 2,
            "recordIds": [
              "24566677_ADHD",
              "26688372_ASD",
              "27533796_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
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
          ],
          "analysisUse": {
            "all": 11,
            "b4Yes": 4,
            "b4No": 7,
            "recordIds": [
              "31664451_ADHD",
              "31664451_ASD",
              "32986124_ADHD",
              "34679367_ADHD",
              "38592388_ADHD_pop",
              "38592388_ADHD_sib",
              "38592388_ASD_pop",
              "38592388_ASD_sib",
              "40964537_ADHD",
              "41973453_ASD_pop",
              "41973453_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "employment_status",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41801232/"
          ],
          "analysisUse": {
            "all": 4,
            "b4Yes": 0,
            "b4No": 4,
            "recordIds": [
              "41801232_ADHD_pop",
              "41801232_ADHD_sib",
              "41801232_ASD_pop",
              "41801232_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "familial_income",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/32986124/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 0,
            "b4No": 1,
            "recordIds": [
              "32986124_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "family_income",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41801232/"
          ],
          "analysisUse": {
            "all": 4,
            "b4Yes": 0,
            "b4No": 4,
            "recordIds": [
              "41801232_ADHD_pop",
              "41801232_ADHD_sib",
              "41801232_ASD_pop",
              "41801232_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "household_income",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/40964537/"
          ],
          "analysisUse": {
            "all": 5,
            "b4Yes": 1,
            "b4No": 4,
            "recordIds": [
              "38592388_ADHD_pop",
              "38592388_ADHD_sib",
              "38592388_ASD_pop",
              "38592388_ASD_sib",
              "40964537_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "income",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/31509360/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "31509360_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "income_quartile",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "41973453_ASD_pop",
              "41973453_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
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
          ],
          "analysisUse": {
            "all": 6,
            "b4Yes": 2,
            "b4No": 4,
            "recordIds": [
              "27353198_ADHD",
              "29084830_ADHD",
              "29970852_ADHD",
              "30458756_ADHD",
              "36937866_ADHD",
              "37431475_ADHD_pop"
            ]
          },
          "controlRoutes": [
            "Additional outcome-model covariate",
            "Measured adjustment",
            "Outcome-model covariate; participation weights listed separately"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "national_economic_index",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/30458756/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 0,
            "b4No": 1,
            "recordIds": [
              "30458756_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "neighborhood_deprivation_index",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40964537/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "40964537_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "parental_education",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/28031314/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 0,
            "b4No": 1,
            "recordIds": [
              "28031314_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "social_class",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/27353198/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "27353198_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "socio-occupational_status",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/33230558/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 0,
            "b4No": 1,
            "recordIds": [
              "33230558_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Documented alias correction"
          ]
        }
      ],
      "note": "本页仅显示当前纳入模型记录中的变量标签及设计项；出现次数不代表控制充分。",
      "s1Order": 9,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)",
      "analysisUse": {
        "all": 27,
        "b4Yes": 8,
        "b4No": 19,
        "recordIds": [
          "24566677_ADHD",
          "26688372_ASD",
          "27353198_ADHD",
          "27533796_ADHD",
          "28031314_ADHD",
          "29084830_ADHD",
          "29970852_ADHD",
          "30458756_ADHD",
          "31509360_ADHD",
          "31664451_ADHD",
          "31664451_ASD",
          "32986124_ADHD",
          "33230558_ADHD",
          "34679367_ADHD",
          "36937866_ADHD",
          "37431475_ADHD_pop",
          "38592388_ADHD_pop",
          "38592388_ADHD_sib",
          "38592388_ASD_pop",
          "38592388_ASD_sib",
          "40964537_ADHD",
          "41801232_ADHD_pop",
          "41801232_ADHD_sib",
          "41801232_ASD_pop",
          "41801232_ASD_sib",
          "41973453_ASD_pop",
          "41973453_ASD_sib"
        ]
      }
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
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "41973453_ASD_pop",
              "41973453_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Source-supported alias"
          ]
        },
        {
          "label": "country",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "38592388_ADHD_pop",
              "38592388_ASD_pop"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "ethnicity",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40964537/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "40964537_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "maternal_skin_color",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/30458756/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 0,
            "b4No": 1,
            "recordIds": [
              "30458756_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "race",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/34679367/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "34679367_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "race/ethnicity",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/29970852/",
            "https://pubmed.ncbi.nlm.nih.gov/31664451/"
          ],
          "analysisUse": {
            "all": 3,
            "b4Yes": 3,
            "b4No": 0,
            "recordIds": [
              "29970852_ADHD",
              "31664451_ADHD",
              "31664451_ASD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "region/cohort",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/27353198/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "27353198_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "residence",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/",
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ],
          "analysisUse": {
            "all": 5,
            "b4Yes": 1,
            "b4No": 4,
            "recordIds": [
              "38592388_ADHD_pop",
              "38592388_ADHD_sib",
              "38592388_ASD_pop",
              "38592388_ASD_sib",
              "41238184_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "urban_residency",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "41973453_ASD_pop",
              "41973453_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Source-supported alias"
          ]
        },
        {
          "label": "urbanization",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/31509360/",
            "https://pubmed.ncbi.nlm.nih.gov/41801232/"
          ],
          "analysisUse": {
            "all": 5,
            "b4Yes": 1,
            "b4No": 4,
            "recordIds": [
              "31509360_ADHD",
              "41801232_ADHD_pop",
              "41801232_ADHD_sib",
              "41801232_ASD_pop",
              "41801232_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        }
      ],
      "note": "本页仅显示当前纳入模型记录中的变量标签及设计项；出现次数不代表控制充分。",
      "s1Order": 10,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)",
      "analysisUse": {
        "all": 19,
        "b4Yes": 8,
        "b4No": 11,
        "recordIds": [
          "27353198_ADHD",
          "29970852_ADHD",
          "30458756_ADHD",
          "31509360_ADHD",
          "31664451_ADHD",
          "31664451_ASD",
          "34679367_ADHD",
          "38592388_ADHD_pop",
          "38592388_ADHD_sib",
          "38592388_ASD_pop",
          "38592388_ASD_sib",
          "40964537_ADHD",
          "41238184_ADHD",
          "41801232_ADHD_pop",
          "41801232_ADHD_sib",
          "41801232_ASD_pop",
          "41801232_ASD_sib",
          "41973453_ASD_pop",
          "41973453_ASD_sib"
        ]
      }
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
          ],
          "analysisUse": {
            "all": 21,
            "b4Yes": 6,
            "b4No": 15,
            "recordIds": [
              "24566677_ADHD",
              "26688372_ASD",
              "27533796_ADHD",
              "28031314_ADHD",
              "29084830_ADHD",
              "29970852_ADHD",
              "30458756_ADHD",
              "31664451_ADHD",
              "31664451_ASD",
              "32986124_ADHD",
              "33230558_ADHD",
              "34679367_ADHD",
              "36170224_ADHD",
              "36937866_ADHD",
              "37431475_ADHD_pop",
              "37431475_ADHD_sib",
              "40964537_ADHD",
              "41801232_ADHD_pop",
              "41801232_ADHD_sib",
              "41801232_ASD_pop",
              "41801232_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment",
            "Outcome-model covariate; participation weights listed separately",
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "alcohol_abuse",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "41238184_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "drug_abuse",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "41238184_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
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
          ],
          "analysisUse": {
            "all": 25,
            "b4Yes": 5,
            "b4No": 20,
            "recordIds": [
              "24566677_ADHD",
              "26688372_ASD",
              "27533796_ADHD",
              "28031314_ADHD",
              "29084830_ADHD",
              "29970852_ADHD",
              "30458756_ADHD",
              "31664451_ADHD",
              "31664451_ASD",
              "32986124_ADHD",
              "33230558_ADHD",
              "34679367_ADHD",
              "36937866_ADHD",
              "37431475_ADHD_pop",
              "37431475_ADHD_sib",
              "38592388_ADHD_pop",
              "38592388_ADHD_sib",
              "38592388_ASD_pop",
              "38592388_ASD_sib",
              "41801232_ADHD_pop",
              "41801232_ADHD_sib",
              "41801232_ASD_pop",
              "41801232_ASD_sib",
              "41973453_ASD_pop",
              "41973453_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment",
            "Outcome-model covariate; participation weights listed separately",
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "tobacco",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40964537/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "40964537_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "tobacco_abuse",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "41238184_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        }
      ],
      "note": "本页仅显示当前纳入模型记录中的变量标签及设计项；出现次数不代表控制充分。",
      "s1Order": 11,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)",
      "analysisUse": {
        "all": 28,
        "b4Yes": 7,
        "b4No": 21,
        "recordIds": [
          "24566677_ADHD",
          "26688372_ASD",
          "27533796_ADHD",
          "28031314_ADHD",
          "29084830_ADHD",
          "29970852_ADHD",
          "30458756_ADHD",
          "31664451_ADHD",
          "31664451_ASD",
          "32986124_ADHD",
          "33230558_ADHD",
          "34679367_ADHD",
          "36170224_ADHD",
          "36937866_ADHD",
          "37431475_ADHD_pop",
          "37431475_ADHD_sib",
          "38592388_ADHD_pop",
          "38592388_ADHD_sib",
          "38592388_ASD_pop",
          "38592388_ASD_sib",
          "40964537_ADHD",
          "41238184_ADHD",
          "41801232_ADHD_pop",
          "41801232_ADHD_sib",
          "41801232_ASD_pop",
          "41801232_ASD_sib",
          "41973453_ASD_pop",
          "41973453_ASD_sib"
        ]
      }
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
          ],
          "analysisUse": {
            "all": 5,
            "b4Yes": 4,
            "b4No": 1,
            "recordIds": [
              "31664451_ADHD",
              "31664451_ASD",
              "34679367_ADHD",
              "36170224_ADHD",
              "40964537_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        }
      ],
      "note": "本页仅显示当前纳入模型记录中的变量标签及设计项；出现次数不代表控制充分。",
      "s1Order": 12,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)",
      "analysisUse": {
        "all": 5,
        "b4Yes": 4,
        "b4No": 1,
        "recordIds": [
          "31664451_ADHD",
          "31664451_ASD",
          "34679367_ADHD",
          "36170224_ADHD",
          "40964537_ADHD"
        ]
      }
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
          ],
          "analysisUse": {
            "all": 35,
            "b4Yes": 11,
            "b4No": 24,
            "recordIds": [
              "24566677_ADHD",
              "26688372_ASD",
              "27533796_ADHD",
              "28031314_ADHD",
              "29084830_ADHD",
              "29970852_ADHD",
              "30458756_ADHD",
              "30923825_ADHD",
              "31664451_ADHD",
              "31664451_ASD",
              "32986124_ADHD",
              "33230558_ADHD",
              "34679367_ADHD",
              "36170224_ADHD",
              "36937866_ADHD",
              "37431475_ADHD_pop",
              "37431475_ADHD_sib",
              "38592388_ADHD_pop",
              "38592388_ADHD_sib",
              "38592388_ASD_pop",
              "38592388_ASD_sib",
              "40898607_ADHD_pop",
              "40898607_ASD_pop",
              "40964537_ADHD",
              "41238184_ADHD",
              "41801232_ADHD_pop",
              "41801232_ADHD_sib",
              "41801232_ASD_pop",
              "41801232_ASD_sib",
              "41973453_ASD_pop",
              "41973453_ASD_sib",
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment",
            "Outcome-model covariate; participation weights listed separately",
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "paternal_age",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "41973453_ASD_pop",
              "41973453_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Documented alias correction"
          ]
        }
      ],
      "note": "本页仅显示当前纳入模型记录中的变量标签及设计项；出现次数不代表控制充分。",
      "s1Order": 13,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)",
      "analysisUse": {
        "all": 35,
        "b4Yes": 11,
        "b4No": 24,
        "recordIds": [
          "24566677_ADHD",
          "26688372_ASD",
          "27533796_ADHD",
          "28031314_ADHD",
          "29084830_ADHD",
          "29970852_ADHD",
          "30458756_ADHD",
          "30923825_ADHD",
          "31664451_ADHD",
          "31664451_ASD",
          "32986124_ADHD",
          "33230558_ADHD",
          "34679367_ADHD",
          "36170224_ADHD",
          "36937866_ADHD",
          "37431475_ADHD_pop",
          "37431475_ADHD_sib",
          "38592388_ADHD_pop",
          "38592388_ADHD_sib",
          "38592388_ASD_pop",
          "38592388_ASD_sib",
          "40898607_ADHD_pop",
          "40898607_ASD_pop",
          "40964537_ADHD",
          "41238184_ADHD",
          "41801232_ADHD_pop",
          "41801232_ADHD_sib",
          "41801232_ASD_pop",
          "41801232_ASD_sib",
          "41973453_ASD_pop",
          "41973453_ASD_sib",
          "42371637_ADHD_pop",
          "42371637_ADHD_sib",
          "42371637_ASD_pop",
          "42371637_ASD_sib"
        ]
      }
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
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "40898607_ADHD_pop",
              "40898607_ASD_pop"
            ]
          },
          "controlRoutes": [
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "child_birth_order",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/30923825/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 0,
            "b4No": 1,
            "recordIds": [
              "30923825_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "gravidity",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40964537/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "40964537_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
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
          ],
          "analysisUse": {
            "all": 27,
            "b4Yes": 9,
            "b4No": 18,
            "recordIds": [
              "24566677_ADHD",
              "26688372_ASD",
              "27533796_ADHD",
              "28031314_ADHD",
              "29084830_ADHD",
              "29970852_ADHD",
              "30458756_ADHD",
              "31664451_ADHD",
              "31664451_ASD",
              "33230558_ADHD",
              "34679367_ADHD",
              "36937866_ADHD",
              "37431475_ADHD_pop",
              "38592388_ADHD_pop",
              "38592388_ADHD_sib",
              "38592388_ASD_pop",
              "38592388_ASD_sib",
              "41801232_ADHD_pop",
              "41801232_ADHD_sib",
              "41801232_ASD_pop",
              "41801232_ASD_sib",
              "41973453_ASD_pop",
              "41973453_ASD_sib",
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Additional outcome-model covariate",
            "Measured adjustment",
            "Outcome-model covariate; participation weights listed separately"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        }
      ],
      "note": "本页仅显示当前纳入模型记录中的变量标签及设计项；出现次数不代表控制充分。",
      "s1Order": 14,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)",
      "analysisUse": {
        "all": 31,
        "b4Yes": 10,
        "b4No": 21,
        "recordIds": [
          "24566677_ADHD",
          "26688372_ASD",
          "27533796_ADHD",
          "28031314_ADHD",
          "29084830_ADHD",
          "29970852_ADHD",
          "30458756_ADHD",
          "30923825_ADHD",
          "31664451_ADHD",
          "31664451_ASD",
          "33230558_ADHD",
          "34679367_ADHD",
          "36937866_ADHD",
          "37431475_ADHD_pop",
          "38592388_ADHD_pop",
          "38592388_ADHD_sib",
          "38592388_ASD_pop",
          "38592388_ASD_sib",
          "40898607_ADHD_pop",
          "40898607_ASD_pop",
          "40964537_ADHD",
          "41801232_ADHD_pop",
          "41801232_ADHD_sib",
          "41801232_ASD_pop",
          "41801232_ASD_sib",
          "41973453_ASD_pop",
          "41973453_ASD_sib",
          "42371637_ADHD_pop",
          "42371637_ADHD_sib",
          "42371637_ASD_pop",
          "42371637_ASD_sib"
        ]
      }
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
          ],
          "analysisUse": {
            "all": 6,
            "b4Yes": 0,
            "b4No": 6,
            "recordIds": [
              "38592388_ADHD_pop",
              "38592388_ADHD_sib",
              "38592388_ASD_pop",
              "38592388_ASD_sib",
              "41973453_ASD_pop",
              "41973453_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "marital_status",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/29084830/",
            "https://pubmed.ncbi.nlm.nih.gov/31664451/",
            "https://pubmed.ncbi.nlm.nih.gov/34679367/",
            "https://pubmed.ncbi.nlm.nih.gov/36937866/"
          ],
          "analysisUse": {
            "all": 5,
            "b4Yes": 3,
            "b4No": 2,
            "recordIds": [
              "29084830_ADHD",
              "31664451_ADHD",
              "31664451_ASD",
              "34679367_ADHD",
              "36937866_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment",
            "Outcome-model covariate; participation weights listed separately"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        }
      ],
      "note": "本页仅显示当前纳入模型记录中的变量标签及设计项；出现次数不代表控制充分。",
      "s1Order": 15,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)",
      "analysisUse": {
        "all": 11,
        "b4Yes": 3,
        "b4No": 8,
        "recordIds": [
          "29084830_ADHD",
          "31664451_ADHD",
          "31664451_ASD",
          "34679367_ADHD",
          "36937866_ADHD",
          "38592388_ADHD_pop",
          "38592388_ADHD_sib",
          "38592388_ASD_pop",
          "38592388_ASD_sib",
          "41973453_ASD_pop",
          "41973453_ASD_sib"
        ]
      }
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
          ],
          "analysisUse": {
            "all": 10,
            "b4Yes": 2,
            "b4No": 8,
            "recordIds": [
              "24566677_ADHD",
              "26688372_ASD",
              "29084830_ADHD",
              "38592388_ADHD_pop",
              "38592388_ADHD_sib",
              "38592388_ASD_pop",
              "38592388_ASD_sib",
              "40898607_ADHD_pop",
              "40898607_ASD_pop",
              "41238184_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment",
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "calendar_year",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "41973453_ASD_pop",
              "41973453_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "child_birth_year",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/30923825/",
            "https://pubmed.ncbi.nlm.nih.gov/33230558/",
            "https://pubmed.ncbi.nlm.nih.gov/37431475/",
            "https://pubmed.ncbi.nlm.nih.gov/41801232/"
          ],
          "analysisUse": {
            "all": 8,
            "b4Yes": 0,
            "b4No": 8,
            "recordIds": [
              "30923825_ADHD",
              "33230558_ADHD",
              "37431475_ADHD_pop",
              "37431475_ADHD_sib",
              "41801232_ADHD_pop",
              "41801232_ADHD_sib",
              "41801232_ASD_pop",
              "41801232_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment",
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "delivery_year",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ],
          "analysisUse": {
            "all": 4,
            "b4Yes": 4,
            "b4No": 0,
            "recordIds": [
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Documented alias correction"
          ]
        },
        {
          "label": "period_delivery",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/"
          ],
          "analysisUse": {
            "all": 4,
            "b4Yes": 0,
            "b4No": 4,
            "recordIds": [
              "38592388_ADHD_pop",
              "38592388_ADHD_sib",
              "38592388_ASD_pop",
              "38592388_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        },
        {
          "label": "season_of_delivery",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "41973453_ASD_pop",
              "41973453_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Legacy rule reproduced"
          ]
        }
      ],
      "note": "本页仅显示当前纳入模型记录中的变量标签及设计项；出现次数不代表控制充分。",
      "s1Order": 16,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(2/3)",
      "analysisUse": {
        "all": 24,
        "b4Yes": 6,
        "b4No": 18,
        "recordIds": [
          "24566677_ADHD",
          "26688372_ASD",
          "29084830_ADHD",
          "30923825_ADHD",
          "33230558_ADHD",
          "37431475_ADHD_pop",
          "37431475_ADHD_sib",
          "38592388_ADHD_pop",
          "38592388_ADHD_sib",
          "38592388_ASD_pop",
          "38592388_ASD_sib",
          "40898607_ADHD_pop",
          "40898607_ASD_pop",
          "41238184_ADHD",
          "41801232_ADHD_pop",
          "41801232_ADHD_sib",
          "41801232_ASD_pop",
          "41801232_ASD_sib",
          "41973453_ASD_pop",
          "41973453_ASD_sib",
          "42371637_ADHD_pop",
          "42371637_ADHD_sib",
          "42371637_ASD_pop",
          "42371637_ASD_sib"
        ]
      }
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
          ],
          "analysisUse": {
            "all": 4,
            "b4Yes": 4,
            "b4No": 0,
            "recordIds": [
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Excluded from core counts"
          ]
        },
        {
          "label": "Apgar_5min",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ],
          "analysisUse": {
            "all": 4,
            "b4Yes": 4,
            "b4No": 0,
            "recordIds": [
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Excluded from core counts"
          ]
        },
        {
          "label": "birth_trauma",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ],
          "analysisUse": {
            "all": 4,
            "b4Yes": 4,
            "b4No": 0,
            "recordIds": [
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Perinatal / post-exposure variable"
          ],
          "mappingStatus": [
            "Excluded from B1-B3"
          ]
        },
        {
          "label": "birth_weight",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/24566677/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ],
          "analysisUse": {
            "all": 5,
            "b4Yes": 5,
            "b4No": 0,
            "recordIds": [
              "24566677_ADHD",
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Excluded from core counts"
          ]
        },
        {
          "label": "birthweight",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/29970852/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "29970852_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Excluded from core counts"
          ]
        },
        {
          "label": "comorbid_perinatal_conditions",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/31509360/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "31509360_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Excluded from core counts"
          ]
        },
        {
          "label": "delivery_method",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40964537/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "40964537_ADHD"
            ]
          },
          "controlRoutes": [
            "Perinatal / post-exposure variable"
          ],
          "mappingStatus": [
            "Excluded from B1-B3"
          ]
        },
        {
          "label": "delivery_mode",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ],
          "analysisUse": {
            "all": 5,
            "b4Yes": 5,
            "b4No": 0,
            "recordIds": [
              "41238184_ADHD",
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Perinatal / post-exposure variable"
          ],
          "mappingStatus": [
            "Excluded from B1-B3"
          ]
        },
        {
          "label": "delivery_type",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/29970852/",
            "https://pubmed.ncbi.nlm.nih.gov/31664451/",
            "https://pubmed.ncbi.nlm.nih.gov/34679367/"
          ],
          "analysisUse": {
            "all": 4,
            "b4Yes": 4,
            "b4No": 0,
            "recordIds": [
              "29970852_ADHD",
              "31664451_ADHD",
              "31664451_ASD",
              "34679367_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Excluded from core counts"
          ]
        },
        {
          "label": "gestational_age",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/24566677/",
            "https://pubmed.ncbi.nlm.nih.gov/27353198/",
            "https://pubmed.ncbi.nlm.nih.gov/29970852/"
          ],
          "analysisUse": {
            "all": 3,
            "b4Yes": 3,
            "b4No": 0,
            "recordIds": [
              "24566677_ADHD",
              "27353198_ADHD",
              "29970852_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Excluded from core counts"
          ]
        },
        {
          "label": "labor_type",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40964537/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "40964537_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Excluded from core counts"
          ]
        },
        {
          "label": "low_birth_weight",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/31664451/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 2,
            "b4No": 0,
            "recordIds": [
              "31664451_ADHD",
              "31664451_ASD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Excluded from core counts"
          ]
        },
        {
          "label": "low_birthweight",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/34679367/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "34679367_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Excluded from core counts"
          ]
        },
        {
          "label": "malpresentation",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "41238184_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Excluded from core counts"
          ]
        },
        {
          "label": "premature_contractions",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "41238184_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Excluded from core counts"
          ]
        },
        {
          "label": "premature_rupture_membrane",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "41238184_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Excluded from core counts"
          ]
        },
        {
          "label": "preterm_birth",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/31664451/",
            "https://pubmed.ncbi.nlm.nih.gov/34679367/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ],
          "analysisUse": {
            "all": 7,
            "b4Yes": 7,
            "b4No": 0,
            "recordIds": [
              "31664451_ADHD",
              "31664451_ASD",
              "34679367_ADHD",
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Excluded from core counts"
          ]
        },
        {
          "label": "small_for_gestational_age",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "41238184_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Excluded from core counts"
          ]
        }
      ],
      "note": "本页仅显示当前纳入模型记录中的变量标签及设计项；出现次数不代表控制充分。",
      "s1Order": 17,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)",
      "analysisUse": {
        "all": 13,
        "b4Yes": 13,
        "b4No": 0,
        "recordIds": [
          "24566677_ADHD",
          "27353198_ADHD",
          "29970852_ADHD",
          "31509360_ADHD",
          "31664451_ADHD",
          "31664451_ASD",
          "34679367_ADHD",
          "40964537_ADHD",
          "41238184_ADHD",
          "42371637_ADHD_pop",
          "42371637_ADHD_sib",
          "42371637_ASD_pop",
          "42371637_ASD_sib"
        ]
      }
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
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "41238184_ADHD"
            ]
          },
          "controlRoutes": [
            "Timing-dependent pregnancy variable"
          ],
          "mappingStatus": [
            "Excluded from B1-B3"
          ]
        },
        {
          "label": "gestational_diabetes",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/30923825/",
            "https://pubmed.ncbi.nlm.nih.gov/41238184/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ],
          "analysisUse": {
            "all": 6,
            "b4Yes": 5,
            "b4No": 1,
            "recordIds": [
              "30923825_ADHD",
              "41238184_ADHD",
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Timing-dependent pregnancy variable"
          ],
          "mappingStatus": [
            "Excluded from B1-B3"
          ]
        },
        {
          "label": "gestational_hypertension",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/",
            "https://pubmed.ncbi.nlm.nih.gov/42371637/"
          ],
          "analysisUse": {
            "all": 5,
            "b4Yes": 5,
            "b4No": 0,
            "recordIds": [
              "41238184_ADHD",
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Timing-dependent pregnancy variable"
          ],
          "mappingStatus": [
            "Excluded from B1-B3"
          ]
        },
        {
          "label": "preeclampsia",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/30923825/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 0,
            "b4No": 1,
            "recordIds": [
              "30923825_ADHD"
            ]
          },
          "controlRoutes": [
            "Timing-dependent pregnancy variable"
          ],
          "mappingStatus": [
            "Excluded from B1-B3"
          ]
        }
      ],
      "note": "目前列为 non-core、Timing-dependent。需按暴露窗口判断发生顺序，图中箭头仍待专家审核。 本页仅显示当前纳入模型记录中的变量标签及设计项；出现次数不代表控制充分。",
      "s1Order": 18,
      "s1Status": "Estimate-specific classification",
      "s1Consensus": "(3/3)",
      "analysisUse": {
        "all": 6,
        "b4Yes": 5,
        "b4No": 1,
        "recordIds": [
          "30923825_ADHD",
          "41238184_ADHD",
          "42371637_ADHD_pop",
          "42371637_ADHD_sib",
          "42371637_ASD_pop",
          "42371637_ASD_sib"
        ]
      }
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
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "29970852_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Excluded from core counts"
          ]
        }
      ],
      "note": "本页仅显示当前纳入模型记录中的变量标签及设计项；出现次数不代表控制充分。",
      "s1Order": 19,
      "s1Status": "Both (convergent)",
      "s1Consensus": "(3/3)",
      "analysisUse": {
        "all": 1,
        "b4Yes": 1,
        "b4No": 0,
        "recordIds": [
          "29970852_ADHD"
        ]
      }
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
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "27353198_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Excluded from core counts"
          ]
        },
        {
          "label": "child_age",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/31509360/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "31509360_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Excluded from core counts"
          ]
        },
        {
          "label": "child_age_at_visit",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40964537/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "40964537_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Excluded from core counts"
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
          ],
          "analysisUse": {
            "all": 27,
            "b4Yes": 12,
            "b4No": 15,
            "recordIds": [
              "24566677_ADHD",
              "26688372_ASD",
              "27353198_ADHD",
              "28031314_ADHD",
              "29970852_ADHD",
              "31509360_ADHD",
              "31664451_ADHD",
              "31664451_ASD",
              "32986124_ADHD",
              "34679367_ADHD",
              "37431475_ADHD_pop",
              "37431475_ADHD_sib",
              "38592388_ADHD_pop",
              "38592388_ADHD_sib",
              "38592388_ASD_pop",
              "38592388_ASD_sib",
              "40964537_ADHD",
              "41801232_ADHD_pop",
              "41801232_ADHD_sib",
              "41801232_ASD_pop",
              "41801232_ASD_sib",
              "41973453_ASD_pop",
              "41973453_ASD_sib",
              "42371637_ADHD_pop",
              "42371637_ADHD_sib",
              "42371637_ASD_pop",
              "42371637_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Measured adjustment",
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Excluded from core counts"
          ]
        },
        {
          "label": "tester",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/28031314/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 0,
            "b4No": 1,
            "recordIds": [
              "28031314_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Excluded from core counts"
          ]
        }
      ],
      "note": "当前合并儿童性别和评估年龄，请判断是否需要拆分。 本页仅显示当前纳入模型记录中的变量标签及设计项；出现次数不代表控制充分。",
      "s1Order": 26,
      "s1Status": "Both (convergent)",
      "s1Consensus": "n/a",
      "analysisUse": {
        "all": 27,
        "b4Yes": 12,
        "b4No": 15,
        "recordIds": [
          "24566677_ADHD",
          "26688372_ASD",
          "27353198_ADHD",
          "28031314_ADHD",
          "29970852_ADHD",
          "31509360_ADHD",
          "31664451_ADHD",
          "31664451_ASD",
          "32986124_ADHD",
          "34679367_ADHD",
          "37431475_ADHD_pop",
          "37431475_ADHD_sib",
          "38592388_ADHD_pop",
          "38592388_ADHD_sib",
          "38592388_ASD_pop",
          "38592388_ASD_sib",
          "40964537_ADHD",
          "41801232_ADHD_pop",
          "41801232_ADHD_sib",
          "41801232_ASD_pop",
          "41801232_ASD_sib",
          "41973453_ASD_pop",
          "41973453_ASD_sib",
          "42371637_ADHD_pop",
          "42371637_ADHD_sib",
          "42371637_ASD_pop",
          "42371637_ASD_sib"
        ]
      }
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
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "41973453_ASD_pop",
              "41973453_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Healthcare utilisation / detection context"
          ],
          "mappingStatus": [
            "Reported non-core"
          ]
        },
        {
          "label": "antenatal_visits",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/"
          ],
          "analysisUse": {
            "all": 4,
            "b4Yes": 0,
            "b4No": 4,
            "recordIds": [
              "38592388_ADHD_pop",
              "38592388_ADHD_sib",
              "38592388_ASD_pop",
              "38592388_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Reported non-core healthcare use"
          ],
          "mappingStatus": [
            "Excluded from B1-B3"
          ]
        },
        {
          "label": "drug_coverage",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "41238184_ADHD"
            ]
          },
          "controlRoutes": [
            "Reported non-core healthcare use"
          ],
          "mappingStatus": [
            "Excluded from B1-B3"
          ]
        },
        {
          "label": "emergency_visit",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "41238184_ADHD"
            ]
          },
          "controlRoutes": [
            "Reported non-core healthcare use"
          ],
          "mappingStatus": [
            "Excluded from B1-B3"
          ]
        },
        {
          "label": "healthcare_visits_pre_preg",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/38592388/"
          ],
          "analysisUse": {
            "all": 4,
            "b4Yes": 0,
            "b4No": 4,
            "recordIds": [
              "38592388_ADHD_pop",
              "38592388_ADHD_sib",
              "38592388_ASD_pop",
              "38592388_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Reported non-core healthcare use"
          ],
          "mappingStatus": [
            "Excluded from B1-B3"
          ]
        },
        {
          "label": "hospital_visits_year_before_pregnancy",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "41973453_ASD_pop",
              "41973453_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Healthcare utilisation / detection context"
          ],
          "mappingStatus": [
            "Reported non-core"
          ]
        },
        {
          "label": "insurance_coverage",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/36170224/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 0,
            "b4No": 1,
            "recordIds": [
              "36170224_ADHD"
            ]
          },
          "controlRoutes": [
            "Measured adjustment"
          ],
          "mappingStatus": [
            "Reported non-core"
          ]
        },
        {
          "label": "obstetrician_followup",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41238184/"
          ],
          "analysisUse": {
            "all": 1,
            "b4Yes": 1,
            "b4No": 0,
            "recordIds": [
              "41238184_ADHD"
            ]
          },
          "controlRoutes": [
            "Reported non-core healthcare use"
          ],
          "mappingStatus": [
            "Excluded from B1-B3"
          ]
        },
        {
          "label": "prepreg_health_checkup",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/40898607/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "40898607_ADHD_pop",
              "40898607_ASD_pop"
            ]
          },
          "controlRoutes": [
            "Propensity-score model input"
          ],
          "mappingStatus": [
            "Excluded from B1-B3"
          ]
        },
        {
          "label": "prescriptions_year_before_pregnancy",
          "sources": [
            "https://pubmed.ncbi.nlm.nih.gov/41973453/"
          ],
          "analysisUse": {
            "all": 2,
            "b4Yes": 0,
            "b4No": 2,
            "recordIds": [
              "41973453_ASD_pop",
              "41973453_ASD_sib"
            ]
          },
          "controlRoutes": [
            "Healthcare utilisation / detection context"
          ],
          "mappingStatus": [
            "Reported non-core"
          ]
        }
      ],
      "note": "需区分用药前的就医或用药倾向与孕期产检，具体作用取决于发生时间。 本页仅显示当前纳入模型记录中的变量标签及设计项；出现次数不代表控制充分。",
      "s1Order": 29,
      "s1Status": "Reclassified",
      "s1Consensus": "(3/3)",
      "analysisUse": {
        "all": 10,
        "b4Yes": 1,
        "b4No": 9,
        "recordIds": [
          "36170224_ADHD",
          "38592388_ADHD_pop",
          "38592388_ADHD_sib",
          "38592388_ASD_pop",
          "38592388_ASD_sib",
          "40898607_ADHD_pop",
          "40898607_ASD_pop",
          "41238184_ADHD",
          "41973453_ASD_pop",
          "41973453_ASD_sib"
        ]
      }
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
      "id": "E050",
      "from": "dag-22",
      "to": "dag-02"
    }
  ],
  "previousBaseline": {
    "version": "2026-09-10.s1-v2",
    "graphHash": "4d57e018cefebc57f41f16ed978624073bbc970ed820851c40aec3ef3860c0a1",
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
      "dag-23",
      "dag-24",
      "dag-25",
      "dag-28",
      "dag-29",
      "dag-30",
      "dag-26",
      "dag-27",
      "dag-31",
      "dag-22",
      "dag-19",
      "dag-20",
      "dag-21"
    ],
    "nodes": [
      {
        "id": "dag-01",
        "name": "Prenatal acetaminophen",
        "zh": "孕期对乙酰氨基酚使用",
        "domain": "Exposure"
      },
      {
        "id": "dag-02",
        "name": "Offspring ASD/ADHD",
        "zh": "子代 ASD / ADHD",
        "domain": "Outcome"
      },
      {
        "id": "dag-03",
        "name": "Shared familial/genetic background",
        "zh": "家族共享环境及遗传背景",
        "domain": "B1"
      },
      {
        "id": "dag-04",
        "name": "Maternal neurodevelopmental liability",
        "zh": "母亲神经发育易感性",
        "domain": "B1"
      },
      {
        "id": "dag-05",
        "name": "Maternal psychiatric vulnerability",
        "zh": "母亲精神心理易感性",
        "domain": "B1"
      },
      {
        "id": "dag-06",
        "name": "Acute infection / fever indication",
        "zh": "急性感染或发热适应证",
        "domain": "B2"
      },
      {
        "id": "dag-07",
        "name": "Pain / headache / migraine indication",
        "zh": "疼痛、头痛或偏头痛适应证",
        "domain": "B2"
      },
      {
        "id": "dag-08",
        "name": "Chronic maternal medical conditions",
        "zh": "母亲慢性疾病",
        "domain": "B2"
      },
      {
        "id": "dag-09",
        "name": "Concomitant medication / treatment context",
        "zh": "合并用药及治疗背景",
        "domain": "B2"
      },
      {
        "id": "dag-10",
        "name": "Maternal metabolic / adiposity status",
        "zh": "母亲代谢及肥胖状态",
        "domain": "B2"
      },
      {
        "id": "dag-11",
        "name": "Socioeconomic position",
        "zh": "社会经济地位",
        "domain": "B3"
      },
      {
        "id": "dag-12",
        "name": "Demographic / regional context",
        "zh": "人口及地区背景",
        "domain": "B3"
      },
      {
        "id": "dag-13",
        "name": "Lifestyle / substance use",
        "zh": "生活方式及物质使用",
        "domain": "B3"
      },
      {
        "id": "dag-14",
        "name": "Psychosocial stress",
        "zh": "心理社会压力",
        "domain": "B3"
      },
      {
        "id": "dag-15",
        "name": "Maternal demographic context",
        "zh": "父母年龄等人口学特征",
        "domain": "B3"
      },
      {
        "id": "dag-16",
        "name": "Reproductive history / parity",
        "zh": "生育史及产次",
        "domain": "B3"
      },
      {
        "id": "dag-17",
        "name": "Family structure",
        "zh": "家庭结构",
        "domain": "B3"
      },
      {
        "id": "dag-18",
        "name": "Temporal context",
        "zh": "日历时期背景",
        "domain": "B3"
      },
      {
        "id": "dag-23",
        "name": "Perinatal mediators",
        "zh": "围产期中介因素",
        "domain": "B4"
      },
      {
        "id": "dag-24",
        "name": "Current-pregnancy obstetric complications",
        "zh": "本次妊娠并发症",
        "domain": "non-core"
      },
      {
        "id": "dag-25",
        "name": "Breastfeeding / lactation",
        "zh": "母乳喂养",
        "domain": "B4"
      },
      {
        "id": "dag-28",
        "name": "Early-child infection / microbiome / atopy",
        "zh": "儿童早期感染、微生物组及过敏",
        "domain": "B4"
      },
      {
        "id": "dag-29",
        "name": "Early developmental / regulatory phenotype",
        "zh": "早期发育及调节表型",
        "domain": "B4"
      },
      {
        "id": "dag-30",
        "name": "Mechanistic chain (oxidative stress, inflammation, hormonal, epigenetic, placental, fetal brain)",
        "zh": "生物学机制链",
        "domain": "B4"
      },
      {
        "id": "dag-26",
        "name": "Selection / inclusion / cohort entry",
        "zh": "选择、纳入及队列进入",
        "domain": "B4"
      },
      {
        "id": "dag-27",
        "name": "Diagnostic / ascertainment",
        "zh": "诊断及结局识别",
        "domain": "B4"
      },
      {
        "id": "dag-31",
        "name": "Healthcare utilisation leading to outcome detection",
        "zh": "影响结局检出的医疗服务利用",
        "domain": "B4"
      },
      {
        "id": "dag-22",
        "name": "Child sex; age at assessment",
        "zh": "儿童性别及评估年龄",
        "domain": "non-core"
      },
      {
        "id": "dag-19",
        "name": "Environmental / occupational exposures",
        "zh": "环境及职业暴露",
        "domain": "Blind-spot"
      },
      {
        "id": "dag-20",
        "name": "Acetaminophen pharmacogenetics",
        "zh": "对乙酰氨基酚药物遗传因素",
        "domain": "Blind-spot"
      },
      {
        "id": "dag-21",
        "name": "Medication-seeking propensity",
        "zh": "用药寻求倾向",
        "domain": "Blind-spot / split"
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
  },
  "analysisScope": {
    "name": "Current manuscript pooled-model scope",
    "mainText": "MainText_20260904.docx",
    "supplement": "Supplementary_Information_20260904_v3.docx",
    "mappingSource": "Covariate construct trace, final verification edition 2026-09-04",
    "allEstimates": 39,
    "b4YesEstimates": 13,
    "b4NoEstimates": 26,
    "allConstructs": 21,
    "b4NoConstructs": 19,
    "note": "The manuscript pools all 39 estimates, then excludes 13 coded B4=Yes. Counts describe archived model labels and design terms, not adequate causal control. The latest model-level trace is used for Prahm label details; effect estimates, ratings and B4 flags are unchanged."
  },
  "unmappedVariables": [
    {
      "label": "acetaminophen(look-back)",
      "sources": [
        "https://pubmed.ncbi.nlm.nih.gov/40898607/"
      ],
      "analysisUse": {
        "all": 2,
        "b4Yes": 0,
        "b4No": 2,
        "recordIds": [
          "40898607_ADHD_pop",
          "40898607_ASD_pop"
        ]
      },
      "controlRoutes": [
        "Propensity-score model input"
      ],
      "mappingStatus": [
        "Excluded from core counts"
      ]
    },
    {
      "label": "apap_before&after_pregnancy",
      "sources": [
        "https://pubmed.ncbi.nlm.nih.gov/37431475/"
      ],
      "analysisUse": {
        "all": 2,
        "b4Yes": 0,
        "b4No": 2,
        "recordIds": [
          "37431475_ADHD_pop",
          "37431475_ADHD_sib"
        ]
      },
      "controlRoutes": [
        "Propensity-score model input"
      ],
      "mappingStatus": [
        "Excluded from core counts"
      ]
    },
    {
      "label": "apap_first_trimester",
      "sources": [
        "https://pubmed.ncbi.nlm.nih.gov/41238184/"
      ],
      "analysisUse": {
        "all": 1,
        "b4Yes": 1,
        "b4No": 0,
        "recordIds": [
          "41238184_ADHD"
        ]
      },
      "controlRoutes": [
        "Exposure / negative-control term"
      ],
      "mappingStatus": [
        "Excluded from core counts"
      ]
    },
    {
      "label": "apap_postnatal",
      "sources": [
        "https://pubmed.ncbi.nlm.nih.gov/30923825/"
      ],
      "analysisUse": {
        "all": 1,
        "b4Yes": 0,
        "b4No": 1,
        "recordIds": [
          "30923825_ADHD"
        ]
      },
      "controlRoutes": [
        "Exposure / negative-control term"
      ],
      "mappingStatus": [
        "S1 crosswalk requires review"
      ]
    },
    {
      "label": "apap_pre_pregnancy",
      "sources": [
        "https://pubmed.ncbi.nlm.nih.gov/30923825/"
      ],
      "analysisUse": {
        "all": 1,
        "b4Yes": 0,
        "b4No": 1,
        "recordIds": [
          "30923825_ADHD"
        ]
      },
      "controlRoutes": [
        "Exposure / negative-control term"
      ],
      "mappingStatus": [
        "S1 crosswalk requires review"
      ]
    },
    {
      "label": "gastric_bypass",
      "sources": [
        "https://pubmed.ncbi.nlm.nih.gov/41973453/"
      ],
      "analysisUse": {
        "all": 2,
        "b4Yes": 0,
        "b4No": 2,
        "recordIds": [
          "41973453_ASD_pop",
          "41973453_ASD_sib"
        ]
      },
      "controlRoutes": [
        "Measured adjustment"
      ],
      "mappingStatus": [
        "Insufficient specificity for core credit"
      ]
    },
    {
      "label": "other",
      "sources": [
        "https://pubmed.ncbi.nlm.nih.gov/37431475/"
      ],
      "analysisUse": {
        "all": 2,
        "b4Yes": 0,
        "b4No": 2,
        "recordIds": [
          "37431475_ADHD_pop",
          "37431475_ADHD_sib"
        ]
      },
      "controlRoutes": [
        "Propensity-score model input"
      ],
      "mappingStatus": [
        "Insufficient specificity for core credit"
      ]
    },
    {
      "label": "trouble_sleeping",
      "sources": [
        "https://pubmed.ncbi.nlm.nih.gov/36170224/"
      ],
      "analysisUse": {
        "all": 1,
        "b4Yes": 0,
        "b4No": 1,
        "recordIds": [
          "36170224_ADHD"
        ]
      },
      "controlRoutes": [
        "Measured adjustment"
      ],
      "mappingStatus": [
        "Insufficient specificity for core credit"
      ]
    },
    {
      "label": "unspecified",
      "sources": [
        "https://pubmed.ncbi.nlm.nih.gov/37431475/"
      ],
      "analysisUse": {
        "all": 2,
        "b4Yes": 0,
        "b4No": 2,
        "recordIds": [
          "37431475_ADHD_pop",
          "37431475_ADHD_sib"
        ]
      },
      "controlRoutes": [
        "Propensity-score model input"
      ],
      "mappingStatus": [
        "Insufficient specificity for core credit"
      ]
    }
  ]
};
