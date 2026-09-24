import { Link } from 'react-router-dom'
import { Clock, Globe, Leaf, Mail } from 'lucide-react'
import { instagramDmLink, medicalDisclaimer, navLinks, site } from '@/data/site'
import { services } from '@/data/services'
import { EmailLink } from '@/components/ui/EmailLink'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '@/components/ui/BrandIcons'

const socials = [
  { href: site.socials.instagram, label: 'Instagram', Icon: InstagramIcon },
  { href: site.socials.facebook, label: 'Facebook', Icon: FacebookIcon },
  { href: site.socials.youtube, label: 'YouTube', Icon: YoutubeIcon },
]

export function Footer() {
  return (
    <footer
      id="site-footer"
      className="relative isolate overflow-hidden bg-forest-700 pb-[env(safe-area-inset-bottom)] text-sage-200"
    >
      <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-40" />

      <div className="container-page relative py-16 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
          <div>
            <Link
              to="/"
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-forest-700"
            >
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-sage-200 text-forest-700">
                <Leaf className="h-5 w-5" aria-hidden />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-semibold text-white">
                  {site.logo.wordmark}
                </span>
                <span className="mt-1 text-[0.72rem] tracking-[0.12em] text-sage-200/80">
                  {site.logo.subtext}
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-pretty leading-relaxed text-sage-200/85">
              {site.mission} Personalized diet planning with {site.nutritionist.firstName}, a{' '}
              {site.nutritionist.credentials.toLowerCase()} — delivered entirely online.
            </p>
            <div className="mt-6 flex gap-2.5">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on ${label}`}
                  className="grid h-11 w-11 place-items-center rounded-2xl border border-forest-500 text-sage-200 transition-colors duration-200 hover:bg-forest-600 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-forest-700"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-display text-base font-semibold text-white">Explore</h2>
            <ul className="mt-3 text-sm lg:mt-5 lg:space-y-3">
              {[...navLinks, { label: 'Book consultation', to: '/book' }].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="link-underline inline-flex min-h-11 min-w-11 items-center text-sage-200/85 transition-colors duration-200 hover:text-white lg:min-h-0 lg:min-w-0"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-base font-semibold text-white">Services</h2>
            <ul className="mt-3 text-sm lg:mt-5 lg:space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="link-underline inline-flex min-h-11 min-w-11 items-center text-sage-200/85 transition-colors duration-200 hover:text-white lg:min-h-0 lg:min-w-0"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-base font-semibold text-white">Get in touch</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <InstagramIcon className="h-4 w-4 shrink-0 text-apricot-400" />
                <a
                  href={instagramDmLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline flex min-h-11 flex-col justify-center text-sage-200/85 hover:text-white"
                >
                  {site.socials.instagramHandle}
                  <span className="block text-xs text-sage-200/60">Message on Instagram</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-apricot-400" aria-hidden />
                <EmailLink className="link-underline inline-flex min-h-11 items-center break-all text-sage-200/85 hover:text-white">
                  {site.contact.email}
                </EmailLink>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-apricot-400" aria-hidden />
                <span className="text-sage-200/85">{site.contact.hours}</span>
              </li>
              <li className="flex gap-3">
                <Globe className="mt-0.5 h-4 w-4 shrink-0 text-apricot-400" aria-hidden />
                <span className="text-sage-200/85">{site.service.reach}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Medical disclaimer */}
        <p className="mt-14 rounded-2xl border border-forest-600 bg-forest-800/60 px-6 py-5 text-xs leading-relaxed text-sage-200/80">
          <span className="font-semibold text-white">Please note: </span>
          {medicalDisclaimer}
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-forest-600 pt-7 text-xs text-sage-200/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>{site.service.mode} · Times shown in {site.service.timezone}</p>
        </div>
      </div>
    </footer>
  )
}
