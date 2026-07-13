# Course 03 — Research with AI (curriculum, authored by Fable)

**Promise:** By the end, you can use AI to find, check, and cite real sources, and catch it when it makes things up — which it does more than almost anyone realizes. About 90 minutes, free, certificate at the end.

**The angle (per the Director): tell people what they DON'T know.** Not "AI is useful for research." Everyone knows that. The eye-opener is that the same AI that finds your sources is the single biggest new source of *fake* ones — and the fakes are engineered to look real. Every module lands a surprise backed by a dated 2026 fact.

**Signature AI feature:** the in-lesson AI Classroom (Aira answers, examples, code-drawn diagrams, summaries) on every page. Presenter: the Higgsfield Aira talking-head beats.

---

## The six modules

### Module 1 — The trust problem (why this course exists)
- **Eye-opener:** In 2023, about 1 in 2,828 published papers contained a fabricated reference. By early 2026 it is **1 in 277** — a roughly 6× rise in three years (Lancet, 2026, from a scan of 2M papers / 97M citations).
- The same tool that finds sources in seconds is the one most likely to invent them. Speed is not the problem; trust is.
- Mental model: AI is a brilliant, fast research assistant who will never say "I could not find it" — it fills the gap with something that *looks* right.
- Beat: welcome.

### Module 2 — Find: search-grounded AI vs a guessing chatbot
- **Eye-opener:** A plain chatbot answers from memory and can't show you where it got anything. Search-grounded tools (Perplexity, Gemini Deep Research, ChatGPT search) *retrieve then answer* and cite as they go. Same question, completely different trust level.
- The one switch: ask a tool that "shows its receipts," not one that free-associates.
- 2026 landscape: deep-research agents that browse dozens of pages and return a cited report.
- Try it: ask the same question two ways, compare whether you get clickable sources.
- Beat: "shows its receipts."

### Module 3 — Verify: lateral reading (the pros' move)
- **Eye-opener:** Columbia Journalism Review tested eight AI search tools and they gave **wrong answers on more than 60%** of news-citation queries — while sounding completely confident.
- Stop reading *down* a single page to judge it. Read *across* the web: open a new tab, see what independent sources say about the claim and the source. This is **lateral reading**, and it is faster than deep-reading one page.
- The SIFT habit: Stop, Investigate the source, Find better coverage, Trace claims to the original.
- Try it: take one AI claim, verify it in a second independent source in 60 seconds.
- Beat: lateral reading.

### Module 4 — The citation trap (the one that catches everyone)
- **Eye-opener:** Frontier models in 2026 still fabricate **18–28% of citations** in literature-review tasks, and even the best sit at ~3–19% depending on the task. The fakes are *engineered to pass*: well-formed DOIs, plausible author names, real-sounding journals.
- Why: models learned that a citation *looks like* author + year + journal + DOI. When unsure, they fill the slot with a convincing forgery instead of admitting the gap.
- The rule: **a citation you never opened is a citation you cannot trust.** Click it. Does the page exist, and does it actually say what the AI claimed?
- Try it: ask AI for three sources on a niche topic and open every one.
- Beat: the fake-citation twist.

### Module 5 — Deep research tools, and their blind spot
- **Eye-opener:** In 2026 an AI agent can run a 20-source research report while you get coffee. But reference-hallucination studies show deep-research agents still slip in unsupported or invented sources inside otherwise-good reports — the polish hides the holes.
- How to use them well: treat the report as a *first draft with leads*, not a finished answer. Spot-check the load-bearing sources.
- The one habit that decides whether you can trust it: verify the sources the conclusion rests on.
- Try it: run a deep-research query, then check the 3 sources its main claim depends on.
- Beat: 20-source report / one habit.

### Module 6 — Stay honest, and when to trust
- **Eye-opener:** The last line of defense is not a better model — it is you. The skill that keeps its value as AI improves is judgment: knowing what to check and being willing to.
- Disclosure and integrity: when AI helped, say so where the room expects it; never pass an unverified AI claim as your own checked work.
- The close: research with AI is not about answers faster; it is about staying the smartest thing in the room while the machine sounds sure.
- Beat: closing.

---

## Assets already banked (Higgsfield, this session)
- Reusable **Aira** character element (id d356bef6) — consistent across all art/video.
- Cinematic **thumbnail** ("Research with AI"), **Aira instructor hero**, a **B-roll** clip.
- **5 presenter talking-head beats** (welcome, lateral reading, fake-citation, deep-research, closing) with Aira's voice + lip-sync.

## Build plan (following COURSE_PLAYBOOK.md)
1. Web from the Course 1/2 template: index, slides (6 modules, ~one idea/slide), 24 flashcards, AI Lab (3 games on: search-grounded vs guessing, spot-the-fake-citation, lateral-reading race), 20-question quiz, certificate (CAMB-C03), community (course-03 giscus categories), capstone/career tuned to research skills.
2. Configs: registry-config.js + aira-chat-config.js verbatim; cert-extras course tag "C03"; keys cambium-c03-*.
3. Lecture video: assemble the 5 Aira beats + slide visuals + B-roll (like Course 2's film) — or a narrated deck first.
4. AI Classroom on every lesson page (already built as aira-classroom.js).
5. social-course03.png (PIL, matches the set); og:image; /start/ catalog card; LINKS.md; push.

**Sources for the eye-openers:** Lancet 2026 fabricated-citations study (statnews.com/2026/05/07); AI hallucination benchmarks 2026 (suprmind.ai); Columbia Journalism Review AI-search citation test; reference-hallucination in deep-research agents (arXiv 2604.03173). Every stat re-verified before it ships on a slide.
