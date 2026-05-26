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

The six courses, in order:

| Course | Agent | Stack         | Level       |
|--------|-------|---------------|-------------|
| JSS1   | Tolu  | Scratch       | Beginner    |
| JSS2   | Tolu  | Scratch+      | Beginner+   |
| JSS3   | Chidi | HTML (Intro)  | Intermediate|
| SS1    | Chidi | HTML (Advanced)| Intermediate|
| SS2    | Amaka | CSS           | Advanced    |
| SS3    | Emeka | JavaScript    | Advanced    |

---

## The Faculty

Four agents, one Watcher, one Examiner, one Administrator.

| Role          | Name  | Responsibility                                           |
|---------------|-------|----------------------------------------------------------|
| Teacher       | Tolu  | Scratch. First agent. Sets the tone.                     |
| Teacher       | Chidi | HTML. The bridge from visual to text-based coding.       |
| Teacher       | Amaka | CSS. Makes things beautiful. Creative energy.            |
| Teacher       | Emeka | JavaScript. Final boss. Brings it all to life.           |
| Watcher       | —     | Reads all logs. Writes the parent report and student reflection. |
| Examiner      | —     | Independent verdict (pass / fail / at-risk) per course.  |
| Administrator | Human | Reviews watcher output. Approves or edits. Sends to parent. |

The handoff moments — Tolu handing to Chidi, Chidi to Amaka, Amaka to Emeka —
are the emotional spine of the product. They must feel like a real baton pass,
not a redirect.

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

## What's Built Today (May 2026)

| Area                        | Status                                      |
|-----------------------------|---------------------------------------------|
| Marketing landing page      | ✅ Done                                     |
| Onboarding (3 steps)        | ✅ Done                                     |
| Lesson content (all 6)      | ✅ Done (text + callouts + code examples)   |
| Quiz engine (all 6)         | ✅ Done (5 Qs, XP, lives, streak, feedback) |
| Agent definitions (4)       | ✅ Done (intro, farewell, handoff)          |
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
- [ ] Make agents sound different (Tolu uses gaming voice, Chidi uses builder voice)

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

*Last updated: May 2026*
*Maintained by: the MoyaCode team*
*This file is the north star. When decisions are unclear, come back here.*
