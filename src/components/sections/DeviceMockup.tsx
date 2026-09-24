import { Leaf, Mic, Video } from 'lucide-react'
import { site } from '@/data/site'
import { cn } from '@/lib/cn'

/**
 * Pure-CSS/SVG device mockup: a laptop showing an online consultation and a phone
 * showing a meal plan. Stands in for photography — to use a real screenshot,
 * replace the contents of `.screen` with an <img> at the same aspect ratio.
 */
export function DeviceMockup({ className }: { className?: string }) {
  return (
    <div className={cn('relative', className)}>
      {/* Laptop */}
      <div className="relative rounded-[1.5rem] border border-cream-200 bg-white p-2.5 shadow-lift sm:rounded-[1.75rem] sm:p-3">
        <div
          className="screen relative aspect-[16/10] overflow-hidden rounded-[1rem] bg-forest-700 sm:rounded-[1.25rem]"
          role="img"
          aria-label={`Illustration of an online nutrition consultation with ${site.nutritionist.firstName} on a video call`}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-90"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 15%, rgba(46,139,94,0.55), transparent 55%), radial-gradient(circle at 85% 80%, rgba(244,162,97,0.35), transparent 55%)',
            }}
          />

          {/* Call header */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3 sm:px-5">
            <span className="flex items-center gap-2 rounded-full bg-black/25 px-2.5 py-1 text-[0.65rem] font-medium text-white md:backdrop-blur-sm">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-red-400" />
              Live consultation
            </span>
            <span className="rounded-full bg-black/25 px-2.5 py-1 text-[0.65rem] font-medium text-white md:backdrop-blur-sm">
              45:00
            </span>
          </div>

          {/* Main speaker */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-sage-200 text-forest-700 shadow-soft sm:h-20 sm:w-20">
                <Leaf className="h-7 w-7 sm:h-9 sm:w-9" aria-hidden />
              </span>
              <span className="mt-3 rounded-full bg-black/25 px-3 py-1 text-xs font-medium text-white md:backdrop-blur-sm">
                {site.nutritionist.firstName}
              </span>
            </div>
          </div>

          {/* Self-view tile */}
          <div
            aria-hidden
            className="absolute bottom-12 right-3 h-14 w-20 rounded-lg border border-white/25 bg-forest-800/80 md:backdrop-blur-sm sm:bottom-14 sm:right-4 sm:h-16 sm:w-24"
          >
            <span className="absolute inset-0 grid place-items-center text-[0.6rem] font-medium text-sage-200">
              You
            </span>
          </div>

          {/* Call controls */}
          <div aria-hidden className="absolute inset-x-0 bottom-0 flex justify-center gap-2 pb-3 sm:pb-4">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white md:backdrop-blur-sm">
              <Mic className="h-3.5 w-3.5" />
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white md:backdrop-blur-sm">
              <Video className="h-3.5 w-3.5" />
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-red-500/90 text-white">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                <path d="M12 9c-2 0-3.9.3-5.7 1v3.2c0 .4-.2.8-.6 1l-2.3 1.2a1 1 0 0 1-1.2-.2l-1.9-2a1 1 0 0 1 0-1.4C2.7 9.5 7 7.8 12 7.8s9.3 1.7 11.7 4a1 1 0 0 1 0 1.4l-1.9 2a1 1 0 0 1-1.2.2l-2.3-1.2a1.1 1.1 0 0 1-.6-1V10c-1.8-.7-3.7-1-5.7-1Z" />
              </svg>
            </span>
          </div>
        </div>

        {/* Laptop base */}
        <div aria-hidden className="mx-auto mt-2 h-1.5 w-1/4 rounded-full bg-cream-200" />
      </div>

      {/* Phone showing a meal plan */}
      <PhoneMealPlan className="absolute -bottom-10 -left-4 w-28 sm:-left-8 sm:w-36" />
    </div>
  )
}

/** The phone on its own, for layouts that do not need the laptop. */
export function PhoneMealPlan({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rounded-[1.25rem] border border-cream-200 bg-white p-1.5 shadow-lift sm:rounded-[1.5rem] sm:p-2',
        className,
      )}
    >

        <div
          className="screen aspect-[9/17] overflow-hidden rounded-[0.9rem] bg-cream-50 sm:rounded-[1.1rem]"
          role="img"
          aria-label="Illustration of a personalized diet plan displayed on a phone"
        >
          <div className="bg-forest-600 px-2.5 py-2 sm:px-3">
            <p className="text-[0.5rem] font-semibold uppercase tracking-[0.1em] text-sage-200 sm:text-[0.55rem]">
              Your plan
            </p>
            <p className="mt-0.5 font-display text-[0.6rem] font-semibold text-white sm:text-xs">
              Week 1 · Day 3
            </p>
          </div>

          <ul className="space-y-1.5 p-2 sm:space-y-2 sm:p-2.5">
            {[
              { meal: 'Breakfast', tone: 'bg-sage-200' },
              { meal: 'Mid-morning', tone: 'bg-apricot-100' },
              { meal: 'Lunch', tone: 'bg-sage-200' },
              { meal: 'Evening', tone: 'bg-apricot-100' },
              { meal: 'Dinner', tone: 'bg-sage-200' },
            ].map((row) => (
              <li key={row.meal} className={cn('rounded-lg px-2 py-1.5', row.tone)}>
                <span className="block text-[0.45rem] font-semibold text-forest-700 sm:text-[0.55rem]">
                  {row.meal}
                </span>
                <span aria-hidden className="mt-1 block h-0.5 w-10 rounded-full bg-forest-600/30 sm:w-14" />
                <span aria-hidden className="mt-1 block h-0.5 w-8 rounded-full bg-forest-600/20 sm:w-10" />
              </li>
            ))}
          </ul>
        </div>
    </div>
  )
}
