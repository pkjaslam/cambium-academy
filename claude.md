# Cambium Academy — Master Instructions for Claude Fable 5

Use as `CLAUDE.md` in the repo root (Cowork / Claude Code), or paste into Project instructions on claude.ai.

## Context (never re-explain this)
- Project: Cambium Academy — free AI courses, one certificate per course. Live at https://pkjaslam.github.io/cambium-academy/
- Stack: static HTML/CSS/JS on GitHub Pages. No backend, no signup, nothing sent to a server. Progress lives in localStorage only.
- Cadence: one new course every week. Course 01 (Intro to AI) and 02 (Prompting Essentials) are live; 03 is Research with AI.
- A complete course ships: index page, slide deck (~36 slides), transcript, 20-question quiz locked until the path is done, 24 flashcards with missed-card recycling, 3 hands-on playground labs, community page, capstone brief, career guide, printable certificate, downloadable PPTX + PDF.
- People: Dr. Jaslam Poolakkal, PhD — course director, real human, sets the standard. **Aira** — AI teacher persona: narrates lectures, floats bottom-right on every page, tracks progress, answers questions. Always labeled as an AI creation. (Old repo used "Amelia" — never reuse that name.)

## Operating rules
1. **Complete in one pass.** Deliver whole working features — no skeletons, no TODOs, no placeholder text, no "add this later." A new course means every page works and every link resolves.
2. **Read before building.** Open the existing course files first; match structure, CSS tokens, file naming, and interaction patterns exactly. A new course must be indistinguishable in style from Course 01/02.
3. **Build the ambitious version by default.** Adaptive quiz difficulty, spaced-repetition flashcards, interactive simulations over static text. Do not pre-simplify; ask only if scope is genuinely ambiguous.
4. **Facts are researched live.** Model names, prices, benchmarks, tool claims: web-search current sources before writing, cite them, and date-stamp ("Facts are a <Month Year> snapshot"). Never state present-day facts from memory.
5. **Verify before presenting.** Test: quiz scoring and unlock gating, flashcard recycle logic, progress persistence across pages, every internal link, mobile layout, certificate print CSS. End with a short report of what was tested and what passed.
6. **Aira's voice.** Warm, plain English, one idea at a time, zero hype, zero jargon. She explains where the learner is and what to do next. She never pretends to be human.
7. **Stay honest.** No fake testimonials, no invented stats, no dark patterns. "Free forever, no signup, nothing stored" is a promise the code must keep.
8. **Accessibility and weight.** Semantic HTML, alt text, keyboard-navigable quiz and flashcards, works without external JS frameworks. Pages stay fast on a phone.

## When asked for a new course
Flow: outline → full slide content → all pages built and wired → quiz + flashcards + labs → verification report.
Ask at most one round of clarifying questions (angle, depth, target persona), then go end-to-end without check-ins.

## When asked to fix or change something
Apply the change everywhere it logically belongs (all courses, both language variants if any), not just the file mentioned. If a fix reveals the same bug elsewhere, fix that too and say so.
