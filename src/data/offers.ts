// Current coupons/specials, the three with confirmed dollar amounts were
// found on the live sunsethc.com homepage during the crawl (2026-09-01).
// Other categories a home-services company this size commonly runs are
// listed with a "call to confirm" detail rather than an invented amount, // same discipline as the rest of this data layer.

export interface Offer {
  slug: string;
  title: string;
  detail: string;
  featured?: boolean;
}

export const offers: Offer[] = [
  { slug: 'repair-service', title: '$50 Off Any Repair', detail: '$50 off any heating, cooling, plumbing, or electrical repair service.', featured: true },
  { slug: 'tune-up', title: '$198 Precision Tune-Up', detail: 'A full precision tune-up for your heating or cooling system for $198.', featured: true },
  { slug: 'air-filter', title: '$150 Off Air Filtration', detail: '$150 off a whole-home air filter or air purification system.', featured: true },
  { slug: 'water-heaters', title: 'Water Heaters', detail: 'Ask about current water heater installation specials.' },
  { slug: 'drain-cleaning', title: 'Drain Cleaning', detail: 'Ask about current drain cleaning specials.' },
  { slug: 'ac-installation', title: 'AC Installation', detail: 'Ask about current AC installation specials.' },
  { slug: 'furnace-installation', title: 'Furnace Installation', detail: 'Ask about current furnace installation specials.' },
  { slug: 'panel-upgrade', title: 'Panel Upgrades', detail: 'Ask about current electrical panel upgrade specials.' },
  { slug: 'ev-charger', title: 'EV Charger Installation', detail: 'Ask about current EV charger installation specials.' },
  { slug: 'membership', title: 'Membership Program', detail: 'Join the Sunset Membership Program starting at $16.50/month for one unit.' },
];
