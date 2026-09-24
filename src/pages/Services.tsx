import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, Clock, Video } from 'lucide-react'
import { services } from '@/data/services'
import { fallbackImage, serviceImages } from '@/data/images'
import { Img } from '@/components/ui/Img'
import { site } from '@/data/site'
import { useSeo } from '@/hooks/useSeo'
import { PageHeader } from '@/components/sections/PageHeader'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'

export default function Services() {
  useSeo({
    title: 'Services',
    description: `Online nutrition services: personalized diet plans, diabetic diet consultation, PCOS diet plans, sports nutrition, one-on-one video consultations and monthly follow-up packages with ${site.nutritionist.firstName}.`,
    path: '/services',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: services.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: service.title,
        url: `${site.url}/services/${service.slug}`,
      })),
    },
  })

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Services' }]}
        eyebrow="Services"
        title="Six ways to work together"
        description="Every service is delivered online by video consultation, and every plan is written around your health, your routine and the food you enjoy. Pick the one closest to your situation — we confirm the fit on the first call."
      >
        <div className="flex flex-wrap gap-3">
          <Button to="/book" size="lg">
            Book a consultation
          </Button>
          <Button to="/plans" variant="outline" size="lg">
            Compare plans
          </Button>
        </div>
      </PageHeader>

      <Section tone="cream">
        <ul className="space-y-6">
          {services.map((service, index) => (
            <Reveal as="li" key={service.slug} delay={index * 0.04}>
              <article className="grid gap-8 rounded-[2rem] border border-cream-200 bg-white p-7 shadow-soft transition-shadow duration-300 hover:shadow-lift sm:p-9 lg:grid-cols-[1.1fr_1fr]">
                <div>
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sage-200 text-forest-600">
                      <service.icon className="h-6 w-6" aria-hidden />
                    </span>
                    <div>
                      <h2 className="font-display text-2xl font-semibold text-forest-700">
                        <Link
                          to={`/services/${service.slug}`}
                          className="-my-2 inline-block rounded py-2 transition-colors duration-200 hover:text-forest-600 focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2"
                        >
                          {service.title}
                        </Link>
                      </h2>
                      <p className="mt-1 text-sm font-medium text-apricot-700">{service.tagline}</p>
                    </div>
                  </div>

                  <p className="mt-6 text-pretty leading-relaxed text-ink-600">
                    {service.description}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-3.5 py-1.5 text-xs font-medium text-ink-600">
                      <Clock className="h-3.5 w-3.5" aria-hidden />
                      {service.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-3.5 py-1.5 text-xs font-medium text-ink-600">
                      <Video className="h-3.5 w-3.5" aria-hidden />
                      {service.format}
                    </span>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button to="/book" size="md">
                      Book this service
                    </Button>
                    <Button to={`/services/${service.slug}`} variant="outline">
                      Full details
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </Button>
                  </div>
                </div>

                <div className="overflow-hidden rounded-3xl bg-sage-100">
                  <div className="aspect-[16/9] overflow-hidden">
                    <Img
                      variant="wide"
                      image={serviceImages[service.slug] ?? fallbackImage}
                      sizes="(min-width: 1024px) 40vw, 90vw"
                    />
                  </div>
                  <div className="p-6 sm:p-7">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-forest-700">
                    What&rsquo;s included
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {service.includes.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-ink-700">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Section>

      <HowItWorks />
      <CtaBanner />
    </>
  )
}
