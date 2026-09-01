// Service taxonomy, categories and slugs are drawn directly from
// sunsethc.com’s real, live URL structure (crawled 2026-09-01), so the new
// site’s service pages sit at the same URLs the real site already uses
// (/heating/furnace-repair/, /plumbing/water-heaters/, etc.) wherever
// possible, no invented services.
//
// The legacy site also published several near-duplicate "generic" pages
// alongside the specific ones (e.g. /heating/repair/ AND
// /heating/furnace-repair/, both about the same thing since furnaces are
// the dominant heating system). Those generic duplicates are intentionally
// NOT reproduced here, furnace-repair etc. serves as the single
// canonical page and src/data/redirects.ts 301s the generic legacy URL to
// it. Likewise, a handful of shared HVAC services that lived at the site
// ROOT on the legacy site (e.g. /thermostat/, /ductless-mini-split/,
// /heat-pump-repair/) are given one canonical home here (under Heating)
// with a redirect from the old root-level URL.

import type { IconName } from '../components/ui/Icon.astro';

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: ServiceCategory['slug'];
  featured?: boolean;
  icon: IconName;
}

export interface ServiceCategory {
  slug: string;
  name: string;
  description: string;
  intro: string;
  icon: IconName;
  heroImage: string;
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: 'heating',
    name: 'Heating',
    description: 'Furnace, heat pump, ductless, and whole-home heating installation, repair, and maintenance for Portland & Dallas, OR winters.',
    intro: 'Willamette Valley winters put a real strain on an aging or undersized heating system. Sunset installs, repairs, and maintains furnaces, heat pumps, ductless mini splits, and whole-home humidity and air quality equipment, backed by flat-rate pricing agreed before any work starts and a Lifetime Limited Warranty on covered work. Whether your furnace has stopped putting out heat entirely or you are planning a proactive upgrade before the cold sets in, our NATE-certified technicians handle the diagnosis, the install, and everything in between.',
    icon: 'heating',
    heroImage: 'sunset-hvac-electrical-plumbing-feat-01.webp',
  },
  {
    slug: 'air-conditioning',
    name: 'Air Conditioning',
    description: 'AC installation, repair, and maintenance, plus air handling and filtration for Willamette Valley summers.',
    intro: 'Portland-area summers have gotten hotter, and an undersized or failing AC system turns that into a real problem fast. Sunset installs, repairs, and maintains central air conditioning, air handlers, and whole-home filtration, all with flat-rate pricing and 24/7 emergency availability when a system fails during a heat wave. We service all major brands, whether we installed the system or not.',
    icon: 'ac',
    heroImage: 'bg-home-page-new.webp',
  },
  {
    slug: 'plumbing',
    name: 'Plumbing',
    description: 'Water heaters, drain & sewer service, repiping, remodeling, and leak detection from a flat-rate, licensed plumbing team.',
    intro: 'From a slow drain to a burst pipe flooding your basement, Sunset’s licensed plumbers handle residential and light commercial plumbing across Portland, Dallas, OR, and the surrounding region. That includes everything from routine drain cleaning and water heater replacement to sewer line repair, repiping, and full bathroom or kitchen remodels, all with upfront flat-rate pricing so you know the cost before we start.',
    icon: 'plumbing',
    heroImage: 'collapsed-old-sewer-pipe.jpg.webp',
  },
  {
    slug: 'electrical',
    name: 'Electrical',
    description: 'Panel upgrades, EV chargers, generators, lighting, and whole-home electrical repair from licensed electricians.',
    intro: 'Modern homes ask a lot of an electrical system that may have been designed decades ago. Sunset’s licensed electricians handle panel upgrades, EV charger installation, generator installation, lighting, and general electrical repair and troubleshooting, work that should never be left to a handyman. Every job follows current electrical code and is backed by our Lifetime Limited Warranty.',
    icon: 'electrical',
    heroImage: 'image-22.jpg.webp',
  },
];

export const services: Service[] = [
  // ---------------- Heating ----------------
  { slug: 'furnace-installation', name: 'Furnace Installation', category: 'heating', featured: true, icon: 'furnace',
    shortDescription: 'New high-efficiency furnace installation, sized and installed right the first time.',
    description: 'When your furnace is beyond repair or you’re ready to upgrade to a higher-efficiency system, Sunset’s technicians size and install the right furnace for your home, not just the biggest one. Every installation includes upfront flat-rate pricing and is backed by our Lifetime Limited Warranty.' },
  { slug: 'furnace-repair', name: 'Furnace Repair', category: 'heating', featured: true, icon: 'furnace',
    shortDescription: '24/7 furnace repair when your heat goes out.',
    description: 'A furnace that won’t start, won’t stay lit, or is blowing cold air can’t wait. Sunset offers 24/7 furnace repair across Portland and Dallas, OR, with flat-rate pricing agreed before any work begins, no surprise charges.' },
  { slug: 'furnace-maintenance', name: 'Furnace Maintenance', category: 'heating', icon: 'heating-maintenance',
    shortDescription: 'Annual tune-ups that catch small problems before they become no-heat emergencies.',
    description: 'Regular furnace maintenance keeps your system running efficiently, extends its lifespan, and helps prevent mid-winter breakdowns. Sunset’s maintenance visits include a full safety and performance inspection.' },
  { slug: 'heat-pump-installation', name: 'Heat Pump Installation', category: 'heating', featured: true, icon: 'heat-pump',
    shortDescription: 'Energy-efficient heat pump systems for year-round comfort.',
    description: 'Heat pumps deliver efficient heating and cooling from a single system. Sunset installs Daikin and other top-tier heat pumps sized correctly for Oregon’s climate, with financing and flat-rate pricing available.' },
  { slug: 'heat-pump-repair', name: 'Heat Pump Repair', category: 'heating', icon: 'heat-pump',
    shortDescription: 'Fast diagnosis and repair for heat pumps that won’t heat, cool, or defrost.',
    description: 'From a frozen outdoor unit to a system that won’t switch between heating and cooling, Sunset’s NATE-certified techs diagnose and repair heat pump issues quickly, backed by our Lifetime Limited Warranty on the work performed.' },
  { slug: 'heat-pump-maintenance', name: 'Heat Pump Maintenance', category: 'heating', icon: 'heat-pump-1',
    shortDescription: 'Seasonal tune-ups that keep heat pumps efficient in both heating and cooling mode.',
    description: 'Because heat pumps run year-round, regular maintenance matters even more. Sunset’s tune-ups check refrigerant levels, electrical connections, and defrost cycles to keep your system efficient in every season.' },
  { slug: 'ductless-mini-split', name: 'Ductless Mini Splits', category: 'heating', featured: true, icon: 'ductless-mini-split',
    shortDescription: 'Ductless heating and cooling for additions, ADUs, and homes without ductwork.',
    description: 'Ductless mini split systems heat and cool individual rooms or additions without the cost of extending ductwork. Sunset designs and installs single- and multi-zone ductless systems sized for your space.' },
  { slug: 'ductless-heat-pump-systems', name: 'Ductless Heat Pump Systems', category: 'heating', icon: 'ductless-mini-split',
    shortDescription: 'Whole-home ductless heat pump systems as an alternative to central HVAC.',
    description: 'For homes without existing ductwork, a multi-zone ductless heat pump system can heat and cool the entire house room by room, with independent temperature control in every zone.' },
  { slug: 'thermostat', name: 'Thermostats', category: 'heating', icon: 'thermostat',
    shortDescription: 'Smart and programmable thermostat installation.',
    description: 'A smart thermostat can lower your energy bills and give you remote control over your home’s comfort. Sunset installs and programs smart thermostats compatible with your existing heating and cooling system.' },
  { slug: 'hvac-zoning-system', name: 'HVAC Zoning Systems', category: 'heating', icon: 'air-handler',
    shortDescription: 'Zoned heating and cooling so every room stays at the right temperature.',
    description: 'Zoning systems let you heat and cool different areas of your home independently, eliminating hot and cold spots and reducing energy waste in rooms that aren’t in use.' },
  { slug: 'attic-insulation', name: 'Attic Insulation', category: 'heating', icon: 'energy-efficient',
    shortDescription: 'Attic insulation upgrades that reduce heating and cooling loss.',
    description: 'Poor attic insulation is one of the biggest sources of energy loss in Northwest homes. Sunset assesses and upgrades attic insulation to help your HVAC system work less and save you more.' },
  { slug: 'heat-pump-water-heaters', name: 'Heat Pump Water Heaters', category: 'heating', icon: 'water-heater',
    shortDescription: 'High-efficiency heat pump water heater installation.',
    description: 'Heat pump water heaters use a fraction of the energy of a standard electric tank by pulling heat from the surrounding air. Sunset installs and services heat pump water heaters for qualifying homes.' },
  { slug: 'oil-to-gas-conversions', name: 'Oil-to-Gas Conversions', category: 'heating', icon: 'boiler',
    shortDescription: 'Converting older oil heating systems to cleaner, more efficient gas.',
    description: 'Sunset helps homeowners convert aging oil furnaces and boilers to natural gas systems, typically cleaner-burning, more efficient, and cheaper to operate over time.' },
  { slug: 'indoor-air-quality', name: 'Indoor Air Quality', category: 'heating', icon: 'indoor-air-quality',
    shortDescription: 'Air purification, filtration, and humidity control for healthier indoor air.',
    description: 'From whole-home air purifiers to humidity control, Sunset offers indoor air quality solutions that integrate with your existing HVAC system to reduce allergens, odors, and airborne particles.' },
  { slug: 'whole-home-humidifiers', name: 'Whole-Home Humidifiers', category: 'heating', icon: 'humidifier',
    shortDescription: 'Whole-home humidifier installation to fix dry winter air.',
    description: 'Oregon winters and forced-air heat can leave indoor air uncomfortably dry, cracked skin, static shocks, and a home that feels colder than the thermostat says. Sunset installs whole-home humidifiers that tie directly into your existing ductwork, keeping humidity at a comfortable, healthy level without a room-by-room unit to refill.' },
  { slug: 'whole-home-dehumidifiers', name: 'Whole-Home Dehumidifiers', category: 'heating', icon: 'dehumidifier',
    shortDescription: 'Whole-home dehumidifier installation for damp basements and muggy summers.',
    description: 'Excess humidity feeds mold, musty odors, and dust mites, especially in Willamette Valley basements and crawlspaces. Sunset installs whole-home dehumidifiers integrated with your HVAC system to pull excess moisture out of the air throughout the house, not just one room at a time.' },

  // ---------------- Air Conditioning ----------------
  { slug: 'ac-repair', name: 'AC Repair', category: 'air-conditioning', featured: true, icon: 'ac-repair',
    shortDescription: '24/7 air conditioning repair when the heat is on and your AC isn’t.',
    description: 'A broken AC during a Portland heat wave is an emergency. Sunset offers 24/7 AC repair with flat-rate pricing and technicians who service all major brands.' },
  { slug: 'ac-installation', name: 'AC Installation', category: 'air-conditioning', featured: true, icon: 'ac',
    shortDescription: 'New central air conditioning systems, sized and installed correctly.',
    description: 'Sunset installs high-efficiency central air conditioning systems from Daikin, Trane, and other trusted brands, sized specifically for your home rather than a one-size-fits-all estimate.' },
  { slug: 'ac-maintenance', name: 'AC Maintenance', category: 'air-conditioning', featured: true, icon: 'ac',
    shortDescription: 'Pre-season AC tune-ups that prevent summer breakdowns.',
    description: 'Annual AC maintenance keeps your system running efficiently through the hottest months and helps you catch small issues before they become expensive repairs.' },
  { slug: 'air-handler-services', name: 'Air Handler Services', category: 'air-conditioning', icon: 'air-handler',
    shortDescription: 'Air handler repair, replacement, and maintenance.',
    description: 'The air handler moves conditioned air throughout your home. Sunset repairs, maintains, and replaces air handlers as part of your central AC or heat pump system.' },
  { slug: 'refrigerant-leak', name: 'Refrigerant Leak Repair', category: 'air-conditioning', icon: 'leak-detection',
    shortDescription: 'Locating and repairing refrigerant leaks that reduce cooling performance.',
    description: 'A refrigerant leak means your AC is working harder for less cooling. Sunset locates and repairs refrigerant leaks and recharges your system to the manufacturer’s specification.' },
  { slug: 'air-cleaner-filtration', name: 'Air Cleaner & Filtration', category: 'air-conditioning', icon: 'air-purification',
    shortDescription: 'Whole-home air cleaners and filtration systems.',
    description: 'Whole-home air cleaners trap dust, pollen, and other particles that a standard filter misses, integrating directly with your existing HVAC ductwork.' },
  { slug: 'ac-furnace-filter-replacement', name: 'AC & Furnace Filter Replacement', category: 'air-conditioning', icon: 'air-purification',
    shortDescription: 'Routine filter replacement to protect airflow and efficiency.',
    description: 'A clogged filter restricts airflow and forces your system to work harder. Sunset offers filter replacement as a standalone visit or as part of a maintenance plan.' },
  { slug: 'air-duct-repair-installation', name: 'Air Duct Repair & Installation', category: 'air-conditioning', icon: 'air-duct',
    shortDescription: 'Ductwork repair, sealing, and new installation.',
    description: 'Leaky or damaged ductwork wastes conditioned air before it reaches your rooms. Sunset repairs, seals, and installs ductwork to keep your system’s output where it belongs.' },

  // ---------------- Plumbing ----------------
  { slug: 'emergency-plumbing', name: 'Emergency Plumbing', category: 'plumbing', featured: true, icon: 'emergency-plumbing',
    shortDescription: '24/7 rapid-response plumbing repair when it can’t wait.',
    description: 'A burst pipe, overflowing toilet, or sewage backup does not wait for business hours, and neither does Sunset. Our emergency plumbing team is available 24/7 across Portland and Dallas, OR, with flat-rate pricing agreed before any work starts, so you know the cost even in a crisis.' },
  { slug: 'water-heaters', name: 'Water Heaters', category: 'plumbing', featured: true, icon: 'water-heater',
    shortDescription: 'Water heater repair, replacement, and installation, gas, electric, and tankless.',
    description: 'Whether it’s a leaking tank or you’re ready to upgrade, Sunset repairs and installs gas, electric, and tankless water heaters with flat-rate pricing and a Lifetime Limited Warranty.' },
  { slug: 'tankless-water-heaters', name: 'Tankless Water Heaters', category: 'plumbing', featured: true, icon: 'tankless-water-heater',
    shortDescription: 'Endless hot water and lower energy bills with a tankless system.',
    description: 'Tankless water heaters heat water on demand instead of storing it, saving space and energy. Sunset installs and services tankless systems from leading manufacturers.' },
  { slug: 'drain-cleaning', name: 'Drain Cleaning', category: 'plumbing', featured: true, icon: 'drain-cleaning',
    shortDescription: 'Clearing clogged and slow drains fast.',
    description: 'From a single slow sink to a fully clogged main line, Sunset’s drain cleaning service clears the blockage and identifies what caused it, so it doesn’t come right back.' },
  { slug: 'sewer-line-repair', name: 'Sewer Line Repair', category: 'plumbing', icon: 'sewer-line',
    shortDescription: 'Repairing damaged or collapsed sewer lines.',
    description: 'A damaged sewer line is a serious problem. Sunset diagnoses sewer issues with camera inspection and repairs or replaces the line using the least disruptive method available.' },
  { slug: 'trenchless-sewer-repair', name: 'Trenchless Sewer Repair', category: 'plumbing', icon: 'sewer-line',
    shortDescription: 'Repairing sewer lines without digging up your yard.',
    description: 'Trenchless sewer repair fixes damaged pipe from the inside, avoiding the cost and disruption of excavating your entire yard or driveway.' },
  { slug: 'sewer-video-inspection', name: 'Sewer Video Inspection', category: 'plumbing', icon: 'sewer-camera',
    shortDescription: 'Camera inspection to diagnose sewer problems before digging.',
    description: 'A sewer camera inspection shows exactly what’s happening inside your line, roots, cracks, bellies, or blockages, before any repair work starts.' },
  { slug: 'pipe-lining', name: 'Pipe Lining', category: 'plumbing', icon: 'pipe-repair',
    shortDescription: 'Trenchless pipe relining for damaged pipes.',
    description: 'Pipe lining installs a new pipe within the old one, sealing cracks and root intrusion without excavation.' },
  { slug: 'repiping', name: 'Repiping', category: 'plumbing', icon: 'pipe-repair',
    shortDescription: 'Whole-home repiping for old, corroded, or failing plumbing.',
    description: 'Aging galvanized or polybutylene pipes are prone to leaks and reduced water pressure. Sunset repipes homes with durable modern materials.' },
  { slug: 'slab-leaks', name: 'Slab Leaks', category: 'plumbing', icon: 'leak-detection',
    shortDescription: 'Detecting and repairing leaks under a concrete foundation.',
    description: 'A slab leak can cause serious damage if left unaddressed. Sunset uses leak detection equipment to pinpoint the leak’s location before any concrete is disturbed.' },
  { slug: 'water-leak-detection', name: 'Water Leak Detection', category: 'plumbing', featured: true, icon: 'leak-detection',
    shortDescription: 'Finding hidden leaks before they cause major damage.',
    description: 'Not all leaks are visible. Sunset uses acoustic and moisture detection equipment to find hidden leaks in walls, slabs, and underground lines.' },
  { slug: 'water-line-repair', name: 'Water Line Repair', category: 'plumbing', icon: 'water-line',
    shortDescription: 'Repairing and replacing damaged water supply lines.',
    description: 'A broken or corroded water line can drop your pressure or cause a major leak. Sunset repairs and replaces main water lines with minimal disruption to your property.' },
  { slug: 'water-filtration', name: 'Water Filtration', category: 'plumbing', icon: 'water-filtration',
    shortDescription: 'Whole-home water filtration systems.',
    description: 'Whole-home water filtration removes sediment, chlorine, and other contaminants at the point where water enters your home, improving taste and protecting fixtures.' },
  { slug: 'water-softeners', name: 'Water Softeners', category: 'plumbing', icon: 'water-softener',
    shortDescription: 'Water softener installation for hard water problems.',
    description: 'Hard water leaves scale buildup on fixtures and appliances. Sunset installs water softeners that extend the life of your plumbing and water-using appliances.' },
  { slug: 'fixtures-faucets', name: 'Fixtures & Faucets', category: 'plumbing', icon: 'faucet',
    shortDescription: 'Faucet and fixture repair, replacement, and installation.',
    description: 'From a dripping faucet to a full fixture upgrade, Sunset installs and repairs kitchen and bathroom fixtures of every style.' },
  { slug: 'toilets', name: 'Toilets', category: 'plumbing', icon: 'toilet',
    shortDescription: 'Toilet repair, replacement, and installation.',
    description: 'Running, clogged, or leaking toilets are one of the most common plumbing calls. Sunset repairs existing toilets or installs new water-efficient models.' },
  { slug: 'garbage-disposals', name: 'Garbage Disposals', category: 'plumbing', icon: 'garbage-disposal',
    shortDescription: 'Garbage disposal repair and installation.',
    description: 'A jammed or leaking garbage disposal is repaired or replaced quickly by Sunset’s plumbing team, with proper connection to your existing drain and electrical.' },
  { slug: 'sump-pumps', name: 'Sump Pumps', category: 'plumbing', icon: 'sump-pump',
    shortDescription: 'Sump pump installation, repair, and battery backup.',
    description: 'A working sump pump protects your basement or crawlspace from flooding. Sunset installs, repairs, and adds battery backup to existing sump pump systems.' },
  { slug: 'hydro-jetting', name: 'Hydro Jetting', category: 'plumbing', icon: 'hydro-jetting',
    shortDescription: 'High-pressure hydro jetting for stubborn clogs and buildup.',
    description: 'Hydro jetting uses high-pressure water to clear grease, roots, and scale buildup that a standard snake can’t remove, restoring full pipe diameter.' },
  { slug: 'french-drains', name: 'French Drains', category: 'plumbing', icon: 'sump-pump',
    shortDescription: 'French drain installation for yard drainage problems.',
    description: 'French drains redirect standing water away from your foundation and yard, addressing chronic drainage and wet-yard issues common in the Willamette Valley.' },
  { slug: 'wet-yard', name: 'Wet Yard Solutions', category: 'plumbing', icon: 'sump-pump',
    shortDescription: 'Diagnosing and correcting chronic yard drainage problems.',
    description: 'A perpetually soggy yard usually points to a drainage or grading issue. Sunset diagnoses the cause and installs the right drainage solution.' },
  { slug: 'bathroom-remodeling', name: 'Bathroom Remodeling', category: 'plumbing', icon: 'faucet',
    shortDescription: 'Plumbing for full and partial bathroom remodels.',
    description: 'From a fixture refresh to a full gut remodel, Sunset handles the plumbing side of your bathroom renovation, coordinated around your project timeline.' },
  { slug: 'kitchen-remodeling', name: 'Kitchen Remodeling', category: 'plumbing', icon: 'faucet',
    shortDescription: 'Plumbing for kitchen remodels and renovations.',
    description: 'Sunset handles sink, dishwasher, disposal, and gas line plumbing for kitchen remodels of any size, working alongside your general contractor or as the lead trade.' },
  { slug: 'bathtubs-showers', name: 'Bathtubs & Showers', category: 'plumbing', icon: 'faucet',
    shortDescription: 'Bathtub and shower repair, replacement, and conversion.',
    description: 'Sunset repairs and replaces bathtubs and showers, including tub-to-shower conversions for improved accessibility.' },
  { slug: 'commercial-services', name: 'Commercial Plumbing', category: 'plumbing', icon: 'plumbing',
    shortDescription: 'Commercial plumbing service, repair, and maintenance.',
    description: 'Sunset provides commercial plumbing service for offices, restaurants, and multi-family properties across the Portland and Dallas, OR service areas.' },

  // ---------------- Electrical ----------------
  { slug: 'repair', name: 'Electrical Repair', category: 'electrical', featured: true, icon: 'electrical',
    shortDescription: 'Diagnosing and repairing electrical problems safely.',
    description: 'Flickering lights, dead outlets, or a breaker that keeps tripping are all signs of an underlying electrical issue. Sunset’s licensed electricians diagnose and repair the root cause, not just the symptom.' },
  { slug: 'panel-upgrade', name: 'Panel Upgrades', category: 'electrical', featured: true, icon: 'electrical-panel',
    shortDescription: 'Electrical panel upgrades for older or undersized systems.',
    description: 'An outdated or undersized electrical panel can’t safely support a modern home’s power needs. Sunset upgrades panels to safely handle EV chargers, HVAC systems, and more.' },
  { slug: 'circuit-breakers', name: 'Circuit Breakers', category: 'electrical', icon: 'electrical-panel',
    shortDescription: 'Circuit breaker repair and replacement.',
    description: 'A breaker that won’t reset or trips repeatedly needs a licensed electrician’s attention. Sunset diagnoses and replaces faulty circuit breakers.' },
  { slug: 'switches-outlets', name: 'Switches & Outlets', category: 'electrical', icon: 'outlet',
    shortDescription: 'Switch and outlet repair, replacement, and installation.',
    description: 'From a dead outlet to adding new circuits for a home office, Sunset installs and repairs switches and outlets throughout your home.' },
  { slug: 'indoor-lighting', name: 'Indoor Lighting', category: 'electrical', icon: 'lighting',
    shortDescription: 'Indoor lighting design and installation.',
    description: 'Sunset installs recessed, pendant, and accent lighting to update the look and function of any room.' },
  { slug: 'outdoor-lighting', name: 'Outdoor Lighting', category: 'electrical', icon: 'outdoor-lighting',
    shortDescription: 'Landscape and security lighting installation.',
    description: 'Outdoor lighting improves curb appeal and safety. Sunset designs and installs landscape, pathway, and security lighting.' },
  { slug: 'ceiling-fan-installation', name: 'Ceiling Fan Installation', category: 'electrical', icon: 'lighting',
    shortDescription: 'Ceiling fan installation and replacement.',
    description: 'Sunset installs ceiling fans with proper electrical support and, where needed, adds new switch wiring for fan/light control.' },
  { slug: 'ev-charger-installation', name: 'EV Charger Installation', category: 'electrical', featured: true, icon: 'ev-charger',
    shortDescription: 'Home EV charger installation, sized to your panel.',
    description: 'Sunset installs Level 2 EV chargers at home, including any panel upgrade needed to support the added load safely.' },
  { slug: 'generator', name: 'Generators', category: 'electrical', featured: true, icon: 'generator',
    shortDescription: 'Standby generator installation for whole-home backup power.',
    description: 'A standby generator keeps your home powered through outages. Sunset installs and services whole-home backup generators with automatic transfer switches.' },
  { slug: 'smart-home', name: 'Smart Home Wiring', category: 'electrical', icon: 'wiring',
    shortDescription: 'Wiring and installation for smart home devices.',
    description: 'Sunset wires and installs smart switches, thermostats, and home automation devices as part of a smart home upgrade.' },
  { slug: 'hot-tub-wiring', name: 'Hot Tub Wiring', category: 'electrical', icon: 'wiring',
    shortDescription: 'Dedicated circuit installation for hot tubs and spas.',
    description: 'Hot tubs require a dedicated, properly protected circuit. Sunset installs code-compliant wiring for hot tubs and spas.' },
  { slug: 'surge-protection', name: 'Surge Protection', category: 'electrical', icon: 'electrical-panel',
    shortDescription: 'Whole-home surge protection installation.',
    description: 'A whole-home surge protector installed at your panel guards every circuit against damaging power surges, not just what’s plugged into a power strip.' },
];

export function servicesByCategory(categorySlug: string): Service[] {
  return services.filter((s) => s.category === categorySlug);
}

export function findService(categorySlug: string, serviceSlug: string): Service | undefined {
  return services.find((s) => s.category === categorySlug && s.slug === serviceSlug);
}
