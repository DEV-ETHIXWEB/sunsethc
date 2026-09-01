// Sends the contact/request-service form to SMTP2GO’s transactional email
// API. This is the one route in the site that isn’t statically prerendered
// (see astro.config.mjs, output stays static everywhere else) since it
// needs to make a server-side API call with a secret key.
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
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const POST: APIRoute = async ({ request }) => {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body.' }), { status: 400 });
  }

  const { name, phone, email, address, message } = payload;
  if (!name || !phone || !email || !message) {
    return new Response(JSON.stringify({ error: 'Please fill in all required fields.' }), { status: 400 });
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

  const html = `
    <h2>New service request from sunsethc.com</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${address ? `<p><strong>Service address:</strong> ${escapeHtml(address)}</p>` : ''}
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
        subject: `New service request from ${name}`,
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
