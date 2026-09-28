// Resolves a path in /public against the app's actual deployed base path
// (see vite.config.js). Never hardcode a leading-slash asset path directly
// in a component — it silently breaks under a non-root base (e.g. GitHub
// Pages project sites) because a root-absolute URL always resolves against
// the domain root, not wherever the app happens to be served from.
//
// Usage: asset('images/foo.jpg') → '/hbd-asia/images/foo.jpg' in production,
// '/images/foo.jpg' in local dev.
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
