# Holidays by Design — new site (React + Vite)

Minimal, light-themed (black · white · yellow `#F5B21A`) marketing site for US / EU / AU travellers.

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build → dist/
npm run images:doc   # regenerate ../docs/02-image-shot-list.md from src/data/images.js
npm run map:build    # rebuild src/data/lkMap.js from src/assets/source/lk.svg
```

**Stack:** React 19 · Vite · react-router · [motion](https://motion.dev) (animation) · Lenis (smooth scroll) · Tabler Icons · Fontsource (Poppins, IBM Plex Mono, Cormorant Garamond).

## Type
| Role | Font |
|---|---|
| Display titles | **Tan Pearl** (`public/fonts/tan-pearl.woff`), Cormorant Garamond as fallback (`--f-display` in `src/styles/index.css`) |
| Headings, body, UI | Poppins |
| Numbers, labels, eyebrows, details, links | IBM Plex Mono |

## Where things live
```
src/data/tours.js          42 journeys (titles + nights from live site; blurbs are DRAFT; 4 have full itineraries)
src/data/destinations.js   23 places with real lon/lat + island outline (drives the map)
src/data/site.js           contact, nav, promises, events, seasons, FAQ, reviews
src/data/images.js         every photo: filename, crop, edit, search phrase
src/components/            Layout, Img (placeholder fallback), Motion (Reveal/Lines/Counter/Marquee), IslandMap, TourCard, SeasonChart
src/pages/                 Home, Journeys, JourneyDetail, Destinations, Design (3-step enquiry), Info (Plan, Stories, About, Contact, Groups, Legal)
```

## Photos
32 of 33 slots are filled with Unsplash photos (cropped to each slot's ratio, ~9 MB total) in `public/images/`; credits are in `src/data/credits.js` and `docs/02-image-shot-list.md`. The `team` slot is deliberately empty — use a real team photo. To swap a photo, overwrite `public/images/<filename from images.js>`. Missing files fall back to a labelled topographic placeholder.

## Interactive map
`IslandMap` renders the real Sri Lanka district geometry (Simplemaps SVG → `src/data/lkMap.js`) with a projection fitted to the file's own lat/lon reference points, so destination `lon/lat` in `destinations.js` land exactly. Features: hover a district for its name, hover a pin for a photo marker, scroll-drawn route with icon badges on stops reached and the current stop's photo. Each destination has a `district` (ISO code, highlighted) and `icon` (key in `components/Icon.jsx`). Colours live in `components.css` (`--land`, `--land-line`, `.imap__*`).

## Enquiry form
`src/lib/enquiry.js` — set `VITE_ENQUIRY_ENDPOINT` (Formspree, Basin, your own API) to POST JSON. With no endpoint it opens the visitor's email client pre-filled to `info@hbdasia.com`. **Add a real endpoint (+ spam protection) before launch.**

## Before launch checklist
- [ ] Real team photo (`team.jpg`); review Unsplash photos with people
- [ ] Replace the wordmark in `Bits.jsx → Logo` with the official SVG logo
- [ ] Verify draft copy in `tours.js` / `destinations.js` / `site.js`
- [ ] Reviews: only one verbatim quote captured — import the rest with permission, or embed TripAdvisor/Google
- [ ] Privacy / Terms pages (currently placeholders) — GDPR, Australian Privacy Principles, US state laws
- [ ] Team page content; remove dev notes shown on About / Legal pages
- [ ] 301 redirects from old `.html` URLs (map in `docs/01-sitemap-and-content-audit.md`)
- [ ] Delete unused Vite starter files in `src/assets/`
- [ ] SEO: per-page `<title>`/meta, sitemap.xml, JSON-LD (`TouristTrip`, `TravelAgency`), prerender/SSR if organic search matters (SPA is weak for SEO out of the box)
