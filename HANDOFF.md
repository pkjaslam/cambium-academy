# HANDOFF — pick up here

_Last updated: 2026-07-13. Written so a fresh chat can continue with zero loss._

## Say this in the new chat
> Continue the Cambium Academy work. Read `CLAUDE.md`, `HANDOFF.md`, and `COURSE_PLAYBOOK.md`. Course 04 is built and passing all gates; it needs the Director's push. Then Course 05 (`courses/course-05-building-with-ai/KICKOFF.md`).

Project memory auto-loads the rest (Higgsfield pipeline, mount-truncation gotcha, AI-Lab game rule, per-course config rules). `CLAUDE.md` (repo root) is the Director's master instructions — read it first.

## Where the Academy stands
- **Course 01 — Intro to AI:** LIVE.
- **Course 02 — Prompting Essentials:** LIVE.
- **Course 03 — Research with AI (v2):** COMPLETE, film v3 live (https://youtu.be/vgZAYc14y4s). Awaiting the Director's push.
- **Course 04 — Responsible AI in Scholarly Publishing:** **WEB COURSE COMPLETE, built 2026-07-13. ALL THREE GATES PASS.** Awaiting the Director's push, then the lecture film.
- **Course 05 — Building with AI (agents):** briefed at `courses/course-05-building-with-ai/KICKOFF.md`. NOT STARTED. Do not start until 04 is pushed.

## Course 04 — done (2026-07-13 session)
Full web course in `courses/course-04-responsible-ai-publishing/web/`. Thesis, defended in every module: **the question is no longer whether AI was used.** Three chairs: author, reviewer, editor.

- **80 slides / 12 modules** + a "three chairs" narrative thread (12 thread slides, one per module) following one honest postdoc from author to reviewer to editorial board. 12 checkpoints, each verified to fire on its module's LAST slide.
- **24 flashcards**, **20-question quiz** (answer keys balanced 5/5/5/5, all 12 modules tagged for classroom drills).
- **AI Lab, SIX games** (keys `disc/line/ghost/flags/inject/trap`): Declare It (disclosure placement), Assist or Misconduct, **Ghost Citations (grades against the LIVE Crossref API from the browser)**, Red Flags (tap the real problems in a manuscript excerpt), The Poisoned Manuscript (find hidden white-micro-type prompt injection with select-all / text-layer tools), **The Detector Trap (the ONLY way to win is to refuse to accuse)**.
- **The Practical** (`practical.html`, honors exam, "The Editor's Desk"): 4 parts. A = 5 citations graded live against Crossref. B = find the hidden prompt + choose the COPE-correct response. C = separate real red flags from the detector score and the compliant disclosure. D = write the decision letter, graded by Aira, with a **deterministic guardrail: any letter that accuses the authors on the detector score AUTO-FAILS**, whatever the model thinks of the prose. Passing stamps **DESK-VERIFIED** on the certificate (both HTML + canvas renders).
- **The Screening Room** (`practice.html`): practice with known answers (repair a broken disclosure, grade a hollow vs. evidence-based review, triage 4 submissions).
- **The Author's Pack** (`pack.html`): live disclosure-statement BUILDER (venue x use-case -> correct statement in the correct section), pre-submission checklist, reviewer bright-line card, editor's evidence rack, ready statements, all policy links. Print CSS.
- Certificate CAMB-C04, chips **DISCLOSE / REVIEW / SCREEN / DECIDE WELL**, microprint motto "AI CAN HOLD THE PEN. IT CANNOT HOLD THE RESPONSIBILITY. YOU SIGN." Badge JSON, classroom, community, career, capstone (3 artifacts you would really sign), changelog, transcript (~45 min narration), 27 Aira voice clips (Neerja).
- Deck: `slides/Cambium-Academy-Course04-...pptx` + `.pdf` (80 pages, generated from the live S array).
- `assets/social-course04.png`; `/start/` Course 04 card LIVE + linked; LINKS.md block added; `resources.md` written (every policy + study, live-verified 2026-07-13).
- Configs byte-identical to Course 1. Every file dd-copied + cmp-verified.

## Course 04 — THE 10X LAYER (Director's call, same session)
The Director asked for a course "10x superior" to everything shipped so far, using the best free AI tooling. The answer was NOT more tools; it was making **the medium enact the thesis**. Three additions, all static, all no-signup, all verified in a real browser:

1. **`referee.html` — THE LOCAL REFEREE. This is the signature feature of the entire Academy so far.**
   The course's hardest rule (Module 8) is: *never put a confidential manuscript into a cloud AI.* Every AI feature we have ever shipped calls a cloud worker, which would make this course self-contradicting. So this page ships **no cloud AI at all**: it loads an open-weights LLM **into the student's browser** via **WebLLM 0.2.84 + WebGPU** and runs inference on their own GPU. The student can paste a manuscript they are genuinely reviewing.
   - **The airlock**: the page hooks `fetch`, `XMLHttpRequest` and `navigator.sendBeacon` and displays a live counter of every request made after the model loads. It stays at **0**. Verified in a headless browser: arm it, attempt a fetch, and the counter catches it and flips its verdict. Students are told to open DevTools, go offline, and watch it still work. Confidentiality is proved by architecture, not promised by a privacy policy.
   - **This page deliberately ships NO analytics beacon** (every other page has one). A page that promises zero network cannot phone home. We would rather lose the pageview than the point.
   - Honest touch: if the student opens cloud-Aira on this page, the counter WILL tick up, and the page says so up front. That contrast, on one screen, is the whole lesson in one number.
   - The referee's system prompt **forbids it from ever giving an AI-detection verdict** (asserted in the logic battery). It hunts bad science instead.
   - Degrades honestly without WebGPU (Chrome/Edge 113+, Safari 26+, Firefox on Win/Apple silicon; not Firefox Linux yet).
2. **`auditor.html` — THE REFERENCE AUDITOR.** The Lab teaches the 1-in-277 problem on a rigged list; this is the real instrument. Paste **your own** bibliography or BibTeX: it extracts every DOI, resolves each one **live against api.crossref.org**, and reports RESOLVED / PHANTOM / NO-DOI with an exportable report. Only the bare DOI string leaves the browser, never your text. Part 2 runs **@huggingface/transformers 4.2.0 (Transformers.js) in the browser** to measure whether a cited abstract actually supports your sentence (embeddings + cosine similarity), honestly labelled as a smoke alarm, not a judge.
3. **Flashcards upgraded to real spaced repetition** with **ts-fsrs 5.4.1** (the FSRS algorithm Anki uses). Four-button grading (Again/Hard/Good/Easy) with the true next interval shown under each button. **The course contract was preserved**: `cambium-c04-cards` still means "known" (so the quiz gate, progress bar, Aira and classroom are untouched), and a NEW `cambium-c04-fsrs` store holds the real schedule with due dates. Only Good/Easy mark a card known. Verified in-browser: real stability/difficulty state, real future due dates, and "Again" correctly does not mark a card known.

**Self-hosted in `web/lib/`** (no CDN dependency at runtime): `web-llm.js` (6.1 MB), `transformers.js`, `ts-fsrs.mjs`, `gsap.min.js`, `ScrollTrigger.min.js`. Model weights stay on Hugging Face (do NOT commit ~900 MB to the repo). **Verified: WebLLM and Transformers.js need NO COOP/COEP headers, so they work on plain GitHub Pages.**

Both new pages are wired into every nav, the index (two feature cards), Aira's page map (+2 voice clips, 29 total), and the lecture itself: Module 8 now points at the Referee, Module 6 at the Auditor.

## Course 04 verification: all three gates green
1. `bash tools/audit-course.sh course-04-responsible-ai-publishing C04` -> **AUDIT PASSED**.
2. `node tools/sweep-states.mjs c04 <fresh|midway|passed|honors>` -> **no findings, all four states** (68 page loads: 17 pages incl. referee + auditor). c01/c02/c03 also re-swept clean: no regression.
3. `bash tools/check-live.sh` -> **LIVE CHECKS PASSED**, including the two new C04 contracts.

**Plus a logic battery** (what static + DOM checks are blind to): the Part D detector-accusation guardrail actually fires on accusatory letters and does NOT fire on evidence-grounded ones; the Detector Trap has exactly one winning path per stage; quiz keys balanced; checkpoints fire at module ends; the hidden prompt is genuinely invisible (white-on-white, 4.5px) yet present in the text layer, in BOTH the game and the Practical.

## Tooling fixed this session (these were real bugs, they affect all courses)
- **`tools/sweep-states.mjs` was testing almost nothing.** It seeded `cambium-<k>-progress` and `cambium-<k>-lab-<g>` — **keys no course has ever read**. So "midway" and "honors" were effectively the fresh state. Now each course declares its own shape (slides/cards/lab keys) and the tool seeds the keys the courses actually read (`-slides`, `-cards`, `-playground`, `-quiz`, `-cert`, `-practical`, `-lecture`). It also no longer hardcodes the session path or the Chrome binary: use `ACADEMY_ROOT` and `CHROME_PATH` env vars.
- **`tools/check-live.sh` extended** with the C04 contracts: it now parses the DOI arrays out of `playground.html` and `practical.html` and asserts **every** one behaves as the game claims against the live registry (11 DOIs: reals resolve 200, fabrications 404), and asserts Aira grades a model-correct decision letter as passing.

## Next steps, in order
1. **Push:** Director runs `push_academy.bat` (sandbox has no GitHub creds). Then live-check: /start/ cards, the C04 course page, the share image, the quiz gate, Ghost Citations grading live, and The Practical.
2. **Course 04 lecture film** (parametric renderer, `production/filmv2/lib/film_slide.js` reads `slides_data.js`; ZERO-JOINT assembly: one continuous audio track, one video timeline). `index.html` carries a clearly-marked placeholder block until it premieres.
3. **Course 05 — Building with AI (agents):** brief is written and waiting.

## Sandbox facts for the next session (cost me time; do not relearn)
- **Chromium for the sweep:** the sandbox has no chrome. `curl` chrome-headless-shell from the chrome-for-testing CDN, then `apt-get download` the X libs (libxdamage1, libxfixes3, libxrandr2, libgbm1, libxkbcommon0, libnss3, libatk*, libcups2, libasound2 ...), `dpkg-deb -x` them into /tmp/libs, and export `LD_LIBRARY_PATH`. Launch flags: `--no-sandbox --disable-gpu --disable-dev-shm-usage`. Do NOT add `--single-process` (it crashes the page). Set `TMPDIR=/dev/shm`.
- **ESM ignores NODE_PATH.** Run the sweep from a dir where `node_modules` resolves (npm i playwright in /tmp), pointing at the repo via `ACADEMY_ROOT`.
- **The mount truncated a 8.4KB write mid-word** this session (sweep-states.mjs landed at 5,127 bytes, syntax error). Author in /tmp, `dd bs=4M`, `cmp`. Every single time. It is not superstition.
- Bash calls time out at 45s: run the 4 sweep states in pairs, not all at once.

## Hard-won gotchas (do not relearn these)
- **DIRECTOR'S STANDING RULE: features from earlier courses are ADDED TO or MODIFIED, never removed.** QR + cert ID + verify link + badge + LinkedIn + print CSS are inviolable certificate features. The certificate has TWO renders (on-page HTML + canvas download in drawCert) that must be edited in LOCKSTEP; the content box is fixed-height with overflow:hidden, so add decorations as absolutely-positioned elements.
- **Never let a search-and-replace run twice.** Assert `count == 1` on the anchor first. A chained chip rename (FIND->DISCLOSE, then DISCLOSE->DECIDE) double-applied and corrupted the certificate; caught only because the count assertion was there. Use a single-pass regex with a mapping.
- **The Aira worker slices EACH message to 2,400 chars.** Send lesson context and the request as SEPARATE messages.
- **RUNTIME/CONTENT CHANGE = SWEEP ALL DOWNSTREAM ARTIFACTS.** Slide count change -> checkpoints, quiz/progress/aira/classroom/playground gates, index copy, transcript. Lab game change -> playground + quiz + progress + aira + classroom + slides nextStep TOGETHER.
- **Quiz answer keys drift skewed** (C02 shipped 11 of 20 "C"). Check the spread; no letter should approach the pass mark. C04 ships 5/5/5/5.
- **Count your quiz questions.** C04 was authored with 21 while the UI said "20 questions, 14 to pass" — caught by the logic battery, not by the audit or the DOM sweep. Cut to 20, keys rebalanced.
- `support.js` is a GENERATED shared runtime, byte-identical across all courses. It contains em dashes in its code comments. That is vendor code, not course prose: leave it alone (touching it breaks byte-parity with C01).
- Never let earlier-course content leak forward. The audit's residue check is slug-aware.
- Every AI Lab must feel like a **game** (scores, streaks, timers, stamps, confetti). C04's Lab is an arcade with 6 cabinets, a quiz-credit meter, and a lobby.
