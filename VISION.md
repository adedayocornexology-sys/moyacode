# MoyaCode — Product Vision

## The Big Idea

Every Nigerian secondary school student deserves a personal coding faculty.
Not a YouTube playlist. Not a PDF. A team — agents that teach, test, watch, and
report — that follows a student from JSS1 through SS3 and never lets them fall
through the cracks.

MoyaCode is that faculty. It is a **Human-Led, Agent-Accelerated** (HLAA)
learning platform. The agents do the teaching. The humans (parents, admins,
teachers) make the calls. The student just has to show up.

---

## Who We're Building For

### The Student
A 12–17 year-old Nigerian secondary school student.
- Lives on a phone. Expects things to feel like a game.
- Has a dream (build games, launch a startup, learn to code for work).
- Will quit the moment they feel stupid or bored.
- Needs celebration as much as correction.
- Does **not** need another lecture — needs to *do something*.

### The Parent
Pays the subscription (or approves the school fee).
- Not technical. Doesn't know what HTML is.
- Wants one question answered: *Is my child actually learning?*
- Needs a report they can read in 2 minutes and forward to a relative.
- Will pull their child out if they feel they're wasting money.

### The Admin / Teacher
A school administrator, teacher, or MoyaCode staff member.
- Manages multiple students at once.
- Needs to spot at-risk students before they drop out.
- Approves, edits, and sends parent reports.
- The human gate in the HLAA loop.

---

## The Student Journey (Full Lifecycle)

```
1. ARRIVE        Land on MoyaCode. See what's possible. Feel the vibe.
                 index.html → welcome.html

2. COMMIT        Tell us your dream, your why, your daily time pledge.
                 discovery → motivation → goals  (~60 seconds)

3. LEARN         Sit with your teaching agent. Read, study, see examples.
                 lesson.html  (~10–15 min per course)

4. PROVE IT      Answer 5 questions. Live or die by your accuracy.
                 quiz.html  (~5–10 min per quiz)

5. ADVANCE       Pass → next agent picks you up. Fail → retry with guidance.
                 Agent handoff moment  (the emotional core of the product)

6. BE SEEN       Your watcher writes up what you did. Parent gets a report.
                 watcher.html → parent email / WhatsApp

7. GRADUATE      Pass all 6 courses. Earn your certificate. Tell the world.
                 SS3 completion screen + shareable certificate

8. KEEP GOING    Post-graduation: projects, community, mentorship.
                 (future — beyond v1)
```

The six courses, in order (revised 2026-07-01 — see "Curriculum Pivot" below):

| Course | Agent(s)              | Project Theme                                    | Skill Focus                        | Level         |
|--------|-----------------------|---------------------------------------------------|-------------------------------------|---------------|
| JSS1   | Archie                | Build a Game — Structure                          | HTML                                | Beginner      |
| JSS2   | Aura                  | Build a Game — Style & Feel                       | CSS                                 | Beginner+     |
| JSS3   | Logic                 | Build a Game — Bring It to Life                   | JavaScript + AI-assisted logic      | Intermediate  |
| SS1    | Archie + Aura + Logic | Fintech — Real-World Project                      | HTML + CSS + JS, AI-directed coding | Intermediate+ |
| SS2    | Archie + Aura + Logic | Edtech — Real-World Project                       | HTML + CSS + JS, AI-directed coding | Advanced      |
| SS3    | Archie + Aura + Logic | Science/Engineering + Physical AI (simulated)     | HTML + CSS + JS, AI-directed coding | Advanced      |

---

## Curriculum Pivot (2026-07-01)

The original 6-course sequence taught **Scratch → HTML → CSS → JavaScript** as standalone
language lessons, one per agent (Tolu/Chidi/Amaka/Emeka). This has been replaced with a
**project-based, AI-native curriculum**:

- **JSS1–JSS3 — "Build a Game."** Students learn HTML, CSS, and JavaScript exactly as before,
  but the container is now a game they build progressively across all three courses, not
  abstract language lessons. Scratch is dropped entirely — students start directly with real
  code from JSS1.
  **Comic creation is part of this track** (added 2026-07-01): before writing any code,
  students storyboard and hand-draw a short comic. That drawing then becomes the actual
  teaching material — photographed and rebuilt as a web page (panel grid in HTML, hand-drawn
  styling in CSS, motion/sound-effect animation in JS). This deliberately rehearses the same
  structure→style→motion arc needed for the JSS "Build a Game" capstone, using something every
  student already loves making. See `curriculum/CLAUDE.md` and the working reference
  implementation in `curriculum/comic-demo/`.
- **SS1–SS3 — "Solve a Real Problem."** Three capstone projects, one per real-world domain:
  SS1 Fintech, SS2 Edtech, SS3 Science/Engineering (with a **simulated** — not hardware —
  Physical AI/robotics component). All three teaching agents co-teach each SS capstone, since
  each project draws on HTML + CSS + JavaScript together rather than one skill in isolation.
- **AI-directed coding is now an explicit, taught skill**, not just a background hint system.
  Students learn to write real code themselves *and* to direct an AI tool as a coding partner —
  prompting, reviewing, and steering AI-generated code rather than accepting it blindly. This
  directly reshapes what counts as the Trust Ledger's "Delegating" red flag: delegating means
  **skipping the understanding/review step**, not "using AI tools" in general. See
  `trust-ledger/SPEC.md` for the corresponding signal definition.

**Faculty renamed to match:** Tolu → *(retired, Scratch dropped)*, Chidi → **Archie** (HTML),
Amaka → **Aura** (CSS), Emeka → **Logic** (JavaScript). Full decision trail in
`trust-ledger/open-decisions.md`.

**Not yet done:** the lesson content and quiz banks for all 6 courses (see "What's Built Today"
below) were written for the *old* Scratch/HTML/CSS/JS sequence and now need rewriting to match
the new game-dev / real-world-domain themes. This is real content-authoring work, tracked
separately from this planning update.

---

## The Faculty

Three teaching agents, one Watcher, one Examiner, one Administrator.

| Role          | Name  | Responsibility                                                                          |
|---------------|-------|------------------------------------------------------------------------------------------|
| Teacher       | Archie | HTML. First agent. Owns JSS1's game-structure module, then co-teaches every SS capstone. |
| Teacher       | Aura   | CSS. Owns JSS2's game-styling module, then co-teaches every SS capstone.                 |
| Teacher       | Logic  | JavaScript. Owns JSS3's game-logic module, then co-teaches every SS capstone.            |
| Watcher       | —     | Reads all logs. Writes the parent report and student reflection.                        |
| Examiner      | —     | Independent verdict (pass / fail / at-risk) per course.                                 |
| Administrator | Human | Reviews watcher output. Approves or edits. Sends to parent.                              |

The handoff moments — Archie handing to Aura, Aura to Logic across the JSS game-dev arc — are
the emotional spine of the JSS journey. For SS1–SS3, the beat changes: instead of a handoff,
**the whole Faculty assembles** for each real-world capstone. Both moments must feel earned,
not like a redirect or a formality.

---

## Core Design Principles

### 1. The student's dream drives everything
Every agent intro, every report line, every "next up" prompt should echo back
what the student said they want. A student who said "I want to build games"
should feel like every lesson is getting them closer to that, not through a
generic curriculum.

### 2. Celebrate the struggle, not just the win
Failure is part of learning. A student who gets 2/5 and retries deserves
encouragement, not a wall of red. The product should never make a student feel
stupid. It should name the struggle honestly and point a way through.

### 3. Parents need translation, not data
A parent report is not a grade sheet. It is a story: what their child tried,
what they mastered, what they are working on, and what to do next. Plain
language. No jargon. Always warm.

### 4. The admin is a human gate, not a bottleneck
The Watcher writes. The Examiner judges. But the Administrator decides what
gets sent to the parent. That human review step is not optional — it is what
makes MoyaCode trustworthy, not just automated.

### 5. Data follows the student, not the device
A student's progress should survive a phone change, a cache clear, or a school
computer. Everything syncs to the cloud. localStorage is a cache, not a source
of truth.

### 6. Progress should be visible at a glance
At any moment a student, parent, or admin should be able to answer: *Where are
they? What's next? Are they on track?* One screen. No digging.

### 7. Mobile is the first screen
Most Nigerian students access the internet on a phone. The product must be
excellent on a phone screen before it is considered on a laptop. Lesson content,
quiz gameplay, and parent reports all need to work on a 375px screen.

---

## What the Product Looks Like When Done

### For the student
- A dashboard that opens to **"Welcome back, [name]. You're on a 4-day streak.
  Chidi is waiting for you in JSS3."** Not a grid of courses they have to
  navigate themselves.
- A quiz with a **hint system** — one free hint per question (eliminate one
  wrong answer). 3 lives is fine; zero help is not.
- A **live code preview** in HTML and CSS lessons — they write code, they see
  the output. That moment of "I made this" is non-negotiable.
- A **graduation screen** at SS3 completion: confetti, a shareable certificate,
  and an invite to the MoyaCode community.
- A **leaderboard** — school-wide or national — so there is something to
  compete for.

### For the parent
- A **WhatsApp or email report** delivered weekly (or after each course
  completion) by the Administrator.
- Reports in **plain English** (and eventually plain Yoruba / Igbo / Hausa).
- A **single parent link** (no account needed) to see their child's current
  standing at any time.
- An **at-risk alert** — if their child hasn't been active in 7 days, a gentle
  nudge goes out.

### For the admin
- A **multi-student dashboard** showing all enrolled students, their standing,
  and who is at risk.
- A **report queue** — approve, edit, or reject each generated report before it
  goes to the parent.
- **One-click send** via email or WhatsApp from the admin panel.
- An **intervention flag** — mark a student for follow-up, add a private note.

---

## What's Built Today (May 2026, curriculum status revised 2026-07-01)

| Area                        | Status                                      |
|-----------------------------|---------------------------------------------|
| Marketing landing page      | ✅ Done                                     |
| Onboarding (3 steps)        | ✅ Done                                     |
| Lesson content (all 6)      | ⚠️  Built for the *old* Scratch/HTML/CSS/JS sequence — needs rewriting for the game-dev / real-world-domain curriculum (see "Curriculum Pivot") |
| Quiz engine (all 6)         | ⚠️  Engine works (5 Qs, XP, lives, streak, feedback) but question content is stale — same rewrite needed |
| Agent definitions (3)       | ⚠️  `js/agents.js` still defines the old 4 (Tolu/Chidi/Amaka/Emeka) — needs updating to Archie/Aura/Logic per the pivot |
| Agent handoff moments       | ✅ Done (logged, displayed at lesson + quiz)|
| Watcher (activity record)   | ✅ Done                                     |
| Examiner (verdicts)         | ✅ Done                                     |
| Parent report template      | ✅ Done                                     |
| Student reflection template | ✅ Done                                     |
| Admin approve/reject UI     | ✅ Done (local only)                        |
| Authentication (sign in/up) | ✅ Done                                     |
| Supabase schema             | ✅ Done (5 tables, RLS)                     |
| DB persistence layer        | ✅ Done (all writes wired)                  |
| Watcher reads from DB       | ✅ Done                                     |
| Welcome page (real stats)   | ⚠️  Hardcoded — needs real data            |
| Hint system                 | ❌ Not started                              |
| Live code preview           | ❌ Not started                              |
| Resume / continue button    | ❌ Not started                              |
| Parent email / WhatsApp     | ❌ Not started                              |
| At-risk alerts              | ❌ Not started                              |
| Multi-student admin view    | ❌ Not started                              |
| Graduation / certificate    | ❌ Not started                              |
| Leaderboard                 | ❌ Not started                              |
| Mobile code preview         | ❌ Not started                              |
| Password reset              | ❌ Not started                              |

---

## Build Phases

### Phase 1 — Make what's there real (next)
The student loop is playable but fragile. Make it solid.

- [ ] Fix welcome page stats (pull real XP, streak, standing from DB)
- [ ] Add "Resume" button to selection.html (last in-progress course)
- [ ] Add hint system to quiz (one free hint per question)
- [ ] Add password reset to auth.html
- [ ] Wire approve button in watcher.html to send email (Supabase or Resend)
- [ ] Add at-risk email alert (triggered when daysSinceLastActive ≥ 7)

### Phase 2 — Make learning feel like learning
The content is text. Real learning needs interaction.

- [ ] Live code preview in lesson.html for HTML/CSS courses (iframe or sandbox)
- [ ] Richer lesson steps: diagrams, short animations, or embedded video clips
- [ ] Practice challenges within lessons (before the quiz gate)
- [ ] Make agents sound different (Archie/Aura/Logic each need a distinct voice — see the
      old Tolu/Chidi pairing for the tone this replaced: playful vs. builder-minded)

### Phase 3 — Make progress visible and social
Students need to feel the journey, not just move through it.

- [ ] Student dashboard (home screen showing streak, standing, next course)
- [ ] Graduation screen and shareable certificate
- [ ] School leaderboard
- [ ] Parent-facing link (no account needed, view-only)

### Phase 4 — Make it a school product
When a school wants to adopt MoyaCode, it should be easy.

- [ ] Multi-student admin panel (see all students, filter at-risk)
- [ ] Class/cohort grouping
- [ ] Teacher accounts
- [ ] Report queue with one-click WhatsApp send
- [ ] School-branded reports

---

## What We Will Not Do

- **We will not make it harder than it needs to be.** Every rule, gate, or
  mechanic should earn its place. If it doesn't help the student learn or the
  parent stay informed, cut it.
- **We will not build for high-bandwidth users only.** No heavy assets, no
  mandatory video, no experience that breaks on 3G.
- **We will not replace the human review step.** Agent-written reports always
  go through an Administrator before reaching a parent. Always.
- **We will not gamify failure.** XP, streaks, and leaderboards celebrate
  progress. They should never shame a student for struggling.
- **We will not grow the course list before the existing 6 are excellent.**
  Depth before breadth. Make JSS1–SS3 the best it can be before adding new
  tracks.

---

*Last updated: 2026-07-01 (curriculum pivot to game-dev/real-world-domain structure)*
*Maintained by: the MoyaCode team*
*This file is the north star. When decisions are unclear, come back here.*
