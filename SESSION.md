# MoyaCode — Session Log

> Resume point for the MoyaCode web app. Read this first to continue.
> Last updated: **2026-07-08**

---

## 2026-07-08 — Moya wired to Claude + knowledge base (the "curriculum brain" v1)

Moya's free-text chat is LIVE locally, powered by the founder's new Anthropic key (same Cornexology key as the Ajasin site, in `.env` as `ANTHROPIC_API_KEY`; server default model stays `claude-haiku-4-5-20251001` for cost).

**Knowledge base (SQLite, in-repo):** the MoyaCode Supabase project is paused (free-tier slot squeeze), so the wiki lives in-process for now:
- `knowledge/wiki_seed.py` — 13 pages / index entries / 17 typed relations distilled from `lessons.js` + `CONSTITUTION.md`: how MoyaCode works, the learning path, all six tracks, MoyaCoin, Moya, tutors, Arcade, Owo bootcamp. **Update this file when curriculum or Constitution change.**
- `wiki_store.py` — builds an in-memory SQLite DB with FTS5 at startup; `search()` (OR-semantics over title/summary/tags, bm25 x relevance_weight) and `get_page()` (content + both relation directions). Same shape as `supabase/wiki_knowledge.sql` for the eventual Postgres migration.
- `main.py` — new public read-only endpoints `GET /api/wiki/search?q=` and `GET /api/wiki/page/{slug}`.

**Agent wiring (`js/assistant.js`):** added `search_wiki` + `read_page` tool definitions to Moya's client-side loop (WebMCP tools untouched); wiki tools execute via fetch to the server endpoints; system prompt now says search-first for questions about MoyaCode/curriculum and answer only from pages.

**Verified end to end** with a scripted stand-in for the browser loop: "Is MoyaCode really free? What is MoyaCoin then?" → search_wiki → read_page x2 → grounded, on-voice answer (free floor + MoyaCoin explained correctly). Run the server with `python -m uvicorn main:app --host 0.0.0.0 --port 8001` and test in the browser via the Ask Moya button.

**Next for Moya:** browser playtest on the founder's phone; then MoyaCoin metering hooks; migrate wiki to Supabase when the DB slot frees.

---

## 2026-06-24 — Hero game embedded + re-themed "Run the Stack" (the dev journey)

Two things this session: (1) surfaced the `/torch` game on the homepage, and (2) **re-themed it away from Pa Ajasin** to the journey of learning to code. (User's call: the game should be about becoming a web developer, not about Ajasin.)

**Homepage hero embed (`index.html`):**
- Replaced the static SVG illustration in the `.hero-frame` with a **live `<iframe src="/torch?embed=1">`** — a playable preview sitting in the hero's right column.
- The iframe is `pointer-events:none` until the visitor opts in, so **mobile page-scroll is never trapped** over it. A "▶ Run the Stack" overlay (`#heroPlay`) sits on top: **desktop** → activates in place + `postMessage({type:'moya-start'})` to start the run right there; **mobile (≤960px)** → navigates to fullscreen `/torch`. Plus a "⤢ Fullscreen" chip and the XP/streak floats fade out while playing.
- `?embed=1` → `torch.html` adds `body.embed`, which hides the in-game brand + start screen so the host page's overlay is the single CTA over the idle scene.

**Re-theme: "Light the Nation / Ajasin Torch Run" → "Run the Stack — The Dev Run" (`templates/torch.html`):**
- The runner is now **you, learning to code** (not a torchbearer). Momentum meter (was "flame"), knowledge orbs = XP, obstacles = **bugs** (`!`) to jump.
- Milestone gates = **the stacks**, passed in order and cycling: `STACKS = HTML → CSS → JavaScript → The DOM → Browser APIs → Web Dev` (6, mirrors the homepage "6 Quests"). Each gate is **labelled on the building**; passing it lights it gold, ticks "🧩 N stacks mastered", and shows a "✓ {stack} mastered" card with a one-line tip (replaced the Ajasin "story shard" quotes).
- **WIN MOMENT:** mastering all 6 (ending on **Web Dev**) triggers `win()` — celebratory teal/gold spark burst (animated even though the run freezes), a rising `sfxWin` fanfare, then a **"You're a Web Developer 🎉"** screen (reuses the over-screen overlay; `#overTitle`/`#overEyebrow` are now set by both `win()` and `gameOver()` so win→retry→lose reads correctly). "Run again" replays.
- Start/over/leaderboard copy all re-themed ("The Dev Run", "Your dev run", "Top Coders", dev quotes). No Ajasin/torch references remain in gameplay.

**Verified** via Playwright screenshots on :8001 — start screen, mid-run (HTML gate visible), and the win screen all render; **no JS console errors**. The hero is `index.html` (served as FileResponse) and `torch.html` (Jinja) — both re-read per request, so a browser refresh shows changes (no server restart needed).

**Open / next:**
- [ ] Playtest the difficulty — the win needs surviving 6 gates on one run; tune flame/momentum drain + gate spacing if it feels too hard/easy.
- [ ] (Optional) Swap the runner silhouette for illustrated "Neon Saga" coder art once image-gen is unblocked (still a code-drawn stick figure).
- [ ] Global leaderboard still localStorage-only (Supabase migration blocker below unchanged).

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
- **Theme (CURRENT, as of 2026-06-24):** **"Run the Stack — The Dev Run"** — the journey of learning to code. You scale the stacks (HTML → CSS → JS → DOM → Browser APIs → Web Dev), dodge bugs, and the win = **becoming a Web Developer**. NOT about Ajasin.
- ~~**Theme:** Pa Ajasin / "Light the Nation" torch run~~ — **SUPERSEDED 2026-06-24.** The Ajasin torch framing was dropped per the user: the game is now about the dev journey, not the man. (The Ajasin biography content in `desktop\Ajasin_Book_Project\` is unrelated to the game now — keep it for the separate Ajasin book/Foundation work.)
- **Art style:** "Neon Saga" — stylized vector + glow (Alto's Odyssey vibe). Runner is still a code-drawn neon silhouette.

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
