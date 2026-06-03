import { createClient } from '@supabase/supabase-js';

/**
 * Server-only Supabase client using the service_role key.
 *
 * ⚠️ NEVER import this from any file that runs in the browser.
 * It bypasses Row Level Security and has full database access.
 * Used only inside `src/pages/api/*` endpoints.
 *
 * After enabling RLS on contact_requests (see supabase/migrations/),
 * the anon role can no longer INSERT directly. Only this admin
 * client can write, which means every insertion goes through our
 * server-side validation (Zod + Turnstile).
 */
const url = import.meta.env.PUBLIC_SUPABASE_URL;
const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  throw new Error(
    'Missing PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars. ' +
      'The contact form API endpoint cannot run without them.'
  );
}

export const supabaseAdmin = createClient(url, serviceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
