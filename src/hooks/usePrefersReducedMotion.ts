import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

const subscribe = (onChange: () => void) => {
  const media = window.matchMedia(QUERY)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

/**
 * True when the visitor has asked the OS to reduce motion.
 *
 * Pages are prerendered at build time, where there is no media query to read.
 * The server snapshot (`false`) is also what the client uses while hydrating,
 * so the markup always matches; React then re-renders straight away with the
 * real preference, e.g. swapping a <Reveal> for its plain, fully visible version.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  )
}
