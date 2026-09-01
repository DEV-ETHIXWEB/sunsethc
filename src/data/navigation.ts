// Primary site navigation. Top-level items mirror sunsethc.com’s real
// primary nav structure (Heating / Air Conditioning / Plumbing / Electrical
// as separate top-level items, each with a services dropdown) rather than
// nesting everything under one generic "Services" item.

import { serviceCategories, servicesByCategory } from './services';

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

// navLabel is a shorter display label for the cramped header bar only, the
// page itself, breadcrumbs, and SEO titles still use the full category name.
function categoryNav(categorySlug: string, navLabel?: string): NavLink {
  const cat = serviceCategories.find((c) => c.slug === categorySlug);
  if (!cat) throw new Error(`navigation.ts: unknown category "${categorySlug}"`);
  return {
    label: navLabel ?? cat.name,
    href: `/${cat.slug}`,
    children: servicesByCategory(categorySlug).map((s) => ({
      label: s.name,
      href: `/${s.category}/${s.slug}`,
    })),
  };
}

// Kept to the essentials that fit one header row at common laptop widths
// (~1440px) without wrapping or overflowing, logo already links home, and
// About/Coupons/Financing stay one click away via the footer and homepage
// rather than crowding the primary bar.
export const mainNav: NavLink[] = [
  categoryNav('heating'),
  categoryNav('air-conditioning', 'Cooling'),
  categoryNav('plumbing'),
  categoryNav('electrical'),
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Contact', href: '/contact' },
];

export const footerNav = {
  services: [
    { label: 'Furnace Repair', href: '/heating/furnace-repair' },
    { label: 'AC Repair', href: '/air-conditioning/ac-repair' },
    { label: 'Water Heaters', href: '/plumbing/water-heaters' },
    { label: 'Drain Cleaning', href: '/plumbing/drain-cleaning' },
    { label: 'Panel Upgrades', href: '/electrical/panel-upgrade' },
    { label: 'EV Charger Installation', href: '/electrical/ev-charger-installation' },
  ],
  company: [
    { label: 'About Sunset', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Service Areas', href: '/service-areas' },
    { label: 'Financing', href: '/financing' },
    { label: 'Membership Program', href: '/membership-program' },
    { label: 'Coupons & Specials', href: '/offers' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Equipment Brands', href: '/products' },
    { label: 'Videos', href: '/videos' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms-and-conditions' },
    { label: 'Accessibility', href: '/accessibility' },
  ],
};
