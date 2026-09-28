import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'motion/react'
import Img from '../components/Img'
import Icon from '../components/Icon'
import IslandMap from '../components/IslandMap'
import SeasonChart from '../components/SeasonChart'
import TourCard from '../components/TourCard'
import { Button, TextLink, TornEdge, SectionHead } from '../components/Bits'
import { Reveal, Lines, Eyebrow, Counter, Marquee, EASE } from '../components/Motion'
import { DOORS, JOURNEYS, bySlug } from '../data/tours'
import { DESTINATIONS, CLASSIC_LOOP, destBySlug } from '../data/destinations'
import { PILLARS, PROMISES, REVIEWS, SITE } from '../data/site'
import { useIsDesktop } from '../hooks/hooks'
import { asset } from '../lib/asset'

/* ───────────────────────── Hero ───────────────────────── */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section className="hero" ref={ref}>
      <motion.div className="hero__bg" style={{ y }}>
        <motion.div className="hero__zoom" initial={{ scale: 1.2 }} animate={{ scale: 1 }} transition={{ duration: 2.8, ease: EASE }}>
          <Img k="hero-leopard" eager className="hero__img" />
        </motion.div>
      </motion.div>
      <div className="hero__shade" />

      <motion.div className="hero__brand" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8, ease: EASE }}>
        <motion.img src={asset('white-logo.svg')} alt="Holidays by Design" style={{ opacity: fade }} />
      </motion.div>

      <motion.div className="container hero__inner" style={{ opacity: fade }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
          <Eyebrow light>Sri Lanka · tailor-made since {SITE.founded}</Eyebrow>
        </motion.div>
        <Lines className="hero__title display" lines={['Seek out', 'Sri Lanka']} onMount delay={0.35} />
        <motion.p className="hero__lede" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 1, ease: EASE }}>
          Mountain trails, warm seas and quiet retreats — journeys designed on the island for adventure, for rest, or for reset.
        </motion.p>
        <motion.div className="hero__cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 1, ease: EASE }}>
          <Button to="/journeys" variant="yellow">Explore journeys</Button>
          <Button to="/design-your-journey" variant="ghost-light">Design your own</Button>
        </motion.div>
      </motion.div>

      <div className="hero__side mono">
        <span>Follow us</span>
        <a href={SITE.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Icon name="instagram" size={18} /></a>
        <a href={SITE.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Icon name="facebook" size={18} /></a>
      </div>

      <div className="hero__scroll mono">
        <span>scroll down</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}><Icon name="arrow-down" size={16} /></motion.span>
      </div>

      <nav className="hero__tabs" aria-label="Choose a journey style">
        {DOORS.map((d) => (
          <Link key={d.id} to={`/journeys?door=${d.id}`} className="hero__tab">
            <span className="mono">{d.n}</span>{d.label}
          </Link>
        ))}
        <Link to="/design-your-journey" className="hero__tab hero__tab--cta"><span className="mono">04</span>Design your own</Link>
      </nav>
      <TornEdge />
    </section>
  )
}

/* ───────────────────────── Trust strip ───────────────────────── */
function Trust() {
  return (
    <section className="trust">
      <div className="container trust__in">
        <ul className="trust__list mono">
          {PROMISES.map((p) => <li key={p}><Icon name="check" size={14} stroke={2} />{p}</li>)}
        </ul>
        <p className="trust__mem mono">Member · {SITE.memberships.join(' · ')}</p>
      </div>
    </section>
  )
}

/* ───────────────────────── Three doors ───────────────────────── */
const DOOR_IMG = { adventure: 'door-adventure', relax: 'door-relax', wellness: 'door-wellness' }
function Doors() {
  return (
    <section className="section doors-sec">
      <div className="container">
        <SectionHead n="01" eyebrow="Start here" title={<>How do you want<br />to feel?</>} lede="Pick a mood. We’ll build the route." />
      </div>
      <div className="doors">
        {DOORS.map((d) => (
          <Link key={d.id} to={`/journeys?door=${d.id}`} className="door">
            <Img k={DOOR_IMG[d.id]} className="door__img" parallax={4} />
            <div className="door__shade" />
            <span className="door__n mono">{d.n}</span>
            <div className="door__body">
              <h3 className="display door__title">{d.label}</h3>
              <p className="door__line">{d.line}</p>
              <span className="door__go mono">See journeys <Icon name="arrow-right" size={16} /></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

/* ───────────────────────── Pinned horizontal scroller ───────────────────────── */
function Signature() {
  const featured = ['ayurvedic-bliss', 'rainforest-and-beaches', 'surf-and-yoga', 'harmony-in-the-highlands', 'the-big-four', 'tea-with-a-twist', 'the-geoffrey-bawa-trail', 'ultimate-sri-lanka'].map(bySlug).filter(Boolean)
  const desktop = useIsDesktop()
  const ref = useRef(null)
  const track = useRef(null)
  const [dist, setDist] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist])
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useLayoutEffect(() => {
    if (!desktop) return
    const measure = () => track.current && setDist(Math.max(0, track.current.scrollWidth - window.innerWidth + 80))
    measure()
    window.addEventListener('resize', measure)
    const t = setTimeout(measure, 600)
    return () => { window.removeEventListener('resize', measure); clearTimeout(t) }
  }, [desktop])

  const head = <SectionHead n="02" eyebrow="Signature journeys" title={<>Made on the island,<br />ready to make yours.</>} />

  if (!desktop) {
    return (
      <section className="section">
        <div className="container">{head}</div>
        <div className="hscroll hscroll--native">
          {featured.map((t, i) => <TourCard key={t.slug} tour={t} index={i} size="lg" />)}
        </div>
        <div className="container"><TextLink to="/journeys">All {JOURNEYS.length} journeys</TextLink></div>
      </section>
    )
  }

  return (
    <section ref={ref} className="hscroll" style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="hscroll__stick">
        <div className="container hscroll__head">{head}</div>
        <motion.div ref={track} className="hscroll__track" style={{ x }}>
          {featured.map((t, i) => <TourCard key={t.slug} tour={t} index={i} size="lg" />)}
          <Link to="/journeys" className="hscroll__all display">All {JOURNEYS.length}<br />journeys <Icon name="arrow-right" size={40} stroke={1} /></Link>
        </motion.div>
        <div className="hscroll__progress mono"><span>Scroll</span><i><motion.b style={{ width: bar }} /></i><span>{featured.length} + more</span></div>
      </div>
    </section>
  )
}

/* ───────────────────────── Island in numbers (Karelia-style) ───────────────────────── */
function Numbers() {
  const years = new Date().getFullYear() - SITE.founded
  const stats = [
    { n: years, s: '', label: 'Years designing journeys', sub: `Since ${SITE.founded}, part of ${SITE.group}.` },
    { n: JOURNEYS.length, s: '', label: 'Journeys to start from', sub: 'Every one can be reshaped around you.' },
    { n: 8, s: '', label: 'UNESCO World Heritage Sites', sub: 'Ancient cities, fortresses, forests and hills.' },
    { n: 24, s: '/7', label: 'On-ground support', sub: 'A real person on the island, any hour.' },
  ]
  return (
    <section className="section numbers">
      <div className="container">
        <SectionHead n="03" eyebrow="The island in numbers" title={<>Small island.<br />Enormous range.</>} lede="Most places are within half a day by road — mountains, rainforest, ancient cities and beaches, in one trip." />
        <div className="numbers__grid">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="stat">
              <div className="stat__n mono"><Counter to={s.n} suffix={s.s} /></div>
              <div className="stat__label">{s.label}</div>
              <p className="stat__sub">{s.sub}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Scroll-drawn route ───────────────────────── */
function Route() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const draw = useTransform(scrollYProgress, [0.08, 0.92], [0, 1])
  const [idx, setIdx] = useState(0)
  useMotionValueEvent(draw, 'change', (v) => setIdx(Math.min(CLASSIC_LOOP.length - 1, Math.round(v * (CLASSIC_LOOP.length - 1)))))
  const stops = CLASSIC_LOOP.map(destBySlug)
  const cur = stops[idx]

  return (
    <section ref={ref} className="route">
      <div className="route__stick">
        <div className="container route__grid">
          <div className="route__copy">
            <SectionHead n="04" eyebrow="A classic loop" title={<>One loop.<br />Cloud to coast.</>} lede="Our most-loved route ties the ancient north to the tea hills, the wild south-east and the sea. Scroll to travel it." />
            <ol className="route__stops">
              {stops.map((s, i) => (
                <li key={s.slug} className={`${i <= idx ? 'is-on' : ''} ${i === idx ? 'is-cur' : ''}`}>
                  <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                  <b>{s.name.split(' & ')[0]}</b>
                  <em className="mono">{s.region}</em>
                  {i === idx && <p>{s.line}</p>}
                </li>
              ))}
            </ol>
          </div>
          <div className="route__map">
            <IslandMap route={CLASSIC_LOOP} progress={draw} pins="route" active={cur.slug} reached={CLASSIC_LOOP.slice(0, idx)} />
            <AnimatePresence mode="wait">
              <motion.div key={cur.slug} className="route__card" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }}>
                <span className="mono">{String(idx + 1).padStart(2, '0')} / {String(CLASSIC_LOOP.length).padStart(2, '0')} · {cur.region}</span>
                <b className="display">{cur.name.split(' & ')[0]}</b>
                <p>{cur.line}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Wellness spotlight ───────────────────────── */
function Wellness() {
  const items = ['ayurvedic-bliss', 'surf-and-yoga', 'harmony-in-the-highlands'].map(bySlug)
  const [i, setI] = useState(0)
  return (
    <section className="section wellness">
      <div className="container wellness__grid">
        <div className="wellness__pic">
          <AnimatePresence mode="wait">
            <motion.div key={items[i].slug} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: EASE }}>
              <Img k={items[i].img} ratio="4/5" />
            </motion.div>
          </AnimatePresence>
          <span className="wellness__tag mono">{String(items[i].nights).padStart(2, '0')} nights · {items[i].stops.map((s) => destBySlug(s)?.name.split(' & ')[0]).slice(0, 2).join(' → ')}</span>
        </div>
        <div className="wellness__copy">
          <SectionHead n="05" eyebrow="Wellness holidays" title={<>Come home<br />lighter.</>} lede="Ayurveda by the sea, yoga above the surf, or a retreat in the cool hills. Three ways to restore." />
          <ul className="wellness__list">
            {items.map((t, n) => (
              <li key={t.slug} onMouseEnter={() => setI(n)} onFocus={() => setI(n)} className={n === i ? 'is-on' : ''}>
                <Link to={`/journeys/${t.slug}`}>
                  <span className="mono">{String(n + 1).padStart(2, '0')}</span>
                  <span className="wellness__t">{t.title}</span>
                  <Icon name="arrow-up-right" size={22} />
                </Link>
                <p>{t.blurb}</p>
              </li>
            ))}
          </ul>
          <TextLink to="/journeys?door=wellness">All wellness journeys</TextLink>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── Dark feature band ───────────────────────── */
function Wild() {
  return (
    <section className="wild">
      <Img k="rainforest" className="wild__img" parallax={8} />
      <div className="wild__shade" />
      <div className="container wild__in">
        <Eyebrow light>Adventure</Eyebrow>
        <Lines tag="h2" className="display wild__title" lines={['Where the trail', 'goes quiet.']} />
        <Reveal delay={0.2}><p className="wild__text">Trek a UNESCO rainforest, watch leopards at dawn, climb a rock fortress before the sun does. Our guides know the trails — and the best time to be on them.</p></Reveal>
        <Reveal delay={0.3}><Button to="/journeys?door=adventure" variant="yellow">See adventure journeys</Button></Reveal>
      </div>
    </section>
  )
}

/* ───────────────────────── Why us ───────────────────────── */
function Why() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead n="06" eyebrow="Why Holidays by Design" title={<>Sri Lanka is<br />all we do.</>} />
        <div className="pillars">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07} className="pillar">
              <Icon name={p.icon} size={28} stroke={1.25} />
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────── When to go ───────────────────────── */
function When() {
  return (
    <section className="section section--paper">
      <div className="container">
        <SectionHead n="07" eyebrow="When to go" title={<>There is always<br />a sunny side.</>} lede="Sri Lanka has two monsoons, so we route you to wherever the weather is best." />
        <SeasonChart />
        <div className="when__cta"><TextLink to="/plan">Plan your trip</TextLink></div>
      </div>
    </section>
  )
}

/* ───────────────────────── Stories ───────────────────────── */
function Stories() {
  const r = REVIEWS[0]
  return (
    <section className="section stories">
      <div className="container stories__in">
        <Eyebrow>Guest stories</Eyebrow>
        <Reveal><blockquote className="display stories__q">“{r.quote}”</blockquote></Reveal>
        <div className="stories__by mono">— {r.who} from {r.from}</div>
        <TextLink to="/stories">Read more stories</TextLink>
      </div>
    </section>
  )
}

/* ───────────────────────── CTA ───────────────────────── */
function CTA() {
  return (
    <section className="cta">
      <div className="container cta__in">
        <Lines tag="h2" className="display cta__title" lines={['Tell us how you', 'want to feel.']} />
        <div className="cta__side">
          <p>We’ll design the rest — route, stays, guides and pace. A reply from a real person within one working day.</p>
          <Button to="/design-your-journey" variant="solid">Design your journey</Button>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Trust />
      <Doors />
      <div className="marquee-wrap">
        <Marquee items={DESTINATIONS.filter((d) => d.hub).map((d) => d.name.split(' & ')[0])} speed={40} />
      </div>
      <Signature />
      <Numbers />
      <Route />
      <Wellness />
      <Wild />
      <Why />
      <When />
      <Stories />
      <CTA />
    </>
  )
}
