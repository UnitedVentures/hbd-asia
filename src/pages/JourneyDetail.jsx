import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react'
import Img from '../components/Img'
import Icon from '../components/Icon'
import IslandMap from '../components/IslandMap'
import TourCard from '../components/TourCard'
import { Button, TornEdge, TextLink } from '../components/Bits'
import { Lines, Eyebrow, Reveal, EASE } from '../components/Motion'
import { bySlug, JOURNEYS } from '../data/tours'
import { destBySlug } from '../data/destinations'
import NotFound from './NotFound'

function Day({ day, open, onToggle }) {
  return (
    <li className={`day ${open ? 'is-open' : ''}`}>
      <button className="day__head" onClick={onToggle} aria-expanded={open}>
        <span className="day__d mono">Day {day.d}</span>
        <span className="day__t">{day.title}</span>
        <span className="day__p mono">{day.place}</span>
        <span className="day__i"><Icon name={open ? 'minus' : 'plus'} size={20} /></span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div className="day__body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: EASE }}>
            <div className="day__in">
              <p>{day.text}</p>
              {day.stay && <p className="day__stay mono"><Icon name="bed" size={16} /> {day.stay}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export default function JourneyDetail() {
  const { slug } = useParams()
  const t = bySlug(slug)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const [open, setOpen] = useState(0)
  if (!t) return <NotFound />

  const stops = t.stops.map(destBySlug).filter(Boolean)
  const related = JOURNEYS.filter((j) => j.slug !== t.slug && (j.door === t.door && t.door ? true : j.cat === t.cat)).slice(0, 3)
  const glance = [
    ['Duration', `${t.nights} nights · ${t.daysCount} days`],
    ['Route', stops.map((s) => s.name.split(' & ')[0]).join(' → ')],
    ['Style', t.category],
    ['Best time', [...new Set(stops.map((s) => s.best))].slice(0, 2).join(' / ')],
  ]

  return (
    <>
      <section className="jhero" ref={heroRef}>
        <motion.div className="jhero__bg" style={{ y }}><Img k={t.img} eager ratio={undefined} className="jhero__img" /></motion.div>
        <div className="jhero__shade" />
        <div className="container jhero__in">
          <Link to="/journeys" className="back mono"><Icon name="arrow-left" size={16} /> All journeys</Link>
          <Eyebrow light>{t.category} · {t.nights} nights</Eyebrow>
          <Lines className="display jhero__title" lines={[t.title]} onMount />
          <p className="jhero__lede">{t.blurb}</p>
        </div>
        <TornEdge variant="b" />
      </section>

      <section className="section section--tight">
        <div className="container">
          <dl className="glance">
            {glance.map(([k, v], i) => (
              <Reveal key={k} delay={i * 0.06} className="glance__item"><dt className="mono">{k}</dt><dd>{v}</dd></Reveal>
            ))}
          </dl>

          <div className="jlayout">
            <div className="jlayout__main">
              <h2 className="display h2">The journey, day by day</h2>
              {t.days ? (
                <ol className="days">
                  {t.days.map((d, i) => <Day key={d.d} day={d} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />)}
                </ol>
              ) : (
                <div className="outline">
                  <p className="outline__note">This journey follows the route below. We share the full day-by-day itinerary, hotels and pricing on enquiry — and reshape it to your dates and pace.</p>
                  <ol className="outline__stops">
                    {stops.map((s, i) => (
                      <li key={s.slug}><span className="mono">{String(i + 1).padStart(2, '0')}</span><b>{s.name}</b><em className="mono">{s.region}</em><p>{s.line}</p></li>
                    ))}
                  </ol>
                </div>
              )}

              {(t.included || t.notes) && (
                <div className="incl">
                  {t.included && (
                    <div>
                      <h3 className="mono">Included</h3>
                      <ul>{t.included.map((x) => <li key={x}><Icon name="check" size={16} stroke={2} />{x}</li>)}</ul>
                    </div>
                  )}
                  {t.stays && (
                    <div>
                      <h3 className="mono">Where you’ll stay</h3>
                      <ul>{t.stays.map((x) => <li key={x}><Icon name="bed" size={16} />{x}</li>)}</ul>
                    </div>
                  )}
                  {t.notes && (
                    <div>
                      <h3 className="mono">Good to know</h3>
                      <ul>{t.notes.map((x) => <li key={x}>{x}</li>)}</ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            <aside className="jlayout__side">
              <div className="jside">
                <div className="jside__map"><IslandMap route={t.stops} reached={t.stops} pins="route" className="imap--sm" showLabels={false} /></div>
                <h3 className="display">Make it yours</h3>
                <p>Quote in one working day. Pricing depends on dates, hotels and group size — no hidden costs.</p>
                <Button to={`/design-your-journey?journey=${t.slug}`} variant="yellow">Enquire about this journey</Button>
                <a className="jside__wa mono" href="https://wa.me/94773992089" target="_blank" rel="noreferrer"><Icon name="whatsapp" size={16} /> Or message us on WhatsApp</a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--paper">
          <div className="container">
            <div className="rowhead"><h2 className="display h2">You might also like</h2><TextLink to="/journeys">All journeys</TextLink></div>
            <div className="grid grid--3">{related.map((r, i) => <TourCard key={r.slug} tour={r} index={i} />)}</div>
          </div>
        </section>
      )}
    </>
  )
}
