// Module checkpoints + course progress writer for slides.html.
// Loads after the main slides script and wraps the global go().
// Each checkpoint fires on its module's LAST slide (0-based index below), 12 modules, 79 slides.
(function(){
  var CP = {
    9:  { m: "Module 1 checkpoint", qs: [
      ["An agent, at its simplest, is:", ["A smarter chatbot that gives better answers","A model, plus tools, plus a loop, plus memory","A person you hired online"], 1],
      ["The line between a chatbot and an agent is that an agent:", ["Is always right","Acts in the world with tools, so its mistakes are real","Costs more money"], 1] ] },
    15: { m: "Module 2 checkpoint", qs: [
      ["Most AI pilots die because:", ["The models are not smart enough yet","The demo ran on clean inputs and production did not, and the boring parts were skipped","AI is a passing fad"], 1],
      ["The real blockers to production are mainly:", ["Model quality","Integration, reliability, security, latency, and missing evals","The price of GPUs"], 1] ] },
    21: { m: "Module 3 checkpoint", qs: [
      ["A job that is safe to automate is:", ["Rare, high-stakes, and irreversible","Repetitive, verifiable, bounded, and low blast radius","Anything a human finds boring"], 1],
      ["If you would re-read every output the agent produced anyway, you should:", ["Automate it and check it every time","Not automate it, or automate the checking instead","Trust the agent and stop checking"], 1] ] },
    27: { m: "Module 4 checkpoint", qs: [
      ["An agent can only ever do:", ["Whatever the model privately decides","What its tools allow, so the tool menu is your first safety control","Whatever the last user typed"], 1],
      ["MCP, the Model Context Protocol, is:", ["A specific AI model","A shared open standard for connecting agents to tools, now under the Agentic AI Foundation","A programming language"], 1] ] },
    33: { m: "Module 5 checkpoint", qs: [
      ["The five-step build for any agent is:", ["Goal, tools, loop, guardrails, test","Install, configure, deploy, scale, profit","Prompt, prompt again, and hope"], 0],
      ["A first agent should be:", ["As ambitious as possible on day one","The smallest useful slice, tested, before you widen it","Fully autonomous immediately"], 1] ] },
    39: { m: "Module 6 checkpoint", qs: [
      ["By default, what an agent remembers between runs is:", ["Everything, perfectly","Almost nothing, unless you explicitly provide it each run","Stored by the model forever"], 1],
      ["When a needed fact is missing from its context, a model tends to:", ["Stop and ask you","Invent a plausible-sounding fact to fill the gap","Crash safely"], 1] ] },
    45: { m: "Module 7 checkpoint", qs: [
      ["An eval, or golden set, is:", ["A marketing demo","A set of real cases with known-good answers you score the agent against","The agent's own opinion of its work"], 1],
      ["Nearly half of teams that ship agents skip:", ["The model entirely","Any offline evaluation at all","The user interface"], 1] ] },
    51: { m: "Module 8 checkpoint", qs: [
      ["Regression testing means:", ["Rerunning your whole golden set on every change and on a schedule","Testing only the newest feature you added","Asking the agent whether it still works"], 0],
      ["\"Green today is not green tomorrow\" is true because:", ["Models update, prompts change, and inputs drift, all silently","Agents get tired over time","The internet is unreliable"], 0] ] },
    57: { m: "Module 9 checkpoint", qs: [
      ["Least privilege means giving an agent:", ["Every permission it might ever need, to be safe","Exactly the permissions its job needs and not one more, read-only by default","Admin access, to save time"], 1],
      ["The blast radius of an agent is:", ["How fast it runs","The worst thing it can do with the tools you gave it","The size of the model"], 1] ] },
    63: { m: "Module 10 checkpoint", qs: [
      ["Indirect prompt injection is when:", ["A user types a rude message","Poison hidden in content the agent reads (a page, an email) is obeyed as a command","The model runs out of memory"], 1],
      ["The reliable defense against prompt injection is:", ["Telling the model, in the prompt, to ignore injected instructions","Architecture: least privilege, breaking the lethal trifecta, and a human gate before irreversible actions","Using a bigger, newer model"], 1] ] },
    69: { m: "Module 11 checkpoint", qs: [
      ["Automation \"rots quietly\" because:", ["Agents get bored of the task","Inputs drift, models change, and costs creep, with no announcement","The code deletes itself over time"], 1],
      ["The cheapest useful monitoring for a small agent is:", ["A full observability platform","A scheduled golden-set rerun plus one alert","Checking it once a year"], 1] ] },
    75: { m: "Module 12 checkpoint", qs: [
      ["A safe rollout goes:", ["Straight to full autonomy on launch day","Dry run, then shadow, then a limited slice, then wider, with a kill switch","However the agent prefers"], 1],
      ["When an agent's output goes out under your name, who is accountable?", ["The AI vendor","The model that produced it","You, the human; an agent cannot own the outcome"], 2] ] }
  };
  var SEENKEY = "cambium-c05-checkpoints", PROGKEY = "cambium-c05-slides", TOTAL = 79;
  var seen = {};
  try { seen = JSON.parse(localStorage.getItem(SEENKEY) || "{}"); } catch(e){}
  function saveProgress(){
    var prev = {};
    try { prev = JSON.parse(localStorage.getItem(PROGKEY) || "{}"); } catch(e){}
    var reached = Math.max(prev.seen || 0, (typeof i === "number" ? i : 0) + 1);
    localStorage.setItem(PROGKEY, JSON.stringify({ seen: reached, total: TOTAL, done: reached >= TOTAL }));
  }
  var overlay = document.createElement("div");
  overlay.style.cssText = "display:none;position:fixed;inset:0;background:rgba(31,61,36,.72);z-index:50;align-items:center;justify-content:center;padding:16px";
  overlay.innerHTML = '<div style="background:#fff;border-radius:16px;max-width:560px;width:100%;max-height:88vh;overflow:auto;padding:24px" id="cpCard"></div>';
  document.body.appendChild(overlay);
  var open = false, pending = null;

  function show(idx){
    open = true; pending = idx;
    var cp = CP[idx];
    var h = '<div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6E9648">' + cp.m + '</div>' +
      '<div style="font-family:Cambria,Georgia,serif;font-size:22px;font-weight:700;margin:6px 0 14px;color:#1F2A20">Quick check before you move on</div>';
    cp.qs.forEach(function(q, qi){
      h += '<div style="margin-bottom:14px" id="cpq' + qi + '"><div style="font-weight:600;font-size:14.5px;margin-bottom:8px;color:#1F2A20">' + (qi+1) + '. ' + q[0] + '</div>';
      q[1].forEach(function(o, oi){
        h += '<label style="display:block;padding:8px 11px;border:1px solid #DFE9D8;border-radius:8px;margin:5px 0;font-size:13.5px;cursor:pointer;color:#1F2A20"><input type="radio" name="cpq' + qi + '" value="' + oi + '" style="margin-right:8px;accent-color:#2C5F2D">' + o + '</label>';
      });
      h += '<div id="cpfb' + qi + '" style="display:none;font-size:13px;margin-top:6px"></div></div>';
    });
    h += '<div style="display:flex;gap:10px;align-items:center;margin-top:16px">' +
      '<button id="cpCheck" style="background:#2C5F2D;color:#fff;border:0;border-radius:8px;padding:11px 20px;font-size:14px;font-weight:700;cursor:pointer">Check answers</button>' +
      '<button id="cpGo" style="display:none;background:#97BC62;color:#1F3D24;border:0;border-radius:8px;padding:11px 20px;font-size:14px;font-weight:700;cursor:pointer">Continue</button>' +
      '<a href="#" id="cpSkip" style="margin-left:auto;font-size:12.5px;color:#5C6B5A">skip</a></div>';
    document.getElementById("cpCard").innerHTML = h;
    overlay.style.display = "flex";
    document.getElementById("cpCheck").onclick = function(){
      var allAnswered = true;
      cp.qs.forEach(function(q, qi){ if (!document.querySelector('input[name="cpq' + qi + '"]:checked')) allAnswered = false; });
      if (!allAnswered) { alert("Answer both questions, or press skip."); return; }
      cp.qs.forEach(function(q, qi){
        var pick = +document.querySelector('input[name="cpq' + qi + '"]:checked').value;
        var fb = document.getElementById("cpfb" + qi);
        fb.style.display = "block";
        if (pick === q[2]) { fb.textContent = "Correct."; fb.style.color = "#2C5F2D"; }
        else { fb.textContent = "Not quite. Answer: " + q[1][q[2]]; fb.style.color = "#B3372E"; }
      });
      document.getElementById("cpGo").style.display = "inline-block";
      this.style.display = "none";
    };
    document.getElementById("cpGo").onclick = closeAndAdvance;
    document.getElementById("cpSkip").onclick = function(e){ e.preventDefault(); closeAndAdvance(); };
  }
  function closeAndAdvance(){
    overlay.style.display = "none"; open = false;
    seen[pending] = 1; localStorage.setItem(SEENKEY, JSON.stringify(seen));
    pending = null;
    _cpGo(1);
    saveProgress();
  }
  var _cpGo = go;
  go = function(d){
    if (open) return;
    if (d > 0 && CP[i] && !seen[i]) { show(i); return; }
    _cpGo(d);
    saveProgress();
  };
  saveProgress();
})();
