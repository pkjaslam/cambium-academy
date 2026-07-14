# Course 04 Push Pack

Prepared 2026-07-13 from an independent re-verification pass (not the session that built the course), run against the live repo at `D:\IFC_SSD2\idaho_sae\Cambium\cambium-academy`. Nothing in the course or the tooling was changed to produce this report; this file is the only addition.

## Verdict up front

**C04 is already pushed and already live.** That is the headline finding of this pass and it changes what "push" means below. The repo's own remote-tracking ref for `origin/main` points at `0bbdd4e`, the exact commit that is also local `HEAD`, and a set of live fetches against `pkjaslam.github.io` in this session (index, referee, /start/, and a byte-for-byte size check on `web-llm.js`) confirm GitHub Pages is already serving that commit. So the C04 course, the three tooling fixes, and the `.github/secret_scanning.yml` fix are all already on GitHub. Course 03 and everything earlier is in the same state: already live.

What is genuinely sitting in the working tree, uncommitted, is one documentation update (32 added lines in `HANDOFF.md` about the 3D cold-open film) and two line-ending-only diffs that carry no content change. There is one real operational blocker to clear before running git again: a stray `.git\index.lock` left behind by this verification pass. See Section 5.

**READY TO PUSH** (in the narrow sense of "push the small remainder"). The course itself does not need saving; it is already out.

## 1. Gate re-run results

All three gates were re-run from the repo root in this sandbox and all passed cleanly. No course regressions found. One environment setup step was needed to run the browser sweep (a missing system library), which is noted below as methodology, not a failure.

| # | Gate | Command | Result | Detail | Label |
|---|------|---------|--------|--------|-------|
| 1a | Static audit | `bash tools/audit-course.sh course-04-responsible-ai-publishing C04` | **AUDIT PASSED** (exit 0) | All 8 sections "ok": file parity, JS parses (no truncation), live-endpoint configs present, no Course 1 residue, all `cambium-c04-*` keys scoped correctly, certificate identity (certId/verify/registry tag/og:image), pptx+pdf present, every HTML closes. 0 fails. | REAL PASS |
| 1b | Rendered-DOM sweep, `fresh` | `node tools/sweep-states.mjs c04 fresh` | **PASS** (exit 0) | "swept 17 page loads (c04, state=fresh)" / "no findings" | REAL PASS |
| 1b | Rendered-DOM sweep, `midway` | `node tools/sweep-states.mjs c04 midway` | **PASS** (exit 0) | 17 page loads, no findings | REAL PASS |
| 1b | Rendered-DOM sweep, `passed` | `node tools/sweep-states.mjs c04 passed` | **PASS** (exit 0) | 17 page loads, no findings | REAL PASS |
| 1b | Rendered-DOM sweep, `honors` | `node tools/sweep-states.mjs c04 honors` | **PASS** (exit 0) | 17 page loads, no findings | REAL PASS |
| 1c | Live contract checks | `bash tools/check-live.sh` | **LIVE CHECKS PASSED** (exit 0) | 5/5 sections passed: (1) Aira worker returns a complete parseable reply, provider `gemini`; (2) Crossref contract, real DOI 200 / fabricated DOI 404; (3) all 3 embedded course videos playable via YouTube oembed (`jRpYchejlTg`, `vgZAYc14y4s`, `yhboxB9DM34`); (4) all 11 DOIs in `playground.html`/`practical.html` resolve exactly as the games claim (6 real = 200, 5 fake = 404, 0 wrong); (5) Aira grades a model-correct decision letter as passing, and honors the detector-accusation guardrail rubric. | REAL PASS |

No SANDBOX-LIMIT failures and no REAL failures occurred. Every gate ran with genuine network access (Aira Cloudflare worker, api.crossref.org, YouTube oembed, GitHub Pages itself) and a real headless Chromium, not a stub.

**Methodology note (not a failure):** this sandbox had no Chromium binary and no `node_modules` on the mounted repo path at session start. A `chrome-headless-shell` binary and a `playwright` install happened to survive from a prior session in `/tmp` (this sandbox reuses `/tmp` across sessions), but it was missing one shared library, `libXdamage.so.1`. Fixed by `apt-get download libxdamage1` (network install of one small system package, not a repo change) and pointing `LD_LIBRARY_PATH` at the extracted `.so`. After that, `CHROME_PATH=/tmp/chrome-headless-shell-linux64/chrome-headless-shell` and `ACADEMY_ROOT=/sessions/funny-upbeat-rubin/mnt/Cambium/cambium-academy` were exported and the sweep script was run from `/tmp` (copied there byte-for-byte, diff-verified against the repo copy first) because Node's ESM resolves `node_modules` from the running script's own directory, not `ACADEMY_ROOT`. This matches the sandbox facts already logged in `HANDOFF.md`. Nothing about this required changing any file inside the repo.

## 2. Repo state: what actually needs to move

### git log (last 15, all already pushed)
```
0bbdd4e Academy update   (2026-07-13 18:19:42 -0700)  <- HEAD and origin/main, both here
c276171 Academy update   (2026-07-13 18:11:32 -0700)
1a9dac1 Academy update   (2026-07-13 16:16:22 -0700)
4af0ad2 Academy update   (2026-07-13 15:58:03 -0700)
ff0d02e Academy update   (2026-07-13 15:42:27 -0700)
761b7f7 Academy update   (2026-07-13 15:37:34 -0700)
63e53a1 Academy update   (2026-07-13 15:12:36 -0700)
6e0c665 Academy update   (2026-07-13 14:27:42 -0700)
52d5ff5 Academy update   (2026-07-13 14:17:05 -0700)
9ac4dc0 Academy update   (2026-07-13 14:03:17 -0700)
8587046 Academy update   (2026-07-13 13:45:17 -0700)
4ad4dc3 Academy update   (2026-07-13 13:13:38 -0700)
8e07d13 Academy update   (2026-07-13 12:17:34 -0700)
39777dc Academy update   (2026-07-13 11:51:50 -0700)
1532174 Academy update   (2026-07-13 11:45:31 -0700)
```

`.git/logs/refs/remotes/origin/main` (the local record of every successful push, author `pkjaslam <mjaslam@uidaho.edu>`) shows a push landing `0bbdd4e` onto `origin/main` at **2026-07-13 18:19:47 PDT**, five seconds after that commit was made. That push already happened, from this same machine (this sandbox mounts the Director's own D: drive, so this history is the Director's real push history, not sandbox-local). Confirmed independently by fetching the live site in this session:

| URL fetched | Result |
|---|---|
| `.../course-04-responsible-ai-publishing/web/index.html` | HTTP 200, title "Responsible AI in Scholarly Publishing · Cambium Academy Course 04" |
| `.../course-04-responsible-ai-publishing/web/referee.html` | HTTP 200, title "The Local Referee · Responsible AI in Scholarly Publishing · Cambium Academy" |
| `.../start/` | HTTP 200, contains a live link to `course-04-responsible-ai-publishing` |
| `.../course-04-responsible-ai-publishing/web/lib/web-llm.js` | HTTP 200, 6,065,527 bytes, exactly matching the byte size committed in `HEAD` |
| `.../course-03-research-with-ai/web/index.html` | HTTP 200, title "Research with AI · Cambium Academy Course 03" |

So: **C04, C03, and everything earlier are already on GitHub and already deployed.** `HANDOFF.md`'s "awaiting the Director's push" line is out of date; it was true when written and is no longer true as of 18:19:47 PDT today.

### What `git status` actually shows right now

```
 M HANDOFF.md
 M courses/course-03-research-with-ai/web/data/riverbend_temps_messy.csv
 M push_academy.bat
```
No untracked files at this point in the pass (this file itself, `PUSH_PACK_C04.md`, will show as untracked once you run `git status` yourself, since it did not exist before this report; that is the one intentional addition this pass made. A second, unrelated untracked folder also appeared later in the session; see the addendum below). Nothing under `courses/course-04-responsible-ai-publishing/` is modified; the C04 working copy is byte-identical to what is already live. `tools/` (the three gate scripts) is also byte-identical to `HEAD`, i.e. the tooling fixes described in `HANDOFF.md` are already committed and already pushed too.

**Grouped:**

- **C04 course files:** none modified. Nothing to stage here; C04 is already at parity with `HEAD` and with the live site.
- **Tooling changes named in HANDOFF** (`audit-course.sh`, `sweep-states.mjs`, `check-live.sh`): none modified. Already committed in earlier commits on this same branch tip, already pushed.
- **Unexplained, now explained:**
  - `HANDOFF.md`: +32 lines, 0 removed. Pure addition, the "Course 04 - THE 3D FILM" section documenting today's cold-open render (engine facts, render economics, the viewport bug and its fix). Root-level documentation, not a course file. Safe and worth committing.
  - `push_academy.bat`: diff shows 29 lines changed, but `git diff --ignore-all-space` on it is **empty**. Confirmed byte-for-byte: the working copy has 29 `\r` (CR) characters that `HEAD`'s blob does not (29-byte size difference, 1008 vs 979 bytes), i.e. every line picked up a Windows CRLF ending. No text content changed. Almost certainly caused by the file being opened/saved by a Windows-native tool since the last commit.
  - `courses/course-03-research-with-ai/web/data/riverbend_temps_messy.csv`: same pattern. Diff shows 182 lines changed, `--ignore-all-space` is **empty**, 182-byte size difference (5887 vs 5705) exactly matches 182 added CR characters. Pure LF to CRLF conversion, zero data change, confirmed not a corruption and not a mount-truncation artifact (sizes and content both check out, nothing shrank or went missing).
- **Gitignore sanity check (bonus, not modified, just verified):** `courses/course-04-responsible-ai-publishing/production/film3d/Cambium-C04-ColdOpen-TheRecord.mp4` (325,861,199 bytes, the rendered cold open) is present on disk and correctly matched by the `courses/**/production/` rule in `.gitignore`, confirmed with `git check-ignore`. It will not be picked up by `git add -A` and will not block the push on GitHub's 100 MB file limit.

### Exact git commands (for the Director to run, not run here)

Nothing was staged, committed, or pushed by this verification pass. Before running any of this, read Section 5 about `.git\index.lock`.

**Recommended (commit everything, including the two harmless line-ending diffs, in one shot):**
```
cd /d D:\IFC_SSD2\idaho_sae\Cambium\cambium-academy
push_academy.bat "Log Course 04 cold-open film build in HANDOFF; normalize line endings"
```
That script does `git add -A`, `git commit -m "<your message>"`, `git push -u origin main`, matching the convention already used for every prior commit in this repo (all 30+ prior commits are literally titled "Academy update"; use that instead of the suggested message if you want to keep that convention).

**Equivalent, step by step, if you would rather see each step:**
```
cd /d D:\IFC_SSD2\idaho_sae\Cambium\cambium-academy
git status
git add -A
git commit -m "Log Course 04 cold-open film build in HANDOFF; normalize line endings"
git push -u origin main
```

**Optional cleanup, if you would rather not carry the two cosmetic diffs into history at all**, run this before the block above, then only `HANDOFF.md` will be staged:
```
git checkout -- push_academy.bat courses/course-03-research-with-ai/web/data/riverbend_temps_messy.csv
```

Either way, because `origin/main` is already at `0bbdd4e` and your local `HEAD` is also `0bbdd4e`, the push will only add one small new commit on top; it will not re-push the course.

### Late addendum: a new untracked folder appeared mid-session

While this report was being written, `git status` picked up a new entry that was not present earlier in this pass:
```
?? production/
```
This is a top-level `production/` folder (sibling of `courses/`, not nested inside any course), containing three small helper scripts (`film3d_det.mjs`, `film3d_slidecap.mjs`, `film3d_gradeslides.mjs`, a few KB each, timestamped minutes ago). Their content is a determinism probe and slide-capture/grading harness for the film3d engine, using the same sandbox facts (chrome-headless-shell path, SwiftShader flags) already logged in `HANDOFF.md`. This was not created by this verification pass; nothing this session ran would produce it. It most likely means the Director or another live session is actively continuing the "Course 04 lecture film" work (Next Steps item 2 in `HANDOFF.md`) on this same shared filesystem while this report was being generated.

Two things worth knowing:
- It is **not** part of the C04 push described above and does not change any gate result or verdict in this report.
- It is currently **not covered by `.gitignore`.** The existing rule is `courses/**/production/`, which only matches a `production/` folder nested under `courses/`. A top-level `/production/` does not match that pattern, confirmed with `git check-ignore -v production/` returning nothing. Right now that only risks three small scripts getting swept into a future `git add -A`, which is harmless, but if larger film outputs ever land in this top-level folder (rather than the per-course `courses/<slug>/production/` path the rest of the pipeline uses), they would **not** be automatically excluded the way `courses/course-04-responsible-ai-publishing/production/film3d/Cambium-C04-ColdOpen-TheRecord.mp4` currently is. Worth a one-line addition to `.gitignore` (e.g. a bare `/production/` rule) next time someone is already touching that file; not urgent tonight since nothing large is there yet.

### Is anything from C03 or earlier unpushed?

No. C03's only uncommitted change is the same cosmetic CRLF diff on one CSV, covered above. Everything else for C01, C02, and C03 is already committed at `0bbdd4e` or earlier and already confirmed live (see the fetch table above). Course 05 has not been started beyond `KICKOFF.md`, which is already committed too, so there is nothing pending there either.

## 3. Closing the GitHub secret-scanning alert (false positive)

The exclusion config, `.github/secret_scanning.yml`, is already committed and already live on `main` (it shipped in `0bbdd4e`, the same commit that is already pushed). It excludes `courses/*/web/lib/**`, confirmed to cover both course directories that actually have a `web/lib/`: `course-03-research-with-ai` and `course-04-responsible-ai-publishing`. This config prevents new false-positive alerts; it does not retroactively close the one that is already open. That is a manual step in the GitHub UI:

1. Open `https://github.com/pkjaslam/cambium-academy/security/secret-scanning` (or from the repo: Security tab, then "Secret scanning alerts" in the left sidebar).
2. Find and open the alert titled **"Mistral AI API Key"**, flagged in `courses/course-04-responsible-ai-publishing/web/lib/transformers.js`.
3. Read the code snippet GitHub shows: the match is the string `Mistral3ForConditionalGeneration`, a model class name in the vendored Transformers.js library (it sits next to `Gemma3ForConditionalGeneration` in the same list), not a credential.
4. Click the **"Close as"** dropdown near the top of the alert.
5. Choose **"False positive."**
6. Optionally leave a comment pointing at `.github/secret_scanning.yml` and the reasoning written into that file, for anyone who finds the closed alert later.
7. While on that page, scan the rest of the alert list once for any second alert on `web-llm.js` (HANDOFF's own notes mention a self-scan turning up AWS-key-shaped byte runs, `AKIA...`, inside that file's base64 WASM blob; if GitHub's scanner separately flagged that one too, close it the same way with the same reasoning: coincidental bytes in a vendored binary blob, not a credential).

## 4. Post-push smoke checklist

The course is already live, so most of these can be clicked right now; they do not need to wait for the small documentation push above. Items marked VERIFIED were already fetched and confirmed (HTTP 200, correct content) during this session. Everything else needs an actual human click, especially anything interactive or anything that depends on a real GPU (WebGPU), since the automated sweep in this sandbox only checks that each page loads cleanly in headless Chromium on software rendering; it does not exercise in-browser model loading or click through gameplay.

- [x] **VERIFIED** Course page: `https://pkjaslam.github.io/cambium-academy/courses/course-04-responsible-ai-publishing/web/index.html`
- [x] **VERIFIED** Catalog card: `https://pkjaslam.github.io/cambium-academy/start/` (confirm the C04 card is present, links to the course, and is not stuck on an old label)
- [ ] Share/preview image renders correctly: `https://pkjaslam.github.io/cambium-academy/assets/social-course04.png`
- [ ] Slides (80 slides, 12 modules, the "three chairs" thread): `https://pkjaslam.github.io/cambium-academy/courses/course-04-responsible-ai-publishing/web/slides.html`
- [ ] AI Lab / Ghost Citations grading live against Crossref from the browser: `https://pkjaslam.github.io/cambium-academy/courses/course-04-responsible-ai-publishing/web/playground.html`
- [ ] **The Local Referee**, needs a real WebGPU browser (Chrome/Edge 113+, or Safari 26+): confirm the airlock counter stays at 0 with DevTools open and the network offline, and that it degrades honestly on a non-WebGPU browser: `https://pkjaslam.github.io/cambium-academy/courses/course-04-responsible-ai-publishing/web/referee.html`
- [ ] **The Reference Auditor**, paste a small bibliography and confirm live Crossref resolution plus the in-browser semantic check: `https://pkjaslam.github.io/cambium-academy/courses/course-04-responsible-ai-publishing/web/auditor.html`
- [ ] Flashcards (FSRS spaced repetition, four-button grading, real due dates): `https://pkjaslam.github.io/cambium-academy/courses/course-04-responsible-ai-publishing/web/flashcards.html`
- [x] **VERIFIED (loads clean)** but click the actual pass gate: Quiz, 20 questions, 14 to pass: `https://pkjaslam.github.io/cambium-academy/courses/course-04-responsible-ai-publishing/web/quiz.html`
- [ ] The Screening Room (practice, known answers): `https://pkjaslam.github.io/cambium-academy/courses/course-04-responsible-ai-publishing/web/practice.html`
- [ ] The Author's Pack (disclosure builder + checklists, print CSS): `https://pkjaslam.github.io/cambium-academy/courses/course-04-responsible-ai-publishing/web/pack.html`
- [ ] The Practical, all 4 parts, especially Part D's Aira grading and the detector-accusation auto-fail guardrail: `https://pkjaslam.github.io/cambium-academy/courses/course-04-responsible-ai-publishing/web/practical.html`
- [ ] Certificate (CAMB-C04, chips DISCLOSE/REVIEW/SCREEN/DECIDE WELL, DESK-VERIFIED stamp after a Practical pass): `https://pkjaslam.github.io/cambium-academy/courses/course-04-responsible-ai-publishing/web/certificate.html`
- [ ] AI Classroom: `https://pkjaslam.github.io/cambium-academy/courses/course-04-responsible-ai-publishing/web/classroom.html`
- [ ] Community: `https://pkjaslam.github.io/cambium-academy/courses/course-04-responsible-ai-publishing/web/community.html`
- [ ] Capstone: `https://pkjaslam.github.io/cambium-academy/courses/course-04-responsible-ai-publishing/web/capstone.html`
- [ ] Career guide: `https://pkjaslam.github.io/cambium-academy/courses/course-04-responsible-ai-publishing/web/career.html`
- [ ] Transcript: `https://pkjaslam.github.io/cambium-academy/courses/course-04-responsible-ai-publishing/web/transcript.html`
- [ ] Changelog: `https://pkjaslam.github.io/cambium-academy/courses/course-04-responsible-ai-publishing/web/changelog.html`
- [ ] Resources (policy links): `https://github.com/pkjaslam/cambium-academy/blob/main/courses/course-04-responsible-ai-publishing/resources.md`
- [ ] Deck opens cleanly: PPTX and PDF in `courses/course-04-responsible-ai-publishing/slides/`

## 5. Blockers, plainly

1. **`cambium-academy\.git\index.lock` (real, needs a human to delete it).** This verification pass ran `git status` a few times to produce this report. Each time, git tried to refresh its index and warned `unable to unlink '.git/index.lock': Operation not permitted`, because this sandbox's mount layer would not let the Linux process remove the lock file it had just created. That empty, 0-byte file is still sitting on disk right now at `D:\IFC_SSD2\idaho_sae\Cambium\cambium-academy\.git\index.lock`, and since this sandbox mounts your real D: drive, it is the same physical file your native Windows git will see. Standard git refuses to run `add` or `commit` when that file already exists, regardless of who created it or why. **Before running `push_academy.bat` or any git command, check whether that file is still there and delete it if so.** If you skip this, `git add -A` and `git commit` will fail silently inside the batch script (it does not check errorlevel), the script will fall through to `git push`, and `push` will just report "Everything up-to-date" without your new changes ever having been committed. That would look like nothing went wrong while quietly leaving `HANDOFF.md`'s update unpushed.
2. **The secret-scanning alert does not close itself.** The config fix is already live; the actual "Mistral AI API Key" alert in the GitHub UI still needs the manual "Close as > False positive" click described in Section 3.
3. **Two cosmetic diffs, not a blocker, just a decision.** `push_academy.bat` and the C03 CSV both picked up Windows CRLF line endings with zero content change. Harmless either way; see Section 2 for the one-line command to drop them if you would rather not carry them into history.
4. **Not exercised by this pass: real-browser, real-GPU behavior.** The gates in this sandbox run on headless Chromium with software rendering (SwiftShader) and check that pages load without JS errors, broken images, clipped text, or empty renders. They do not load the actual WebLLM model weights, run WebGPU inference, or click through the lab games and The Practical's grading flow end to end. Those need the human smoke pass in Section 4, same as any prior release.
5. **Not a blocker, just awareness: this repo is live right now.** A new top-level `production/` folder with three small film-tooling scripts appeared partway through this verification pass, not created by this pass (see the addendum in Section 2). That means someone or something else is actively working in this same folder concurrently. If the Director is mid-edit on the lecture film while reading this report, re-run `git status` before trusting the exact file list above; it is a snapshot, not a lock.

## 6. Secret sweep (Section 3 of the task, authored files only)

Ran against all 285 git-tracked files excluding `courses/*/web/lib/**` (the vendored bundles), for the prefixes `sk-`, `hf_`, `AIza`, `ghp_`, `sk-ant-`, `gsk_`, `nvapi-`, `mr2_`.

A literal, unanchored substring grep for those prefixes is **not** zero hits, but every hit is an English word or a URL fragment, not a key: `ask-chat`, `ask-community`, `desk-rejects`, `Desk-Verified`, `risk-of-bias`, `mask-image` (CSS), a Wharton URL slug ending `...shouldnt-ask-chatbots-to-act-like-an-expert`, and `HANDOFF.md`'s own line documenting this exact check (which quotes the prefixes in backticks as part of describing the sweep, not as a leaked key). None of `hf_`, `AIza`, `ghp_`, `gsk_`, or `nvapi-` matched anything, literal or otherwise, anywhere in authored files.

Tightening the check to prefix plus a realistic minimum key-length tail (15 to 20+ further alphanumeric characters, no further hyphens, which rules out hyphenated English phrases and URL slugs while still matching real key shapes) returns:

```
grep_exit=1
0 hits
```

**Zero hits, confirmed.** This matches `HANDOFF.md`'s own claim of a clean full-repo sweep. As a side check (not required, and not exhaustive), the same tightened pattern was tried against the excluded `web/lib` bundles and immediately produced enormous matches inside `web-llm.js`'s base64-encoded WASM blob, exactly the coincidental-byte-run behavior `HANDOFF.md` already documents as the reason that file is excluded. That confirms the exclusion is doing real work and is not just a rubber stamp.
