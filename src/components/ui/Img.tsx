import type { SiteImage } from '@/data/images'
import { cn } from '@/lib/cn'

type ImgProps = {
  image: SiteImage
  className?: string
  /**
   * Only the hero: loads eagerly instead of lazily. Its high fetch priority comes
   * from the desktop-only <link rel="preload" fetchpriority="high"> injected for
   * "/" (see vite.route-preload.ts) — on phones the hero photo sits below the
   * headline, so it must not outrank the fonts and CSS the headline needs.
   */
  priority?: boolean
  /** Overrides the alt text when the surrounding copy already says the same thing. */
  alt?: string
  /**
   * Rendered width of the image slot, so the browser can pick the smallest
   * srcset candidate that still looks sharp. Be accurate — a phone given
   * `100vw` for a half-width card downloads twice the pixels it needs.
   */
  sizes: string
  /**
   * `wide` serves the centred 16:10 crop (see scripts/build-images.mjs) — use it
   * for every landscape card/banner slot. Falls back to the original if absent.
   */
  variant?: 'original' | 'wide'
}

/**
 * Photo wrapper. Serves responsive candidates via srcset, lazy-loads and
 * decodes off the main thread by default, and always carries intrinsic
 * width/height so the layout does not shift while the image arrives. Pass
 * `priority` for the one above-the-fold image.
 */
export function Img({ image, className, priority = false, alt, sizes, variant = 'original' }: ImgProps) {
  const file = (variant === 'wide' && image.wide) || image
  return (
    <img
      src={file.src}
      srcSet={file.srcSet}
      sizes={sizes}
      alt={alt ?? image.alt}
      width={file.width}
      height={file.height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={cn('h-full w-full object-cover', className)}
    />
  )
}
