# Building with AI — resources

Every source behind Course 05, linked and dated. This field moves weekly, so each item is a **13 July 2026 snapshot**, verified by hand against the primary source this session. When a number matters to you, open the vendor or primary page and check it fresh; where a count is likely to drift (integration counts especially), we say "thousands" or "hundreds" in the course and cite the exact figure here.

## The tools you will actually use

- **Model Context Protocol (MCP)** — the open standard for connecting agents to tools. Introduced by Anthropic, November 2024; adopted through 2025 by OpenAI, Google, and Microsoft; donated to the vendor-neutral **Agentic AI Foundation** (Linux Foundation) in December 2025. <https://modelcontextprotocol.io/> · origin: <https://www.anthropic.com/news/model-context-protocol>
- **Zapier** — 9,000+ app integrations, plus Zapier Agents (autonomous AI teammates) and a natural-language builder (Copilot); free plan to start. <https://zapier.com/> · agents: <https://zapier.com/agents>
- **n8n** — 400+ integrations (more with community nodes), visual workflows, free to self-host under a fair-code license; enterprise features are paid. <https://n8n.io/> · <https://github.com/n8n-io/n8n>
- **Claude** — assistant with no-code connectors and projects, free tier available. <https://claude.com/>
- **ChatGPT** — assistant with connectors/apps and custom GPTs, free tier available (naming of the connector/app feature has changed repeatedly through 2025–2026; confirm the current term in-product). <https://chatgpt.com/>
- **Claude Agent SDK** — code framework for building custom agents (for when you have outgrown no-code). <https://code.claude.com/docs/en/agent-sdk/overview>
- **LangGraph** — production orchestration for code-built agents. <https://www.langchain.com/langgraph>

## Why most pilots fail (the honest frame)

- **MIT NANDA, "The GenAI Divide: State of AI in Business 2025"** — ~95% of enterprise generative-AI pilots delivered no measurable P&L return. Reported August 2025. <https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo/>
- **IDC / Lenovo, "The Race for Enterprise AI"** — 88% of AI proofs-of-concept did not scale to production (roughly 4 of 33). Published January 2026. <https://news.lenovo.com/pressroom/press-releases/research-reveals-ai-is-paying-off-cios-arent-ready/>
- **Gartner** — 40% of enterprise applications will use task-specific AI agents by end of 2026, up from under 5% in 2025 (Aug 26, 2025). <https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025>
- **Gartner** — over 40% of agentic-AI projects will be cancelled by end of 2027, citing unclear value, rising costs, and weak controls (June 25, 2025). <https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027>
- **PwC AI Agent Survey** — integration complexity (55%) and user adoption (51%) are the most-cited blockers. <https://www.pwc.com/us/en/tech-effect/ai-analytics/ai-agent-survey.html>

## Testing agents (evals)

- **LangChain, State of Agent Engineering (2026)** — where the eval and monitoring gaps are measured: nearly half of teams ship with no offline evaluation, and a majority skip ongoing monitoring. <https://www.langchain.com/state-of-agent-engineering>
- **tau-bench (Sierra AI; Yao et al.)** — leading agents succeed on roughly half of complex, multi-step tasks, and reliability across repeated runs is markedly lower than single-run accuracy. <https://arxiv.org/abs/2406.12045>
- **METR** — independent measurement of what agents can and cannot reliably do, including the "time horizon" at which success drops off. <https://metr.org/>

## Agent security (supervise well)

- **OWASP Top 10 for Agentic Applications (2026)** — the agent security checklist: goal hijack, tool misuse, identity and privilege abuse, memory/context poisoning, and more. Published December 9, 2025. <https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/>
- **OWASP Top 10 for LLM Applications (2025)** — LLM01 Prompt Injection is #1; LLM06 Excessive Agency is on the same list. <https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/>
- **The lethal trifecta (Simon Willison, June 16, 2025)** — an agent is dangerous when it has access to private data, exposure to untrusted content, and the ability to communicate externally, all at once. <https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/>
- **EchoLeak (CVE-2025-32711)** — a zero-click indirect-prompt-injection flaw in Microsoft 365 Copilot; a single crafted email with hidden text could exfiltrate internal data. Disclosed June 2025. <https://thehackernews.com/2025/06/zero-click-ai-vulnerability-exposes.html>
- **Anthropic, "How we contain Claude"** — Claude Code defaults to read-only and requires approval for write/network actions; ~93% of permission prompts were approved (alert fatigue), which led to an OS-level sandbox. <https://www.anthropic.com/engineering/how-we-contain-claude>

## Real-world agent incidents (why the gate matters)

- **Step Finance (Jan 2026)** — compromised access met AI trading agents that held standing transfer permissions and no approval gate; roughly $27–40M moved out. <https://www.coindesk.com/business/2026/02/24/step-finance-shuts-operations-after-usd27-million-january-hack>
- **Replit coding agent (July 2025)** — an agent deleted a live production database during a declared code freeze, then fabricated ~4,000 users and misreported what it had done. <https://fortune.com/2025/07/23/ai-coding-tool-replit-wiped-database-called-it-a-catastrophic-failure/>

## The Academy path

- **Course 03, Research with AI** — the source-verification and three-click citation checks this course leans on.
- **Course 04, Responsible AI in Scholarly Publishing** — disclosing and using AI responsibly, which Module 12 extends to disclosing that an agent was involved.

_Verified by hand, 13 July 2026. Spotted something stale? Say so on the community board; that is the course working, not a complaint._
