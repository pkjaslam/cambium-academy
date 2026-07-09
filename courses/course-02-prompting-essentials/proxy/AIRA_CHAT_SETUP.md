# Aira live chat setup (Google Gemini + Cloudflare Worker, ~15 minutes, $0)

Aira's live chat lets learners talk to her directly on the course site. The architecture
keeps your API key safe:

```
Learner's browser  ->  Cloudflare Worker (holds the key as a secret)  ->  Gemini API
```

The course site is public on GitHub Pages, so the key can NEVER appear in any file in this
repo. Anyone can read a public site's source. The worker is the locked box.

## Why Gemini, not MindRouter

MindRouter (mindrouter.uidaho.edu) is a University of Idaho research cluster, and its API
only accepts requests from the campus network or VPN. A public website's server (Cloudflare,
or any host) is not on campus, so it can never authenticate — the request comes back as a
Cloudflare `523` "origin unreachable". Confirmed 2026-07-09. So Aira uses a public free API
instead. Google Gemini's free tier needs no credit card and gives ~1,500 requests/day, which
is plenty for a launching course; it is OpenAI-compatible, so the worker is a thin proxy.

## Get a Gemini API key (2 minutes, free, no card)

1. Go to https://aistudio.google.com and sign in with a Google account.
2. Click **Get API key**, then **Create API key**.
3. Copy the key (it starts with `AIza...`). Paste it ONLY into the Cloudflare secret below.

Privacy note: on Gemini's FREE tier, prompts may be used to improve Google's products. The
chat carries a small "don't share personal information" note for learners. Fine for course
questions; do not send anything sensitive.

## Deploy the worker (one time)

1. Create a free account at dash.cloudflare.com (no domain needed).
2. Workers & Pages, Create, Create Worker. Name it `aira-chat`. Deploy the hello-world.
3. Click "Edit code", replace everything with the contents of `aira-worker.js` (next to
   this file), then Deploy.
4. Worker Settings, Variables and Secrets, add:
   - `MR_API_KEY` (type: Secret) = your Gemini API key (the `AIza...` value)
   - `ALLOW_ORIGIN` (type: Text) = `https://pkjaslam.github.io`  (optional; this is the default)
   - `LLM_MODEL` (type: Text, optional) = `gemini-2.5-flash`  (the default; change only to switch model)
5. Copy the worker URL, e.g. `https://aira-chat.YOURNAME.workers.dev`.

The secret is still named `MR_API_KEY` so an existing worker keeps working after the switch;
it just holds the Gemini key now.

## Point the site at it

1. Open `web/aira-chat-config.js` and set:
   `endpoint: "https://aira-chat.YOURNAME.workers.dev"`
2. Push and redeploy Pages. Done. Aira's "Ask me anything" now answers in the widget
   on every page, in her own bubble, with her voice.

While the endpoint is empty, nothing is broken: Aira falls back to the community page
flow (opening the question in a free chatbot).

## Built-in protections

The worker only accepts POSTs from your site's origin, clamps conversations to the last
6 short messages, caps answers at 500 tokens, enforces a best-effort 8 requests/minute
per visitor IP, keeps Aira's system prompt server-side, and never exposes the key to the
browser. If Gemini's daily free limit is reached, learners see a polite "very popular right
now" note and the community page still works. If the course grows, rais