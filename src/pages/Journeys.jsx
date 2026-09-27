import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import TourCard from '../components/TourCard'
import { Lines, Eyebrow } from '../components/Motion'
import { Button } from '../components/Bits'
import { DOORS, TAGS, JOURNEYS } from '../data/tours'

const DURATIONS = [
  { id: 'all', label: 'Any length', test: () => true },
  { id: 's', label: 'Up to 5 nights', test: (n) => n <= 5 },
  { id: 'm', label: '6 – 8 nights', test: (n) => n >= 6 && n <= 8 },
  { id: 'l', label: '9+ nights', test: (n) => n >= 9 },
]

export default function Journeys() {
  const [sp, setSp] = useSearchParams()
  const door = sp.get('door') || 'all'
  const tag = sp.get('tag') || 'all'
  const dur = sp.get('len') || 'all'

  const set = (k, v) => {
    const n = new URLSearchParams(sp)
    if (v === 'all') n.delete(k); else n.set(k, v)
    setSp(n, { replace: true })
  }

  const list = useMemo(() => {
    const d = DURATIONS.find((x) => x.id === dur) || DURATIONS[0]
    return JOURNEYS.filter((j) => (door === 'all' || j.door === door) && (tag === 'all' || j.tags.includes(tag)) && d.test(j.nights))
  }, [door, tag, dur])

  const counts = useMemo(() => Object.fromEntries(DOORS.map((d) => [d.id, JOURNEYS.filter((j) => j.door === d.id).length])), [])
  const doorInfo = DOORS.find((d) => d.id === door)

  return (
    <>
      <section className="pagehead">
        <div className="container">
          <Eyebrow>Journeys · {JOURNEYS.length} to start from</Eyebrow>
          <Lines className="display pagehead__title" lines={doorInfo ? [doorInfo.label + '.'] : ['Every way', 'to see Sri Lanka.']} key={door} onMount />
          <p className="pagehead__lede">{doorInfo ? `${doorInfo.line} ` : ''}Every journey is a starting point. Change the pace, the stays, the regions — or <Link to="/design-your-journey">start from a blank page</Link>.</p>
        </div>
      </section>

      <div className="filters">
        <div className="container filters__in">
          <div className="filters__doors" role="tablist" aria-label="Journey style">
            {[{ id: 'all', label: 'All', n: JOURNEYS.length }, ...DOORS.map((d) => ({ ...d, n: counts[d.id] }))].map((d) => (
              <button key={d.id} role="tab" aria-selected={door === d.id} className={`filters__door ${door === d.id ? 'is-on' : ''}`} onClick={() => set('door', d.id)}>
                {d.label}<sup className="mono">{d.n}</sup>
                {door === d.id && <motion.i layoutId="door-ul" className="filters__ul" />}
              </button>
            ))}
          </div>
          <div className="filters__row">
            <div className="chips" aria-label="Themes">
              <button className={`chip mono ${tag === 'all' ? 'is-on' : ''}`} onClick={() => set('tag', 'all')}>Any theme</button>
              {TAGS.map((t) => <button key={t.id} className={`chip mono ${tag === t.id ? 'is-on' : ''}`} onClick={() => set('tag', t.id)}>{t.label}</button>)}
            </div>
            <label className="select mono">
              <span className="sr">Duration</span>
              <select value={dur} onChange={(e) => set('len', e.target.value)}>
                {DURATIONS.map((d) => <option key={d.id} value={d.id}>{d.label}</option>)}
              </select>
            </label>
          </div>
        </div>
      </div>

      <section className="section section--tight">
        <div className="container">
          <p className="results mono" aria-live="polite">{list.length} {list.length === 1 ? 'journey' : 'journeys'}</p>
          <motion.div layout className="grid grid--3">
            <AnimatePresence mode="popLayout">
              {list.map((t, i) => <TourCard key={t.slug} tour={t} index={i} />)}
            </AnimatePresence>
          </motion.div>
          {list.length === 0 && (
            <div className="empty">
              <p className="display">Nothing matches — yet.</p>
              <p>Tell us what you have in mind and we’ll design it.</p>
              <Button to="/design-your-journey">Design your journey</Button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
