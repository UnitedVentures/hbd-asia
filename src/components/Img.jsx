import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { IMAGES } from '../data/images'

// Renders /images/<file>. If the file isn't there yet, shows a topographic placeholder labelled with the filename
// so it's obvious which photo to drop in. `parallax` (percent) shifts the photo inside its frame on scroll.
export default function Img({ k, alt, ratio, parallax = 0, eager = false, className = '', style, children }) {
  const meta = IMAGES[k]
  const [ok, setOk] = useState(true)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${-parallax}%`, `${parallax}%`])
  const scale = 1 + (parallax * 2) / 100

  const layerStyle = parallax ? { y, scale } : undefined

  return (
    <div ref={ref} className={`img ${className}`} style={{ aspectRatio: ratio || undefined, ...style }}>
      <motion.div className="img__layer" style={layerStyle}>
        {meta && ok ? (
          <img
            src={`/images/${meta.file}`}
            alt={alt ?? meta.alt}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            draggable={false}
            onError={() => setOk(false)}
          />
        ) : (
          <div className="img__ph" role="img" aria-label={alt ?? meta?.alt}>
            <span className="mono">{meta?.file ?? k}</span>
          </div>
        )}
      </motion.div>
      {children}
    </div>
  )
}
