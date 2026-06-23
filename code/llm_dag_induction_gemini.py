#!/usr/bin/env python3
"""
Gemini v2 elicitation runner — fills the gap where v2 variable elicitation was only run on
gpt-5.5 and deepseek. Reuses the EXACT v2 prompt assembly (build_prompt, 5 scaffolds A-E) from
run_llm_dag_v2, temperature 0, so gemini is run under the same clean v2 protocol as the other two.
Output: runs_v2_gemini/ (ASD) and runs_v2_gemini_adhd/ (ADHD), files v2_gemini-3.1-pro-preview_<V>.json
with {variant, prompt, response} (response = OpenAI-shaped Gemini reply).
NON-DESTRUCTIVE: new files/folders only.
"""
import os, sys, json, time, urllib.request, urllib.error
from llm_dag_induction import load_key, build_prompt, OUTCOMES

HERE  = os.path.dirname(os.path.abspath(__file__))
MODEL = "gemini-3.1-pro-preview"
MAXTOK = 32000
TEMP = 0

def call_gemini(prompt, key, maxtok=MAXTOK):
    body = json.dumps({
        "model": MODEL, "temperature": TEMP, "max_tokens": maxtok,
        "response_format": {"type": "json_object"},
        "messages": [{"role": "user", "content": prompt}],
    }).encode()
    req = urllib.request.Request(
        "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
        data=body, headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"})
    t0 = time.time()
    with urllib.request.urlopen(req, timeout=600) as r:
        d = json.load(r)
    d["_elapsed_s"] = round(time.time() - t0, 1)
    return d

def nvars(d):
    try:
        c = d["choices"][0]["message"]["content"]
        import re
        c = re.sub(r"^```(json)?|```$", "", c.strip(), flags=re.I).strip()
        return len(json.loads(c).get("variables", []))
    except Exception:
        return -1

def main():
    key = load_key("GEMINI_API_KEY")
    assert key, "GEMINI_API_KEY not set"
    variants = ["A", "B", "C", "D", "E"]
    for outcome in ["ASD", "ADHD"]:
        outdir = os.path.join(HERE, "runs_v2_gemini" + ("" if outcome == "ASD" else "_" + outcome.lower()))
        os.makedirs(outdir, exist_ok=True)
        print(f"\n=== outcome={outcome} -> {outdir} ===")
        for v in variants:
            prompt = build_prompt(v, outcome)
            try:
                d = call_gemini(prompt, key)
                n = nvars(d)
                fin = d.get("choices", [{}])[0].get("finish_reason")
                json.dump({"variant": v, "prompt": prompt, "response": d},
                          open(os.path.join(outdir, f"v2_{MODEL}_{v}.json"), "w"),
                          ensure_ascii=False, indent=2)
                print(f"  {outcome} {v}: vars={n} finish={fin} {d.get('_elapsed_s')}s")
            except urllib.error.HTTPError as e:
                print(f"  {outcome} {v}: HTTPError {e.code} {e.read()[:200]}")
            except Exception as e:
                print(f"  {outcome} {v}: ERROR {type(e).__name__} {e}")
    print("\nDONE.")

if __name__ == "__main__":
    main()
