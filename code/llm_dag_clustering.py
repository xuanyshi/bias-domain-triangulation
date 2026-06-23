#!/usr/bin/env python3
"""Track B - Stage 1: BLIND taxonomy induction over the pooled variables.
Induces a construct skeleton (names + defs + role + example members), NOT full assignment.
Independence: the Track A taxonomy / B1-B2-B3 labels are NEVER shown.

Usage: python3 code/llm_dag_clustering.py deepseek   |   python3 code/llm_dag_clustering.py openai
"""
import os, sys, json, time, urllib.request
from llm_dag_induction import load_key, call_deepseek
from llm_dag_induction_openai import call_openai

def call_gemini(prompt, key, maxtok=32000):
    body = json.dumps({
        "model": "gemini-3.1-pro-preview",
        "max_tokens": maxtok,
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

HERE = os.path.dirname(os.path.abspath(__file__))
POOL = os.path.join(os.path.dirname(HERE), "data", "trackB_pooled_variables.json")

INSTRUCTION = """You are a causal epidemiologist building a taxonomy from scratch.

Background causal question (context only - do not answer it):
  Exposure = taking paracetamol (acetaminophen) during pregnancy
  Outcome  = offspring autism spectrum disorder (ASD) and/or attention-deficit/hyperactivity
             disorder (ADHD), diagnosed in childhood

You are given a long list of candidate third-party variables that multiple experts independently
proposed for this exposure-outcome question. Each variable carries a causal role (confounder /
mediator / collider) and a temporal position relative to the exposure and the outcome.

TASK
Inductively derive a parsimonious set of higher-level CONSTRUCTS, purely from these variables.
A CONSTRUCT is one latent causal factor that several specific measured variables are proxies or
instances of (for example, many specific infections, fevers and inflammatory markers all
instantiate a single underlying maternal-infection construct).

INDEPENDENCE - STRICT
- Build the taxonomy ONLY from the variables given.
- Do NOT use, name, or map onto any pre-existing or standard classification scheme, framework, or
  domain labels. Let the structure emerge from the data alone.
- Do not invent variables that are not in the list.

GRANULARITY
- Mid-level constructs, each a distinct causal mechanism or common cause.
- Merge near-synonyms and wording/spelling variants AGGRESSIVELY (e.g. "maternal education level",
  "maternal educational attainment" and "maternal education" are ONE construct member set).
- Split only when two groups are genuinely causally distinct.
- Such taxonomies typically have on the order of 15-40 constructs; choose whatever best fits.

COVERAGE
- Cluster ALL variables regardless of role. Mediators, colliders, and selection / ascertainment
  variables MUST form their own constructs too (do not drop them).

OUTPUT - for each construct give:
  id; name (your own wording); one-sentence causal definition; dominant_role (confounder /
  mediator / collider / mixed); typical_timing (pre_exposure / post_exposure_pre_outcome /
  post_outcome / mixed); example_members = 5-8 representative variable names copied verbatim from
  the input (representative examples only, NOT the full membership).

Output ONLY valid JSON (no prose, no markdown):
{
  "constructs": [
    {"id":"C1","name":"...","definition":"...","dominant_role":"...","typical_timing":"...",
     "example_members":["...","..."]}
  ],
  "optional_super_groups": [ {"name":"...","construct_ids":["C1","C4"]} ]
}

INPUT VARIABLES (name | role | timing):
"""

def build_prompt():
    pool = json.load(open(POOL))
    lines = [f"{x['name']} | {x['role']} | {x['timing']}" for x in pool]
    return INSTRUCTION + "\n".join(lines)

def main():
    which = (sys.argv[1] if len(sys.argv) > 1 else "deepseek").lower()
    prompt = build_prompt()
    pool_n = len(json.load(open(POOL)))
    print(f"model={which}  | input vars={pool_n}  | prompt chars={len(prompt)}")
    if which == "deepseek":
        key = load_key("DEEPSEEK_API_KEY"); d = call_deepseek(prompt, key); model = "deepseek-v4-pro"
    elif which == "gemini":
        key = load_key("GEMINI_API_KEY");   d = call_gemini(prompt, key);   model = "gemini-3.1-pro-preview"
    else:
        key = load_key("OPENAI_API_KEY");   d = call_openai(prompt, key);   model = "gpt-5.5"
    ch = d["choices"][0]; content = ch["message"]["content"] or ""; fin = ch.get("finish_reason")
    u = d.get("usage", {})
    try:
        tax = json.loads(content); n = len(tax.get("constructs", []))
    except Exception as e:
        n = -1; tax = {"raw": content, "error": str(e)}
    out = os.path.join(os.path.dirname(HERE), "llm_outputs", f"trackB_taxonomy_{model}.json")
    json.dump({"model": model, "prompt": prompt, "response": d, "parsed": tax},
              open(out, "w"), ensure_ascii=False, indent=2)
    print(f"constructs induced: {n} | finish={fin} | "
          f"tokens in={u.get('prompt_tokens')} out={u.get('completion_tokens')} | -> {os.path.basename(out)}")

if __name__ == "__main__":
    main()
