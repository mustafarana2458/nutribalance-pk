import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Reveal } from './Reveal'

type SectionHeadingProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  /** Use on dark (forest) sections. */
  inverted?: boolean
  action?: ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  inverted = false,
  action,
  className,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <Reveal className={cn('max-w-2xl', centered && 'flex flex-col items-center')}>
        {eyebrow && (
          <span className={cn('eyebrow mb-4', inverted && 'bg-forest-600 text-sage-100')}>
            {eyebrow}
          </span>
        )}
        <Tag
          className={cn(
            'text-balance text-display-md',
            inverted ? 'text-white' : 'text-forest-700',
          )}
        >
          {title}
        </Tag>
        {description && (
          <p
            className={cn(
              'mt-4 text-pretty text-base leading-relaxed sm:text-lg',
              inverted ? 'text-sage-200' : 'text-ink-600',
            )}
          >
            {description}
          </p>
        )}
      </Reveal>
      {action && <Reveal delay={0.1} className="shrink-0">{action}</Reveal>}
    </div>
  )
}
