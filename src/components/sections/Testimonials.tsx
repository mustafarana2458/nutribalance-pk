import { useCallback, useEffect, useRef, useState, type TouchEvent } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { showTestimonials, testimonials } from '@/data/testimonials'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cn } from '@/lib/cn'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const AUTOPLAY_MS = 7000
/** Horizontal distance (px) a touch must travel to count as a swipe. */
const SWIPE_PX = 40

/** Renders nothing until `showTestimonials` is true and real testimonials exist in src/data/testimonials.ts. */
export function Testimonials() {
  if (!showTestimonials || testimonials.length === 0) return null
  return <TestimonialsCarousel />
}

function TestimonialsCarousel() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const reduced = usePrefersReducedMotion()

  const go = useCallback((next: number, dir: number) => {
    setDirection(dir)
    setIndex((next + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    // Autoplay is a convenience, never a requirement — it stops on hover,
    // on keyboard focus, and entirely when reduced motion is requested.
    if (paused || reduced) return
    const timer = window.setInterval(() => go(index + 1, 1), AUTOPLAY_MS)
    return () => window.clearInterval(timer)
  }, [index, paused, reduced, go])

  const active = testimonials[index]

  // Swipe on touch screens: horizontal drags change slide, vertical ones scroll the page.
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const onTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0]
    touchStart.current = { x: touch.clientX, y: touch.clientY }
    setPaused(true)
  }
  const onTouchEnd = (event: TouchEvent) => {
    const start = touchStart.current
    touchStart.current = null
    setPaused(false)
    if (!start) return
    const touch = event.changedTouches[0]
    const dx = touch.clientX - start.x
    const dy = touch.clientY - start.y
    if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) < Math.abs(dy)) return
    if (dx < 0) go(index + 1, 1)
    else go(index - 1, -1)
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight') go(index + 1, 1)
    if (event.key === 'ArrowLeft') go(index - 1, -1)
  }

  return (
    <Section tone="forest" grain>
      <SectionHeading align="center" inverted eyebrow="Client stories" title="What clients say" />

      <div
        className="relative mx-auto mt-10 max-w-3xl"
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ touchAction: 'pan-y' }}
      >
        <Quote
          aria-hidden
          className="absolute -top-6 left-1/2 h-14 w-14 -translate-x-1/2 text-forest-600"
        />

        <div className="relative min-h-[20rem] sm:min-h-[17rem]">
          <AnimatePresence mode="wait" custom={direction}>
            <m.figure
              key={active.id}
              custom={direction}
              initial={reduced ? false : { opacity: 0, x: direction * 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, x: direction * -28 }}
              transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-center pt-10 text-center"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${testimonials.length}`}
            >
              <blockquote className="text-balance font-display text-xl leading-relaxed text-white sm:text-2xl sm:leading-relaxed">
                “{active.quote}”
              </blockquote>

              <figcaption className="mt-7 flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-sage-200 font-display text-sm font-semibold text-forest-700">
                  {active.firstName.charAt(0)}
                </span>
                <span className="text-left">
                  <span className="block font-semibold text-white">{active.firstName}</span>
                  <span className="block text-sm text-sage-200/80">{active.city}</span>
                  <span className="mt-0.5 block text-xs text-apricot-400">{active.service}</span>
                </span>
              </figcaption>
            </m.figure>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => go(index - 1, -1)}
            aria-label="Previous testimonial"
            className="grid h-11 w-11 place-items-center rounded-full border border-forest-500 text-sage-200 transition-colors duration-200 hover:bg-forest-600 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-forest-700"
          >
            <ArrowLeft className="h-4.5 w-4.5" aria-hidden />
          </button>

          <div className="flex">
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(i, i > index ? 1 : -1)}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === index}
                // 44px tap target around a small visual dot.
                className="group grid h-11 min-w-8 place-items-center rounded-full focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-forest-700"
              >
                <span
                  aria-hidden
                  className={cn(
                    'block h-2 rounded-full transition-[width,background-color] duration-300 ease-soft',
                    i === index ? 'w-7 bg-apricot-500' : 'w-2 bg-forest-500 group-hover:bg-forest-400',
                  )}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(index + 1, 1)}
            aria-label="Next testimonial"
            className="grid h-11 w-11 place-items-center rounded-full border border-forest-500 text-sage-200 transition-colors duration-200 hover:bg-forest-600 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-forest-700"
          >
            <ArrowRight className="h-4.5 w-4.5" aria-hidden />
          </button>
        </div>

        <p aria-live="polite" className="sr-only">
          Testimonial {index + 1} of {testimonials.length}: {active.firstName}
        </p>
      </div>
    </Section>
  )
}
