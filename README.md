# Sunset Heating & Cooling, Website Rebuild

A modern, SEO-first, deploy-ready rebuild of the Sunset Heating & Cooling (Portland & Dallas, OR) marketing site, built with Astro, TypeScript, Tailwind CSS v4, and React islands.

## Stack

- **Astro** (static-first, one on-demand API route), pages, layouts, content
- **TypeScript**, strict mode
- **Tailwind CSS v4**, CSS-first theme in `src/styles/global.css`
- **React**, used only for genuinely interactive islands (mobile nav drawer, FAQ accordion, contact form)
- **@astrojs/vercel**, deploy adapter

## Project structure

```text
src/
├── data/          # Centralized business/content data, single source of truth
│   ├── business.ts        # NAP, license, trust badges (see file for TODO: VERIFY notes)
│   ├── services.ts        # Service taxonomy (4 categories, ~60 services)
│   ├── locations.ts       # 50+ real service-area cities, grouped by region
│   ├── navigation.ts      # Header/footer nav (derived from services.ts)
│   ├── redirects.ts       # Legacy sunsethc.com URL → new URL redirect map
│   ├── chatbot-knowledge.ts  # No-LLM keyword-matched knowledge base for the chat widget
│   ├── testimonials.ts, faqs.ts, offers.ts, products.ts, site.ts
├── components/
│   ├── layout/     # Header, Footer, MobileNav, MobileActionBar
│   ├── sections/   # Homepage/page sections (Hero, CoreServices, PageHero, etc.)
│   ├── ui/         # Button, Container, SectionHeading, Icon, Logo, AccessibilityWidget, ChatWidget
│   └── forms/      # ContactForm (React island)
├── pages/
│   ├── index.astro
│   ├── [category]/index.astro          # Category hub (heating, air-conditioning, plumbing, electrical)
│   ├── [category]/[service].astro      # Dynamic service pages (~60)
│   ├── service-areas/[location].astro  # Dynamic location pages (~50)
│   ├── api/contact.ts                  # On-demand route, SMTP2GO email send
│   └── ...core pages (about, contact, reviews, offers, financing, etc.)
├── lib/seo.ts      # JSON-LD schema builders (LocalBusiness, Service, FAQPage, BreadcrumbList)
scripts/
├── validate-redirects.mjs   # Checks redirect map for chains/loops/dead targets
├── seo-audit.mjs            # Checks every built page for SEO issues
├── check-links.mjs          # Crawls all internal links, flags broken ones
└── snapshot-redirects.mjs   # Emits redirects.ts as JSON for the above scripts to read
```

## Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run check` | TypeScript/Astro diagnostics |
| `npm run qa` | Full QA chain: build → check → redirects → SEO audit → link check |

## Data-driven architecture

Business information, services, and locations are defined once in `src/data/` and consumed everywhere (header, footer, chatbot, schema, pages), never hardcoded in components.

## Content approach

Real business facts (NAP, license, service list, service areas, trust badges, real FAQ answers, coupons) were captured from a live crawl of sunsethc.com on 2026-09-01, see comments in each `src/data/*.ts` file for sourcing notes. Anything not independently verifiable during that crawl (exact review counts, specific financing terms, exact social handles) is marked `TODO: VERIFY` rather than invented, search the codebase for that string before launch.

`src/data/testimonials.ts` ships **empty** on purpose: the live site's reviews widget didn't return extractable text. Paste real reviews into that file before launch, `Reviews.astro` renders them automatically once present.

## The "20%": chatbot, accessibility, animation, SEO

- **Chat widget** (bottom-right): answers come from `src/data/chatbot-knowledge.ts`, a plain keyword-scored matcher over the site's own real data. No LLM, no API key, no network call.
- **Accessibility widget** (bottom-left): bigger text, high contrast, grayscale, underlined links, readable font, paused animations, large cursor, persisted in `localStorage`, aimed at older/lower-vision visitors.
- **Animation**: scroll-reveal, spotlight hover cards, animated stat counters, all respect `prefers-reduced-motion` and the accessibility widget's "pause animations" toggle.
- **SEO**: per-page canonical/OG/Twitter meta, JSON-LD (LocalBusiness ×2 offices, Service, FAQPage, BreadcrumbList), `@astrojs/sitemap`, and a redirect map from the legacy site's URLs (including consolidating ~150 thin `/city/service/` doorway pages into real per-city and per-service pages).

## Before launch (setup required)

1. Set `SMTP2GO_API_KEY` (get one at https://app-us.smtp2go.com/settings/apikeys/) in your local `.env` and in Vercel's project environment variables, the contact form's `/api/contact` route needs it to send email. See `.env.example`.
2. Search the codebase for `TODO: VERIFY` and `TODO: ASSET REQUIRED` and resolve each with real client-supplied information.
3. Add real reviews to `src/data/testimonials.ts`.
4. Have `src/pages/privacy-policy.astro` and `src/pages/terms-and-conditions.astro` reviewed by counsel, they currently ship as clearly-marked placeholder boilerplate.

## Deploying to Vercel

```bash
npm install -g vercel   # if not already installed
vercel link             # link this directory to a Vercel project
vercel env add SMTP2GO_API_KEY production
vercel --prod
```

Or import the GitHub repo directly in the Vercel dashboard, `@astrojs/vercel` is already configured as the adapter, so no extra build settings are needed beyond the `SMTP2GO_API_KEY` environment variable.
