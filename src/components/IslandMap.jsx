import { useId, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import Icon from './Icon'
import { LK_MAP } from '../data/lkMap'
import { DESTINATIONS, destBySlug } from '../data/destinations'
import { IMAGES } from '../data/images'

// Real geography: Simplemaps district paths + a projection fitted to the file's own lat/lon reference points.
const { ax, bx, ay, by } = LK_MAP.fit
const merc = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360))
export const project = (lon, lat) => [ax * lon + bx, ay * merc(lat) + by]
const VB = LK_MAP.viewBox.join(' ')

// Catmull-Rom → cubic Bézier through the stops.
function smooth(points, t = 0.5) {
  const p = [points[0], ...points, points[points.length - 1]]
  let d = `M${p[1][0].toFixed(1)} ${p[1][1].toFixed(1)}`
  for (let i = 1; i < p.length - 2; i++) {
    const [p0, p1, p2, p3] = [p[i - 1], p[i], p[i + 1], p[i + 2]]
    const c1 = [p1[0] + ((p2[0] - p0[0]) * t) / 3, p1[1] + ((p2[1] - p0[1]) * t) / 3]
    const c2 = [p2[0] - ((p3[0] - p1[0]) * t) / 3, p2[1] - ((p3[1] - p1[1]) * t) / 3]
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return d
}

const R_BIG = 40

/** Photo marker: destination photo in a ring, with its icon behind (shows if the photo file isn't there yet). */
function PhotoMarker({ dest, clipId }) {
  const file = IMAGES[dest.img]?.file
  return (
    <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}>
      <circle r={R_BIG + 14} className="imap__pulse" />
      <circle r={R_BIG + 5} className="imap__ring" />
      <circle r={R_BIG} className="imap__disc" />
      <Icon name={dest.icon} x={-15} y={-15} size={30} stroke={1.5} className="imap__icon" />
      {file && <image href={`/images/${file}`} x={-R_BIG} y={-R_BIG} width={R_BIG * 2} height={R_BIG * 2} preserveAspectRatio="xMidYMid slice" clipPath={`url(#${clipId})`} />}
      <circle r={R_BIG} className="imap__rim" />
    </motion.g>
  )
}

/** Small icon badge for stops already reached. */
function Badge({ dest }) {
  return (
    <motion.g initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      <circle r="17" className="imap__badge" />
      <Icon name={dest.icon} x={-9.5} y={-9.5} size={19} stroke={1.75} className="imap__badge-icon" />
    </motion.g>
  )
}

/**
 * route:    slugs joined by a line
 * progress: MotionValue 0..1 — draws the route as you scroll
 * reached:  slugs already visited → icon badges
 * active:   slug currently "arrived" → big photo marker
 * pins:     'hubs' | 'all' | 'route'
 * showLabels: true | false | 'hubs'
 */
export default function IslandMap({ route = [], progress, reached = [], pins = 'hubs', active, onPin, onLeave, showLabels = true, className = '' }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const clipId = `clip${uid}`, filterId = `ol${uid}`
  const [hover, setHover] = useState(null)
  const [hoverDistrict, setHoverDistrict] = useState(null)

  const routePts = useMemo(() => route.map(destBySlug).filter(Boolean).map((d) => project(d.lon, d.lat)), [route])
  const routeD = routePts.length > 1 ? smooth(routePts) : null

  const current = hover || active
  const curDest = current ? destBySlug(current) : null
  const hotDistricts = new Set([curDest?.district, ...reached.map((s) => destBySlug(s)?.district)].filter(Boolean))

  const shown = DESTINATIONS.filter((d) => (pins === 'all' ? true : pins === 'route' ? route.includes(d.slug) : d.hub || route.includes(d.slug)))
    .sort((a, b) => (a.slug === current) - (b.slug === current)) // current on top
  const hd = LK_MAP.districts.find((d) => d.id === hoverDistrict)

  return (
    <svg className={`imap ${className}`} viewBox={VB} role="img" aria-label="Map of Sri Lanka with destinations">
      <defs>
        <filter id={filterId} x="-5%" y="-5%" width="110%" height="110%"><feMorphology operator="dilate" radius="2.4" /></filter>
        <clipPath id={clipId}><circle r={R_BIG} /></clipPath>
      </defs>

      {/* island outline: all districts dilated in ink, then land on top */}
      <g className="imap__outline" filter={`url(#${filterId})`}>
        {LK_MAP.districts.map((d) => <path key={d.id} d={d.d} />)}
      </g>
      <g className="imap__land">
        {LK_MAP.districts.map((d) => (
          <path
            key={d.id}
            d={d.d}
            className={`imap__district ${hotDistricts.has(d.id) ? 'is-hot' : ''} ${hoverDistrict === d.id ? 'is-hover' : ''}`}
            onMouseEnter={() => setHoverDistrict(d.id)}
            onMouseLeave={() => setHoverDistrict(null)}
          />
        ))}
      </g>
      {hd?.label && !curDest && (
        <text x={hd.label[0]} y={hd.label[1]} textAnchor="middle" className="imap__dname">{hd.name}</text>
      )}

      {routeD && (
        <>
          <path d={routeD} className="imap__trail" />
          {progress ? (
            <motion.path d={routeD} className="imap__route" style={{ pathLength: progress }} />
          ) : (
            <motion.path d={routeD} className="imap__route" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.4, ease: 'easeInOut' }} />
          )}
        </>
      )}

      {shown.map((d) => {
        const [x, y] = project(d.lon, d.lat)
        const isCur = current === d.slug
        const isReached = reached.includes(d.slug)
        const inRoute = route.includes(d.slug)
        const goLeft = x < (LK_MAP.viewBox[0] + LK_MAP.viewBox[2] * 0.5)
        const off = isCur ? R_BIG + 14 : isReached ? 26 : 14
        const label = showLabels === true || (showLabels === 'hubs' && (d.hub || isCur))
        return (
          <g
            key={d.slug}
            className={`imap__pin ${isCur ? 'is-active' : ''} ${inRoute ? 'is-route' : ''}`}
            transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}
            onMouseEnter={() => { setHover(d.slug); onPin?.(d.slug) }}
            onMouseLeave={() => { setHover(null); onLeave?.() }}
            onFocus={() => onPin?.(d.slug)}
            tabIndex={onPin ? 0 : -1}
          >
            {isCur ? (
              <PhotoMarker dest={d} clipId={clipId} />
            ) : isReached ? (
              <Badge dest={d} />
            ) : (
              <>
                <circle r="24" className="imap__halo" />
                <circle r="7" className="imap__dot" />
              </>
            )}
            {label && (
              <text x={goLeft ? -off : off} y="5" textAnchor={goLeft ? 'end' : 'start'} className="imap__label">
                {d.name.split(' & ')[0]}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
