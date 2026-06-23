#!/usr/bin/env python3
"""OpenAI runner for the v2 prompt set. Reuses the prompts from run_llm_dag_v2.py.
Key from ~/.llm_dag_keys.env. Usage: python3 code/llm_dag_induction_openai.py A   (or: A B C D E / all)"""
import os, sys, json, time, urllib.request
from llm_dag_induction import build_prompt, load_key, OUTCOMES

HERE    = os.path.dirname(os.path.abspath(__file__))
MODEL   = "gpt-5.5"
MAXTOK  = 32000            # max_completion_tokens (incl. reasoning)
EFFORT  = "medium"        # reasoning_effort
PRICE   = (5.0, 30.0)      # (input, output) USD per 1M tokens, gpt-5.5 standard

def call_openai(prompt, key):
    body = json.dumps({
        "model": MODEL,
        "max_completion_tokens": MAXTOK,
        "reasoning_effort": EFFORT,
        "response_format": {"type": "json_object"},
        "messages": [{"role": "user", "content": prompt}],
    }).encode()
    req = urllib.request.Request(
        "https://api.openai.com/v1/chat/completions", data=body,
        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"})
    t0 = time.time()
    with urllib.request.urlopen(req, timeout=600) as r:
        d = json.load(r)
    d["_elapsed_s"] = round(time.time() - t0, 1)
    return d

def main():
    args = [a.upper() for a in sys.argv[1:]] or ["A"]
    outcome = "ASD"
    if args and args[0] in OUTCOMES:
        outcome = args.pop(0)
    if args == ["ALL"] or not args:
        args = ["A", "B", "C", "D", "E"]
    OUTDIR = os.path.join(HERE, "runs_v2_openai" + ("" if outcome == "ASD" else "_" + outcome.lower()))
    key = load_key("OPENAI_API_KEY")
    assert key, "OPENAI_API_KEY not set"
    os.makedirs(OUTDIR, exist_ok=True)
    print(f"outcome={outcome}  ->  {OUTDIR}")
    tin = tout = treason = 0
    print(f"{'var':>3} | {'in':>6} | {'out':>6} | {'reason':>6} | {'vars':>5} | {'fin':>6} | {'sec':>5}")
    print("-"*58)
    for v in args:
        prompt = build_prompt(v, outcome)
        d = call_openai(prompt, key)
        ch = d["choices"][0]
        content = ch["message"]["content"] or ""
        fin = ch.get("finish_reason")
        u = d.get("usage", {})
        pin = u.get("prompt_tokens", 0); pout = u.get("completion_tokens", 0)
        rt = u.get("completion_tokens_details", {}).get("reasoning_tokens", 0)
        try:
            nvars = len(json.loads(content).get("variables", []))
        except Exception:
            nvars = -1
        tin += pin; tout += pout; treason += rt
        with open(os.path.join(OUTDIR, f"v2_{MODEL}_{v}.json"), "w") as f:
            json.dump({"variant": v, "prompt": prompt, "response": d}, f, ensure_ascii=False, indent=2)
        print(f"{v:>3} | {pin:>6} | {pout:>6} | {rt:>6} | {nvars:>5} | {str(fin):>6} | {d['_elapsed_s']:>5}")
    print("-"*58)
    cost = tin/1e6*PRICE[0] + tout/1e6*PRICE[1]
    print(f"TOT | {tin:>6} | {tout:>6} | {treason:>6}")
    print(f"\n== {MODEL} 实测 ==  输入 {tin}  输出 {tout}  | 费用 ${cost:.4f} ≈ ¥{cost*7.2:.3f}")
    print(f"saved to {OUTDIR}/")

if __name__ == "__main__":
    main()
