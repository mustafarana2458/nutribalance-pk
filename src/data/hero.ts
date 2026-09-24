/**
 * Hero photo constants, kept free of imports so vite.config.ts can read them
 * too: the build injects a home-page-only <link rel="preload"> for this image
 * with exactly the same `sizes` the <img> uses (otherwise the browser would
 * preload one candidate and render another).
 */
export const HERO_IMAGE_NAME = 'whole-foods-flatlay'
/** Pixel width of the full-size file (its largest srcset candidate). */
export const HERO_IMAGE_WIDTH = 735

/** Hero column: full width minus gutters on phones, max-w-md on tablets, ~half the 1200px container on desktop. */
/** Viewports where the hero photo is above the fold (two-column hero) and gets preloaded at high priority. */
export const HERO_IMAGE_PRELOAD_MEDIA = '(min-width: 1024px)'

export const HERO_IMAGE_SIZES = '(min-width: 1024px) 540px, (min-width: 488px) 448px, calc(100vw - 40px)'
