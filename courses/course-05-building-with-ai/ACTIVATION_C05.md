# Course 05 — Activation status (2026-07-14)

## LIVE / committed (pushed, commit ae89d95 and earlier)
- Full web course, all pages, three gates green.
- The Agent Foundry + The Workshop (signature features).
- Aira's 29 voice clips restored (were 0 bytes).
- Modern high-tech UI refresh (polish.css).
- Agent-loop certificate restyle (teal accent, print/download/LinkedIn/QR all verified).
- C04 AI-Lab sparkle celebration (bonus, committed same push).

## STAGED for the NEXT push (activation)
- `start/index.html` — Course 05 LIVE NOW catalog card (so the course is findable).
- `LINKS.md` — Course 05 living-links block + social card + footer.
- `courses/course-05-building-with-ai/web/changelog.html` — activation entry.
- `.gitignore` — guard so scratch screenshots never get committed again.

Run `push_academy.bat` to ship these. After it deploys, Course 05 is fully live and linked from the catalog.

## Heads-up: two files dirty that are NOT mine
`git status` also shows `courses/course-03-.../data/riverbend_temps_messy.csv` and `push_academy.bat` as modified from before this session. Review those before committing, or `git checkout` them if unintended.

## The ONE remaining big item: the lecture film
Not built. The course index carries an honest "film in production" placeholder (exactly how Course 04 launched web-first). Building it is a full multi-hour render job like the C04 film "The Record" (3D engine + narration + encode). Say the word and I start it as its own build; the course is fully usable and live without it in the meantime.

## Post-activation checklist (optional, after push)
- Verify https://pkjaslam.github.io/cambium-academy/start/ shows the C05 card.
- Force a re-scrape of the C05 share image on LinkedIn/Facebook debuggers (they cache).
