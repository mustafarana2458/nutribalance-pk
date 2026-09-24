import { ArrowLeft } from 'lucide-react'
import { navLinks } from '@/data/site'
import { useSeo } from '@/hooks/useSeo'
import { Button } from '@/components/ui/Button'
import { Blob } from '@/components/ui/Blob'
import { Link } from 'react-router-dom'

export default function NotFound() {
  useSeo({
    title: 'Page not found',
    description: 'The page you were looking for does not exist.',
  })

  return (
    <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-cream-50 py-section">
      <div aria-hidden className="grain pointer-events-none absolute inset-0 -z-10" />
      <Blob className="-right-20 top-10 h-80 w-80" tone="sage" float />
      <Blob className="-left-24 bottom-0 h-72 w-72" tone="apricot" />

      <div className="container-page text-center">
        <p className="font-display text-7xl font-semibold text-forest-700 sm:text-8xl">404</p>
        <h1 className="mt-6 text-balance text-display-md">This page is off the menu</h1>
        <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-ink-600">
          The link may be outdated, or the page has moved. Everything else is still where you left
          it.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to="/" size="lg">
            <ArrowLeft className="h-4.5 w-4.5" aria-hidden />
            Back home
          </Button>
          <Button to="/book" variant="outline" size="lg">
            Book a consultation
          </Button>
        </div>

        <nav aria-label="Site sections" className="mt-12">
          <ul className="flex flex-wrap justify-center gap-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="inline-flex min-h-11 items-center rounded-full border border-cream-200 bg-white px-4 py-2 text-sm text-ink-600 transition-colors duration-200 hover:border-forest-300 hover:text-forest-700 focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
