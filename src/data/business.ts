// Single source of truth for Sunset Heating & Cooling business/brand data.
// Sourced from a live crawl of www.sunsethc.com (homepage + XML sitemaps) on
// 2026-09-01. Where a figure isn’t confirmed anywhere on the public site
// (exact review counts, precise founding date beyond "since 1922"/"100+
// years", full membership tier pricing beyond the $16.50/mo entry point),
// it’s marked TODO: VERIFY rather than invented, do not add numbers that
// aren’t backed by a real source.

import type { IconName } from '../components/ui/Icon.astro';

export const business = {
  name: 'Sunset Heating & Cooling',
  legalName: 'Sunset Heating & Cooling',
  tagline: 'Trusted Heating, Cooling, Electrical & Plumbing in Portland & Dallas, OR',
  foundingYear: 1922,

  phone: {
    display: '(503) 500-5866',
    href: 'tel:+15035005866',
  },
  // Secondary published number (Dallas, OR office)
  phoneSecondary: {
    display: '(503) 714-1022',
    href: 'tel:+15037141022',
  },
  email: 'info@sunsethc.com',

  // Two published physical locations.
  locations: {
    portland: {
      label: 'Portland Office',
      street: '607 S Idaho St #100',
      city: 'Portland',
      state: 'OR',
      stateFull: 'Oregon',
      zip: '97239',
      country: 'US',
      lat: 45.4923,
      lng: -122.6835,
      directionsUrl:
        'https://www.google.com/maps/dir/?api=1&destination=607+S+Idaho+St+%23100%2C+Portland%2C+OR+97239',
    },
    dallas: {
      label: 'Dallas Office',
      street: '325 Orchard Dr',
      city: 'Dallas',
      state: 'OR',
      stateFull: 'Oregon',
      zip: '97338',
      country: 'US',
      lat: 44.9193,
      lng: -123.3273,
      directionsUrl:
        'https://www.google.com/maps/dir/?api=1&destination=325+Orchard+Dr%2C+Dallas%2C+OR+97338',
    },
  },
  // Primary/default address used site-wide (header, footer, schema `address`).
  get address() {
    return this.locations.portland;
  },

  license: {
    label: 'Oregon CCB License',
    number: '240516',
    issuer: 'Oregon Construction Contractors Board',
    issuerUrl: 'https://www.oregon.gov/ccb/',
  },

  hours: {
    emergency: '24/7 Emergency Service',
    note: 'TODO: VERIFY standard office hours beyond 24/7 emergency dispatch.',
  },

  trustBadges: [
    { label: 'BBB A+ Rating', icon: 'a-plus-rated' },
    { label: 'NATE Certified Technicians', icon: 'warranty' },
    { label: 'Licensed, Bonded & Insured', icon: 'insured' },
    { label: '24/7 Emergency Service', icon: '24-by-7' },
    { label: 'Flat-Rate Pricing', icon: 'flat-rate-pricing' },
    { label: 'Serving Portland & Dallas for 100+ Years', icon: '100-plus-years' },
  ] as { label: string; icon?: IconName }[],

  guarantee:
    'Sunset backs every heating, cooling, plumbing, and electrical job with a Lifetime Limited Warranty, flat-rate pricing agreed before work starts, and 24/7 emergency availability.',

  partners: [
    { name: 'Daikin Comfort Pro', logo: 'daikin-1.png.webp' },
    { name: 'RUUD Pro', logo: 'ruud-pro-1.png.webp' },
    { name: 'NW Natural', logo: 'nw-natural-1.png.webp' },
    { name: 'NATE Certified', logo: 'nate-1.png.webp' },
  ],

  paymentMethods: ['American Express', 'Mastercard', 'Visa', 'Discover'],

  social: {
    // Confirmed handle from the live site crawl. Others were listed as
    // "present" on the live footer but exact handles weren’t captured, // TODO: VERIFY exact URLs before launch.
    instagram: 'https://www.instagram.com/sunset_heating_cooling',
    facebook: 'https://www.facebook.com/sunsetheatingcooling', // TODO: VERIFY
    x: 'https://twitter.com/sunsethc', // TODO: VERIFY
    youtube: 'https://www.youtube.com/@sunsetheatingcooling', // TODO: VERIFY
  },

  bbb: {
    // TODO: VERIFY, confirm exact BBB profile URL before launch.
    profileUrl: 'https://www.bbb.org/us/or/portland/profile/heating-and-air-conditioning/sunset-heating-cooling',
  },

  financing: {
    partner: 'Financing available',
    // TODO: VERIFY, confirm the financing partner name/link before launch;
    // the live site links to a financing application but the partner brand
    // wasn’t confirmed during the crawl.
    applyUrl: '/financing',
  },

  membership: {
    name: 'Sunset Membership Program',
    startingPrice: '$16.50/month for one unit',
  },

  reviewProfiles: {
    // Ratings intentionally omitted, no single confirmed aggregate figure
    // was captured during the crawl. Link out to live profiles instead of
    // asserting a number.
    google: 'TODO: VERIFY, current Google Business Profile review URL',
    bbb: 'https://www.bbb.org/us/or/portland/profile/heating-and-air-conditioning/sunset-heating-cooling',
  },

  tradesServed: ['Heating', 'Air Conditioning', 'Plumbing', 'Electrical'] as const,
} as const;

export type Business = typeof business;
