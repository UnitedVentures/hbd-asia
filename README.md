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
| Display titles | **Tan Pearl** (`src/assets/fonts/tan-pearl.woff` — kept under `src/`, not `public/`, so Vite hashes and base-prefixes it; see Deploying below), Cormorant Garamond as fallback (`--f-display` in `src/styles/index.css`) |
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

## Deploying (GitHub Pages)
This is a Vite SPA — **the built `dist/` output must be what gets published, never the raw repo.** Pushing/uploading the source as-is (which is what happened the first time this went live) serves `index.html` completely unprocessed: `%BASE_URL%` stays a literal string instead of being substituted, `<script src="/src/main.jsx">` 404s because browsers can't run unbundled JSX, and every import is missing. There is no way to make raw source work directly on GitHub Pages — it must be built first.

**Fix: let GitHub Actions build it.** `.github/workflows/deploy.yml` already does this — on every push to `main` it runs `npm ci && npm run build` and publishes `dist/`. One-time setup, in whichever repo actually serves `unitedventures.github.io/hbd-asia/` (this local checkout's `origin` remote may not be that repo — confirm before assuming):
1. Push this repo (including the new `.github/workflows/deploy.yml`) to it.
2. In that repo on GitHub: **Settings → Pages → Build and deployment → Source → "GitHub Actions"** (not "Deploy from a branch" — that's the setting that was serving the raw source).
3. Push to `main` (or run the workflow manually from the **Actions** tab) and wait for it to go green.

That's the whole pipeline going forward — no manual `dist/` copying, no `gh-pages` branch.

Separately, because this is a GitHub Pages **project** site (served at `/hbd-asia/`, not the domain root), two things are already handled but easy to break if you're not aware of them:

1. **Every asset reference must go through `src/lib/asset.js`'s `asset()` helper** (or, in `index.html`, the `%BASE_URL%` placeholder), never a hardcoded `/images/foo.jpg`-style path. A literal leading-slash path always resolves against the *domain* root, not wherever the app is actually served from. `npm run dev` stays at `/` (so this is invisible locally); only `npm run build` applies the `/hbd-asia/` prefix (see `vite.config.js`). If the repo is ever renamed or moved to its own domain, set `VITE_BASE_PATH` at build time (e.g. `VITE_BASE_PATH=/ npm run build`) rather than editing paths by hand — and update `pathSegmentsToKeep` in `public/404.html` to match.
2. **Deep links need a fallback.** GitHub Pages has no server-side router, so a direct visit (or refresh) on e.g. `/hbd-asia/journeys` 404s unless something redirects it back to `index.html`. `public/404.html` + the small script in `index.html`'s `<head>` handle this (the standard [spa-github-pages](https://github.com/rafgraph/spa-github-pages) trick) — don't remove them.

To sanity-check a production build locally before pushing: `npm run build && npm run preview`, then open `http://localhost:4173/hbd-asia/` (not the bare root — Vite preview honours the same base).

## Enquiry form
`src/lib/enquiry.js` — set `VITE_ENQUIRY_ENDPOINT` (Formspree, Basin, your own API) to POST JSON. With no endpoint it opens the visitor's email client pre-filled to `info@hbdasia.com`. **Add a real endpoint (+ spam protection) before launch.**

## Before launch checklist
- [ ] Real team photo (`team.jpg`); review Unsplash photos with people
- [ ] Verify draft copy in `tours.js` / `destinations.js` / `site.js`
- [ ] Reviews: only one verbatim quote captured — import the rest with permission, or embed TripAdvisor/Google
- [ ] Privacy / Terms pages (currently placeholders) — GDPR, Australian Privacy Principles, US state laws
- [ ] Team page content; remove dev notes shown on About / Legal pages
- [ ] 301 redirects from old `.html` URLs (map in `docs/01-sitemap-and-content-audit.md`)
- [ ] Delete unused Vite starter files in `src/assets/`
- [ ] SEO: per-page `<title>`/meta, sitemap.xml, JSON-LD (`TouristTrip`, `TravelAgency`), prerender/SSR if organic search matters (SPA is weak for SEO out of the box)
