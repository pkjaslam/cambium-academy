# Course 03 v2 — BUILD SPEC (top-notch bar, tech decisions locked)

_2026-07-13. Pairs with CURRICULUM.md (v2, Fable's edit). This is the engineering contract for the rebuild session(s). The live v1 course stays untouched until v2 passes the full gauntlet; v2 lands complete or not at all._

## Design/tech adoptions (Director's leads, researched + decided)

1. **Vanta.js (github.com/tengbao/vanta) — ADOPTED, scoped.**
   - Where: index.html hero (TOPOLOGY or NET effect in brand colors moss #97BC62 on forest #10220E, low density), certificate.html backdrop (subtle FOG), playground.html header strip.
   - Rules: lazy-load AFTER content paint; desktop-only (matchMedia hover+pointer:fine); hard fallback to the current static gradient; respect prefers-reduced-motion; self-host vanta + three.min.js in web/lib/ (no CDN dependency); total page weight budget +130KB desktop-only. Mobile stays exactly as fast as today (CLAUDE.md accessibility/weight rule).
2. **MotionForge (github.com/codedbytahir/motionforge) — IDEAS ADOPTED into film.js v2, framework not imported.**
   - Our film pipeline is already deterministic render(t) (same philosophy, zero React toolchain). Port the three highest-value effects as film.js helpers: `FILM.kinetic()` (staggered velocity-based character animation), `FILM.reveal()` (noise-threshold image/text reveal), `FILM.count()` (eased numeric counters as a first-class helper).
   - Full MotionForge (React/Next/R3F) evaluated for Course 04+ media in its own session; not worth a toolchain swap mid-course.
3. **"videoali" → ali-vilab open video models — NOT adopted** (GPU-bound text-to-video; wrong instrument). Higgsfield remains the avatar pipeline (~6 credits left: budget 0-3 new Aira beats for v2's new modules; reuse the five existing beats at their module homes).

## Advanced AI features (v2 ships these, building on what exists)
- **Aira Classroom v2.1:** lesson contexts per v2 module; drill mode extended to quiz-miss coaching (reads cambium-c03-quiz best + wrong-topic tags written by quiz v2); "Build my stack" guided dialog in M10 that outputs the learner's one-page personal stack (localStorage + printable).
- **AI Lab: 5 games** (arcade rule): keep Citation Hunt / Lateral Race / Receipts-or-Vibes; NEW "Pick Your Instrument" (10 real tasks → 7 instrument classes, streak-scored) + NEW "Prompt Surgery" (rebuild a weak research prompt in 3 graded moves). Keys tok/lm/net + ins/ps; gate 5-of-5; update playground+quiz+progress+aira+slides nextStep TOGETHER.
- **Personal Stack builder (M10 capstone):** interactive page section; selections persist; print CSS; counts toward capstone checklist.
- Film v2 (post-web): full-length lecture with film.js v2 effects; existing 7:20 film = M4 featurette.

## File-by-file build plan (order matters)
1. `web/slides.html`: v2 S array (~75 slides, 10 modules), CHAPTERS, checkpoints.js (10 CPs), AIRA_LESSON v2. Facts ONLY from CURRICULUM fact base (re-verify "to verify" list first).
2. `web/transcript.html`: full v2 narration (~40 min read).
3. `web/flashcards.html` (24 rebalanced), `web/quiz.html` (20Q across 10 modules + wrong-topic tagging for classroom drills).
4. `web/playground.html`: 5 games.
5. `web/index.html`: v2 modules grid, Vanta hero, stack-builder teaser; capstone/career updated to v2 skills.
6. `web/aira-classroom.js` v2.1 + classroom.html contexts.
7. Deck (pptx/pdf) from v2 S array; social card refresh if needed.
8. Gauntlet: audit-course.sh + link check + gate logic tests + Vanta fallback test (JS disabled + mobile UA) + full repo truncation sweep. Then Director push.

## Quality bar (what "top notch" means, checkable)
- Every stat on a slide traces to the fact base; every "to verify" item re-searched at build time; no tool claim older than 60 days unverified.
- Every module: 1 eye-opener stat + 1 try-it + 1 failure-mode + 1 check. No module is a tool tour.
- Lighthouse mobile ≥ 90 on index (Vanta must not regress mobile); print CSS intact; keyboard nav on all 5 games.
- No em dashes anywhere. No Course-1/2 residue. Keys stay cambium-c03-*.

## Session plan
- This spec + curriculum are ready. The build itself = one focused fresh session (paste-starter below), so quality never degrades mid-build. Nothing in the live course changes until the gauntlet passes.
> **Starter:** Continue Cambium Academy. Read `CLAUDE.md`, `HANDOFF.md`, `courses/course-03-research-with-ai/CURRICULUM.md` and `BUILD_SPEC_V2.md`, then execute the v2 rebuild end-to-end per the spec.
