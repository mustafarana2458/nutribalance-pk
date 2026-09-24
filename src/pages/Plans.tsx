import {
  defaultBilling,
  defaultCurrency,
  formatPrice,
  planComparisonRows,
  plans,
  priceOnRequestLabel,
} from '@/data/plans'
import { faqs } from '@/data/faqs'
import { site } from '@/data/site'
import { useSeo } from '@/hooks/useSeo'
import { PageHeader } from '@/components/sections/PageHeader'
import { Pricing } from '@/components/sections/Pricing'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Accordion } from '@/components/ui/Accordion'
import { Reveal } from '@/components/ui/Reveal'

const planFaqs = faqs.filter((faq) => faq.category === 'Booking & payment')

export default function Plans() {
  useSeo({
    title: 'Plans & Pricing',
    description: `Monthly follow-up packages with ${site.nutritionist.firstName} — Basic, Standard and Premium. Video consultations, diet plan updates and chat support, billed monthly or every 3 months, in PKR or USD.`,
    path: '/plans',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: plans.map((plan, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: plan.name,
        description: plan.blurb,
        url: `${site.url}/plans`,
      })),
    },
  })

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Plans & Pricing' }]}
        eyebrow="Plans & pricing"
        title="Monthly follow-up packages"
        description="Ongoing support built on three things: how often we meet, how often your plan is updated, and how much chat support you have in between. Choose the level that matches your goal."
      />

      <Pricing
        tone="cream"
        eyebrow="Choose a package"
        title="Three levels of ongoing support"
        description="Monthly pricing in PKR. Every package is written personally for you, and you can move between them at any cycle boundary."
      />

      {/* Comparison table */}
      <Section tone="white">
        <SectionHeading
          align="center"
          eyebrow="Compare"
          title="What each package includes"
        />

        <Reveal delay={0.06}>
          <div className="mt-12 overflow-x-auto rounded-3xl border border-cream-200">
            <table className="w-full min-w-[46rem] border-collapse bg-white text-left">
              <caption className="sr-only">
                Comparison of the Basic, Standard and Premium follow-up packages
              </caption>
              <thead>
                <tr className="border-b border-cream-200 bg-sage-100">
                  <th scope="col" className="px-6 py-5 text-sm font-semibold text-forest-700">
                    Included
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.id}
                      scope="col"
                      className="px-6 py-5 text-center font-display text-base font-semibold text-forest-700"
                    >
                      {plan.name}
                      {plan.popular && (
                        <span className="ml-2 rounded-full bg-apricot-500 px-2 py-0.5 align-middle text-[0.65rem] font-semibold text-ink-900">
                          Popular
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200">
                <tr className="bg-cream-50/60">
                  <th scope="row" className="px-6 py-4 text-sm font-medium text-ink-700">
                    Price
                  </th>
                  {plans.map((plan) => {
                    const price = formatPrice(
                      plan.price[defaultBilling][defaultCurrency],
                      defaultCurrency,
                    )
                    return (
                      <td key={plan.id} className="px-6 py-4 text-center">
                        <span className="font-display text-lg font-semibold text-forest-700">
                          {price ?? priceOnRequestLabel}
                        </span>
                        {price && <span className="text-sm text-ink-500">/month</span>}
                      </td>
                    )
                  })}
                </tr>
                {planComparisonRows.map((row) => (
                  <tr key={row.key} className="transition-colors duration-200 hover:bg-cream-50">
                    <th scope="row" className="px-6 py-4 text-sm font-medium text-ink-700">
                      {row.label}
                    </th>
                    {plans.map((plan) => (
                      <td
                        key={plan.id}
                        className="px-6 py-4 text-center text-sm text-ink-700"
                      >
                        {plan.details[row.key]}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="transition-colors duration-200 hover:bg-cream-50">
                  <th scope="row" className="px-6 py-4 align-top text-sm font-medium text-ink-700">
                    Also included
                  </th>
                  {plans.map((plan) => (
                    <td key={plan.id} className="px-6 py-4 align-top">
                      <ul className="space-y-1.5 text-left text-sm text-ink-600">
                        {plan.extras.map((extra) => (
                          <li key={extra}>{extra}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed sm:text-sm text-ink-600">
            Not sure which fits? Most clients start on{' '}
            <strong className="text-forest-700">Standard</strong> and adjust after the first month.
            You can move between packages at any cycle boundary.
          </p>
        </Reveal>
      </Section>

      {/* Booking & payment FAQ */}
      <Section tone="sage" grain>
        <SectionHeading
          align="center"
          eyebrow="Booking & payment"
          title="The practical details"
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <Accordion
            items={planFaqs.map((faq) => ({
              id: faq.id,
              question: faq.question,
              answer: faq.answer,
            }))}
            defaultOpenId={planFaqs[0]?.id}
          />
        </div>
      </Section>

      <CtaBanner
        title="Still deciding? Ask before you commit"
        description="A short Instagram DM is usually enough to work out which package makes sense for you."
      />
    </>
  )
}
