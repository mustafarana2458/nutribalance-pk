import { useMemo, useState } from 'react'
import { Mail, Search } from 'lucide-react'
import { faqs, type Faq as FaqItem } from '@/data/faqs'
import { instagramDmLink, site } from '@/data/site'
import { useSeo } from '@/hooks/useSeo'
import { PageHeader } from '@/components/sections/PageHeader'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { Section } from '@/components/ui/Section'
import { Accordion } from '@/components/ui/Accordion'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { useProtectedMailto } from '@/hooks/useProtectedMailto'
import { InstagramIcon } from '@/components/ui/BrandIcons'
import { cn } from '@/lib/cn'

const categories: (FaqItem['category'] | 'All')[] = [
  'All',
  'Online consultations',
  'Your plan',
  'Booking & payment',
  'Medical',
]

export default function Faq() {
  const [category, setCategory] = useState<(typeof categories)[number]>('All')
  const [query, setQuery] = useState('')
  const mailto = useProtectedMailto()

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return faqs.filter((faq) => {
      const matchesCategory = category === 'All' || faq.category === category
      const matchesQuery =
        !term ||
        faq.question.toLowerCase().includes(term) ||
        faq.answer.toLowerCase().includes(term)
      return matchesCategory && matchesQuery
    })
  }, [category, query])

  useSeo({
    title: 'Frequently Asked Questions',
    description: `Answers on how online video consultations work, what to prepare, how you receive your diet plan, booking from abroad, payment, and working alongside your doctor.`,
    path: '/faq',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  })

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'FAQ' }]}
        eyebrow="FAQ"
        title="Questions people ask before booking"
        description="Everything about how an online consultation runs, what you need, and how payment works. If something is not covered here, send an Instagram DM."
      />

      <Section tone="cream">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <Reveal>
              <label htmlFor="faq-search" className="sr-only">
                Search questions
              </label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink-400"
                  aria-hidden
                />
                <input
                  id="faq-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search questions…"
                  className="w-full rounded-full border border-cream-200 bg-white py-3 pl-11 pr-4 text-ink-900 placeholder:text-ink-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2"
                />
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div
                role="group"
                aria-label="Filter questions by topic"
                className="mt-5 flex flex-wrap gap-2 lg:flex-col lg:items-start"
              >
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    aria-pressed={category === item}
                    className={cn(
                      'min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ease-soft focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2 lg:w-full lg:text-left',
                      category === item
                        ? 'border-forest-600 bg-forest-600 text-white'
                        : 'border-cream-200 bg-white text-ink-600 hover:border-forest-300 hover:text-forest-700',
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-8 rounded-3xl border border-cream-200 bg-sage-100 p-7">
                <InstagramIcon className="h-7 w-7 text-forest-600" />
                <h2 className="mt-4 font-display text-lg font-semibold text-forest-700">
                  Still not sure?
                </h2>
                <p className="mt-2 text-base leading-relaxed sm:text-sm text-ink-600">
                  Send your question directly. Replies usually arrive the same working day.
                </p>
                <Button
                  href={instagramDmLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 w-full"
                >
                  <InstagramIcon className="h-4 w-4" />
                  Ask on Instagram
                </Button>
                <Button {...mailto} variant="outline" className="mt-2.5 w-full">
                  <Mail className="h-4 w-4" aria-hidden />
                  Email instead
                </Button>
                <p className="mt-3 text-center text-xs text-ink-500">{site.contact.hours}</p>
              </div>
            </Reveal>
          </div>

          <div>
            <p aria-live="polite" className="mb-4 text-sm text-ink-500">
              {filtered.length} {filtered.length === 1 ? 'question' : 'questions'}
              {category !== 'All' && ` in ${category}`}
            </p>

            {filtered.length > 0 ? (
              <Accordion
                items={filtered.map((faq) => ({
                  id: faq.id,
                  question: faq.question,
                  answer: faq.answer,
                }))}
                defaultOpenId={filtered[0]?.id}
              />
            ) : (
              <div className="rounded-3xl border border-dashed border-cream-200 bg-white p-10 text-center">
                <p className="font-display text-lg text-forest-700">No matching questions</p>
                <p className="mt-2 text-sm text-ink-600">
                  Try a different search, or ask directly on Instagram.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>

      <CtaBanner />
    </>
  )
}
