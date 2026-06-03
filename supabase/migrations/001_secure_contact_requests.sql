-- =====================================================================
-- Secure contact_requests with Row Level Security
-- =====================================================================
-- Goal: nobody can read/write contact_requests with the public anon key.
-- Only:
--   - The landing's serverless API endpoint (uses SERVICE_ROLE key,
--     which bypasses RLS) can INSERT new leads.
--   - Authenticated users (the CRM dashboard's logged-in admins) can
--     SELECT / UPDATE / DELETE.
--
-- IMPORTANT for the CRM dashboard:
-- The CRM uses an authenticated Supabase session (the admin logs in).
-- That session uses the `authenticated` Postgres role, which IS covered
-- by the policies below — so the CRM keeps working unchanged.
--
-- Run this in the Supabase dashboard: SQL Editor → New query → paste → Run.
-- =====================================================================

ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- Drop any existing permissive policies from before RLS was enabled.
DROP POLICY IF EXISTS "Allow anon insert" ON public.contact_requests;
DROP POLICY IF EXISTS "Enable insert for anon" ON public.contact_requests;
DROP POLICY IF EXISTS "Public can insert" ON public.contact_requests;

-- =====================================================================
-- Policies for the CRM dashboard (authenticated admin users)
-- =====================================================================

CREATE POLICY "authenticated_users_can_read"
  ON public.contact_requests
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "authenticated_users_can_update"
  ON public.contact_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "authenticated_users_can_delete"
  ON public.contact_requests
  FOR DELETE
  TO authenticated
  USING (true);

-- Note: no INSERT policy for `authenticated` or `anon`. New leads are
-- created ONLY by the landing's API endpoint using SERVICE_ROLE_KEY,
-- which bypasses RLS entirely.

-- =====================================================================
-- After running this, verify with:
--   SELECT * FROM pg_policies WHERE tablename = 'contact_requests';
-- You should see the 3 policies above.
-- =====================================================================
