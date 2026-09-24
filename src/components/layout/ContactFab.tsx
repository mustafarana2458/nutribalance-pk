import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { instagramDmLink, site } from '@/data/site'
import { InstagramIcon } from '@/components/ui/BrandIcons'
import { cn } from '@/lib/cn'

/**
 * Floating contact button — a direct Instagram DM link, the primary way clients
 * reach the practice. Appears once the visitor has scrolled past the hero.
 *
 * It stays out of the way of real content: hidden on /book (the page is already
 * all contact buttons) and whenever the footer — with its own contact links and
 * the medical disclaimer — is on screen. Offsets respect the iOS safe areas
 * (home indicator, landscape notch).
 *
 * Forest green rather than the Instagram gradient: white on that gradient's
 * light end measures about 2.4:1 and would fail AA.
 */
export function ContactFab() {
  const { pathname } = useLocation()
  const [scrolledPastHero, setScrolledPastHero] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolledPastHero(window.scrollY > 320)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const footer = document.getElementById('site-footer')
    if (!footer) return
    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting))
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  const visible = scrolledPastHero && !footerVisible && pathname !== '/book'

  return (
    <a
      href={instagramDmLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Message ${site.nutritionist.firstName} on Instagram (${site.socials.instagramHandle})`}
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      className={cn(
        'fixed z-40 flex min-h-12 items-center gap-3 rounded-full bg-forest-600 py-3 pl-3.5 pr-3.5 text-white shadow-lift transition-[opacity,transform] duration-300 ease-soft hover:bg-forest-700 focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2 sm:pr-4',
        'bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-[calc(1.25rem+env(safe-area-inset-right))]',
        'sm:bottom-[calc(1.75rem+env(safe-area-inset-bottom))] sm:right-[calc(1.75rem+env(safe-area-inset-right))]',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <InstagramIcon className="h-6 w-6" />
      <span className="hidden text-sm font-semibold sm:inline">Message on Instagram</span>
    </a>
  )
}
