#!/usr/bin/env python3
"""Crosswalk for the A/B/C-only re-clustered taxonomies (clean re-run, no D/E).
gpt-5.5 as the alignment judge; spine = gpt-5.5 abc taxonomy. Output: trackB_crosswalk_abc.json
NON-DESTRUCTIVE.
"""
import os, json, openpyxl
from llm_dag_induction import load_key
from llm_dag_induction_openai import call_openai

HERE = os.path.dirname(os.path.abspath(__file__))

# Not shipped; requires the project's internal DeepSeek confounder workbook
wb = openpyxl.load_workbook(os.path.join(os.path.dirname(HERE), "data", "LLM-DAG_DeepSeek_confounders_only.xlsx"), data_only=True)
A = []
for r in wb["Sheet1"].iter_rows(values_only=True):
    dom, con = r[0], r[1]
    if con and dom in ("B1", "B2", "B3", "excluded", "新增"):
        tag = dom if dom in ("B1","B2","B3") else ("non-core" if dom=="excluded" else "added(env)")
        A.append(f"{tag}: {con}")

def load_tax(fn):
    cs = json.load(open(os.path.join(os.path.dirname(HERE), "llm_outputs", fn)))["parsed"]["constructs"]
    return [f"{c['name']} [{c.get('dominant_role')}]" for c in cs]

GPT = load_tax("trackB_taxonomy_abc_gpt-5.5.json")
DS  = load_tax("trackB_taxonomy_abc_deepseek-v4-pro.json")
GEM = load_tax("trackB_taxonomy_abc_gemini-3.1-pro-preview.json")

PROMPT = f"""You are harmonizing causal-construct taxonomies for a paracetamol -> offspring ASD/ADHD study.

TRACK A (the reference framework, with bias-domain tags B1=familial/genetic, B2=indication/maternal-health,
B3=social-behavioural; non-core=mediator/collider/precision; added(env)=an environmental construct added later):
{chr(10).join('  - '+x for x in A)}

TRACK B was independently induced (blind to Track A) by THREE models, each eliciting variables under three
reasoning scaffolds (zero-shot / generic-CoT / framework-CoT) and then clustering. Use the gpt-5.5 list as the SPINE.
gpt-5.5 ({len(GPT)}):
{chr(10).join('  - '+x for x in GPT)}
DeepSeek ({len(DS)}):
{chr(10).join('  - '+x for x in DS)}
Gemini ({len(GEM)}):
{chr(10).join('  - '+x for x in GEM)}

TASK: produce a crosswalk. For EACH gpt-5.5 spine construct output an object:
  - name
  - dominant_role (confounder/mediator/collider/mixed)
  - track_a: the matching Track A construct's tag+name, or "NONE" if Track A has no equivalent
  - in_deepseek: true/false (does DeepSeek have a semantically-equivalent construct?)
  - in_gemini: true/false (same for Gemini)
  - type: one of
      "convergence"  (present in BOTH Track A and Track B, same role),
      "blind_spot"   (in Track B but absent from Track A),
      "split"        (this maps to a Track A construct that Track B divides into multiple),
      "role_conflict"(present in both but Track A and Track B assign different causal roles)
Then add "track_a_unrecovered": Track A constructs with NO gpt-5.5 equivalent (list their tag+name).

Output ONLY valid JSON:
{{"crosswalk":[{{"name":"...","dominant_role":"...","track_a":"...","in_deepseek":true,"in_gemini":true,"type":"..."}}],
 "track_a_unrecovered":["..."]}}"""

key = load_key("OPENAI_API_KEY")
print(f"Track A={len(A)} | gpt={len(GPT)} ds={len(DS)} gem={len(GEM)} | prompt chars={len(PROMPT)}")
d = call_openai(PROMPT, key)
ch = d["choices"][0]; content = ch["message"]["content"] or ""
try:
    parsed = json.loads(content); n = len(parsed.get("crosswalk", []))
except Exception as e:
    parsed = {"raw": content, "error": str(e)}; n = -1
json.dump({"prompt": PROMPT, "response": d, "parsed": parsed},
          open(os.path.join(os.path.dirname(HERE), "llm_outputs", "trackB_crosswalk_abc.json"), "w"), ensure_ascii=False, indent=2)
print(f"crosswalk rows={n} | finish={ch.get('finish_reason')} | -> trackB_crosswalk_abc.json")
