const moyaQuestions = {
  jss1: [
    { q: "Which block starts the program?", answer: ["When", "Green", "Flag", "clicked"], options: ["When", "Green", "Flag", "clicked", "Space", "Stop"] },
    { q: "How do you make a sprite speak?", answer: ["Say", "Hello", "for", "2", "seconds"], options: ["Say", "Hello", "for", "2", "seconds", "Think", "Broadcast"] },
    { q: "Which block repeats actions infinitely?", answer: ["Forever", "loop"], options: ["Forever", "loop", "Repeat", "10", "Wait"] },
    { q: "What controls left and right movement?", answer: ["Change", "x", "by", "10"], options: ["Change", "x", "by", "10", "y", "Set"] },
    { q: "How do you change a character's look?", answer: ["Next", "costume"], options: ["Next", "costume", "Hide", "Show", "Backdrop"] }
  ],
  jss2: [
    { q: "Which category has the if...then...else block?", answer: ["Control"], options: ["Control", "Motion", "Looks", "Operators"] },
    { q: "How do you send a hidden message to sprites?", answer: ["Broadcast", "message"], options: ["Broadcast", "message", "Say", "Wait", "Variable"] },
    { q: "What is used to keep track of a score?", answer: ["Make", "a", "Variable"], options: ["Make", "a", "Variable", "List", "Operator", "Clone"] },
    { q: "How do you duplicate a sprite while running?", answer: ["Create", "clone", "of", "myself"], options: ["Create", "clone", "of", "myself", "Duplicate", "Copy"] },
    { q: "Which block checks if two items collide?", answer: ["Touching", "pointer?"], options: ["Touching", "pointer?", "Distance", "Color", "Ask"] }
  ],
  jss3: [
    { q: "What does HTML stand for?", answer: ["HyperText", "Markup", "Language"], options: ["HyperText", "Markup", "Language", "Home", "Tool"] },
    { q: "Which tag creates the largest heading?", answer: ["<h1>"], options: ["<h1>", "<heading>", "<h6>", "<head>"] },
    { q: "What tag is used to write a paragraph?", answer: ["<p>"], options: ["<p>", "<para>", "<text>", "<div>"] },
    { q: "How do you make text stand out as bold?", answer: ["<strong>"], options: ["<strong>", "<bold>", "<bld>", "<heavy>"] },
    { q: "Which tag creates a single line break?", answer: ["<br>"], options: ["<br>", "<break>", "<lb>", "<line>"] }
  ],
  ss1: [
    { q: "Which tag creates a numbered list?", answer: ["<ol>"], options: ["<ol>", "<ul>", "<li>", "<list>"] },
    { q: "What attribute tells an image where to load from?", answer: ["src="], options: ["src=", "href=", "link=", "source="] },
    { q: "Which tag creates a dropdown menu?", answer: ["<select>"], options: ["<select>", "<dropdown>", "<option>", "<menu>"] },
    { q: "What tag defines a row in a table?", answer: ["<tr>"], options: ["<tr>", "<td>", "<th>", "<row>"] },
    { q: "Which tag is used for the bottom of a website?", answer: ["<footer>"], options: ["<footer>", "<bottom>", "<end>", "<base>"] }
  ],
  ss2: [
    { q: "What does CSS stand for?", answer: ["Cascading", "Style", "Sheets"], options: ["Cascading", "Style", "Sheets", "Computer", "System"] },
    { q: "How do you change the background color?", answer: ["background-color:"], options: ["background-color:", "bg-color:", "color:", "back:"] },
    { q: "Which symbol targets an ID in CSS?", answer: ["#"], options: ["#", ".", "*", "@"] },
    { q: "How do you change the size of your text?", answer: ["font-size:"], options: ["font-size:", "text-size:", "size:", "font:"] },
    { q: "Which symbol targets a Class in CSS?", answer: ["."], options: [".", "#", "*", ">"] }
  ],
  ss3: [
    { q: "How do you declare a modern variable?", answer: ["let", "name", "=", "value"], options: ["let", "name", "=", "value", "var", "int", "const"] },
    { q: "How do you show a popup box to the user?", answer: ["alert();"], options: ["alert();", "popup();", "msg();", "window();"] },
    { q: "How do you write a single-line comment?", answer: ["//", "comment"], options: ["//", "comment", "/*", "*/"] },
    { q: "Which symbol assigns a value to a variable?", answer: ["="], options: ["=", "==", "===", "=>"] },
    { q: "How do you print text to the developer tools?", answer: ["console.log();"], options: ["console.log();", "print();", "log();", "write();"] }
  ]
};

const state = { classKey: 'jss2', questions: [], index: 0, lives: 3, placed: [], bank: [], userProfile: { dream: '', motivation: '', goal: '' } };

const dom = {
  closeBtn: document.getElementById('close-btn'),
  progressFill: document.getElementById('progress-fill'),
  hearts: document.getElementById('hearts'),
  qText: document.getElementById('question-text'),
  assembly: document.getElementById('assembly-line'),
  bank: document.getElementById('chip-bank'),
  skip: document.getElementById('skip-btn'),
  check: document.getElementById('check-btn'),
  drawer: document.getElementById('feedback-drawer'),
  feedbackTitle: document.getElementById('feedback-title'),
  feedbackText: document.getElementById('feedback-text'),
  nextBtn: document.getElementById('next-btn')
};

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getCurrent() { return state.questions[state.index]; }

function renderHeader(previousLives = state.lives) {
  const pct = Math.round((state.index / state.questions.length) * 100);
  dom.progressFill.style.width = `${pct}%`;

  const currentLives = Math.max(0, state.lives);
  const oldLives = Math.max(0, previousLives);
  const drawHearts = (count, poppingIndex = -1) => {
    dom.hearts.innerHTML = `<span class="hearts-row">${Array.from({ length: count }, (_, i) => `<span class="heart${i === poppingIndex ? ' pop' : ''}">❤️</span>`).join('')}</span>`;
  };

  if (currentLives < oldLives && oldLives > 0) {
    drawHearts(oldLives, oldLives - 1);
    setTimeout(() => drawHearts(currentLives), 250);
    return;
  }

  drawHearts(currentLives);
}

function renderQuestion() {
  const q = getCurrent();
  dom.qText.classList.remove('refreshed');
  void dom.qText.offsetWidth;
  dom.qText.classList.add('refreshed');
  dom.qText.textContent = q.q;
  dom.assembly.innerHTML = '';
  dom.bank.innerHTML = '';

  state.placed.forEach((word, i) => dom.assembly.appendChild(makeChip(word, 'placed', () => {
    state.placed.splice(i, 1);
    state.bank.push(word);
    renderQuestion();
    updateCheck();
  })));

  state.bank.forEach((word, i) => dom.bank.appendChild(makeChip(word, '', () => {
    state.placed.push(word);
    state.bank.splice(i, 1);
    renderQuestion();
    updateCheck();
  })));
}

function makeChip(label, extraClass, onClick) {
  const b = document.createElement('button');
  b.className = `chip ${extraClass}`.trim();
  b.textContent = label;
  b.type = 'button';
  b.addEventListener('click', onClick);
  return b;
}

function updateCheck() {
  const active = state.placed.length > 0;
  dom.check.disabled = !active;
  dom.check.classList.toggle('active', active);
}

function isCorrect() {
  const a = getCurrent().answer;
  return JSON.stringify(state.placed) === JSON.stringify(a);
}

function openDrawer(correct) {
  dom.drawer.classList.toggle('bad', !correct);
  dom.feedbackTitle.textContent = correct ? 'Correct! 🎉' : 'Not quite 😅';
  dom.feedbackText.textContent = correct
    ? 'Nice assembly! MoyaBot approves this solution.'
    : `Expected: ${getCurrent().answer.join(' ')}`;
  dom.drawer.classList.add('open');
}

function nextQuestion() {
  dom.drawer.classList.remove('open');
  if (state.lives <= 0) {
    dom.feedbackTitle.textContent = 'Out of hearts';
    dom.feedbackText.textContent = 'Going back to class selection...';
    setTimeout(() => (window.location.href = 'selection.html'), 600);
    return;
  }
  state.index += 1;
  if (state.index >= state.questions.length) {
    window.location.href = 'quiz.html';
    return;
  }
  state.placed = [];
  state.bank = shuffle(getCurrent().options);
  renderHeader();
  renderQuestion();
  updateCheck();
}

function checkAnswer() {
  const ok = isCorrect();
  const oldLives = state.lives;
  if (!ok) state.lives -= 1;
  renderHeader(oldLives);
  openDrawer(ok);
}

function skipQuestion() {
  state.placed = [];
  state.bank = shuffle(getCurrent().options);
  nextQuestion();
}

function getUserProfile() {
  return {
    dream: localStorage.getItem('moyacode_dream') || '',
    motivation: localStorage.getItem('moyacode_motivation') || '',
    goal: localStorage.getItem('moyacode_goal') || ''
  };
}

function init() {
  const params = new URLSearchParams(window.location.search);
  const classKey = (params.get('class') || 'jss2').toLowerCase();
  const returnTo = params.get('returnTo') || 'selection.html';
  state.userProfile = getUserProfile();
  state.classKey = moyaQuestions[classKey] ? classKey : 'jss2';
  state.questions = moyaQuestions[state.classKey];
  state.index = 0;
  state.lives = 3;
  state.placed = [];
  state.bank = shuffle(getCurrent().options);

  dom.closeBtn.addEventListener('click', () => (window.location.href = returnTo));
  dom.skip.addEventListener('click', skipQuestion);
  dom.check.addEventListener('click', checkAnswer);
  dom.nextBtn.addEventListener('click', nextQuestion);

  renderHeader();
  renderQuestion();
  updateCheck();
}

init();
