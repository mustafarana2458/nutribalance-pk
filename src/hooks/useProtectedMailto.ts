import { useState, type MouseEvent } from 'react'
import { emailLink } from '@/data/site'

export type MailtoOptions = { subject?: string; body?: string }

/**
 * Spam-protected mailto. The real `mailto:` href is only written into the DOM
 * once a person hovers, focuses or taps the link, so scrapers that harvest
 * `href="mailto:…"` from the rendered page find nothing. A click that somehow
 * arrives first still opens the email client.
 *
 * Spread the returned props onto an <a> or an `href` Button.
 */
export function useProtectedMailto({ subject, body }: MailtoOptions = {}) {
  const [revealed, setRevealed] = useState(false)
  const reveal = () => setRevealed(true)
  const target = () => emailLink(subject, body)

  return {
    href: revealed ? target() : '#email',
    onMouseEnter: reveal,
    onFocus: reveal,
    onTouchStart: reveal,
    onClick: (event: MouseEvent<HTMLAnchorElement>) => {
      if (revealed) return
      event.preventDefault()
      reveal()
      window.location.href = target()
    },
  }
}
