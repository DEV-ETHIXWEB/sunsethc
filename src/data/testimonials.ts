// TODO: VERIFY / ASSET REQUIRED, the live sunsethc.com /reviews/ page
// renders its testimonials through a client-side widget (likely a Google
// or Trustindex embed) that did not return actual review text, names, or
// ratings during the crawl (2026-09-01), only the surrounding page chrome
// ("Our Family Serving Yours"). Per the no-fabrication rule, no testimonial
// content is invented here. Paste real reviews (from the live widget,
// Google Business Profile, or BBB) into this array before launch, the
// Reviews.astro section and homepage both render directly from this file.

export interface Testimonial {
  name: string;
  quote: string;
  rating: 5;
}

export const testimonials: Testimonial[] = [];
