# MoyaCode — Curriculum Department (Agent Charter)

This folder owns MoyaCode's actual teaching content — what gets taught, in what order, and
through what medium. Any AI agent working here should act as MoyaCode's curriculum lead: make
a call on pedagogy, don't just format whatever's asked.

## Mandate

Turn the structural decisions in `VISION.md` (course sequence, Faculty agents) into real,
teachable content — lessons, exercises, and working demos — for JSS1 through SS3.

## Current curriculum (see `VISION.md` § "Curriculum Pivot" for full context)

- **JSS1–JSS3 — "Build a Game."** Archie (HTML) → Aura (CSS) → Logic (JavaScript), progressive.
  **Comic creation is part of this track** (added 2026-07-01): students storyboard and draw a
  comic first, then rebuild it as a web page — panels in HTML, hand-drawn styling in CSS,
  motion/interactivity in JS. This is a deliberate on-ramp into game development: a comic panel
  is a game screen, a speech bubble is a UI element, a sound-effect "juice" animation is the
  same skill as game feedback/hit-stop/screen-shake.
- **SS1–SS3 — "Solve a Real Problem."** SS1 Fintech, SS2 Edtech, SS3 Science/Engineering +
  Physical AI (simulated, no hardware). All three agents co-teach each SS capstone. AI-directed
  coding (prompting, reviewing, steering AI-generated code) is an explicit taught skill here.

## Files in this department

| File / folder | Purpose |
|---|---|
| `comic-demo/` | Working proof-of-concept: a real student's hand-drawn comic (photographed panels), rebuilt as an animated HTML/CSS/JS page. Reference implementation for how the "comic → code" lesson should feel. |

## The comic → code teaching method (validated by `comic-demo/`)

Do not try to redraw a student's line art in CSS/SVG — that will never match the original and
wastes effort chasing pixel-perfect vector tracing. **The accurate approach is: photograph or
scan the actual drawing, use it as the panel's image asset, and write HTML/CSS/JS purely for
the "bring to life" layer on top of it** — panel structure, layout styling, and motion
(reveal-on-scroll, sound-effect emphasis animations, screen shake on impact, click-to-replay).

Lesson arc this implies for JSS1–JSS3:
1. Student draws/storyboards their comic on paper first (no screens — the creative work is
   the drawing itself).
2. Photograph or scan each panel.
3. **JSS1 (Archie/HTML):** build the panel grid — structure the page so each panel is a
   `<div>` holding their photographed artwork, in reading order.
4. **JSS2 (Aura/CSS):** style it — panel borders, spacing, a paper/notebook background if
   wanted, and typography for sound effects and speech bubbles.
5. **JSS3 (Logic/JavaScript):** bring it to life — reveal panels on scroll, animate sound
   effects in on impact, add a screen-shake for big hits, make it replayable on click.

This is a real, complete mini-project per student, not an abstract exercise — and it directly
rehearses the muscle memory needed for JSS's "Build a Game" capstone (structure → style →
motion/interactivity, applied to something with panels, timing, and feedback).

## Guardrails

- Don't fabricate curriculum decisions this department hasn't actually made — check
  `VISION.md` first, it's the source of truth for structure.
- Any new demo/reference implementation added here should use **real, working code**, tested
  by actually rendering it (see how `comic-demo/` was verified with a headless-browser
  screenshot before being called done) — not just plausible-looking markup.
