import { useState } from 'react';
import { ServiceIcon } from './ServiceIcon';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const services = ['Heating', 'Cooling', 'Plumbing', 'Electrical', 'Other'];

export default function HeroLeadForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [otherService, setOtherService] = useState('');

  function toggleService(s: string) {
    setSelectedServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  }

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

    const finalService = selectedServices
      .map((s) => (s === 'Other' ? otherService.trim() || 'Other' : s))
      .join(', ');
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      service: finalService,
      message: `Quick quote request from the homepage.${finalService ? ` Service needed: ${finalService}.` : ''}`,
      source: 'hero',
    };

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
      setSelectedServices([]);
      setOtherService('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please call us instead.');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-xl">
        <svg viewBox="0 0 24 24" className="h-10 w-10 text-emerald-400" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm5.3 7.3l-6.5 6.5a1 1 0 0 1-1.4 0l-3-3a1 1 0 1 1 1.4-1.4l2.3 2.3 5.8-5.8a1 1 0 0 1 1.4 1.4z" />
        </svg>
        <h3 className="font-display text-lg font-bold text-white">Got it, thanks!</h3>
        <p className="text-sm text-white/70">A real person will call you back shortly to schedule your service.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-2xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-7"
    >
      <div>
        <h2 className="font-display text-lg font-bold text-white">Get a Free Quote</h2>
        <p className="text-sm text-white/70">We’ll call you back, usually within minutes.</p>
      </div>

      {/* Honeypot field: hidden from sighted users and skipped by screen
          readers, left visible only to form-filling bots. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="hero-website">Leave this field empty</label>
        <input id="hero-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="hero-name" className="text-xs font-semibold text-white/90">Full name</label>
        <input
          id="hero-name"
          name="name"
          type="text"
          required
          maxLength={200}
          className="rounded-lg border border-white/25 bg-white/90 px-3 py-2.5 text-sm text-ink-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-white/30"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="hero-phone" className="text-xs font-semibold text-white/90">Phone</label>
        <input
          id="hero-phone"
          name="phone"
          type="tel"
          required
          maxLength={40}
          className="rounded-lg border border-white/25 bg-white/90 px-3 py-2.5 text-sm text-ink-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-white/30"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="hero-email" className="text-xs font-semibold text-white/90">Email</label>
        <input
          id="hero-email"
          name="email"
          type="email"
          required
          maxLength={200}
          className="rounded-lg border border-white/25 bg-white/90 px-3 py-2.5 text-sm text-ink-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-white/30"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-white/90">Service needed <span className="font-normal text-white/50">(select all that apply)</span></span>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Service needed, select all that apply">
          {services.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={selectedServices.includes(s)}
              onClick={() => toggleService(s)}
              className={
                'flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ' +
                (selectedServices.includes(s)
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : 'border-white/25 bg-white/10 text-white hover:border-white/50 hover:bg-white/20')
              }
            >
              <ServiceIcon name={s} className="h-4 w-4 shrink-0" />
              {s}
            </button>
          ))}
        </div>
        {selectedServices.includes('Other') && (
          <input
            type="text"
            value={otherService}
            onChange={(e) => setOtherService(e.target.value)}
            placeholder="Tell us what you need"
            maxLength={100}
            className="mt-1 rounded-lg border border-white/25 bg-white/90 px-3 py-2.5 text-sm text-ink-900 outline-none focus:border-brand-400 focus:ring-2 focus:ring-white/30"
          />
        )}
      </div>

      {status === 'error' && (
        <p className="rounded-md bg-accent-50 px-3 py-2 text-xs font-medium text-accent-700">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-1 inline-flex items-center justify-center rounded-full bg-accent-400 px-5 py-3 font-display font-semibold text-brand-900 shadow-md transition-colors hover:bg-accent-300 disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Get My Free Quote'}
      </button>
      <p className="text-center text-[11px] text-white/60">No spam, no obligation, just a callback.</p>
    </form>
  );
}
