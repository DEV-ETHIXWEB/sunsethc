// Legacy (sunsethc.com) → new URL redirect map.
//
// Source of truth: a live crawl of sunsethc.com’s homepage + page-sitemap.xml
// / post-sitemap.xml on 2026-09-01 (see project notes). Most of the legacy
// site’s real URLs are reproduced AT THE SAME PATH on this rebuild
// (/heating/furnace-repair/, /electrical/panel-upgrade/, etc.), so they need
// no redirect at all, only the URLs below actually changed.
//
// Two patterns changed:
// 1. A handful of "generic" legacy pages duplicated a specific one that
//    already exists (e.g. /heating/repair/ duplicated /heating/furnace-repair/)
//    or lived at the site root instead of under their category
//    (e.g. /thermostat/ instead of /heating/thermostat/). Each maps 1:1 to
//    its real replacement below.
// 2. The legacy site published a thin `/city/service/` doorway page per
//    city × service combination (e.g. "/milwaukie/clogged-drains/"). This
//    rebuild consolidates those into one real page per city
//    (/service-areas/[city]) that lists every service offered there,
//    rather than reproducing near-duplicate content per combination, same
//    consolidation strategy used for the Beacon Plumbing rebuild. Every
//    combo URL actually found in the live sitemap still redirects
//    (to the consolidated city page) rather than 404ing.
//
// Format matches Astro’s `redirects` config: { [fromPath]: toPath }.
// Checked at build time for chains/loops/dead targets by
// scripts/validate-redirects.mjs (part of `npm run qa`).

import { services } from './services';
import { serviceAreas } from './locations';

function serviceUrl(slug: string): string {
  const svc = services.find((s) => s.slug === slug);
  if (!svc) throw new Error(`redirects.ts: unknown service slug "${slug}"`);
  return `/${svc.category}/${svc.slug}`;
}

const renamedOrMoved: Record<string, string> = {
  // Generic heating pages that duplicated the furnace-specific ones.
  '/heating/installation': serviceUrl('furnace-installation'),
  '/heating/repair': serviceUrl('furnace-repair'),
  '/heating/maintenance': serviceUrl('furnace-maintenance'),

  // Shared HVAC services that lived at the site root on the legacy site.
  '/heat-pump-repair': serviceUrl('heat-pump-repair'),
  '/heat-pump-installation': serviceUrl('heat-pump-installation'),
  '/heat-pump-maintenance': serviceUrl('heat-pump-maintenance'),
  '/ductless-mini-split': serviceUrl('ductless-mini-split'),
  '/ductless-mini-split/ductless-unit-installation': serviceUrl('ductless-mini-split'),
  '/ductless-mini-split/ductless-unit-repair': serviceUrl('ductless-mini-split'),
  '/ductless-heat-pump-systems': serviceUrl('ductless-heat-pump-systems'),
  '/thermostat': serviceUrl('thermostat'),
  '/hvac-zoning-system': serviceUrl('hvac-zoning-system'),
  '/attic-insulation': serviceUrl('attic-insulation'),
  '/heat-pump-water-heaters': serviceUrl('heat-pump-water-heaters'),
  '/indoor-air-quality': serviceUrl('indoor-air-quality'),
  '/tankless-water-heaters': serviceUrl('tankless-water-heaters'),

  // Root-level AC pages that live under /air-conditioning/ here.
  '/ac-furnace-filter-replacement': serviceUrl('ac-furnace-filter-replacement'),
  '/air-cleaner-filtration': serviceUrl('air-cleaner-filtration'),
  '/air-duct-repair-installation': serviceUrl('air-duct-repair-installation'),

  // Misc renamed core pages.
  '/hvac-service-area': '/service-areas',
  '/career-opportunities': '/careers',
  '/about-us-sunset-heating-cooling': '/about',
  '/contact-us': '/contact',
  '/frequently-asked-questions': '/faq',
  '/coupons-specials': '/offers',
  '/sms-terms': '/terms-and-conditions',
  '/cookie-policy-eu': '/privacy-policy',
};

// Every real /city/service-combo/ doorway URL found in the live sitemap,
// consolidated to that city’s single service-areas page.
const cityComboSlugs: Record<string, string[]> = {
  canby: ['air-conditioning-repair', 'air-conditioning-installation', 'heat-pump-repair', 'furnace-repair'],
  beaverton: ['furnace-repair', 'ac-installation', 'ac-maintenance', 'ac-repair', 'heat-pump-installation', 'heat-pump-maintenance', 'heat-pump-repair', 'water-heaters', 'pipe-lining', 'leak-detection', 'drain-cleaning', 'clogged-drains'],
  clackamas: ['ac-maintenance', 'ac-repair', 'furnace-repair', 'heat-pump-installation', 'heat-pump-maintenance', 'heat-pump-repair'],
  gresham: ['ac-installation', 'ac-repair'],
  'lake-oswego': ['ac-installation', 'ac-maintenance', 'ac-repair', 'water-heaters', 'pipe-lining', 'leak-detection', 'drain-cleaning', 'clogged-drains'],
  salem: ['ac-installation', 'ac-maintenance', 'ac-repair', 'furnace-repair', 'heat-pump-repair'],
  sandy: ['ac-installation', 'ac-maintenance', 'ac-repair', 'furnace-repair', 'heat-pump-installation', 'heat-pump-maintenance', 'heat-pump-repair'],
  tigard: ['ac-repair'],
  milwaukie: ['ac-repair', 'ac-maintenance', 'ac-installation', 'clogged-drains', 'drain-cleaning', 'pipe-lining', 'water-heaters', 'leak-detection'],
  vancouver: ['ac-repair', 'ac-maintenance', 'leak-detection', 'drain-cleaning', 'pipe-lining', 'water-heaters', 'clogged-drains', 'ac-installation'],
  portland: ['clogged-drains'],
};

const cityRedirects: Record<string, string> = {};
for (const area of serviceAreas) {
  // The legacy site published every city at the root (e.g. "/portland/").
  cityRedirects[`/${area.slug}`] = `/service-areas/${area.slug}`;
}
for (const [city, slugs] of Object.entries(cityComboSlugs)) {
  for (const slug of slugs) {
    cityRedirects[`/${city}/${slug}`] = `/service-areas/${city}`;
  }
}

export const redirects: Record<string, string> = {
  ...renamedOrMoved,
  ...cityRedirects,
};
