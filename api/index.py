"""Vercel serverless entrypoint for the MoyaCode FastAPI app.

Vercel's Python runtime looks for an ASGI `app` in this file. The real app
lives in main.py at the project root, so we put the root on sys.path and
re-export it. All routing/static-serving stays exactly as it runs locally.
"""

import os
import sys

# Project root (parent of this api/ dir) must be importable so `main`,
# `wiki_store`, and the `knowledge` package resolve at runtime.
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import app  # noqa: E402  (import after sys.path tweak)

__all__ = ["app"]
