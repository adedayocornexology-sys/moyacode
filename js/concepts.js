/**
 * js/concepts.js — data-access layer for the Concept Knowledge Base.
 *
 * Same contract as js/db.js: every function is fire-and-forget safe — errors are
 * logged to the console, never thrown, so the assistant keeps working even if
 * the concept tables don't exist yet (they degrade to "no grounding found").
 *
 * Pure matching logic lives in js/concept-matcher.js (unit-tested in Node).
 * Schema: knowledge-base/data-model.sql + knowledge-base/migrations/.
 */

import { supabase } from './supabase.js';
import { isConfusedLike, matchConcept, inferTopic } from './concept-matcher.js';

let indexCache = null;
let indexFetchedAt = 0;
const INDEX_TTL_MS = 5 * 60 * 1000; // refresh the (small) index every 5 minutes

async function loadConceptIndex() {
  const now = Date.now();
  if (indexCache && now - indexFetchedAt < INDEX_TTL_MS) return indexCache;
  const { data, error } = await supabase
    .from('concept_index')
    .select('id, concept_slug, title, tags, grade_level, page_id');
  if (error) {
    console.warn('[concepts] index load error:', error.message);
    return indexCache || [];
  }
  indexCache = data || [];
  indexFetchedAt = now;
  return indexCache;
}

/**
 * If the message looks like a concept question and matches a curated concept,
 * return grounding for the assistant: { title, content, confusions }.
 * Returns null (never throws) when there's no match or the KB isn't set up.
 * Unmatched concept-questions are logged to concept_gaps, non-blocking.
 */
export async function conceptGroundingFor(message, gradeKey = null) {
  try {
    if (!isConfusedLike(message)) return null;

    const rows = await loadConceptIndex();
    if (!rows.length) return null;

    const hit = matchConcept(message, rows, gradeKey);
    if (!hit) {
      logGap(message); // fire and forget — spec §4: never block the response
      return null;
    }

    const { data, error } = await supabase
      .from('concept_pages')
      .select('title, content_md, common_confusions')
      .eq('id', hit.page_id)
      .single();
    if (error || !data) {
      if (error) console.warn('[concepts] page fetch error:', error.message);
      return null;
    }

    bumpServed(hit.id); // fire and forget
    return {
      title: data.title,
      content: data.content_md,
      confusions: data.common_confusions || [],
    };
  } catch (e) {
    console.warn('[concepts] grounding error:', e);
    return null;
  }
}

function logGap(message) {
  supabase
    .from('concept_gaps')
    .insert({ student_message: message.slice(0, 500), inferred_topic: inferTopic(message) })
    .then(({ error }) => { if (error) console.warn('[concepts] gap log error:', error.message); });
}

function bumpServed(conceptId) {
  supabase
    .rpc('bump_concept_served', { cid: conceptId })
    .then(({ error }) => { if (error) console.warn('[concepts] bump error:', error.message); });
}
