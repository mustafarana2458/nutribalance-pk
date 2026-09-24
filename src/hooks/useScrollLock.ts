import { useEffect } from 'react'

/** Locks body scroll (mobile menu) without the layout shifting when the scrollbar disappears. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const { body, documentElement: html } = document
    const previousOverflow = body.style.overflow
    const previousHtmlOverflow = html.style.overflow
    const previousPadding = body.style.paddingRight
    const scrollbar = window.innerWidth - document.documentElement.clientWidth

    // Both elements: iOS Safari only honours the lock when <html> is locked too.
    body.style.overflow = 'hidden'
    html.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`

    return () => {
      body.style.overflow = previousOverflow
      html.style.overflow = previousHtmlOverflow
      body.style.paddingRight = previousPadding
    }
  }, [locked])
}
