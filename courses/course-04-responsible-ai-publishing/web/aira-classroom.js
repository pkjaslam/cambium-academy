// Aira · AI Classroom v2: the persistent, ADAPTIVE in-lesson AI teaching assistant for Cambium Academy.
// Embeds into <div id="aira-classroom"></div>. Reads the lesson context from window.AIRA_LESSON
// and answers/examples/visuals/summaries about THAT lesson via the Aira Cloudflare worker
// (window.AIRA_CHAT.endpoint).
// v2 upgrades: (1) student-aware: reads this course's saved progress (slides, flashcards,
// missed cards, lab games, quiz) from THIS browser and personalizes greetings, next steps,
// and drills; (2) richer code-drawn visuals: flow, concept map, comparison table, and
// before/after, chosen by Aira per question; (3) spoken replies via the browser's own voice
// (clearly labeled); (4) chat memory across course pages and a small answer cache to stretch
// the free quota. Privacy: questions go only to Aira's service; progress, memory, and the
// cache never leave the learner's browser.
(function(){
  var host = document.getElementById("aira-classroom");
  if (!host) return;
  var IMG = "../../../assets/aira-face.jpg";
  var L = window.AIRA_LESSON || { course: "Cambium Academy", module: "This lesson", topic: "this topic", points: [], next: null };

  if (!window.AIRA_CHAT) { var cfg = document.createElement("script"); cfg.src = "aira-chat-config.js"; document.head.appendChild(cfg); }
  function ready(){ return window.AIRA_CHAT && typeof window.AIRA_CHAT.endpoint === "string" && window.AIRA_CHAT.endpoint.length > 8; }

  // ---------- local state: progress reader + classroom store ----------
  function rd(k){ try { return JSON.parse(localStorage.getItem(k) || "null"); } catch(e){ return null; } }
  var SKEY = "cambium-c04-classroom";
  var store = rd(SKEY) || {};
  store.hist = Array.isArray(store.hist) ? store.hist.slice(-8) : [];
  store.cache = store.cache && typeof store.cache === "object" ? store.cache : {};
  store.set = store.set && typeof store.set === "object" ? store.set : { voice: 0 };
  function saveStore(){ try { localStorage.setItem(SKEY, JSON.stringify(store)); } catch(e){} }

  var LABNAMES = { disc: "Declare It", line: "Assist or Misconduct", ghost: "Ghost Citations", flags: "Red Flags", inject: "The Poisoned Manuscript", trap: "The Detector Trap" };
  function courseState(){
    var cards = rd("cambium-c04-cards") || {};
    var miss = rd("cambium-c04-cardmiss") || {};
    var pg = rd("cambium-c04-playground") || {};
    var quiz = rd("cambium-c04-quiz") || {};
    var slides = rd("cambium-c04-slides") || {};
    var lecture = rd("cambium-c04-lecture") || {};
    var cert = rd("cambium-c04-cert") || {};
    var learner = rd("cambium-c04-learner") || {};
    var missList = Object.keys(miss).map(function(k){ return miss[k]; }).filter(function(e){ return e && e.f && e.n; });
    missList.sort(function(a, b){ return b.n - a.n; });
    var labsLeft = ["disc","line","ghost","flags","inject","trap"].filter(function(k){ return !pg[k]; }).map(function(k){ return LABNAMES[k]; });
    var s = {
      name: (cert.name || learner.name || "").split(" ")[0] || "",
      slidesSeen: slides.seen || 0,
      lectureDone: (slides.seen || 0) >= 80 || !!lecture.watched,
      cardsKnown: Object.keys(cards).length,
      missTop: missList.slice(0, 3),
      labsDone: 6 - labsLeft.length,
      labsLeft: labsLeft,
      quizBest: quiz.best || 0,
      quizMiss: quiz.missTopics || {},
      quizPassed: !!quiz.passed,
      certIssued: !!cert.issued
    };
    s.anything = s.slidesSeen > 0 || s.cardsKnown > 0 || s.labsDone > 0 || s.quizBest > 0;
    return s;
  }
  function nextStepText(s){
    if (s.certIssued) return "You have finished this course, certificate and all. Try The Practical for the honors stamp, or the capstone to make it real. I am proud of you.";
    if (!s.lectureDone) return "Finish the lecture first: " + (s.slidesSeen > 0 ? "you are " + s.slidesSeen + " of 80 slides in, keep going." : "start the slides above, about 50 minutes.");
    if (s.cardsKnown < 24) return "The lecture is done. Next: the flashcards, " + s.cardsKnown + " of 24 marked known so far" + (s.missTop.length ? ", and I can drill the ones you keep missing" : "") + ".";
    if (s.labsDone < 6) return "Lecture and flashcards done. Next: win " + s.labsLeft.join(", ") + " in the AI Lab.";
    if (!s.quizPassed) return "Your whole path is complete, so the quiz is unlocked. Twenty questions, fourteen to pass" + (s.quizBest ? ", and your best so far is " + s.quizBest + " of 20" : "") + ". Go get your certificate.";
    return "Quiz passed with " + s.quizBest + " of 20. Print your certificate on the certificate page, then The Practical if you want the honors stamp.";
  }
  function snapshotLine(s){
    if (!s.anything) return "";
    var bits = [];
    if (s.name) bits.push("name " + s.name);
    bits.push("slides " + Math.min(s.slidesSeen, 80) + "/80" + (s.lectureDone ? " (lecture done)" : ""));
    bits.push("flashcards " + s.cardsKnown + "/24 known");
    if (s.missTop.length) bits.push("keeps missing: " + s.missTop.map(function(e){ return '"' + e.f + '" (' + e.m + ')'; }).join(", "));
    bits.push("AI Lab " + s.labsDone + "/6 games won" + (s.labsLeft.length ? " (left: " + s.labsLeft.join(", ") + ")" : ""));
    if (s.quizBest) bits.push("quiz best " + s.quizBest + "/20" + (s.quizPassed ? " passed" : ""));
    var qmk = Object.keys(s.quizMiss || {}).sort(function(x,y){ return s.quizMiss[y]-s.quizMiss[x]; });
    if (qmk.length) bits.push("quiz misses concentrated in module " + qmk.slice(0,2).map(function(k){ return k.replace("M",""); }).join(" and "));
    return "Student progress snapshot (read from their device, this course only): " + bits.join("; ") + ".";
  }
  var ST = courseState();

  function SYS(){
    return "You are Aira, the warm, encouraging AI teacher for Cambium Academy course " + L.course + ". " +
    "The student is on: " + L.module + ", topic: " + L.topic + ". " +
    "Key points of this lesson: " + ((L.points || []).join("; ") || "the lesson main ideas") + ". " +
    (snapshotLine(ST) ? snapshotLine(ST) + " Use this to personalize, gently and specifically, without repeating the whole list back. " : "") +
    "Teach like a kind, concise tutor: under 120 words, plain language, tied to this lesson. Never invent facts, stats, or citations; if unsure, say so and say how to verify.";
  }
  var VISUAL_ASK = "Design one small visual that best explains this lesson topic for a beginner, choosing the best-fitting type. " +
    "Reply with ONLY a JSON object, no prose, no markdown, no code fences. Choose exactly one of these shapes: " +
    '{"type":"flow","steps":["3 to 5 short steps"]} for a process; ' +
    '{"type":"map","center":"main idea","branches":[{"label":"short","sub":"few words"}]} with 3 to 6 branches for related concepts; ' +
    '{"type":"table","title":"short","cols":["A","B"],"rows":[["cell","cell"]]} with 2 or 3 columns and 2 to 5 rows for comparisons; ' +
    '{"type":"beforeafter","before":{"title":"short","text":"one sentence"},"after":{"title":"short","text":"one sentence"}} for a habit change. ' +
    "Every string stays under 60 characters.";
  var FLOW_ASK = "Break this lesson topic into a simple step-by-step flow for a beginner. " +
    "Reply with ONLY a JSON object and nothing else: it must have a single key named steps whose value is an array of 3 to 5 short strings, each just a few words. " +
    "No prose, no markdown, no code fences.";

  // ---------- styles ----------
  var css = document.createElement("style");
  css.textContent =
    "#aira-classroom{--f:#2C5F2D;--m:#97BC62;--g:#D9B25C;--ink:#1F2A20;--mut:#5C6B5A;--line:#DFE9D8;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;color:var(--ink);background:linear-gradient(180deg,#fff,#F6F8F4);border:1px solid var(--line);border-radius:18px;box-shadow:0 12px 40px rgba(31,42,32,.10);overflow:hidden;max-width:760px}" +
    "#aira-classroom .ac-hd{display:flex;gap:12px;align-items:center;background:linear-gradient(135deg,#1F3D24,#2C5F2D);color:#fff;padding:14px 18px}" +
    "#aira-classroom .ac-hd img{width:46px;height:46px;border-radius:50%;object-fit:cover;border:2px solid var(--m)}" +
    "#aira-classroom .ac-hd b{font-family:'Sora',sans-serif;font-size:16px;display:block}" +
    "#aira-classroom .ac-hd span{font-size:10.5px;color:var(--m);letter-spacing:1.5px}" +
    "#aira-classroom .ac-hd .tag{margin-left:auto;font-size:9.5px;font-weight:700;color:#1F3D24;background:var(--m);border-radius:8px;padding:3px 8px;letter-spacing:1px}" +
    "#aira-classroom .ac-hd .vc{background:none;border:1px solid rgba(151,188,98,.6);color:#DDEEC9;border-radius:8px;padding:4px 9px;font-size:11px;font-weight:700;cursor:pointer;margin-left:8px}" +
    "#aira-classroom .ac-hd .vc.on{background:var(--m);color:#1F3D24}" +
    "#aira-classroom .ac-body{padding:16px 18px}" +
    "#aira-classroom .ac-chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px}" +
    "#aira-classroom .ac-chips button{background:#F0F5EC;color:var(--f);border:1px solid var(--line);border-radius:20px;padding:9px 14px;font-size:13px;font-weight:700;cursor:pointer;transition:all .15s}" +
    "#aira-classroom .ac-chips button:hover{background:#E2EDD5;transform:translateY(-1px)}" +
    "#aira-classroom .ac-chips button.on{background:var(--f);color:#fff;border-color:var(--f)}" +
    "#aira-classroom .ac-chips button.gold{background:#FBF3DC;border-color:#E4CE96;color:#8C6320}" +
    "#aira-classroom .ac-out{min-height:64px;background:#fff;border:1px solid var(--line);border-radius:12px;padding:14px 16px;font-size:14px;line-height:1.6}" +
    "#aira-classroom .ac-out .ac-ans b{color:var(--f)}" +
    "#aira-classroom .ac-hello{color:var(--mut)}" +
    "#aira-classroom .ac-think{color:var(--mut);font-style:italic}" +
    "#aira-classroom .ac-err{color:#B3372E}" +
    "#aira-classroom .ac-svg{overflow:auto;text-align:center}" +
    "#aira-classroom .ac-svg svg{max-width:100%;height:auto}" +
    "#aira-classroom .ac-cap{margin-top:8px;font-size:12px;color:var(--mut);font-style:italic;text-align:center}" +
    "#aira-classroom table.ac-tbl{width:100%;border-collapse:separate;border-spacing:0;font-size:13px;border:1px solid var(--line);border-radius:10px;overflow:hidden;margin-top:4px}" +
    "#aira-classroom table.ac-tbl th{background:#2C5F2D;color:#F2F8EA;text-align:left;padding:8px 11px;font-weight:600}" +
    "#aira-classroom table.ac-tbl td{padding:8px 11px;border-top:1px solid #F0E9D6;background:#FFFEFA;vertical-align:top}" +
    "#aira-classroom .ac-ba{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:4px}" +
    "#aira-classroom .ac-ba .pane{border:1px solid var(--line);border-radius:10px;padding:11px 13px;font-size:13px;background:#FFFEFA}" +
    "#aira-classroom .ac-ba .pane.b4{background:#FBF3E4;border-color:#EAD9B8}" +
    "#aira-classroom .ac-ba .pane b{display:block;margin-bottom:4px;color:var(--f)}" +
    "#aira-classroom .ac-ba .pane.b4 b{color:#8C6320}" +
    "#aira-classroom .ac-say{margin-top:10px;background:none;border:1px solid var(--line);border-radius:16px;color:var(--f);font-size:12px;font-weight:700;padding:6px 12px;cursor:pointer}" +
    "#aira-classroom .ac-say:hover{background:#F0F5EC}" +
    "#aira-classroom .ac-row{display:none;gap:8px;margin-top:12px}" +
    "#aira-classroom .ac-row input{flex:1;padding:10px 13px;font-size:14px;border:1.5px solid var(--line);border-radius:10px;font-family:inherit}" +
    "#aira-classroom .ac-row input:focus{outline:none;border-color:var(--m)}" +
    "#aira-classroom .ac-row button{background:var(--f);color:#fff;border:0;border-radius:10px;padding:10px 16px;font-size:14px;font-weight:700;cursor:pointer}" +
    "#aira-classroom .ac-foot{font-size:11px;color:var(--mut);padding:0 18px 14px}" +
    "@media (max-width:560px){#aira-classroom .ac-ba{grid-template-columns:1fr}}" +
    "@media print{#aira-classroom{display:none}}";
  document.head.appendChild(css);

  function esc(s){ return String(s == null ? "" : s).replace(/[&<>]/g, function(c){ return { "&":"&amp;", "<":"&lt;", ">":"&gt;" }[c]; }); }
  function fmt(t){ return esc(t).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/^\s*[-*]\s+/gm, "&#8226; ").replace(/\n/g, "<br>"); }

  // ---------- visuals: parse Aira's JSON and draw in code ----------
  function jsonIn(t){ var m = String(t).match(/\{[\s\S]*\}/); if (!m) return null; try { return JSON.parse(m[0]); } catch(e){ return null; } }
  function parseSteps(t){
    var o = jsonIn(t);
    if (o && o.steps && o.steps.length) return o.steps.map(String);
    var lines = String(t).split(/\n+/).filter(function(x){ return /^\s*(\d+[.)]|[-*•])\s+/.test(x); })
      .map(function(x){ return x.replace(/^\s*(\d+[.)]|[-*•])\s*/, "").trim(); })
      .filter(function(x){ return x.length > 1 && x.length < 90; });
    return lines.length >= 2 ? lines.slice(0, 5) : null;
  }
  function wrapText(t, max){ var w = String(t).split(/\s+/), lines = [], cur = ""; for (var i=0;i<w.length;i++){ if ((cur + " " + w[i]).trim().length <= max) cur = (cur + " " + w[i]).trim(); else { if (cur) lines.push(cur); cur = w[i]; } } if (cur) lines.push(cur); return lines.slice(0, 2); }
  function renderFlow(steps){
    steps = (steps || []).filter(function(x){ return x && String(x).trim(); }).slice(0, 5);
    if (steps.length < 2) return null;
    var W = 460, bh = 54, gap = 26, pad = 14, cx = W / 2;
    var H = pad * 2 + steps.length * bh + (steps.length - 1) * gap;
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" font-family="DM Sans, Segoe UI, Arial, sans-serif">';
    for (var i = 0; i < steps.length; i++){
      var y = pad + i * (bh + gap);
      s += '<rect x="34" y="' + y + '" width="' + (W - 68) + '" height="' + bh + '" rx="12" fill="#EAF3E0" stroke="#97BC62" stroke-width="1.5"/>';
      s += '<circle cx="60" cy="' + (y + bh / 2) + '" r="14" fill="#2C5F2D"/>';
      s += '<text x="60" y="' + (y + bh / 2 + 4) + '" fill="#ffffff" font-size="13" font-weight="700" text-anchor="middle">' + (i + 1) + '</text>';
      var lines = wrapText(steps[i], 42);
      var ty = y + bh / 2 + (lines.length > 1 ? -3 : 4);
      for (var k = 0; k < lines.length; k++){ s += '<text x="86" y="' + (ty + k * 16) + '" fill="#1F2A20" font-size="13">' + esc(lines[k]) + '</text>'; }
      if (i < steps.length - 1){ var ay = y + bh; s += '<line x1="' + cx + '" y1="' + ay + '" x2="' + cx + '" y2="' + (ay + gap - 2) + '" stroke="#D9B25C" stroke-width="2"/><polygon points="' + (cx - 5) + ',' + (ay + gap - 8) + ' ' + (cx + 5) + ',' + (ay + gap - 8) + ' ' + cx + ',' + (ay + gap - 1) + '" fill="#D9B25C"/>'; }
    }
    return s + '</svg>';
  }
  function renderMap(o){
    if (!o || !o.center || !o.branches || o.branches.length < 2) return null;
    var br = o.branches.slice(0, 6);
    var W = 520, H = 90 + Math.ceil(br.length / 2) * 96, cx = W / 2, cy = H / 2;
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" font-family="DM Sans, Segoe UI, Arial, sans-serif">';
    var pos = [];
    for (var i = 0; i < br.length; i++){
      var side = i % 2 === 0 ? -1 : 1;
      var rowN = Math.floor(i / 2), rows = Math.ceil(br.length / 2);
      var by = 52 + rowN * ((H - 104) / Math.max(rows - 1, 1));
      if (rows === 1) by = cy;
      pos.push([cx + side * 178, by]);
    }
    for (var j = 0; j < br.length; j++){ s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + pos[j][0] + '" y2="' + pos[j][1] + '" stroke="#D9B25C" stroke-width="1.6"/>'; }
    for (var k2 = 0; k2 < br.length; k2++){
      var b = br[k2], px = pos[k2][0], py = pos[k2][1];
      s += '<rect x="' + (px - 78) + '" y="' + (py - 26) + '" width="156" height="52" rx="10" fill="#EAF3E0" stroke="#97BC62" stroke-width="1.4"/>';
      var lab = wrapText(b.label || "", 22);
      var suby = b.sub ? 1 : 0;
      for (var m2 = 0; m2 < lab.length; m2++){ s += '<text x="' + px + '" y="' + (py - 6 + m2 * 14 + (lab.length === 1 ? 2 : -4) + (suby ? -2 : 8)) + '" fill="#1F2A20" font-size="12" font-weight="700" text-anchor="middle">' + esc(lab[m2]) + '</text>'; }
      if (b.sub) s += '<text x="' + px + '" y="' + (py + 16) + '" fill="#5C6B5A" font-size="10.5" text-anchor="middle">' + esc(String(b.sub).slice(0, 28)) + '</text>';
    }
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="52" fill="#2C5F2D"/>';
    var cl = wrapText(o.center, 14);
    for (var n2 = 0; n2 < cl.length; n2++){ s += '<text x="' + cx + '" y="' + (cy + 4 + (n2 - (cl.length - 1) / 2) * 15) + '" fill="#FFFDF6" font-size="12.5" font-weight="700" text-anchor="middle">' + esc(cl[n2]) + '</text>'; }
    return s + '</svg>';
  }
  function renderTable(o){
    if (!o || !o.cols || o.cols.length < 2 || !o.rows || !o.rows.length) return null;
    var cols = o.cols.slice(0, 3), rows = o.rows.slice(0, 5);
    var h = '<table class="ac-tbl"><tr>' + cols.map(function(c){ return '<th>' + esc(c) + '</th>'; }).join("") + '</tr>';
    h += rows.map(function(r){ return '<tr>' + cols.map(function(_, i){ return '<td>' + esc((r || [])[i] || "") + '</td>'; }).join("") + '</tr>'; }).join("");
    return h + '</table>' + (o.title ? '<div class="ac-cap">' + esc(o.title) + '</div>' : "");
  }
  function renderBeforeAfter(o){
    if (!o || !o.before || !o.after) return null;
    function pane(p, cls, fallback){ return '<div class="pane ' + cls + '"><b>' + esc((p && p.title) || fallback) + '</b>' + esc((p && p.text) || "") + '</div>'; }
    return '<div class="ac-ba">' + pane(o.before, "b4", "Before") + pane(o.after, "", "After") + '</div>';
  }
  function renderVisual(t){
    var o = jsonIn(t);
    if (o){
      if (o.type === "map"){ var mm = renderMap(o); if (mm) return { html: '<div class="ac-svg">' + mm + '</div>', cap: "Aira mapped the concepts around " } ; }
      if (o.type === "table"){ var tt = renderTable(o); if (tt) return { html: tt, cap: "Aira compared the sides of " }; }
      if (o.type === "beforeafter"){ var ba = renderBeforeAfter(o); if (ba) return { html: ba, cap: "Aira showed the habit change in " }; }
      if (o.type === "flow" || o.steps){ var ff = renderFlow(o.steps); if (ff) return { html: '<div class="ac-svg">' + ff + '</div>', cap: "Aira mapped out " }; }
    }
    var fs = renderFlow(parseSteps(t));
    if (fs) return { html: '<div class="ac-svg">' + fs + '</div>', cap: "Aira mapped out " };
    return null;
  }

  // ---------- voice: the browser's own speech, clearly labeled ----------
  var canSpeak = typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
  function pickVoice(){
    if (!canSpeak) return null;
    var vs = window.speechSynthesis.getVoices() || [];
    var prefs = ["Samantha","Google UK English Female","Microsoft Aria","Microsoft Zira","Google US English","Karen","Moira"];
    for (var i = 0; i < prefs.length; i++){ for (var j = 0; j < vs.length; j++){ if (vs[j].name.indexOf(prefs[i]) === 0) return vs[j]; } }
    for (var k = 0; k < vs.length; k++){ if (/^en/i.test(vs[k].lang)) return vs[k]; }
    return vs[0] || null;
  }
  function plain(t){ return String(t).replace(/\*\*(.+?)\*\*/g, "$1").replace(/^\s*[-*•]\s*/gm, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(); }
  function speak(t){
    if (!canSpeak) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(plain(t).slice(0, 900));
      var v = pickVoice(); if (v) u.voice = v;
      u.rate = 0.98; u.pitch = 1.05;
      window.speechSynthesis.speak(u);
    } catch(e){}
  }
  if (canSpeak && window.speechSynthesis.onvoiceschanged === null) window.speechSynthesis.onvoiceschanged = function(){};
  document.addEventListener("visibilitychange", function(){ if (document.hidden && canSpeak) window.speechSynthesis.cancel(); });

  // ---------- answer cache (stretches the free quota; lives only in this browser) ----------
  function hash(s){ var h = 5381; for (var i = 0; i < s.length; i++){ h = ((h << 5) + h + s.charCodeAt(i)) | 0; } return String(h); }
  var TTL = 7 * 24 * 3600 * 1000, CAP = 40;
  function cacheKey(q){ return hash((L.topic + "|" + q).toLowerCase().replace(/\s+/g, " ").trim()); }
  function cacheGet(q){
    var e = store.cache[cacheKey(q)];
    return (e && (Date.now() - e.t) < TTL) ? e.r : null;
  }
  function cacheSet(q, r){
    store.cache[cacheKey(q)] = { r: r, t: Date.now() };
    var ks = Object.keys(store.cache);
    if (ks.length > CAP){ ks.sort(function(a, b){ return store.cache[a].t - store.cache[b].t; }); for (var i = 0; i < ks.length - CAP; i++) delete store.cache[ks[i]]; }
    saveStore();
  }

  // ---------- greeting: personalized from progress ----------
  function greeting(){
    var s = ST;
    var hi = s.name ? "Hi " + esc(s.name) + "," : "Hi,";
    if (!s.anything) return hi + " I am Aira. I am right here in your lesson on <b>" + esc(L.topic) + "</b>, and I can see your course progress on this device as you go. Ask me anything, or tap a button and I will teach, show an example, draw a visual, or sum it up.";
    var bits = [];
    if (s.certIssued) bits.push("you have your certificate already, wonderful");
    else if (s.quizPassed) bits.push("quiz passed, go print that certificate");
    else {
      if (s.lectureDone) bits.push("lecture done");
      else if (s.slidesSeen > 0) bits.push("you are " + s.slidesSeen + " of 80 slides in");
      if (s.cardsKnown > 0) bits.push(s.cardsKnown + " of 24 cards known");
      if (s.labsDone > 0) bits.push(s.labsDone + " of 6 Lab games won");
      if (s.quizBest > 0 && !s.quizPassed) bits.push("quiz best " + s.quizBest + "/20, so close");
    }
    var g = hi + " welcome back to <b>" + esc(L.topic) + "</b>. I can see where you are: " + bits.join(", ") + ".";
    if (s.missTop.length) g += " I also noticed the flashcards you keep missing" + (s.missTop[0] ? ", like “" + esc(s.missTop[0].f) + "”" : "") + ": tap <b>Drill what I keep missing</b> and I will coach you through exactly those.";
    else g += " Ask me anything, or tap a button below.";
    return g;
  }

  // ---------- UI ----------
  var voiceOn = !!store.set.voice;
  host.innerHTML =
    '<div class="ac-hd"><img src="' + IMG + '" alt="Aira"><div><b>Aira · Your AI Classroom</b><span>AI TEACHING ASSISTANT · KNOWS YOUR PROGRESS</span></div>' +
      (canSpeak ? '<button class="vc' + (voiceOn ? ' on' : '') + '" id="acVoice" title="Aira reads answers aloud with your browser\'s voice">&#128266; ' + (voiceOn ? 'Voice on' : 'Voice off') + '</button>' : '') +
      '<span class="tag">AI</span></div>' +
    '<div class="ac-body">' +
      '<div class="ac-chips" id="acChips">' +
        '<button data-a="ask">Ask about this lesson</button>' +
        '<button data-a="example">Give me an example</button>' +
        '<button data-a="visual">Explain it visually</button>' +
        '<button data-a="summary">Summarize the key points</button>' +
        ((ST.missTop.length || Object.keys(ST.quizMiss||{}).length) ? '<button data-a="drill" class="gold">Drill what I keep missing</button>' : '') +
        '<button data-a="next">What should I do next?</button>' +
      '</div>' +
      '<div class="ac-out" id="acOut"><span class="ac-hello">' + greeting() + '</span></div>' +
      '<div class="ac-row" id="acRow"><input id="acIn" type="text" maxlength="500" placeholder="Type your question about this lesson..."><button id="acSend">Ask</button></div>' +
    '</div>' +
    '<div class="ac-foot">Aira is an AI creation of Cambium AI Research Institution. She can be wrong, so verify anything important. Your questions go only to Aira\'s service; your progress, chat memory, and her spoken voice (your browser\'s own) stay on this device.' +
      ((window.AIRA_CHAT && window.AIRA_CHAT.notice) ? ' ' + esc(window.AIRA_CHAT.notice) : '') + '</div>';

  var out = document.getElementById("acOut"), row = document.getElementById("acRow"),
      input = document.getElementById("acIn"), send = document.getElementById("acSend"), chips = document.getElementById("acChips");
  var busy = false, history = store.hist.slice(-8), svgTry = 0;

  var vbtn = document.getElementById("acVoice");
  if (vbtn) vbtn.addEventListener("click", function(){
    voiceOn = !voiceOn; store.set.voice = voiceOn ? 1 : 0; saveStore();
    vbtn.className = "vc" + (voiceOn ? " on" : ""); vbtn.innerHTML = "&#128266; " + (voiceOn ? "Voice on" : "Voice off");
    if (!voiceOn && canSpeak) window.speechSynthesis.cancel();
  });

  function sayButton(text){
    return canSpeak ? '<div><button class="ac-say" data-say="1">&#128266; Hear Aira say it</button></div>' : '';
  }
  function setOut(html){ out.innerHTML = html; }
  function setAnswer(reply, cached){
    setOut('<div class="ac-ans">' + fmt(reply) + '</div>' + sayButton() + (cached ? '<div class="ac-cap">From Aira\'s notebook: you asked this before, so no quota was spent.</div>' : ''));
    var sb = out.querySelector(".ac-say");
    if (sb) sb.addEventListener("click", function(){ speak(reply); });
    if (voiceOn) speak(reply);
  }
  function active(a){ Array.prototype.forEach.call(chips.querySelectorAll("button"), function(b){ b.classList.toggle("on", b.getAttribute("data-a") === a); }); }
  function remember(userMsg, reply){
    history.push({ role: "user", content: userMsg }); history.push({ role: "assistant", content: reply });
    if (history.length > 8) history = history.slice(-8);
    store.hist = history; saveStore();
  }

  function call(userMsg, opts){
    opts = opts || {};
    if (busy) return;
    if (!opts.noCache && !opts.keepHistory){
      var hit = cacheGet(opts.cacheAs || userMsg);
      if (hit){ if (opts.wantSvg){ var vh = renderVisual(hit); if (vh){ setOut(vh.html + '<div class="ac-cap">' + vh.cap + esc(L.topic) + ' · from Aira\'s notebook.</div>'); return; } } else { setAnswer(hit, true); return; } }
    }
    if (!ready()){
      setOut('<div class="ac-err">Aira answers here once this course is deployed on the site. The buttons and layout are all here; her replies light up on the live page.</div>');
      return;
    }
    busy = true; send.disabled = true;
    setOut('<div class="ac-think">Aira is thinking&#8230;</div>');
    var ctx = [{ role: "user", content: SYS() }, { role: "assistant", content: "Understood. I am Aira, ready to help with exactly this lesson and this student." }];
    var msgs = ctx.concat([{ role: "user", content: userMsg }]);
    if (opts.keepHistory && history.length) msgs = ctx.concat(history.slice(-3)).concat([{ role: "user", content: userMsg }]);
    fetch(window.AIRA_CHAT.endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: msgs }) })
      .then(function(r){ return r.json(); })
      .then(function(j){
        busy = false; send.disabled = false;
        var reply = (j && j.reply) ? j.reply : (j && j.error ? j.error : "I lost my train of thought. Ask me again?");
        if (/free limit|try again in a little while|popular right now|rate limit|too many requests|quota|at capacity/i.test(reply)){
          setOut('<div class="ac-ans"><b>Aira is at capacity right now.</b> Lots of students are asking at once, and today\'s free limit is used up. She is back after the daily reset. The lesson above is all here, and you can ask on the <a href="https://github.com/pkjaslam/cambium-academy/discussions" target="_blank" rel="noopener" style="color:#2C5F2D;font-weight:700">community board</a> anytime.</div>');
          return;
        }
        if (opts.wantSvg){
          var v = renderVisual(reply);
          if (v){ cacheSet(opts.cacheAs || userMsg, reply); setOut(v.html + '<div class="ac-cap">' + v.cap + esc(L.topic) + '.</div>'); return; }
          if (svgTry < 1){ svgTry++; call(FLOW_ASK, { wantSvg: true, cacheAs: opts.cacheAs, noCache: true }); return; }
          setAnswer(reply, false);
          return;
        }
        if (!opts.keepHistory) cacheSet(opts.cacheAs || userMsg, reply);
        setAnswer(reply, false);
        if (opts.keepHistory) remember(userMsg, reply);
      })
      .catch(function(){ busy = false; send.disabled = false; setOut('<div class="ac-err">I could not reach my AI service just now. Check your connection and try again.</div>'); });
  }

  function ask(){ var q = input.value.trim(); if (!q) return; input.value = ""; call(q, { keepHistory: true }); }
  send.addEventListener("click", ask);
  input.addEventListener("keydown", function(e){ if (e.key === "Enter") ask(); });

  chips.addEventListener("click", function(e){
    var a = e.target.getAttribute("data-a"); if (!a) return;
    active(a);
    if (a === "ask"){ row.style.display = "flex"; input.focus(); setOut('<div class="ac-hello">Type your question below and I will answer it for this lesson' + (history.length ? ", and I remember what we discussed on other pages too" : "") + '.</div>'); return; }
    row.style.display = "none";
    if (a === "example") call("Give one short, concrete worked example that helps a beginner understand this lesson topic. Three to five sentences, plain language.", { cacheAs: "example" });
    else if (a === "visual"){ svgTry = 0; call(VISUAL_ASK, { wantSvg: true, cacheAs: "visual" }); }
    else if (a === "summary") call("Summarize the key points of this lesson in four short bullet points a beginner can remember. Start each with a dash.", { cacheAs: "summary" });
    else if (a === "drill"){
      row.style.display = "flex"; input.focus();
      var parts = [];
      if (ST.missTop.length) parts.push("flashcards I keep missing: " + ST.missTop.map(function(m){ return '"' + m.f + '" (module ' + m.m.replace('M','') + ')'; }).join("; "));
      var qm2 = Object.keys(ST.quizMiss || {}).sort(function(x,y){ return ST.quizMiss[y]-ST.quizMiss[x]; }).slice(0,2);
      if (qm2.length) parts.push("my quiz misses were concentrated in module " + qm2.map(function(k){ return k.replace("M",""); }).join(" and "));
      if (!parts.length) parts.push("nothing recorded yet, quiz me on the course essentials");
      call("My weak spots: " + parts.join(". Also, ") + ". Coach me: ask ONE short, friendly check question about my weakest spot and wait for my answer. After I reply, tell me if I got it, teach the gap in one or two sentences, then move on. One question at a time.", { keepHistory: true, noCache: true });
    }
    else if (a === "next"){
      var t = nextStepText(courseState());
      setOut('<div class="ac-ans">' + fmt(t) + '</div>' + sayButton());
      var sb = out.querySelector(".ac-say"); if (sb) sb.addEventListener("click", function(){ speak(t); });
      if (voiceOn) speak(t);
    }
  });
})();
