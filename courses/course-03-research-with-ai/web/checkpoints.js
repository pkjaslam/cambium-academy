// Module checkpoints + course progress writer for slides.html.
// Loads after the main slides script and wraps the global go().
(function(){
  var CP = {
    8:  { m: "Module 1 checkpoint", qs: [
      ["The twin rule of the 2026 research stack:", ["AI supplies trust, you supply speed","AI supplies speed, you supply trust","AI supplies both, you supervise"], 1],
      ["Kosmos-class autonomous agents matter because they show...", ["AI research is now error-free","months of work in a day, with roughly one finding in five wrong","AI can replace peer review"], 1] ] },
    14: { m: "Module 2 checkpoint", qs: [
      ["The researcher's upgrade to every factual prompt:", ["a world-class expert persona","demanded uncertainty: flag what to verify and the assumptions made","asking twice and comparing"], 1],
      ["Personas (\"act as a statistician\") reliably change...", ["accuracy","tone and style, not truth","the model's training data"], 1] ] },
    21: { m: "Module 3 checkpoint", qs: [
      ["For a literature review, the best FIRST agent is...", ["a generalist deep-research agent","an academic specialist like Elicit that searches verified paper databases","whichever is fastest"], 1],
      ["An agent's 20-source report should be treated as...", ["a finished, audited answer","a first draft with leads: audit the 2-3 load-bearing sources","unusable"], 1] ] },
    27: { m: "Module 4 checkpoint", qs: [
      ["By early 2026, fabricated references appeared in about...", ["1 in 10,000 papers","1 in 277 papers","1 in 5 papers"], 1],
      ["The one rule written in stone:", ["trust citations from big-name models","a citation you never opened is a citation you cannot trust","only check citations in your own field"], 1] ] },
    31: { m: "Module 5 checkpoint", qs: [
      ["The cheapest, highest-leverage AI hour in a project is...", ["polishing the abstract","before data exists: design, power, and confound consulting","after rejection"], 1],
      ["A power calculation from AI is usable when...", ["it sounds confident","the formula and assumptions are shown and a second tool agrees","it matches your hopes"], 1] ] },
    36: { m: "Module 6 checkpoint", qs: [
      ["The two loop steps that catch silent analysis errors:", ["persona + politeness","explain-it-back and the tiny hand-checked test","running it twice"], 1],
      ["AI-assisted qualitative coding is legitimate when...", ["the AI codes everything unsupervised","AI proposes, the human adjudicates, and the trail is kept","themes look reasonable"], 1] ] },
    42: { m: "Module 7 checkpoint", qs: [
      ["A vision model identifying a structure on a micrograph is...", ["a result for the paper","a hypothesis for the expert to check","proof if confidence is high"], 1],
      ["Source-grounded library assistants matter because errors...", ["disappear entirely","stay inside a corpus you own, with citations to check","become someone else's problem"], 1] ] },
    47: { m: "Module 8 checkpoint", qs: [
      ["Journal AI policies in 2026 are...", ["basically identical","concretely different: Science, Nature, Elsevier, NIH each have their own rules","unenforceable, so ignorable"], 1],
      ["Uploading someone else's unpublished manuscript to an AI tool is...", ["fine if credited","a confidentiality violation; NIH bars reviewers from it","standard practice"], 1] ] },
    52: { m: "Module 9 checkpoint", qs: [
      ["The two nevers of reference integrity:", ["never cite preprints, never cite books","never hand-type a citation, never trust an AI-typed one","never use Zotero, never use BibTeX"], 1],
      ["Reproducibility in 2026 became...", ["impossible at scale","a prompt: ask AI to document, pin, script, and README, then correct it","a paid service only"], 1] ] },
    56: { m: "Module 10 checkpoint", qs: [
      ["About 70% of journals have AI policies; papers actually disclosing AI use measure about...", ["50%","10%","0.1%"], 2],
      ["Data that could not go in an email to a stranger...", ["can go in a chatbot if deleted after","never touches a cloud chatbot: use local or institution-hosted models","is fine in incognito mode"], 1] ] }
  };
  var SEENKEY = "cambium-c03-checkpoints", PROGKEY = "cambium-c03-slides";
  var seen = {};
  try { seen = JSON.parse(localStorage.getItem(SEENKEY) || "{}"); } catch(e){}
  function saveProgress(){
    var prev = {};
    try { prev = JSON.parse(localStorage.getItem(PROGKEY) || "{}"); } catch(e){}
    var reached = Math.max(prev.seen || 0, (typeof i === "number" ? i : 0) + 1);
    localStorage.setItem(PROGKEY, JSON.stringify({ seen: reached, total: 60, done: reached >= 60 }));
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
