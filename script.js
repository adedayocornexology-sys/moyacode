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
      { id:5, question:"How do you print a message to the browser's developer console?", options:["print()","log()","write()","console.log()"], correct_answer:"console.log()", explanation:"console.log() is your best debugging tool. Open DevTools with F12 to see the output.", xp_value:15 },
    ]
  }
};

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const MAX_LIVES        = 3;
const PASS_THRESHOLD   = 0.6; // 60% to pass
const FEEDBACK_DELAY   = 2600;

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

// ─── QUEST ORDER for progress tracking ───────────────────────────────────────
const QUEST_ORDER = ["jss1","jss2","jss3","ss1","ss2","ss3"];

// ─── STATE ───────────────────────────────────────────────────────────────────
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
};

let autoDismissTimer = null;

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function normalize(v) { return String(v || "").trim(); }

function readProfile() {
  return {
    dream:      localStorage.getItem("moyacode_dream")      || "",
    motivation: localStorage.getItem("moyacode_motivation") || "",
    goal:       localStorage.getItem("moyacode_goal")       || "",
  };
}

function saveProgress(classKey) {
  localStorage.setItem(`moyacode_progress_${classKey}`, "complete");
}

function getProgress(classKey) {
  return localStorage.getItem(`moyacode_progress_${classKey}`) === "complete";
}

function logScore(entry) {
  const key = "moyacode_session_log";
  const log = JSON.parse(localStorage.getItem(key) || "[]");
  log.push(entry);
  localStorage.setItem(key, JSON.stringify(log));
}

// ─── DOM REFERENCES ───────────────────────────────────────────────────────────
const DOM = {
  homeView:       document.getElementById("home-view"),
  quizView:       document.getElementById("quiz-view"),
  endScreen:      document.getElementById("end-screen"),
  backBtn:        document.getElementById("back-btn"),
  subjectBadge:   document.getElementById("dynamic-subject-badge"),
  heartsDisplay:  document.getElementById("hearts-display"),
  xpDisplay:      document.getElementById("xp-display"),
  streakDisplay:  document.getElementById("streak-display"),
  goalIndicator:  document.getElementById("goal-indicator"),
  progressBar:    document.getElementById("progress-bar"),
  progressLabel:  document.getElementById("progress-label"),
  questionText:   document.getElementById("question-text"),
  optionsGrid:    document.getElementById("options-grid"),
  checkBtn:       document.getElementById("check-btn"),
  skipBtn:        document.getElementById("skip-btn"),
  assemblyArea:   document.getElementById("assembly-area"),
  drawer:         document.getElementById("feedback-drawer"),
  drawerEmoji:    document.getElementById("drawer-emoji"),
  drawerTitle:    document.getElementById("drawer-title"),
  drawerExpl:     document.getElementById("drawer-explanation"),
  teacherComment: document.getElementById("teacher-comment"),
  xpEarned:       document.getElementById("xp-earned"),
  continueBtn:    document.getElementById("continue-btn"),
  endEmoji:       document.getElementById("end-emoji"),
  endTitle:       document.getElementById("end-title"),
  endSub:         document.getElementById("end-sub"),
  endStats:       document.getElementById("end-stats"),
  restartBtn:     document.getElementById("restart-btn"),
};

// ─── START QUIZ ───────────────────────────────────────────────────────────────
window.startQuiz = function(classKey) {
  const quiz = QUIZ_BANKS[classKey];
  if (!quiz) return;

  state.activeQuizKey        = classKey;
  state.activeQuestions      = shuffle(quiz.questions).map(q => ({
    ...q,
    options: shuffle(q.options),
  }));
  state.currentQuestionIndex = 0;
  state.currentLives         = MAX_LIVES;
  state.score                = 0;
  state.streak               = 0;
  state.xp                   = 0;
  state.selectedAnswer       = null;
  state.feedbackState        = "idle";
  state.phase                = "quiz";

  if (DOM.subjectBadge) DOM.subjectBadge.textContent = quiz.title;

  const profile = readProfile();
  if (DOM.goalIndicator) {
    DOM.goalIndicator.style.display = profile.goal ? "inline-block" : "none";
    DOM.goalIndicator.textContent   = profile.goal ? `🎯 ${profile.goal}` : "";
  }

  DOM.homeView.style.display  = "none";
  DOM.endScreen.style.display = "none";
  DOM.quizView.style.display  = "block";

  renderGame();
};

// ─── RENDER GAME ─────────────────────────────────────────────────────────────
function renderGame() {
  if (state.currentQuestionIndex >= state.activeQuestions.length) {
    state.phase = "complete";
    showEndScreen();
    return;
  }

  const q = state.activeQuestions[state.currentQuestionIndex];

  // Progress bar
  const pct = Math.round((state.currentQuestionIndex / state.activeQuestions.length) * 100);
  DOM.progressBar.style.width = `${pct}%`;
  DOM.progressLabel.textContent = `Question ${state.currentQuestionIndex + 1} of ${state.activeQuestions.length}`;

  // XP + streak
  DOM.xpDisplay.textContent = `⚡ ${state.xp} XP`;
  if (DOM.streakDisplay) {
    DOM.streakDisplay.style.display = state.streak >= 2 ? "inline-block" : "none";
    DOM.streakDisplay.textContent   = `🔥 ${state.streak} streak`;
  }

  // Question text with animation
  DOM.questionText.classList.remove("refreshed");
  void DOM.questionText.offsetWidth;
  DOM.questionText.classList.add("refreshed");
  DOM.questionText.textContent = q.question;

  if (DOM.assemblyArea) DOM.assemblyArea.textContent = "";

  renderHearts();
  renderOptions();
  updateCheckBtn();
}

// ─── RENDER HEARTS ───────────────────────────────────────────────────────────
function renderHearts(prevLives) {
  const current = Math.max(0, state.currentLives);
  const old     = prevLives !== undefined ? Math.max(0, prevLives) : current;

  const draw = (count, poppingIdx = -1) => {
    DOM.heartsDisplay.innerHTML = Array.from({ length: count }, (_, i) =>
      `<span class="heart${i === poppingIdx ? " pop" : ""}">❤️</span>`
    ).join("");
  };

  if (current < old && old > 0) {
    draw(old, old - 1);
    setTimeout(() => draw(current), 260);
  } else {
    draw(current);
  }
}

// ─── RENDER OPTIONS ───────────────────────────────────────────────────────────
function renderOptions() {
  const q      = state.activeQuestions[state.currentQuestionIndex];
  const locked = state.feedbackState !== "idle";
  const letters = ["A","B","C","D"];

  DOM.optionsGrid.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn         = document.createElement("button");
    const isSelected  = state.selectedAnswer === i;
    const optText     = normalize(opt);
    const correctText = normalize(q.correct_answer);
    const isCorrect   = locked && optText === correctText;
    const isWrong     = locked && isSelected && optText !== correctText;

    // ── Class list ──
    btn.className = "option-btn";
    if (isSelected && !locked) btn.classList.add("selected");
    if (isCorrect)             btn.classList.add("correct");
    if (isWrong)               btn.classList.add("wrong");
    if (locked && !isSelected && !isCorrect) btn.classList.add("locked");

    btn.innerHTML = `
      <span class="option-letter">${letters[i]}</span>
      <span class="option-text">${opt}</span>
      ${isCorrect ? '<span class="option-icon">✅</span>' : ""}
      ${isWrong   ? '<span class="option-icon">❌</span>' : ""}
    `;

    if (!locked) {
      btn.addEventListener("click", () => {
        state.selectedAnswer = i;
        if (DOM.assemblyArea) DOM.assemblyArea.textContent = opt;
        renderOptions();
        updateCheckBtn();
      });
    }

    DOM.optionsGrid.appendChild(btn);
  });
}

// ─── CHECK BUTTON STATE ───────────────────────────────────────────────────────
function updateCheckBtn() {
  const active = state.selectedAnswer !== null && state.feedbackState === "idle";
  DOM.checkBtn.disabled = !active;
  DOM.checkBtn.classList.toggle("active", active);
}

// ─── HANDLE CHECK ─────────────────────────────────────────────────────────────
function handleCheck() {
  if (state.feedbackState !== "idle" || state.selectedAnswer === null) return;

  const q         = state.activeQuestions[state.currentQuestionIndex];
  const chosen    = normalize(q.options[state.selectedAnswer]);
  const correct   = normalize(q.correct_answer);
  const isCorrect = chosen === correct;
  const prevLives = state.currentLives;

  state.feedbackState = isCorrect ? "correct" : "incorrect";

  if (isCorrect) {
    state.score  += 1;
    state.xp     += q.xp_value;
    state.streak += 1;
  } else {
    state.currentLives -= 1;
    state.streak        = 0;
  }

  logScore({
    questionId:  q.id,
    classKey:    state.activeQuizKey,
    isCorrect,
    timestamp:   new Date().toISOString(),
    xpAwarded:   isCorrect ? q.xp_value : 0,
  });

  if (!isCorrect && navigator.vibrate) navigator.vibrate([80, 40, 80]);
  if (isCorrect  && navigator.vibrate) navigator.vibrate([30, 50, 30]);

  if (state.currentLives <= 0) state.phase = "gameover";

  renderOptions();
  renderHearts(prevLives);
  updateCheckBtn();
  showFeedback(isCorrect, q);
}

// ─── SHOW FEEDBACK DRAWER ─────────────────────────────────────────────────────
function showFeedback(isCorrect, q) {
  DOM.drawer.classList.remove("theme-correct", "theme-incorrect");
  DOM.drawer.classList.add(isCorrect ? "theme-correct" : "theme-incorrect");

  DOM.drawerEmoji.textContent = isCorrect ? "🎉" : "💔";
  DOM.drawerTitle.textContent = isCorrect ? "Correct! Well done!" : "Not quite…";

  if (DOM.drawerExpl) DOM.drawerExpl.textContent = q.explanation;

  const pool = isCorrect ? CORRECT_MSGS : WRONG_MSGS;
  if (DOM.teacherComment) {
    DOM.teacherComment.textContent = `"${pool[Math.floor(Math.random() * pool.length)]}"`;
  }

  if (DOM.xpEarned) {
    DOM.xpEarned.style.display = isCorrect ? "block" : "none";
    DOM.xpEarned.textContent   = `+${q.xp_value} XP 🔥`;
  }

  DOM.continueBtn.textContent = isCorrect ? "Next Question →" : "Try Again";
  DOM.drawer.classList.add("open");

  clearTimeout(autoDismissTimer);
  autoDismissTimer = setTimeout(handleContinue, FEEDBACK_DELAY);
}

// ─── HANDLE CONTINUE ──────────────────────────────────────────────────────────
function handleContinue() {
  clearTimeout(autoDismissTimer);

  if (state.phase === "gameover") { showEndScreen(); return; }

  const next = state.currentQuestionIndex + 1;
  if (next >= state.activeQuestions.length) {
    state.phase = "complete";
    showEndScreen();
    return;
  }

  state.currentQuestionIndex = next;
  state.selectedAnswer       = null;
  state.feedbackState        = "idle";
  DOM.drawer.classList.remove("open");

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
  DOM.quizView.style.display  = "none";
  DOM.drawer.classList.remove("open");
  DOM.endScreen.style.display = "flex";

  const total      = state.activeQuestions.length;
  const passed     = state.score / total >= PASS_THRESHOLD;
  const classKey   = state.activeQuizKey;
  const quiz       = QUIZ_BANKS[classKey];
  const nextKey    = quiz?.next;
  const nextQuiz   = nextKey ? QUIZ_BANKS[nextKey] : null;
  const isLastQuest = !nextKey;

  // ── Game over (ran out of hearts) ──
  if (state.phase === "gameover") {
    DOM.endEmoji.textContent  = "💔";
    DOM.endTitle.textContent  = "Out of hearts";
    DOM.endSub.textContent    = "No worries — every champion falls first. Try again!";
    DOM.endStats.innerHTML    = buildStats(false);
    DOM.restartBtn.textContent = "Try Again 🔄";
    DOM.restartBtn.onclick     = () => window.startQuiz(classKey);
    renderActionButtons(false, classKey, nextKey, isLastQuest);
    return;
  }

  // ── Completed all questions ──
  if (passed) {
    saveProgress(classKey);
    DOM.endEmoji.textContent = "🏆";
    DOM.endTitle.textContent = isLastQuest ? "You cleared ALL quests!" : `${quiz.title} — Cleared! ✅`;
    DOM.endSub.textContent   = isLastQuest
      ? "You have completed the full MoyaCode curriculum. You are a Legend."
      : `Next up: ${nextQuiz.title}`;
  } else {
    DOM.endEmoji.textContent = "😅";
    DOM.endTitle.textContent = "So close — try once more!";
    DOM.endSub.textContent   = `You scored ${state.score}/${total}. You need ${Math.ceil(total * PASS_THRESHOLD)} to pass.`;
  }

  DOM.endStats.innerHTML     = buildStats(passed);
  DOM.restartBtn.textContent = passed ? "Back to Quests 📚" : "Try Again 🔄";
  DOM.restartBtn.onclick     = passed ? goHome : () => window.startQuiz(classKey);
  renderActionButtons(passed, classKey, nextKey, isLastQuest);
}

// ─── BUILD STATS HTML ─────────────────────────────────────────────────────────
function buildStats(passed) {
  const total = state.activeQuestions.length;
  return `
    <div class="stat-card">
      <span class="stat-num">${state.score}/${total}</span>
      <span class="stat-label">Score</span>
    </div>
    <div class="stat-card">
      <span class="stat-num">${state.xp}</span>
      <span class="stat-label">XP Earned</span>
    </div>
    <div class="stat-card">
      <span class="stat-num">${state.streak}🔥</span>
      <span class="stat-label">Best Streak</span>
    </div>
    ${passed ? `<div class="stat-card stat-pass"><span class="stat-num">✅</span><span class="stat-label">Passed</span></div>` : ""}
  `;
}

// ─── ACTION BUTTONS after end screen ─────────────────────────────────────────
function renderActionButtons(passed, classKey, nextKey, isLastQuest) {
  // Remove existing action area if any
  const existing = document.getElementById("end-actions");
  if (existing) existing.remove();

  const wrap = document.createElement("div");
  wrap.id        = "end-actions";
  wrap.className = "end-actions";

  // Next quest button (only if passed and not last)
  if (passed && nextKey) {
    const nextBtn = document.createElement("button");
    nextBtn.className   = "btn-primary end-next-btn";
    nextBtn.textContent = `Start ${QUIZ_BANKS[nextKey].title} →`;
    nextBtn.addEventListener("click", () => window.startQuiz(nextKey));
    wrap.appendChild(nextBtn);
  }

  // Upsell if all complete
  if (passed && isLastQuest) {
    const upsellBtn = document.createElement("a");
    upsellBtn.className   = "btn-primary end-next-btn";
    upsellBtn.href        = "bootcamp.html";
    upsellBtn.textContent = "Upgrade to Pro — Get a Real Tutor 🚀";
    wrap.appendChild(upsellBtn);
  }

  // WhatsApp share button
  const shareBtn = document.createElement("button");
  shareBtn.className   = "btn-outline end-share-btn";
  shareBtn.textContent = "📲 Share Result on WhatsApp";
  shareBtn.addEventListener("click", () => shareOnWhatsApp(passed, classKey));
  wrap.appendChild(shareBtn);

  // Insert after end-stats
  DOM.endStats.insertAdjacentElement("afterend", wrap);
}

// ─── WHATSAPP SHARE ───────────────────────────────────────────────────────────
function shareOnWhatsApp(passed, classKey) {
  const quiz  = QUIZ_BANKS[classKey];
  const total = state.activeQuestions.length;
  const emoji = passed ? "🏆" : "💪";
  const verb  = passed ? "just passed" : "just attempted";
  const msg   = `${emoji} I ${verb} the ${quiz.title} quest on MoyaCode and scored ${state.score}/${total} (${state.xp} XP)!\n\nMoyaCode is the gamified coding platform for Nigerian secondary school students.\n🔗 Try it free: https://adedayocornexology-sys.github.io/moyacode/`;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
}

// ─── GO HOME ─────────────────────────────────────────────────────────────────
function goHome() {
  clearTimeout(autoDismissTimer);
  state.phase = "home";
  DOM.endScreen.style.display = "none";
  DOM.quizView.style.display  = "none";
  DOM.drawer.classList.remove("open");
  DOM.homeView.style.display  = "flex";

  // Clean up extra action buttons
  const ex = document.getElementById("end-actions");
  if (ex) ex.remove();
}

// ─── EVENT LISTENERS ──────────────────────────────────────────────────────────
DOM.checkBtn.addEventListener("click",   handleCheck);
DOM.continueBtn.addEventListener("click", handleContinue);
DOM.restartBtn.addEventListener("click",  goHome);
if (DOM.backBtn)  DOM.backBtn.addEventListener("click",  goHome);
if (DOM.skipBtn)  DOM.skipBtn.addEventListener("click",  handleSkip);

// ─── INIT ─────────────────────────────────────────────────────────────────────
goHome();
