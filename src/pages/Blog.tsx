import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock } from 'lucide-react'
import { formatPostDate, posts } from '@/data/posts'
import { fallbackImage, postImages } from '@/data/images'
import { Img } from '@/components/ui/Img'
import { site } from '@/data/site'
import { useSeo } from '@/hooks/useSeo'
import { PageHeader } from '@/components/sections/PageHeader'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'

const categories = ['All', ...Array.from(new Set(posts.map((post) => post.category)))]

export default function Blog() {
  const [active, setActive] = useState('All')

  const visible = useMemo(
    () => (active === 'All' ? posts : posts.filter((post) => post.category === active)),
    [active],
  )

  const sorted = useMemo(
    () => [...visible].sort((a, b) => b.date.localeCompare(a.date)),
    [visible],
  )

  useSeo({
    title: 'Nutrition Blog',
    description: `Practical, evidence-based nutrition articles on PCOS-friendly eating, managing blood sugar through diet, and sustainable weight loss.`,
    path: '/blog',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: `${site.name} Blog`,
      url: `${site.url}/blog`,
      blogPost: posts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        datePublished: post.date,
        url: `${site.url}/blog/${post.slug}`,
      })),
    },
  })

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Blog' }]}
        eyebrow="Blog"
        title="Nutrition, explained simply"
        description="No superfoods, no detoxes — just the questions clients actually ask, answered properly."
      />

      <Section tone="cream">
        <div role="group" aria-label="Filter posts by category" className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={active === category}
              className={cn(
                'min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ease-soft focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2',
                active === category
                  ? 'border-forest-600 bg-forest-600 text-white'
                  : 'border-cream-200 bg-white text-ink-600 hover:border-forest-300 hover:text-forest-700',
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((post, index) => (
            <Reveal as="li" key={post.slug} delay={index * 0.06}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-cream-200 bg-white shadow-soft transition-all duration-300 ease-soft hover:-translate-y-1 hover:shadow-lift">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Img
                    variant="wide"
                    image={postImages[post.slug] ?? fallbackImage}
                    sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, calc(100vw - 40px)"
                    className="transition-transform duration-500 ease-soft group-hover:scale-105"
                  />
                  {/* Wash behind the category chip so it reads on any photo. */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-ink-900/35 to-transparent"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-forest-700 shadow-soft">
                    {post.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs text-ink-500">
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                    <span aria-hidden>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" aria-hidden />
                      {post.readingMinutes} min read
                    </span>
                  </div>

                  <h2 className="mt-3 text-pretty font-display text-xl font-semibold leading-snug text-forest-700">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="transition-colors duration-200 after:absolute after:inset-0 hover:text-forest-600 focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2"
                    >
                      <span className="relative">{post.title}</span>
                    </Link>
                  </h2>

                  <p className="mt-3 flex-1 text-pretty text-base leading-relaxed sm:text-sm text-ink-600">
                    {post.excerpt}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-600">
                    Read article
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Section>

      <CtaBanner
        title="Questions the articles did not answer?"
        description="Bring them to a consultation, or send a message — most things can be sorted out in a short conversation."
      />
    </>
  )
}
