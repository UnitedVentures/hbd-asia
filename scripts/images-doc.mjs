// Generates ../docs/02-image-shot-list.md from src/data/images.js  →  `npm run images:doc`
import { writeFileSync, mkdirSync } from 'node:fs'
import { IMAGES } from '../src/data/images.js'
import { CREDITS } from '../src/data/credits.js'

const slug = (q) => encodeURIComponent(q).replace(/%20/g, '-')
const unsplash = (q) => `https://unsplash.com/s/photos/${slug(q)}`
const pexels = (q) => `https://www.pexels.com/search/${encodeURIComponent(q)}/`
const dims = { '16/9': '2400 × 1350', '4/5': '1600 × 2000', '3/2': '1800 × 1200' }

const rows = Object.entries(IMAGES).map(([key, m], i) => `### ${String(i + 1).padStart(2, '0')} · \`${m.file}\`
- **Where:** ${m.where}
- **Status:** ${CREDITS[key] ? `✅ in place — photo by [${CREDITS[key].by}](${CREDITS[key].url}) on Unsplash` : '⬜ placeholder — add your own photo (or pick one from the links below)'}
- **Find it:** [Unsplash](${unsplash(m.q)}) · [Pexels](${pexels(m.q)})  — search: _${m.q}_
- **Crop / size:** ${m.ratio.replace('/', ':')} · at least ${dims[m.ratio] || '1800 wide'} px · export JPG, quality 80, < 400 KB
- **Optional polish:** ${m.edit}
- **Alt text (already in code):** ${m.alt}
`).join('\n')

const out = `# Image shot list (auto-generated — do not edit by hand)

Regenerate with \`npm run images:doc\` after changing \`src/data/images.js\`.

**How to use:** photos marked ✅ are already in \`hbd-asia/public/images/\` (Unsplash, cropped to the slot's ratio and compressed). To swap one, open the links, pick another shot, apply the polish notes, export at the size shown and overwrite the file in \`hbd-asia/public/images/\`. The site swaps the placeholder for the photo automatically — no code changes.

> Links are *search pages*, not specific photos — I can't verify individual photo licences or IDs from here. Check each photo's licence (Unsplash / Pexels licences allow commercial use; avoid identifiable people without a release) or, better, use your own photography for the hero, wellness and team shots.

## Global grade — apply to every photo (or the set won't feel cohesive)
| | |
|---|---|
| Overall | Light, airy, natural. Contrast +5, saturation −10, lift blacks slightly (matte). |
| Palette | Greens toward teal, warm highlights toward the brand yellow **#F5B21A** (soft-light, 5–10%). Keep skin tones natural. |
| Grain | Fine film grain, ~8%. |
| Text | Never bake text or logos into photos. |
| Format | JPG q80 (or WebP q75). Long edge ≤ 2400 px. |

## Effects already done in code — do NOT bake these in
- Torn-paper bottom edge on hero images
- Slow zoom-out on load and scroll parallax
- Dark gradient overlays behind white text
- Site-wide light grade filter (\`saturate .92, contrast 1.04\`)
- Hover zoom on cards

---

${rows}

---

## Credits (Unsplash)
Unsplash's licence doesn't require attribution, but crediting photographers is good practice — consider a small credits line in the footer or on the About page.

| Photo | Photographer | Source |
|---|---|---|
${Object.entries(CREDITS).map(([k, c]) => `| \`${IMAGES[k].file}\` | ${c.by} | [${c.id}](${c.url}) |`).join('\n')}

**Cautions:** several photos show recognisable people (e.g. the Wellness door). Unsplash doesn't guarantee model releases, so for hero-level people shots prefer your own photography before launch. Map geometry credit: [Simplemaps.com](https://simplemaps.com).
`
mkdirSync('../docs', { recursive: true })
writeFileSync('../docs/02-image-shot-list.md', out)
console.log(`Wrote docs/02-image-shot-list.md (${Object.keys(IMAGES).length} images)`)
