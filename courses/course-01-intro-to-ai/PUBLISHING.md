# Publishing Course 01 (YouTube + GitHub Pages, both free)

Two channels, one afternoon. Do Part A once for the whole Academy; Part B repeats for every course.

## Part A · Put the course site live on GitHub Pages (one-time)

The repo's existing Pages workflow (`.github/workflows/pages.yml`) already publishes the entire repository, so the course pages ride along automatically.

1. Commit and push the `courses/` folder (use `push_cambium.bat` as usual).
2. Confirm the repo setting once: Settings, then Pages, then Source = "GitHub Actions". (Already set if the landing page is live.)
3. Trigger a deploy: either publish a Release, or open Actions, pick "Deploy to GitHub Pages", and press "Run workflow".
4. Wait for the green check, then open:
   `https://pkjaslam.github.io/cambium-academy/courses/course-01-intro-to-ai/web/`
5. Click through: slides, quiz (try passing and failing), certificate print preview. Everything runs in the browser; there is no backend to configure.

## Part B · Publish the lecture on YouTube

**Shortcut: the video is already rendered.** An AI-narrated 16:31 lecture (Neerja Expressive voice) is ready at `D:\IFC_SSD2\idaho_sae\Cambium\academy_media\`, with exact chapters and a paste-ready description in [YOUTUBE_UPLOAD.md](YOUTUBE_UPLOAD.md). Upload it, mark it as AI-altered content when YouTube asks, paste the video ID into `web/index.html`, and skip the recording steps below.

Prefer your own voice instead? Record it yourself:

1. Open `slides/Cambium-Academy-Course01-Intro-to-AI.pptx` in PowerPoint.
2. Slide Show, then "Record Slide Show". Narrate each slide from `script/VIDEO_SCRIPT.md` (the same text is in the speaker notes). Expect 16 to 19 minutes; re-record any slide you stumble on.
3. File, Export, "Create a Video", 1080p. PowerPoint renders an MP4.
4. Upload to YouTube (a channel is free): paste the ready-made title, description, chapters, and tags from the "YouTube upload block" at the bottom of VIDEO_SCRIPT.md. Fix the chapter timestamps to match your actual recording.
5. In the description, replace the two PASTE links with the course page URL from Part A.
6. Copy the YouTube video ID (the part after `watch?v=`) and paste it into `web/index.html`, replacing `REPLACE_WITH_VIDEO_ID`. Commit, push, redeploy Pages (step A3).
7. Add the video to a public "Cambium Academy" playlist so weekly courses stack up in order.

## Part C · Turn on the community boards (one-time, 10 minutes)

The community page (`web/community.html`) ships with an AI teaching assistant that works immediately, plus a Q&A board and a discussion space powered by GitHub Discussions through giscus (free, no server, no ads; learners sign in with a free GitHub account, readers need nothing).

1. On github.com/pkj