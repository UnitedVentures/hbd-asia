import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Deployed as a GitHub Pages *project* site → served in production at
// https://<owner>.github.io/hbd-asia/, not at the domain root. Every asset
// reference in the app goes through `import.meta.env.BASE_URL` (see
// src/lib/asset.js) so it resolves correctly under this subpath.
//
// `npm run dev` stays at "/" — only the production build gets the subpath —
// so the local workflow (localhost:5173/) is unaffected.
//
// Overriding: if this ever moves to its own domain/org page (served from
// "/"), or to a differently-named repo, set VITE_BASE_PATH when building —
// e.g. `VITE_BASE_PATH=/ npm run build` — instead of editing this file. If
// you do, also update `pathSegmentsToKeep` in public/404.html to match.
export default defineConfig(({ command }) => ({
  base: process.env.VITE_BASE_PATH || (command === 'build' ? '/hbd-asia/' : '/'),
  plugins: [react()],
}))
