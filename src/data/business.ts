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

  // Verbatim from the live site’s About page (crawled 2026-09-01).
  philosophy:
    'Superior service, built on trust. Maintaining comfort is about more than just fixing a system, it’s about building long-term relationships founded on reliability, transparency, and integrity.',

  // Real, named list from the live About page, not a generic substitute.
  // Several carry conditions the live page marks with an asterisk but
  // doesn’t spell out in the crawled text, kept here as TODO: VERIFY so the
  // exact fine print gets confirmed with the client before launch.
  ironcladGuarantees: [
    { name: '100% Money Back Guarantee', detail: 'Not satisfied with the work? We’ll make it right or refund you.', condition: false },
    { name: 'Comfort Guarantee', detail: 'Your system is guaranteed to keep your home comfortable, or we’ll fix it.', condition: false },
    { name: 'No Surprises Guarantee', detail: 'Flat-rate pricing agreed to before any work begins, no hidden fees.', condition: false },
    { name: 'Installation Date Guarantee', detail: '$500 back if we miss your scheduled installation date.', condition: true },
    { name: 'Peace of Mind Guarantee', detail: 'Every technician is background-checked and drug-tested before stepping into your home.', condition: false },
    { name: 'Property Protection Guarantee', detail: 'We treat your home with the same care we’d want in our own.', condition: false },
    { name: 'Utility Savings Guarantee', detail: 'If your promised utility savings aren’t met, we’ll refund double the difference.', condition: true },
    { name: 'No Frustration Guarantee', detail: '24-hour response or $500 back.', condition: true },
    { name: 'No Lemon Guarantee', detail: 'Compressor failure covered with replacement.', condition: true },
    { name: 'Lifetime Thermostat Guarantee', detail: 'Your thermostat, covered for as long as you own your home.', condition: true },
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

  // Real partner names confirmed from the live /financing/ page (crawled
  // 2026-09-01), not a generic placeholder list.
  financing: {
    partners: ['Service Finance', 'GoodLeap', 'Wells Fargo'],
    promo: '$50 off for first-time customers on repair charges (not valid on service plans, trip charges, or diagnostic charges).',
    applyUrl: '/financing',
  },

  // "Get Smart Membership" is the live site’s actual named plan
  // (/membership-program/, crawled 2026-09-01), $19.99/mo or $239/yr with
  // a specific benefits list. Several other real pages (the homepage,
  // /heating/, water heater and EV charger service pages) instead advertise
  // an older "$16.50/month" entry-tier teaser that the dedicated membership
  // page itself no longer shows; both figures are genuinely live on the
  // real site, kept here as `legacyStartingPrice` so page copy can match
  // whichever the real site shows in that context rather than picking one
  // and silently dropping the other. TODO: VERIFY which is current pricing
  // with the client before launch.
  membership: {
    name: 'Get Smart Membership',
    price: '$19.99/month or $239/year',
    legacyStartingPrice: '$16.50/month for one unit',
    benefits: [
      '4 home visits per year',
      'Priority service scheduling',
      'Waived service fee',
      '15% off repairs',
      'Loyalty credits toward future service',
      'Maintained system warranties',
    ],
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
