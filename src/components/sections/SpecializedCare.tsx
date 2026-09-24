import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { services, specializedCareSlugs } from '@/data/services'
import { fallbackImage, specializedCareImages } from '@/data/images'
import { Img } from '@/components/ui/Img'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Blob } from '@/components/ui/Blob'

/** Highlight block for the two conditions the practice specialises in. */
export function SpecializedCare() {
  const highlighted = specializedCareSlugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is (typeof services)[number] => Boolean(service))

  return (
    <Section tone="forest" grain>
      <Blob className="-right-20 -top-24 h-80 w-80" tone="forest" />

      <SectionHeading
        align="center"
        inverted
        eyebrow="Specialized care"
        title="Focused support for diabetes and PCOS"
        description="Two conditions where the right nutrition changes everyday life — planned carefully, and always alongside the treatment your doctor has prescribed."
      />

      <ul className="mt-12 grid gap-6 lg:grid-cols-2">
        {highlighted.map((service, index) => (
          <Reveal as="li" key={service.slug} delay={index * 0.08}>
            <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-forest-500 bg-forest-600/60 md:backdrop-blur-sm transition-all duration-300 ease-soft hover:-translate-y-1 hover:bg-forest-600">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Img
                  variant="wide"
                  image={specializedCareImages[service.slug] ?? fallbackImage}
                  sizes="(min-width: 1024px) 560px, calc(100vw - 40px)"
                  className="transition-transform duration-500 ease-soft hover:scale-105"
                />
                {/* Keeps the icon chip readable whatever the photo does underneath. */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-forest-800/70 via-forest-800/10 to-transparent"
                />
                <span className="absolute bottom-4 left-4 grid h-12 w-12 place-items-center rounded-2xl bg-sage-200 text-forest-700 shadow-soft">
                  <service.icon className="h-6 w-6" aria-hidden />
                </span>
              </div>

              <div className="flex flex-1 flex-col p-7 sm:p-8">
              <h3 className="font-display text-2xl font-semibold text-white">
                {service.title}
              </h3>
              {/* apricot-100 rather than -400: stays AA (>5:1) on both the card and its
                  solid hover background */}
              <p className="mt-1.5 text-sm font-medium text-apricot-100">{service.tagline}</p>
              <p className="mt-4 flex-1 text-pretty leading-relaxed text-sage-200/90">
                {service.description}
              </p>

              <ul className="mt-6 space-y-2.5 border-t border-forest-500 pt-6">
                {service.forWhom.slice(0, 2).map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-sage-200/85">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-apricot-400" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                to={`/services/${service.slug}`}
                className="mt-7 inline-flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-white transition-colors duration-200 hover:text-apricot-400 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-forest-700"
              >
                Learn about this service
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={0.12}>
        <p className="mx-auto mt-10 flex max-w-3xl items-start gap-3 rounded-2xl bg-forest-600/60 px-6 py-5 text-base leading-relaxed sm:text-sm text-sage-200">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-apricot-400" aria-hidden />
          <span>
            If you take medication for diabetes or PCOS, your plan is designed to work with it. Your
            prescription stays entirely between you and your doctor — nutrition supports that
            treatment, it never replaces it.
          </span>
        </p>
      </Reveal>
    </Section>
  )
}
