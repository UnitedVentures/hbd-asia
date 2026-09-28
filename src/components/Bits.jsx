import { Link } from 'react-router-dom'
import Icon from './Icon'
import { asset } from '../lib/asset'

// ── Torn-paper edge (the ripped-photo divider from the Russian hiking reference) ─────────
function tornPath(seed = 7, w = 1440, h = 70) {
  let s = seed
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647)
  const pts = [`M0 ${h}`]
  let x = 0
  pts.push(`L0 ${h * 0.55}`)
  while (x < w) {
    x += 6 + rnd() * 26
    const y = h * (0.15 + rnd() * 0.5) + (rnd() > 0.85 ? -10 : 0)
    pts.push(`L${Math.min(x, w).toFixed(1)} ${y.toFixed(1)}`)
  }
  pts.push(`L${w} ${h}Z`)
  return pts.join(' ')
}
const TORN = { a: tornPath(7), b: tornPath(31) }

export function TornEdge({ variant = 'a', flip = false, className = '' }) {
  return (
    <svg
      className={`torn ${flip ? 'torn--flip' : ''} ${className}`}
      viewBox="0 0 1440 70"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={TORN[variant]} />
    </svg>
  )
}

// ── Compact mark: official sun-over-globe glyph (public/favicon.svg) + serif name. ─
export function Logo({ light = false }) {
  return (
    <span className={`logo ${light ? 'logo--light' : ''}`}>
      <img className="logo__sun" src={asset('favicon.svg')} alt="" aria-hidden="true" />
      <span className="logo__text">
        <span className="logo__name">Holidays by Design</span>
        <span className="logo__tag mono">seek out sri lanka</span>
      </span>
    </span>
  )
}

// ── Button / link ───────────────────────────────────────────────────────────
export function Button({ to, href, variant = 'solid', icon = 'arrow-up-right', children, className = '', ...rest }) {
  const cls = `btn btn--${variant} ${className}`
  const inner = (
    <>
      <span className="btn__label">{children}</span>
      {icon && <span className="btn__icon"><Icon name={icon} size={16} stroke={1.75} /></span>}
    </>
  )
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>
  return <a href={href} className={cls} {...rest}>{inner}</a>
}

export function TextLink({ to, href, children, className = '', icon = 'arrow-right' }) {
  const inner = <>{children}<Icon name={icon} size={16} stroke={1.75} /></>
  const cls = `tlink ${className}`
  return to ? <Link to={to} className={cls}>{inner}</Link> : <a className={cls} href={href}>{inner}</a>
}

export function SectionHead({ n, eyebrow, title, lede, light = false, center = false }) {
  return (
    <header className={`sechead ${center ? 'sechead--center' : ''} ${light ? 'sechead--light' : ''}`}>
      {n && <span className="sechead__n display" aria-hidden="true">{n}</span>}
      <div className="sechead__body">
        {eyebrow && <div className={`eyebrow mono ${light ? 'eyebrow--light' : ''}`}><span className="eyebrow__rule" />{eyebrow}</div>}
        <h2 className="display sechead__title">{title}</h2>
        {lede && <p className="sechead__lede">{lede}</p>}
      </div>
    </header>
  )
}
