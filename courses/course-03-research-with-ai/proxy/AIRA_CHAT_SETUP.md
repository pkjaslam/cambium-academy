# Aira chat worker v2 — multi-provider fallback (5-minute upgrade)

The v1 worker ran on Gemini's free tier alone (~1,500 requests/day) and hit a daily wall.
v2 keeps the same public endpoint and the same request/response contract, but falls
through a chain of free providers, so Aira effectively never goes dark:

Gemini → Groq 70B → Groq 8B → Workers AI (keyless, on Cloudflare itself) → GitHub Models → Cohere → NVIDIA

Any provider without a key is skipped. Only when EVERY configured provider fails do
students see the honest "at capacity" message.

## Deploy (Cloudflare dashboard, no terminal needed)

1. dash.cloudflare.com → Workers & Pages → open the existing worker **aira-chat**
   (endpoint `https://aira-chat.pkjaslamagrico.workers.dev` — keep the name so no
   course config changes).
2. Edit code → replace everything with `aira-worker.js` from this folder → Deploy.
3. Settings → Bindings → **Add binding → Workers AI**, name it exactly `AI`, save.
   This rung needs no key at all: ~10,000 free neurons/day (~200-400 answers) served by
   Cloudflare itself, and it makes Aira survivable even with zero external keys.
4. Settings → Variables and secrets → add these **secrets** (add the ones you have;
   each one you add is another day's worth of free quota):
   - `GEMINI_API_KEY` — you already have this as `MR_API_KEY`; v2 honors the old name,
     so you can leave it as-is.
   - `GROQ_API_KEY` — free at console.groq.com/keys, no card. One key powers two rungs:
     llama-3.3-70b (~1,000 req/day, high quality) then llama-3.1-8b-instant
     (~14,400 req/day, the volume workhorse). This single key is the biggest upgrade.
   - `GH_MODELS_TOKEN` — a fine-grained GitHub personal access token; enable
     "GitHub Models" read access, no repo permissions needed.
   - `COHERE_API_KEY` — free trial key at dashboard.cohere.com/api-keys.
   - `NVIDIA_API_KEY` — free credits at build.nvidia.com.
5. Optional plain variables: `ALLOW_ORIGIN` (default https://pkjaslam.github.io),
   and per-provider model overrides `GEMINI_MODEL`, `GROQ_MODEL`, `GH_MODEL`,
   `GROQ_MODEL_HIVOL`, `CF_MODEL`, `COHERE_MODEL`, `NVIDIA_MODEL`.

## Test it

```
curl -s -X POST https://aira-chat.pkjaslamagrico.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Say hi in five words."}]}'
```

Expect `{"reply":"...","provider":"gemini"}`. To watch the fallback work, temporarily
remove the Gemini secret and send the same request: `provider` should become `groq`.

## Notes

- Model defaults (July 2026): gemini-2.5-flash, llama-3.3-70b-versatile + llama-3.1-8b-instant
  (Groq), @cf/meta/llama-3.1-8b-instruct (Workers AI), openai/gpt-4o-mini (GitHub Models),
  command-r7b-12-2024 (Cohere compatibility API), meta/llama-3.1-8b-instruct (NVIDIA).
  Swap via variables if a provider renames a model.
- Capacity math (verified July 2026): Gemini free tier has shrunk (~250/day and falling), but
  Groq 70B ~1,000 + Groq 8B ~14,400 + Workers AI ~200-400 ≈ 15,000+ answers/day before
  GitHub/Cohere/NVIDIA are ever touched — and the Course 3 classroom cache answers repeat
  questions for free on top. Sources: developers.cloudflare.com/workers-ai/platform/pricing,
  console.groq.com/docs/rate-limits, ai.google.dev/gemini-api/docs/rate-limits.
- The per-IP rate limit (8/min) and CORS behavior are unchanged from v1.
- The system prompt is now academy-wide (v1's was Course-01-specific); every course
  page already sends its own course + lesson context with each request, and Course 3's
  classroom also sends a progress snapshot for personalized coaching.
- Keys live ONLY as worker secrets. Never in git, never in a course page.
