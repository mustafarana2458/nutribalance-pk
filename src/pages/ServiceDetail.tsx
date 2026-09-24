import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight, Check, Clock, Target, Video } from 'lucide-react'
import { getService, services } from '@/data/services'
import { fallbackImage, serviceImages } from '@/data/images'
import { Img } from '@/components/ui/Img'
import { processSteps } from '@/data/process'
import { instagramDmLink, site } from '@/data/site'
import { lowestMonthlyPrice } from '@/data/plans'
import { useSeo } from '@/hooks/useSeo'
import { PageHeader } from '@/components/sections/PageHeader'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { InstagramIcon } from '@/components/ui/BrandIcons'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)

  useSeo({
    title: service ? service.title : 'Service not found',
    description: service
      ? `${service.tagline}. ${service.description}`
      : 'This nutrition service could not be found.',
    path: `/services/${slug ?? ''}`,
    jsonLd: service
      ? {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.title,
          description: service.description,
          provider: { '@type': 'Organization', name: site.name },
          areaServed: 'Worldwide',
          url: `${site.url}/services/${service.slug}`,
        }
      : undefined,
  })

  if (!service) return <Navigate to="/services" replace />

  const others = services.filter((item) => item.slug !== service.slug).slice(0, 3)

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Services', to: '/services' }, { label: service.title }]}
        eyebrow={service.format}
        title={service.title}
        description={service.tagline}
      >
        <div className="flex flex-wrap gap-3">
          <Button to="/book" size="lg">
            Book this service
          </Button>
          <Button
            href={instagramDmLink()}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="lg"
          >
            <InstagramIcon className="h-4.5 w-4.5" />
            Ask a question
          </Button>
        </div>
      </PageHeader>

      <Section tone="cream">
        <Reveal>
          <div className="relative mb-12 overflow-hidden rounded-[2rem] border border-cream-200 shadow-soft">
            <Img
              variant="wide"
              image={serviceImages[service.slug] ?? fallbackImage}
              sizes="100vw"
              className="aspect-[16/9] sm:aspect-[21/9]"
            />
          </div>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <div>
            <Reveal>
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-forest-600 text-white shadow-soft">
                <service.icon className="h-7 w-7" aria-hidden />
              </span>
              <h2 className="mt-7 text-display-sm">About this service</h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-600">
                {service.description}
              </p>
              <p className="mt-4 text-pretty leading-relaxed text-ink-600">{service.detail}</p>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-12 text-display-sm">Who this is for</h2>
              <ul className="mt-5 space-y-3">
                {service.forWhom.map((item) => (
                  <li
                    key={item}
                    className="flex gap-4 rounded-2xl border border-cream-200 bg-white p-5 text-ink-700"
                  >
                    <Target className="mt-0.5 h-5 w-5 shrink-0 text-apricot-600" aria-hidden />
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12}>
              <h2 className="mt-12 text-display-sm">How it works online</h2>
              <ol className="mt-5 space-y-4">
                {processSteps.map((step) => (
                  <li key={step.number} className="flex gap-5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sage-200 font-display text-sm font-semibold text-forest-700">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-forest-700">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-pretty text-base leading-relaxed sm:text-sm text-ink-600">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          {/* Sticky summary rail */}
          <Reveal delay={0.1}>
            <aside className="lg:sticky lg:top-28">
              <div className="rounded-3xl border border-cream-200 bg-white p-7 shadow-soft">
                <h2 className="font-display text-lg font-semibold text-forest-700">
                  What&rsquo;s included
                </h2>
                <ul className="mt-5 space-y-3">
                  {service.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-ink-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>

                <dl className="mt-7 space-y-3 border-t border-cream-200 pt-6 text-sm">
                  <div className="flex items-center gap-2.5">
                    <Clock className="h-4 w-4 shrink-0 text-ink-400" aria-hidden />
                    <dt className="sr-only">Format</dt>
                    <dd className="text-ink-600">{service.duration}</dd>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Video className="h-4 w-4 shrink-0 text-ink-400" aria-hidden />
                    <dt className="sr-only">Delivered over</dt>
                    <dd className="text-ink-600">{service.format}</dd>
                  </div>
                </dl>

                {/* Only the follow-up packages have a listed price. */}
                {service.slug === 'monthly-follow-up-packages' && lowestMonthlyPrice() && (
                  <p className="mt-6 rounded-2xl bg-sage-100 px-5 py-4 text-center text-sm text-ink-700">
                    Packages from{' '}
                    <strong className="font-display text-base font-semibold text-forest-700">
                      {lowestMonthlyPrice()}
                    </strong>
                    /month ·{' '}
                    <Link to="/plans" className="link-underline font-medium text-forest-600">
                      compare packages
                    </Link>
                  </p>
                )}

                <Button to="/book" size="lg" className="mt-6 w-full">
                  Book this service
                </Button>
                <p className="mt-3 text-center text-xs text-ink-500">
                  {site.service.reach} · {site.service.timezone}
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </Section>

      <Section tone="white">
        <h2 className="text-display-sm">Other services</h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-3">
          {others.map((item, index) => (
            <Reveal as="li" key={item.slug} delay={index * 0.06}>
              <Link
                to={`/services/${item.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-cream-200 bg-cream-50 transition-all duration-300 ease-soft hover:-translate-y-1 hover:border-forest-300 hover:bg-white hover:shadow-lift focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <Img
                    variant="wide"
                    image={serviceImages[item.slug] ?? fallbackImage}
                    sizes="(min-width: 640px) 30vw, 90vw"
                    className="transition-transform duration-500 ease-soft group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                <h3 className="flex-1 font-display text-lg font-semibold text-forest-700">
                  {item.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-600">
                  View
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      <CtaBanner title={`Ready to start with ${service.title}?`} />
    </>
  )
}
