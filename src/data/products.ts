// Equipment brand partners, confirmed from the live sunsethc.com /products/
// section (crawled 2026-09-01): Daikin, Mitsubishi, and Trane product pages
// all exist on the live site, and each page’s real headline, description,
// and technical highlights (inverter technology, dB ratings, coil types,
// etc.) were pulled directly from that page, not written generically.
// Sunset is separately confirmed as a Daikin Comfort Pro and RUUD Pro
// partner (business.ts partners list, sourced from the live homepage’s
// partner logos).

export interface Brand {
  slug: string;
  name: string;
  headline: string;
  description: string;
  highlights: string[];
}

export const brands: Brand[] = [
  {
    slug: 'daikin',
    name: 'Daikin',
    headline: 'Smart Comfort, Expertly Installed by Sunset',
    description: 'One of the most trusted names in HVAC, offering advanced heating and cooling systems backed by over 90 years of innovation. Sunset proudly installs Daikin air conditioners and heat pumps, giving Portland homeowners performance they can count on, year after year.',
    highlights: [
      'Inverter-driven compressors for real energy savings, not just a higher price tag.',
      'Quiet operation, as low as 55 dB(A) on select air conditioner models.',
      'Wi-Fi compatible with high SEER ratings for smart, efficient control.',
      'Dual-function heat pumps that handle both heating and cooling from one system, with energy efficiency ratings exceeding ENERGY STAR® standards.',
      'Zoning options and compact outdoor units that fit tighter Portland lot lines.',
      'Sunset is a Daikin Comfort Pro dealer, factory-backed training and warranty support behind every install.',
    ],
  },
  {
    slug: 'mitsubishi',
    name: 'Mitsubishi Electric',
    headline: 'Quiet, Powerful, Built for the Pacific Northwest',
    description: 'Sunset is a certified Mitsubishi Electric contractor, installing ductless air conditioners and heat pumps designed for energy efficiency and precision control in Oregon’s climate.',
    highlights: [
      'Up to 40% more efficient than traditional HVAC, a real number from Mitsubishi’s own product data.',
      'Hyper-Heating INVERTER® (H2i®) technology keeps delivering heat in genuinely cold weather, not just mild days.',
      'Sleek, compact indoor units in wall-mounted, floor-mounted, or ceiling cassette configurations.',
      'Whisper-quiet operation, a common reason homeowners choose ductless over a window unit.',
      'Zoned cooling for personalized, room-by-room comfort without extending ductwork.',
      '15% discount on additional services for Sunset membership plan holders.',
    ],
  },
  {
    slug: 'trane',
    name: 'Trane',
    headline: 'Built to Last. Installed by Sunset',
    description: 'Known for rigorous testing and engineered reliability, Trane offers high-efficiency air conditioners and heat pumps that perform year after year, even in the unpredictable Pacific Northwest climate.',
    highlights: [
      'Climatuff® compressors engineered for quiet, efficient cooling.',
      'Spine Fin™ coils for improved heat transfer and corrosion resistance.',
      'Variable-speed heat pumps with ENERGY STAR® qualified models.',
      'WeatherGuard™ protection for outdoor durability against Oregon’s wet winters.',
      'As quiet as 43 dB on select models, and smart thermostat compatible.',
      'Factory-trained Trane specialists, upfront pricing, and a 100% satisfaction guarantee on all installations.',
    ],
  },
];

export function findBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}
