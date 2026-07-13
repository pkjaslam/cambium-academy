# Course 03 — Research with AI, v2 curriculum (Fable's edit)

_2026-07-13. The Director's idea list was the raw input; this is the edited course. What changed in editing, so the reasoning is inspectable:_

**Added (not on the input list):**
1. **AI for scientific writing, translation, and grants** — the most-used research application of AI on earth, and where every disclosure rule bites. A research course without the writing module teaches the instruments and skips the concert.
2. **Design before data** — AI as experimental-design and statistics consultant (power, sample size, test choice, pre-registration). The input list jumped from literature straight to analysis; the costliest AI mistakes happen upstream, at design.
3. **Qualitative research workflows** — transcription and thematic coding. Half of academia is qualitative and every AI course ignores them.
4. **Sensitive data and local models** — the "which data may never touch a cloud chatbot" module-within-a-module: confidential, pre-publication, human-subjects data, and what to use instead.
5. **Build your personal stack** — the capstone deliverable: a one-page personal toolkit, one instrument per job, free tiers marked. A tool tour without a decision framework evaporates in a week.

**Demoted from standalone to component (they are real, but thin as modules):**
- NotebookLM → the flagship demo inside "your library, talking back" (teach the capability class, not one product; products age, capabilities do not).
- Knowledge graphs → one movement inside the literature-discovery pipeline.
- Reference management → merged into the integrity module with reproducibility.
- AI peer review → merged into the writing module (critique is one act of the writing life, and the confidentiality red line lives there).

**Kept from v1 (live course):** the trust/verification module and its three Lab games; certificate, keys, registry untouched.

---

**Promise:** the complete 2026 AI research workflow, end to end: discover the literature while you sleep, design studies with a tireless statistician, analyze data in plain English, read figures and field notebooks with machine eyes, listen to your paper library, write and translate and pre-review your manuscripts, keep everything reproducible and every reference real, and disclose it all correctly. One instrument at a time, each with its measured failure mode and its check.

**Audience:** researchers, grad students, and anyone who works with evidence. Plain English. **Length:** ~3 hours, ~75 slides. Free, no signup, certificate.

**The angle:** most researchers use one chatbot like a better Google. In 2026 there is an instrument rack, and every instrument fails differently. AI supplies speed. You supply trust.

---

## Module 1 · The 2026 research stack (orientation)
- **Eye-opener:** Kosmos, an autonomous "AI scientist," processes ~1,500 papers and ~42,000 lines of analysis code per run; its own makers estimate ~80% of findings hold up. Six months of work in a day, one finding in five wrong: the whole bargain in one sentence.
- The instrument map: discover · design · analyze · see/hear · write · reproduce · disclose. One chatbot is not a research strategy.
- Try it: sort your last week's tasks onto the instrument map; find the two you are doing by hand that an instrument now does.

## Module 2 · Prompting for researchers (the foundation, up front)
- The C02 recipe upgraded for science: full context (data, constraints, field conventions) + exact deliverable + required format + **demanded uncertainty** ("flag what you are not sure of and what I must verify") + iteration as method, not failure.
- Research-specific patterns: "act as reviewer 2", "list the assumptions you just made", "give the opposing interpretation", "what would falsify this".
- **Eye-opener:** the persona finding from Course 2 carries: roles shape TONE, not truth. For facts and stats, plain asks plus demanded uncertainty beat expert cosplay.
- Try it: take your worst recent AI answer; rerun it with context + format + demanded uncertainty; diff the two.

## Module 3 · Discover: the literature pipeline (search → maps → agents → alerts)
- **Eye-opener:** in 2026 an agent runs your literature search autonomously: OpenAI/Gemini/Claude/Perplexity deep research (30-200 sources per run, minutes not weeks); academic specialists **Elicit and Undermind consistently beat generalists** because they search closed, verified paper corpora instead of the open web.
- The pipeline, in order of effort: search-grounded Q&A (receipts on every claim) → citation maps (Connected Papers seed-graphs; ResearchRabbit chaining; Litmaps over 260M+ papers via Crossref/S2/OpenAlex) → deep-research agents for synthesis → standing alerts so the review stays alive.
- The agent-report rule carried from v1: **a first draft with leads.** Audit the 2-3 load-bearing sources before anything rests on it.
- Try it: same question through one generalist agent and Elicit; count sources that survive a click.

## Module 4 · Trust: verification and the citation trap (from v1, the spine holds)
- The numbers that justify the whole course: fabricated references up ~6x in three years to **1 in 277 papers** (Lancet 2026); AI search tools **wrong on 60%+** of citation queries while sounding certain (CJR); frontier models still fabricate **18-28%** of citations on literature tasks.
- Receipts vs vibes · lateral reading · SIFT · the rule in stone: **a citation you never opened is a citation you cannot trust** · the 3-click check.
- The Lab's three games live here (Citation Hunt, Lateral Race, Receipts-or-Vibes).

## Module 5 · Design before data: AI as methods consultant
- **Eye-opener:** the cheapest hour of AI in your whole project is BEFORE data exists: power analysis and sample size sanity-checks, test selection with assumptions stated, confound hunting, pre-registration drafting, analysis-plan critique. The costliest errors are here too, and they are silent.
- How to consult safely: make AI show the formula and assumptions, not just the number; demand "what design would a hostile reviewer propose instead"; cross-check any power calculation with a second tool.
- Hard line: AI advises on design; it does not decide. Statistics remain the author's responsibility, and "the AI chose the test" is not a methods section.
- Try it: describe your next study in six sentences; ask for the three most likely fatal design flaws and the sample size math shown in full.

## Module 6 · Analyze: your AI data analyst (R, Python, SQL, MATLAB) and qualitative work
- **Eye-opener:** 2026 assistants are not autocomplete: **Posit Assistant sees your dataframe, your code, AND your rendered plot at once**, working across R and Python; agentic assistants (Claude Code, Copilot) navigate whole analysis repos; Julius and ChatGPT run plain-English analyses in the browser; MATLAB ships its own AI chat.
- The safe loop: describe data + goal + constraints → require commented code → **explain-it-back rule** (every line explained before it runs) → tiny-test on 10 hand-checkable rows → then scale.
- Failure modes: plausible-but-wrong test choices, hallucinated function arguments, silent unit and join errors.
- **Qualitative researchers get a lane:** Whisper-class transcription of interviews, AI-assisted thematic coding (AI proposes, you adjudicate, keep an audit trail), survey open-ends at scale.
- Try it: messy CSV in, cleaned data + one labeled plot out, every step explained, in your language of choice.

## Module 7 · See and hear: multimodal AI and your library, talking back
- **Eye-opener:** vision models now extract numbers from published charts, read maps and micrographs, and transcribe handwritten field notebooks; benchmarks still show them **misidentifying fine-grained microscopy structures** that experts catch. Brilliant interns with astigmatism.
- Workflows: digitize the 1998 figure; first-pass micrograph and site-map reads (a hypothesis, never a result); field-notebook transcription with spot-checks.
- Your library as a colleague, the capability class: source-grounded Q&A over YOUR papers, podcast-style audio overviews you can interrupt mid-sentence with questions, auto mind-maps and study decks. NotebookLM is the flagship demo; SciSpace and Zotero-plugin equivalents exist. Why source-grounding contains (not eliminates) hallucination.
- Try it: one handwritten page + one published chart in; transcription + extracted values out; count the errors yourself.

## Module 8 · Write: drafting, translation, grants, and surviving peer review
- **Eye-opener:** writing is where AI meets policy, and the policies now DIFFER concretely: **Science requires disclosure of all AI use; Nature exempts pure copy-editing but bans AI images; Elsevier wants a dedicated AI declaration; NIH signaled AI-substantially-written proposals can be rejected.** One-size-fits-all advice is now wrong by construction.
- The legitimate power tools: revision and clarity passes, translation and English-polishing (the great equalizer for non-native speakers, now largely disclosure-exempt as copy-editing at many venues, but check the venue), abstract tightening, plain-language summaries, cover letters; grant support (aims critique, reviewer simulation, boilerplate first drafts).
- **Pre-review yourself:** have AI attack your manuscript as reviewer 2 (clarity, methods gaps, statistical red flags, overclaims) before humans do. It is tireless and shameless, which is exactly what you want in private.
- The red lines: never upload someone ELSE'S unpublished manuscript or grant (NIH explicitly bars reviewers from this); ~21% of ICLR reviews were flagged as AI-written and ~12% at a major journal family, so assume your reviewers may use it, and know your venue's rules for YOUR side.
- Try it: paste your abstract; ask for the three harshest justified referee comments; fix one tonight.

## Module 9 · Reproducible and intact: workflows, code hygiene, and reference integrity
- **Eye-opener:** the two quiet crises AI can worsen or fix: analyses nobody can rerun, and reference lists nobody checked. The same assistant that wrote your analysis will, on request, write the README, pin the environment, and document the workflow, most people never ask.
- Habits: AI-drafted documentation you correct; pinned environments; scripts over sessions; the pipeline as code.
- Reference integrity: import citations from the source of record (Crossref/DOI), never from a model's memory; **never hand-type a citation and never trust an AI-typed one**; Zotero + Better BibTeX as the backbone, AI plugins (Beaver, PapersGPT-class) as the reading layer; DOI-resolution as the final gate.
- Try it: AI documents one of your existing scripts; your reference list goes through a DOI check; count the casualties.

## Module 10 · Responsible AI + your personal stack (capstone)
- **Eye-opener:** ~70% of journals now have an AI policy; in one analysis of 75,000 recent papers, **about 0.1% disclosed AI use.** That gap is where reputations go to die, and it will close on the disclosers' terms.
- The working code: verify before you rely · disclose per the venue's ACTUAL rule (module 8's table) · never expose confidential, pre-publication, or human-subjects data to cloud tools, **local and institution-hosted models exist exactly for this** · watch training-data bias · you remain the author and the accountable party.
- **The capstone deliverable: your personal research stack.** One page: your instrument per job (discover/design/analyze/see-hear/write/reproduce), free tiers marked, red lines written down. The certificate says you can pick tools with judgment, not that you memorized this month's names.
- Close: **Find well. Verify well. Cite well. Disclose well.**

---

## Build notes
- ~75 slides · 24 flashcards rebalanced · 20-question quiz (14 to pass) · CAMB-C03 cert/keys/registry unchanged.
- **AI Lab: 5 games.** Keep Citation Hunt / Lateral Race / Receipts-or-Vibes (M4). Add **Pick Your Instrument** (match 10 real research tasks to the right instrument class, streak-scored) and **Prompt Surgery** (rebuild a weak research prompt in three moves, before/after scored). New station keys `ins`,`ps`; quiz gate becomes 5-of-5; update the four reader files (playground/quiz/progress/aira + slides nextStep) together.
- AI Classroom lesson contexts update to v2 modules. Existing 7:20 film = Module 4 featurette; full-length v2 film after the web rebuild. Deck/transcript/social regenerate.
- Rebuild order: slides+transcript → cards/quiz/labs → classroom contexts → deck/media → audit → push.

## Fact base
**Verified 2026-07-13 (sources on file):** Kosmos capabilities and ~80% self-estimate (Edison/FutureHouse); deep-research landscape, source counts, Elicit/Undermind closed-corpus edge (awesomeagents, felloai, presenc); v1 trust numbers (Lancet 1-in-277 via STAT 2026-05-07; CJR 60%+; 18-28% fabrication); Posit Assistant data+code+plot context (posit.co, 2026); NotebookLM interruptible audio + formats (notebooklm.google); Litmaps 260M+/ResearchRabbit/Connected Papers (effortlessacademic, aarontay); AI-in-review prevalence ~21% ICLR / ~12% Nature Comms (Pangram, arXiv 2026); journal policy split Science/Nature/Elsevier + NIH stance + 70%-vs-0.1% disclosure gap (enago, manusights, elsevier.com, princeton libguides).
**To verify at build (stable but re-check):** Whisper-class transcription accuracy claims; current qualitative-coding tools; local-model options for sensitive data (Ollama-class) and institution hosting norms; power-analysis tool cross-checks; current names of Zotero AI plugins.
