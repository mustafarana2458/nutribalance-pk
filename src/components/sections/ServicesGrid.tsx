import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { services } from '@/data/services'
import { fallbackImage, serviceImages } from '@/data/images'
import { Img } from '@/components/ui/Img'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'

export function ServicesGrid({ limit }: { limit?: number }) {
  const shown = limit ? services.slice(0, limit) : services

  return (
    <Section tone="white" id="services">
      <SectionHeading
        eyebrow="What I help with"
        title="Nutrition support, built around you"
        description="Six ways to work together — every one of them delivered online, and every plan written for your health, routine and preferences."
        action={
          <Button to="/services" variant="outline">
            All services
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Button>
        }
      />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((service, index) => (
          <Reveal as="li" key={service.slug} delay={index * 0.06}>
            <Link
              to={`/services/${service.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-cream-200 bg-cream-50 transition-all duration-300 ease-soft hover:-translate-y-1 hover:border-forest-300 hover:bg-white hover:shadow-lift focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Img
                  variant="wide"
                  image={serviceImages[service.slug] ?? fallbackImage}
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, calc(100vw - 40px)"
                  className="transition-transform duration-500 ease-soft group-hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 grid h-11 w-11 place-items-center rounded-2xl bg-white/95 text-forest-600 shadow-soft md:backdrop-blur-sm">
                  <service.icon className="h-5 w-5" aria-hidden />
                </span>
              </div>

              <div className="flex flex-1 flex-col p-7">
              <h3 className="font-display text-xl font-semibold text-forest-700">
                {service.title}
              </h3>
              <p className="mt-1.5 text-sm font-medium text-apricot-700">{service.tagline}</p>
              <p className="mt-4 flex-1 text-pretty text-base leading-relaxed sm:text-sm text-ink-600">
                {service.description}
              </p>

              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-600">
                Learn more
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
