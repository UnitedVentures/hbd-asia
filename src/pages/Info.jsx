import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Img from '../components/Img'
import Icon from '../components/Icon'
import SeasonChart from '../components/SeasonChart'
import { Button, TextLink, SectionHead } from '../components/Bits'
import { Lines, Eyebrow, Reveal, EASE } from '../components/Motion'
import { EVENTS, FACTS, FAQ, SERVICES, PILLARS, REVIEWS, SITE } from '../data/site'
import { imageKeys } from '../data/images'

function Head({ eyebrow, lines, lede }) {
  return (
    <section className="pagehead">
      <div className="container">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Lines className="display pagehead__title" lines={lines} onMount />
        {lede && <p className="pagehead__lede">{lede}</p>}
      </div>
    </section>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <ul className="faq">
      {FAQ.map((f, i) => (
        <li key={f.q} className={open === i ? 'is-open' : ''}>
          <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            <span>{f.q}</span><Icon name={open === i ? 'minus' : 'plus'} size={20} />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="faq__a"><p>{f.a}</p></motion.div>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  )
}

/* ─────────── Plan ─────────── */
export function Plan() {
  return (
    <>
      <Head eyebrow="Plan your trip" lines={['Everything before', 'you fly.']} lede="The practical bits, answered plainly." />

      <section className="section section--tight" id="when">
        <div className="container">
          <SectionHead n="01" eyebrow="When to go" title="Follow the sun." lede="Two monsoons mean the weather is always good somewhere. General guidance — we’ll match it to your dates." />
          <SeasonChart />
        </div>
      </section>

      <section className="section section--paper" id="events">
        <div className="container">
          <SectionHead n="02" eyebrow="Events calendar" title="Time it with a festival." />
          <ul className="events">
            {EVENTS.map((e, i) => (
              <Reveal as="li" key={e.name} delay={i * 0.05} className="event">
                <span className="event__m mono">{e.m}</span>
                <h3>{e.name}</h3>
                <p>{e.text}</p>
              </Reveal>
            ))}
          </ul>
          <p className="fine mono">Festival dates follow lunar and local calendars and shift each year — ask us for this year’s dates.</p>
        </div>
      </section>

      <section className="section section--tight" id="facts">
        <div className="container split">
          <SectionHead n="03" eyebrow="Fact sheet" title="At a glance." />
          <dl className="facts">
            {FACTS.map(([k, v]) => <div key={k}><dt className="mono">{k}</dt><dd>{v}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className="section section--paper" id="services">
        <div className="container">
          <SectionHead n="04" eyebrow="Getting sorted" title="We handle the paperwork." />
          <div className="pillars pillars--3">
            {SERVICES.map((s) => (
              <Reveal key={s.title} className="pillar"><Icon name={s.icon} size={28} stroke={1.25} /><h3>{s.title}</h3><p>{s.text}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container split">
          <SectionHead n="05" eyebrow="FAQ" title="Good questions." />
          <Faq />
        </div>
      </section>
    </>
  )
}

/* ─────────── Stories ─────────── */
export function Stories() {
  const gallery = imageKeys.filter((k) => !k.startsWith('door-') && k !== 'team').slice(0, 12)
  return (
    <>
      <Head eyebrow="Stories" lines={['Told by', 'the people who went.']} />
      <section className="section section--tight">
        <div className="container">
          <div className="reviews">
            {REVIEWS.map((r, i) => (
              <Reveal key={i} className="review">
                <blockquote className="display">“{r.quote}”</blockquote>
                <p className="mono">— {r.who}, {r.from}</p>
              </Reveal>
            ))}
            <Reveal className="review review--todo">
              <p className="mono">More guest stories are being added.</p>
              <TextLink to="/contact">Share yours</TextLink>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="section section--paper">
        <div className="container">
          <SectionHead n="Gallery" eyebrow="From the island" title="Look around." />
          <div className="masonry">
            {gallery.map((k, i) => <Reveal key={k} delay={(i % 3) * 0.06}><Img k={k} className="masonry__img" parallax={0} ratio={i % 3 === 1 ? '4/5' : '3/2'} /></Reveal>)}
          </div>
        </div>
      </section>
    </>
  )
}

/* ─────────── About ─────────── */
export function About() {
  return (
    <>
      <Head eyebrow="About us" lines={['Designed on the island.', 'Since 1995.']} lede="Holidays by Design is the leisure arm of United Ventures Group — destination management, outbound travel and airline representation for Sri Lanka." />
      <section className="section section--tight">
        <div className="container split">
          <div>
            <SectionHead n="01" eyebrow="Our story" title="A boutique tour operator with three decades of island knowledge." />
          </div>
          <div className="prose">
            <p>We began in {SITE.founded} as United Holidays (Pvt) Ltd and grew into {SITE.group}. Today we design custom and pre-designed holidays for every kind of traveller — from a single retreat to a three-week loop.</p>
            <p>Our promise is simple: a tailor-made holiday that is exclusive and memorable. Three in four of our team are under 40, and every one of them lives here.</p>
            <div className="badges mono">{SITE.memberships.map((m) => <span key={m}>{m}</span>)}</div>
          </div>
        </div>
      </section>
      <section className="section section--paper">
        <div className="container">
          <SectionHead n="02" eyebrow="Why travel with us" title="Five things we promise." />
          <div className="pillars">
            {PILLARS.map((p, i) => <Reveal key={p.title} delay={i * 0.07} className="pillar"><Icon name={p.icon} size={28} stroke={1.25} /><h3>{p.title}</h3><p>{p.text}</p></Reveal>)}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container split">
          <Img k="team" ratio="4/5" />
          <div>
            <SectionHead n="03" eyebrow="The team" title="Meet the people who’ll design your trip." lede="Add your team photos and names here — the current site has a dedicated Team page to migrate." />
            <Button to="/contact">Say hello</Button>
          </div>
        </div>
      </section>
    </>
  )
}

/* ─────────── Contact ─────────── */
export function Contact() {
  return (
    <>
      <Head eyebrow="Contact" lines={['Talk to a', 'human.']} lede="Based in Colombo, answering across time zones." />
      <section className="section section--tight">
        <div className="container contact">
          <div className="contact__lines">
            {SITE.phones.map((p) => (
              <a key={p.code} className="contact__card" href={`tel:${p.tel.replace(/\s/g, '')}`}>
                <span className="mono">{p.region}</span><b className="mono">{p.tel}</b><Icon name="phone" size={20} />
              </a>
            ))}
            <a className="contact__card" href="https://wa.me/94773992089" target="_blank" rel="noreferrer"><span className="mono">USA · Europe · anywhere</span><b>WhatsApp us</b><Icon name="whatsapp" size={20} /></a>
            <a className="contact__card" href={`mailto:${SITE.email}`}><span className="mono">Email</span><b className="mono">{SITE.email}</b><Icon name="mail" size={20} /></a>
          </div>
          <div className="contact__side">
            <h2 className="display h2">Head office</h2>
            <address className="mono">{SITE.address.map((l) => <span key={l}>{l}</span>)}</address>
            <p>Planning a trip? The fastest way to a quote is our short brief.</p>
            <Button to="/design-your-journey" variant="yellow">Design your journey</Button>
          </div>
        </div>
      </section>
    </>
  )
}

/* ─────────── Groups (MICE) ─────────── */
export function Groups() {
  return (
    <>
      <Head eyebrow="Groups & events" lines={['Meetings, incentives,', 'conferences, events.']} lede="Corporate events on a tropical island — most venues are within half a day’s drive." />
      <section className="section section--tight">
        <div className="container split">
          <SectionHead n="01" eyebrow="What we handle" title="Logistics, end to end." />
          <div className="prose">
            <p>Venue selection, accommodation, catering, entertainment and detailed event planning — with personal attention to every detail, so you can focus on the agenda.</p>
            <p>Sri Lanka’s compact geography gives you beaches, hills and heritage cities within easy reach, and year-round festivals to build into your programme.</p>
            <Button to="/contact">Talk to our events team</Button>
          </div>
        </div>
      </section>
    </>
  )
}

/* ─────────── Legal placeholder ─────────── */
export function Legal({ kind }) {
  const title = kind === 'terms' ? 'Terms & conditions' : 'Privacy policy'
  return (
    <>
      <Head eyebrow="Legal" lines={[title]} />
      <section className="section section--tight"><div className="container prose">
        <p>Migrate the current text from <a href={`https://www.hbdasia.com/${kind === 'terms' ? 'terms-conditions' : 'privacy-policy'}.html`} target="_blank" rel="noreferrer">hbdasia.com</a> — and review it for GDPR (Europe/UK), the Australian Privacy Principles and US state privacy laws before launching to those markets.</p>
      </div></section>
    </>
  )
}
