export const SITE = {
  name: 'Holidays by Design',
  tagline: 'seek out sri lanka',
  founded: 1995,
  address: ['209, 1st Floor', 'Srimath Anagarika Dharmapala Mawatha', 'Colombo 07 (Zip 00700)', 'Sri Lanka'],
  email: 'info@hbdasia.com',

  phones: [
    // { region: 'Australia', code: 'AU', tel: '+61 413 627 281' },
    // { region: 'United Kingdom', code: 'UK', tel: '+44 7530 242 228' },
    { region: 'Sri Lanka', code: 'LK', tel: '+94 77 399 2089' },
  ],
  social: {
    facebook: 'https://facebook.com/hbdasia',
    instagram: 'https://instagram.com/holidaysbydesign',
  },
  memberships: ['SLAITO', 'Skål International', 'Wonder of Asia'],
  group: 'United Ventures Group',
}

export const NAV = [
  { to: '/journeys', label: 'Journeys' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/plan', label: 'Plan your trip' },
  { to: '/about', label: 'About' },
]

export const PILLARS = [
  { icon: 'clock', title: '24/7 on-ground care', text: 'A real person, on the island, whenever you need one.' },
  { icon: 'compass', title: 'Specialists, not generalists', text: 'Sri Lanka is all we do. Every itinerary is built by people who live here.' },
  { icon: 'user-check', title: 'Handpicked guides', text: 'Guides chosen for their knowledge and their company.' },
  { icon: 'sparkles', title: 'Perfect moments', text: 'The sunrise climb, the private tea tasting — planned in, not left to chance.' },
  { icon: 'leaf', title: 'Purposeful tourism', text: 'Travel that gives something back to the communities and places you visit.' },
]

export const PROMISES = ['Tailor-made', 'Intricate planning', 'Informative guidance', 'Safe and secure', 'No hidden costs']

// Source: hbdasia.com/reviews.html. Only ONE quote was captured verbatim when crawling (reviewer names seen on the page:
// Sharon Cowan and "Phebe & Holly", both Australia — attribution per quote unconfirmed).
// TODO before launch: copy all reviews (6 pages) verbatim, with permission + attribution, or embed TripAdvisor/Google.
export const REVIEWS = [
  { quote: 'They made the trip a memorable and fun experience.', who: 'Guest', from: 'Australia', tour: null },
]

export const EVENTS = [
  { m: 'Jan', name: 'Thai Pongal', text: 'A Tamil harvest festival honouring the sun — homes decorated with mango leaves, kolam patterns and shared sweet rice.' },
  { m: 'Feb', name: 'Independence Day', text: 'A national parade in Colombo with traditional dance, drummers and the lighting of the oil lamp.' },
  { m: 'Apr', name: 'Sinhala & Tamil New Year', text: 'Two communities, one new year. Games, feasts and the first oil-anointing rituals.' },
  { m: 'May', name: 'Vesak', text: 'Lanterns, lit pandals and processions mark the Buddha’s birth, enlightenment and passing.' },
  { m: 'Jul – Aug', name: 'Kandy Esala Perahera', text: 'Dancers, drummers and decorated elephants parade in homage to the sacred tooth relic. The island’s grandest pageant.', img: 'perahera' },
  { m: 'Oct – Nov', name: 'Deepavali', text: 'The festival of lights: oil lamps and sweets across the island.' },
]

// Seasons: 2 = best · 1 = good · 0 = wetter. Jan → Dec. General guidance only.
export const SEASONS = [
  { region: 'South & west coast', note: 'Galle · Mirissa · Bentota', m: [2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 1, 2] },
  { region: 'East coast', note: 'Trincomalee · Arugam Bay', m: [0, 1, 1, 1, 2, 2, 2, 2, 2, 1, 0, 0] },
  { region: 'Hill country', note: 'Kandy · Nuwara Eliya · Ella', m: [2, 2, 2, 2, 1, 0, 1, 1, 1, 0, 0, 1] },
  { region: 'Cultural triangle', note: 'Sigiriya · Anuradhapura', m: [1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 0, 0] },
  { region: 'Safari', note: 'Yala · Udawalawe · Wilpattu', m: [0, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0] },
  { region: 'Whale watching', note: 'Mirissa · Trincomalee', m: [2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 1, 2] },
]
export const MONTHS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

export const FACTS = [
  ['Capital', 'Sri Jayawardenepura Kotte (Colombo is the commercial hub)'],
  ['Airport', 'Bandaranaike International (CMB), Katunayake'],
  ['Time zone', 'UTC +5:30'],
  ['Currency', 'Sri Lankan rupee (LKR)'],
  ['Languages', 'Sinhala, Tamil — English widely spoken'],
  ['Electricity', '230 V · 50 Hz · plug types D, M, G'],
  ['Driving', 'On the left'],
  ['Entry', 'Online ETA or visa on arrival'],
]

export const FAQ = [
  { q: 'Do I need a visa for Sri Lanka?', a: 'Most travellers need either an online Electronic Travel Authorisation (ETA) or a visa on arrival. We help you sort the right one before you fly — check the latest rules for your passport.' },
  { q: 'When is the best time to go?', a: 'It depends where. The south and west coasts are best from December to April, the east coast from May to September, and the hills stay pleasant from January to April. See the chart above — we’ll combine regions so you’re always on the sunny side.' },
  { q: 'How long should I stay?', a: 'Most guests choose 10–14 nights. The island is compact — most places are within half a day by road — so a week can cover a lot, but two weeks lets you slow down.' },
  { q: 'Can you tailor an itinerary?', a: 'That’s our default. Every journey here is a starting point: change the pace, the hotels, the regions, or start from scratch.' },
  { q: 'What’s included in the price?', a: 'Each journey lists exactly what’s included. We quote clearly — no hidden costs — and you’ll get a full breakdown before you commit.' },
]

export const SERVICES = [
  { icon: 'plane-arrival', title: 'Visa & ETA help', text: 'We guide you through the right entry authorisation for your passport.' },
  { icon: 'car', title: 'Airport transfers', text: 'A chauffeur meets you at Bandaranaike International in an air-conditioned vehicle.' },
  { icon: 'route', title: 'Tailor-made journeys', text: 'From a single retreat to a three-week loop, built around you.' },
]
