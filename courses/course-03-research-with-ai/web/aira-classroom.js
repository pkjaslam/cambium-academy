// Aira · AI Classroom — the persistent in-lesson AI teaching assistant for Cambium Academy.
// Embeds into <div id="aira-classroom"></div>. Reads the lesson context from window.AIRA_LESSON
// and answers/examples/visuals/summaries about THAT lesson via the Aira Cloudflare worker
// (window.AIRA_CHAT.endpoint). Everything stays in the classroom. Nothing is stored server-side.
(function(){
  var host = document.getElementById("aira-classroom");
  if (!host) return;
  var IMG = "../../../assets/aira-face.jpg";
  var L = window.AIRA_LESSON || { course: "Cambium Academy", module: "This lesson", topic: "this topic", points: [], next: null };

  if (!window.AIRA_CHAT) { var cfg = document.createElement("script"); cfg.src = "aira-chat-config.js"; document.head.appendChild(cfg); }
  function ready(){ return window.AIRA_CHAT && typeof window.AIRA_CHAT.endpoint === "string" && window.AIRA_CHAT.endpoint.length > 8; }

  var SYS = "You are Aira, the warm, encouraging AI teacher for Cambium Academy's course \"" + L.course + "\". " +
    "The student is on: " + L.module + " — " + L.topic + ". " +
    "Key points of this lesson: " + ((L.points || []).join("; ") || "the lesson's main ideas") + ". " +
    "Teach like a kind, concise tutor. Keep replies under 120 words, plain language, beginner-friendly, and tied to this lesson. " +
    "Never invent facts, statistics, or citations; if you are unsure, say so and tell the student how to verify it.";

  var css = document.createElement("style");
  css.textContent =
    "#aira-classroom{--f:#2C5F2D;--m:#97BC62;--g:#D9B25C;--ink:#1F2A20;--mut:#5C6B5A;--line:#DFE9D8;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;color:var(--ink);background:linear-gradient(180deg,#fff, #F6F8F4);border:1px solid var(--line);border-radius:18px;box-shadow:0 12px 40px rgba(31,42,32,.10);overflow:hidden;max-width:760px}" +
    "#aira-classroom .ac-hd{display:flex;gap:12px;align-items:center;background:linear-gradient(135deg,#1F3D24,#2C5F2D);color:#fff;padding:14px 18px}" +
    "#aira-classroom .ac-hd img{width:46px;height:46px;border-radius:50%;object-fit:cover;border:2px solid var(--m)}" +
    "#aira-classroom .ac-hd b{font-family:'Sora',sans-serif;font-size:16px;display:block}" +
    "#aira-classroom .ac-hd span{font-size:10.5px;color:var(--m);letter-spacing:1.5px}" +
    "#aira-classroom .ac-hd .tag{margin-left:auto;font-size:9.5px;font-weight:700;color:#1F3D24;background:var(--m);border-radius:8px;padding:3px 8px;letter-spacing:1px}" +
    "#aira-classroom .ac-body{padding:16px 18px}" +
    "#aira-classroom .ac-chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px}" +
    "#aira-classroom .ac-chips button{background:#F0F5EC;color:var(--f);border:1px solid var(--line);border-radius:20px;padding:9px 14px;font-size:13px;font-weight:700;cursor:pointer;transition:all .15s}" +
    "#aira-classroom .ac-chips button:hover{background:#E2EDD5;transform:translateY(-1px)}" +
    "#aira-classroom .ac-chips button.on{background:var(--f);color:#fff;border-color:var(--f)}" +
    "#aira-classroom .ac-out{min-height:64px;background:#fff;border:1px solid var(--line);border-radius:12px;padding:14px 16px;font-size:14px;line-height:1.6}" +
    "#aira-classroom .ac-out .ac-ans b{color:var(--f)}" +
    "#aira-classroom .ac-hello{color:var(--mut)}" +
    "#aira-classroom .ac-think{color:var(--mut);font-style:italic}" +
    "#aira-classroom .ac-err{color:#B3372E}" +
    "#aira-classroom .ac-svg{overflow:auto;text-align:center}" +
    "#aira-classroom .ac-svg svg{max-width:100%;height:auto}" +
    "#aira-classroom .ac-cap{margin-top:8px;font-size:12px;color:var(--mut);font-style:italic;text-align:center}" +
    "#aira-classroom .ac-row{display:none;gap:8px;margin-top:12px}" +
    "#aira-classroom .ac-row input{flex:1;padding:10px 13px;font-size:14px;border:1.5px solid var(--line);border-radius:10px;font-family:inherit}" +
    "#aira-classroom .ac-row input:focus{outline:none;border-color:var(--m)}" +
    "#aira-classroom .ac-row button{background:var(--f);color:#fff;border:0;border-radius:10px;padding:10px 16px;font-size:14px;font-weight:700;cursor:pointer}" +
    "#aira-classroom .ac-foot{font-size:11px;color:var(--mut);padding:0 18px 14px}" +
    "@media print{#aira-classroom{display:none}}";
  document.head.appendChild(css);

  host.innerHTML =
    '<div class="ac-hd"><img src="' + IMG + '" alt="Aira"><div><b>Aira · Your AI Classroom</b><span>AI TEACHING ASSISTANT · ALWAYS ON</span></div><span class="tag">AI</span></div>' +
    '<div class="ac-body">' +
      '<div class="ac-chips" id="acChips">' +
        '<button data-a="ask">Ask about this lesson</button>' +
        '<button data-a="example">Give me an example</button>' +
        '<button data-a="visual">Explain it visually</button>' +
        '<button data-a="summary">Summarize the key points</button>' +
        '<button data-a="next">What should I do next?</button>' +
      '</div>' +
      '<div class="ac-out" id="acOut"><span class="ac-hello">Hi, I am Aira. I am right here in your lesson on <b>' + esc(L.topic) + '</b>. Ask me anything, or tap a button and I will teach, show an example, draw a diagram, or sum it up.</span></div>' +
      '<div class="ac-row" id="acRow"><input id="acIn" type="text" maxlength="500" placeholder="Type your question about this lesson..."><button id="acSend">Ask</button></div>' +
    '</div>' +
    '<div class="ac-foot">Aira is an AI creation of Cambium AI Research Institution. She can be wrong, so verify anything important.' +
      ((window.AIRA_CHAT && window.AIRA_CHAT.notice) ? ' ' + esc(window.AIRA_CHAT.notice) : '') + '</div>';

  var out = document.getElementById("acOut"), row = document.getElementById("acRow"),
      input = document.getElementById("acIn"), send = document.getElementById("acSend"), chips = document.getElementById("acChips");
  var busy = false, history = [];

  function esc(s){ return String(s == null ? "" : s).replace(/[&<>]/g, function(c){ return { "&":"&amp;", "<":"&lt;", ">":"&gt;" }[c]; }); }
  function fmt(t){ return esc(t).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/^\s*[-*]\s+/gm, "&#8226; ").replace(/\n/g, "<br>"); }
  function sanitizeSvg(t){
    var i = t.indexOf("<svg"), j = t.lastIndexOf("</svg>");
    if (i < 0 || j < 0) return null;
    var svg = t.slice(i, j + 6);
    svg = svg.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, "").replace(/\son\w+\s*=\s*"[^"]*"/gi, "").replace(/\son\w+\s*=\s*'[^']*'/gi, "").replace(/(href|xlink:href)\s*=\s*("|')\s*javascript:[^"']*\2/gi, "");
    return svg;
  }
  function setOut(html){ out.innerHTML = html; }
  function active(a){ Array.prototype.forEach.call(chips.querySelectorAll("button"), function(b){ b.classList.toggle("on", b.getAttribute("data-a") === a); }); }

  function call(userMsg, wantSvg, keepHistory){
    if (busy) return;
    if (!ready()){
      setOut('<div class="ac-err">Aira\'s live AI connects once this course is deployed on the site. The buttons and layout are all here; her answers light up on the live page.</div>');
      return;
    }
    busy = true; send.disabled = true;
    setOut('<div class="ac-think">Aira is thinking&#8230;</div>');
    var msgs = [{ role: "user", content: SYS + "\n\nStudent request: " + userMsg }];
    if (keepHistory && history.length) msgs = history.concat([{ role: "user", content: userMsg }]);
    fetch(window.AIRA_CHAT.endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: msgs }) })
      .then(function(r){ return r.json(); })
      .then(function(j){
        busy = false; send.disabled = false;
        var reply = (j && j.reply) ? j.reply : (j && j.error ? j.error : "I lost my train of thought. Ask me again?");
        if (wantSvg){ var svg = sanitizeSvg(reply); if (svg){ setOut('<div class="ac-svg">' + svg + '</div><div class="ac-cap">Aira drew this to explain ' + esc(L.topic) + '.</div>'); return; } }
        setOut('<div class="ac-ans">' + fmt(reply) + '</div>');
        if (keepHistory){ history.push({ role: "user", content: userMsg }); history.push({ role: "assistant", content: reply }); if (history.length > 8) history = history.slice(-8); }
      })
      .catch(function(){ busy = false; send.disabled = false; setOut('<div class="ac-err">I could not reach my AI service just now. Check your connection and try again.</div>'); });
  }

  function ask(){ var q = input.value.trim(); if (!q) return; input.value = ""; call(q, false, true); }
  send.addEventListener("click", ask);
  input.addEventListener("keydown", function(e){ if (e.key === "Enter") ask(); });

  chips.addEventListener("click", function(e){
    var a = e.target.getAttribute("data-a"); if (!a) return;
    active(a);
    if (a === "ask"){ row.style.display = "flex"; input.focus(); setOut('<div class="ac-hello">Type your question below and I will answer it for this lesson.</div>'); return; }
    row.style.display = "none";
    if (a === "example") call("Give one short, concrete worked example that helps a beginner understand this lesson's topic. Three to five sentences, plain language.", false, false);
    else if (a === "visual") call("Create a simple labeled diagram that visually explains this lesson's topic for a beginner. Respond with ONLY one clean inline SVG (include a viewBox, about 460 by 300), using basic shapes, arrows and short text labels. No scripts, no external images. Use these colors: dark green #2C5F2D, moss #97BC62, gold #D9B25C, on a light background.", true, false);
    else if (a === "summary") call("Summarize the key points of this lesson in four short bullet points a beginner can remember. Start each with a dash.", false, false);
    else if (a === "next"){
      var t = L.next || "You are in the lesson now. Read or watch it through, try the example and the visual above to lock it in, then move to the flashcards and the AI Lab before the quiz.";
      setOut('<div class="ac-ans">' + fmt(t) + '</div>');
    }
  });
})();
