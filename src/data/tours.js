// 42 journeys migrated from hbdasia.com. Titles + durations are from the live site.
// `blurb` copy is DRAFT (written for the new voice) — confirm with ops before launch.
// `days` (full itineraries) exist for 4 journeys so far; the other 38 need itinerary copy from the live pages.

export const DOORS = [
  { id: 'adventure', label: 'Adventure', line: 'Trails, trains and wild places.', n: '01' },
  { id: 'relax', label: 'Relax', line: 'Slow days, warm sea, long lunches.', n: '02' },
  { id: 'wellness', label: 'Wellness', line: 'Restore, from the inside out.', n: '03' },
]

export const TAGS = [
  { id: 'culture', label: 'Culture' },
  { id: 'wildlife', label: 'Wildlife' },
  { id: 'beach', label: 'Beach' },
  { id: 'tea', label: 'Tea country' },
  { id: 'food', label: 'Food' },
  { id: 'family', label: 'Family' },
  { id: 'romance', label: 'Romance' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'signature', label: 'Island loops' },
]

export const CATEGORY_LABEL = {
  wellness: 'Wellness Holidays',
  adventure: 'Adventure & Sports',
  wildlife: 'Wildlife',
  beaches: 'Beaches',
  luxury: 'Luxury',
  tea: 'Tea Stays',
  culture: 'Culture & Heritage',
  architecture: 'Architectural Heritage',
  food: 'Wine & Dine',
  family: 'Family',
  packaged: 'Sri Lanka Packaged',
  honeymoon: 'Weddings & Honeymoon',
}

// t(category, slug, title, nights, door, tags, img, stops[], blurb, extra)
const t = (cat, slug, title, nights, door, tags, img, stops, blurb, extra = {}) => ({
  slug, title, cat, nights, door, tags, img, stops, blurb,
  url: `https://www.hbdasia.com/tours/${extra.path || cat}/${slug}.html`,
  ...extra,
})

export const TOURS = [
  // ── Wellness ───────────────────────────────────────────────
  t('wellness', 'ayurvedic-bliss', 'Ayurvedic Bliss', 7, 'wellness', [], 'ayurveda', ['colombo', 'wadduwa'],
    'Five days of daily Ayurvedic treatment at a seaside health resort — in-house physicians, a herbal garden to wander, and nothing else to plan.',
    {
      path: 'wellness-holidays', featured: true,
      stays: ['Ramada Colombo', 'Siddhalepa Health Resort'],
      included: ['Airport transfers', 'Accommodation', 'Daily resort meals', 'Personal Ayurvedic consultation with in-house physicians', 'Minimum 2.5 hours of treatments daily', 'Herbal garden tour'],
      notes: ['Alcohol is restricted on poya (full-moon) days.', 'Standard hotel check-in and check-out times apply.'],
      days: [
        { d: '01', title: 'Arrive in Colombo', place: 'Colombo', stay: 'Ramada Colombo', text: 'Meet your driver at the airport and transfer to Colombo. An easy first night to land and rest.' },
        { d: '02', title: 'Coast to Wadduwa', place: 'Wadduwa', stay: 'Siddhalepa Health Resort', text: 'A short drive south to the resort. Meet your physician for a personal consultation and settle into your treatment plan.' },
        { d: '03–07', title: 'Five days of treatment', place: 'Wadduwa', stay: 'Siddhalepa Health Resort', text: 'A minimum of 2.5 hours of therapies every day, combined with yoga and meditation. Tour the herbal garden and let the rhythm of the resort take over.' },
        { d: '08', title: 'Departure', place: 'Airport', text: 'Transfer to Bandaranaike International Airport for your flight home.' },
      ],
    }),
  t('wellness', 'surf-and-yoga', 'Surf and Yoga', 7, 'wellness', ['beach'], 'yoga-deck', ['negombo', 'galle', 'talalla'],
    'Restorative yoga, pranayama and meditation at a south-coast retreat, with a stop at Galle Fort on the way down.',
    {
      path: 'wellness-holidays', featured: true,
      stays: ['Jetwing Lagoon (Negombo)', 'Talalla Retreat'],
      included: ['Airport pickup', 'Breakfast', 'Galle Fort visit', 'Daily yoga sessions', 'Meditation and pranayama programme'],
      notes: ['Optional stop at the Bawa property in Bentota on the way to the airport, if time permits.'],
      days: [
        { d: '01', title: 'Arrive in Negombo', place: 'Negombo', stay: 'Jetwing Lagoon', text: 'About five kilometres from the airport, Negombo is a favourite first stop — a laid-back beach town to shake off the flight.' },
        { d: '02', title: 'South via Galle', place: 'Galle · Talalla', stay: 'Talalla Retreat', text: 'Drive south (around three hours), pausing to walk the cobbled streets of Galle Fort — a UNESCO-listed Dutch fortress with red-tiled villas and open verandas.' },
        { d: '03–07', title: 'Five days at Talalla', place: 'Talalla', stay: 'Talalla Retreat', text: 'Daily programme from 11:30 with two hours of practice followed by a restorative yoga session. Meditation and pranayama fill the rest of the day.' },
        { d: '08', title: 'Departure', place: 'Airport', text: 'Head back by expressway. If there is time, stop at the Bawa property in Bentota.' },
      ],
    }),
  t('wellness', 'harmony-in-the-highlands', 'Harmony in the Highlands', 7, 'wellness', [], 'spa', ['negombo', 'pinnawala', 'kandy'],
    'Six nights at Santani in the Knuckles Mountains: a personal Ayurveda assessment, daily Hatha yoga and cool mountain air.',
    {
      path: 'wellness-holidays', featured: true,
      stays: ['Jetwing Beach (Negombo)', 'Santani Resort and Spa (6 nights)'],
      included: ['Airport pickup', 'Elephant Orphanage visit', 'Personalised Ayurveda assessment', '90-minute wellness sessions', 'Daily Hatha yoga', 'Meals', 'Guided nature exploration'],
      days: [
        { d: '01', title: 'Arrive in Negombo', place: 'Negombo', stay: 'Jetwing Beach', text: 'Airport pickup and an easy first night by the sea.' },
        { d: '02', title: 'Up to the hills', place: 'Pinnawala · Kandy', stay: 'Santani Resort and Spa', text: 'Stop at the elephant orphanage at Pinnawala, where Asian elephants bathe in the Ma Oya river, then climb into the valley setting of Kandy.' },
        { d: '03–07', title: 'Five days of retreat', place: 'Knuckles Mountains', stay: 'Santani Resort and Spa', text: 'A personalised Ayurveda assessment, 90-minute sessions, daily Hatha yoga and time to explore the surrounding nature.' },
        { d: '08', title: 'Departure', place: 'Airport', text: 'Transfer to the airport two to three hours before your flight.' },
      ],
    }),

  // ── Adventure & wildlife ───────────────────────────────────
  t('adventure', 'rainforest-and-beaches', 'Rainforest & Beaches', 6, 'adventure', ['beach', 'wildlife'], 'rainforest', ['colombo', 'kandy', 'sinharaja', 'negombo'],
    'Trek the Knuckles Mountains, cycle through a UNESCO rainforest, then finish with sand between your toes.',
    {
      featured: true,
      stays: ['Bougainvillea Retreat', 'Hunas Falls', 'Boulder Garden', 'Jetwing Beach'],
      included: ['Airport transfers', 'Elephant village visit', 'Knuckles Mountains trek', 'Sinharaja forest trekking and cycling', 'Beach and spa day'],
      days: [
        { d: '01', title: 'Arrive in Colombo', place: 'Colombo', text: 'Transfer to your hotel in the island’s commercial hub for rest and orientation.' },
        { d: '02–03', title: 'Kandy and the Knuckles', place: 'Kandy', text: 'Visit an elephant village on the way to Kandy, the hill capital. On day three, trek into the Knuckles range — named for its resemblance to a clenched fist.' },
        { d: '04–05', title: 'Sinharaja rainforest', place: 'Sinharaja', text: 'A UNESCO World Heritage forest holding some 830 types of endemic flora and fauna across shifting altitudes. Trek its trails and cycle its edges.' },
        { d: '06', title: 'Beach day, Negombo', place: 'Negombo', text: 'Ease down with a beach day and spa treatment before departure.' },
        { d: '07', title: 'Departure', place: 'Airport', text: 'Airport transfer for your flight home.' },
      ],
    }),
  t('adventure', 'wildlife-and-adventure', 'Wildlife & Adventure', 7, 'adventure', ['wildlife'], 'rafting', ['kandy', 'kitulgala', 'yala'],
    'Safari drives in national parks paired with active days — trekking, rafting and cycling — in between.'),
  t('adventure', 'golfing-in-sri-lanka', 'Golfing in Sri Lanka', 10, 'adventure', ['luxury'], 'tea-hills', ['colombo', 'nuwara-eliya', 'galle'],
    'A golf-led journey, with culture, scenery and slow evenings between rounds.'),
  t('wildlife', 'the-big-four', 'The Big Four', 6, 'adventure', ['wildlife'], 'yala-leopard', ['yala', 'udawalawe', 'wilpattu'],
    'Leopards, elephants, sloth bears and more across Sri Lanka’s finest national parks.'),
  t('wildlife', 'birding', 'Birding', 7, 'adventure', ['wildlife'], 'birding', ['sinharaja', 'yala', 'nuwara-eliya'],
    'Dawn walks and quiet hides across rainforest, wetland and hill country — Sri Lanka’s endemics on your list.'),
  t('wildlife', 'wildlife-camping', 'Wildlife & Camping', 7, 'adventure', ['wildlife'], 'camping', ['yala', 'udawalawe', 'wilpattu'],
    'Sleep near the wild. Safari drives by day, camp fires and star-filled skies by night.'),
  t('beaches', 'surfing-in-the-east', 'Surfing in the East', 8, 'adventure', ['beach'], 'surf', ['arugam-bay', 'trincomalee'],
    'Follow the swell along the east coast — point breaks, empty sand and lazy afternoons.'),

  // ── Relax: beaches ─────────────────────────────────────────
  t('beaches', 'sun-sand-sea', 'Sun, Sand & Sea', 3, 'relax', ['beach'], 'mirissa', ['mirissa', 'galle'],
    'A short, slow escape to the coast. Long beaches, warm sea, nowhere to be.'),
  t('beaches', 'palm-fringed-island', 'Palm Fringed Island', 5, 'relax', ['beach'], 'door-relax', ['galle', 'mirissa'],
    'Five nights among the palms — swim, snorkel and drift from beach to beach.'),
  t('beaches', 'beaches-wildlife', 'Beaches & Wildlife', 7, 'relax', ['beach', 'wildlife'], 'whales', ['yala', 'mirissa'],
    'Safari at first light, the sea by afternoon. The best of both Sri Lankas in one week.'),
  t('beaches', 'sun-and-fun', 'Sun and Fun', 5, 'relax', ['beach', 'family'], 'family', ['negombo', 'galle'],
    'Easy days on the sand with activities when the mood strikes.'),
  t('beaches', 'the-peninsula-experience', 'The Peninsula Experience', 3, 'relax', ['beach'], 'trinco', ['trincomalee'],
    'A compact break by the water with clear seas and space to breathe.'),

  // ── Relax: luxury ──────────────────────────────────────────
  t('luxury', 'beach-wildlife', 'Beach & Wildlife — Luxury', 7, 'relax', ['luxury', 'beach', 'wildlife'], 'villa', ['yala', 'galle'],
    'Handpicked stays, private safaris and a beachside finish with a personal touch throughout.', { name: 'Beach & Wildlife' }),
  t('luxury', 'tea-culture', 'Tea & Culture — Luxury', 7, 'relax', ['luxury', 'tea', 'culture'], 'tea-hills', ['kandy', 'nuwara-eliya'],
    'Plantation bungalows, ancient cities and elegant dining — curated end to end.', { name: 'Tea & Culture' }),
  t('luxury', 'serendipity', 'Serendipity — Luxury', 7, 'relax', ['luxury'], 'villa', ['sigiriya', 'kandy', 'galle'],
    'A journey built around chance discoveries and beautiful places to come home to.', { name: 'Serendipity' }),

  // ── Relax: tea stays ───────────────────────────────────────
  t('tea', 'tea-with-a-twist', 'Tea with a Twist', 10, 'relax', ['tea'], 'tea-hills', ['kandy', 'nuwara-eliya', 'ella'],
    'Ten nights through Ceylon tea country — factories, plantation bungalows and misty mountain walks.', { path: 'tea-stays' }),
  t('tea', 'the-high-and-low-grown', 'The High and Low Grown', 6, 'relax', ['tea'], 'ella-gap', ['nuwara-eliya', 'ella'],
    'Taste the difference between high-grown and low-grown tea, from the cool peaks down to the warm foothills.', { path: 'tea-stays' }),
  t('tea', 'the-highland-experience', 'The Highland Experience', 4, 'relax', ['tea'], 'tea-hills', ['nuwara-eliya'],
    'Four nights in the highlands: train windows, plantation walks and tastings.', { path: 'tea-stays' }),

  // ── Culture / architecture / food ──────────────────────────
  t('culture', 'culture-and-literary-festival', 'Culture & Literary Festival', 6, null, ['culture'], 'galle-fort', ['galle', 'colombo'],
    'Time your trip with Galle’s literary festival, then unfold the island’s culture around it.', { path: 'culture-and-heritage' }),
  t('culture', 'the-full-experience', 'The Full Experience', 13, null, ['culture', 'signature'], 'sigiriya', ['anuradhapura', 'sigiriya', 'kandy', 'galle'],
    'Thirteen nights across ancient cities, sacred temples and living traditions.', { path: 'culture-and-heritage' }),
  t('culture', 'back-in-time', 'Back in Time', 5, null, ['culture'], 'polonnaruwa', ['polonnaruwa', 'sigiriya', 'dambulla'],
    'The Cultural Triangle in five nights — ruins, rock fortresses and cave temples.', { path: 'culture-and-heritage' }),
  t('architecture', 'fusion-sri-lanka', 'Fusion Sri Lanka', 6, null, ['culture'], 'bawa', ['sigiriya', 'kandy', 'galle'],
    'Ancient and modern architecture side by side, from Sigiriya to Galle Fort.', { path: 'architectural-heritage' }),
  t('architecture', 'the-geoffrey-bawa-trail', 'The Geoffrey Bawa Trail', 6, null, ['culture'], 'bawa', ['colombo', 'bentota', 'galle'],
    'Follow the buildings and gardens of Sri Lanka’s most celebrated architect.', { path: 'architectural-heritage' }),
  t('architecture', 'the-colonial-trail', 'The Colonial Trail', 6, null, ['culture'], 'galle-fort', ['colombo', 'kandy', 'galle'],
    'Portuguese, Dutch and British layers, from the forts to the hill-country bungalows.', { path: 'architectural-heritage' }),
  t('food', 'culinary-break', 'Culinary Break', 5, null, ['food'], 'food', ['colombo', 'galle'],
    'Five nights of cooking classes, street food and long tables.', { path: 'wine-dine' }),
  t('food', 'flavours-of-sri-lanka', 'Flavours of Sri Lanka', 10, null, ['food', 'culture'], 'food', ['colombo', 'kandy', 'galle'],
    'A ten-night island-wide tasting menu — from hill-country tea to south-coast seafood.', { path: 'wine-dine' }),
  t('food', 'spice-trails', 'Spice Trails', 7, null, ['food', 'culture'], 'spices', ['kandy', 'matale'],
    'Cinnamon, cardamom and curry leaf — a week following the spice routes.', { path: 'wine-dine' }),

  // ── Family ─────────────────────────────────────────────────
  t('family', 'a-family-affair', 'A Family Affair', 5, null, ['family'], 'family', ['negombo', 'kandy'],
    'A gentle five-night introduction for all ages.'),
  t('family', 'serendipity-family', 'Serendipity — Family', 6, null, ['family'], 'elephants', ['sigiriya', 'kandy', 'galle'],
    'Elephants, beaches and a rock fortress — the highlights, at a family’s pace.', { path: 'family', name: 'Serendipity', slugPath: 'serendipity' }),
  t('family', 'good-times-together', 'Good Times Together', 9, null, ['family'], 'family', ['kandy', 'yala', 'galle'],
    'Nine nights that keep everyone busy and happy.'),
  t('family', 'a-tropical-experience', 'A Tropical Experience', 12, null, ['family', 'beach'], 'mirissa', ['sigiriya', 'kandy', 'galle'],
    'Twelve nights of jungle, hills and beach for the whole family.'),

  // ── Signature island loops ─────────────────────────────────
  t('packaged', 'sri-lanka-highlights', 'Sri Lanka Highlights', 5, null, ['signature'], 'sigiriya', ['sigiriya', 'kandy'],
    'Five nights, the unmissable places.', { path: 'sri-lanka-packaged' }),
  t('packaged', 'paradise-island-packaged', 'Paradise Island', 12, null, ['signature', 'beach'], 'door-relax', ['sigiriya', 'kandy', 'galle'],
    'Twelve nights across the island, ending by the sea.', { path: 'sri-lanka-packaged' }),
  t('packaged', 'wanderlust-sri-lanka', 'Wanderlust', 12, null, ['signature'], 'ella-gap', ['sigiriya', 'kandy', 'ella', 'yala'],
    'For the curious — a fuller loop through hills, jungle and coast.', { path: 'sri-lanka-packaged' }),
  t('packaged', 'so-sri-lanka-serendipity', 'So Sri Lanka — Serendipity', 13, null, ['signature'], 'kandy', ['sigiriya', 'kandy', 'nuwara-eliya', 'galle'],
    'Thirteen nights, room for surprises.', { path: 'sri-lanka-packaged' }),
  t('packaged', 'ultimate-sri-lanka', 'Ultimate Sri Lanka', 21, null, ['signature'], 'hero-ella-train', ['colombo', 'sigiriya', 'kandy', 'ella', 'yala', 'galle'],
    'Three weeks. The whole island.', { path: 'sri-lanka-packaged', featured: true }),

  // ── Romance ────────────────────────────────────────────────
  t('honeymoon', 'intimate-sri-lanka', 'Intimate Sri Lanka', 9, null, ['romance'], 'villa', ['kandy', 'nuwara-eliya', 'galle'],
    'Nine nights of private, hand-picked places for two.', { path: 'weddings-honeymoon' }),
  t('honeymoon', 'romantic-escapes', 'Romantic Escapes', 7, null, ['romance', 'beach'], 'villa', ['galle', 'mirissa'],
    'A week for two — candlelit dinners, warm sea and time slowed down.', { path: 'weddings-honeymoon' }),
  t('honeymoon', 'the-cultural-experience', 'The Cultural Experience', 7, null, ['romance', 'culture'], 'kandy', ['sigiriya', 'kandy'],
    'Share the island’s ancient stories, then retreat somewhere beautiful.', { path: 'weddings-honeymoon' }),
]

// Normalise: display title, days count, category label.
export const JOURNEYS = TOURS.map((x) => ({
  ...x,
  title: x.name || x.title,
  days: x.days || null,
  daysCount: x.nights + 1,
  category: CATEGORY_LABEL[x.cat],
  url: `https://www.hbdasia.com/tours/${x.path || (x.cat === 'adventure' ? 'adventure-and-sports' : x.cat)}/${x.slugPath || x.slug}.html`,
}))

export const bySlug = (slug) => JOURNEYS.find((j) => j.slug === slug)
export const featured = () => JOURNEYS.filter((j) => j.featured)
