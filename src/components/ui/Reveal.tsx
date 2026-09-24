import type { ReactNode } from 'react'
import { m } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type RevealProps = {
  children: ReactNode
  /** Seconds. Stagger siblings with 0.06–0.12 steps. */
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  className?: string
  as?: 'div' | 'li' | 'span' | 'article'
}

const offsets = {
  up: { x: 0, y: 16 },
  left: { x: -16, y: 0 },
  right: { x: 16, y: 0 },
  none: { x: 0, y: 0 },
}

/**
 * Scroll-reveal wrapper — a short, subtle fade + shift using only opacity and
 * transform (GPU-composited, no layout work). Stagger delays are capped so long
 * lists never feel sluggish on a phone. When the visitor prefers reduced motion the content
 * renders immediately with no transform — no fade, no shift.
 */
export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className,
  as = 'div',
}: RevealProps) {
  const reduced = usePrefersReducedMotion()
  const MotionTag = m[as]

  if (reduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  const offset = offsets[direction]

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: Math.min(delay, 0.2), ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
