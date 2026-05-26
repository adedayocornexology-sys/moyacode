/**
 * js/supabase.js
 * Shared Supabase client for MoyaCode.
 *
 * Replace the two placeholder constants below with your real
 * project URL and anon key before deploying.
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export const SUPABASE_URL  = 'REPLACE_WITH_PROJECT_URL';
const        SUPABASE_ANON = 'REPLACE_WITH_ANON_KEY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);
