# C05 build state · 2026-07-14 (Foundry session)

## DONE and verified
- `C05_BLUEPRINT.md` approved by the Director (GO, solo/Fable mode, all access).
- `web/` scaffolded. Configs (registry, aira-chat, community) dd-copied from Course 1, cmp byte-identical. `web/lib/`: ts-fsrs.mjs, gsap.min.js, ScrollTrigger.min.js, web-llm.js harvested from C04, cmp-verified.
- **`web/foundry.html` COMPLETE and battle-tested.** The course's signature feature: five-slot agent assembly (goal, brain, tools, memory, stop rules), a real agent loop with a live flight-recorder trace, 9 tools each scoped Off/Ask/Allow (calc, notes, wiki, weather, crossref, openalex, readpage, ics draft, email DRAFT-only), permission modal, presets (Naive, Scoped, Faculty Quiz Smith, Admin Monday Brief, Researcher Literature Scout), recipe JSON export/import, WebLLM local brain option (WebGPU-gated, C04 pattern), the Injection Drill with recorded runs, honest footer. Logic battery ALL GREEN in headless Chrome: page loads clean (no console errors), calc guard refuses non-arithmetic, NAIVE drill obeys the poisoned page (email exfil attempt rendered as a red DRAFT ONLY card, final answer hides the deed, banner lose), SCOPED drill stops at the permission modal and DENY works (banner win), recipe export parses, crossref and openalex verified LIVE from the page. Screenshots: `shot_top.jpg`, `shot_drill.jpg` beside this file.

## Hard-won integration facts (do not rediscover)
- **Aira worker as an agent brain WORKS**, but only if the LAST user message ends with "Reply ONLY the JSON object, nothing else." The server-side Aira persona otherwise swallows the protocol. The loop also gives one corrective retry per step, then stops honestly. Verified by curl: perfect {"thought","action"} JSON with provider gemini.
- **Worker CORS is pinned to origin https://pkjaslam.github.io** (OPTIONS 204, allow-origin exactly that). So the cloud brain cannot be exercised from file:// pages in the sandbox; it will work on the live site exactly like practical.html does. Sweeps must use the Recorded brain (by design, deterministic). Add a check-live.sh C05 contract that curls the worker with the 5-message protocol array and asserts the reply parses as protocol JSON.
- CORS-open free APIs verified: api.crossref.org, api.openalex.org, en.wikipedia.org (origin=*), api.open-meteo.com. arXiv export API has NO CORS, dropped for OpenAlex.
- Sandbox env recipe: chrome-headless-shell at /tmp/chrome-headless-shell-linux64 (@puppeteer/browsers install), X libs via apt-get download + dpkg-deb -x to a lib dir + LD_LIBRARY_PATH, npm needs HOME=/tmp and --cache /tmp/npmcache (/sessions disk is FULL, 0 bytes free; playwright also needs TMPDIR=/tmp/pwtmp), playwright-core + symlink as playwright.

## REMAINING (build order)
1. index.html (course home; film placeholder block like C04 had; Foundry + Workshop feature cards).
2. slides.html ~70 slides / 10 modules per KICKOFF + Riverbend thread + transcript.html (film timing source).
3. flashcards (24, ts-fsrs like C04), quiz (20, balanced keys, missTopics tagged).
4. playground.html: 5 games (scope/wire/break/eval/blast), arcade contract, five-of-five gate.
5. workshop.html: 90-min facilitator kit, 3 persona tracks pointing into the Foundry presets, printable recipe cards, projector mode.
6. practical.html THE INCIDENT ROOM: trace-scrub exam, find the poisoned instruction AND the silently skipped step; plus design-check auto-fail (unbounded permissions or no human gate on irreversible actions = fail). Reuse the Foundry's trace CSS.
7. pack, capstone, career, community, classroom, certificate (CAMB-C05, chips SCOPE/WIRE/TEST/SUPERVISE WELL, motto candidate "THE AGENT DOES THE WORK. YOU ANSWER FOR IT."), changelog, resources.md (live-checked), verify.html if C04 pattern requires.
8. Gates: audit-course.sh, sweep-states.mjs c05 all four states (register c05 key shape in the tool), check-live.sh + new worker-protocol contract. Foundry logic battery is scripted in /tmp/c05/test_foundry.mjs; recreate from this file if /tmp is gone.
9. Deck, social card, /start/ card, LINKS.md block. Film LAST (filmv2 parametric renderer; slide grade one notch brighter than C04 per Director).

## Standing rules (from KICKOFF, unchanged)
dd bs=4M + cmp for every mount write; count==1 before any patch; worker slices messages at 2,400 chars; push does not deploy the worker; no em dashes; never "Amelia"; facts re-verified live before publishing; never report clean without all three gates.

---

## UPDATE 2026-07-14 (session 2): the course already existed; I added the 10x layer

**Important correction:** a full Course 05 was already built and committed on 2026-07-13 (index, 79 slides, quiz, 24 flashcards, its own 5-game AI Lab, a "Practical" run-review, a "Dry Run" sandbox, classroom, community, pack, certificate CAMB-C05). I did not know this and briefly overwrote its playground.html, practical.html, and community-config.js before catching it. ALL restored from git HEAD (verified byte-identical). My standalone alternates are parked at /tmp/c05/MY_lab_alt.html and MY_incidentroom_alt.html (not shipped). Director chose: keep the existing course, add my two new pages as the signature layer.

**Shipped this session (additive, all verified):**
- `web/foundry.html` — THE AGENT FOUNDRY (signature feature). Real in-browser agent loop, 9 scoped tools, permission gate, injection drill, WebLLM local brain, recipe JSON, `#preset=` deep links for the workshop. Logic battery all green.
- `web/workshop.html` — 90-min facilitator kit: run sheet, 3 persona cards (faculty/admin/researcher) that deep-link into Foundry presets, projector mode, print CSS, crib sheet, graduate-to table. WORKSHOP_READY.
- **Fixed a real pre-existing defect: all 29 Aira voice clips in web/aira-voice/ were 0 bytes** (her voice was silent site-wide). Re-synthesized every one with edge-tts Neerja -2%/-2Hz from the exact text in aira.js, dd+cmp verified, durations match C04.
- **Fixed a pre-existing broken-link bug:** flashcards.html nav linked to C04-only referee.html / auditor.html / "Screening Room". Repointed to real C05 pages.
- Wired Foundry+Workshop into: every page's nav (10 existing pages + the 2 new), index.html hero buttons + 2 feature cards, aira.js page map (+2 entries; voice clips page-foundry/page-workshop were NOT in the 29, so those two say-lines fall back to text unless clips are added later — LOW priority, most pages have clips).
- Added a **check-live.sh section 6**: proves the live worker can drive the Foundry agent loop in JSON protocol (needs Origin + a real User-Agent header; Python's default UA gets 403 from the worker). Passed via groq-70b.

**GATES, all green 2026-07-14:** audit-course.sh PASSED; sweep-states.mjs c05 clean in fresh/midway/passed/honors (16 loads each, includes the 2 new pages); check-live.sh PASSED including the new C05 Foundry contract; c01 and c04 re-swept, no regression.

**Sandbox note for sweeps:** /sessions disk is full, so run sweep-states.mjs from a /tmp copy with its own node_modules (playwright-core symlinked as playwright), env ACADEMY_ROOT + CHROME_PATH + LD_LIBRARY_PATH=/tmp/c05/lib + TMPDIR=/tmp/pwtmp.

**Still OPEN (existing course's own remaining items, not mine to assume done):** whether the existing slides/quiz/deck were themselves gate-clean before today (they pass now); page-foundry + page-workshop voice clips (optional); the lecture film; /start/ card; LINKS.md; social card; and the Director's git push (nothing pushed this session).
