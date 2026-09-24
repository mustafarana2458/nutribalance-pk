import { processSteps } from '@/data/process'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Blob } from '@/components/ui/Blob'

export function HowItWorks() {
  return (
    <Section tone="sage" grain>
      <Blob className="-right-20 top-10 h-72 w-72" tone="cream" />

      <SectionHeading
        align="center"
        eyebrow="The process"
        title="How online consultation works"
        description="From booking to your finished plan — four steps, all of it online, wherever you are."
      />

      <ol className="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Connector line, desktop only */}
        <div
          aria-hidden
          className="absolute left-0 right-0 top-[3.25rem] hidden h-px bg-forest-300/60 lg:block"
        />

        {processSteps.map((step, index) => (
          <Reveal as="li" key={step.number} delay={index * 0.08} className="relative">
            <div className="flex h-full flex-col rounded-3xl border border-white/70 bg-white/80 p-7 md:backdrop-blur-sm transition-shadow duration-300 hover:shadow-lift">
              <div className="flex items-center justify-between">
                <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-forest-600 text-white shadow-soft">
                  <step.icon className="h-6 w-6" aria-hidden />
                </span>
                <span className="font-display text-3xl font-semibold text-forest-200">
                  {step.number}
                </span>
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold text-forest-700">
                {step.title}
              </h3>
              <p className="mt-3 text-pretty text-base leading-relaxed sm:text-sm text-ink-600">
                {step.description}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
