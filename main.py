"""
MoyaCode — FastAPI server.

Serves the site with real, server-side URL routing (no more #anchor SPA feel)
and a JSON API for the student Arcade (featured games + visitor feedback).

Run locally:
    pip install -r requirements.txt
    uvicorn main:app --reload --port 8000

Then open http://localhost:8000
"""

import os
from pathlib import Path

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel, Field

import wiki_store

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent

# Supabase — defaults mirror js/supabase.js so it works out of the box,
# but override them via a .env file (see .env.example) for production.
SUPABASE_URL = os.getenv("SUPABASE_URL", "https://bzlchdijdpjjobemrcci.supabase.co")
SUPABASE_KEY = os.getenv(
    "SUPABASE_KEY", "sb_publishable_qm4IIrY9y-Hal7LVBqBW8Q_a8eyO708"
)
REST = f"{SUPABASE_URL}/rest/v1"
SB_HEADERS = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
}

# Claude — powers the in-page assistant "Moya". Optional: if unset, the
# assistant still works for the deterministic "continue where you left off"
# flow; only free-text chat is disabled.
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
ANTHROPIC_MODEL = os.getenv("ANTHROPIC_MODEL", "claude-haiku-4-5-20251001")

app = FastAPI(title="MoyaCode")
templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))


# ── Page routes (real server-side routing) ───────────────────────────
@app.get("/")
async def home():
    # The landing page is the existing rich index.html, served as-is.
    return FileResponse(BASE_DIR / "index.html")


@app.get("/features")
async def features(request: Request):
    return templates.TemplateResponse("features.html", {"request": request})


@app.get("/tracks")
async def tracks(request: Request):
    return templates.TemplateResponse("tracks.html", {"request": request})


@app.get("/about")
async def about(request: Request):
    return templates.TemplateResponse("about.html", {"request": request})


@app.get("/schools")
async def schools(request: Request):
    return templates.TemplateResponse("schools.html", {"request": request})


@app.get("/arcade")
async def arcade(request: Request):
    return templates.TemplateResponse("arcade.html", {"request": request})


@app.get("/torch")
async def torch(request: Request):
    return templates.TemplateResponse("torch.html", {"request": request})


# ── Arcade API ───────────────────────────────────────────────────────
class FeedbackIn(BaseModel):
    game_id: int
    rating: int = Field(ge=1, le=5)
    player_name: str | None = Field(default=None, max_length=60)
    comment: str | None = Field(default=None, max_length=600)


@app.get("/api/games")
async def list_games():
    """Featured student games, newest first."""
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            r = await client.get(
                f"{REST}/games",
                headers=SB_HEADERS,
                params={
                    "status": "eq.featured",
                    "select": "*",
                    "order": "created_at.desc",
                },
            )
        r.raise_for_status()
        return r.json()
    except httpx.HTTPError:
        # Don't break the page if Supabase isn't reachable / not migrated yet.
        return JSONResponse([], status_code=200)


@app.get("/api/games/{game_id}/feedback")
async def game_feedback(game_id: int):
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            r = await client.get(
                f"{REST}/game_feedback",
                headers=SB_HEADERS,
                params={
                    "game_id": f"eq.{game_id}",
                    "select": "player_name,rating,comment,created_at",
                    "order": "created_at.desc",
                    "limit": "50",
                },
            )
        r.raise_for_status()
        return r.json()
    except httpx.HTTPError:
        return JSONResponse([], status_code=200)


@app.post("/api/feedback")
async def add_feedback(fb: FeedbackIn):
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            r = await client.post(
                f"{REST}/game_feedback",
                headers={**SB_HEADERS, "Prefer": "return=representation"},
                json=fb.model_dump(),
            )
        if r.status_code >= 400:
            raise HTTPException(status_code=502, detail="Could not save feedback.")
        return r.json()
    except httpx.HTTPError:
        raise HTTPException(status_code=502, detail="Feedback service unavailable.")


# ── Assistant relay (WebMCP brain for "Moya") ────────────────────────
# Thin, stateless relay to Claude. The browser owns the tools (js/webmcp.js)
# and executes them client-side in the student's own session; this endpoint
# is only the language brain. It passes the client's tool definitions through
# so there is a single source of truth for tools (the browser).
class AssistantIn(BaseModel):
    messages: list[dict]
    tools: list[dict] | None = None
    system: str | None = None
    model: str | None = None


@app.post("/api/assistant")
async def assistant(payload: AssistantIn):
    if not ANTHROPIC_API_KEY:
        # Not configured — tell the client to fall back to its no-LLM UI.
        raise HTTPException(status_code=503, detail="assistant_unavailable")

    body = {
        "model": payload.model or ANTHROPIC_MODEL,
        "max_tokens": 1024,
        "messages": payload.messages,
    }
    if payload.system:
        body["system"] = payload.system
    if payload.tools:
        body["tools"] = payload.tools

    try:
        async with httpx.AsyncClient(timeout=45) as client:
            r = await client.post(
                "https://api.anthropic.com/v1/messages",
                headers={
                    "x-api-key": ANTHROPIC_API_KEY,
                    "anthropic-version": "2023-06-01",
                    "content-type": "application/json",
                },
                json=body,
            )
        if r.status_code >= 400:
            return JSONResponse(
                {"error": "upstream", "detail": r.text}, status_code=502
            )
        return r.json()
    except httpx.HTTPError:
        raise HTTPException(status_code=502, detail="assistant_upstream_unavailable")


# ── Knowledge base (the wiki Moya searches and cites) ────────────────
# SQLite in-process for now (see wiki_store.py); same shape as the
# Supabase wiki tables in supabase/wiki_knowledge.sql for later.


@app.get("/api/wiki/search")
async def wiki_search(q: str = ""):
    q = q.strip()[:300]
    if not q:
        raise HTTPException(status_code=400, detail="q required")
    return {"results": wiki_store.search(q)}


@app.get("/api/wiki/page/{slug}")
async def wiki_page(slug: str):
    page = wiki_store.get_page(slug.strip()[:200])
    if not page:
        raise HTTPException(status_code=404, detail="page not found")
    return page


# ── Static assets + legacy .html pages ───────────────────────────────
# Mounted LAST so the explicit routes above take priority. This serves
# tokens.css, components.css, /js/*, /css/*, and every existing *.html
# page straight from disk at their current paths.
app.mount("/", StaticFiles(directory=str(BASE_DIR), html=True), name="static")
