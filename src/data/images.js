// Image manifest — single source of truth for every photo on the site.
// Drop the edited file into /public/images/<file>. Until it exists, <Img> renders a topographic placeholder.
// `q` = search phrase used to build the stock-library links in docs/02-image-shot-list.md (run `npm run images:doc`).
// `edit` = the grade / crop to apply. Effects marked [CSS] are already done in code — don't bake them in.

export const IMAGES = {
  'hero-ella-train': {
    file: 'hero-ella-train.jpg', ratio: '16/9', tone: 'dark', where: 'Home hero',
    alt: 'A blue train crossing the Nine Arches Bridge above green hills in Sri Lanka',
    q: 'nine arches bridge ella train',
    edit: 'Crop 16:9, min 2400px wide. Keep train on the right third; leave mist/sky top-left free for the title. Shadows +20, greens −10 saturation and nudged toward teal, fine film grain. [CSS] top gradient, torn-paper bottom edge, slow zoom.',
  },
  'hero-leopard': {
    file: 'hero-leopard.jpg', ratio: '16/9', tone: 'dark', where: 'Home hero',
    alt: 'A leopard walking across open ground in Yala National Park',
    q: 'yala leopard',
    edit: 'Crop 16:9, min 2400px wide. Keep the leopard on the right third; leave space top-left for the title. Desaturate background slightly to make the subject pop. [CSS] top gradient, torn-paper bottom edge, slow zoom.',
  },
  'door-adventure': {
    file: 'door-adventure.jpg', ratio: '4/5', tone: 'dark', where: 'Home · door 01',
    alt: 'A sheer cliff above a misty valley in the Sri Lankan hill country',
    q: 'horton plains worlds end trek',
    edit: 'Portrait 4:5. Contrast +10, saturation −20, cool the shadows (matches the MNTN reference). Subject in lower third.',
  },
  'door-relax': {
    file: 'door-relax.jpg', ratio: '4/5', tone: 'dark', where: 'Home · door 02',
    alt: 'Palm trees leaning over a turquoise bay on the south coast',
    q: 'mirissa beach palm sunset',
    edit: 'Portrait 4:5. Warm grade — add a soft-light overlay of #F5B21A at ~10%. Lift exposure slightly; keep horizon dead level.',
  },
  'door-wellness': {
    file: 'door-wellness.jpg', ratio: '4/5', tone: 'dark', where: 'Home · door 03',
    alt: 'A woman meditating on a mat in a garden beside a colonial veranda',
    q: 'yoga retreat sri lanka jungle',
    edit: 'Portrait 4:5. Matte look: lift blacks +12, saturation −25, soften highlights. Calm and airy, no bright colour.',
  },
  sigiriya: {
    file: 'sigiriya.jpg', ratio: '3/2', tone: 'dark', where: 'Destinations · Journeys',
    alt: 'Sigiriya Rock Fortress rising above the jungle canopy',
    q: 'sigiriya rock aerial',
    edit: 'Crop 3:2. Dehaze +10, keep golden-hour light. Rock slightly off-centre.',
  },
  dambulla: {
    file: 'dambulla.jpg', ratio: '3/2', tone: 'dark', where: 'Destinations',
    alt: 'Golden Buddha statues inside the Dambulla cave temple',
    q: 'dambulla cave temple buddha',
    edit: 'Crop 3:2. Warm the gold, reduce noise, keep deep shadows.',
  },
  kandy: {
    file: 'kandy.jpg', ratio: '3/2', tone: 'dark', where: 'Destinations · Culture journeys',
    alt: 'The Temple of the Sacred Tooth Relic in Kandy',
    q: 'temple of the tooth kandy lake',
    edit: 'Crop 3:2. Cool blue-hour sky, warm temple lights. Straighten verticals.',
  },
  perahera: {
    file: 'perahera.jpg', ratio: '3/2', tone: 'dark', where: 'Plan · Events calendar',
    alt: 'Fire dancers performing in the Kandy Esala Perahera',
    q: 'kandy esala perahera elephant',
    edit: 'Crop 3:2. Boost warm lights, protect blacks. Motion blur is fine.',
  },
  'galle-fort': {
    file: 'galle-fort.jpg', ratio: '3/2', tone: 'dark', where: 'Destinations · Beach & heritage',
    alt: 'Galle Fort lighthouse and ramparts beside the sea',
    q: 'galle fort lighthouse',
    edit: 'Crop 3:2. Slightly desaturate sea; keep the lighthouse white and crisp.',
  },
  'tea-hills': {
    file: 'tea-hills.jpg', ratio: '3/2', tone: 'dark', where: 'Tea stays · Hill country',
    alt: 'Rolling tea plantations in the Nuwara Eliya highlands',
    q: 'nuwara eliya tea plantation',
    edit: 'Crop 3:2. Greens −10 saturation, add a hint of mist (dehaze −10 on the far ridge). Pickers in frame if possible.',
  },
  'ella-gap': {
    file: 'ella-gap.jpg', ratio: '3/2', tone: 'dark', where: 'Destinations',
    alt: 'A steep green ridge above Ella in the hill country',
    q: 'ella gap sunrise',
    edit: 'Crop 3:2. Soft, hazy morning grade; lift shadows.',
  },
  'adams-peak': {
    file: 'adams-peak.jpg', ratio: '3/2', tone: 'dark', where: 'Adventure journeys',
    alt: 'A mountain silhouetted against the dusk sky in the Sri Lankan highlands',
    q: 'adams peak sunrise',
    edit: 'Crop 3:2. Keep the light trail of the stairway visible; grade cool-to-warm.',
  },
  rainforest: {
    file: 'rainforest.jpg', ratio: '16/9', tone: 'dark', where: 'Adventure · dark feature band',
    alt: 'Lush rainforest canopy in south-west Sri Lanka',
    q: 'sinharaja rainforest mist',
    edit: 'Crop 16:9. Darken −0.5 EV, push shadows teal-green, low saturation — the moody Karelia look.',
  },
  rafting: {
    file: 'rafting.jpg', ratio: '3/2', tone: 'dark', where: 'Adventure journeys',
    alt: 'A river rushing over rocks through forest at Kitulgala',
    q: 'kitulgala white water rafting',
    edit: 'Crop 3:2. Boost contrast; keep motion.',
  },
  'yala-leopard': {
    file: 'yala-leopard.jpg', ratio: '3/2', tone: 'dark', where: 'Wildlife journeys',
    alt: 'A leopard walking across open ground in Yala National Park',
    q: 'yala leopard',
    edit: 'Crop 3:2 with eye-line on upper third. Desaturate background slightly to make the subject pop.',
  },
  elephants: {
    file: 'elephants.jpg', ratio: '3/2', tone: 'dark', where: 'Wildlife · Family',
    alt: 'Wild elephants wading in a lake',
    q: 'udawalawe elephants herd',
    edit: 'Crop 3:2. Warm dust-light, contrast +8.',
  },
  camping: {
    file: 'camping.jpg', ratio: '3/2', tone: 'dark', where: 'Wildlife & Camping',
    alt: 'A lone tree on the savannah with a safari vehicle in the distance',
    q: 'safari camp tent dusk sri lanka',
    edit: 'Crop 3:2. Blue hour sky, warm tent glow.',
  },
  wilpattu: {
    file: 'wilpattu.jpg', ratio: '3/2', tone: 'dark', where: 'Wildlife journeys',
    alt: 'A leopard drinking water in Wilpattu National Park',
    q: 'wilpattu leopard',
    edit: 'Crop 3:2 with eye-line on upper third. Desaturate background slightly to make the subject pop.',
  },
  birding: {
    file: 'birding.jpg', ratio: '3/2', tone: 'dark', where: 'Birding',
    alt: 'A green bee-eater perched on a branch',
    q: 'sri lanka bee eater bird',
    edit: 'Crop 3:2 tight on bird. Clean backdrop; mild sharpening.',
  },
  mirissa: {
    file: 'mirissa.jpg', ratio: '3/2', tone: 'dark', where: 'Beaches',
    alt: 'Stilt fishermen on the south coast',
    q: 'stilt fishermen sri lanka',
    edit: 'Crop 3:2. Warm soft-light grade; keep silhouettes crisp.',
  },
  whales: {
    file: 'whales.jpg', ratio: '3/2', tone: 'dark', where: 'Beaches · Wildlife',
    alt: 'A humpback whale’s tail rising above the sea',
    q: 'blue whale mirissa',
    edit: 'Crop 3:2. Deep blue grade, contrast +10.',
  },
  trinco: {
    file: 'trinco.jpg', ratio: '3/2', tone: 'dark', where: 'Beaches · East coast',
    alt: 'A fishing boat on calm water at dusk near Trincomalee',
    q: 'pigeon island trincomalee snorkel',
    edit: 'Crop 3:2. Boost aqua slightly; keep whites clean.',
  },
  surf: {
    file: 'surf.jpg', ratio: '3/2', tone: 'dark', where: 'Surf journeys',
    alt: 'A surfer riding a wave at Weligama at sunrise',
    q: 'weligama surf sunrise',
    edit: 'Crop 3:2. Golden-hour grade; leave space on the left.',
  },
  ayurveda: {
    file: 'ayurveda.jpg', ratio: '3/2', tone: 'dark', where: 'Wellness',
    alt: 'Herbs being ground in a stone mortar and pestle',
    q: 'ayurveda herbs oil treatment',
    edit: 'Crop 3:2. Warm, matte; saturation −15. Shallow depth of field preferred.',
  },
  'yoga-deck': {
    file: 'yoga-deck.jpg', ratio: '3/2', tone: 'dark', where: 'Wellness',
    alt: 'A group practising yoga on the beach at sunrise',
    q: 'yoga deck ocean morning',
    edit: 'Crop 3:2. Lift shadows, soft cool morning light.',
  },
  spa: {
    file: 'spa.jpg', ratio: '3/2', tone: 'dark', where: 'Wellness · Highlands',
    alt: 'A modern retreat house among tropical forest',
    q: 'hillside spa retreat mist sri lanka',
    edit: 'Crop 3:2. Matte, fresh green-grey grade.',
  },
  food: {
    file: 'food.jpg', ratio: '3/2', tone: 'dark', where: 'Wine & Dine',
    alt: 'A Sri Lankan rice and curry spread on banana leaf',
    q: 'sri lankan rice and curry',
    edit: 'Crop 3:2, top-down. Boost warmth and colour separation.',
  },
  spices: {
    file: 'spices.jpg', ratio: '3/2', tone: 'dark', where: 'Spice Trails',
    alt: 'Cinnamon quills and whole spices at a market stall',
    q: 'ceylon cinnamon spices market',
    edit: 'Crop 3:2. Warm, high clarity.',
  },
  bawa: {
    file: 'bawa.jpg', ratio: '3/2', tone: 'dark', where: 'Architectural heritage',
    alt: 'A veranda and courtyard pool framed by palm trees',
    q: 'geoffrey bawa lunuganga',
    edit: 'Crop 3:2. Straighten verticals, neutral warm whites.',
  },
  villa: {
    file: 'villa.jpg', ratio: '3/2', tone: 'dark', where: 'Honeymoon · Luxury',
    alt: 'A private villa pool surrounded by tropical garden',
    q: 'sri lanka villa pool sunset',
    edit: 'Crop 3:2. Warm highlights, deep shadows; keep clean and uncluttered.',
  },
  family: {
    file: 'family.jpg', ratio: '3/2', tone: 'dark', where: 'Family',
    alt: 'A family walking hand in hand along a beach at sunset',
    q: 'family beach sri lanka',
    edit: 'Crop 3:2. Bright, natural; avoid over-saturation.',
  },
  polonnaruwa: {
    file: 'polonnaruwa.jpg', ratio: '3/2', tone: 'dark', where: 'Culture · Destinations',
    alt: 'Stone steps and pillars of the ancient city of Polonnaruwa',
    q: 'polonnaruwa gal vihara buddha',
    edit: 'Crop 3:2. Contrast +8; warm stone tones.',
  },
  colombo: {
    file: 'colombo.jpg', ratio: '3/2', tone: 'dark', where: 'Destinations',
    alt: 'The Lotus Tower above Colombo at golden hour with a train passing below',
    q: 'colombo skyline lotus tower dusk',
    edit: 'Crop 3:2. Blue-hour grade.',
  },
  team: {
    file: 'team.jpg', ratio: '4/5', tone: 'dark', where: 'About',
    alt: 'The Holidays by Design team',
    q: 'sri lanka local guide portrait',
    edit: 'Use your own photo — shoot the real team. Portrait 4:5, natural light, gentle warm grade.',
  },
}

export const imageKeys = Object.keys(IMAGES)
