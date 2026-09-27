import { useEffect, useState } from 'react'

export function useMedia(query) {
  const get = () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false)
  const [m, setM] = useState(get)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setM(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return m
}

export const useIsDesktop = () => useMedia('(min-width: 900px)')

export function useReducedMotionPref() {
  return useMedia('(prefers-reduced-motion: reduce)')
}
