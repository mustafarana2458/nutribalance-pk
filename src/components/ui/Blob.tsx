import { cn } from '@/lib/cn'

type BlobProps = {
  className?: string
  tone?: 'sage' | 'apricot' | 'forest' | 'cream'
  /** Slow vertical drift (md+ only); ignored automatically under prefers-reduced-motion. */
  float?: boolean
}

const tones = {
  sage: 'bg-sage-300/50',
  apricot: 'bg-apricot-200/50',
  forest: 'bg-forest-400/25',
  cream: 'bg-cream-200/70',
}

/**
 * Purely decorative organic shape. Always aria-hidden, never focusable.
 * Hidden below `md`: large blurred layers are expensive to paint and composite
 * on mid-range phones, and the small screen reads fine without them.
 */
export function Blob({ className, tone = 'sage', float = false }: BlobProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute -z-10 hidden rounded-blob blur-2xl md:block',
        tones[tone],
        float && 'md:animate-float',
        className,
      )}
    />
  )
}
