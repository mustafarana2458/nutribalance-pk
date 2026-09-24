import { ArrowRight, Info } from 'lucide-react'
import { results, resultsDisclaimer, showResults } from '@/data/results'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'

/** Renders nothing until `showResults` is true and real results exist in src/data/results.ts. */
export function Results() {
  if (!showResults || results.length === 0) return null

  return (
    <Section tone="cream" id="results">
      <SectionHeading
        eyebrow="Client progress"
        title="Change that holds up over time"
        description="Before-and-after snapshots from client programmes, shown with the markers that mattered to them."
        action={
          <Button to="/book" variant="outline">
            Start your own
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        }
      />

      <ul className="mt-8 grid gap-6 lg:grid-cols-3">
        {results.map((result, index) => (
          <Reveal as="li" key={result.id} delay={index * 0.08}>
            <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-cream-200 bg-white shadow-soft transition-all duration-300 ease-soft hover:-translate-y-1 hover:shadow-lift">
              <header className="border-b border-cream-200 bg-sage-100 px-7 py-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-forest-600 px-3 py-1 text-xs font-semibold text-white">
                    {result.program}
                  </span>
                  <span className="text-xs font-medium text-ink-500">{result.duration}</span>
                </div>
                <h3 className="mt-4 text-pretty font-display text-lg font-semibold text-forest-700">
                  {result.headline}
                </h3>
                <p className="mt-1.5 text-sm text-ink-500">{result.name}</p>
              </header>

              <dl className="flex-1 divide-y divide-cream-200 px-7">
                {result.metrics.map((metric) => (
                  <div key={metric.label} className="grid grid-cols-[1fr_auto] items-center gap-3 py-4">
                    <dt className="text-sm text-ink-600">{metric.label}</dt>
                    <dd className="flex items-center gap-2 text-sm">
                      <span className="text-ink-400">{metric.before}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-apricot-500" aria-hidden />
                      <span className="font-semibold text-forest-700">{metric.after}</span>
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="border-t border-cream-200 bg-cream-50 px-7 py-4 text-xs leading-relaxed text-ink-500">
                {result.note}
              </p>
            </article>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={0.1}>
        <p className="mt-8 flex max-w-3xl items-start gap-3 rounded-2xl border border-cream-200 bg-white px-5 py-4 text-base leading-relaxed sm:text-sm text-ink-600">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" aria-hidden />
          {resultsDisclaimer}
        </p>
      </Reveal>
    </Section>
  )
}
