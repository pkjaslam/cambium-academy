// Amelia, the Cambium Academy AI teacher. Floating companion on every course page.
// v3: she speaks with her REAL voice, the same Neerja Expressive neural voice that
// narrates the lecture, via pre-rendered audio in web/amelia-voice/. Browser TTS is
// only a fallback, and never the robotic desktop voices. Live chat replies are text.
(function(){
  var IMG = "../../../assets/amelia-face.jpg";
  var AUDIO = "amelia-voice/";
  var PAGE = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  var QUIET_KEY = "cambium-amelia-quiet", MET_KEY = "cambium-amelia-met";

  var PAGES = {
    "index.html": { k: "page-index", t: "This is the course home. Watch the lecture or read the slides, and keep an eye on your progress bar right on this page. When you are ready, I will walk you to the quiz." },
    "slides.html": { k: "page-slides", t: "These are the full course slides. Use the arrow keys or swipe. I will pop a two-question check after each module so nothing slips past you." },
    "quiz.html": { k: "page-quiz", t: "The quiz unlocks after the lecture, all twenty-four flashcards, and the three playground labs. Then it is twenty questions, fourteen to pass. Ask me what is left and I will tell you." },
    "flashcards.html": { k: "page-flashcards", t: "Flip a card, then be honest with the buttons. Cards you miss come back around until they stick. Clearing all twenty-four is a required step on your path to the quiz." },
    "playground.html": { k: "page-playground", t: "My favorite room. Watch text become tokens, play the next-word game that I myself am built on, and train a tiny model with your own hands. All three labs count toward unlocking the quiz." },
    "community.html": { k: "page-community", t: "This is where humans help humans. Ask questions on the Q&A board, show off in the project gallery, and you can always ask me anything from here." },
    "capstone.html": { k: "page-capstone", t: "The capstone is where the course becomes real: one genuine task from your life, done with AI, verified and written up. Do this one; future you says thanks." },
    "career.html": { k: "page-career", t: "Let us make this course count. Copy the resume lines, add the certificate to LinkedIn, and rehearse interviews with me until you sound like yourself on a good day." },
    "transcript.html": { k: "page-transcript", t: "The full lecture, word for word with timestamps. That voice in the video, by the way, is me." }
  };
  var GENERIC = { k: "page-generic", t: "Ask me what to do next and I will check your progress." };

  function read(k){ try { return JSON.parse(localStorage.getItem(k) || "null"); } catch(e){ return null; } }
  function advise(){
    var s = read("cambium-c01-slides") || {}, seen = s.seen || 0;
    var lecture = seen >= 36 || !!(read("cambium-c01-lecture") || {}).watched;
    var cards = Object.keys(read("cambium-c01-cards") || {}).length;
    var pg = read("cambium-c01-playground") || {};
    var pgN = (pg.tok?1:0) + (pg.lm?1:0) + (pg.net?1:0);
    var quiz = read("cambium-c01-quiz") || {}, cert = read("cambium-c01-cert") || {};
    if (cert.issued) return { k: "next-certdone", t: "You have finished Course 1, certificate and all. Post it on the graduate wall, try the capstone if you have not, and I will see you in Course 2, Prompting Essentials.", href: "community.html", label: "Visit the community" };
    if (quiz.passed) return { k: "next-quizpassed", t: "You passed the quiz with " + (quiz.best || "a good score") + " out of 20. Claim your certificate; you earned it.", href: "certificate.html", label: "Get my certificate" };
    if (lecture && cards >= 24 && pgN >= 3) return { k: "next-quizready", t: "Lecture, flashcards, and all three labs: done. The quiz is unlocked" + (quiz.best ? ", and your best so far is " + quiz.best + " out of 20; fourteen passes." : ". Twenty questions, fourteen to pass. You are ready."), href: "quiz.html", label: "Start the quiz" };
    if (!lecture) {
      if (seen > 0) return { k: "next-slides-continue", t: "Step 1 of your path: the lecture. You are " + seen + " slides in, out of 36. Keep going; the next module is shorter than you think.", href: "slides.html#" + Math.min(seen + 1, 36), label: "Continue the slides" };
      return { k: "next-slides-start", t: "Welcome. Your path has three study steps before the quiz: the lecture, the flashcards, and the playground. Start with the slides, or watch the video and mark it watched on the course home.", href: "slides.html", label: "Start the lecture" };
    }
    if (cards < 24) return { k: "next-cards", t: "Lecture done. Step 2: the flashcards. You know " + cards + " of 24; clear the whole deck and the ideas will stick for the quiz.", href: "flashcards.html", label: "Open flashcards" };
    return { k: "next-playground", t: "Almost there. Step 3: the playground. You have explored " + pgN + " of 3 labs. Type in the token box, let the predictor write, and press auto-train; each one counts.", href: "playground.html", label: "Open the playground" };
  }

  var css = document.createElement("style");
  css.textContent =
    "#amWrap{position:fixed;right:18px;bottom:18px;z-index:120;font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif}" +
    "#amBtn{width:64px;height:64px;border-radius:50%;cursor:pointer;position:relative;border:0;padding:0;background:none;animation:amBob 5s ease-in-out infinite}" +
    "#amBtn img{width:64px;height:64px;border-radius:50%;object-fit:cover;border:2.5px solid #97BC62;box-shadow:0 6px 20px rgba(31,42,32,.35);display:block;animation:amTilt 9s ease-in-out infinite}" +
    "#amBtn .ai{position:absolute;bottom:-2px;right:-2px;background:#1F3D24;color:#97BC62;font-size:9px;font-weight:700;letter-spacing:1px;border-radius:8px;padding:2px 6px;border:1px solid #97BC62}" +
    "#amBtn.talking img{animation:amTalk .6s ease-in-out infinite}" +
    "#amBtn.talking::before{content:'';position:absolute;inset:-7px;border-radius:50%;border:2.5px solid #97BC62;animation:amPulse 1s ease-out infinite}" +
    "@keyframes amBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}" +
    "@keyframes amTilt{0%,86%,100%{transform:rotate(0)}90%{transform:rotate(-3.5deg)}95%{transform:rotate(2.5deg)}}" +
    "@keyframes amTalk{0%,100%{transform:scale(1) rotate(-1deg)}50%{transform:scale(1.045) rotate(1deg)}}" +
    "@keyframes amPulse{0%{opacity:.9;transform:scale(1)}100%{opacity:0;transform:scale(1.45)}}" +
    "#amPanel{display:none;position:absolute;bottom:76px;right:0;width:min(340px,90vw);background:#fff;border:1px solid #DFE9D8;border-radius:16px;box-shadow:0 16px 44px rgba(31,42,32,.28);overflow:hidden}" +
    "#amPanel .hd{display:flex;gap:10px;align-items:center;background:#1F3D24;color:#fff;padding:12px 14px}" +
    "#amPanel .hd img{width:38px;height:38px;border-radius:50%;object-fit:cover;border:1.5px solid #97BC62}" +
    "#amPanel .hd b{font-size:14px;display:block}" +
    "#amPanel .hd span{font-size:10.5px;color:#97BC62;letter-spacing:.5px}" +
    "#amMsg{padding:13px 15px;font-size:13.5px;line-height:1.55;color:#1F2A20;min-height:52px}" +
    "#amMsg a{color:#2C5F2D;font-weight:700}" +
    "#amChatLog{display:none;max-height:240px;overflow-y:auto;padding:10px 12px;background:#F6F8F4;border-top:1px solid #DFE9D8}" +
    "#amChatLog .m{margin:6px 0;padding:8px 11px;border-radius:11px;font-size:13px;line-height:1.5;max-width:88%}" +
    "#amChatLog .u{background:#2C5F2D;color:#fff;margin-left:auto;border-bottom-right-radius:3px}" +
    "#amChatLog .a{background:#fff;border:1px solid #DFE9D8;color:#1F2A20;border-bottom-left-radius:3px}" +
    "#amChatLog .t{color:#8A9784;font-size:12px;font-style:italic}" +
    "#amChatRow{display:none;gap:7px;padding:10px 12px;border-top:1px solid #DFE9D8;background:#fff}" +
    "#amChatIn{flex:1;padding:9px 11px;font-size:13px;border:1.5px solid #DFE9D8;border-radius:9px;font-family:inherit}" +
    "#amChatSend{background:#2C5F2D;color:#fff;border:0;border-radius:9px;padding:9px 14px;font-size:13px;font-weight:700;cursor:pointer}" +
    "#amBtns{display:flex;flex-wrap:wrap;gap:7px;padding:0 14px 13px}" +
    "#amBtns button{background:#F0F5EC;color:#2C5F2D;border:1px solid #DFE9D8;border-radius:16px;padding:7px 12px;font-size:12px;font-weight:700;cursor:pointer}" +
    "#amBtns button:hover{background:#E2EDD5}" +
    "#amFoot{font-size:10px;color:#8A9784;padding:0 15px 11px}" +
    "@media print{#amWrap{display:none !important}}";
  document.head.appendChild(css);

  var wrap = document.createElement("div");
  wrap.id = "amWrap";
  wrap.innerHTML =
    '<div id="amPanel">' +
      '<div class="hd"><img src="' + IMG + '" alt="Amelia, AI teacher"><div><b>Amelia</b><span>AI TEACHER · CAMBIUM ACADEMY</span></div></div>' +
      '<div id="amMsg"></div>' +
      '<div id="amChatLog"></div>' +
      '<div id="amChatRow"><input id="amChatIn" type="text" maxlength="600" placeholder="Ask me anything about the course..."><button id="amChatSend">Send</button></div>' +
      '<div id="amBtns">' +
        '<button data-act="next">What should I do next?</button>' +
        '<button data-act="page">Explain this page</button>' +
        '<button data-act="ask">Ask me anything</button>' +
        '<button data-act="voice"></button>' +
      '</div>' +
      '<div id="amFoot">Amelia is an AI creation of Cambium AI Research Institution. Her voice is the same one that narrates the lectures.</div>' +
    '</div>' +
    '<button id="amBtn" aria-label="Talk to Amelia, the AI teacher"><img src="' + IMG + '" alt="Amelia"><span class="ai">AI</span></button>';
  document.body.appendChild(wrap);

  var btn = document.getElementById("amBtn"), panel = document.getElementById("amPanel"), msg = document.getElementById("amMsg");
  var chatLog = document.getElementById("amChatLog"), chatRow = document.getElementById("amChatRow");
  var chatIn = document.getElementById("amChatIn"), chatSend = document.getElementById("amChatSend");
  var quiet = localStorage.getItem(QUIET_KEY) === "1";
  function voiceLabel(){ return quiet ? "Voice: off" : "Voice: on"; }
  document.querySelector('[data-act="voice"]').textContent = voiceLabel();

  var cfgTag = document.createElement("script");
  cfgTag.src = "amelia-chat-config.js";
  document.head.appendChild(cfgTag);
  function chatReady(){ return window.AMELIA_CHAT && typeof window.AMELIA_CHAT.endpoint === "string" && window.AMELIA_CHAT.endpoint.length > 8; }

  // Her real voice: pre-rendered Neerja Expressive clips, chained in sequence.
  var player = null;
  function stopVoice(){
    if (player) { try { player.pause(); } catch(e){} player = null; }
    if (window.speechSynthesis) try { speec