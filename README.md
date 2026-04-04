# 🚀 MoyaCode

> **Code Like a Hero. Learn Like a Legend.**

Welcome to **MoyaCode** — a fun, game-style coding learning web app for students.
If you’ve ever thought coding was “too hard” or “too serious,” this project is here to prove the opposite.

You click. You learn. You earn XP. You level up. 💚

---

## ✨ What is MoyaCode?

MoyaCode is a teen-friendly coding journey built with plain **HTML + CSS + JavaScript**.
It guides students from onboarding to class quests and quizzes using a playful, motivational UI.

### Right now, MoyaCode includes:
- 🌍 A landing page and onboarding experience
- 🎯 Personal goal selection (saved in browser storage)
- 🧠 Class-based quiz tracks (JSS1 → SS3)
- ⚡ XP, hearts, streaks, and feedback flow
- 🎨 Modern visual design with reusable style tokens

---

## 🧭 App Journey (How it flows)

The current user journey is:

1. `index.html` → Landing page
2. `welcome.html` → Welcome/intro
3. `discovery.html` → Pick your coding dream
4. `motivation.html` → Pick your motivation
5. `goals.html` → Pick your goal
6. `selection.html` → Choose class/quest
7. `loading.html` → Shows loading + coding tip
8. `quiz.html` → Main quiz experience powered by `script.js`

---

## 🗂️ Project Structure

```bash
.
├── index.html            # Landing page
├── welcome.html          # Onboarding start
├── discovery.html        # Dream selection
├── motivation.html       # Motivation selection
├── goals.html            # Goal selection
├── selection.html        # Quest/class selection
├── loading.html          # Loading transition
├── quiz.html             # Quiz shell page
├── lesson.html           # Learning page
├── script.js             # Main quiz/game logic (active)
├── quiz.js               # Legacy quiz engine (older path)
├── js/score-tracker.js   # Session log helper utility
├── tokens.css            # Design tokens (colors/spacing/type)
├── components.css        # Shared UI component styles
├── quiz-styles.css       # Quiz-specific style states
└── CLAUDE.md             # Internal architecture/auth guide for AI collaborators
```

---

## 🛠️ Run Locally

Because this is currently a static frontend app, running it is easy.

### Option A: Open directly
- Open `index.html` in your browser.

### Option B (recommended): Use a local server
If you have Python installed:

```bash
python3 -m http.server 8080
```

Then open: `http://localhost:8080`

---

## 🧠 Tech Stack

- **HTML5** for structure
- **CSS3** for styling and animations
- **Vanilla JavaScript** for game logic and page behavior
- **localStorage** for temporary profile/progress persistence

No framework needed. No build step required.

---

## 🔐 Authentication Status (Important)

Right now, MoyaCode does **not** have full student account authentication yet.

That means:
- Progress is saved per browser/device only
- No login/signup yet
- No backend user profile sync yet

A complete auth and persistence plan is documented in [`CLAUDE.md`](./CLAUDE.md).

---

## 🧩 For Builders & Techies

If you want to improve this project, high-impact areas include:

- Add student login/signup
- Sync profile/progress to cloud backend
- Unify legacy quiz logic (`quiz.js`) with active engine (`script.js`)
- Add analytics + teacher dashboard
- Improve accessibility and mobile polish

---

## 🤝 Contributing

Ideas, improvements, and refactors are welcome.

If you’re a beginner: this is a great repo to practice real product thinking —
UI, learning design, state management, and future backend integration.

Start small. Ship often. Keep learning. 🌱

---

## 💬 Final Note

To every teen trying to learn tech:

You don’t need to be perfect.
You just need to keep showing up.

**One line of code today can change your whole story tomorrow.** 💻✨
