// Sends the contact/request-service form to SMTP2GO’s transactional email
// API. This is the one route in the site that isn’t statically prerendered
// (see astro.config.mjs, output stays static everywhere else) since it
// needs to make a server-side API call with a secret key.
//
// Shared by both the full Contact page form and the compact hero lead form
// (a `source` field distinguishes which one a lead came from in the email).
//
// TODO: VERIFY / SETUP REQUIRED before this goes live, set SMTP2GO_API_KEY
// (and optionally CONTACT_TO_EMAIL) in your environment / Vercel project
// settings. Get an API key at https://app-us.smtp2go.com/settings/apikeys/.
import type { APIRoute } from 'astro';
import { business } from '../../data/business';

export const prerender = false;

interface ContactPayload {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  message?: string;
  service?: string;
  source?: string;
  // Honeypot field, real visitors never see or fill this (see ContactForm/
  // HeroLeadForm, it's visually hidden and skipped by screen readers via
  // aria-hidden + tabIndex={-1}). A filled honeypot means a bot filled
  // every field it could find, so we quietly accept without sending mail.
  website?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTHS: Record<string, number> = {
  name: 200,
  phone: 40,
  email: 200,
  address: 300,
  message: 5000,
  service: 100,
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Strips control characters (including CR/LF) so no field can smuggle
// extra lines into the single-line email subject.
function singleLine(value: string): string {
  return value.replace(/[\r\n\t]+/g, ' ').replace(/ {2,}/g, ' ').trim();
}

export const POST: APIRoute = async ({ request }) => {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body.' }), { status: 400 });
  }

  // Honeypot tripped, pretend success so the bot moves on, but do nothing.
  if (payload.website) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  const { name, phone, email, address, message, service } = payload;
  const source = payload.source === 'hero' ? 'Hero quick-quote form' : 'Contact page';

  if (!name || !phone || !email || !message) {
    return new Response(JSON.stringify({ error: 'Please fill in all required fields.' }), { status: 400 });
  }

  for (const [field, value] of Object.entries({ name, phone, email, address, message, service })) {
    const limit = MAX_LENGTHS[field];
    if (typeof value === 'string' && limit && value.length > limit) {
      return new Response(JSON.stringify({ error: 'One of the fields is too long.' }), { status: 400 });
    }
  }

  if (!EMAIL_RE.test(email)) {
    return new Response(JSON.stringify({ error: 'Please enter a valid email address.' }), { status: 400 });
  }

  const apiKey = import.meta.env.SMTP2GO_API_KEY;
  if (!apiKey) {
    console.error('SMTP2GO_API_KEY is not set, contact form cannot send email.');
    return new Response(
      JSON.stringify({ error: 'Online requests are temporarily unavailable, please call us instead.' }),
      { status: 503 }
    );
  }

  const toEmail = import.meta.env.CONTACT_TO_EMAIL || business.email;
  const cleanName = singleLine(name);

  const html = `
    <h2>New service request from sunsethc.com</h2>
    <p><strong>Source:</strong> ${escapeHtml(source)}</p>
    <p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(singleLine(phone))}</p>
    <p><strong>Email:</strong> ${escapeHtml(singleLine(email))}</p>
    ${service ? `<p><strong>Service needed:</strong> ${escapeHtml(singleLine(service))}</p>` : ''}
    ${address ? `<p><strong>Service address:</strong> ${escapeHtml(singleLine(address))}</p>` : ''}
    <p><strong>Message:</strong><br />${escapeHtml(message).replace(/\n/g, '<br />')}</p>
  `;

  try {
    const res = await fetch('https://api.smtp2go.com/v3/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        to: [toEmail],
        sender: toEmail,
        'reply_to': email,
        subject: `New service request from ${cleanName} (${source})`,
        html_body: html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error('SMTP2GO send failed:', res.status, body);
      return new Response(JSON.stringify({ error: 'Could not send your request, please call us instead.' }), { status: 502 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error('SMTP2GO request error:', err);
    return new Response(JSON.stringify({ error: 'Could not send your request, please call us instead.' }), { status: 502 });
  }
};
