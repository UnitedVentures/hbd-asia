import { motion } from 'motion/react'
import { SEASONS, MONTHS } from '../data/site'

const LABEL = ['Wetter', 'Good', 'Best']

export default function SeasonChart() {
  const now = new Date().getMonth()
  return (
    <div className="seasons">
      <div className="seasons__months mono" aria-hidden="true">
        <span />
        <div>{MONTHS.map((m, i) => <span key={i} className={i === now ? 'is-now' : ''}>{m}</span>)}</div>
      </div>
      {SEASONS.map((row, r) => (
        <div className="seasons__row" key={row.region}>
          <div className="seasons__label">
            <strong>{row.region}</strong>
            <span className="mono">{row.note}</span>
          </div>
          <div className="seasons__cells" role="img" aria-label={`${row.region}: ${row.m.map((v, i) => `${MONTHS[i]} ${LABEL[v]}`).join(', ')}`}>
            {row.m.map((v, i) => (
              <motion.span
                key={i}
                className={`seasons__cell seasons__cell--${v} ${i === now ? 'is-now' : ''}`}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: r * 0.06 + i * 0.025, ease: [0.22, 1, 0.36, 1] }}
                title={`${MONTHS[i]} · ${LABEL[v]}`}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="seasons__legend mono">
        <span><i className="seasons__cell seasons__cell--2" /> Best</span>
        <span><i className="seasons__cell seasons__cell--1" /> Good</span>
        <span><i className="seasons__cell seasons__cell--0" /> Wetter</span>
      </div>
    </div>
  )
}
