import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import Icon from '../components/Icon'
import { Button } from '../components/Bits'
import { Lines, Eyebrow, EASE } from '../components/Motion'
import { DOORS, TAGS, bySlug } from '../data/tours'
import { SITE } from '../data/site'
import { submitEnquiry } from '../lib/enquiry'

const STEPS = ['Who’s going', 'What moves you', 'About you']
const STYLES = ['Boutique', 'Luxury', 'Comfortable', 'Budget-friendly']
const LENGTHS = ['Under a week', '1 week', '10 nights', '2 weeks', '3 weeks +', 'Not sure yet']
const DOOR_ICON = { adventure: 'mountain', relax: 'beach', wellness: 'yoga' }

function Stepper({ label, sub, value, set, min = 0 }) {
  return (
    <div className="stepper">
      <div><b>{label}</b>{sub && <span className="mono">{sub}</span>}</div>
      <div className="stepper__ctl">
        <button type="button" onClick={() => set(Math.max(min, value - 1))} aria-label={`Fewer ${label}`}><Icon name="minus" size={16} /></button>
        <output className="mono">{value}</output>
        <button type="button" onClick={() => set(value + 1)} aria-label={`More ${label}`}><Icon name="plus" size={16} /></button>
      </div>
    </div>
  )
}

export default function Design() {
  const [sp] = useSearchParams()
  const from = bySlug(sp.get('journey'))
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [f, setF] = useState({
    adults: 2, children: 0, arrive: '', length: '1 week', flexible: true,
    doors: from?.door ? [from.door] : [], themes: [], style: 'Boutique', notes: from ? `I'm interested in “${from.title}”.` : '',
    name: '', email: '', phone: '', country: '', consent: false,
  })
  const up = (k, v) => setF((s) => ({ ...s, [k]: v }))
  const toggle = (k, v) => setF((s) => ({ ...s, [k]: s[k].includes(v) ? s[k].filter((x) => x !== v) : [...s[k], v] }))
  const go = (n) => { setDir(n > step ? 1 : -1); setStep(n) }

  const valid = step === 2 ? f.name.trim() && /\S+@\S+\.\S+/.test(f.email) && f.consent : true

  const send = async (e) => {
    e.preventDefault()
    if (!valid) return
    setBusy(true); setErr('')
    try {
      await submitEnquiry({ ...f, journey: from?.title || '', consent: undefined })
      setDone(true)
    } catch { setErr('Something went wrong. Please email us directly at ' + SITE.email) }
    setBusy(false)
  }

  if (done) {
    return (
      <section className="pagehead notfound">
        <div className="container">
          <Eyebrow>Sent</Eyebrow>
          <Lines className="display pagehead__title" lines={['Thank you,', f.name.split(' ')[0] + '.']} onMount />
          <p className="pagehead__lede">A designer will reply within one working day. Meanwhile, browse where you might go.</p>
          <Button to="/destinations">Explore destinations</Button>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="pagehead pagehead--sm">
        <div className="container">
          <Eyebrow>Design your journey</Eyebrow>
          <Lines className="display pagehead__title" lines={['Tell us how', 'you want to feel.']} onMount />
        </div>
      </section>

      <section className="section section--tight">
        <div className="container dform">
          <form className="dform__main" onSubmit={send} noValidate>
            <ol className="steps mono" aria-label="Progress">
              {STEPS.map((s, i) => (
                <li key={s} className={i === step ? 'is-on' : i < step ? 'is-done' : ''}>
                  <button type="button" onClick={() => i < step && go(i)} disabled={i > step}>
                    <span>{String(i + 1).padStart(2, '0')}</span>{s}
                  </button>
                </li>
              ))}
              <li className="steps__bar"><motion.i animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }} transition={{ duration: 0.5, ease: EASE }} /></li>
            </ol>

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={step} custom={dir} className="dform__step"
                initial={{ opacity: 0, x: dir * 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -40 }} transition={{ duration: 0.4, ease: EASE }}>
                {step === 0 && (
                  <>
                    <h2 className="display h2">Who’s travelling, and when?</h2>
                    <Stepper label="Adults" value={f.adults} set={(v) => up('adults', v)} min={1} />
                    <Stepper label="Children" sub="under 12" value={f.children} set={(v) => up('children', v)} />
                    <div className="field">
                      <label htmlFor="arrive" className="mono">Roughly when do you arrive?</label>
                      <input id="arrive" type="date" value={f.arrive} onChange={(e) => up('arrive', e.target.value)} />
                      <label className="check"><input type="checkbox" checked={f.flexible} onChange={(e) => up('flexible', e.target.checked)} /> My dates are flexible</label>
                    </div>
                    <div className="field">
                      <span className="mono">How long?</span>
                      <div className="chips">{LENGTHS.map((l) => <button type="button" key={l} className={`chip mono ${f.length === l ? 'is-on' : ''}`} onClick={() => up('length', l)}>{l}</button>)}</div>
                    </div>
                  </>
                )}
                {step === 1 && (
                  <>
                    <h2 className="display h2">What are you after?</h2>
                    <div className="pick">
                      {DOORS.map((d) => (
                        <button type="button" key={d.id} className={`pick__item ${f.doors.includes(d.id) ? 'is-on' : ''}`} onClick={() => toggle('doors', d.id)} aria-pressed={f.doors.includes(d.id)}>
                          <Icon name={DOOR_ICON[d.id]} size={30} stroke={1.25} />
                          <b>{d.label}</b><span>{d.line}</span>
                        </button>
                      ))}
                    </div>
                    <div className="field">
                      <span className="mono">Add a little of…</span>
                      <div className="chips">{TAGS.filter((t) => t.id !== 'signature').map((t) => <button type="button" key={t.id} className={`chip mono ${f.themes.includes(t.id) ? 'is-on' : ''}`} onClick={() => toggle('themes', t.id)}>{t.label}</button>)}</div>
                    </div>
                    <div className="field">
                      <span className="mono">Where do you like to stay?</span>
                      <div className="chips">{STYLES.map((s) => <button type="button" key={s} className={`chip mono ${f.style === s ? 'is-on' : ''}`} onClick={() => up('style', s)}>{s}</button>)}</div>
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <h2 className="display h2">Where do we send it?</h2>
                    <div className="field field--2">
                      <div><label htmlFor="name" className="mono">Full name *</label><input id="name" autoComplete="name" value={f.name} onChange={(e) => up('name', e.target.value)} required /></div>
                      <div><label htmlFor="email" className="mono">Email *</label><input id="email" type="email" autoComplete="email" value={f.email} onChange={(e) => up('email', e.target.value)} required /></div>
                    </div>
                    <div className="field field--2">
                      <div><label htmlFor="phone" className="mono">Phone / WhatsApp</label><input id="phone" type="tel" autoComplete="tel" value={f.phone} onChange={(e) => up('phone', e.target.value)} /></div>
                      <div><label htmlFor="country" className="mono">Country</label><input id="country" autoComplete="country-name" value={f.country} onChange={(e) => up('country', e.target.value)} /></div>
                    </div>
                    <div className="field">
                      <label htmlFor="notes" className="mono">Anything we should know?</label>
                      <textarea id="notes" rows={4} value={f.notes} onChange={(e) => up('notes', e.target.value)} placeholder="Occasions, must-sees, dietary needs, mobility, budget…" />
                    </div>
                    <label className="check"><input type="checkbox" checked={f.consent} onChange={(e) => up('consent', e.target.checked)} /> I agree to be contacted about this enquiry. See our <Link to="/privacy">privacy policy</Link>.</label>
                    {err && <p className="err" role="alert">{err}</p>}
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="dform__nav">
              {step > 0 ? <button type="button" className="tlink" onClick={() => go(step - 1)}><Icon name="arrow-left" size={16} /> Back</button> : <span />}
              {step < 2
                ? <button type="button" className="btn btn--solid" onClick={() => go(step + 1)}><span className="btn__label">Continue</span><span className="btn__icon"><Icon name="arrow-right" size={16} /></span></button>
                : <button type="submit" className="btn btn--yellow" disabled={!valid || busy}><span className="btn__label">{busy ? 'Sending…' : 'Send my enquiry'}</span><span className="btn__icon"><Icon name="arrow-up-right" size={16} /></span></button>}
            </div>
          </form>

          <aside className="dform__aside">
            <div className="summary">
              <h3 className="mono">Your brief</h3>
              <dl>
                <dt>Travellers</dt><dd>{f.adults} adult{f.adults > 1 ? 's' : ''}{f.children ? `, ${f.children} child${f.children > 1 ? 'ren' : ''}` : ''}</dd>
                <dt>Arriving</dt><dd>{f.arrive || 'Flexible'}</dd>
                <dt>Length</dt><dd>{f.length}</dd>
                <dt>Mood</dt><dd>{f.doors.length ? f.doors.map((d) => DOORS.find((x) => x.id === d).label).join(' + ') : '—'}</dd>
                <dt>Stay</dt><dd>{f.style}</dd>
                {from && <><dt>Starting from</dt><dd>{from.title}</dd></>}
              </dl>
              <p className="summary__note">A designer replies within one working day with a route and a clear quote. No hidden costs.</p>
              <a className="jside__wa mono" href="https://wa.me/94773992089" target="_blank" rel="noreferrer"><Icon name="whatsapp" size={16} /> Prefer WhatsApp?</a>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
