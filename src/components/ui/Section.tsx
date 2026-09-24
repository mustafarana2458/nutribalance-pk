import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'cream' | 'white' | 'sage' | 'forest'

const tones: Record<Tone, string> = {
  cream: 'bg-cream-50 text-ink-900',
  white: 'bg-white text-ink-900',
  sage: 'bg-sage-200 text-ink-900',
  forest: 'bg-forest-700 text-sage-100',
}

type SectionProps = {
  children: ReactNode
  id?: string
  tone?: Tone
  className?: string
  containerClassName?: string
  /** Renders the soft dotted texture behind the content. */
  grain?: boolean
  as?: 'section' | 'div' | 'article' | 'header' | 'footer'
}

export function Section({
  children,
  id,
  tone = 'cream',
  className,
  containerClassName,
  grain = false,
  as: Tag = 'section',
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn('relative isolate overflow-hidden py-section', tones[tone], className)}
    >
      {grain && <div aria-hidden className="grain pointer-events-none absolute inset-0 -z-10" />}
      <div className={cn('container-page', containerClassName)}>{children}</div>
    </Tag>
  )
}
