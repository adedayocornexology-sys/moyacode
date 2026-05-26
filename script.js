// ─── QUIZ BANKS — all 6 classes, 5 questions each ────────────────────────────
const QUIZ_BANKS = {
  jss1: {
    title: "JSS1 · Scratch Basics",
    next:  "jss2",
    questions: [
      { id:1, question:"Which block starts the program when the green flag is clicked?", options:["When green flag clicked","Forever","Wait 1 second","Stop all"], correct_answer:"When green flag clicked", explanation:"The green flag block is the standard entry point for every Scratch project.", xp_value:10 },
      { id:2, question:"Which block makes a sprite display a speech bubble?", options:["Think [Hello]","Broadcast [Hello]","Say [Hello]","Play sound"], correct_answer:"Say [Hello]", explanation:"Say shows a speech bubble. Think shows a thought bubble — they look different on screen.", xp_value:10 },
      { id:3, question:"Which motion block moves a sprite to the right?", options:["Change y by 10","Point in direction 90","Change x by 10","Go to random position"], correct_answer:"Change x by 10", explanation:"X controls left-right movement on the Scratch stage. Positive x = right.", xp_value:10 },
      { id:4, question:"Which block repeats actions forever until the project stops?", options:["Repeat 10","If then","Wait until","Forever"], correct_answer:"Forever", explanation:"The Forever loop keeps running every frame until the project is stopped.", xp_value:10 },
      { id:5, question:"Which block switches how a sprite looks?", options:["Show variable","Set volume","Next costume","Change size by"], correct_answer:"Next costume", explanation:"Costumes are visual appearances. Next costume cycles through them in order.", xp_value:15 },
    ]
  },
  jss2: {
    title: "JSS2 · Advanced Scratch",
    next:  "jss3",
    questions: [
      { id:1, question:"Which block category contains the if...then...else block?", options:["Motion","Looks","Operators","Control"], correct_answer:"Control", explanation:"Control blocks manage logic flow — loops, conditions, and script timing all live here.", xp_value:10 },
      { id:2, question:"What does the Forever block do in Scratch?", options:["Runs a script once","Stops all scripts","Waits for a key press","Repeats blocks indefinitely until stopped"], correct_answer:"Repeats blocks indefinitely until stopped", explanation:"Forever creates an infinite loop. Put a Stop block inside it to break out.", xp_value:10 },
      { id:3, question:"Which block makes a sprite say Hello for 2 seconds?", options:["Think [Hello] for [2] seconds","Broadcast [Hello]","Play sound [Hello]","Say [Hello] for [2] seconds"], correct_answer:"Say [Hello] for [2] seconds", explanation:"Say shows a speech bubble for a set time. Think shows a thought bubble.", xp_value:10 },
      { id:4, question:"In Scratch, what is a sprite?", options:["The background image","A sound file","A block that controls timing","A character or object that can be programmed"], correct_answer:"A character or object that can be programmed", explanation:"Sprites are the actors in your Scratch project — they move, speak, and react.", xp_value:10 },
      { id:5, question:"What does the broadcast block do?", options:["Makes the sprite louder","Sends sprite to a new costume","Copies a block to another sprite","Sends a message other sprites can receive"], correct_answer:"Sends a message other sprites can receive", explanation:"Broadcast allows sprites to communicate and trigger scripts on other sprites.", xp_value:15 },
    ]
  },
  jss3: {
    title: "JSS3 · Intro to HTML",
    next:  "ss1",
    questions: [
      { id:1, question:"What does HTML stand for?", options:["HighText Machine Language","Hyper Transfer Markup Link","Home Tool Markup Language","HyperText Markup Language"], correct_answer:"HyperText Markup Language", explanation:"HTML is the standard language used to structure and give meaning to web pages.", xp_value:10 },
      { id:2, question:"Which tag creates the largest heading on a page?", options:["<h6>","<heading>","<head>","<h1>"], correct_answer:"<h1>", explanation:"h1 is the most important heading. h6 is the least important. Always use one h1 per page.", xp_value:10 },
      { id:3, question:"Which tag wraps a paragraph of text?", options:["<text>","<para>","<article>","<p>"], correct_answer:"<p>", explanation:"The p element stands for paragraph and wraps blocks of body text.", xp_value:10 },
      { id:4, question:"Which tag inserts a single line break?", options:["<break>","<lb>","<line>","<br>"], correct_answer:"<br>", explanation:"br creates a line break inline. It has no closing tag.", xp_value:10 },
      { id:5, question:"Which tag marks text as strongly important?", options:["<bold>","<em>","<important>","<strong>"], correct_answer:"<strong>", explanation:"strong marks text as important. Browsers render it bold by default, but the meaning is semantic.", xp_value:15 },
    ]
  },
  ss1: {
    title: "SS1 · Advanced HTML",
    next:  "ss2",
    questions: [
      { id:1, question:"Which tag creates a numbered ordered list?", options:["<ul>","<li>","<list>","<ol>"], correct_answer:"<ol>", explanation:"ol means ordered list — numbers. ul means unordered list — bullets.", xp_value:10 },
      { id:2, question:"Which attribute tells an image where to load from?", options:["href=","link=","source=","src="], correct_answer:"src=", explanation:"src stands for source. It holds the URL or file path of the image to display.", xp_value:10 },
      { id:3, question:"Which tag creates a dropdown selection menu?", options:["<dropdown>","<option>","<menu>","<select>"], correct_answer:"<select>", explanation:"select creates the dropdown container. option tags go inside it for each choice.", xp_value:10 },
      { id:4, question:"Which tag defines a row inside an HTML table?", options:["<td>","<th>","<row>","<tr>"], correct_answer:"<tr>", explanation:"tr means table row. td is a table cell inside that row. th is a header cell.", xp_value:10 },
      { id:5, question:"Which semantic tag marks the bottom section of a page?", options:["<bottom>","<end>","<base>","<footer>"], correct_answer:"<footer>", explanation:"footer is a semantic tag that tells browsers and screen readers this is the page footer.", xp_value:15 },
    ]
  },
  ss2: {
    title: "SS2 · CSS Styling",
    next:  "ss3",
    questions: [
      { id:1, question:"What does CSS stand for?", options:["Computer Style Sheets","Creative Style Sheets","Colorful Style Sheets","Cascading Style Sheets"], correct_answer:"Cascading Style Sheets", explanation:"CSS describes how HTML elements are displayed. Cascading means styles flow from parent to child.", xp_value:10 },
      { id:2, question:"Which property changes the background color of an element?", options:["color","bgcolor","bg-color","background-color"], correct_answer:"background-color", explanation:"background-color sets the fill behind the element's content. color only affects the text.", xp_value:10 },
      { id:3, question:"Which CSS symbol targets an element by its ID?", options:[".","*","@","#"], correct_answer:"#", explanation:"# is the ID selector. A period (.) selects by class. IDs should be unique on each page.", xp_value:10 },
      { id:4, question:"Which property controls the size of text?", options:["text-size","size","font","font-size"], correct_answer:"font-size", explanation:"font-size accepts values in px, rem, em, and %. rem is recommended for accessibility.", xp_value:10 },
      { id:5, question:"Which CSS symbol targets elements by their class name?", options:["#","*",">","."], correct_answer:".", explanation:"A period targets class names. You can apply the same class to many elements.", xp_value:15 },
    ]
  },
  ss3: {
    title: "SS3 · JavaScript Logic",
    next:  null,
    questions: [
      { id:1, question:"Which keyword declares a block-scoped variable in modern JavaScript?", options:["var","int","const","let"], correct_answer:"let", explanation:"let is block-scoped and can be reassigned. const is block-scoped but cannot be reassigned. Avoid var.", xp_value:10 },
      { id:2, question:"How do you show a popup message to the user?", options:["popup()","msg()","window()","alert()"], correct_answer:"alert()", explanation:"alert() displays a browser dialog box. It pauses script execution until the user clicks OK.", xp_value:10 },
      { id:3, question:"How do you write a single-line comment in JavaScript?", options:["/* comment */","<!-- comment -->","# comment","// comment"], correct_answer:"// comment", explanation:"// starts a single-line comment. Everything after // on that line is ignored by the browser.", xp_value:10 },
      { id:4, question:"Which operator assigns a value to a variable?", options:["==","===","=>","="], correct_answer:"=", explanation:"= assigns a value. == checks loose equality. === checks strict equality (value AND type).", xp_value:10 },
      { id:5, question:"How do you print a message to the browser developer console?", options:["print()","log()","write()","console.log()"], correct_answer:"console.log()", explanation:"console.log() is your best debugging tool. Open DevTools with F12 to see the output.", xp_value:15 },
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
  jss1: { name: "Tolu",  role: "Scratch",     emoji: "🎮" },
  jss2: { name: "Tolu",  role: "Scratch",     emoji: "🎮" },
  jss3: { name: "Chidi", role: "HTML",        emoji: "🌐" },
  ss1:  { name: "Chidi", role: "HTML",        emoji: "🌐" },
  ss2:  { name: "Amaka", role: "CSS",         emoji: "🎨" },
  ss3:  { name: "Emeka", role: "JavaScript",  emoji: "⚡" },
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
  renderConfetti(passed);

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

function renderConfetti(active) {
  if (!DOM.confettiBurst) return;
  DOM.confettiBurst.innerHTML = "";
  if (!active) return;

  const colors = ["#00E5A0", "#60A5FA", "#FCD34D", "#FB7185", "#A78BFA"];
  for (let i = 0; i < 18; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.35}s`;
    piece.style.setProperty("--drift", `${(Math.random() - 0.5) * 90}px`);
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
    const a = document.createElement("a");
    a.className = "btn-primary end-next-btn";
    a.href = "bootcamp.html";
    a.textContent = "Upgrade to Pro — Get a Real Tutor 🚀";
    wrap.appendChild(a);
  }

  const share = document.createElement("button");
  share.className = "btn-outline end-share-btn";
  share.textContent = "📲 Share Result on WhatsApp";
  share.addEventListener("click", () => {
    const quiz  = QUIZ_BANKS[classKey];
    const total = state.activeQuestions.length;
    const msg   = `${passed?"🏆":"💪"} I ${passed?"passed":"attempted"} the ${quiz.title} quest on MoyaCode — ${state.score}/${total} (${state.xp} XP)!\n\nFree coding platform for Nigerian secondary school students.\n🔗 https://adedayocornexology-sys.github.io/moyacode/`;
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
