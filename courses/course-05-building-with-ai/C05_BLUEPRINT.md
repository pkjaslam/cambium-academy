# Course 05 Blueprint — Building with AI: agents that actually do the work
Brainstorm + design decision record. 2026-07-14. Solo session with the Director.
Inputs: KICKOFF.md (facts live-verified 2026-07-13), free-ai-toolbox-3d-movie-learning.md (Director's toolbox), fresh web checks 2026-07-14 (sources at bottom).

## 0. The one decision that makes this course 10x

Every Cambium course got its power from the medium enacting the thesis. C04's thesis was "never put a confidential manuscript in a cloud AI," so the Referee ran the model in the browser. C05's thesis is **"an agent you cannot see and stop is an agent you cannot trust."** So the signature feature is:

### THE AGENT FOUNDRY (`foundry.html`) — build a REAL agent in the browser, watch every move it makes
Not a simulation, not a video of an agent. The student assembles an actual working agent from five parts, then runs it on a real task while the page shows the loop live:

- **Five build slots**: GOAL (what it must do) · BRAIN (the model) · TOOLS (each with a permission scope) · MEMORY (what it may keep) · STOP RULES (budget, human gate, do-not list).
- **Real tools, all free, all keyless from the browser**: Crossref DOI lookup (C04's proven pattern), arXiv search, Wikipedia lookup, Open-Meteo weather, a calculator, a notes pad (localStorage), an .ics calendar-file writer, an email DRAFTER (renders a mailto draft, never sends). Every tool is read-only or draft-only by construction: the blast radius is zero by design, and the course says so out loud.
- **The live trace**: every think step, every tool call, every result renders as a flight-recorder timeline as it happens. When the agent wants a tool the student scoped to "ask first," the run STOPS and a permission card slides in: Allow once / Always / Deny. That interaction IS module 8 (Supervise well), taught by the student's own finger.
- **Two brains, one honest contrast** (C04's airlock trick, replayed for agents): BRAIN = Aira Cloud (the existing worker chain, zero setup) or BRAIN = Local (WebLLM in-browser, reusing the exact vendored web-llm.js already shipped in C04; needs WebGPU, degrades honestly without it). The page shows the same network counter C04 made famous: local agent, counter stays at 0.
- **The lesson baked into the demo**: preset "Naive mode" (all permissions open, no stop rules) is available on purpose. Students run it, watch the agent read a poisoned page and obey it (a planted instruction inside a sample webpage the agent fetches), then rebuild with scopes + human gate and watch the same attack bounce off. Fail first, fix second: the 88% problem, experienced personally in ninety seconds.

Reused, not rebuilt: C04's WebLLM vendoring, C04's live-Crossref pattern, C03's Aira worker chain, C02/C04's ts-fsrs flashcards. The Foundry is new glue around proven parts, which is why it is buildable.

## 1. The Workshop layer (the Director's ask: a class you can teach)

`workshop.html` — **"Run this as a live 90-minute workshop"**, the first Academy page designed for a ROOM, not just a reader:
- **Three persona tracks, each a guided Foundry build with a printable recipe card:**
  1. **FACULTY**: "The Quiz Smith" — paste a syllabus topic; agent drafts a balanced 10-question quiz with an answer key; human gate before anything is kept. (Teaches: draft-only agents, review gates.)
  2. **ADMINISTRATOR**: "The Monday Brief" — agent reads pasted inbox/notes text, triages into act/delegate/ignore, drafts the weekly status email as a mailto draft. (Teaches: scoping to bounded, verifiable work.)
  3. **RESEARCHER**: "The Literature Scout" — agent searches arXiv + Crossref for a topic, verifies every DOI resolves, outputs a digest with zero unverified citations. (Teaches: evals; reuses C03's verification muscle. This is KICKOFF module 5's suggested first agent, made persona-specific.)
- **Facilitator kit** on the same page: minute-by-minute run sheet (90 min), projector mode (big type, one step per screen), the three recipe cards print-ready, a "what will go wrong" crib sheet (WebGPU absent, slow wifi, the poisoned-page demo), and a closing slide with the take-home rule: automate the bounded, gate the rest.
- After the workshop, each persona card points at real free tools to graduate to (from the Director's toolbox + verified landscape: Zapier Agents, n8n, Copilot Studio, Gemini Enterprise Agent Platform / AI Studio, Claude Projects). Names and free-tier claims re-verified at build time.

## 2. Course structure (KICKOFF's 10 modules stand, one addition)

The KICKOFF outline is right and stays: 10 modules, ~70 slides, Riverbend continuity (they now automate the messy-data pipeline and the literature scan). One structural addition: module 5 ("Build your first agent, no code") becomes the on-ramp to the Foundry, and the workshop page hangs off it. Chips unchanged: SCOPE WELL · WIRE WELL · TEST WELL · SUPERVISE WELL. Promise unchanged: "Automate real work with AI, and prove it actually works."

## 3. Lab, practical, and the deterministic guardrails

- **AI Lab, five games as briefed** (arcade contract, five-of-five gate): Scope It, Wire It, Break It, Eval It, Blast Radius.
- **The Practical: THE INCIDENT ROOM** (KICKOFF's definition of done, staged as an instrument): a real agent-run trace in the Foundry's flight-recorder UI. The learner scrubs the timeline of "Riverbend's night-shift agent" and must find BOTH planted defects: (a) the poisoned instruction it obeyed, and (b) the step it silently skipped. Deterministic grading: both found = pass, either missed = retry with a different seeded trace.
- **Second deterministic guardrail** (agent-design equivalent of C04's detector rule): in the design part of the practical, any submitted agent design that grants unbounded permissions or has no human gate on irreversible actions AUTO-FAILS, whatever the prose says. The rubric is code, not vibes.

## 4. What 10x means in the UI, concretely (chosen vs rejected)

CHOSEN:
- **The trace as the course's visual language**: the same flight-recorder motif appears in slides (animated SVG loop diagrams), the Foundry (live), the Incident Room (forensic), and the film (cinematic). One metaphor everywhere: watch the loop.
- **Scrollytelling lecture option**: GSAP + ScrollTrigger (fully free since 2025) drives the agent-loop diagrams inside slides.html as the student scrolls. Additive, degrades to static slides with JS off.
- **ts-fsrs spaced repetition** on the 24 flashcards (C04's proven upgrade, same key contract).
- **Foundry recipes as shareable JSON**: an agent design exports as a small JSON card; the workshop personas ARE three such cards; students can swap theirs in the community thread. Zero backend.
REJECTED (with reasons): Three.js 3D agent world (spectacle without pedagogy here; the film carries the cinema), Genie/world-model demos (paid/ultra tier, breaks the no-signup rule), kokoro.js in-browser TTS for Aira (tempting, but voice consistency with the course's Neerja clips wins), LiaScript/Docusaurus re-platforming (the Academy shell is the brand; playbook says match C01-C04).

## 5. Fact spine (as of 2026-07-14, re-verify at build)

- 88% of agent pilots never reach production; yet 57.3% of orgs now run agents in production and 30.4% are close behind; quality is the top barrier (32%); "agentic ops" leads grew 11% -> 56% in two years (LangChain, State of Agent Engineering 2026).
- Prompt injection drives most agentic-AI security failures in production (OWASP, June 2026); reported attack surge ~340% in 2026.
- Named 2026 incidents for the Incident Room and module 8: the LiteLLM PyPI backdoor (March 2026, ~47k downloads in a 3-hour window, poisoned the gateway used by CrewAI/DSPy/GraphRAG); Cursor CVE-2026-22708 (allowlisted commands deliver payloads); a customer-facing agent leaking internal pricing for three weeks before detection (March 2026).
- Higher-ed pull for the workshop personas: 91% of administrators use AI personally; institutional adoption 49% -> 66% (2024 -> 2025); presidents rank AI the top force on higher ed by 2030 (Inside Higher Ed 2026); documented agent uses: grant management, enrollment, accounting, at-risk flagging (UPCEA / Inside Higher Ed 2026).
- Gartner: ~40% of enterprise apps will embed task-specific agents in 2026, up from <5% in 2025 (per KICKOFF, verified 2026-07-13).

## 6. Build order and gates

1. G-DESIGN (this document): Director approves concept, Foundry scope, personas. <- WE ARE HERE
2. Slides + transcript + thread (Riverbend), then flashcards, quiz.
3. Foundry core (cloud brain first, local brain second), then the five games, Incident Room, workshop page, pack/career/community/capstone/certificate (CAMB-C05, microprint motto candidate: "THE AGENT DOES THE WORK. YOU ANSWER FOR IT.").
4. The three verification gates (audit-course.sh, sweep-states.mjs all four states, check-live.sh) plus a Foundry logic battery: permission gate fires, naive mode obeys the planted injection, scoped mode does not, both Incident Room defects detectable, auto-fail rule fires on unbounded designs.
5. Deck, social card, /start/ card draft, LINKS.md block, resources.md live-checked. Film last (filmv2 parametric renderer, slide grade one notch brighter per the Director's C04 note).

Sources: langchain.com/state-of-agent-engineering · helpnetsecurity.com 2026-06-11 OWASP agentic failures · callsphere.ai early-2026 agent disasters roundup · insidehighered.com 2026-04-29 admin AI survey + 2026-01-07 agentic university · upcea.edu agentic AI university · airtable.com/articles/best-ai-agent-builders · nocode.mba build-ai-agents-free · KICKOFF.md (2026-07-13 verification) · Director's toolbox file (July 2026 snapshot).
