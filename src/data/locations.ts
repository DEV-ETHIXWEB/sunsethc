// Service-area data. City list is the real, complete set found in
// sunsethc.com’s live sitemap (crawled 2026-09-01), every city below is a
// genuine published service area on the live site, not invented.
//
// The legacy site published a thin `/city/service/` doorway page for many
// city × service combinations (e.g. "/milwaukie/clogged-drains/"). This
// rebuild consolidates those into ONE dynamic `/service-areas/[location]`
// page per city (see src/pages/service-areas/[location].astro) that lists
// every service offered there, rather than duplicating near-identical
// content per service. src/data/redirects.ts 301s the dropped combo URLs.
//
// lat/lng are standard public city-center coordinates, not business data, // used only to plot the service-area map on /service-areas.

export interface ServiceArea {
  slug: string;
  name: string;
  region: 'Portland Metro' | 'Washington County' | 'Mid-Willamette Valley' | 'Columbia River Gorge' | 'SW Washington';
  featured?: boolean;
  lat: number;
  lng: number;
}

export const serviceAreas: ServiceArea[] = [
  // Portland Metro
  { slug: 'portland', name: 'Portland', region: 'Portland Metro', featured: true, lat: 45.5152, lng: -122.6784 },
  { slug: 'gresham', name: 'Gresham', region: 'Portland Metro', featured: true, lat: 45.5001, lng: -122.4302 },
  { slug: 'happy-valley', name: 'Happy Valley', region: 'Portland Metro', featured: true, lat: 45.4287, lng: -122.5464 },
  { slug: 'milwaukie', name: 'Milwaukie', region: 'Portland Metro', featured: true, lat: 45.4462, lng: -122.6395 },
  { slug: 'oregon-city', name: 'Oregon City', region: 'Portland Metro', featured: true, lat: 45.3573, lng: -122.6068 },
  { slug: 'lake-oswego', name: 'Lake Oswego', region: 'Portland Metro', featured: true, lat: 45.4207, lng: -122.6706 },
  { slug: 'clackamas', name: 'Clackamas', region: 'Portland Metro', featured: true, lat: 45.4165, lng: -122.5559 },
  { slug: 'west-linn', name: 'West Linn', region: 'Portland Metro', featured: true, lat: 45.3662, lng: -122.6151 },
  { slug: 'gladstone', name: 'Gladstone', region: 'Portland Metro', lat: 45.3868, lng: -122.5934 },
  { slug: 'sandy', name: 'Sandy', region: 'Portland Metro', featured: true, lat: 45.3987, lng: -122.2632 },
  { slug: 'canby', name: 'Canby', region: 'Portland Metro', featured: true, lat: 45.2632, lng: -122.6976 },
  { slug: 'beavercreek', name: 'Beavercreek', region: 'Portland Metro', lat: 45.2801, lng: -122.5476 },
  { slug: 'eagle-creek', name: 'Eagle Creek', region: 'Portland Metro', lat: 45.3548, lng: -122.3437 },
  { slug: 'estacada', name: 'Estacada', region: 'Portland Metro', lat: 45.2915, lng: -122.3373 },
  { slug: 'corbett', name: 'Corbett', region: 'Portland Metro', lat: 45.531, lng: -122.2371 },

  // Washington County / Tualatin Valley
  { slug: 'beaverton', name: 'Beaverton', region: 'Washington County', featured: true, lat: 45.4871, lng: -122.8037 },
  { slug: 'tigard', name: 'Tigard', region: 'Washington County', featured: true, lat: 45.4312, lng: -122.7715 },
  { slug: 'tualatin', name: 'Tualatin', region: 'Washington County', featured: true, lat: 45.3843, lng: -122.7634 },
  { slug: 'hillsboro', name: 'Hillsboro', region: 'Washington County', featured: true, lat: 45.5229, lng: -122.9898 },
  { slug: 'sherwood', name: 'Sherwood', region: 'Washington County', lat: 45.3568, lng: -122.8426 },
  { slug: 'forest-grove', name: 'Forest Grove', region: 'Washington County', lat: 45.5187, lng: -123.1104 },
  { slug: 'cedar-hills', name: 'Cedar Hills', region: 'Washington County', lat: 45.5029, lng: -122.8143 },
  { slug: 'aloha', name: 'Aloha', region: 'Washington County', lat: 45.4934, lng: -122.8759 },
  { slug: 'banks', name: 'Banks', region: 'Washington County', lat: 45.6165, lng: -123.1093 },
  { slug: 'gales-creek', name: 'Gales Creek', region: 'Washington County', lat: 45.5701, lng: -123.2232 },
  { slug: 'gaston', name: 'Gaston', region: 'Washington County', lat: 45.4459, lng: -123.1826 },

  // Mid-Willamette Valley
  { slug: 'dallas', name: 'Dallas', region: 'Mid-Willamette Valley', featured: true, lat: 44.9193, lng: -123.3173 },
  { slug: 'salem', name: 'Salem', region: 'Mid-Willamette Valley', featured: true, lat: 44.9429, lng: -123.0351 },
  { slug: 'newberg', name: 'Newberg', region: 'Mid-Willamette Valley', featured: true, lat: 45.3009, lng: -122.9737 },
  { slug: 'dundee', name: 'Dundee', region: 'Mid-Willamette Valley', lat: 45.2765, lng: -123.0332 },
  { slug: 'dayton', name: 'Dayton', region: 'Mid-Willamette Valley', lat: 45.2265, lng: -123.0779 },
  { slug: 'yamhill', name: 'Yamhill', region: 'Mid-Willamette Valley', lat: 45.3423, lng: -123.1957 },
  { slug: 'carlton', name: 'Carlton', region: 'Mid-Willamette Valley', lat: 45.2909, lng: -123.1801 },
  { slug: 'amity', name: 'Amity', region: 'Mid-Willamette Valley', lat: 45.1101, lng: -123.2018 },
  { slug: 'brooks', name: 'Brooks', region: 'Mid-Willamette Valley', lat: 45.0287, lng: -123.0179 },
  { slug: 'aurora', name: 'Aurora', region: 'Mid-Willamette Valley', lat: 45.2276, lng: -122.7573 },
  { slug: 'chehalem', name: 'Chehalem', region: 'Mid-Willamette Valley', lat: 45.3062, lng: -122.9871 },
  { slug: 'cherry-grove', name: 'Cherry Grove', region: 'Mid-Willamette Valley', lat: 45.4204, lng: -123.2571 },
  { slug: 'cove-orchard', name: 'Cove Orchard', region: 'Mid-Willamette Valley', lat: 45.3696, lng: -123.2354 },
  { slug: 'ballston', name: 'Ballston', region: 'Mid-Willamette Valley', lat: 44.9515, lng: -123.4237 },
  { slug: 'buell', name: 'Buell', region: 'Mid-Willamette Valley', lat: 45.0026, lng: -123.4276 },
  { slug: 'elwood', name: 'Elwood', region: 'Mid-Willamette Valley', lat: 44.8804, lng: -123.3629 },

  // Columbia River Gorge
  { slug: 'hood-river', name: 'Hood River', region: 'Columbia River Gorge', featured: true, lat: 45.7054, lng: -121.5215 },
  { slug: 'the-dalles', name: 'The Dalles', region: 'Columbia River Gorge', lat: 45.5946, lng: -121.1787 },
  { slug: 'cascade-locks', name: 'Cascade Locks', region: 'Columbia River Gorge', lat: 45.6693, lng: -121.8935 },
  { slug: 'mosier', name: 'Mosier', region: 'Columbia River Gorge', lat: 45.6807, lng: -121.3987 },
  { slug: 'odell', name: 'Odell', region: 'Columbia River Gorge', lat: 45.6532, lng: -121.5343 },
  { slug: 'carson', name: 'Carson', region: 'Columbia River Gorge', lat: 45.7276, lng: -121.8149 },
  { slug: 'lyle', name: 'Lyle', region: 'Columbia River Gorge', lat: 45.6957, lng: -121.2843 },

  // SW Washington
  { slug: 'vancouver', name: 'Vancouver', region: 'SW Washington', featured: true, lat: 45.6387, lng: -122.6615 },
  { slug: 'camas', name: 'Camas', region: 'SW Washington', lat: 45.5871, lng: -122.3995 },
];

export const regions = [
  'Portland Metro',
  'Washington County',
  'Mid-Willamette Valley',
  'Columbia River Gorge',
  'SW Washington',
] as const;

export const featuredServiceAreas = serviceAreas.filter((a) => a.featured);

export function findServiceArea(slug: string): ServiceArea | undefined {
  return serviceAreas.find((a) => a.slug === slug);
}
