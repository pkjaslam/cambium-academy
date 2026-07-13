import { chromium } from 'playwright';
const ROOT = 'file:///sessions/happy-funny-ramanujan/mnt/Cambium/cambium-academy/courses';
const COURSES = [
  { slug: 'course-01-intro-to-ai', k: 'c01' },
  { slug: 'course-02-prompting-essentials', k: 'c02' },
  { slug: 'course-03-research-with-ai', k: 'c03' },
];
const PAGES = ['index','slides','flashcards','quiz','playground','capstone','career','certificate','community','classroom','practical','pack','practice','changelog','transcript'];
// Real learner states, not just the default one.
const STATES = {
  fresh: () => {},
  midway: k => { localStorage.setItem(`cambium-${k}-progress`, JSON.stringify({slide:20,seen:20})); },
  passed: k => { localStorage.setItem(`cambium-${k}-quiz`, JSON.stringify({best:17,passed:true,date:'2026-07-13'}));
                 localStorage.setItem(`cambium-${k}-cert`, JSON.stringify({issued:true,name:'Muhammed Jaslam Poolakkal',org:'Research Scientist, University of Idaho',date:'2026-07-13',score:17})); },
  honors: k => { localStorage.setItem(`cambium-${k}-quiz`, JSON.stringify({best:19,passed:true,date:'2026-07-13'}));
                 localStorage.setItem(`cambium-${k}-cert`, JSON.stringify({issued:true,name:'Muhammed Jaslam Poolakkal',org:'Research Scientist, University of Idaho',date:'2026-07-13',score:19}));
                 localStorage.setItem(`cambium-${k}-practical`, JSON.stringify({passed:true,score:5}));
                 ['tok','lm','net','ins','ps'].forEach(g => localStorage.setItem(`cambium-${k}-lab-${g}`, '1')); },
};
const ONLY_C = process.argv[2], ONLY_S = process.argv[3];
const b = await chromium.launch({ executablePath: '/tmp/c03film/chrome-headless-shell-linux64/chrome-headless-shell', args: ['--no-sandbox','--disable-gpu','--allow-file-access-from-files'] });
const findings = [];
for (const c of COURSES.filter(c => c.k === ONLY_C)) {
  for (const page of PAGES) {
    const url = `${ROOT}/${c.slug}/web/${page}.html`;
    for (const [sname, seed] of Object.entries(STATES).filter(([n]) => n === ONLY_S)) {
      const ctx = await b.newContext({ viewport: { width: 1400, height: 1000 } });
      await ctx.addInitScript(([fn, k]) => { try { eval('(' + fn + ')')(k); } catch (e) {} }, [seed.toString(), c.k]);
      const p = await ctx.newPage();
      const errs = [];
      p.on('pageerror', e => errs.push('JS: ' + e.message.split('\n')[0]));
      p.on('console', m => { if (m.type() === 'error' && !/cloudflareinsights|net::ERR_FAILED|favicon/i.test(m.text())) errs.push('CONSOLE: ' + m.text().slice(0, 90)); });
      let resp;
      try { resp = await p.goto(url, { waitUntil: 'load', timeout: 12000 }); } catch (e) { await ctx.close(); continue; }
      if (!resp || resp.status() === 0 && !resp.ok()) { await ctx.close(); continue; }
      await p.waitForTimeout(700);
      const probe = await p.evaluate(() => {
        const out = { brokenImg: [], clipped: [], emptyMain: false, tplLeak: false };
        document.querySelectorAll('img').forEach(i => { if (i.complete && i.naturalWidth === 0 && i.getAttribute('src')) out.brokenImg.push(i.getAttribute('src')); });
        // content clipped by an overflow:hidden ancestor (what hid the certificate footnote)
        document.querySelectorAll('body *').forEach(el => {
          const txt = (el.textContent || '').trim();
          if (!txt || el.children.length) return;
          const r = el.getBoundingClientRect(); if (!r.height) return;
          // any rotated/scaled ancestor makes axis-aligned box comparison meaningless
          for (let t = el; t && t !== document.body; t = t.parentElement) {
            if (getComputedStyle(t).transform !== 'none') return;
          }
          let a = el.parentElement;
          while (a && a !== document.body) {
            const cs = getComputedStyle(a);
            if (cs.transform && cs.transform !== 'none') { a = a.parentElement; continue; } // rotated: bbox compare is meaningless
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
      if (probe.clipped.length) hits.push('CLIPPED: ' + [...new Set(probe.clipped)].slice(0,3).join(' | '));
      if (probe.tplLeak) hits.push('TEMPLATE PLACEHOLDER LEAKED TO USER');
      if (probe.emptyMain) hits.push('PAGE RENDERED EMPTY');
      if (hits.length) findings.push({ where: `${c.k}/${page}.html [${sname}]`, hits });
      await ctx.close();
    }
  }
}
await b.close();
if (!findings.length) console.log('no findings');
for (const f of findings) console.log(f.where + '\n   - ' + f.hits.join('\n   - '));
