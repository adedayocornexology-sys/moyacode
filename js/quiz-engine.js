(() => {
  const MAX_LIVES = 3;
  const FEEDBACK_DURATION = 2800;
  const CORRECT_COMMENTS = [
    "Oya! You nailed it like a true Owo champion! 🔥",
    "Correct! Your brain dey sharp pass cutlass!",
    "Block by block, you dey build am — legend!",
    "E correct! MoyaCode proud of you today!"
  ];
  const WRONG_COMMENTS = [
    "Ah ah! Small mistake, no wahala. Debugging makes champions 💪",
    "E no correct this time, but tomorrow e go better!",
    "Heart survived… barely! One more try, superstar.",
    "Even the best coders miss sometimes. E go better!"
  ];

  async function loadQuizData(classKey) {
    const response = await fetch(`/data/${classKey}.json`);
    if (!response.ok) throw new Error(`Failed to load ${classKey}`);
    return response.json();
  }

  function initEngine(config) {
    const { questionType, classKey, containerSelector } = config;
    const root = document.querySelector(containerSelector);
    if (!root) return;

    const q = (...selectors) => selectors.map((s) => root.querySelector(s)).find(Boolean);
    const dom = {
      root,
      homeView: q('#home-view'),
      quizView: q('#quiz-view', '.quiz-view'),
      endScreen: q('#end-screen'),
      backBtn: q('#back-btn', '#close-btn'),
      subjectBadge: q('#dynamic-subject-badge', '.tag'),
      heartsDisplay: q('#hearts-display', '#hearts'),
      xpDisplay: q('#xp-display'),
      streakDisplay: q('#streak-display'),
      assemblyArea: q('#assembly-area', '#assembly-line'),
      chipBank: q('#chip-bank'),
      skipBtn: q('#skip-btn'),
      progressBar: q('#progress-bar', '#progress-fill'),
      progressLabel: q('#progress-label'),
      questionText: q('#question-text'),
      optionsGrid: q('#options-grid'),
      checkBtn: q('#check-btn'),
      drawer: q('#feedback-drawer'),
      drawerEmoji: q('#drawer-emoji'),
      drawerTitle: q('#drawer-title', '#feedback-title'),
      drawerExplanation: q('#drawer-explanation', '#feedback-text'),
      teacherComment: q('#teacher-comment'),
      xpEarned: q('#xp-earned'),
      continueBtn: q('#continue-btn', '#next-btn'),
      endEmoji: q('#end-emoji'),
      endTitle: q('#end-title'),
      endSub: q('#end-sub'),
      endStats: q('#end-stats'),
      restartBtn: q('#restart-btn')
    };

    const state = {
      classKey: null,
      title: '',
      questions: [],
      currentQuestionIndex: 0,
      currentLives: MAX_LIVES,
      score: 0,
      streak: 0,
      xp: 0,
      selectedAnswer: null,
      feedbackState: 'idle',
      phase: dom.homeView ? 'home' : 'quiz',
      placed: [],
      bank: []
    };
    let autoDismissTimer = null;

    const shuffle = (arr) => {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };

    const setLoading = (value) => dom.root.classList.toggle('loading', value);
    const showError = (message) => {
      let err = dom.root.querySelector('.engine-error');
      if (!err) {
        err = document.createElement('p');
        err.className = 'engine-error';
        dom.root.prepend(err);
      }
      err.textContent = message;
    };
    const clearError = () => {
      const err = dom.root.querySelector('.engine-error');
      if (err) err.remove();
    };

    function goHome() {
      clearTimeout(autoDismissTimer);
      state.phase = 'home';
      if (dom.endScreen) dom.endScreen.style.display = 'none';
      if (dom.quizView) dom.quizView.style.display = 'none';
      if (dom.drawer) dom.drawer.classList.remove('open');
      if (dom.homeView) dom.homeView.style.display = 'flex';
    }

    function renderHearts() {
      if (dom.heartsDisplay) dom.heartsDisplay.textContent = `❤️ ${Math.max(0, state.currentLives)}`;
    }

    function renderHeader() {
      renderHearts();
      const pct = Math.round((state.currentQuestionIndex / state.questions.length) * 100);
      if (dom.progressBar) dom.progressBar.style.width = `${pct}%`;
      if (dom.progressLabel) dom.progressLabel.textContent = `Question ${state.currentQuestionIndex + 1} of ${state.questions.length}`;
      if (dom.xpDisplay) dom.xpDisplay.textContent = `⚡ ${state.xp} XP`;
      if (dom.streakDisplay) {
        dom.streakDisplay.style.display = state.streak >= 2 ? 'inline-block' : 'none';
        dom.streakDisplay.textContent = `🔥 ${state.streak} streak`;
      }
    }

    function renderQuestion(question, type) {
      if (dom.questionText) dom.questionText.textContent = type === 'mcq' ? question.question : question.q;
      if (type === 'mcq') {
        if (!dom.optionsGrid) return;
        dom.optionsGrid.innerHTML = '';
        const letters = ['A', 'B', 'C', 'D'];
        question.options.forEach((opt, i) => {
          const btn = document.createElement('button');
          btn.className = 'option-btn';
          const isSelected = state.selectedAnswer === i;
          const isLocked = state.feedbackState !== 'idle';
          const isCorrect = isLocked && i === question.correct_idx;
          const isWrong = state.feedbackState === 'incorrect' && isSelected && i !== question.correct_idx;
          if (isSelected && !isLocked) btn.classList.add('selected');
          if (isCorrect) btn.classList.add('correct');
          if (isWrong) btn.classList.add('wrong');
          if (isLocked && !isSelected && !isCorrect) btn.classList.add('locked');
          btn.innerHTML = `<span class="option-letter">${letters[i] || ''}</span><span class="option-text">${opt}</span>`;
          btn.type = 'button';
          btn.addEventListener('click', () => {
            if (state.feedbackState !== 'idle') return;
            state.selectedAnswer = i;
            updateCheckButton();
            renderQuestion(question, type);
          });
          dom.optionsGrid.appendChild(btn);
        });
      } else {
        if (!dom.assemblyArea || !dom.chipBank) return;
        dom.assemblyArea.innerHTML = '';
        dom.chipBank.innerHTML = '';
        state.placed.forEach((word, i) => {
          const chip = document.createElement('button');
          chip.className = 'chip placed';
          chip.type = 'button';
          chip.textContent = word;
          chip.addEventListener('click', () => {
            if (state.feedbackState !== 'idle') return;
            state.placed.splice(i, 1);
            state.bank.push(word);
            renderQuestion(question, type);
            updateCheckButton();
          });
          dom.assemblyArea.appendChild(chip);
        });
        state.bank.forEach((word, i) => {
          const chip = document.createElement('button');
          chip.className = 'chip';
          chip.type = 'button';
          chip.textContent = word;
          chip.addEventListener('click', () => {
            if (state.feedbackState !== 'idle') return;
            state.placed.push(word);
            state.bank.splice(i, 1);
            renderQuestion(question, type);
            updateCheckButton();
          });
          dom.chipBank.appendChild(chip);
        });
      }
    }

    function updateCheckButton() {
      if (!dom.checkBtn) return;
      const ready = questionType === 'mcq' ? state.selectedAnswer !== null : state.placed.length > 0;
      const active = ready && state.feedbackState === 'idle';
      dom.checkBtn.disabled = !active;
      dom.checkBtn.classList.toggle('active', active);
      dom.checkBtn.textContent = 'CHECK';
    }

    function showFeedback(isCorrect, question) {
      if (!dom.drawer) return;
      dom.drawer.classList.remove('theme-correct', 'theme-incorrect', 'bad');
      dom.drawer.classList.add(isCorrect ? 'theme-correct' : 'theme-incorrect');
      if (!isCorrect) dom.drawer.classList.add('bad');
      if (dom.drawerEmoji) dom.drawerEmoji.textContent = isCorrect ? '🎉' : '💔';
      if (dom.drawerTitle) dom.drawerTitle.textContent = isCorrect ? 'Correct! Well done!' : 'Not quite…';
      if (dom.drawerExplanation) {
        dom.drawerExplanation.textContent = questionType === 'mcq'
          ? question.explanation
          : (isCorrect ? 'Nice assembly! MoyaBot approves this solution.' : `Expected: ${question.answer.join(' ')}`);
      }
      if (dom.teacherComment) {
        const pool = isCorrect ? CORRECT_COMMENTS : WRONG_COMMENTS;
        dom.teacherComment.textContent = `"${pool[Math.floor(Math.random() * pool.length)]}"`;
      }
      if (dom.xpEarned) {
        dom.xpEarned.style.display = isCorrect ? 'block' : 'none';
        dom.xpEarned.textContent = isCorrect ? `+${question.xp_value || 0} XP 🔥` : '';
      }
      if (dom.continueBtn) dom.continueBtn.textContent = isCorrect ? 'Next Question →' : 'Try Again';
      dom.drawer.classList.add('open');
      clearTimeout(autoDismissTimer);
      autoDismissTimer = setTimeout(handleContinue, FEEDBACK_DURATION);
    }

    function showEndScreen() {
      if (dom.quizView) dom.quizView.style.display = 'none';
      if (dom.drawer) dom.drawer.classList.remove('open');
      if (dom.endScreen) dom.endScreen.style.display = 'flex';
      if (!dom.endTitle) return;
      if (state.phase === 'gameover') {
        if (dom.endEmoji) dom.endEmoji.textContent = '💔';
        dom.endTitle.textContent = 'Session Over';
        if (dom.endSub) dom.endSub.textContent = 'You ran out of lives, but every champion falls first.';
      } else {
        if (dom.endEmoji) dom.endEmoji.textContent = '🏆';
        dom.endTitle.textContent = 'Quiz Complete!';
        if (dom.endSub) dom.endSub.textContent = `You finished all ${state.questions.length} questions!`;
      }
      if (dom.endStats) dom.endStats.innerHTML = `<div class="stat-card"><span class="stat-num">${state.score}</span><span class="stat-label">Correct</span></div><div class="stat-card"><span class="stat-num">${state.xp}</span><span class="stat-label">XP Earned</span></div>`;
    }

    function renderGame() {
      const question = state.questions[state.currentQuestionIndex];
      renderHeader();
      renderQuestion(question, questionType);
      updateCheckButton();
    }

    function handleCheck() {
      if (state.feedbackState !== 'idle') return;
      const question = state.questions[state.currentQuestionIndex];
      let isCorrect = false;
      if (questionType === 'mcq') {
        if (state.selectedAnswer === null) return;
        isCorrect = state.selectedAnswer === question.correct_idx;
      } else {
        if (!state.placed.length) return;
        isCorrect = JSON.stringify(state.placed) === JSON.stringify(question.answer);
      }
      state.feedbackState = isCorrect ? 'correct' : 'incorrect';
      if (isCorrect) {
        state.score += 1;
        state.streak += 1;
        state.xp += question.xp_value || 0;
      } else {
        state.currentLives -= 1;
        state.streak = 0;
      }
      if (state.currentLives <= 0) state.phase = 'gameover';
      renderHeader();
      updateCheckButton();
      showFeedback(isCorrect, question);
    }

    function handleContinue() {
      clearTimeout(autoDismissTimer);
      if (state.phase === 'gameover') return showEndScreen();
      state.currentQuestionIndex += 1;
      if (state.currentQuestionIndex >= state.questions.length) {
        state.phase = 'complete';
        return showEndScreen();
      }
      state.selectedAnswer = null;
      state.feedbackState = 'idle';
      state.placed = [];
      if (questionType === 'assembly') state.bank = shuffle(state.questions[state.currentQuestionIndex].options);
      if (dom.drawer) dom.drawer.classList.remove('open');
      renderGame();
    }

    function handleSkip() {
      if (state.phase !== 'quiz' || state.feedbackState !== 'idle') return;
      handleContinue();
    }

    async function startQuiz(nextClassKey) {
      setLoading(true);
      clearError();
      try {
        const data = await loadQuizData(nextClassKey);
        state.classKey = nextClassKey;
        state.title = data.title;
        state.questions = questionType === 'mcq' ? data.questions : data.assemblyQuestions;
        state.currentQuestionIndex = 0;
        state.currentLives = MAX_LIVES;
        state.score = 0;
        state.streak = 0;
        state.xp = 0;
        state.selectedAnswer = null;
        state.feedbackState = 'idle';
        state.phase = 'quiz';
        state.placed = [];
        state.bank = questionType === 'assembly' ? shuffle(state.questions[0].options) : [];
        if (dom.subjectBadge) dom.subjectBadge.textContent = data.title;
        if (dom.homeView) dom.homeView.style.display = 'none';
        if (dom.endScreen) dom.endScreen.style.display = 'none';
        if (dom.quizView) dom.quizView.style.display = 'block';
        renderGame();
      } catch (_err) {
        showError('Could not load questions. Please check your connection.');
      } finally {
        setLoading(false);
      }
    }

    if (dom.checkBtn) dom.checkBtn.addEventListener('click', handleCheck);
    if (dom.continueBtn) dom.continueBtn.addEventListener('click', handleContinue);
    if (dom.skipBtn) dom.skipBtn.addEventListener('click', handleSkip);
    if (dom.restartBtn) dom.restartBtn.addEventListener('click', goHome);
    if (dom.backBtn) dom.backBtn.addEventListener('click', goHome);

    window.startQuiz = startQuiz;
    if (classKey) {
      startQuiz(classKey.toLowerCase());
    } else if (dom.homeView) {
      goHome();
    }
  }

  window.loadQuizData = loadQuizData;
  window.initEngine = initEngine;
})();
