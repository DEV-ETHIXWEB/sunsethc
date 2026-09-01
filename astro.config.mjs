// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

import { redirects } from './src/data/redirects.ts';

// Pages intentionally marked noindex (see their SEOHead `noindex` prop)
// must not also appear in the sitemap, that sends a mixed signal to search
// engines. Kept as an explicit path list here since it's small and every
// entry maps 1:1 to a real `noindex` usage elsewhere in src/pages.
const NOINDEX_PATHS = ['/privacy-policy/', '/terms-and-conditions/'];

// https://astro.build/config
export default defineConfig({
  // TODO: VERIFY, confirm the production domain before launch (assumed same
  // as the current live site since this is a rebuild of it).
  site: 'https://www.sunsethc.com',
  vite: {
    plugins: [tailwindcss()],
  },

  // Whole site is static/prerendered by default. Only src/pages/api/contact.ts
  // opts out (export const prerender = false) to run as a Vercel function,
  // since it needs to call the SMTP2GO API server-side.
  adapter: vercel(),

  integrations: [
    react(),
    sitemap({
      filter: (page) => !NOINDEX_PATHS.some((p) => page.endsWith(p)),
    }),
  ],
  redirects,
});
