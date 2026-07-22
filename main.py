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

import moya_agent
import wiki_store

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent

# Supabase — defaults mirror js/supabase.js so it works out of the box,
# but override them via a .env file (see .env.example) for production.
SUPABASE_URL = os.getenv("SUPABASE_URL", "https://meskscsjwiseelrvzqaj.supabase.co")
SUPABASE_KEY = os.getenv(
    "SUPABASE_KEY", "sb_publishable_wAAwr4ISpIXRlhz2ZdfGXQ_0nJaw8QH"
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


# ── Security headers (OWASP baseline) ────────────────────────────────
# The pages use heavy inline styles/scripts and a few known CDNs (Google
# Fonts, jsDelivr, cdnjs) plus the browser Supabase client, so the CSP
# allows those explicitly + 'unsafe-inline'. The high-value, zero-risk
# protections (clickjacking, MIME sniffing, referrer leakage, HSTS) are
# always on. Tighten script-src away from 'unsafe-inline' later once the
# inline scripts are externalised.
_CSP = (
    "default-src 'self'; "
    "img-src 'self' data: blob: https:; "
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; "
    "font-src 'self' data: https://fonts.gstatic.com https://cdnjs.cloudflare.com; "
    "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://esm.sh; "
    "connect-src 'self' https://*.supabase.co https://esm.sh; "
    "frame-src 'self'; "
    "frame-ancestors 'self'; "
    "base-uri 'self'; "
    "object-src 'none'; "
    "form-action 'self'"
)


@app.middleware("http")
async def security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers.setdefault("Content-Security-Policy", _CSP)
    response.headers.setdefault("X-Content-Type-Options", "nosniff")
    response.headers.setdefault("X-Frame-Options", "SAMEORIGIN")
    response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
    response.headers.setdefault(
        "Permissions-Policy", "geolocation=(), microphone=(), camera=()"
    )
    response.headers.setdefault(
        "Strict-Transport-Security", "max-age=31536000; includeSubDomains"
    )
    return response


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


@app.get("/privacy")
async def privacy(request: Request):
    return templates.TemplateResponse("privacy.html", {"request": request})


@app.get("/child-safety")
async def child_safety(request: Request):
    return templates.TemplateResponse("child-safety.html", {"request": request})


@app.get("/contact")
async def contact(request: Request):
    return templates.TemplateResponse("contact.html", {"request": request})


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
# Stateless relay to Claude. SECURITY: the server — not the browser — owns the
# system prompt and the tool schemas (see moya_agent.py). The client sends ONLY
# conversation `messages`; any client-supplied system/tools/model are ignored.
# This prevents the endpoint from being used as an open Claude proxy on our key.
# The browser still EXECUTES the WebMCP tools locally (the WebMCP pattern).
class AssistantIn(BaseModel):
    # Only `messages` is read from the client. Any client-supplied
    # `system`/`tools`/`model` are ignored (not "forbidden") so that an
    # already-loaded older client keeps working during the rollout — the
    # server builds the upstream call purely from moya_agent, never from
    # client input, so ignoring the extras is equally secure.
    model_config = {"extra": "ignore"}
    messages: list[dict]


@app.post("/api/assistant")
async def assistant(payload: AssistantIn, request: Request):
    if not ANTHROPIC_API_KEY:
        # Not configured — tell the client to fall back to its no-LLM UI.
        raise HTTPException(status_code=503, detail="assistant_unavailable")

    # 1) Origin/Referer allowlist — block other sites calling our key.
    if not moya_agent.origin_allowed(
        request.headers.get("origin"), request.headers.get("referer")
    ):
        raise HTTPException(status_code=403, detail="origin_not_allowed")

    # 2) Best-effort rate limit (per warm instance; Vercel Firewall is the
    #    real limiter — see moya_agent.rate_limited).
    client_ip = (request.headers.get("x-forwarded-for", "") or "").split(",")[0].strip() or (
        request.client.host if request.client else "unknown"
    )
    if moya_agent.rate_limited(client_ip):
        raise HTTPException(status_code=429, detail="rate_limited")

    # 3) Validate the conversation payload (size/shape/roles).
    err = moya_agent.validate_messages(payload.messages)
    if err:
        raise HTTPException(status_code=400, detail=err)

    # 4) Build the upstream call with the SERVER-OWNED prompt + tools.
    body = {
        "model": ANTHROPIC_MODEL,
        "max_tokens": moya_agent.MAX_TOKENS,
        "system": moya_agent.MOYA_SYSTEM_PROMPT,
        "tools": moya_agent.MOYA_TOOLS,
        "messages": payload.messages,
    }

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
