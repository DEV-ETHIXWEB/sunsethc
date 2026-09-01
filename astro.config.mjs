// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

import { redirects } from './src/data/redirects.ts';

// https://astro.build/config
export default defineConfig({
  // TODO: VERIFY — confirm the production domain before launch (assumed same
  // as the current live site since this is a rebuild of it).
  site: 'https://www.sunsethc.com',
  vite: {
    plugins: [tailwindcss()],
  },

  // Whole site is static/prerendered by default. Only src/pages/api/contact.ts
  // opts out (export const prerender = false) to run as a Vercel function,
  // since it needs to call the SMTP2GO API server-side.
  adapter: vercel(),

  integrations: [react(), sitemap()],
  redirects,
});
