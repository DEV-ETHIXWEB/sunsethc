// General FAQs, the first 6 are real Q&A content pulled verbatim (quoted
// portions) from sunsethc.com’s live /frequently-asked-questions/ page
// (crawled 2026-09-01). The remaining entries are supported directly by
// verified facts elsewhere in src/data (business.ts, locations.ts,
// financing), same discipline as the rest of this data layer: no
// speculative Q&A.

import { business } from './business';
import { regions } from './locations';

export interface FAQItem {
  question: string;
  answer: string;
}

export const generalFaqs: FAQItem[] = [
  {
    question: 'Furnace vs. heat pump, which one is right for my house?',
    answer:
      'A furnace is at less risk of breaking down than a heat pump, since it has fewer mechanical parts, and furnaces typically need less maintenance and last longer. Heat pumps, however, are more efficient, cost less to install initially, and work especially well in milder climates like the Willamette Valley since they extract heat from outside air. Furnaces remain the more cost-effective choice for the coldest winter stretches.',
  },
  {
    question: 'How often should my heat pump cycle on and off?',
    answer:
      'Normal operation involves cycling on and off based on your home’s temperature. A typical "on" cycle should last about 10 to 15 minutes before the unit turns back off. Frequent cycling beyond that pattern can indicate a problem that needs professional attention.',
  },
  {
    question: 'Can my furnace catch fire or explode?',
    answer:
      'It’s uncommon, but gas furnaces can pose a fire risk if maintenance issues go unaddressed. Gas furnaces are designed to automatically shut off to prevent overheating and pressure buildup if the device malfunctions, which is one reason regular maintenance matters.',
  },
  {
    question: 'When should I consider a zone control or ductless mini-split system?',
    answer:
      'Good candidates include homes with multiple stories, extended floor plans, concrete foundations, large glass windows, finished basements or attics, or rooms above a garage, anywhere a single central system struggles to keep temperatures even.',
  },
  {
    question: 'Why does my outlet smell fishy or like burnt plastic?',
    answer:
      'Electrical wires and components in walls and outlets are coated with plastic and heat-resistant chemicals, so an unusual smell like that suggests overheating, potentially an electrical emergency. Shut off power to that circuit if you can safely do so and call us right away.',
  },
  {
    question: 'Are surge protectors and surge suppressors the same thing?',
    answer:
      'Both limit voltage spikes, but differently. Surge protectors prevent voltage spikes from reaching electrical devices by detecting a surge and shutting the unit down; surge suppressors regulate voltage to maintain a constant level of power.',
  },
  {
    question: 'What areas does Sunset Heating & Cooling serve?',
    answer: `Sunset serves Portland and Dallas, OR and the surrounding region, ${regions.join(', ')}, and Southwest Washington. Visit our Service Areas page for the full list of cities we serve.`,
  },
  {
    question: 'Is Sunset available for emergencies?',
    answer: `Yes. Sunset offers ${business.hours.emergency} for urgent heating, cooling, plumbing, and electrical issues.`,
  },
  {
    question: 'Is Sunset licensed and insured?',
    answer: `Yes. Sunset is licensed, bonded, and insured, holding ${business.license.label} #${business.license.number}.`,
  },
  {
    question: 'Does Sunset offer financing?',
    answer: 'Yes, financing is available for qualifying installations. Visit our Financing page for details.',
  },
];

// Category-specific FAQs shown on each /[category] hub page, so the four
// category pages don’t all repeat the same general FAQ block. Educational
// content in the same voice as the real, verified FAQ answers above, not
// specific claims about Sunset that would need separate verification.
export const categoryFaqs: Record<string, FAQItem[]> = {
  heating: [
    {
      question: 'How long should a furnace or heat pump last?',
      answer:
        'A well-maintained gas furnace typically lasts 15 to 20 years, and a heat pump 10 to 15 years. Annual maintenance is the single biggest factor in reaching, or falling short of, that range.',
    },
    {
      question: 'Why is one room in my house always colder than the rest?',
      answer:
        'Uneven temperatures usually point to duct leaks, poor insulation, or a system that is not sized or zoned correctly for your floor plan. A zoning system or ductless mini split can often fix a persistent cold room without replacing the whole system.',
    },
    {
      question: 'How often should I change my furnace filter?',
      answer:
        'Every 1 to 3 months during heavy use, more often if you have pets or allergies. A clogged filter restricts airflow and makes your system work harder than it needs to.',
    },
    {
      question: 'What are the signs of a burnt or weak heat pump capacitor?',
      answer:
        'A clicking or humming sound when the unit tries to start, an outdoor fan that won’t spin, a brief startup followed by shutdown, and rising energy bills without more use are all common signs. In more advanced cases you may notice a burning or metallic smell, a tripped breaker when the system starts, or visible bulging on the capacitor itself. Capacitor replacement involves live electrical components and correct voltage/microfarad ratings, it’s not a safe DIY repair.',
    },
    {
      question: 'Why won’t my heat pump defrost?',
      answer:
        'The most common causes are a faulty defrost control board or sensor, restricted airflow around the outdoor unit from leaves or debris, low refrigerant from a leak, or incorrect thermostat settings. Clearing debris and keeping about two feet of clearance around the outdoor unit resolves it in some cases, but sensor, board, and refrigerant issues need a professional diagnosis.',
    },
  ],
  'air-conditioning': [
    {
      question: 'What size AC system does my home need?',
      answer:
        'The right size depends on square footage, insulation, window exposure, and layout, not just square footage alone. An oversized system short-cycles and wastes energy; an undersized one runs constantly and still can not keep up. A technician performing a load calculation is the only reliable way to size it correctly.',
    },
    {
      question: 'Why is my AC running but not cooling the house?',
      answer:
        'Common causes include low refrigerant from a leak, a dirty condenser coil, a failing compressor, or a clogged filter restricting airflow. A technician can usually diagnose which one it is on the same visit.',
    },
    {
      question: 'How often does my AC need maintenance?',
      answer:
        'Once a year, ideally in spring before the first hot stretch, is the standard recommendation for keeping a system efficient and catching small issues before they become breakdowns.',
    },
  ],
  plumbing: [
    {
      question: 'Why does my water heater make popping or rumbling noises?',
      answer:
        'That is usually sediment buildup at the bottom of the tank, common in areas with harder water. Left long enough, it reduces efficiency and can shorten the water heater’s lifespan. A flush often resolves it.',
    },
    {
      question: 'What should I do if a pipe bursts?',
      answer:
        'Shut off the main water valve immediately, then call for emergency plumbing service. Turning off the water first is the single most important step in limiting damage while help is on the way.',
    },
    {
      question: 'How do I know if I need a sewer line repair versus just a cleaning?',
      answer:
        'A recurring clog in the same spot, especially in older cast iron or clay pipe, often points to a structural issue like root intrusion or a collapsed section, not just debris. A sewer camera inspection is the only way to know for sure before digging.',
    },
  ],
  electrical: [
    {
      question: 'How do I know if my electrical panel needs an upgrade?',
      answer:
        'Signs include frequently tripped breakers, a panel still using fuses, a panel rated below 100 amps, or planning a major addition like an EV charger, hot tub, or home addition that pushes past your current capacity.',
    },
    {
      question: 'Is it safe to use an extension cord long-term instead of adding an outlet?',
      answer:
        'No, extension cords are meant for temporary use. Long-term reliance on one is a common fire hazard and usually means it is time for a licensed electrician to add a proper outlet or circuit.',
    },
    {
      question: 'Do I need a permit for an electrical panel upgrade?',
      answer:
        'Yes, panel upgrades require a permit and inspection under Oregon electrical code. Sunset’s licensed electricians handle the permitting as part of the job.',
    },
  ],
};
