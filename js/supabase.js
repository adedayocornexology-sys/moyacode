/**
 * js/supabase.js
 * Shared Supabase client for MoyaCode.
 *
 * Replace the two placeholder constants below with your real
 * project URL and anon key before deploying.
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export const SUPABASE_URL  = 'https://bzlchdijdpjjobemrcci.supabase.co';
const        SUPABASE_ANON = 'sb_publishable_qm4IIrY9y-Hal7LVBqBW8Q_a8eyO708';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);
