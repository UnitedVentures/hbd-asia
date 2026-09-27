import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import Icon from './Icon'
import { Logo, Button } from './Bits'
import { NAV, SITE } from '../data/site'
import { EASE } from './Motion'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  // pages that open with a full-bleed dark photo
  const darkHero = pathname === '/' || /^\/(journeys|destinations)\/[^/]+$/.test(pathname)
  const overHero = darkHero && !scrolled

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 60)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])

  return (
    <>
      <header className={`header ${overHero ? 'header--hero' : ''} ${scrolled ? 'header--solid' : ''}`}>
        <div className="header__in">
          <Link to="/" aria-label="Holidays by Design — home"><Logo light={overHero} /></Link>
          <nav className="header__nav" aria-label="Main">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => `header__link ${isActive ? 'is-active' : ''}`}>
                <span>{n.label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="header__cta">
            <Button to="/design-your-journey" variant="yellow" className="btn--sm">Design your journey</Button>
          </div>
          <button className="header__burger" onClick={() => setOpen(true)} aria-label="Open menu"><Icon name="menu" size={26} /></button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="drawer" initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.6, ease: EASE }}>
            <div className="drawer__top">
              <Logo light />
              <button className="header__burger" onClick={() => setOpen(false)} aria-label="Close menu"><Icon name="close" size={26} /></button>
            </div>
            <nav className="drawer__nav">
              {[{ to: '/', label: 'Home' }, ...NAV, { to: '/stories', label: 'Stories' }, { to: '/contact', label: 'Contact' }].map((n, i) => (
                <motion.div key={n.to} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: EASE }}>
                  <Link to={n.to} className="display drawer__link" onClick={() => setOpen(false)}>{n.label}</Link>
                </motion.div>
              ))}
            </nav>
            <div className="drawer__foot mono">
              <Button to="/design-your-journey" variant="yellow" onClick={() => setOpen(false)}>Design your journey</Button>
              <span>{SITE.email}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo light />
          <p className="footer__pitch">Tailor-made journeys across Sri Lanka — designed on the island, since {SITE.founded}.</p>
          <div className="footer__social">
            <a href={SITE.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Icon name="instagram" /></a>
            <a href={SITE.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Icon name="facebook" /></a>
            <a href="https://wa.me/94773992089" target="_blank" rel="noreferrer" aria-label="WhatsApp"><Icon name="whatsapp" /></a>
          </div>
        </div>
        <nav className="footer__col" aria-label="Journeys">
          <h4 className="mono">Journeys</h4>
          <Link to="/journeys?door=adventure">Adventure</Link>
          <Link to="/journeys?door=relax">Relax</Link>
          <Link to="/journeys?door=wellness">Wellness</Link>
          <Link to="/journeys?tag=family">Family</Link>
          <Link to="/journeys?tag=romance">Honeymoons</Link>
        </nav>
        <nav className="footer__col" aria-label="Explore">
          <h4 className="mono">Explore</h4>
          <Link to="/destinations">Destinations</Link>
          <Link to="/plan">Plan your trip</Link>
          <Link to="/stories">Stories</Link>
          <Link to="/about">About us</Link>
          <Link to="/groups">Groups &amp; events</Link>
        </nav>
        <div className="footer__col">
          <h4 className="mono">Talk to a human</h4>
          {SITE.phones.map((p) => (
            <a key={p.code} className="footer__phone mono" href={`tel:${p.tel.replace(/\s/g, '')}`}><b>{p.code}</b> {p.tel}</a>
          ))}
          <a className="mono" href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <address className="mono">{SITE.address.join(', ')}</address>
        </div>
      </div>
      <div className="container footer__base mono">
        <span>© {new Date().getFullYear()} Holidays by Design · part of {SITE.group}</span>
        <span>{SITE.memberships.join(' · ')}</span>
        <span><Link to="/privacy">Privacy</Link> · <Link to="/terms">Terms</Link></span>
      </div>
    </footer>
  )
}

// Page-level transition wrapper.
export function Page({ children }) {
  return (
    <motion.main
      id="main"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {children}
    </motion.main>
  )
}
