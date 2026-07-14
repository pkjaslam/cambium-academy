# The Free AI Course Studio — Full Toolbox for Cambium Academy

**July 2026 snapshot** · Every tool is free, open source, or gives usable free credits — matching the Academy's "no payment, no signup where possible" rule.

Covers the **entire course pipeline**: author → produce → deliver → assess → engage → measure — plus the cinematic "3D movie" layer on top. Use it two ways: as your own production stack, and as the syllabus of a course that teaches these tools.

Legend: 🟢 fully free / open source · 🟡 free tier or credits · ⚠️ caveat to check

---

# PART A — COURSE DELIVERY

## A1. Author & host the course

| Tool | Free? | Why it matters |
|---|---|---|
| 🟢 [LiaScript](https://github.com/LiaScript/LiaScript) | Open source | **Markdown → full interactive course** (quizzes, TTS narration, animations) rendered in the browser. Built for exactly your GitHub-repo model |
| 🟢 [Docusaurus](https://github.com/facebook/docusaurus) / [MkDocs Material](https://github.com/squidfunk/mkdocs-material) / [Astro Starlight](https://github.com/withastro/starlight) | Open source | Turn `courses/` markdown into a polished versioned site with nav, dark mode, i18n |
| 🟢 [reveal.js](https://github.com/hakimel/reveal.js) | Open source | HTML lecture slides with speaker notes, auto-advance, PDF export |
| 🟢 GitHub Pages + [Cloudflare Pages](https://pages.cloudflare.com) | Free | Your current host; Cloudflare Pages adds free redirects, analytics, and **Workers** (free tier) to proxy API keys for AI Labs |
| 🟢 [GitHub Actions](https://github.com/features/actions) | Free for public repos | Auto-build courses, regenerate audio, run link checks on every push |
| 🟢 [Pagefind](https://github.com/CloudCannon/pagefind) | Open source | Full-text search across all courses on a static site — no server |
| 🟢 [Workbox](https://github.com/GoogleChrome/workbox) (PWA) | Open source | Make courses installable and **work offline** — huge for low-bandwidth learners |
| 🟢 [Moodle](https://github.com/moodle/moodle) / [Open edX](https://github.com/openedx) / [Frappe LMS](https://github.com/frappe/lms) | Open source | If you ever need accounts, cohorts, and gradebooks — the free LMS heavyweights |

## A2. Record & edit lectures

| Tool | Free allowance (Jul 2026) | Notes |
|---|---|---|
| 🟢 [OBS Studio](https://github.com/obsproject/obs-studio) | Unlimited | Screen + camera recording, streaming — the standard |
| 🟢 [DaVinci Resolve](https://www.blackmagicdesign.com/products/davinciresolve) | Free version is full-featured | Hollywood-grade editing, color, audio |
| 🟡 [CapCut](https://www.capcut.com) | Broad free tier | AI auto-captions, cutout, TTS, templates; most exports watermark-free ⚠️ some AI features paid |
| 🟢 [Screenity](https://github.com/alyssaxuu/screenity) | Open source | Chrome screen recorder with annotations — quick lab walkthroughs |
| 🟡 [Descript](https://www.descript.com) | Limited free plan | Edit video by editing the transcript; AI filler-word removal |
| 🟡 [OpusClip](https://www.opus.pro) | 60 credits/mo | Auto-cut lectures into vertical shorts for promotion ⚠️ watermark, clips expire in 3 days |
| 🟢 [FFmpeg](https://github.com/FFmpeg/FFmpeg) | Unlimited | Batch compress/convert every lecture in one script |
| 🟢 YouTube | Free unlimited hosting | Unlisted embeds keep the no-signup experience; free auto-captions + global CDN |

## A3. Captions, translation & dubbing (reach every learner)

| Tool | Free allowance (Jul 2026) | Notes |
|---|---|---|
| 🟢 [Whisper](https://github.com/openai/whisper) / [whisper.cpp](https://github.com/ggml-org/whisper.cpp) | Unlimited, open source | Best-in-class transcription/subtitles, runs locally or free Colab |
| 🟢 [Subtitle Edit](https://github.com/SubtitleEdit/subtitleedit) | Open source | Fix timing, translate, export SRT/VTT |
| 🟡 [DeepL API](https://www.deepl.com/pro-api) | 500k chars/mo free | Translate course text to reach non-English learners |
| 🟡 Gemini API | ~1,500 req/day free | Translate, simplify ("explain for a 12-year-old"), localize quizzes |
| 🟡 ElevenLabs / Higgsfield dubbing | Free credits | Dub Amelia's lectures into other languages ⚠️ credit-hungry |

## A4. Assessment: quizzes, flashcards, spaced repetition

| Tool | Free allowance (Jul 2026) | Notes |
|---|---|---|
| 🟢 [NotebookLM](https://notebooklm.google.com) | Free | Upload lesson sources → **auto-generate flashcards and quizzes** with difficulty control; also your question-bank drafting tool |
| 🟢 [ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs) | Open source | The modern spaced-repetition algorithm as a JS library — plug real SRS into your existing flashcards, stored in `localStorage`, no accounts |
| 🟢 [Anki](https://github.com/ankitects/anki) + AnkiWeb | Open source / free | Export each course's deck as `.apkg` — a downloadable that keeps learners coming back |
| 🟢 [H5P](https://h5p.org) | Open source | 50+ embeddable interaction types: interactive video with in-video questions, branching scenarios, drag-drop |
| 🟡 [Kahoot](https://kahoot.com) | Free: up to 40 players/session | For live cohort sessions ⚠️ AI features paid |
| 🟡 [Quizizz](https://quizizz.com) | Free with ads | Self-paced gamified quizzes, AI generation on paid |
| 🟡 [Mentimeter](https://www.mentimeter.com) | 50 participants/mo | Live polls in webinars |
| 🟢 Google Forms | Free | Auto-graded quizzes + response spreadsheet, zero setup |

## A5. Analytics, feedback & iteration

| Tool | Free allowance (Jul 2026) | Notes |
|---|---|---|
| 🟢 [Microsoft Clarity](https://clarity.microsoft.com) | **Free forever, no traffic limits** | Heatmaps + session recordings — literally watch where students get stuck in a lesson |
| 🟡 [Umami](https://umami.is) | Cloud: 100k events/mo free; self-host unlimited | Privacy-friendly analytics (no cookie banner needed) |
| 🟢 [GoatCounter](https://github.com/arp242/goatcounter) | Free for non-commercial | Simplest possible page analytics |
| 🟢 [Tally](https://tally.so) | Free, unlimited forms | End-of-course feedback surveys |
| 🟡 Gemini API | Free tier | Pipe feedback + quiz-miss data in → "which concept confused students most?" |

## A6. Community, certificates & distribution

| Tool | Free allowance (Jul 2026) | Notes |
|---|---|---|
| 🟢 [Giscus](https://github.com/giscus/giscus) | Open source | Comments on every lesson page, powered by your repo's GitHub Discussions — Q&A with zero infrastructure |
| 🟢 Discord / GitHub Discussions | Free | Cohort community; you already have Discussions enabled |
| 🟢 Your print-on-spot certificate JS | Free | Keep it; add a verification code + a page that validates it (static JSON lookup) |
| 🟢 Canva (free tier) | Free templates | Certificate and course-badge design |
| 🟡 [Brevo](https://www.brevo.com) | 300 emails/day, unlimited-ish contacts | Best free email for "new course every week" announcements |
| 🟡 [Kit](https://kit.com) / [MailerLite](https://www.mailerlite.com) | Kit: up to 10k subs free; MailerLite: 250 subs ⚠️ (cut in Jul 2026) | Newsletter alternatives |
| 🟢 Jitsi Meet | Open source, free | Live office hours, no time limits |
| 🟡 StreamYard / YouTube Live | Free tiers | Stream launch events; OpusClip the recording into shorts |

---

# PART B — PRODUCTION & THE CINEMATIC LAYER

## B1. The "3D movie" engine room (open source — runs on GitHub Pages)

| Tool | What it does | Why it matters for courses |
|---|---|---|
| 🟢 [Three.js](https://github.com/mrdoob/three.js) | The standard WebGL 3D library | Render any 3D scene in the browser — neurons firing, data flowing through a neural net |
| 🟢 [React Three Fiber](https://github.com/pmndrs/react-three-fiber) + [drei](https://github.com/pmndrs/drei) + [postprocessing](https://github.com/pmndrs/react-postprocessing) | React wrapper + helpers + bloom/glow effects | The "movie look": floating glass objects, volumetric light, particle dust in ~50 lines |
| 🟢 [Babylon.js](https://github.com/BabylonJS/Babylon.js) | Game-grade 3D engine (Apache 2.0) | Physics, XR, 3D GUI for interactive labs |
| 🟢 [`<model-viewer>`](https://github.com/google/model-viewer) | One HTML tag for interactive 3D (+AR on phones) | Easiest win: drop any `.glb` into a lesson, students rotate/zoom it |
| 🟢 [GSAP](https://github.com/greensock/GSAP) | Animation engine — **100% free since 2025 incl. all plugins** (ScrollTrigger, SplitText, MorphSVG) | Scroll-driven storytelling: the lesson animates as the student scrolls |
| 🟢 [Theatre.js](https://github.com/theatre-js/theatre) | Timeline/keyframe editor, drives Three.js | Choreograph camera moves like a film editor |
| 🟢 [impress.js](https://github.com/impress/impress.js) | 3D zoom/rotate slide transitions | Lectures that fly through 3D space |
| 🟢 [Rive](https://rive.app) (free tier) + [Lottie](https://github.com/airbnb/lottie-web) | Interactive vector animation, tiny files | Animated characters/diagrams that react to clicks |
| 🟢 [Motion Canvas](https://github.com/motion-canvas/motion-canvas) / [Manim](https://github.com/ManimCommunity/manim) | Code-driven explainer animation | 3Blue1Brown-style concept animations |
| 🟡 [Remotion](https://github.com/remotion-dev/remotion) | Videos with React code | Free for individuals & small teams |

**Free assets:** [Poly Haven](https://polyhaven.com) (CC0), [Sketchfab](https://sketchfab.com) (CC filter), [Mixamo](https://www.mixamo.com) (character animations), [Ready Player Me](https://readyplayer.me) (avatars), [Blender](https://www.blender.org) (edit it all).

## B2. AI 3D generation (text/image → 3D model)

| Tool | Free allowance (Jul 2026) | Notes |
|---|---|---|
| 🟡 [Meshy](https://www.meshy.ai) | ~100 credits/mo (~10 assets) | Best browser quality; non-commercial free tier ⚠️ |
| 🟡 [Tripo](https://www.tripo3d.ai) | Free monthly credits | Generous starter; check license |
| 🟢 [Hunyuan3D](https://github.com/Tencent-Hunyuan/Hunyuan3D-2) / [TRELLIS](https://github.com/microsoft/TRELLIS) | Unlimited, open source | Run locally, ComfyUI, or free HuggingFace demo spaces |
| 🟡 [Spline](https://spline.design) | Free plan, unlimited viewers | Browser 3D editor with AI; watermark on free export ⚠️ |

**Pipeline:** generate `.glb` → drop into `<model-viewer>` → interactive 3D in any lesson, zero backend.

## B3. AI video generation (free credits)

| Tool | Free allowance (Jul 2026) | Notes |
|---|---|---|
| 🟡 [Kling](https://klingai.com) | **66 credits/day, resets daily** | Best genuinely-free option |
| 🟡 [Hailuo](https://hailuoai.video) | Daily free generations | Photorealistic humans; watermark-free |
| 🟡 [Luma](https://lumalabs.ai/dream-machine) / [Pika](https://pika.art) / [Runway](https://runwayml.com) | 30/mo · 80/mo · 125 one-time | Pika free tier permits commercial use (480p) |
| 🟢 [Wan](https://github.com/Wan-Video) / [HunyuanVideo](https://github.com/Tencent-Hunyuan/HunyuanVideo) / [LTX-Video](https://github.com/Lightricks/LTX-Video) | Unlimited, open source | Free Colab/Kaggle GPUs |

⚠️ Free tiers cap ~720p, most watermark + non-commercial. Daily-reset trick: Kling + Hailuo = a free render farm if you plan shots ahead.

## B4. Voice, avatars, music (the "Amelia layer")

| Tool | Free allowance (Jul 2026) | Notes |
|---|---|---|
| 🟡 [ElevenLabs](https://elevenlabs.io) | 10k credits/mo (~10–20 min) | Attribution + non-commercial on free ⚠️ |
| 🟢 [Chatterbox](https://github.com/resemble-ai/chatterbox) | Unlimited, MIT | Beats ElevenLabs in blind tests; 5-second voice cloning — could *be* Amelia |
| 🟢 [Kokoro](https://github.com/hexgrad/kokoro) | Unlimited, Apache 2.0 | 36× real-time on free Colab; **kokoro.js runs TTS in the browser** — Amelia speaks live on a GitHub Pages lesson |
| 🟢 [edge-tts](https://github.com/rany2/edge-tts) | Unlimited | Microsoft neural voices via Python, zero cost |
| 🟡 [HeyGen](https://www.heygen.com) / [Hedra](https://www.hedra.com) | Free plan (watermark) / 300 credits/mo ⚠️ | Talking-avatar lecturers |
| 🟢 [LivePortrait](https://github.com/KwaiVGI/LivePortrait) / [SadTalker](https://github.com/OpenTalker/SadTalker) | Unlimited, open source | Animate a still portrait locally |
| 🟡 [Suno](https://suno.com) | 50 credits/day | ⚠️ Free tier: no downloads since Warner deal, non-commercial |
| 🟢 [Stable Audio Open](https://github.com/Stability-AI/stable-audio-tools) + [Freesound](https://freesound.org) | Unlimited / CC0 | Intro stings and SFX without licensing worries |

## B5. Images & decks

| Tool | Free allowance (Jul 2026) | Notes |
|---|---|---|
| 🟢 [Google AI Studio](https://aistudio.google.com) | Effectively free — hundreds of images/day (Nano Banana) | Best free image tool; also your LLM playground |
| 🟡 [Leonardo](https://leonardo.ai) | 150 tokens/day | Stylized course art |
| 🟡 [Ideogram](https://ideogram.ai) | 10 credits/wk; **4.0 now open-weight** | Best text-inside-images (posters, thumbnails) |
| 🟡 [Gamma](https://gamma.app) | 400 lifetime credits | AI decks ⚠️ watermark on free |

## B6. Free AI brains for the in-browser AI Lab

| Tool | Free allowance (Jul 2026) | Notes |
|---|---|---|
| 🟢 [WebLLM](https://github.com/mlc-ai/web-llm) | Unlimited — runs **in the student's browser** (WebGPU) | No key, no server. The ultimate no-signup AI Lab |
| 🟢 [Transformers.js](https://github.com/huggingface/transformers.js) | Unlimited, in-browser | Sentiment, embeddings, Whisper STT, image classification live in a lesson |
| 🟡 [Gemini API](https://ai.google.dev) | ~1,500 req/day | Frontier model for labs (hide the key behind a free Cloudflare Worker) |
| 🟡 [Groq](https://groq.com) | ~14,400 req/day | 300+ tok/sec — instant demos |
| 🟡 [OpenRouter](https://openrouter.ai) / [Cerebras](https://cloud.cerebras.ai) / [NVIDIA NIM](https://build.nvidia.com) / [GitHub Models](https://github.com/marketplace/models) | Free tiers | Variety + backup capacity |

## B7. Simulations, stories & the frontier

- 🟢 [PhET](https://phet.colorado.edu) — free embeddable science sims, the gold standard for what an "AI Lab" can feel like.
- 🟢 [Twine](https://github.com/klembot/twinejs) — branching interactive stories ("choose your own prompt adventure").
- 🟢 [Excalidraw](https://github.com/excalidraw/excalidraw) / [tldraw](https://github.com/tldraw/tldraw) / [Mermaid](https://github.com/mermaid-js/mermaid) — diagrams, from hand-drawn to text-generated.
- 🟡 [Project Genie / Genie 3](https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/) — prompt → walkable 3D world in real time. Ultra-only ⚠️; perfect "where this is going" finale.
- 🟢 [HunyuanWorld-1.0](https://github.com/Tencent-Hunyuan/HunyuanWorld-1.0) — open-source immersive world generation, the free counterpart to Genie.

---

# Suggested course: "Course 0X — Build & Deliver a Course With AI for $0"

Standard Academy path (lecture → flashcards → AI Lab → quiz → certificate):

1. **The $0 studio** — free tiers vs credits vs open source; licenses in plain language (all ⚠️ rows become flashcards).
2. **Words & pictures** — Google AI Studio + Gamma. *Lab: make a course poster.*
3. **Voice & video** — Kokoro/ElevenLabs narration, Kling daily credits, CapCut captions. *Lab: turn a paragraph into a narrated 10-second clip.*
4. **Assessment engine** — NotebookLM auto-flashcards/quizzes + ts-fsrs spaced repetition. *Lab: generate a quiz from your own notes.*
5. **Enter 3D** — Meshy/Tripo → `<model-viewer>`. *Lab: prompt your own spinning 3D model into the page.*
6. **The cinematic lesson** — GSAP ScrollTrigger + Three.js assembling lessons 2–5. *Lab: a scrollytelling mini-page.*
7. **AI with no signup** — WebLLM chat fully in-browser. *Lab: talk to a model with no key.*
8. **Ship & measure** — GitHub Pages deploy, Clarity heatmaps, Giscus comments, Brevo announcement. *Lab: read a real heatmap, spot the confusing section.*
9. **Finale: world models** — Genie 3 vs open-source HunyuanWorld: the course that builds itself.

**Meta-hook:** the course is *made with* every tool it teaches — each lesson ends with "how this page was built."

---

*Free tiers change monthly (MailerLite cut its free plan this month). Re-verify allowances before publishing a lesson that quotes numbers.*
