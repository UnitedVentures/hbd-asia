import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Img from './Img'
import Icon from './Icon'
import { destBySlug } from '../data/destinations'
import { EASE } from './Motion'

export default function TourCard({ tour, index = 0, size = 'md' }) {
  const stops = tour.stops.map((s) => destBySlug(s)?.name.split(' & ')[0]).filter(Boolean)
  return (
    <motion.article
      layout
      className={`tcard tcard--${size}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -6% 0px' }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.8, delay: Math.min(index % 3, 2) * 0.08, ease: EASE }}
    >
      <Link to={`/journeys/${tour.slug}`} className="tcard__link" aria-label={`${tour.title} — ${tour.nights} nights`}>
        <Img k={tour.img} ratio={size === 'lg' ? '4/5' : '4/3'} className="tcard__img" eager={size === 'lg'} />
        <div className="tcard__meta mono">
          <span>{String(tour.nights).padStart(2, '0')} nights</span>
          <span className="tcard__cat">{tour.category}</span>
        </div>
        <h3 className="tcard__title">{tour.title}</h3>
        <p className="tcard__blurb">{tour.blurb}</p>
        <div className="tcard__foot">
          <span className="tcard__route mono">{stops.slice(0, 3).join(' → ')}{stops.length > 3 ? ' …' : ''}</span>
          <span className="tcard__go"><Icon name="arrow-up-right" size={18} /></span>
        </div>
      </Link>
    </motion.article>
  )
}
