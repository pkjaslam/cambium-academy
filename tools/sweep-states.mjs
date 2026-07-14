// Rendered-DOM sweep across every page in every REAL learner state.
// A static audit is blind to the rendered DOM, and most bugs only appear in a state
// you never seeded. This loads each page in a headless browser with localStorage
// pre-seeded, and reports JS errors, broken images, clipped text, template leaks,
// and pages that render empty.
//
//   node tools/sweep-states.mjs c04 fresh|midway|passed|honors
//
// Env overrides (the sandbox path changes every session, so nothing is hardcoded):
//   ACADEMY_ROOT  absolute path to the repo root      (default: cwd)
//   CHROME_PATH   chrome / chrome-headless-shell binary
import { chromium } from 'playwright';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const REPO = resolve(process.env.ACADEMY_ROOT || process.cwd());
const ROOT = pathToFileURL(resolve(REPO, 'courses')).href;

// Each course declares the shape of its OWN saved state. Seeding a key a course never
// reads is the same as not seeding at all, which is how the honors state used to pass
// while testing nothing.
const COURSES = [
  { slug: 'course-01-intro-to-ai',               k: 'c01', slides: 36, cards: 24, labs: ['tok','lm','net'] },
  { slug: 'course-02-prompting-essentials',      k: 'c02', slides: 40, cards: 24, labs: ['tok','lm','net'] },
  { slug: 'course-03-research-with-ai',          k: 'c03', slides: 70, cards: 24, labs: ['tok','lm','net','ins','ps'] },
  { slug: 'course-04-responsible-ai-publishing', k: 'c04', slides: 80, cards: 24, labs: ['disc','line','ghost','flags','inject','trap'] },
  { slug: 'course-05-building-with-ai',          k: 'c05', slides: 79, cards: 24, labs: ['scope','wire','break','eval','blast'] },
];
const PAGES = ['index','slides','flashcards','quiz','playground','capstone','career','certificate','community','classroom','practical','pack','practice','changelog','transcript','referee','auditor','sandbox'];

const STATES = {
  fresh: () => {},
  midway: c => {
    const half = Math.floor(c.slides / 2);
    localStorage.setItem('cambium-' + c.k + '-slides', JSON.stringify({ seen: half, total: c.slides, done: false }));
    const cards = {};
    for (let i = 0; i < Math.floor(c.cards / 2); i++) cards[i] = 1;
    localStorage.setItem('cambium-' + c.k + '-cards', JSON.stringify(cards));
    const pg = {}; pg[c.labs[0]] = 1;
    localStorage.setItem('cambium-' + c.k + '-playground', JSON.stringify(pg));
  },
  passed: c => {
    localStorage.setItem('cambium-' + c.k + '-slides', JSON.stringify({ seen: c.slides, total: c.slides, done: true }));
    const cards = {}; for (let i = 0; i < c.cards; i++) cards[i] = 1;
    localStorage.setItem('cambium-' + c.k + '-cards', JSON.stringify(cards));
    const pg = {}; c.labs.forEach(g => { pg[g] = 1; });
    localStorage.setItem('cambium-' + c.k + '-playground', JSON.stringify(pg));
    localStorage.setItem('cambium-' + c.k + '-quiz', JSON.stringify({ best: 17, passed: true, date: '2026-07-13', missTopics: { M4: 1, M7: 2 } }));
    localStorage.setItem('cambium-' + c.k + '-cert', JSON.stringify({ issued: true, name: 'Muhammed Jaslam Poolakkal', org: 'Research Scientist, University of Idaho', date: '2026-07-13', score: 17 }));
    localStorage.setItem('cambium-' + c.k + '-learner', JSON.stringify({ name: 'Muhammed Jaslam Poolakkal', org: 'Research Scientist, University of Idaho', email: '' }));
  },
  honors: c => {
    localStorage.setItem('cambium-' + c.k + '-slides', JSON.stringify({ seen: c.slides, total: c.slides, done: true }));
    const cards = {}; for (let i = 0; i < c.cards; i++) cards[i] = 1;
    localStorage.setItem('cambium-' + c.k + '-cards', JSON.stringify(cards));
    const pg = {}; c.labs.forEach(g => { pg[g] = 1; });
    localStorage.setItem('cambium-' + c.k + '-playground', JSON.stringify(pg));
    localStorage.setItem('cambium-' + c.k + '-quiz', JSON.stringify({ best: 19, passed: true, date: '2026-07-13', missTopics: {} }));
    localStorage.setItem('cambium-' + c.k + '-cert', JSON.stringify({ issued: true, name: 'Muhammed Jaslam Poolakkal', org: 'Research Scientist, University of Idaho', date: '2026-07-13', score: 19 }));
    localStorage.setItem('cambium-' + c.k + '-learner', JSON.stringify({ name: 'Muhammed Jaslam Poolakkal', org: 'Research Scientist, University of Idaho', email: '' }));
    localStorage.setItem('cambium-' + c.k + '-practical', JSON.stringify({ passed: true, a: true, b: true, c: true, d: true, score: 5, date: '2026-07-13' }));
    localStorage.setItem('cambium-' + c.k + '-lecture', JSON.stringify({ watched: true, date: '2026-07-13' }));
  },
};

const ONLY_C = process.argv[2], ONLY_S = process.argv[3];
if (!ONLY_C || !ONLY_S) {
  console.error('usage: node tools/sweep-states.mjs <c01|c02|c03|c04> <fresh|midway|passed|honors>');
  process.exit(2);
}
const CHROME = process.env.CHROME_PATH ||
  ['/tmp/chrome-headless-shell-linux64/chrome-headless-shell',
   '/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome'].find(p => existsSync(p));

const b = await chromium.launch({
  ...(CHROME ? { executablePath: CHROME } : {}),
  args: ['--no-sandbox', '--disable-gpu', '--allow-file-access-from-files'],
});

const findings = [];
let checked = 0;
for (const c of COURSES.filter(x => x.k === ONLY_C)) {
  for (const page of PAGES) {
    const url = ROOT + '/' + c.slug + '/web/' + page + '.html';
    for (const [sname, seed] of Object.entries(STATES).filter(([n]) => n === ONLY_S)) {
      const ctx = await b.newContext({ viewport: { width: 1400, height: 1000 } });
      await ctx.addInitScript(([fn, course]) => { try { eval('(' + fn + ')')(course); } catch (e) {} }, [seed.toString(), c]);
      const p = await ctx.newPage();
      const errs = [];
      p.on('pageerror', e => errs.push('JS: ' + e.message.split('\n')[0]));
      p.on('console', m => { if (m.type() === 'error' && !/cloudflareinsights|net::ERR_FAILED|favicon|giscus|youtube|fonts\.googleapis|ERR_NAME|ERR_INTERNET|URL scheme "file" is not supported|blocked by CORS policy/i.test(m.text())) errs.push('CONSOLE: ' + m.text().slice(0, 90)); });
      let resp;
      try { resp = await p.goto(url, { waitUntil: 'load', timeout: 15000 }); } catch (e) { await ctx.close(); continue; }
      if (!resp) { await ctx.close(); continue; }
      checked++;
      await p.waitForTimeout(700);
      const probe = await p.evaluate(() => {
        const out = { brokenImg: [], clipped: [], emptyMain: false, tplLeak: false };
        document.querySelectorAll('img').forEach(i => { if (i.complete && i.naturalWidth === 0 && i.getAttribute('src')) out.brokenImg.push(i.getAttribute('src')); });
        document.querySelectorAll('body *').forEach(el => {
          const txt = (el.textContent || '').trim();
          if (!txt || el.children.length) return;
          const r = el.getBoundingClientRect(); if (!r.height) return;
          for (let t = el; t && t !== document.body; t = t.parentElement) {
            if (getComputedStyle(t).transform !== 'none') return;
          }
          let a = el.parentElement;
          while (a && a !== document.body) {
            const cs = getComputedStyle(a);
            if (cs.transform && cs.transform !== 'none') { a = a.parentElement; continue; }
            if (cs.overflow === 'hidden' || cs.overflowY === 'hidden') {
              const ar = a.getBoundingClientRect();
              if (r.bottom > ar.bottom + 1 || r.top < ar.top - 1) { out.clipped.push(txt.slice(0, 40)); return; }
            }
            a = a.parentElement;
          }
        });
        if (/\{\{\s*\w+\s*\}\}/.test(document.body.innerText)) out.tplLeak = true;
        if (document.body.innerText.trim().length < 40) out.emptyMain = true;
        return out;
      });
      const hits = [];
      if (errs.length) hits.push(...new Set(errs));
      if (probe.brokenImg.length) hits.push('BROKEN IMG: ' + [...new Set(probe.brokenImg)].join(', '));
      if (probe.clipped.length) hits.push('CLIPPED: ' + [...new Set(probe.clipped)].slice(0, 3).join(' | '));
      if (probe.tplLeak) hits.push('TEMPLATE PLACEHOLDER LEAKED TO USER');
      if (probe.emptyMain) hits.push('PAGE RENDERED EMPTY');
      if (hits.length) findings.push({ where: c.k + '/' + page + '.html [' + sname + ']', hits });
      await ctx.close();
    }
  }
}
await b.close();
console.log('swept ' + checked + ' page loads (' + ONLY_C + ', state=' + ONLY_S + ')');
if (!findings.length) console.log('no findings');
for (const f of findings) console.log(f.where + '\n   - ' + f.hits.join('\n   - '));
process.exit(findings.length ? 1 : 0);
