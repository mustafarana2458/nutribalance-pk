import { Award, Check, GraduationCap, Quote, Stethoscope } from 'lucide-react'
import { affiliations, approach, credentials, experience, mission, story } from '@/data/about'
import { site, trustBadges } from '@/data/site'
import { useSeo } from '@/hooks/useSeo'
import { PageHeader } from '@/components/sections/PageHeader'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { DeviceMockup } from '@/components/sections/DeviceMockup'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { Blob } from '@/components/ui/Blob'

export default function About() {
  useSeo({
    title: `About ${site.nutritionist.firstName}`,
    description: `Meet ${site.nutritionist.firstName}, a ${site.nutritionist.credentials} focused on clinical nutrition and personalized diet planning. Online consultations across Pakistan and worldwide.`,
    path: '/about',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: site.nutritionist.name,
      jobTitle: site.nutritionist.credentials,
      description: site.nutritionist.role,
      worksFor: { '@type': 'Organization', name: site.name },
      url: `${site.url}/about`,
    },
  })

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'About' }]}
        eyebrow="About"
        title="Clinical nutrition, made practical"
        description={mission}
      />

      {/* Intro */}
      <Section tone="cream">
        <div className="grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div className="lg:pr-6">
              <DeviceMockup />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="eyebrow">My approach</span>
              <h2 className="mt-4 text-balance text-display-md">
                Plans built for your life, not a template
              </h2>
            </Reveal>

            <div className="mt-6 space-y-5">
              {story.map((paragraph, index) => (
                <Reveal key={index} delay={0.06 * index}>
                  <p className="text-pretty leading-relaxed text-ink-600">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <figure className="mt-9 rounded-3xl border-l-4 border-apricot-500 bg-sage-100 p-7">
                <Quote className="h-7 w-7 text-forest-600" aria-hidden />
                <blockquote className="mt-3 font-display text-lg leading-relaxed text-forest-700">
                  {mission}
                </blockquote>
                <figcaption className="mt-4 text-sm text-ink-600">
                  {site.nutritionist.firstName} — {site.nutritionist.credentials}
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.24}>
              <dl className="mt-9 grid grid-cols-3 gap-5 border-t border-cream-200 pt-7">
                {trustBadges.map((badge) => (
                  <div key={badge.label}>
                    <dt className="sr-only">{badge.label}</dt>
                    <dd>
                      <span className="block font-display text-2xl font-semibold text-forest-700">
                        {badge.value}
                      </span>
                      <span className="mt-1 block text-xs text-ink-500">{badge.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Approach */}
      <Section tone="white">
        <SectionHeading
          align="center"
          eyebrow="How I work"
          title="Four principles behind every plan"
          description="Whatever the goal or diagnosis, these shape the advice you receive."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {approach.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 0.07}>
              <div className="flex h-full gap-5 rounded-3xl border border-cream-200 bg-cream-50 p-7 transition-shadow duration-300 hover:shadow-lift">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-forest-600 text-white">
                  <Check className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-forest-700">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-pretty text-base leading-relaxed sm:text-sm text-ink-600">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Qualifications + experience */}
      <Section tone="sage" grain>
        <Blob className="-left-24 top-16 h-72 w-72" tone="cream" />

        <Reveal>
          <p className="mb-10 inline-flex rounded-full border border-dashed border-forest-300 bg-white/70 px-4 py-2 text-xs font-medium text-forest-700">
            Qualifications below are placeholders — replace them in{' '}
            <code className="mx-1">src/data/about.ts</code>
          </p>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <span className="eyebrow bg-white/70">
                <GraduationCap className="h-3.5 w-3.5" aria-hidden />
                Qualifications
              </span>
              <h2 className="mt-4 text-display-md">Education & certifications</h2>
            </Reveal>

            <ol className="mt-9 space-y-1">
              {credentials.map((item, index) => (
                <Reveal as="li" key={`${item.title}-${index}`} delay={index * 0.06}>
                  <div className="flex gap-5 rounded-2xl bg-white/70 p-5 transition-colors duration-300 hover:bg-white">
                    <span className="shrink-0 font-display text-sm font-semibold text-apricot-700">
                      {item.year}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-forest-700">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-ink-600">{item.institution}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <div>
            <Reveal>
              <span className="eyebrow bg-white/70">
                <Stethoscope className="h-3.5 w-3.5" aria-hidden />
                Experience
              </span>
              <h2 className="mt-4 text-display-md">Practice background</h2>
            </Reveal>

            <ol className="relative mt-9 space-y-6 border-l border-forest-300 pl-7">
              {experience.map((item, index) => (
                <Reveal as="li" key={`${item.role}-${index}`} delay={index * 0.08} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[2.1rem] top-1.5 h-3 w-3 rounded-full border-2 border-sage-200 bg-forest-600"
                  />
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-apricot-700">
                    {item.period}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-forest-700">
                    {item.role}
                  </h3>
                  <p className="text-sm text-ink-500">{item.place}</p>
                  <p className="mt-2 text-pretty text-base leading-relaxed sm:text-sm text-ink-600">
                    {item.detail}
                  </p>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={0.2}>
              <div className="mt-10 rounded-3xl border border-white/70 bg-white/70 p-7">
                <h3 className="flex items-center gap-2 font-display text-base font-semibold text-forest-700">
                  <Award className="h-4.5 w-4.5 text-apricot-600" aria-hidden />
                  Memberships & affiliations
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {affiliations.map((item, index) => (
                    <li
                      key={`${item}-${index}`}
                      className="rounded-full border border-forest-200 bg-white px-3.5 py-1.5 text-xs font-medium text-forest-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl bg-white/70 px-7 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="max-w-xl text-pretty text-ink-700">
              Not sure whether this approach fits your situation? Ask first — a short Instagram
              DM costs nothing and usually answers it.
            </p>
            <Button to="/book" size="lg" className="shrink-0">
              Book a consultation
            </Button>
          </div>
        </Reveal>
      </Section>

      <HowItWorks />

      <CtaBanner
        title="Let's build a plan you can actually keep"
        description="Every consultation starts with what you really eat and what your week really looks like. Everything else follows from there."
      />
    </>
  )
}
