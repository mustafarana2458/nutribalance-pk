import { Info, TriangleAlert } from 'lucide-react'
import { toolsDisclaimer } from '@/lib/calculators'
import { site } from '@/data/site'
import { EmailLink } from '@/components/ui/EmailLink'
import { useSeo } from '@/hooks/useSeo'
import { PageHeader } from '@/components/sections/PageHeader'
import { BmiCalculator } from '@/components/sections/BmiCalculator'
import { WaterCalculator } from '@/components/sections/WaterCalculator'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

export default function Tools() {
  useSeo({
    title: 'Free Nutrition Tools',
    description:
      'Free BMI calculator and daily water intake calculator from an online nutritionist. General guidance for healthy adults — not a medical assessment.',
    path: '/tools',
  })

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Tools' }]}
        eyebrow="Free tools"
        title="Two quick calculators to get you started"
        description="Useful reference points, nothing more. Numbers like these open a conversation — they do not close one."
      >
        <p className="flex max-w-2xl items-start gap-3 rounded-2xl border border-apricot-200 bg-apricot-50 px-5 py-4 text-base leading-relaxed sm:text-sm text-ink-700">
          <TriangleAlert className="mt-0.5 h-4.5 w-4.5 shrink-0 text-apricot-700" aria-hidden />
          <span>
            <strong className="font-semibold text-apricot-700">General guidance, not medical advice. </strong>
            {toolsDisclaimer}
          </span>
        </p>
      </PageHeader>

      <Section tone="cream">
        <div className="grid items-start gap-7 lg:grid-cols-2">
          <Reveal>
            <BmiCalculator />
          </Reveal>
          <Reveal delay={0.08}>
            <WaterCalculator />
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-10 grid gap-5 rounded-[2rem] border border-cream-200 bg-white p-7 sm:grid-cols-[auto_1fr] sm:p-9">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sage-200 text-forest-600">
              <Info className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h2 className="font-display text-xl font-semibold text-forest-700">
                Why these numbers only go so far
              </h2>
              <div className="mt-4 space-y-3 text-pretty text-base leading-relaxed sm:text-sm text-ink-600">
                <p>
                  BMI was designed to describe populations, not individuals. It cannot tell muscle
                  from fat, which is why a lean athlete and someone carrying visceral fat can share
                  the same number while facing completely different risks.
                </p>
                <p>
                  Water needs shift with medication, pregnancy, kidney and heart function, fever,
                  altitude and how much you sweat. A single formula cannot see any of that.
                </p>
                <p>
                  In a consultation we look at your measurements, your reports and what your week
                  actually looks like — a far more useful picture than either number here. Questions
                  are welcome by Instagram DM ({site.socials.instagramHandle}) or email at{' '}
                  <EmailLink className="link-underline font-medium text-forest-700">
                    {site.contact.email}
                  </EmailLink>
                  .
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      <CtaBanner
        title="Numbers are a starting point — a plan is the next step"
        description="Bring your results to a consultation and we will work out what they actually mean for you."
      />
    </>
  )
}
