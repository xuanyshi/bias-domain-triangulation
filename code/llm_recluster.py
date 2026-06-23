#!/usr/bin/env python3
"""Re-cluster the A/B/C-only pooled variables (3 models eliciting) into taxonomies.
Clean re-run excluding scaffolds D/E. NON-DESTRUCTIVE: new pool/taxonomy filenames.
Output: trackB_taxonomy_abc_<model>.json
"""
import os, json
from llm_dag_clustering import INSTRUCTION, call_gemini, call_deepseek
from llm_dag_induction_openai import call_openai
from llm_dag_induction import load_key

HERE = os.path.dirname(os.path.abspath(__file__))
POOL = os.path.join(os.path.dirname(HERE), "data", "trackB_pooled_variables.json")

def build_prompt():
    pool = json.load(open(POOL))
    return INSTRUCTION + "\n".join(f"{x['name']} | {x['role']} | {x['timing']}" for x in pool)

MODELS = {
 "deepseek-v4-pro":     ("DEEPSEEK_API_KEY", call_deepseek),
 "gemini-3.1-pro-preview": ("GEMINI_API_KEY", call_gemini),
 "gpt-5.5":             ("OPENAI_API_KEY", call_openai),
}

def main():
    prompt = build_prompt()
    pool_n = len(json.load(open(POOL)))
    print(f"pool={pool_n} vars | prompt chars={len(prompt)}")
    for model, (keyname, fn) in MODELS.items():
        key = load_key(keyname)
        try:
            d = fn(prompt, key)
            ch = d["choices"][0]; content = ch["message"]["content"] or ""
            try: tax = json.loads(content); n = len(tax.get("constructs", []))
            except Exception as e: tax = {"raw": content, "error": str(e)}; n = -1
            out = os.path.join(os.path.dirname(HERE), "llm_outputs", f"trackB_taxonomy_abc_{model}.json")
            json.dump({"model": model, "prompt": prompt, "response": d, "parsed": tax},
                      open(out, "w"), ensure_ascii=False, indent=2)
            print(f"  {model}: {n} constructs  finish={ch.get('finish_reason')}  {d.get('_elapsed_s')}s")
        except Exception as e:
            print(f"  {model}: ERROR {type(e).__name__} {e}")
    print("DONE.")

if __name__ == "__main__":
    main()
