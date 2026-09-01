import { useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const services = ['Heating', 'Cooling', 'Plumbing', 'Electrical', 'Other'];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [service, setService] = useState('');
  const [otherService, setOtherService] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot: real visitors never see or fill this field. If it's
    // filled, a bot did it, quietly report success without sending mail.
    if (formData.get('website')) {
      setStatus('success');
      form.reset();
      return;
    }

    const finalService = service === 'Other' ? (otherService.trim() || 'Other') : service;
    const data = {
      ...Object.fromEntries(formData.entries()),
      service: finalService,
    };
    delete (data as Record<string, unknown>).website;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || 'Something went wrong. Please call us instead.');
      setStatus('success');
      form.reset();
      setService('');
      setOtherService('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please call us instead.');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <svg viewBox="0 0 24 24" className="h-10 w-10 text-emerald-600" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm5.3 7.3l-6.5 6.5a1 1 0 0 1-1.4 0l-3-3a1 1 0 1 1 1.4-1.4l2.3 2.3 5.8-5.8a1 1 0 0 1 1.4 1.4z" />
        </svg>
        <h3 className="font-display text-lg font-bold text-ink-900">Request received!</h3>
        <p className="text-sm text-ink-600">Our team will follow up shortly to schedule your service.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Honeypot field: hidden from sighted users and skipped by screen
          readers, left visible only to form-filling bots. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-semibold text-ink-700">Full name</label>
          <input id="name" name="name" type="text" required maxLength={200} className="rounded-md border border-ink-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-sm font-semibold text-ink-700">Phone</label>
          <input id="phone" name="phone" type="tel" required maxLength={40} className="rounded-md border border-ink-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-semibold text-ink-700">Email</label>
        <input id="email" name="email" type="email" required maxLength={200} className="rounded-md border border-ink-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="address" className="text-sm font-semibold text-ink-700">Service address</label>
        <input id="address" name="address" type="text" maxLength={300} className="rounded-md border border-ink-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-ink-700">What do you need help with?</span>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Service needed">
          {services.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={service === s}
              onClick={() => setService(s === service ? '' : s)}
              className={
                'rounded-full border px-4 py-2 text-sm font-semibold transition-colors ' +
                (service === s
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : 'border-ink-200 bg-white text-ink-700 hover:border-brand-300 hover:bg-brand-50')
              }
            >
              {s}
            </button>
          ))}
        </div>
        {service === 'Other' && (
          <input
            type="text"
            value={otherService}
            onChange={(e) => setOtherService(e.target.value)}
            placeholder="Tell us what you need"
            maxLength={100}
            className="rounded-md border border-ink-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-semibold text-ink-700">How can we help?</label>
        <textarea id="message" name="message" rows={4} required maxLength={5000} className="rounded-md border border-ink-200 px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" />
      </div>

      {status === 'error' && (
        <p className="rounded-md bg-accent-50 px-3.5 py-2.5 text-sm font-medium text-accent-700">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-2 inline-flex items-center justify-center rounded-md bg-brand-600 px-6 py-3 font-display font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Request Service'}
      </button>
    </form>
  );
}
