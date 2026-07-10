# Cambium Academy — Course Launch Playbook

How to build and ship every new course the same way as Course 1, top to bottom, missing nothing. Pair this with `tools/audit-course.sh`, the pre-launch gauntlet you run before every push.

## The two rules

1. **Course N is Course 1's structure with new content.** Copy the template, swap the content. Never hand-build a course from scratch, and never let Course 1's words survive into Course N.
2. **Every course ships one new AI feature that tops the last.** Course 1 was the in-browser AI labs (tokens, next-word predictor, live training). Course 2 was two real AI talking-head avatar beats in a cinematic film, plus a "see the AI's real reply" lab. Course 3 picks the next step up (options at the end).

## Step 1 — Research first, dated and sourced

Scout the current landscape for the topic; verify every free resource and external link by hand. Every fact is a dated snapshot with a source. No stale advice ever ships.

## Step 2 — Content (Fable authors)

Six modules, one idea per slide, plain English. A 20-question quiz (pass at 14 of 20). 24 flashcards. Three AI-lab games. Write the capstone and career criteria for THIS course's skills. This is exactly where Course 2 accidentally kept Course 1's "choose the right model" and "four moves" language; do not.

## Step 3 — Web build (copy the Course 1 template)

Copy the whole `web/` file set (12 HTML pages plus the shared JS). Then swap, per course:

- Titles, module content, quiz questions, flashcards, and the three playground games.
- `capstone.html` and `career.html` criteria rewritten to this course's skills.
- Certificate ID prefix `CAMB-C0N-` in `certificate.html`; `verify.html` link points to this course.
- Every localStorage key becomes `cambium-c0N-*`.
- `og:image` points to `social-courseNN.png`; `community-config.js` giscus categories become `course-0N-*`.
- **The two live-endpoint configs, `registry-config.js` and `aira-chat-config.js`: copy Course 1's VERBATIM (same endpoints), then immediately confirm each is valid JS and byte-identical to Course 1's.** The sandbox mount silently truncated both of these when Course 2 was first built, which quietly killed the learner registry and Aira's live chat with no visible error. This is the number-one thing that breaks without a trace.
- Set the registry course tag in `cert-extras.js`: `course: "C0N"`, so each row lands in the sheet's course column.

## Step 4 — Media

Deck (pptx and pdf), narrated lecture video in Aira's voice, SRT captions, and a `transcript.html`. Optionally the cinematic film. Then build the course's one new AI feature.

## Step 5 — Ship and activate

- Build `social-courseNN.png` (PIL, `outputs/mk_social.py`) and point `og:image` at it, so shares do not all look like Course 1.
- Add or flip the `/start/` catalog card to LIVE and link it, matching Course 01's card exactly.
- Upload the video unlisted for review, set it Public on activate, and regenerate the YouTube chapters.
- Copy a course block into `LINKS.md`.
- Keep `courses/**/production/` gitignored; GitHub rejects any file over 100 MB (the film master and re-stitch kit are far bigger).
- Run `push_academy.bat` on your machine. The sandbox has no GitHub credentials, so the push is always yours.

## Step 6 — Pre-launch gauntlet (run every time)

```
bash tools/audit-course.sh course-0N-<slug> C0N
```

It checks: file parity against Course 1, that every JS file parses (the truncation catcher), both config endpoints present and terminated, no Course-1 residue, keys scoped to c0N, certId and verify and registry-tag and og all correct, the deck present, and every page closed. After the push, do a live check: the `/start/` card, the course page, the share image resolving, and the video playing. (Run the audit in a fresh session, or trust the editor for the page-close check; the sandbox mount can serve a stale tail right after edits.)

## The recurring gotchas, all seen and all real

- Truncated config files silently kill the registry and Aira chat. Always `node --check` plus byte-parity.
- Copy-paste content leftovers: Course 1's capstone and career criteria surfaced inside Course 2. Rewrite for the course.
- `og:image` left as the generic "Intro to AI" card makes every share look like Course 1. Give each course its own card.
- The `/start/` front door drifts Course-1-centric. Keep it academy-level, with a "browse the courses" primary action, not a hard route into Course 1.
- Large video files sneak into git. Gitignore `production/`.
- The mount can silently truncate large writes and serve stale reads. Author big files in the sandbox, copy them over, and verify byte-parity.

## Course 3 — the next new AI feature (decide at Step 2)

Topic: Research with AI. Candidate signature features, each a genuine step up, all runnable on the existing Aira Cloudflare worker so no new cost:

- A live in-page research assistant: ask a question, watch it answer with real sources.
- An "AI grades your capstone" widget: paste your write-up, get rubric feedback.
- A retrieval demo: drop in a document, watch the AI answer only from it (open-book versus guessing).
- A voice conversation with Aira.

Pick one before the content is written so the whole course builds toward it.
