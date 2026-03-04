// ─── 1. DATA BANKS FOR ALL CLASSES ───────────────────────────────────────────
const QUIZ_BANKS = {
  jss1: {
    title: "JSS1 · Scratch Basics",
    questions: [
      { id: 1, question: "Which block starts the program when clicked?", options: ["When green flag clicked", "Forever", "Wait 1 second", "Stop all"], correct_idx: 0, explanation: "The green flag block is the standard way to start a Scratch script.", xp_value: 10 },
      { id: 2, question: "Which block makes a sprite talk in a speech bubble?", options: ["Think [Hello]", "Say [Hello]", "Broadcast [Hello]", "Play sound"], correct_idx: 1, explanation: "Use the Say block to display speech text from a sprite.", xp_value: 10 },
      { id: 3, question: "Which motion block moves sprite horizontally?", options: ["Change y by 10", "Point in direction 90", "Change x by 10", "Go to random position"], correct_idx: 2, explanation: "X controls left-right movement on Scratch stage.", xp_value: 10 },
      { id: 4, question: "How do you repeat an action forever?", options: ["Repeat 10", "Forever", "If then", "Wait until"], correct_idx: 1, explanation: "Forever loop keeps running until the project stops.", xp_value: 10 },
      { id: 5, question: "Which block changes how sprite looks?", options: ["Next costume", "Show variable", "Set volume", "Change size by"], correct_idx: 0, explanation: "Costumes are visual appearances; next costume cycles through them.", xp_value: 15 },
    ]
  },
  jss2: {
    title: "JSS2 · Advanced Scratch",
    questions: [
      { id: 1, question: "In Scratch, which block category contains the \"if...then...else\" block?", options: ["Motion", "Looks", "Control", "Operators"], correct_idx: 2, explanation: "Control blocks manage logic flow — loops, conditions, and script timing all live here.", xp_value: 10 },
      { id: 2, question: "What does the \"forever\" block do in Scratch?", options: ["Runs a script once", "Stops all scripts", "Repeats blocks indefinitely until stopped", "Waits for a key press"], correct_idx: 2, explanation: "The 'forever' block creates an infinite loop. Use 'Stop all' inside it to break out.", xp_value: 10 },
      { id: 3, question: "Which block makes a sprite say \"Hello\" for 2 seconds?", options: ["Think [Hello] for [2] seconds", "Say [Hello] for [2] seconds", "Broadcast [Hello]", "Play sound [Hello]"], correct_idx: 1, explanation: "'Say' shows a speech bubble. 'Think' shows a thought bubble — they look different on screen!", xp_value: 10 },
      { id: 4, question: "In Scratch, what is a \"sprite\"?", options: ["The background image", "A sound file", "A character or object that can be programmed", "A block that controls timing"], correct_idx: 2, explanation: "Sprites are the actors in your Scratch project.", xp_value: 10 },
      { id: 5, question: "What does the \"broadcast\" block do?", options: ["Makes the sprite louder", "Sends sprite to a new costume", "Sends a message other sprites can receive", "Copies a block to another sprite"], correct_idx: 2, explanation: "Broadcast allows sprites to communicate with each other.", xp_value: 15 },
    ]
  },
  jss3: {
    title: "JSS3 · Intro to HTML",
    questions: [
      { id: 1, question: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Machine Language", "Hyper Transfer Markup Link", "Home Tool Markup Language"], correct_idx: 0, explanation: "HTML is the language used to structure web pages.", xp_value: 10 },
      { id: 2, question: "Which tag creates the largest heading?", options: ["<h6>", "<heading>", "<h1>", "<head>"], correct_idx: 2, explanation: "h1 is the highest-level heading.", xp_value: 10 },
      { id: 3, question: "Which tag is used for a paragraph?", options: ["<text>", "<p>", "<para>", "<article>"], correct_idx: 1, explanation: "Paragraph text is written with the p tag.", xp_value: 10 },
      { id: 4, question: "Which tag inserts a line break?", options: ["<br>", "<break>", "<lb>", "<line>"], correct_idx: 0, explanation: "br creates a single line break in text.", xp_value: 10 },
      { id: 5, question: "Which tag makes text strongly important?", options: ["<strong>", "<bold>", "<em>", "<important>"], correct_idx: 0, explanation: "strong marks text as strongly important.", xp_value: 15 },
    ]
  },
  ss1: {
    title: "SS1 · HTML Basics",
    questions: [
      { id: 1, question: "What does HTML stand for?", options: ["Hyper Text Preprocessor", "Hyper Text Markup Language", "Hyper Tool Multi Language", "Hyperlink Text Markup Language"], correct_idx: 1, explanation: "HTML is the standard markup language for creating Web pages.", xp_value: 10 },
      { id: 2, question: "Which HTML tag is used for the largest heading?", options: ["<heading>", "<h6>", "<head>", "<h1>"], correct_idx: 3, explanation: "<h1> defines the most important heading. <h6> is the least important.", xp_value: 10 },
    ]
  },
  ss2: {
    title: "SS2 · CSS Styling",
    questions: [
      { id: 1, question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"], correct_idx: 0, explanation: "CSS describes how HTML elements are to be displayed on screen.", xp_value: 10 },
      { id: 2, question: "Which property is used to change the background color?", options: ["color", "bgcolor", "background-color", "bg-color"], correct_idx: 2, explanation: "The background-color property sets the background color of an element.", xp_value: 10 },
    ]
  },
  ss3: {
    title: "SS3 · JavaScript Logic",
    questions: [
      { id: 1, question: "Inside which HTML element do we put the JavaScript?", options: ["<js>", "<scripting>", "<script>", "<javascript>"], correct_idx: 2, explanation: "The <script> tag is used to embed a client-side script (JavaScript).", xp_value: 10 },
      { id: 2, question: "How do you write 'Hello World' in an alert box?", options: ["msg('Hello World');", "alertBox('Hello World');", "msgBox('Hello World');", "alert('Hello World');"], correct_idx: 3, explanation: "The alert() method displays an alert box with a specified message.", xp_value: 15 },
    ]
  }
};

const MAX_LIVES = 3;
const FEEDBACK_DURATION = 2800;

const CORRECT_COMMENTS = [
  "Oya! You nailed it like a true Owo champion! 🔥",
  "Correct! Your brain dey sharp pass cutlass!",
  "Block by block, you dey build am — legend!",
  "E correct! MoyaCode proud of you today!",
];

const WRONG_COMMENTS = [
  "Ah ah! Small mistake, no wahala. Debugging makes champions 💪",
  "E no correct this time, but tomorrow e go better!",
  "Heart survived… barely! One more try, superstar.",
  "Even the best coders miss sometimes. E go better!",
];


function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// ─── 2. STATE ────────────────────────────────────────────────────────────────
let state = {
  activeQuizKey: null,
  activeQuestions: [],
  currentQuestionIndex: 0,
  currentLives: MAX_LIVES,
  score: 0,
  streak: 0,
  xp: 0,
  selectedAnswer: null,
  feedbackState: "idle", 
  phase: "home", 
};

let autoDismissTimer = null;

// ─── 3. DOM ELEMENTS ─────────────────────────────────────────────────────────
const DOM = {
  homeView: document.getElementById('home-view'),
  quizView: document.getElementById('quiz-view'),
  endScreen: document.getElementById('end-screen'),
  backBtn: document.getElementById('back-btn'), // <-- ADD THIS LINE
  subjectBadge: document.getElementById('dynamic-subject-badge'),
  heartsDisplay: document.getElementById('hearts-display'),
  xpDisplay: document.getElementById('xp-display'),
  streakDisplay: document.getElementById('streak-display'),
  assemblyArea: document.getElementById('assembly-area'),
  skipBtn: document.getElementById('skip-btn'),
  progressBar: document.getElementById('progress-bar'),
  progressLabel: document.getElementById('progress-label'),
  questionText: document.getElementById('question-text'),
  optionsGrid: document.getElementById('options-grid'),
  checkBtn: document.getElementById('check-btn'),
  
  drawer: document.getElementById('feedback-drawer'),
  drawerEmoji: document.getElementById('drawer-emoji'),
  drawerTitle: document.getElementById('drawer-title'),
  drawerExplanation: document.getElementById('drawer-explanation'),
  teacherComment: document.getElementById('teacher-comment'),
  xpEarned: document.getElementById('xp-earned'),
  continueBtn: document.getElementById('continue-btn'),

  endEmoji: document.getElementById('end-emoji'),
  endTitle: document.getElementById('end-title'),
  endSub: document.getElementById('end-sub'),
  endStats: document.getElementById('end-stats'),
  restartBtn: document.getElementById('restart-btn'),
};

// ─── 4. LOGIC & RENDER FUNCTIONS ─────────────────────────────────────────────

function goHome() {
  // CRITICAL: Stop the auto-dismiss timer if the user clicks back while the drawer is open
  clearTimeout(autoDismissTimer);
  state.phase = "home";
  DOM.endScreen.style.display = 'none';
  DOM.quizView.style.display = 'none';
  DOM.drawer.classList.remove('open');
  DOM.homeView.style.display = 'flex'; // Show the intro screen
}

// Ensure this function is attached to the global window object so the HTML onclick="" can find it
window.startQuiz = function(classKey) {
  const selectedQuiz = QUIZ_BANKS[classKey];
  
  state.activeQuizKey = classKey;
  state.activeQuestions = selectedQuiz.questions.map((question) => {
    const shuffledOptions = shuffle(
      question.options.map((optionText, optionIndex) => ({
        optionText,
        isCorrect: optionIndex === question.correct_idx,
      }))
    );

    return {
      ...question,
      options: shuffledOptions.map(({ optionText }) => optionText),
      correct_idx: shuffledOptions.findIndex(({ isCorrect }) => isCorrect),
    };
  });
  state.currentQuestionIndex = 0;
  state.currentLives = MAX_LIVES;
  state.score = 0;
  state.streak = 0;
  state.xp = 0;
  state.selectedAnswer = null;
  state.feedbackState = "idle";
  state.phase = "quiz";

  // Update UI headers
  if(DOM.subjectBadge) {
      DOM.subjectBadge.innerText = selectedQuiz.title;
  }
  
  // Switch screens
  DOM.homeView.style.display = 'none';
  DOM.endScreen.style.display = 'none';
  DOM.quizView.style.display = 'block';
  
  renderGame();
};

function renderGame() {
  const q = state.activeQuestions[state.currentQuestionIndex];
  
  renderHearts();
  DOM.xpDisplay.innerText = `⚡ ${state.xp} XP`;
  if (state.streak >= 2) {
    DOM.streakDisplay.style.display = 'inline-block';
    DOM.streakDisplay.innerText = `🔥 ${state.streak} streak`;
  } else {
    DOM.streakDisplay.style.display = 'none';
  }

  const pct = Math.round(((state.currentQuestionIndex) / state.activeQuestions.length) * 100);
  DOM.progressBar.style.width = `${pct}%`;
  DOM.progressLabel.innerText = `Question ${state.currentQuestionIndex + 1} of ${state.activeQuestions.length}`;

  DOM.questionText.classList.remove('refreshed');
  void DOM.questionText.offsetWidth;
  DOM.questionText.classList.add('refreshed');
  DOM.questionText.innerText = q.question;
  if (DOM.assemblyArea) {
    DOM.assemblyArea.innerText = state.selectedAnswer === null ? '' : q.options[state.selectedAnswer];
  }
  renderOptions();
  updateCheckButton();
}

function renderHearts(previousLives = state.currentLives) {
  const currentLives = Math.max(0, state.currentLives);
  const oldLives = Math.max(0, previousLives);

  const drawHearts = (count, poppingIndex = -1) => {
    DOM.heartsDisplay.innerHTML = `<span class="hearts-row">${Array.from({ length: count }, (_, i) => `<span class="heart${i === poppingIndex ? ' pop' : ''}">❤️</span>`).join('')}</span>`;
  };

  if (currentLives < oldLives && oldLives > 0) {
    drawHearts(oldLives, oldLives - 1);
    setTimeout(() => drawHearts(currentLives), 250);
    return;
  }

  drawHearts(currentLives);
}

function renderOptions() {
  const q = state.activeQuestions[state.currentQuestionIndex];
  DOM.optionsGrid.innerHTML = '';
  const letters = ["A", "B", "C", "D"];

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    
    const isSelected = state.selectedAnswer === i;
    const isLocked = state.feedbackState !== "idle";
    const isCorrect = state.feedbackState !== "idle" && i === q.correct_idx;
    const isWrong = state.feedbackState === "incorrect" && isSelected && i !== q.correct_idx;

    if (isSelected && !isLocked) btn.classList.add('selected');
    if (isCorrect) btn.classList.add('correct');
    if (isWrong) btn.classList.add('wrong');
    if (isLocked && !isSelected && !isCorrect) btn.classList.add('locked');

    btn.innerHTML = `
      <span class="option-letter">${letters[i]}</span>
      <span class="option-text">${opt}</span>
      ${isCorrect ? '<span class="option-icon">✅</span>' : ''}
      ${isWrong ? '<span class="option-icon">❌</span>' : ''}
    `;

    btn.onclick = () => {
      if (!isLocked) {
        state.selectedAnswer = i;
        if (DOM.assemblyArea) DOM.assemblyArea.innerText = q.options[i];
        renderOptions();
        updateCheckButton();
      }
    };

    DOM.optionsGrid.appendChild(btn);
  });
}

function updateCheckButton() {
  if (state.selectedAnswer !== null && state.feedbackState === "idle") {
    DOM.checkBtn.classList.add('active');
    DOM.checkBtn.disabled = false;
    DOM.checkBtn.innerText = "CHECK";
  } else {
    DOM.checkBtn.classList.remove('active');
    DOM.checkBtn.disabled = true;
    DOM.checkBtn.innerText = "CHECK";
  }
}


function handleSkip() {
  if (state.phase !== "quiz" || state.feedbackState !== "idle") return;
  handleContinue();
}

function handleCheck() {
  if (state.selectedAnswer === null || state.feedbackState !== "idle") return;

  const q = state.activeQuestions[state.currentQuestionIndex];
  const isCorrect = state.selectedAnswer === q.correct_idx;
  const oldLives = state.currentLives;
  
  state.feedbackState = isCorrect ? "correct" : "incorrect";
  if (isCorrect) {
    state.score += 1;
    state.xp += q.xp_value;
    state.streak += 1;
  } else {
    state.currentLives -= 1;
    state.streak = 0;
  }

  if (state.currentLives < oldLives && navigator.vibrate) {
    navigator.vibrate([80, 40, 80]);
  }

  if (state.currentLives === 0) {
    state.phase = "gameover";
  }

  renderOptions();
  updateCheckButton();
  renderHearts(oldLives);
  showFeedback(isCorrect, q);
}

function showFeedback(isCorrect, q) {
  DOM.drawer.classList.remove('theme-correct', 'theme-incorrect');
  DOM.drawer.classList.add(isCorrect ? 'theme-correct' : 'theme-incorrect');
  
  DOM.drawerEmoji.innerText = isCorrect ? "🎉" : "💔";
  DOM.drawerTitle.innerText = isCorrect ? "Correct! Well done!" : "Not quite…";
  DOM.drawerExplanation.innerText = q.explanation;
  
  const commentsPool = isCorrect ? CORRECT_COMMENTS : WRONG_COMMENTS;
  DOM.teacherComment.innerText = `"${commentsPool[Math.floor(Math.random() * commentsPool.length)]}"`;
  
  if (isCorrect) {
    DOM.xpEarned.style.display = 'block';
    DOM.xpEarned.innerText = `+${q.xp_value} XP 🔥`;
    DOM.continueBtn.innerText = "Next Question →";
  } else {
    DOM.xpEarned.style.display = 'none';
    DOM.continueBtn.innerText = "Try Again";
  }

  DOM.drawer.classList.add('open');

  if (navigator.vibrate) {
    navigator.vibrate(isCorrect ? [30, 50, 30] : [150]);
  }

  clearTimeout(autoDismissTimer);
  autoDismissTimer = setTimeout(() => handleContinue(), FEEDBACK_DURATION);
}

function handleContinue() {
  clearTimeout(autoDismissTimer);
  
  if (state.phase === "gameover") {
    showEndScreen();
    return;
  }

  const nextIndex = state.currentQuestionIndex + 1;
  if (nextIndex >= state.activeQuestions.length) {
    state.phase = "complete";
    showEndScreen();
    return;
  }

  state.currentQuestionIndex = nextIndex;
  state.selectedAnswer = null;
  state.feedbackState = "idle";
  
  DOM.drawer.classList.remove('open');
  
  setTimeout(() => {
    renderGame();
  }, 300);
}

function showEndScreen() {
  DOM.quizView.style.display = 'none';
  DOM.drawer.classList.remove('open');
  DOM.endScreen.style.display = 'flex';

  if (state.phase === "gameover") {
    DOM.endEmoji.innerText = "💔";
    DOM.endTitle.innerText = "Session Over";
    DOM.endSub.innerText = "You ran out of lives, but every champion falls first.";
    DOM.endStats.innerHTML = `
      <div class="stat-card"><span class="stat-num">${state.score}</span><span class="stat-label">Correct</span></div>
      <div class="stat-card"><span class="stat-num">${state.xp}</span><span class="stat-label">XP Earned</span></div>
    `;
    // Change restart button to go back home on game over
    DOM.restartBtn.innerText = "Back to Classes 📚";
  } else {
    DOM.endEmoji.innerText = "🏆";
    DOM.endTitle.innerText = "Quiz Complete!";
    DOM.endSub.innerText = `You finished all ${state.activeQuestions.length} questions!`;
    DOM.endStats.innerHTML = `
      <div class="stat-card"><span class="stat-num">${state.score}/${state.activeQuestions.length}</span><span class="stat-label">Score</span></div>
      <div class="stat-card"><span class="stat-num">${state.xp}</span><span class="stat-label">XP Earned</span></div>
      <div class="stat-card"><span class="stat-num">${state.streak}🔥</span><span class="stat-label">Best Streak</span></div>
    `;
    DOM.restartBtn.innerText = "Back to Classes 📚";
  }
}

// ─── 5. EVENT LISTENERS & INITIALIZATION ─────────────────────────────────────
// These must be at the very bottom, AFTER the DOM object has been created!

DOM.checkBtn.addEventListener('click', handleCheck);
DOM.continueBtn.addEventListener('click', handleContinue);
DOM.restartBtn.addEventListener('click', goHome);
// Add this right above goHome(); at the bottom of the file
DOM.backBtn.addEventListener('click', goHome);
if (DOM.skipBtn) DOM.skipBtn.addEventListener('click', handleSkip);
// Start the app by showing the Home Screen
goHome();