import { z } from 'zod';

/**
 * Schema for contact form submissions.
 *
 * Validated on BOTH client (before submit, for UX) and server (in
 * /api/contact, for security). Never trust client validation alone.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100, { message: 'Name is too long' }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: 'Invalid email address' })
    .max(200),
  phone: z
    .string()
    .trim()
    .min(7, { message: 'Phone is too short' })
    .max(30, { message: 'Phone is too long' })
    // Allow digits, spaces, +, -, (, ). Reject anything else.
    .regex(/^[\d\s+\-()]+$/, { message: 'Invalid phone format' }),
  service: z.enum(['residencial', 'comercial', 'profunda', 'otro'], {
    message: 'Invalid service selection',
  }),
  message: z
    .string()
    .trim()
    .max(2000, { message: 'Message is too long' })
    .optional()
    .or(z.literal('')),
  // Honeypot field. Real users never see this input (it's hidden
  // visually + with autocomplete=off + tabIndex=-1). Bots that
  // auto-fill every input will trip it. Must be empty.
  honeypot: z.string().max(0, { message: 'Spam detected' }).optional().or(z.literal('')),
  // Cloudflare Turnstile token. Verified server-side against the
  // siteverify endpoint.
  turnstileToken: z.string().min(1, { message: 'Captcha required' }),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** What actually gets inserted into Supabase (no honeypot, no token). */
export type ContactInsert = Pick<
  ContactInput,
  'name' | 'email' | 'phone' | 'service' | 'message'
>;
