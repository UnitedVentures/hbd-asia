import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource/poppins/latin-300.css'
import '@fontsource/poppins/latin-400.css'
import '@fontsource/poppins/latin-500.css'
import '@fontsource/poppins/latin-600.css'
import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/ibm-plex-mono/latin-500.css'
import '@fontsource/cormorant-garamond/latin-400.css'
import '@fontsource/cormorant-garamond/latin-500.css'
import '@fontsource/cormorant-garamond/latin-400-italic.css'
import './styles/index.css'
import './styles/components.css'
import './styles/pages.css'
import App from './App.jsx'

// Deployed under a subpath in production (see vite.config.js) — react-router needs to know
// about it, or every route match fails and the app falls through to the 404 page. BASE_URL is
// '/hbd-asia/' in prod, '/' in dev; basename must not have a trailing slash (empty is fine, and
// matches root behaviour exactly, for local dev).
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
