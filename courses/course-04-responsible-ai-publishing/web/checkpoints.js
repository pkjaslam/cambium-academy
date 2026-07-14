// Module checkpoints + course progress writer for slides.html.
// Loads after the main slides script and wraps the global go().
(function(){
  var CP = {
    9:  { m: "Module 1 checkpoint", qs: [
      ["The question this course replaces \"was this written with AI?\" with:", ["Which model wrote it, and when","Is the science sound, are the data authentic, are the conclusions supported, was the use disclosed","How high does the detector score"], 1],
      ["Detectors fail worst on...", ["senior professors","short abstracts","honest writers working in a second language"], 2] ] },
    15: { m: "Module 2 checkpoint", qs: [
      ["The one rule every rulebook already shares:", ["AI use is banned outright","AI is never an author; humans keep full responsibility","AI may be a co-author with disclosure"], 1],
      ["Under ICMJE, AI writing assistance is disclosed in the...", ["acknowledgments","references","title page"], 0] ] },
    21: { m: "Module 3 checkpoint", qs: [
      ["Using AI to polish your own English about your own science is...", ["misconduct at every venue","honest work, exempt or lightly disclosed at most venues","only allowed for native speakers"], 1],
      ["AI-suggested citations are safe to use when...", ["they look plausible","the model is a frontier model","you open and verify every one before it enters your list"], 2] ] },
    27: { m: "Module 4 checkpoint", qs: [
      ["The irreducible seven are things that...", ["only senior authors handle","no tool and no disclosure can transfer away from you","journals check automatically"], 1],
      ["A good disclosure statement names the tool, says what it did, and...", ["lists every prompt used","claims human review and full responsibility","apologizes for the use"], 1] ] },
    33: { m: "Module 5 checkpoint", qs: [
      ["The one-question test for assist versus misconduct:", ["Did the AI amplify work you did, or manufacture work you did not do?","Was the model paid or free?","Did anyone notice?"], 0],
      ["This course names, in misuse cases...", ["private individuals","institutions and documented public cases only","nobody at all"], 1] ] },
    39: { m: "Module 6 checkpoint", qs: [
      ["By early 2026, fabricated references appeared in about...", ["1 in 10,000 biomedical papers","1 in 277 biomedical papers","1 in 5 biomedical papers"], 1],
      ["Generative AI images of research data are...", ["fine with a caption","banned at essentially every serious venue","required for graphical abstracts"], 1] ] },
    45: { m: "Module 7 checkpoint", qs: [
      ["The Stanford study found detectors flagged non-native English essays at an average rate of...", ["about 6%","about 61%","under 1%"], 1],
      ["The rule in stone:", ["a detector score must never be the sole basis for accepting, rejecting, or accusing","detectors are reliable above 95%","only free detectors are unreliable"], 0] ] },
    52: { m: "Module 8 checkpoint", qs: [
      ["Uploading a manuscript you are reviewing into a public AI system is...", ["standard practice","a confidentiality violation; NIH explicitly prohibits it in its reviews","fine if you cite the tool"], 1],
      ["A reviewer MAY ethically use AI to...", ["draft the whole review from the PDF","learn an unfamiliar method in general terms, sharing no manuscript text","summarize the manuscript quickly"], 1] ] },
    58: { m: "Module 9 checkpoint", qs: [
      ["The reviewer's reorientation this course teaches:", ["hunt AI fingerprints harder","hunt bad science: checkable flags like contradictions, impossible stats, and phantom references","trust polished prose"], 1],
      ["A hallucinated R package in the methods is...", ["a style choice","checkable evidence of a real problem, worth a specific comment","proof AI wrote the paper"], 1] ] },
    64: { m: "Module 10 checkpoint", qs: [
      ["The July 2025 hidden-prompt affair worked by...", ["hacking journal servers","instructions in white text that only an AI reviewer would read","bribing editors"], 1],
      ["The attack only succeeds when...", ["reviewers follow the confidentiality rule","the manuscript is double-blinded","a reviewer feeds the manuscript to an LLM against the rules"], 2] ] },
    70: { m: "Module 11 checkpoint", qs: [
      ["Editorial screening tools (Proofig, Papermill Alarm, Integrity Hub)...", ["support decisions but never make them","auto-reject flagged papers","replace peer review"], 0],
      ["The detector screams 98% AI at a careful non-native author's paper. The strong editor...", ["desk-rejects citing the score","emails an accusation","sets the score aside and checks evidence: references, images, stats, data"], 2] ] },
    76: { m: "Module 12 checkpoint", qs: [
      ["Legitimate AI-in-review experiments (NeurIPS 2026, AAAI-26) all share...", ["secret AI reviews","labeled AI contributions, human judgment retained, measured outcomes","automated final decisions"], 1],
      ["The Vancouver Standard being drafted in 2026 aims to...", ["ban AI in research","create one shared disclosure taxonomy across venues","replace peer reviewers with AI"], 1] ] }
  };
  var SEENKEY = "cambium-c04-checkpoints", PROGKEY = "cambium-c04-slides";
  var seen = {};
  try { seen = JSON.parse(localStorage.getItem(SEENKEY) || "{}"); } catch(e){}
  function saveProgress(){
    var prev = {};
    try { prev = JSON.parse(localStorage.getItem(PROGKEY) || "{}"); } catch(e){}
    var reached = Math.max(prev.seen || 0, (typeof i === "number" ? i : 0) + 1);
    localStorage.setItem(PROGKEY, JSON.stringify({ seen: reached, total: 80, done: reached >= 80 }));
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
