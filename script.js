// ─── QUIZ BANKS — all 6 classes, 5 questions each ────────────────────────────
const QUIZ_BANKS = {
  jss1: {
    title: "JSS1 · HTML — Structure of the Web",
    next:  "jss2",
    questions: [
      { id:1, question:"What does HTML stand for?", options:["HighText Machine Language","Hyper Transfer Markup Link","Home Tool Markup Language","HyperText Markup Language"], correct_answer:"HyperText Markup Language", explanation:"HTML is the standard language used to structure and give meaning to web pages.", xp_value:10 },
      { id:2, question:"Which tag creates the largest, most important heading?", options:["<h6>","<heading>","<head>","<h1>"], correct_answer:"<h1>", explanation:"h1 is the top heading. Use one h1 per page, then h2–h6 for sub-sections.", xp_value:10 },
      { id:3, question:"Which attribute tells a link where to go?", options:["src","link","goto","href"], correct_answer:"href", explanation:"The <a> tag uses href to hold the destination URL.", xp_value:10 },
      { id:4, question:"Which <img> attribute describes the image for screen readers?", options:["title","src","desc","alt"], correct_answer:"alt", explanation:"alt text describes an image to people who can't see it, and shows if the image fails to load.", xp_value:10 },
      { id:5, question:"What is the most common beginner HTML mistake?", options:["Using too many headings","Forgetting a closing tag","Writing tags in lowercase","Adding alt text"], correct_answer:"Forgetting a closing tag", explanation:"A missing closing tag (like </p>) can break the whole layout and is hard to spot.", xp_value:15 },
    ]
  },
  jss2: {
    title: "JSS2 · CSS — Styling the Web",
    next:  "jss3",
    questions: [
      { id:1, question:"What does CSS stand for?", options:["Computer Style Sheets","Creative Style Sheets","Colorful Style Sheets","Cascading Style Sheets"], correct_answer:"Cascading Style Sheets", explanation:"CSS controls how HTML looks. 'Cascading' means styles flow from parent to child.", xp_value:10 },
      { id:2, question:"Which selector targets elements with class=\"card\"?", options:["#card","card","*card",".card"], correct_answer:".card", explanation:"A dot (.) selects by class. A hash (#) selects by ID. This is the classic beginner mix-up.", xp_value:10 },
      { id:3, question:"The box model has content, padding, border and…?", options:["shadow","outline","margin","gap"], correct_answer:"margin", explanation:"Margin is the space outside the border. Padding is the space inside it.", xp_value:10 },
      { id:4, question:"Which property controls the size of text?", options:["text-size","size","font","font-size"], correct_answer:"font-size", explanation:"font-size takes values like px and rem. rem is recommended for accessibility.", xp_value:10 },
      { id:5, question:"Which display value lays items out in a flexible row or column?", options:["block","inline","grid-row","flex"], correct_answer:"flex", explanation:"display: flex turns a container into a flexbox so its children line up neatly.", xp_value:15 },
    ]
  },
  jss3: {
    title: "JSS3 · JavaScript — Making It Work",
    next:  "ss1",
    questions: [
      { id:1, question:"Which keyword declares a value that CAN change later?", options:["const","fixed","var","let"], correct_answer:"let", explanation:"Use let for values that change, and const for values that should stay the same.", xp_value:10 },
      { id:2, question:"Which operator checks strict equality (value AND type)?", options:["=","==","=>","==="], correct_answer:"===", explanation:"= assigns. === checks that two values are strictly equal. Don't confuse them.", xp_value:10 },
      { id:3, question:"What does a function's return value do?", options:["Ends the program","Gives back a result you can use","Prints to the screen","Creates a variable"], correct_answer:"Gives back a result you can use", explanation:"A function takes inputs (parameters) and can return an output for the rest of your code.", xp_value:10 },
      { id:4, question:"Which finds an element on the page so JavaScript can change it?", options:["page.get()","find.element()","document.querySelector()","html.select()"], correct_answer:"document.querySelector()", explanation:"querySelector finds an element in the DOM; then you can update it or listen for clicks.", xp_value:10 },
      { id:5, question:"Which prints a message to the developer console for debugging?", options:["print()","log()","write()","console.log()"], correct_answer:"console.log()", explanation:"console.log() is your best debugging tool. Open DevTools with F12 to see it.", xp_value:15 },
    ]
  },
  ss1: {
    title: "SS1 · JavaScript on the Server",
    next:  "ss2",
    questions: [
      { id:1, question:"Where does the BACKEND of an app run?", options:["In the user's browser","On a server you control","On the user's phone","Inside the HTML file"], correct_answer:"On a server you control", explanation:"The frontend runs in the browser; the backend runs on a server, where secrets stay safe.", xp_value:10 },
      { id:2, question:"What lets JavaScript run on the server (outside the browser)?", options:["Chrome","Node.js","HTML","CSS"], correct_answer:"Node.js", explanation:"Node.js runs JavaScript as a program on the server — the foundation of the JS backend.", xp_value:10 },
      { id:3, question:"Which request method is used to READ data?", options:["POST","DELETE","GET","SEND"], correct_answer:"GET", explanation:"GET reads/fetches data. POST sends new data to the server.", xp_value:10 },
      { id:4, question:"Which request method SENDS new data to the server?", options:["GET","READ","OPEN","POST"], correct_answer:"POST", explanation:"POST submits new data — like sending a message to 'Ask Moya'.", xp_value:10 },
      { id:5, question:"What simple text format do APIs usually send back?", options:["MP3","JSON","JPEG","ZIP"], correct_answer:"JSON", explanation:"JSON is a lightweight text format for data that the frontend and backend both understand.", xp_value:15 },
    ]
  },
  ss2: {
    title: "SS2 · JavaScript + Database",
    next:  "ss3",
    questions: [
      { id:1, question:"Why does an app need a database?", options:["To make it look nicer","To remember data permanently","To run faster","To style the page"], correct_answer:"To remember data permanently", explanation:"A server forgets on restart; a database stores users and progress permanently.", xp_value:10 },
      { id:2, question:"In a database table, one single record is called a…?", options:["column","field","row","cell"], correct_answer:"row", explanation:"Columns are the fields (name, score); each row is one record, like one student.", xp_value:10 },
      { id:3, question:"CRUD stands for Create, Read, Update and…?", options:["Deploy","Delete","Download","Draw"], correct_answer:"Delete", explanation:"CRUD — Create, Read, Update, Delete — are the four things you do with data.", xp_value:10 },
      { id:4, question:"Which Supabase feature stops users seeing each other's private data?", options:["Dark mode","Row Level Security (RLS)","Auto-save","Flexbox"], correct_answer:"Row Level Security (RLS)", explanation:"RLS rules ensure a user can only read their own rows. Security is part of building.", xp_value:10 },
      { id:5, question:"Where must a secret database key be kept?", options:["In the HTML","In the frontend JavaScript","On the server only","In the CSS file"], correct_answer:"On the server only", explanation:"Never put a secret in code the browser can read. Secrets live on the server.", xp_value:15 },
    ]
  },
  ss3: {
    title: "SS3 · Build a Full-Stack Project",
    next:  null,
    questions: [
      { id:1, question:"In a full-stack app, the frontend sends requests to the…?", options:["database directly","backend (server)","CSS file","user"], correct_answer:"backend (server)", explanation:"Frontend → backend → database, then the data flows back. That round trip is full-stack.", xp_value:10 },
      { id:2, question:"What should you do before moving to the next feature?", options:["Deploy immediately","Test the piece you just built","Delete your code","Start a new project"], correct_answer:"Test the piece you just built", explanation:"Build one small piece, test it, then move on. It keeps bugs easy to find.", xp_value:10 },
      { id:3, question:"What does 'deploying' an app do?", options:["Deletes the app","Puts it online with a shareable link","Makes it run faster","Hides the code"], correct_answer:"Puts it online with a shareable link", explanation:"Deploying puts your app on the internet — the way MoyaCode is live for you now.", xp_value:10 },
      { id:4, question:"What's the best way to tackle a big project?", options:["Build everything at once","Build one small piece at a time","Never plan","Copy someone else's whole app"], correct_answer:"Build one small piece at a time", explanation:"A finished small app beats an unfinished big one. Ship one clear feature fully.", xp_value:10 },
      { id:5, question:"How do professional developers use AI like MoyaBot?", options:["To write the whole app for them","To explain errors and suggest fixes","They never use AI","To style pages only"], correct_answer:"To explain errors and suggest fixes", explanation:"Pros use AI daily to understand errors and move faster — a real, learnable skill.", xp_value:15 },
    ]
  }
};

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const MAX_LIVES      = 3;
const PASS_THRESHOLD = 0.6;
const FEEDBACK_DELAY = 2600;

const CORRECT_MSGS = [
  "Oya! You nailed it like a true Owo champion! 🔥",
  "Correct! Your brain dey sharp pass cutlass!",
  "Block by block, you dey build am — legend!",
  "E correct! MoyaCode proud of you today!",
  "Sharp sharp! That is exactly right!",
];
const WRONG_MSGS = [
  "Ah ah! Small mistake, no wahala. Debugging makes champions 💪",
  "E no correct this time, but tomorrow e go better!",
  "Heart survived… barely! One more try, superstar.",
  "Even the best coders miss sometimes. Try again!",
];

// ─── STATE ────────────────────────────────────────────────────────────────────
let state = {
  activeQuizKey:        null,
  activeQuestions:      [],
  currentQuestionIndex: 0,
  currentLives:         MAX_LIVES,
  score:                0,
  streak:               0,
  xp:                   0,
  selectedAnswer:       null,
  feedbackState:        "idle",
  phase:                "home",
  hintUsed:             false,
  hintEliminated:       null,
};
let autoDismissTimer = null;

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
function normalize(v) { return String(v || "").trim(); }
function el(id)       { return document.getElementById(id); }
function setText(e,t) { if (e) e.textContent = t; }
function setHTML(e,h) { if (e) e.innerHTML   = h; }
function setDisp(e,v) { if (e) e.style.display = v; }
function escapeHTML(v) {
  return String(v || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}
function readProfile() {
  return {
    dream: localStorage.getItem("moyacode_dream") || "",
    motivation: localStorage.getItem("moyacode_motivation") || "",
    goal: localStorage.getItem("moyacode_goal") || "",
  };
}

function saveProgress(key) {
  localStorage.setItem(`moyacode_progress_${key}`, JSON.stringify({
    score:     state.score,
    xp:        state.xp,
    completed: true,
    updatedAt: new Date().toISOString(),
  }));
  window.MOYADB?.markCourseComplete(key, { score: state.score, xp: state.xp });
}

// ─── AGENT MAP (Faculty) ──────────────────────────────────────────────────────
const AGENT_MAP = {
  jss1: { name: "Chidi", role: "HTML",       emoji: "🌐" },
  jss2: { name: "Amaka", role: "CSS",        emoji: "🎨" },
  jss3: { name: "Emeka", role: "JavaScript", emoji: "⚡" },
  ss1:  { name: "Ngozi", role: "Server",     emoji: "🖥️" },
  ss2:  { name: "Ngozi", role: "Database",   emoji: "🗄️" },
  ss3:  { name: "Kunle", role: "Projects",   emoji: "🚀" },
};

function getAgentHandoff(fromKey, toKey) {
  const from = AGENT_MAP[fromKey];
  const to   = AGENT_MAP[toKey];
  if (!from || !to || from.name === to.name) return null;
  return `${from.emoji} From ${from.name}: You've finished ${from.role}. Passing you to ${to.emoji} ${to.name} for ${to.role}.`;
}

function logHandoff(fromKey, toKey) {
  const from = AGENT_MAP[fromKey];
  const to   = AGENT_MAP[toKey];
  if (!from || !to || from.name === to.name) return;
  try {
    const k   = "moyacode_handoffs";
    const log = JSON.parse(localStorage.getItem(k) || "[]");
    log.push({ fromKey, toKey, fromAgent: from.name, toAgent: to.name, timestamp: new Date().toISOString() });
    localStorage.setItem(k, JSON.stringify(log));
  } catch {}
  window.MOYADB?.logHandoffEvent({ fromCourse: fromKey, toCourse: toKey, fromAgent: from.name, toAgent: to.name });
}

function logScore(entry) {
  try {
    const k   = "moyacode_session_log";
    const log = JSON.parse(localStorage.getItem(k) || "[]");
    log.push(entry);
    localStorage.setItem(k, JSON.stringify(log));
  } catch(e) {}
}

// ─── DOM — null-safe, matches quiz.html exact IDs ────────────────────────────
const DOM = {
  homeView:      el("home-view"),
  quizView:      el("quiz-view"),
  endScreen:     el("end-screen"),
  backBtn:       el("back-btn"),
  closeBtn:      el("close-btn"),
  subjectBadge:  el("dynamic-subject-badge"),
  heartsDisplay: el("hearts-display"),
  xpDisplay:     el("xp-display"),
  streakDisplay: el("streak-display"),
  goalIndicator: el("goal-indicator"),
  progressBar:   el("progress-bar"),
  progressLabel: el("progress-label"),
  questionText:  el("question-text"),
  optionsGrid:   el("options-grid"),
  assemblyArea:  el("assembly-area"),
  checkBtn:      el("check-btn"),
  skipBtn:       el("skip-btn"),
  // feedback drawer — support both id variants
  drawer:        el("feedback-drawer"),
  drawerTitle:   el("feedback-title") || el("drawer-title"),
  drawerExpl:    el("drawer-explanation"),
  teacherComment:el("teacher-comment"),
  xpEarned:      el("xp-earned"),
  continueBtn:   el("continue-btn"),
  hintBtn:       el("hint-btn"),
  // end screen
  endBadge:      el("end-badge"),
  endEmoji:      el("end-emoji"),
  endTitle:      el("end-title"),
  endSub:        el("end-sub"),
  endJourney:    el("end-journey"),
  endHighlight:  el("end-highlight"),
  endStats:      el("end-stats"),
  restartBtn:    el("restart-btn"),
  confettiBurst: el("confetti-burst"),
};

// ─── START QUIZ ───────────────────────────────────────────────────────────────
window.startQuiz = function(classKey) {
  const quiz = QUIZ_BANKS[classKey];
  if (!quiz) { console.warn("Unknown classKey:", classKey); return; }

  state.activeQuizKey        = classKey;
  state.activeQuestions      = shuffle(quiz.questions).map(q => ({
    ...q, options: shuffle(q.options),
  }));
  state.currentQuestionIndex = 0;
  state.currentLives         = MAX_LIVES;
  state.score  = state.streak = state.xp = 0;
  state.selectedAnswer  = null;
  state.feedbackState   = "idle";
  state.phase           = "quiz";

  setText(DOM.subjectBadge, quiz.title);

  const goal = localStorage.getItem("moyacode_goal") || "";
  if (DOM.goalIndicator) {
    DOM.goalIndicator.style.display = goal ? "inline-block" : "none";
    if (goal) DOM.goalIndicator.textContent = `🎯 ${goal}`;
  }

  setDisp(DOM.homeView,  "none");
  setDisp(DOM.endScreen, "none");
  setDisp(DOM.quizView,  "block");

  renderGame();
};

// ─── RENDER GAME ─────────────────────────────────────────────────────────────
function renderGame() {
  if (state.currentQuestionIndex >= state.activeQuestions.length) {
    state.phase = "complete"; showEndScreen(); return;
  }
  const q   = state.activeQuestions[state.currentQuestionIndex];
  const pct = Math.round((state.currentQuestionIndex / state.activeQuestions.length) * 100);

  if (DOM.progressBar) DOM.progressBar.style.width = `${pct}%`;
  setText(DOM.progressLabel, `Question ${state.currentQuestionIndex + 1} of ${state.activeQuestions.length}`);
  setText(DOM.xpDisplay, `⚡ ${state.xp} XP`);

  if (DOM.streakDisplay) {
    DOM.streakDisplay.style.display = state.streak >= 2 ? "inline-block" : "none";
    if (state.streak >= 2) DOM.streakDisplay.textContent = `🔥 ${state.streak} streak`;
  }

  if (DOM.questionText) {
    DOM.questionText.classList.remove("refreshed");
    void DOM.questionText.offsetWidth;
    DOM.questionText.classList.add("refreshed");
    DOM.questionText.textContent = q.question;
  }

  state.hintUsed       = false;
  state.hintEliminated = null;

  setText(DOM.assemblyArea, "");
  renderHearts();
  renderOptions();
  updateCheckBtn();
  updateHintBtn();
}

// ─── HEARTS ──────────────────────────────────────────────────────────────────
function renderHearts(prevLives) {
  if (!DOM.heartsDisplay) return;
  const cur = Math.max(0, state.currentLives);
  const old = prevLives !== undefined ? Math.max(0, prevLives) : cur;
  const draw = (n, pop = -1) => {
    DOM.heartsDisplay.innerHTML = Array.from({length:n}, (_,i) =>
      `<span class="heart${i===pop?" pop":""}">❤️</span>`
    ).join("");
  };
  if (cur < old && old > 0) { draw(old, old-1); setTimeout(()=>draw(cur), 260); }
  else draw(cur);
}

// ─── OPTIONS ─────────────────────────────────────────────────────────────────
function renderOptions() {
  if (!DOM.optionsGrid) return;
  const q      = state.activeQuestions[state.currentQuestionIndex];
  const locked = state.feedbackState !== "idle";
  const LTR    = ["A","B","C","D"];
  DOM.optionsGrid.innerHTML = "";

  q.options.forEach((opt, i) => {
    const isSelected   = state.selectedAnswer === i;
    const isCorrect    = locked && normalize(opt) === normalize(q.correct_answer);
    const isWrong      = locked && isSelected && normalize(opt) !== normalize(q.correct_answer);
    const isLocked     = locked && !isSelected && !isCorrect;
    const isEliminated = !locked && state.hintEliminated === i;

    const btn = document.createElement("button");
    btn.className = "option-btn"
      + (isSelected && !locked ? " selected"   : "")
      + (isCorrect             ? " correct"    : "")
      + (isWrong               ? " wrong"      : "")
      + (isLocked              ? " locked"     : "")
      + (isEliminated          ? " eliminated" : "");

    const letter = document.createElement("span");
    letter.className = "option-letter";
    letter.textContent = LTR[i];

    const textSpan = document.createElement("span");
    textSpan.className = "option-text";
    textSpan.textContent = opt;

    btn.appendChild(letter);
    btn.appendChild(textSpan);

    if (isCorrect || isWrong) {
      const icon = document.createElement("span");
      icon.className = "option-icon";
      icon.textContent = isCorrect ? "✅" : "❌";
      btn.appendChild(icon);
    }

    if (!locked && !isEliminated) {
      btn.addEventListener("click", () => {
        state.selectedAnswer = i;
        setText(DOM.assemblyArea, opt);
        renderOptions();
        updateCheckBtn();
      });
    }
    DOM.optionsGrid.appendChild(btn);
  });
}

// ─── CHECK BTN ───────────────────────────────────────────────────────────────
function updateCheckBtn() {
  if (!DOM.checkBtn) return;
  const on = state.selectedAnswer !== null && state.feedbackState === "idle";
  DOM.checkBtn.disabled = !on;
  DOM.checkBtn.classList.toggle("active", on);
}

// ─── HINT ─────────────────────────────────────────────────────────────────────
function updateHintBtn() {
  if (!DOM.hintBtn) return;
  const disabled = state.hintUsed || state.feedbackState !== "idle";
  DOM.hintBtn.disabled = disabled;
  DOM.hintBtn.classList.toggle("used", state.hintUsed);
  DOM.hintBtn.textContent = state.hintUsed ? "Hint used" : "💡 Hint";
}

function handleHint() {
  if (state.hintUsed || state.feedbackState !== "idle") return;
  const q = state.activeQuestions[state.currentQuestionIndex];

  // Indices of wrong options, excluding whatever the student already selected
  const candidates = q.options
    .map((opt, i) => ({ opt, i }))
    .filter(({ opt, i }) =>
      normalize(opt) !== normalize(q.correct_answer) && i !== state.selectedAnswer
    )
    .map(({ i }) => i);

  if (!candidates.length) return;

  state.hintEliminated = candidates[Math.floor(Math.random() * candidates.length)];
  state.hintUsed = true;

  renderOptions();
  updateHintBtn();
}

// ─── CHECK ANSWER ─────────────────────────────────────────────────────────────
function handleCheck() {
  if (state.feedbackState !== "idle" || state.selectedAnswer === null) return;
  const q         = state.activeQuestions[state.currentQuestionIndex];
  const isCorrect = normalize(q.options[state.selectedAnswer]) === normalize(q.correct_answer);
  const prevLives = state.currentLives;

  state.feedbackState = isCorrect ? "correct" : "incorrect";
  if (isCorrect) { state.score++; state.xp += q.xp_value; state.streak++; }
  else           { state.currentLives--; state.streak = 0; }
  if (state.currentLives <= 0) state.phase = "gameover";

  const scoreEntry = { questionId:q.id, classKey:state.activeQuizKey, isCorrect, timestamp:new Date().toISOString(), xpAwarded:isCorrect?q.xp_value:0 };
  logScore(scoreEntry);
  window.MOYADB?.logAnswerEvent({ classKey:scoreEntry.classKey, questionId:scoreEntry.questionId, isCorrect:scoreEntry.isCorrect, xpAwarded:scoreEntry.xpAwarded });

  try { navigator.vibrate && navigator.vibrate(isCorrect ? [30,50,30] : [80,40,80]); } catch(e){}

  renderOptions();
  renderHearts(prevLives);
  updateCheckBtn();
  showFeedback(isCorrect, q);
}

// ─── FEEDBACK ────────────────────────────────────────────────────────────────
function showFeedback(isCorrect, q) {
  if (!DOM.drawer) {
    clearTimeout(autoDismissTimer);
    autoDismissTimer = setTimeout(handleContinue, FEEDBACK_DELAY);
    return;
  }
  DOM.drawer.classList.remove("theme-correct","theme-incorrect");
  DOM.drawer.classList.add(isCorrect ? "theme-correct" : "theme-incorrect");

  setText(DOM.drawerTitle,     isCorrect ? "Correct! Well done!" : "Not quite…");
  setText(DOM.drawerExpl,      q.explanation || "");
  setText(DOM.teacherComment,  `"${(isCorrect ? CORRECT_MSGS : WRONG_MSGS)[Math.floor(Math.random() * 5)]}"`);

  if (DOM.xpEarned) {
    DOM.xpEarned.style.display = isCorrect ? "block" : "none";
    if (isCorrect) DOM.xpEarned.textContent = `+${q.xp_value} XP 🔥`;
  }

  setText(DOM.continueBtn, isCorrect ? "Next Question →" : "Try Again");
  DOM.drawer.classList.add("open");
  updateHintBtn();

  clearTimeout(autoDismissTimer);
  autoDismissTimer = setTimeout(handleContinue, FEEDBACK_DELAY);
}

// ─── CONTINUE ────────────────────────────────────────────────────────────────
function handleContinue() {
  clearTimeout(autoDismissTimer);
  if (DOM.drawer) DOM.drawer.classList.remove("open");
  if (state.phase === "gameover") { showEndScreen(); return; }

  const next = state.currentQuestionIndex + 1;
  if (next >= state.activeQuestions.length) { state.phase = "complete"; showEndScreen(); return; }

  state.currentQuestionIndex = next;
  state.selectedAnswer       = null;
  state.feedbackState        = "idle";
  setTimeout(renderGame, 300);
}

// ─── SKIP ─────────────────────────────────────────────────────────────────────
function handleSkip() {
  if (state.feedbackState !== "idle") return;
  state.selectedAnswer = null;
  handleContinue();
}

// ─── END SCREEN ───────────────────────────────────────────────────────────────
function showEndScreen() {
  setDisp(DOM.homeView,  "none");
  setDisp(DOM.quizView,  "none");
  if (DOM.drawer) DOM.drawer.classList.remove("open");
  setDisp(DOM.endScreen, "flex");

  const total      = state.activeQuestions.length;
  const passed     = state.phase !== "gameover" && state.score / total >= PASS_THRESHOLD;
  const classKey   = state.activeQuizKey;
  const quiz       = QUIZ_BANKS[classKey];
  const nextKey    = quiz?.next || null;
  const isLast     = !nextKey;
  const livesLeft  = Math.max(0, state.currentLives);
  const profile    = readProfile();

  if (passed) {
    saveProgress(classKey);
    if (nextKey) logHandoff(classKey, nextKey);
  }
  renderConfetti(passed, passed && isLast);

  if (state.phase === "gameover") {
    setText(DOM.endBadge, "Quest Debrief");
    setText(DOM.endEmoji, "💔");
    setText(DOM.endTitle, "Out of hearts");
    setText(DOM.endSub,   "No worries — every champion falls first. Try again!");
    setText(DOM.endJourney, `You fought through ${quiz.title}, earned ${state.xp} XP, and reached a best streak of ${state.streak}. One more run and you'll be sharper.`);
    setHTML(DOM.endHighlight, buildEndHighlights({ quiz, nextKey, profile, livesLeft, passed }));
    setText(DOM.restartBtn, "Try Again 🔄");
    if (DOM.restartBtn) DOM.restartBtn.onclick = () => window.startQuiz(classKey);
  } else if (passed) {
    setText(DOM.endBadge, isLast ? "Legend Status" : "Quest Complete");
    setText(DOM.endEmoji, isLast ? "👑" : "🏆");
    setText(DOM.endTitle, isLast ? "You cleared ALL quests!" : `${quiz.title} — Cleared! ✅`);
    const handoffMsg = !isLast ? getAgentHandoff(classKey, nextKey) : null;
    setText(DOM.endSub, isLast
      ? "You completed the full MoyaCode curriculum. You are a Legend."
      : handoffMsg || `Next up: ${QUIZ_BANKS[nextKey].title}`);
    setText(DOM.endJourney, buildJourneyRecap({ quiz, nextKey, profile, livesLeft, passed, isLast }));
    setHTML(DOM.endHighlight, buildEndHighlights({ quiz, nextKey, profile, livesLeft, passed, isLast }));
    setText(DOM.restartBtn, "Back to Quests 📚");
    if (DOM.restartBtn) DOM.restartBtn.onclick = goHome;
  } else {
    setText(DOM.endBadge, "Almost There");
    setText(DOM.endEmoji, "😅");
    setText(DOM.endTitle, "So close — try once more!");
    setText(DOM.endSub,   `You scored ${state.score}/${total}. You need ${Math.ceil(total * PASS_THRESHOLD)} to pass.`);
    setText(DOM.endJourney, buildJourneyRecap({ quiz, nextKey, profile, livesLeft, passed, isLast }));
    setHTML(DOM.endHighlight, buildEndHighlights({ quiz, nextKey, profile, livesLeft, passed, isLast }));
    setText(DOM.restartBtn, "Try Again 🔄");
    if (DOM.restartBtn) DOM.restartBtn.onclick = () => window.startQuiz(classKey);
  }

  setHTML(DOM.endStats, `
    <div class="stat-card"><span class="stat-num">${state.score}/${total}</span><span class="stat-label">Score</span></div>
    <div class="stat-card"><span class="stat-num">${state.xp}</span><span class="stat-label">XP Earned</span></div>
    <div class="stat-card"><span class="stat-num">${state.streak}🔥</span><span class="stat-label">Streak</span></div>
    <div class="stat-card"><span class="stat-num">${livesLeft}</span><span class="stat-label">Hearts Left</span></div>
    ${passed ? '<div class="stat-card stat-pass"><span class="stat-num">✅</span><span class="stat-label">Passed</span></div>' : ""}
  `);

  renderActionButtons(passed, classKey, nextKey, isLast);
}

// ─── ACTION BUTTONS ───────────────────────────────────────────────────────────
function buildJourneyRecap({ quiz, nextKey, profile, livesLeft, passed, isLast }) {
  const dream = profile.dream || "your coding dream";
  const motivation = profile.motivation || "your next big goal";
  const goal = profile.goal || "daily practice";

  if (passed && isLast) {
    return `From ${dream} to ${motivation}, you stayed consistent with ${goal} and just wrapped the full journey with ${livesLeft} hearts left. That is real main-character energy.`;
  }

  if (passed) {
    return `You powered through ${quiz.title}, stayed true to ${goal}, and kept your eyes on ${dream}. That win unlocks ${QUIZ_BANKS[nextKey].title} next.`;
  }

  return `You are still on the path to ${dream}. This round built your reflexes, and your ${goal} commitment plus ${motivation} mindset will help you crush the next attempt.`;
}

function buildEndHighlights({ quiz, nextKey, profile, livesLeft, passed, isLast }) {
  const cards = [
    `<div class="end-highlight-card"><strong>Quest</strong><span>${escapeHTML(quiz.title)}</span></div>`,
    `<div class="end-highlight-card"><strong>Goal Mode</strong><span>${escapeHTML(profile.goal || "Not set yet")}</span></div>`,
    `<div class="end-highlight-card"><strong>Why You Started</strong><span>${escapeHTML(profile.motivation || profile.dream || "Keep exploring")}</span></div>`,
    `<div class="end-highlight-card"><strong>${escapeHTML(passed ? (isLast ? "Legend Status" : "Unlocked Next") : "Hearts Left")}</strong><span>${escapeHTML(passed ? (isLast ? "Curriculum Complete" : QUIZ_BANKS[nextKey].title) : `${livesLeft} hearts standing`)}</span></div>`,
  ];
  return cards.join("");
}

function renderConfetti(active, isGrad) {
  if (!DOM.confettiBurst) return;
  DOM.confettiBurst.innerHTML = "";
  if (!active) return;
  const count  = isGrad ? 42 : 18;
  const colors = ["#00E5A0","#60A5FA","#FCD34D","#FB7185","#A78BFA","#34D399"];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * (isGrad ? 0.7 : 0.35)}s`;
    piece.style.setProperty("--drift", `${(Math.random() - 0.5) * (isGrad ? 130 : 90)}px`);
    if (isGrad) piece.style.animationDuration = `${1800 + Math.random() * 1200}ms`;
    DOM.confettiBurst.appendChild(piece);
  }
}

function renderActionButtons(passed, classKey, nextKey, isLast) {
  const existing = el("end-actions");
  if (existing) existing.remove();
  if (!DOM.endStats) return;

  const wrap = document.createElement("div");
  wrap.id = "end-actions"; wrap.className = "end-actions";

  if (passed && nextKey) {
    const b = document.createElement("button");
    b.className = "btn-primary end-next-btn";
    b.textContent = `Start ${QUIZ_BANKS[nextKey].title} →`;
    b.addEventListener("click", () => window.startQuiz(nextKey));
    wrap.appendChild(b);
  }

  if (passed && isLast) {
    const today   = new Date();
    const dateStr = today.toLocaleDateString("en-NG", { day:"numeric", month:"long", year:"numeric" });
    const cert = document.createElement("div");
    cert.className = "cert-card";
    cert.id = "certificate";
    cert.innerHTML = `
      <span class="cert-seal">🎓</span>
      <div class="cert-org">MoyaCode Academy</div>
      <div class="cert-presents">This certifies that</div>
      <input class="cert-name-input" id="cert-name" placeholder="Type your name here" maxlength="40" />
      <div class="cert-name-hint">Tap to add your name before sharing</div>
      <div class="cert-completed">has successfully completed the</div>
      <div class="cert-program">Full Stack Developer Curriculum</div>
      <div class="cert-courses">HTML · CSS · JavaScript · Servers · Databases · Full-Stack</div>
      <div class="cert-divider"></div>
      <div class="cert-footer">
        <div class="cert-sig">MoyaCode Faculty</div>
        <div class="cert-date">${escapeHTML(dateStr)}</div>
      </div>
    `;
    wrap.appendChild(cert);
  }

  const share = document.createElement("button");
  share.className = "btn-outline end-share-btn";
  share.textContent = passed && isLast ? "🎓 Share Certificate on WhatsApp" : "📲 Share Result on WhatsApp";
  share.addEventListener("click", () => {
    const quiz  = QUIZ_BANKS[classKey];
    const total = state.activeQuestions.length;
    let msg;
    if (passed && isLast) {
      const name = (document.getElementById("cert-name")?.value.trim()) || "A MoyaCode student";
      msg = `🎓 ${name} just graduated from MoyaCode as a full-stack developer!\n\nI completed the full curriculum:\n✅ HTML (JSS1)\n✅ CSS (JSS2)\n✅ JavaScript (JSS3)\n✅ JavaScript on the Server (SS1)\n✅ JavaScript + Database (SS2)\n✅ Full-Stack Project (SS3)\n\nFree coding education for Nigerian secondary school students.\n🔗 https://moyacode.vercel.app`;
    } else {
      msg = `${passed?"🏆":"💪"} I ${passed?"passed":"attempted"} the ${quiz.title} quest on MoyaCode — ${state.score}/${total} (${state.xp} XP)!\n\nFree coding platform for Nigerian secondary school students.\n🔗 https://moyacode.vercel.app`;
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  });
  wrap.appendChild(share);

  DOM.endStats.insertAdjacentElement("afterend", wrap);
}

// ─── GO HOME ──────────────────────────────────────────────────────────────────
function goHome() {
  clearTimeout(autoDismissTimer);
  state.phase = "home";
  setDisp(DOM.endScreen, "none");
  setDisp(DOM.quizView,  "none");
  if (DOM.drawer) DOM.drawer.classList.remove("open");
  setDisp(DOM.homeView,  "flex");
  const ex = el("end-actions"); if (ex) ex.remove();
}

// ─── EVENT LISTENERS — every one null-safe ────────────────────────────────────
if (DOM.checkBtn)    DOM.checkBtn.addEventListener("click",    handleCheck);
if (DOM.continueBtn) DOM.continueBtn.addEventListener("click", handleContinue);
if (DOM.restartBtn)  DOM.restartBtn.addEventListener("click",  goHome);
if (DOM.backBtn)     DOM.backBtn.addEventListener("click",     goHome);
if (DOM.closeBtn)    DOM.closeBtn.addEventListener("click",    goHome);
if (DOM.skipBtn)     DOM.skipBtn.addEventListener("click",     handleSkip);
if (DOM.hintBtn)     DOM.hintBtn.addEventListener("click",     handleHint);

// ─── INIT ─────────────────────────────────────────────────────────────────────
function initQuizPage() {
  const params   = new URLSearchParams(window.location.search);
  const classKey = (params.get("class") || "").toLowerCase();

  if (classKey && QUIZ_BANKS[classKey]) {
    window.startQuiz(classKey);
    return;
  }

  goHome();
}

initQuizPage();
