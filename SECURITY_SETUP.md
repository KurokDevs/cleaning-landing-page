# Security setup for the contact form

This document walks through the one-time setup needed after merging
the `feat/secure-contact-form` branch.

The contact form now goes through three layers of protection:

1. **Zod validation** — client + server, rejects malformed input
2. **Honeypot field** — invisible input that traps simple bots
3. **Cloudflare Turnstile** — proper CAPTCHA, server-verified
4. **Supabase RLS** — anon key can't write to the DB anymore;
   only the serverless `/api/contact` endpoint (which uses the
   service-role key) can insert leads

## 1. Run the SQL migration in Supabase

1. Open your Supabase project → SQL Editor → New query.
2. Paste the contents of `supabase/migrations/001_secure_contact_requests.sql`.
3. Click **Run**.
4. Verify with:
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'contact_requests';
   ```
   You should see 3 policies (read, update, delete for `authenticated`).

> **CRM dashboard:** keeps working unchanged. It authenticates with
> Supabase auth and uses the `authenticated` Postgres role, which is
> covered by the policies above.

## 2. Create a Cloudflare Turnstile site

1. Sign up for free at https://dash.cloudflare.com/sign-up (skip the
   add-domain step if it asks).
2. Go to **Turnstile** in the sidebar.
3. Click **Add site**:
   - Site name: `Neat & Co landing`
   - Domain: `neatandco.com` (and `localhost` for dev)
   - Widget mode: **Managed** (recommended)
4. Copy the **Site key** (public) and **Secret key** (private).

## 3. Configure environment variables

### Local development

Copy `.env.example` to `.env` and fill in:

```
PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
PUBLIC_SUPABASE_ANON_KEY=<from Supabase dashboard>
SUPABASE_SERVICE_ROLE_KEY=<from Supabase dashboard — keep secret!>
PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

The `1x...` values are Cloudflare's **always-pass test keys** — perfect
for local dev so you don't need a real Cloudflare account to develop.

### Vercel production

1. Open your project on Vercel → Settings → Environment Variables.
2. Add the 5 variables above, **using the REAL Turnstile keys** for
   `PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` (the test
   keys would accept any bot in production).
3. Mark `SUPABASE_SERVICE_ROLE_KEY` and `TURNSTILE_SECRET_KEY` as
   **encrypted** / sensitive.
4. Redeploy.

## 4. Test the form

1. Submit the form from the landing — should succeed.
2. Check Supabase → Table Editor → `contact_requests` → new row.
3. Check the CRM dashboard — the new lead should appear in realtime
   as before.
4. Try submitting with an obviously invalid email (e.g. `not-an-email`)
   — should show a red error message and not submit.
5. Open browser DevTools, find the honeypot input, fill it with any
   text, submit — should fail with "Spam detected".

## 5. Optional next steps

- **Rate limiting**: add IP-based rate limiting in `/api/contact`
  using Upstash Redis or Vercel KV. Right now Turnstile handles
  bot-level rate limiting but not "same human spamming the form".
- **Notifications**: send yourself an email or SMS when a new lead
  comes in (Resend, Twilio, or a Supabase webhook).
- **Server logs**: pipe `console.error` from `/api/contact` to a
  logging service (Vercel logs by default keep 1 hour on the free tier).
