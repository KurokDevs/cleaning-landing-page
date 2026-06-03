import type { APIRoute } from 'astro';
import { contactSchema } from '../../lib/validation';
import { supabaseAdmin } from '../../lib/supabase-admin';

// Force this route to run as a serverless function (not prerendered).
export const prerender = false;

const TURNSTILE_SECRET = import.meta.env.TURNSTILE_SECRET_KEY;
const TURNSTILE_VERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';

function json(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // 1. Parse JSON body safely
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  // 2. Validate with Zod (schema rejects bad data + honeypot)
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      {
        error: 'Validation failed',
        issues: parsed.error.flatten().fieldErrors,
      },
      400
    );
  }

  // 3. Verify Turnstile token with Cloudflare
  if (!TURNSTILE_SECRET) {
    console.error('TURNSTILE_SECRET_KEY env var is not configured');
    return json({ error: 'Server misconfiguration' }, 500);
  }

  const formData = new URLSearchParams({
    secret: TURNSTILE_SECRET,
    response: parsed.data.turnstileToken,
  });
  if (clientAddress) formData.append('remoteip', clientAddress);

  let turnstileResult: { success: boolean; 'error-codes'?: string[] };
  try {
    const tsResponse = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      body: formData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    turnstileResult = await tsResponse.json();
  } catch (err) {
    console.error('Turnstile verification network error:', err);
    return json({ error: 'Captcha verification failed' }, 502);
  }

  if (!turnstileResult.success) {
    console.warn('Turnstile rejected token:', turnstileResult['error-codes']);
    return json({ error: 'Captcha verification failed' }, 403);
  }

  // 4. Insert into Supabase using the service-role client
  const { name, email, phone, service, message } = parsed.data;
  const { error } = await supabaseAdmin.from('contact_requests').insert([
    {
      name,
      email,
      phone,
      service,
      message: message || null,
    },
  ]);

  if (error) {
    console.error('Supabase insert error:', error);
    return json({ error: 'Could not save your request' }, 500);
  }

  return json({ ok: true }, 200);
};
