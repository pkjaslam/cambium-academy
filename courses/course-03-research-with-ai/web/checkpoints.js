// Module checkpoints + course progress writer for slides.html.
// Loads after the main slides script and wraps the global go().
(function(){
  var CP = {
    8:  { m: "Module 1 checkpoint", qs: [
      ["By early 2026, roughly how many published papers contained a fabricated reference?", ["1 in 10,000","1 in 277","1 in 5"], 1],
      ["When an AI can't find the real answer, its most dangerous habit is to...", ["crash","refuse to answer","fill the gap with something that looks right"], 2] ] },
    13: { m: "Module 2 checkpoint", qs: [
      ["What makes a search-grounded tool different from a plain chatbot?", ["It retrieves real pages first, then answers with clickable sources","It has a bigger memory","It is always correct"], 0],
      ["The receipts test for any AI research tool:", ["Does it answer fast?","Can you click through to where each claim came from?","Does it sound confident?"], 1] ] },
    19: { m: "Module 3 checkpoint", qs: [
      ["Lateral reading means...", ["reading the whole page carefully, top to bottom","leaving the page and checking the claim against independent sources","asking the AI if it is sure"], 1],
      ["In the CJR test of eight AI search tools, the wrong answers...", ["sounded just as confident as the right ones","admitted uncertainty","refused to cite sources"], 0] ] },
    26: { m: "Module 4 checkpoint", qs: [
      ["A fabricated citation typically has...", ["obvious spelling errors","a missing DOI","plausible authors, a real-sounding journal, and a well-formed DOI"], 2],
      ["The one rule written in stone:", ["Trust citations from big-name models","A citation you never opened is a citation you cannot trust","Only check citations in medicine"], 1] ] },
    31: { m: "Module 5 checkpoint", qs: [
      ["A deep-research report should be treated as...", ["a finished, audited answer","a first draft with leads","marketing material"], 1],
      ["The one habit that decides whether you can trust the report:", ["counting its sources","checking its grammar","verifying the 2 or 3 load-bearing sources by hand"], 2] ] },
    36: { m: "Module 6 checkpoint", qs: [
      ["What should decide how hard you verify an answer?", ["The confidence of the tone","The cost of being wrong","The length of the answer"], 1],
      ["When AI helped with work you hand in or publish...", ["keep it quiet","disclose it the way the room expects, and verify before your name goes on it","mention it only if asked twice"], 1] ] }
  };
  var SEENKEY = "cambium-c03-checkpoints", PROGKEY = "cambium-c03-slides";
  var seen = {};
  try { seen = JSON.parse(localStorage.getItem(SEENKEY) || "{}"); } catch(e){}
  function saveProgress(){
    var prev = {};
    try { prev = JSON.parse(localStorage.getItem(PROGKEY) || "{}"); } catch(e){}
    var reached = Math.max(prev.seen || 0, (typeof i === "number" ? i : 0) + 1);
    localStorage.setItem(PROGKEY, JSON.stringify({ seen: reached, total: 40, done: reached >= 40 }));
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
