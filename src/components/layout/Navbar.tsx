import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { CalendarPlus, Leaf, Menu, X } from 'lucide-react'
import { navLinks, site } from '@/data/site'
import { cn } from '@/lib/cn'
import { useScrollLock } from '@/hooks/useScrollLock'
import { Button } from '@/components/ui/Button'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useScrollLock(open)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route changes. Adjusting during render
  // (rather than in an effect) avoids a flash of the open menu on the new page.
  const [renderedPath, setRenderedPath] = useState(location.pathname)
  if (renderedPath !== location.pathname) {
    setRenderedPath(location.pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    cn(
      'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200',
      isActive ? 'text-forest-700' : 'text-ink-600 hover:text-forest-700',
    )

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ease-soft',
        // Solid, blur-free bar on phones (backdrop-filter is costly to composite
        // while scrolling); translucent frosted glass from lg up.
        scrolled || open
          ? 'border-cream-200/80 bg-cream-50/95 lg:bg-cream-50/85 lg:backdrop-blur-xl'
          : 'border-transparent bg-transparent',
      )}
    >
      <nav className="container-page flex h-[4.5rem] items-center justify-between gap-4" aria-label="Main">
        <Link
          to="/"
          className="group flex min-h-12 items-center gap-2.5 rounded-full py-1 pr-2 focus-visible:ring-2 focus-visible:ring-forest-600"
          aria-label={`${site.name} — home`}
        >
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-forest-600 text-white transition-transform duration-300 ease-soft group-hover:-rotate-6">
            <Leaf className="h-5 w-5" aria-hidden />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold text-forest-700">
              {site.logo.wordmark}
            </span>
            <span className="mt-1 text-[0.7rem] tracking-[0.12em] text-ink-500">
              {site.logo.subtext}
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={linkClasses} end={link.to === '/'}>
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <span
                        aria-hidden
                        className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-apricot-500"
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button to="/book" variant="primary" size="sm" className="hidden sm:inline-flex">
            <CalendarPlus className="h-4 w-4" aria-hidden />
            Book consultation
          </Button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-11 w-11 place-items-center rounded-2xl border border-cream-200 bg-white/70 text-forest-700 transition-colors duration-200 hover:bg-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </nav>

      {/* Tap-outside backdrop. Always mounted so it can fade out as well as in. */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={cn(
          'fixed inset-x-0 bottom-0 top-[4.5rem] bg-ink-900/25 transition-opacity duration-200 ease-soft lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      {/*
        Mobile menu. Always mounted and positioned below the bar, so opening and
        closing is a pure opacity + transform transition (no height animation).
        `inert` keeps the closed menu out of the tab order and screen readers.
      */}
      <div
        id="mobile-menu"
        inert={!open}
        className={cn(
          'absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-b border-cream-200 bg-cream-50 shadow-lift transition-[opacity,transform,visibility] duration-200 ease-soft lg:hidden',
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0',
        )}
      >
        <ul className="container-page flex flex-col gap-1 py-5">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                // Also closes when tapping the page you are already on (no route change).
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex min-h-12 items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition-colors duration-200',
                    isActive
                      ? 'bg-sage-200 text-forest-700'
                      : 'text-ink-700 hover:bg-sage-100 hover:text-forest-700',
                  )
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li className="mt-3">
            <Button to="/book" size="lg" className="w-full" onClick={() => setOpen(false)}>
              <CalendarPlus className="h-4 w-4" aria-hidden />
              Book consultation
            </Button>
          </li>
        </ul>
      </div>
    </header>
  )
}
