import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import Img from '../components/Img'
import Icon from '../components/Icon'
import IslandMap from '../components/IslandMap'
import TourCard from '../components/TourCard'
import { Lines, Eyebrow, Reveal, EASE } from '../components/Motion'
import { Button, TextLink, TornEdge } from '../components/Bits'
import { DESTINATIONS, destBySlug } from '../data/destinations'
import { JOURNEYS } from '../data/tours'
import NotFound from './NotFound'

export function Destinations() {
  const [active, setActive] = useState(null)
  const d = active ? destBySlug(active) : null
  const regions = [...new Set(DESTINATIONS.map((x) => x.region))]

  return (
    <>
      <section className="pagehead">
        <div className="container">
          <Eyebrow>Destinations · {DESTINATIONS.length} places</Eyebrow>
          <Lines className="display pagehead__title" lines={['A small island,', 'a world of places.']} onMount />
        </div>
      </section>

      <section className="section section--tight">
        <div className="container dmap">
          <div className="dmap__map"><IslandMap pins="all" showLabels="hubs" active={active} onPin={setActive} onLeave={() => setActive(null)} /></div>
          <div className="dmap__panel">
            <AnimatePresence mode="wait">
              {d ? (
                <motion.div key={d.slug} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: EASE }}>
                  <Img k={d.img} ratio="3/2" />
                  <span className="mono dmap__region">{d.region} · best {d.best}</span>
                  <h2 className="display h2">{d.name}</h2>
                  <p>{d.line}</p>
                  <TextLink to={`/destinations/${d.slug}`}>Explore {d.name.split(' & ')[0]}</TextLink>
                </motion.div>
              ) : (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="dmap__idle">
                  <p className="display h2">Hover a pin.</p>
                  <p>Sri Lanka is compact — most places sit within half a day by road. Pick a region and we’ll link them into a route.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {regions.map((r) => (
        <section key={r} className="section section--tight regionblock">
          <div className="container">
            <h2 className="mono regionblock__t">{r}</h2>
            <div className="grid grid--4">
              {DESTINATIONS.filter((x) => x.region === r).map((x, i) => (
                <Reveal key={x.slug} delay={(i % 4) * 0.06}>
                  <Link to={`/destinations/${x.slug}`} className="dcard">
                    <Img k={x.img} ratio="4/5" className="dcard__img" />
                    <h3>{x.name}</h3>
                    <span className="mono">Best {x.best}</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  )
}

export function DestinationDetail() {
  const { slug } = useParams()
  const d = destBySlug(slug)
  if (!d) return <NotFound />
  const trips = JOURNEYS.filter((j) => j.stops.includes(d.slug)).slice(0, 3)
  return (
    <>
      <section className="jhero jhero--short">
        <div className="jhero__bg"><Img k={d.img} eager className="jhero__img" /></div>
        <div className="jhero__shade" />
        <div className="container jhero__in">
          <Link to="/destinations" className="back mono"><Icon name="arrow-left" size={16} /> All destinations</Link>
          <Eyebrow light>{d.region}</Eyebrow>
          <Lines className="display jhero__title" lines={[d.name]} onMount />
          <p className="jhero__lede">{d.line}</p>
        </div>
        <TornEdge variant="b" />
      </section>
      <section className="section section--tight">
        <div className="container dgrid">
          <div>
            <h2 className="mono">Best time</h2>
            <p className="dgrid__big display">{d.best}</p>
          </div>
          <div>
            <h2 className="mono">Don’t miss</h2>
            <ul className="dgrid__list">{d.do.map((x) => <li key={x}><Icon name="check" size={16} stroke={2} />{x}</li>)}</ul>
          </div>
          <div className="dgrid__map"><IslandMap route={[d.slug]} active={d.slug} pins="route" showLabels={false} className="imap--sm" /></div>
        </div>
      </section>
      {trips.length > 0 && (
        <section className="section section--paper">
          <div className="container">
            <div className="rowhead"><h2 className="display h2">Journeys through {d.name.split(' & ')[0]}</h2><TextLink to="/journeys">All journeys</TextLink></div>
            <div className="grid grid--3">{trips.map((t, i) => <TourCard key={t.slug} tour={t} index={i} />)}</div>
          </div>
        </section>
      )}
      <section className="cta cta--sm"><div className="container cta__in"><h2 className="display cta__title">Want {d.name.split(' & ')[0]} in your trip?</h2><Button to="/design-your-journey" variant="solid">Design your journey</Button></div></section>
    </>
  )
}
