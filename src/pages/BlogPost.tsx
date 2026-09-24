import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react'
import { formatPostDate, getPost, posts } from '@/data/posts'
import { fallbackImage, postImages } from '@/data/images'
import { Img } from '@/components/ui/Img'
import { site } from '@/data/site'
import { useSeo } from '@/hooks/useSeo'
import { PageHeader } from '@/components/sections/PageHeader'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { Section } from '@/components/ui/Section'
import { Markdown } from '@/components/ui/Markdown'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)

  useSeo({
    title: post ? post.title : 'Article not found',
    description: post ? post.excerpt : 'This article could not be found.',
    path: `/blog/${slug ?? ''}`,
    type: 'article',
    jsonLd: post
      ? {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          author: { '@type': 'Person', name: post.author },
          publisher: { '@type': 'Organization', name: site.name },
          mainEntityOfPage: `${site.url}/blog/${post.slug}`,
        }
      : undefined,
  })

  if (!post) return <Navigate to="/blog" replace />

  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 2)

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Blog', to: '/blog' }, { label: post.category }]}
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
      >
        <div className="flex flex-wrap items-center gap-4 text-sm text-ink-600">
          <span className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-forest-600 text-xs font-semibold text-white">
              A
            </span>
            {post.author}
          </span>
          <span aria-hidden className="text-ink-400">
            ·
          </span>
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-hidden className="text-ink-400">
            ·
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden />
            {post.readingMinutes} min read
          </span>
        </div>
      </PageHeader>

      <Section tone="cream">
        <div className="mx-auto max-w-prose">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] border border-cream-200 shadow-soft">
              <Img
                variant="wide"
                image={postImages[post.slug] ?? fallbackImage}
                sizes="(min-width: 768px) 68ch, 100vw"
                className="aspect-[16/9] sm:aspect-[16/7]"
              />
            </div>
          </Reveal>

          <article className="mt-12">
            <Markdown content={post.body} />
          </article>

          <div className="mt-12 rounded-3xl border border-cream-200 bg-white p-7">
            <p className="text-base leading-relaxed sm:text-sm text-ink-600">
              <strong className="font-semibold text-forest-700">A note on general advice: </strong>
              articles here describe general principles. Your medication, labs and medical history
              change what applies to you — bring anything you are unsure about to a consultation or
              to your doctor.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <Button to="/blog" variant="ghost">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              All articles
            </Button>
            <Button to="/book">Book a consultation</Button>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <h2 className="text-display-sm">Keep reading</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {related.map((item, index) => (
            <Reveal as="li" key={item.slug} delay={index * 0.07}>
              <Link
                to={`/blog/${item.slug}`}
                className="group flex h-full gap-5 rounded-3xl border border-cream-200 bg-cream-50 p-6 transition-all duration-300 ease-soft hover:-translate-y-1 hover:border-forest-300 hover:bg-white hover:shadow-lift focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2"
              >
                <span className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl">
                  <Img variant="wide" image={postImages[item.slug] ?? fallbackImage} alt="" sizes="64px" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-apricot-700">
                    {item.category}
                  </span>
                  <span className="mt-2 block text-pretty font-display text-lg font-semibold leading-snug text-forest-700">
                    {item.title}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-600">
                    Read
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      <CtaBanner />
    </>
  )
}
