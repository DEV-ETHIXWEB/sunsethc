// Small MCQ-button icons for the service-selector buttons. The real brand
// icon set (src/assets/icons/) is drawn with a lot of fine detail meant for
// 48px+ display, at the 14-16px this renders at that detail just collapses
// into an illegible blob, so these are simpler, bolder glyphs instead.

import type { ReactElement } from 'react';

const icons: Record<string, ReactElement> = {
  Heating: (
    <path d="M12 2c-.3 2-2 3.2-2 5.5A2 2 0 0 0 12 9.5a2 2 0 0 0 2-2c0-.8-.3-1.3-.6-1.8.9.6 1.6 1.7 1.6 3.3a3 3 0 0 1-6 0c0-1 .3-1.8.8-2.6C10.5 5 12 3.7 12 2Zm0 9c-3.3 0-6 2.7-6 6a6 6 0 0 0 12 0c0-1.6-.6-3-1.6-4.1.1.4.1.8.1 1.1a4.5 4.5 0 0 1-9 0c0-1.2.5-2.3 1.3-3.1.7.1 1.4.1 2.1.1.4 0 .8 0 1.1-.1Z" />
  ),
  Cooling: (
    <path d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11M6 4l1 3-3-1M18 4l-1 3 3-1M6 20l1-3-3 1M18 20l-1-3 3 1M2 9l3 1-1 3M22 9l-3 1 1 3M2 15l3-1-1-3M22 15l-3-1 1-3" strokeLinecap="round" strokeLinejoin="round" />
  ),
  Plumbing: (
    <path d="M12 2c3 4 6 7.7 6 11.5A6 6 0 0 1 6 13.5C6 9.7 9 6 12 2Zm0 15.5a2.5 2.5 0 0 0 2.5-2.5c0-.6-.2-1-.5-1.5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  Electrical: (
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" strokeLinejoin="round" />
  ),
  Other: (
    <>
      <circle cx="6" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="18" cy="12" r="1.6" />
    </>
  ),
};

const filled = new Set(['Electrical', 'Other']);

export function ServiceIcon({ name, className = 'h-4 w-4' }: { name: string; className?: string }) {
  const icon = icons[name];
  if (!icon) return null;
  const isFilled = filled.has(name);
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={isFilled ? 'currentColor' : 'none'}
      stroke={isFilled ? 'none' : 'currentColor'}
      strokeWidth={1.8}
      aria-hidden="true"
    >
      {icon}
    </svg>
  );
}
