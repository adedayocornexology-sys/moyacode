"""
wiki_store.py — SQLite-backed knowledge store for Moya.

Builds an in-memory SQLite database (with FTS5 full-text search) from
knowledge/wiki_seed.py at import time. Temporary home while the MoyaCode
Supabase project is paused; supabase/wiki_knowledge.sql is the same schema
waiting on the Postgres side, so search()/get_page() keep their signatures
when we migrate.
"""

import re
import sqlite3
import threading

from knowledge.wiki_seed import INDEX, PAGES, RELATIONS

_lock = threading.Lock()


def _build() -> sqlite3.Connection:
    db = sqlite3.connect(":memory:", check_same_thread=False)
    db.executescript(
        """
        CREATE TABLE pages (
          slug TEXT PRIMARY KEY, title TEXT, content_md TEXT, page_type TEXT
        );
        CREATE TABLE relations (
          from_slug TEXT, relation_type TEXT, to_slug TEXT, description TEXT
        );
        CREATE VIRTUAL TABLE idx USING fts5(
          title, summary, tags, page_slug UNINDEXED, weight UNINDEXED
        );
        """
    )
    db.executemany(
        "INSERT INTO pages VALUES (?,?,?,?)",
        [(p["slug"], p["title"], p["content_md"], p["page_type"]) for p in PAGES],
    )
    db.executemany("INSERT INTO relations VALUES (?,?,?,?)", RELATIONS)
    db.executemany(
        "INSERT INTO idx VALUES (?,?,?,?,?)",
        [(t, s, " ".join(tags), slug, w) for t, s, tags, slug, w in INDEX],
    )
    db.commit()
    return db


_db = _build()


def search(query: str, limit: int = 6) -> list[dict]:
    """OR-semantics full-text search over title + summary + tags."""
    words = re.findall(r"[a-z0-9]{2,}", query.lower())[:12]
    if not words:
        return []
    match = " OR ".join(words)
    with _lock:
        rows = _db.execute(
            """
            SELECT page_slug, title, summary, tags,
                   bm25(idx) / CAST(weight AS REAL) AS score
            FROM idx WHERE idx MATCH ? ORDER BY score LIMIT ?
            """,
            (match, limit),
        ).fetchall()
    return [
        {"page_slug": slug, "title": title, "summary": summary, "tags": tags}
        for slug, title, summary, tags, _ in rows
    ]


def get_page(slug: str) -> dict | None:
    """One page plus its outgoing and incoming relations."""
    with _lock:
        page = _db.execute(
            "SELECT slug, title, content_md, page_type FROM pages WHERE slug = ?",
            (slug,),
        ).fetchone()
        if not page:
            return None
        outgoing = _db.execute(
            """
            SELECT r.relation_type, r.to_slug, p.title, r.description
            FROM relations r JOIN pages p ON p.slug = r.to_slug
            WHERE r.from_slug = ?
            """,
            (slug,),
        ).fetchall()
        incoming = _db.execute(
            """
            SELECT r.relation_type, r.from_slug, p.title, r.description
            FROM relations r JOIN pages p ON p.slug = r.from_slug
            WHERE r.to_slug = ?
            """,
            (slug,),
        ).fetchall()
    return {
        "slug": page[0],
        "title": page[1],
        "content_md": page[2],
        "page_type": page[3],
        "related": [
            {"direction": "out", "relation": rt, "page_slug": s, "title": t, "description": d}
            for rt, s, t, d in outgoing
        ]
        + [
            {"direction": "in", "relation": rt, "page_slug": s, "title": t, "description": d}
            for rt, s, t, d in incoming
        ],
    }
