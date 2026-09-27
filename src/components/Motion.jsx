import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'motion/react'

export const EASE = [0.22, 1, 0.36, 1]

// Fade + rise when scrolled into view.
export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div', ...rest }) {
  const M = motion[as] || motion.div
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </M>
  )
}

// Each line slides up out of a mask. `lines` = array of strings (or nodes).
export function Lines({ lines, className = '', tag = 'h1', delay = 0, onMount = false, stagger = 0.12 }) {
  const Tag = motion[tag] || motion.h1
  const anim = onMount
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } }
  return (
    <Tag className={className} initial="hide" {...anim} transition={{ staggerChildren: stagger, delayChildren: delay }}>
      {lines.map((l, i) => (
        <span className="line" key={i}>
          <motion.span
            className="line__in"
            variants={{ hide: { y: '110%' }, show: { y: '0%' } }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

export function Eyebrow({ children, light = false, className = '' }) {
  return (
    <div className={`eyebrow mono ${light ? 'eyebrow--light' : ''} ${className}`}>
      <span className="eyebrow__rule" />
      {children}
    </div>
  )
}

// Count up when visible. Accepts numbers only.
export function Counter({ to, duration = 1.8, suffix = '', pad = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration, ease: EASE, onUpdate: (x) => setV(Math.round(x)) })
    return () => c.stop()
  }, [inView, to, duration])
  return <span ref={ref}>{String(v).padStart(pad, '0')}{suffix}</span>
}

// Endless horizontal ticker. Pauses on hover.
export function Marquee({ items, speed = 50 }) {
  const row = (
    <ul className="marquee__row" aria-hidden="false">
      {items.map((t, i) => (
        <li key={i}><span className="marquee__item">{t}</span><span className="marquee__dot" aria-hidden="true" /></li>
      ))}
    </ul>
  )
  return (
    <div className="marquee" style={{ '--speed': `${speed}s` }}>
      <div className="marquee__track">{row}{row}</div>
    </div>
  )
}
