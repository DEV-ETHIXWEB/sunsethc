import { useState } from 'react';
import type { FAQItem } from '../../data/faqs';

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.question} className="overflow-hidden rounded-lg border border-ink-100 bg-white">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-display text-base font-bold text-ink-900">{item.question}</span>
              <svg
                viewBox="0 0 20 20"
                className={`h-5 w-5 shrink-0 text-brand-600 transition-transform ${open ? 'rotate-45' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M10 4v12M4 10h12" strokeLinecap="round" />
              </svg>
            </button>
            {open && (
              <div className="px-5 pb-4 text-sm leading-relaxed text-ink-600">{item.answer}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
