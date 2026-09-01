// Equipment brand partners, confirmed from the live sunsethc.com /products/
// section (crawled 2026-09-01): Daikin, Mitsubishi, and Trane product pages
// all exist on the live site. Sunset is separately confirmed as a Daikin
// Comfort Pro and RUUD Pro partner (business.ts partners list, sourced from
// the live homepage’s partner logos).

export interface Brand {
  slug: string;
  name: string;
  description: string;
  highlights: string[];
}

export const brands: Brand[] = [
  {
    slug: 'daikin',
    name: 'Daikin',
    description: 'Sunset is a Daikin Comfort Pro dealer, installing Daikin furnaces, air conditioners, heat pumps, and ductless mini split systems.',
    highlights: [
      'Daikin Comfort Pro dealer status means factory-backed training and warranty support behind every install.',
      'Broad lineup from standard-efficiency furnaces and AC units to high-efficiency variable-speed heat pumps.',
      'Ductless mini split systems for additions, ADUs, and homes without existing ductwork.',
    ],
  },
  {
    slug: 'mitsubishi',
    name: 'Mitsubishi Electric',
    description: 'Mitsubishi Electric ductless and variable-refrigerant-flow systems for efficient, zoned heating and cooling.',
    highlights: [
      'Industry-leading ductless technology, well suited to room-by-room zoned comfort.',
      'Cold-climate heat pump models designed to keep delivering heat even in freezing temperatures.',
      'Quiet indoor units, a common reason homeowners choose ductless over a noisy window unit.',
    ],
  },
  {
    slug: 'trane',
    name: 'Trane',
    description: 'Trane furnaces, air conditioners, and heat pumps, known for durability and consistent performance.',
    highlights: [
      'A long track record of durable, low-maintenance equipment built for years of reliable service.',
      'Furnace, AC, and heat pump options across a range of efficiency tiers and budgets.',
      'Widely available parts and service support, useful if you ever move outside Sunset’s service area.',
    ],
  },
];

export function findBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}
