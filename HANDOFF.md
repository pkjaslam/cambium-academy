# HANDOFF — pick up here

_Last updated: 2026-07-12. Written so a fresh chat can continue with zero loss._

## Say this in the new chat
> Continue the Cambium Academy work. Read `CLAUDE.md`, `HANDOFF.md`, and `COURSE_PLAYBOOK.md`, then assemble the Course 3 lecture film and activate.

Project memory auto-loads the rest (Higgsfield pipeline, mount-truncation gotcha, AI-Lab game rule, per-course config rules). `CLAUDE.md` (repo root) is the Director's master instructions — read it first.

## Where the Academy stands
- **Course 01 — Intro to AI:** LIVE.
- **Course 02 — Prompting Essentials:** LIVE. (2026-07-12: repaired truncated tails of `capstone.html` + `career.html` — the mount had cut both mid-beacon during the 07-10 session.)
- **Course 03 — Research with AI:** WEB COURSE COMPLETE, built 2026-07-12, audit PASSED. Awaiting the Director's push, then the lecture film.

## Course 3 — done (2026-07-12 session)
- Full web course in `courses/course-03-research-with-ai/web/`: index (video placeholder until film premieres), 40 slides + module checkpoints, transcript (~22 min narration, 3,312 words), 24 flashcards, 20-question quiz, AI Lab as 3 games (Citation Hunt / Lateral Race / Receipts or Vibes; station keys tok/lm/net preserved), capstone (research protocol + rubric), career guide, certificate CAMB-C03 (chips FIND/VERIFY/CITE WELL), badges JSON, community, AI Classroom wired on slides.html + classroom.html.
- Deck: `slides/Cambium-Academy-Course03-Research-with-AI.pptx` + `.pdf` (40 slides, generated from the live S array).
- `assets/social-course03.png` (matches the card set), og:image points at it.
- `/start/` Course 03 card flipped to LIVE + linked; `LINKS.md` Course 03 block added; `resources.md` created (all links live-verified 07-12; NOTE: newsliteracy.org is a parked domain now, we use newslit.org; checkplease.cc is dead, replaced with Caulfield's open textbook).
- `tools/audit-course.sh` made course-aware (residue exclusion `$SLUG`, C1 tripwire narrowed to "four prompt move" so SIFT's "four moves" doesn't false-positive).
- Configs byte-identical to Course 1. Every file dd-copied + cmp-verified. Full audit: PASSED.
- Staged classroom fixes (code-drawn diagram, at-capacity message) are included in the shipped `aira-classroom.js`.
- **AI Classroom v2 (2026-07-12, same session):** student-aware (reads slides/cards/misses/labs/quiz/cert from localStorage; personalized greeting, computed next-step, "Drill what I keep missing" chip fed by new `cambium-c03-cardmiss` tracking in flashcards.html), richer code-drawn visuals (Aira picks flow / concept map / comparison table / before-after via a JSON contract, safe fallbacks), spoken replies (browser speechSynthesis, per-reply button + persisted header toggle, honestly labeled), cross-page chat memory + 40-entry answer cache with 7-day TTL in `cambium-c03-classroom` (stretches the free quota). 30 automated checks pass; audit re-run PASSED.
- **Multi-provider worker v2 WRITTEN, NOT DEPLOYED:** `courses/course-03-research-with-ai/proxy/aira-worker.js` + `AIRA_CHAT_SETUP.md` (Gemini → Groq → GitHub Models → Cohere → NVIDIA, same endpoint + contract, old MR_API_KEY honored). Director pastes into the Cloudflare dashboard and adds whichever secrets exist. This closes the deferred fallback-router item.

## Next steps, in order
1. **Push:** Director runs `push_academy.bat` (sandbox has no GitHub creds). Then live-check: /start/ card, course page, share image resolves, quiz gate, classroom answers + personalized greeting.
2. **Deploy worker v2:** paste `proxy/aira-worker.js` into the aira-chat worker in the Cloudflare dashboard, add secrets (see `proxy/AIRA_CHAT_SETUP.md`), curl-test the fallback.
3. **Assemble the lecture film** from `production/beats/` (5 Aira beats: welcome, lateral, fakecitation, deepresearch, closing) + slide visuals + B-roll, like Course 2's film. Transcript timings re-sync after. Upload unlisted → review → public; regenerate YouTube chapters; swap the index.html placeholder for the embed (the placeholder block is clearly marked in the video section).
4. **After film:** update LINKS.md video line, social post, and the `cambium-c03-lecture` flow stays as-is (button already counts).

## Hard-won gotchas (do not relearn these)
- **The D: mount silently truncates writes.** Author big in /tmp, dd bs=4M to repo, then cmp. It truncated two C02 pages last session; found + repaired this session.
- **/tmp files can persist across sessions read-only (owner nobody).** Never reuse old /tmp filenames; a stale root-owned file once nearly overwrote a repo tool. Use unique names, verify content before dd.
- **Aira's worker is on Gemini's free tier (~1,500 req/day)** and hits a daily cap; multi-provider fallback router (Gemini → Groq → GitHub Models → Cohere → NVIDIA) is deferred; the Director asked to be reminded.
- **Higgsfield credits nearly gone (~6 left),** trial ending, auto-renew cancelled. The 5 Course-3 beats are already rendered locally, so film assembly costs nothing.
- Every AI Lab must feel like a **game** (this one does: scores, streaks, timers, stamps, confetti).
- Never let earlier-course content leak forward. The audit's residue check is now slug-aware.
