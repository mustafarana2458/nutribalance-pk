import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Blob } from '@/components/ui/Blob'

type Crumb = { label: string; to?: string }

type PageHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  crumbs?: Crumb[]
  children?: ReactNode
}

/** Shared top-of-page band for every inner route. */
export function PageHeader({ eyebrow, title, description, crumbs, children }: PageHeaderProps) {
  return (
    <header className="relative isolate overflow-hidden border-b border-cream-200 bg-sage-100 py-14 sm:py-20">
      <div aria-hidden className="grain pointer-events-none absolute inset-0 -z-10" />
      <Blob className="-right-24 -top-28 h-80 w-80" tone="apricot" />
      <Blob className="-left-24 bottom-0 h-72 w-72" tone="forest" />

      <div className="container-page">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-500">
              <li>
                <Link to="/" className="link-underline tap-target hover:text-forest-700">
                  Home
                </Link>
              </li>
              {crumbs.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5 text-ink-400" aria-hidden />
                  {crumb.to ? (
                    <Link to={crumb.to} className="link-underline tap-target hover:text-forest-700">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-forest-700">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Not wrapped in <Reveal>: the title and intro are the Largest Contentful
            Paint on inner pages and must paint immediately, not after JS runs. */}
        <div className="max-w-3xl">
          {eyebrow && <span className="eyebrow mb-4 bg-white/70">{eyebrow}</span>}
          <h1 className="text-balance text-display-lg">{title}</h1>
          {description && (
            <p className="mt-5 text-pretty text-base leading-relaxed text-ink-600 sm:text-lg">
              {description}
            </p>
          )}
          {children && <div className="mt-8 animate-fade-up">{children}</div>}
        </div>
      </div>
    </header>
  )
}
