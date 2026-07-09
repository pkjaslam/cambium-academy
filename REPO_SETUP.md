# One-time setup: the cambium-academy repository

The Academy now lives in its own repo, separate from the Cambium_AI framework.
Different products, different heartbeats: the framework ships releases through
a test gauntlet; the Academy ships a course every week with no gauntlet at all.

## 1. Create the repo on GitHub (2 minutes)

1. github.com/new
2. Owner: **pkjaslam** · Repository name: **cambium-academy** (exactly this, it is in every URL)
3. **Public** (required for free GitHub Pages) · no README, no .gitignore (this folder already has them)
4. Create repository.

## 2. First push (1 minute)

Double-click `push_academy.bat` in this folder. It initializes git on the first
run, commits everything, and pushes to main. Every later course update is the
same double-click.

## 3. Turn on Pages (1 minute)

1. github.com/pkjaslam/cambium-academy → Settings → Pages
2. Source: **GitHub Actions**
3. The push in step 2 already triggered the deploy workflow; re-run it from the
   Actions tab if it ran before you set the source.
4. Site: **https://pkjaslam.github.io/cambium-academy/** (root forwards to the lander)

## 4. Enable Discussions (for the community boards)

Settings → General → Features → check **Discussions**. When you set up giscus
(PUBLISHING.md Part C), point it at **pkjaslam/cambium-academy**, not the
framework repo. Learner Q&A stays with the Academy.

## 5. The custom domain attaches HERE

When is-a.dev PR #43042 merges, cambiumai.is-a.dev should be configured on
**this** repo (Settings → Pages → Custom domain), not on Cambium_AI. The domain
literally names the Academy. Full steps: `start/DOMAIN_SETUP.md`. After the
domain is live, update the Aira worker ALLOW_ORIGIN to
https://cambiumai.is-a.dev or chat breaks on CORS.

## What stayed behind in Cambium_AI

Every old course URL (certificate QR codes, LinkedIn credential links, shared
lecture links) now has a permanent redirect stub in the framework repo that
forwards to the same page here, query strings included. Old certificates keep
verifying forever. Do not delete the stubs.

The framework repo still needs one push + Pages deploy of its own to publish
those stubs (push_cambium.bat, then run its Pages workflow).

## What lives where now

| Thing | Repo |
|---|---|
| Weekly courses, lander, certificates, Aira | **cambium-academy** |
| Agents, tools, tests, docs, plugin, releases | Cambium_AI |
| Research-training app (`academy/`, ten modules) | Cambium_AI (it teaches the framework) |
| Lecture MP4s, SRT, photo originals | `Cambium\academy_media\` (private, outside both) |
