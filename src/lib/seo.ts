// Centralized SEO helpers: metadata + JSON-LD structured data builders.
// All business facts are passed in from src/data, nothing here is hardcoded.

// Escapes `<` so a JSON-LD payload can never prematurely close its enclosing
// <script> tag. Defensive hardening only, current schema inputs are static
// data, not user input, but standard practice for JSON-LD in a <script>.
export function safeJsonLdStringify(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildCanonicalUrl(siteUrl: string, path: string): string {
  const normalizedPath = path === '/' ? '' : path.replace(/\/$/, '');
  return `${siteUrl.replace(/\/$/, '')}${normalizedPath}` || siteUrl;
}

export function breadcrumbListSchema(items: BreadcrumbItem[], siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: buildCanonicalUrl(siteUrl, item.url),
    })),
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function faqPageSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export interface LocalBusinessSchemaInput {
  siteUrl: string;
  name: string;
  legalName: string;
  telephone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  geo: { lat: number; lng: number };
  areaServed: string[];
  sameAs: string[];
  logoUrl: string;
  priceRange?: string;
}

// Sunset does heating/cooling, plumbing, AND electrical, so the schema type
// is a multi-type array rather than a single trade, each type is a real,
// applicable schema.org LocalBusiness subtype for this business.
export function localBusinessSchema(input: LocalBusinessSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': ['HVACBusiness', 'Electrician', 'Plumber', 'LocalBusiness'],
    '@id': `${input.siteUrl}/#organization`,
    name: input.name,
    legalName: input.legalName,
    url: input.siteUrl,
    logo: input.logoUrl,
    image: input.logoUrl,
    telephone: input.telephone,
    email: input.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: input.address.street,
      addressLocality: input.address.city,
      addressRegion: input.address.state,
      postalCode: input.address.zip,
      addressCountry: input.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: input.geo.lat,
      longitude: input.geo.lng,
    },
    areaServed: input.areaServed.map((name) => ({ '@type': 'City', name })),
    sameAs: input.sameAs,
    ...(input.priceRange ? { priceRange: input.priceRange } : {}),
    // Intentionally no aggregateRating, no single confirmed figure was
    // found during the source-site crawl. Link out to live review
    // profiles in the UI instead of asserting a number here.
  };
}

export interface ServiceSchemaInput {
  serviceName: string;
  description: string;
  providerName: string;
  providerUrl: string;
  areaServed?: string[];
  url: string;
}

export function serviceSchema(input: ServiceSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: input.serviceName,
    description: input.description,
    provider: {
      '@type': 'LocalBusiness',
      name: input.providerName,
      url: input.providerUrl,
    },
    ...(input.areaServed?.length
      ? { areaServed: input.areaServed.map((name) => ({ '@type': 'City', name })) }
      : {}),
    url: input.url,
  };
}
