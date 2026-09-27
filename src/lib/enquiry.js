import { SITE } from '../data/site'

// Sends an enquiry. Set VITE_ENQUIRY_ENDPOINT (e.g. a Formspree/Basin/your own API URL) to POST JSON.
// With no endpoint configured, falls back to opening the visitor's email client with the enquiry pre-filled.
export async function submitEnquiry(data) {
  const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT
  if (endpoint) {
    const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) })
    if (!res.ok) throw new Error('Enquiry failed')
    return { via: 'api' }
  }
  const body = Object.entries(data).filter(([, v]) => v !== '' && v != null && !(Array.isArray(v) && !v.length))
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join('\n')
  window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent('Design my journey — ' + (data.name || 'enquiry'))}&body=${encodeURIComponent(body)}`
  return { via: 'mailto' }
}
