import { site } from '@/data/site'
import { whyChoose } from '@/data/whyChoose'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Blob } from '@/components/ui/Blob'

export function WhyChoose() {
  return (
    <Section tone="forest" grain>
      <Blob className="-left-24 -top-20 h-80 w-80" tone="forest" />

      <SectionHeading
        align="center"
        inverted
        eyebrow="Why clients choose us"
        title={`Why Clients Choose ${site.nutritionist.firstName}`}
        description="Practical, medically aware nutrition that fits the way you already live and eat."
      />

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {whyChoose.map((card, index) => (
          <Reveal as="li" key={card.title} delay={index * 0.08}>
            <article className="flex h-full flex-col rounded-3xl border border-forest-500 bg-forest-600/60 p-7 md:backdrop-blur-sm transition-all duration-300 ease-soft hover:-translate-y-1 hover:bg-forest-600">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sage-200 text-forest-700">
                <card.icon className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-6 text-pretty font-display text-lg font-semibold text-white">
                {card.title}
              </h3>
              <p className="mt-3 text-pretty text-base leading-relaxed sm:text-sm text-sage-200/85">
                {card.description}
              </p>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
