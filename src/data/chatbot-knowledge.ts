// Static knowledge base for the site chatbot (src/components/ui/ChatWidget.astro).
// Deliberately NOT LLM-backed, this is a plain keyword-scored matcher over
// real content already in src/data, so it works with no API key, no
// backend, and never fabricates an answer the way a generative model could.
// Every answer here is built directly from the same source-of-truth data
// files used elsewhere on the site (business.ts, services.ts, locations.ts,
// faqs.ts, offers.ts), nothing is invented for the chatbot specifically.

import { business } from './business';
import { services, serviceCategories } from './services';
import { serviceAreas, regions } from './locations';
import { generalFaqs } from './faqs';
import { offers } from './offers';

export interface KBEntry {
  id: string;
  keywords: string[];
  answer: string;
  link?: { label: string; href: string };
}

const coreEntries: KBEntry[] = [
  {
    id: 'phone',
    keywords: ['phone number', 'phone', 'call you', 'telephone', 'reach you'],
    answer: `You can call Sunset directly at ${business.phone.display}, available for 24/7 emergency service.`,
    link: { label: `Call ${business.phone.display}`, href: business.phone.href },
  },
  {
    id: 'emergency',
    keywords: ['emergency', '24/7', '247', 'urgent', 'after hours', 'middle of the night', 'weekend service', 'no heat', 'no ac', 'power out'],
    answer: `Yes, Sunset offers ${business.hours.emergency} for heating, cooling, plumbing, and electrical issues. Call ${business.phone.display} any time, day or night.`,
    link: { label: 'Call now', href: business.phone.href },
  },
  {
    id: 'service-areas',
    keywords: ['service area', 'areas do you serve', 'which cities', 'what cities', 'do you serve', 'located near', 'near me'],
    answer: `Sunset serves Portland, Dallas, OR, and the surrounding region, ${regions.join(', ')}, and Southwest Washington, covering ${serviceAreas.length}+ cities in total.`,
    link: { label: 'View all service areas', href: '/service-areas' },
  },
  {
    id: 'licensed',
    keywords: ['licensed', 'insured', 'bonded', 'license number', 'ccb'],
    answer: `Yes. Sunset is licensed, bonded, and insured, ${business.license.label} #${business.license.number}.`,
  },
  {
    id: 'financing',
    keywords: ['financing', 'finance', 'payment plan', 'loan', 'afford', 'monthly payments'],
    answer: 'Yes, financing is available for qualifying installations.',
    link: { label: 'Learn about financing', href: '/financing' },
  },
  {
    id: 'membership',
    keywords: ['membership', 'maintenance plan', 'plan', 'tune up plan', 'annual plan'],
    answer: `The ${business.membership.name} starts at ${business.membership.startingPrice} and includes priority scheduling and regular tune-ups.`,
    link: { label: 'View membership plans', href: '/membership-program' },
  },
  {
    id: 'address',
    keywords: ['address', 'located', 'headquarters', 'office location', 'where are you'],
    answer: `Sunset has offices at ${business.locations.portland.street}, ${business.locations.portland.city}, OR and ${business.locations.dallas.street}, ${business.locations.dallas.city}, OR.`,
    link: { label: 'Get directions', href: business.locations.portland.directionsUrl },
  },
  {
    id: 'payment-methods',
    keywords: ['payment methods', 'credit card', 'how can i pay', 'accept cards'],
    answer: `Sunset accepts ${business.paymentMethods.join(', ')}.`,
  },
  {
    id: 'careers',
    keywords: ['careers', 'job openings', 'jobs', 'hiring', 'work for sunset', 'employment'],
    answer: 'Sunset is always interested in hearing from skilled HVAC, plumbing, and electrical professionals.',
    link: { label: 'View careers', href: '/careers' },
  },
  {
    id: 'reviews',
    keywords: ['reviews', 'ratings', 'testimonials', 'is sunset good'],
    answer: 'You can read real customer reviews and our BBB profile on the Reviews page.',
    link: { label: 'Read reviews', href: '/reviews' },
  },
  {
    id: 'booking',
    keywords: ['book service', 'schedule', 'appointment', 'get a quote', 'estimate', 'request service'],
    answer: 'You can request service online with a quick form and our team will follow up to schedule.',
    link: { label: 'Request Service', href: '/contact' },
  },
  {
    id: 'services-overview',
    keywords: ['what services', 'what do you offer', 'what do you do', 'services list'],
    answer: `Sunset offers ${serviceCategories.map((c) => c.name).join(', ')} services for homes and businesses.`,
    link: { label: 'Browse all services', href: '/' },
  },
  {
    id: 'offers',
    keywords: ['offers', 'deals', 'coupon', 'discount code', 'specials'],
    answer: offers.filter((o) => o.featured).map((o) => o.detail).join(' '),
    link: { label: 'View current offers', href: '/offers' },
  },
  {
    id: 'guarantee',
    keywords: ['guarantee', 'warranty', 'lifetime warranty', 'upfront pricing', 'flat rate'],
    answer: business.guarantee,
  },
  {
    id: 'nate',
    keywords: ['nate certified', 'certified technician', 'training'],
    answer: 'Yes, Sunset employs NATE-certified technicians, the industry standard for HVAC technical competency.',
  },
];

const faqEntries: KBEntry[] = generalFaqs.map((f, i) => ({
  id: `faq-${i}`,
  keywords: [f.question.toLowerCase().replace(/[?.,]/g, '')],
  answer: f.answer,
}));

// One entry per real service category, generated from services.ts so it
// stays in sync automatically rather than being hand-duplicated.
const categoryEntries: KBEntry[] = serviceCategories.map((c) => ({
  id: `category-${c.slug}`,
  keywords: [c.name.toLowerCase()],
  answer: c.description,
  link: { label: `${c.name} services`, href: `/${c.slug}` },
}));

// One entry per individual service (~60 total), covers specific questions
// like "do you fix water heaters" without hand-writing each answer.
const serviceEntries: KBEntry[] = services.map((s) => ({
  id: `service-${s.slug}`,
  keywords: [s.name.toLowerCase()],
  answer: s.shortDescription,
  link: { label: s.name, href: `/${s.category}/${s.slug}` },
}));

// One entry per real service-area city, "do you serve Beaverton?"
const locationEntries: KBEntry[] = serviceAreas.map((a) => ({
  id: `location-${a.slug}`,
  keywords: [a.name.toLowerCase()],
  answer: `Yes, Sunset provides heating, cooling, plumbing, and electrical service in ${a.name}, OR.`,
  link: { label: `${a.name} service area`, href: `/service-areas/${a.slug}` },
}));

export const knowledgeBase: KBEntry[] = [
  ...coreEntries,
  ...faqEntries,
  ...categoryEntries,
  ...serviceEntries,
  ...locationEntries,
];

// Common shorthand/synonyms expanded before matching, so real phrasing like
// "AC won’t turn on" or "toilet is clogged" still reaches the right real
// entry above rather than falling through to the fallback. This only maps
// TOWARD real content already in the knowledge base, it never introduces
// a new claim.
const SYNONYMS: Record<string, string> = {
  ac: 'air conditioning',
  'a/c': 'air conditioning',
  hvac: 'heating air conditioning',
  furnace: 'heating',
  heater: 'water heaters heating',
  toilet: 'plumbing toilets',
  clogged: 'drain cleaning',
  clog: 'drain cleaning',
  leak: 'leak detection',
  leaking: 'leak detection',
  sewage: 'sewer',
  ev: 'ev charger',
  electric: 'electrical',
  cost: 'pricing estimate',
  price: 'pricing estimate',
  pricing: 'estimate',
  open: 'hours emergency',
  hours: 'emergency 24/7',
  outage: 'generator electrical',
  breaker: 'circuit breakers',
  outlet: 'switches outlets',
};

function expandQuery(query: string): string {
  let expanded = query;
  for (const [shorthand, expansion] of Object.entries(SYNONYMS)) {
    if (new RegExp(`\\b${shorthand.replace('/', '\\/')}\\b`).test(query)) {
      expanded += ' ' + expansion;
    }
  }
  return expanded;
}

const GREETINGS = ['hi', 'hello', 'hey', 'yo', "what’s up", 'good morning', 'good afternoon', 'good evening'];

export interface MatchResult {
  answer: string;
  link?: { label: string; href: string };
}

const FALLBACK: MatchResult = {
  answer: `I’m not sure about that one. For anything I can’t answer, call Sunset directly at ${business.phone.display} or send a request and our team will help.`,
  link: { label: 'Contact us', href: '/contact' },
};

export function findAnswer(rawQuery: string): MatchResult {
  const query = rawQuery.toLowerCase().trim();
  if (!query) return FALLBACK;

  if (GREETINGS.some((g) => query === g || query.startsWith(g + ' ') || query.startsWith(g + '!'))) {
    return {
      answer: `Hi! I’m the Sunset assistant. Ask me about our heating, cooling, plumbing, or electrical services, service areas, financing, or how to reach us, or use the menu buttons below.`,
    };
  }

  const searchText = expandQuery(query);
  let best: KBEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (searchText.includes(keyword)) {
        score += keyword.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (best && bestScore >= 4) {
    return { answer: best.answer, link: best.link };
  }

  return FALLBACK;
}

// --- MCQ menu tree, browsable by tapping instead of typing -----------------

export interface MenuLeaf {
  label: string;
  answer: string;
  link?: { label: string; href: string };
}

export interface MenuBranch {
  label: string;
  options: MenuOption[];
}

export type MenuOption = MenuLeaf | MenuBranch;

export function isMenuBranch(option: MenuOption): option is MenuBranch {
  return 'options' in option;
}

export const chatMenu: MenuBranch = {
  label: 'Main Menu',
  options: [
    {
      label: 'Our Services',
      options: serviceCategories.map((c) => ({
        label: c.name,
        answer: c.description,
        link: { label: `${c.name} services`, href: `/${c.slug}` },
      })),
    },
    {
      label: 'Service Areas',
      answer: `Sunset serves ${regions.join(', ')}, and Southwest Washington, ${serviceAreas.length}+ cities total.`,
      link: { label: 'View all service areas', href: '/service-areas' },
    },
    {
      label: 'Emergency Service',
      answer: `Yes, ${business.hours.emergency}. Call ${business.phone.display} any time.`,
      link: { label: 'Call now', href: business.phone.href },
    },
    {
      label: 'Financing',
      answer: 'Financing is available for qualifying installations.',
      link: { label: 'Learn about financing', href: '/financing' },
    },
    {
      label: 'Membership Program',
      answer: `Starts at ${business.membership.startingPrice}, with priority scheduling and regular tune-ups.`,
      link: { label: 'View membership plans', href: '/membership-program' },
    },
    {
      label: 'Our Guarantee',
      answer: business.guarantee,
    },
    {
      label: 'Common Questions',
      options: generalFaqs.map((f) => ({ label: f.question, answer: f.answer })),
    },
    {
      label: 'Book a Service',
      answer: 'Request service online with a quick form and our team will follow up to schedule.',
      link: { label: 'Request Service', href: '/contact' },
    },
    {
      label: 'Contact Info',
      answer: `Call ${business.phone.display}, or visit us at ${business.locations.portland.street}, ${business.locations.portland.city}, OR.`,
      link: { label: 'Get directions', href: business.locations.portland.directionsUrl },
    },
  ],
};
