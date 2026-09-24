import { CalendarPlus } from 'lucide-react'
import { instagramDmLink, site } from '@/data/site'
import { Button } from '@/components/ui/Button'
import { InstagramIcon } from '@/components/ui/BrandIcons'
import { Reveal } from '@/components/ui/Reveal'
import { Blob } from '@/components/ui/Blob'
import { Img } from '@/components/ui/Img'
import { ctaImage } from '@/data/images'

type CtaBannerProps = {
  title?: string
  description?: string
}

export function CtaBanner({
  title = 'Ready to start with a plan built for you?',
  description = 'Book an online consultation and leave the first session knowing exactly what to change — no crash diets, no products to buy.',
}: CtaBannerProps) {
  return (
    <section className="relative isolate overflow-hidden bg-cream-50 py-section">
      <div className="container-page">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-forest-700 px-7 py-14 text-center sm:px-14 sm:py-20">
            {/* Photo sits behind the copy, so it carries a forest wash at 92%:
                white text stays above 7:1 against the darkest and lightest areas. */}
            <div aria-hidden className="absolute inset-0 -z-10">
              {/* Sits under a ~92% opaque overlay, so the smallest variant is plenty. */}
              <Img variant="wide" image={ctaImage} alt="" sizes="480px" className="h-full w-full" />
              <div className="absolute inset-0 bg-forest-700/92" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-800/70 to-transparent" />
            </div>
            <div aria-hidden className="grain absolute inset-0 opacity-50" />
            <Blob className="-left-16 -top-16 h-72 w-72" tone="forest" />
            <Blob className="-bottom-20 -right-10 h-80 w-80" tone="apricot" />

            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-balance text-display-md text-white">{title}</h2>
              <p className="mt-5 text-pretty text-base leading-relaxed text-sage-200 sm:text-lg">
                {description}
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Button to="/book" variant="accent" size="lg">
                  <CalendarPlus className="h-4.5 w-4.5" aria-hidden />
                  Book a consultation
                </Button>
                <Button
                  href={instagramDmLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="white"
                  size="lg"
                >
                  <InstagramIcon className="h-4.5 w-4.5" />
                  Ask a question first
                </Button>
              </div>

              <p className="mt-7 text-sm text-sage-200/75">
                {site.service.reach} · {site.service.platforms}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
