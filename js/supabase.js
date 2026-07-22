/**
 * js/supabase.js
 * Shared Supabase client for MoyaCode.
 *
 * Replace the two placeholder constants below with your real
 * project URL and anon key before deploying.
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// MoyaCode's database lives in this (active) Supabase project. The original
// MoyaCode project was paused on the free tier, so student auth + progress,
// games, and character submissions all live here now.
export const SUPABASE_URL  = 'https://meskscsjwiseelrvzqaj.supabase.co';
const        SUPABASE_ANON = 'sb_publishable_wAAwr4ISpIXRlhz2ZdfGXQ_0nJaw8QH';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);
