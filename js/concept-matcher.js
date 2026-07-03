/**
 * js/concept-matcher.js — pure matching logic for the Concept Knowledge Base.
 *
 * No imports, no I/O: everything here is a pure function so it can be unit-tested
 * in Node without a browser or a database. The Supabase glue lives in js/concepts.js.
 *
 * v1 design (per knowledge-base/SPEC.md §4): the curriculum is a bounded, finite
 * concept set, so this is keyword/tag matching — deliberately NOT embeddings.
 */

// Heuristic stand-in for the "Confused" intent until a real classifier exists
// (see knowledge-base/open-decisions.md §1). Errs on the side of matching only
// clear concept-question shapes so we don't ground casual chat.
const CONFUSED_PATTERNS = [
  /\bwhat\s+is\b/i, /\bwhat's\b/i, /\bwhats\b/i, /\bwhat\s+are\b/i,
  /\bhow\s+do(es)?\b/i, /\bhow\s+to\b/i, /\bwhy\s+do(es)?\b/i,
  /\bexplain\b/i, /\bmeaning\s+of\b/i, /\bdifference\s+between\b/i,
  /\bconfus/i, /\bdon'?t\s+understand\b/i, /\bnot\s+clear\b/i,
  /\bwetin\s+be\b/i, // pidgin: "what is"
];

export function isConfusedLike(message) {
  if (!message || typeof message !== 'string') return false;
  const m = message.trim();
  if (m.length < 4 || m.length > 500) return false;
  return CONFUSED_PATTERNS.some(re => re.test(m));
}

// Tokenize a tag for word-boundary matching. Hyphenated tags ("alt-text")
// match either "alt-text" or "alt text" in the message.
function tagRegex(tag) {
  const esc = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/-/g, '[-\\s]');
  return new RegExp(`\\b${esc}\\b`, 'i');
}

/**
 * Match a student message against concept_index rows.
 *
 * @param {string} message           the student's message
 * @param {Array}  indexRows         rows: {id, concept_slug, title, tags[], grade_level[], page_id}
 * @param {string|null} gradeKey     e.g. 'jss3' / 'ss2' (used as a tiebreaker boost, never a filter)
 * @returns best row or null if nothing scores >= 2
 */
export function matchConcept(message, indexRows, gradeKey = null) {
  if (!message || !Array.isArray(indexRows) || indexRows.length === 0) return null;
  const grade = gradeKey ? String(gradeKey).toUpperCase() : null;

  let best = null;
  let bestScore = 0;

  const TITLE_STOPWORDS = new Set(['what', 'does', 'the', 'and', 'with', 'that', 'this', 'basics']);

  for (const row of indexRows) {
    // Tags are the real signal — no tag hit, no match. Title words and grade
    // are tiebreakers only; without this gate, generic words like "what" plus
    // a grade boost could fake a match on an unrelated question.
    let tagScore = 0;
    for (const tag of row.tags || []) {
      if (tagRegex(tag).test(message)) {
        // Longer/more specific tags are stronger signals than generic ones
        tagScore += tag.length >= 5 || tag.includes('-') ? 3 : 2;
      }
    }
    if (tagScore === 0) continue;

    let score = tagScore;

    // Title words (minus stopwords) add a small boost
    for (const word of (row.title || '').toLowerCase().split(/[^a-z]+/)) {
      if (word.length >= 4 && !TITLE_STOPWORDS.has(word) &&
          new RegExp(`\\b${word}\\b`, 'i').test(message)) score += 1;
    }

    // Grade alignment is a tiebreaker, not a gate — a JSS3 student asking
    // about functions should still reach the SS3 page.
    if (grade && (row.grade_level || []).includes(grade)) score += 1;

    if (score > bestScore) { bestScore = score; best = row; }
  }

  return bestScore >= 2 ? best : null;
}

/** Best-effort topic guess for gap logging when nothing matched. */
export function inferTopic(message) {
  const KNOWN = ['html', 'css', 'javascript', 'js', 'scratch', 'tag', 'selector',
    'variable', 'function', 'loop', 'array', 'dom', 'form', 'table', 'flexbox',
    'grid', 'event', 'style', 'color', 'font', 'link', 'image'];
  const hits = KNOWN.filter(k => new RegExp(`\\b${k}`, 'i').test(message));
  return hits.length ? hits.join(', ') : null;
}
