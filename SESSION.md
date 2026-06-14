# MoyaCode — Session Log

> Resume point for the MoyaCode web app. Read this first to continue.
> Last updated: **2026-06-14**

---

## 2026-06-14 — WebMCP agentic layer + learner memory ("Moya")

Goal: make the site **remember each student** and let them say "continue where I left off" — and make MoyaCode **agentic** via WebMCP.

The memory foundation already existed (`js/auth.js`, `js/db.js`, `js/supabase.js`, `supabase/schema.sql`: `students`, `student_profile`, `student_progress`, `answer_events`, `handoff_events`). This session added the **agentic layer on top**:

- **`js/webmcp.js`** — the tool registry. Reads the student's full learning memory (`getLearnerState()`: profile + per-course completion/XP + `nextCourse`), working signed-in (DB) **and** as a guest (localStorage). Exposes tools `get_learner_state`, `resume_learning`, `start_course`, `recommend_next_step`, `list_courses`, `set_goal`. Registers them with `navigator.modelContext` (browser-native WebMCP agents) when present, and always on `window.MoyaMCP` for our own scripts.
- **`js/assistant.js`** — "Moya", a floating in-page assistant. On open it shows a deterministic **"Welcome back · N/6 tracks · continue"** card with one-tap actions (`resume_learning`, etc.) — this works with **no API key**. Free-text chat runs an agent loop: POST to `/api/assistant`, execute returned `tool_use` blocks client-side via `window.MoyaMCP` (in the student's own auth session — the WebMCP pattern), loop back tool results.
- **`main.py`** — added `POST /api/assistant`, a thin stateless Claude relay (tools come from the client, single source of truth). Reads `ANTHROPIC_API_KEY` / `ANTHROPIC_MODEL` (default `claude-haiku-4-5-20251001`). Returns **503** when no key → client falls back to the no-LLM card.
- Wired `<script type="module" src="/js/assistant.js">` into `templates/base.html` + legacy learner pages: `index.html`, `welcome.html`, `selection.html`, `lesson.html`, `quiz.html`.
- `.env.example` — added `ANTHROPIC_API_KEY` / `ANTHROPIC_MODEL`.

**Smoke-tested** on port 8011: home + both modules serve 200; relay returns 503 without a key (graceful path) as designed.

**To finish / next:**
- [ ] Add a real `ANTHROPIC_API_KEY` to `.env` to switch on free-text chat (deterministic card works without it).
- [ ] Confirm the Supabase tables in `schema.sql` are actually applied to `bzlchdijdpjjobemrcci` (earlier blocker) so signed-in memory persists cloud-side; guest/localStorage path works regardless.
- [ ] Optional: add a `streak`/`last_active` signal and surface it in the welcome card.
- [ ] Then replicate the pattern for **Sellam** (shopper memory: recently-viewed, saved searches, watchlist + WebMCP tools `search_listings`, `save_search`, `add_to_watchlist`, `recommend_for_me`).

---

## How to run (local)
```
cd C:\Users\hp\desktop\moyacode
python -m uvicorn main:app --host 127.0.0.1 --port 8001
```
Then open **http://127.0.0.1:8001/**  (game at **/torch**).

> ⚠️ We use **port 8001**, not 8000 — port 8000 had a stuck/ghost socket on this machine.
> Server is plain uvicorn (no `--reload`); restart it after editing `main.py`. Jinja templates reload per-request.

---

## What this project is now
The MoyaCode learning app (GitHub `adedayocornexology-sys/moyacode`) has been migrated from a **static GitHub Pages site** to a **FastAPI server** with real server-side routing. The FastAPI version is now canonical; the GitHub Pages copy still exists but is being superseded. **Hosting is still local-only** — plan is to deploy to a Python host (Render free tier) later.

**Stack:** FastAPI + Jinja2 templates + StaticFiles (serves legacy `*.html`), Supabase (project ref `bzlchdijdpjjobemrcci`), vanilla JS/Canvas. No build step.

**Key files:** `main.py` (routes + API), `templates/` (base, features, tracks, about, schools, arcade, torch), `supabase/schema.sql`, `requirements.txt`, `.env.example`.

---

## Done this session
1. **Cloned** the repo to `desktop\moyacode`; set up `python -m http.server` then replaced with FastAPI.
2. **FastAPI migration** — routes: `/`, `/features`, `/tracks`, `/about`, `/schools`, `/arcade`, `/torch`; API: `/api/games`, `/api/games/{id}/feedback`, `/api/feedback`. Legacy `.html` pages still served via a root StaticFiles mount.
3. **Homepage fixed** — killed the SPA `#anchor` nav; **Features & Tracks are now real dedicated pages**; removed those sections from the homepage and gave the **Arcade** the prime hero-adjacent spot. Unified navbar (Features · Tracks · Arcade · About · Schools) across all template pages via `base.html`. Added a **Python & AI "coming soon"** track on `/tracks` (curriculum currently teaches only Scratch/HTML/CSS/JS — Python gap is known).
4. **Arcade** (`/arcade`) — student-built-games showcase. Model: **founder curates**, games are **student-hosted in a sandboxed iframe** (never host untrusted code), **public feedback** (rating + comment). `games` + `game_feedback` tables added to `supabase/schema.sql` with a `status` column so a public submission queue drops in later (Phase 2). Sample game at `samplegame/index.html`.
5. **Hero game prototype** (`/torch`) — "**Light the Nation: The Ajasin Torch Run**". A faux-3D **Neon Saga** endless-runner about Pa Ajasin's free-education legacy (you run, keep your torch flame alive, light up dark schools). Includes: glowing **silhouette torchbearer** (code-crafted — see blocker), particle torch flame, parallax Owo skyline, knowledge orbs (refuel flame), obstacles, **real Ajasin quotes** from *The Story of a Legend* as collectible "story shards", score + schools-lit, **pause** (button + Esc/P + auto-pause on tab blur), **Web Audio SFX + an original Afro-flavored music loop** + 🔊/🔇 toggle, game-over with name entry + **localStorage leaderboard**.
   - Fixed an init-order bug (game objects undefined on first frame crashed the render loop).

## Locked design decisions (for the hero game)
- **Tech:** faux-3D Canvas + leaderboard (chosen over real WebGL/Spline for low-end Android perf — audience is on Tecno Pop 7-class phones).
- **Theme:** Pa Ajasin (Owo's son + free-education champion → MoyaCode = continuation of his legacy). Sourced from **"The Story of a Legend" (1992, yellow cover)** in `desktop\Ajasin_Book_Project\`.
- **Ajasin's role:** dignified **guiding mentor** (portrait + real quotes), NOT a controllable avatar.
- **Concept:** "Light the Nation + Collect a Legend" — emotional torch loop + unlock real story shards.
- **Moat:** proprietary authorized content (the book) + Foundation endorsement + funnel into MoyaCode XP. Daily streak + school-vs-school leaderboard for retention.
- **Art style:** "Neon Saga" — stylized vector + glow (Alto's Odyssey vibe).

## Open blockers
- **AI image generation is blocked.** nano-banana (Gemini) free image tier is quota-exhausted (the key fix — writing the key to `~/.gemini/.env` — is applied and works for auth). Higgsfield has **0 credits**. So the torchbearer is currently a **code-crafted silhouette stand-in**; swap in an AI-illustrated Owo torchbearer when credits return (wait for daily reset, enable Gemini billing ~$0.04/img, or top up Higgsfield).
- **Supabase migration NOT applied.** The moyacode project (`bzlchdijdpjjobemrcci`) is **not** under the Supabase account connected to the MCP tools (that account only has `ajasin-foundation`). So the `games`/`game_feedback` tables must be created by pasting the SQL from `supabase/schema.sql` into the moyacode Supabase SQL editor — or by connecting that account. Until then the Arcade shows its empty state and the torch leaderboard is localStorage-only.

## Next steps (pick up here)
- [ ] **Playtest tuning** for `/torch` — awaiting user's read on hero look, difficulty (flame drain/jump/speed), audio loop.
- [ ] Run the Supabase migration (games, game_feedback) + add a `torch_scores` table for a **global** leaderboard; wire `/torch` to it (currently localStorage).
- [ ] **Generate/commission the AI-illustrated torchbearer + world art** (Neon Saga) once image-gen is unblocked; swap into the canvas.
- [ ] **Embed `/torch` into the homepage hero** (currently a standalone page for prototyping).
- [ ] Build out stages/biomes: market → festival procession → Olowo's palace → sacred forest → modern MoyaCode classroom (torch passes to the player). More story shards from Part IV "Echoes of Wisdom" + the A–Z honours as collectibles.
- [ ] **Get Ajasin Foundation blessing** before any public launch of the Ajasin game.
- [ ] Decide + set up **hosting** (Render free tier for FastAPI) when ready to publish.
- [ ] (Later) Add a Python track to the actual MoyaCode curriculum (`lessons.js` / `script.js`).

## Source material on disk
- `desktop\Ajasin_Book_Project\` — OCR + decodes of *The Story of a Legend* (1992). `02_ocr_master/CHAPTER_MAP.md` = chapter list + A–Z honours; "Echoes of Wisdom" quotes ~lines 13339–13722 of `ajasinbook_ocr.txt`; `05_archival_photos/` = portraits (for the mentor figure).
- `desktop\Pa_Ajasin\` — biography, Foundation vision/mission, archival photos, scans.
