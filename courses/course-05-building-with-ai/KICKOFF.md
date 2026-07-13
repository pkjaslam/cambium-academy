# Course 05 — Building with AI: agents that actually do the work

**Status:** not started. This is the kickoff brief. Read it, then read `../../CLAUDE.md` (master rules)
and `../../COURSE_PLAYBOOK.md` (how a course is built) before writing a line.
**Written:** 2026-07-13. Renumbered to Course 05 when the Director prioritised Responsible AI in Scholarly Publishing as Course 04.
**Facts below were live-verified on 2026-07-13.** Re-verify before publishing: this field moves weekly.

---

## 1. Why this course

The arc: 01 what AI *is* -> 02 how to *ask* -> 03 how to *research and verify* -> 04 publish responsibly -> **05 how to make it *do work*, safely.**

Live-verified rationale (July 2026):

- Building AI agents and automations is the single most in-demand AI skill of 2026.
- Gartner: ~40% of enterprise applications will use task-specific AI agents in 2026, up from under 5% in 2025.
- **But 88% of agent pilots never reach production** (LangChain, State of Agent Engineering 2026). Other trackers put
  the failure band at 70-95%.
- The blockers are *integration complexity, output quality, latency, security, and missing evaluation
  infrastructure* — **not model quality**. Agents succeed on only ~50% of complex tasks in production.
- The failure signature: demos run on clean inputs and cooperative users; production has neither.

That gap IS the course. Everyone else teaches "look what the agent can do." Cambium teaches
**"here is why it breaks, and here is how you prove yours doesn't."** Same spine as Course 03:
a claim you never tested is a claim you cannot trust.

**Competency chips (certificate):** `SCOPE WELL` · `WIRE WELL` · `TEST WELL` · `SUPERVISE WELL`

**One-line promise:** "Automate real work with AI, and prove it actually works."

---

## 2. Proposed 10-module outline

1. **What an agent actually is** — model + tools + a loop + memory. What it is *not* (magic, or a person).
2. **The 88% problem** — why pilots die. Demo data vs real data. Sets the honest frame up front.
3. **Scope well: pick the right job** — repetitive, verifiable, bounded, low blast radius. And the
   *do-not-automate* list (irreversible, high-stakes, unverifiable, or where you'd have to check the work anyway).
4. **Wire well: tools and connectors** — how AI reaches your files, apps, and the web, in plain English.
   MCP as the emerging standard; connectors; Zapier (6,000+ integrations, natural-language agent building);
   n8n (400+ integrations, visual, more technical); Claude/ChatGPT Projects and connectors.
5. **Build your first agent, no code** — a real one, start to finish. (Suggested: a weekly literature digest
   for the learner's own field, which reuses Course 03's source-verification muscle.)
6. **Memory and context** — what it remembers, what it silently forgets, why it invents state.
7. **Test well: evals** — treat the agent like a scientist treats a method. Golden set, pass/fail criteria,
   regression testing. *The heart of the course, and the thing the 88% skipped.*
8. **Supervise well: guardrails and permissions** — least privilege, human in the loop, blast radius, and
   **prompt injection** (an agent reads a poisoned page and follows it). Non-negotiable module.
9. **Cost, latency, and silent degradation** — how automation rots quietly, and how you notice.
10. **Ship it and own it** — rollout, disclosure, keeping a human accountable. Build your personal stack.

**Riverbend continuity:** Course 03 ran the Riverbend field-station thread. Continue it — Riverbend now wants to
automate its messy-data pipeline and its literature scan. Same characters, harder problem, and the learner
already trusts the setting.

---

## 3. AI Lab — five games (match Course 03's arcade feel; see `ai-lab-game-feel` standard)

| Key | Game | What it teaches |
|-----|------|-----------------|
| `scope` | **Scope It** | Sort real tasks into automate / assist / never. |
| `wire`  | **Wire It** | Match the job to the right tool or connector. |
| `break` | **Break It** | Prompt-injection hunt: spot the poisoned page the agent obeyed. |
| `eval`  | **Eval It** | Build a golden set, catch the regression a "working" agent introduced. |
| `blast` | **Blast Radius** | Assign least-privilege permissions before letting it run. |

Five-of-five gate, same contract as C03 (four reader files change together: playground, progress, aira, slides).

**Capstone:** build one real automation, write its eval, write its disclosure. Three artifacts, not an essay.

---

## 4. Standing rules this build MUST follow (learned the hard way)

**Infrastructure**
- **The D: mount silently truncates writes.** Author in `/tmp`, copy with `dd bs=4M`, verify with `cmp`. Always.
  The mount also serves stale reads: re-read from the repo before editing, never trust a cached copy.
- Never let a search-and-replace patch run twice. Assert `count == 1` on the anchor before replacing.
  (A double-applied patch nested three copies of the certificate sheet and silently ate the whole toolbar.)

**Verification — do not say "clean" without these**
- `bash tools/audit-course.sh course-05-... C05` — static gauntlet (files, links, HTML closes, residue).
- `node tools/sweep-states.mjs c05 <fresh|midway|passed|honors>` — loads every page in every real learner
  state; catches JS errors, broken images, clipped content, leaked template placeholders, empty renders.
  **Static audits are blind to rendered DOM, and most bugs only appear in a state you didn't seed.**
- `bash tools/check-live.sh` — asserts response **CONTENT**, never status codes. A 200 that says nothing
  useful is a failure. (This is how "Aira is offline" was really a healthy worker returning a truncated reply.)
- If a page has two renders of the same thing (e.g. an HTML certificate and a canvas PNG), **measure one from
  the other**. Two hand-maintained renders always drift.

**Aira / the worker**
- Worker: `aira-chat.pkjaslamagrico.workers.dev`, version 1f218283 (deployed 2026-07-13).
  Chain: Gemini -> Groq 70B -> Groq 8B -> Workers AI -> GitHub -> Cohere -> NVIDIA.
- **The worker slices EACH message to 2,400 chars.** Send context and request as *separate* messages,
  never concatenated, or the request gets amputated.
- Gemini bills hidden thinking tokens against `max_tokens` — fixed (`reasoning_effort: "none"`, 1400 tokens).
  If structured JSON replies start coming back truncated again, that is the first place to look.
- Source of truth for the worker is `courses/course-03-research-with-ai/proxy/aira-worker.js`.
  **A git push does NOT deploy it.** It ships only from the Cloudflare dashboard.

**Voice**
- Never an em dash. Never reuse the name "Amelia". Aira is warm, plain, and never pretends to be human.
- Facts are researched live and date-stamped. Never state a 2026 fact from memory.

---

## 5. Definition of done

Course 05 is done when, and only when:

1. Every page exists and is wired: index, slides (~70), transcript, flashcards (24), quiz (20, balanced keys,
   `missTopics` tagged), the 5-game AI Lab, capstone, career, community, certificate (CAMB-C05), classroom.
2. A hands-on graded exam in the Course 03 tradition (its "Practical") — for C04 the natural one is:
   **audit a real agent run**. Give the learner a transcript where the agent obeyed a poisoned instruction
   and quietly skipped a step. They must find both.
3. `audit-course.sh` PASSES, `sweep-states.mjs` is clean in all four states, `check-live.sh` PASSES.
4. Deck (PPTX + PDF), social card, `/start/` catalog card, LINKS.md block, `resources.md` with live-checked links.
5. The lecture film, built with the parametric renderer (`production/filmv2/lib/film_slide.js` reads
   `slides_data.js` — any deck can be filmed this way). Zero-joint assembly: ONE continuous audio track and a
   single video timeline. Per-segment concat causes the audio/video desync that ruined film v1.
6. Downstream sweep: any runtime or content change means the thumbnail, title, description, chapters, SRT,
   embed, index copy, and LINKS.md all get updated together. Missing one of these is how the thumbnail
   ended up claiming the wrong runtime.

---

## 6. Starter line for the Fable 5 session

> Read `courses/course-05-building-with-ai/KICKOFF.md`, then `CLAUDE.md` and `COURSE_PLAYBOOK.md`.
> Build Course 05 end to end, complete in one pass, matching Courses 01-03 exactly in structure and style.
> Research every 2026 fact live before writing it. Do not report anything as clean until
> `audit-course.sh`, `sweep-states.mjs` (all four states), and `check-live.sh` all pass.
