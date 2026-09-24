import type { CSSProperties } from 'react'
import { ArrowRight, CalendarPlus, Globe, Sparkles } from 'lucide-react'
import { site, trustBadges } from '@/data/site'
import { Button } from '@/components/ui/Button'
import { Blob } from '@/components/ui/Blob'
import { Img } from '@/components/ui/Img'
import { heroImage, heroImageSizes } from '@/data/images'
import { PhoneMealPlan } from '@/components/sections/DeviceMockup'

/**
 * Entrance animation is plain CSS (`animate-fade-up`, opacity + transform only),
 * so it runs before any JavaScript animation code loads. The headline and intro
 * paragraph are deliberately NOT faded: they are the Largest Contentful Paint
 * on phones and must paint the moment the page renders. Reduced motion is
 * handled by the global rule in index.css.
 */
const delay = (seconds: number): CSSProperties => ({ animationDelay: `${seconds}s` })

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-cream-50 pb-24 pt-12 sm:pb-28 sm:pt-16 lg:pb-28 lg:pt-20">
      <div aria-hidden className="grain pointer-events-none absolute inset-0 -z-20" />
      <Blob className="-right-24 -top-24 h-[26rem] w-[26rem]" tone="sage" float />
      <Blob className="-left-32 top-1/3 h-80 w-80" tone="apricot" />

      <div className="container-page grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="eyebrow animate-fade-up">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            {site.service.mode}
          </span>

          <h1 className="mt-6 text-balance text-display-xl">
            Personalized nutrition,
            <span className="relative inline-block">
              {' '}grounded in science
              <svg
                aria-hidden
                viewBox="0 0 320 16"
                className="absolute -bottom-1 left-0 w-full text-apricot-500"
                preserveAspectRatio="none"
              >
                <path
                  d="M4 11C70 5 200 3 316 8"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-ink-600">
            {site.mission} Diet plans built around your health, your routine and the food you
            actually enjoy — delivered entirely online with {site.nutritionist.firstName}, a{' '}
            {site.nutritionist.credentials.toLowerCase()}.
          </p>

          <div className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row" style={delay(0.1)}>
            <Button to="/book" size="lg">
              <CalendarPlus className="h-4.5 w-4.5" aria-hidden />
              Book consultation
            </Button>
            <Button to="/plans" variant="outline" size="lg">
              View plans
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>

          <p
            style={delay(0.15)}
            className="mt-7 inline-flex animate-fade-up items-center gap-2.5 rounded-full border border-forest-200 bg-white px-4 py-2.5 text-sm font-medium text-forest-700"
          >
            <Globe className="h-4 w-4 shrink-0 text-forest-600" aria-hidden />
            Online consultations — anywhere in Pakistan &amp; worldwide
          </p>

          <dl
            style={delay(0.2)}
            className="mt-10 grid animate-fade-up max-w-lg grid-cols-3 gap-5 border-t border-cream-200 pt-8"
          >
            {trustBadges.map((badge) => (
              <div key={badge.label}>
                <dt className="sr-only">{badge.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-semibold text-forest-700 sm:text-3xl">
                    {badge.value}
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-ink-500 sm:text-sm">
                    {badge.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          style={delay(0.1)}
          className="relative mx-auto animate-fade-up w-full max-w-md lg:max-w-none"
        >
          {/* The one eagerly-loaded image on the site. */}
          <div className="overflow-hidden rounded-[2.5rem] border border-cream-200 shadow-lift">
            <Img
              image={heroImage}
              priority
              sizes={heroImageSizes}
              className="aspect-[4/3] lg:aspect-[5/4]"
            />
          </div>

          <PhoneMealPlan className="absolute -bottom-10 -left-3 w-24 sm:-left-7 sm:w-32" />

          {/* Gentle float on larger screens only; static (and blur-free) on phones. */}
          <div className="absolute -right-2 -top-6 rounded-2xl border border-cream-200 bg-white px-4 py-3 shadow-lift sm:-right-6 md:animate-float">
            <p className="text-sm font-semibold text-forest-700">Zoom · Google Meet</p>
            <p className="text-xs text-ink-500">join from any device</p>
          </div>
        </div>
      </div>
    </section>
  )
}
