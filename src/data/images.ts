/**
 * Every photo on the site, in one place.
 *
 * To swap an image: drop the replacement into ./images, add it to the SOURCES
 * table in scripts/build-images.mjs, run `npm run images`, then point the
 * relevant mapping below at the new file. Nothing else needs to change.
 *
 * Alt text lives beside each import — it describes what the photo shows, not
 * where it sits, so it stays correct when an image moves section.
 *
 * Images are reused across the site, but the page-level mappings are arranged
 * so that no single page ever shows the same photo twice.
 */
import { HERO_IMAGE_NAME, HERO_IMAGE_SIZES, HERO_IMAGE_WIDTH } from './hero'

type ImageFile = {
  src: string
  /** Responsive candidates (`url 480w, url 736w`) — phones download the smallest that fits. */
  srcSet: string
  /** Intrinsic size — set on the <img> so the browser reserves space and nothing shifts. */
  width: number
  height: number
}

export type SiteImage = ImageFile & {
  alt: string
  /**
   * Centred 16:10 crop for landscape card/banner slots (what object-cover shows
   * anyway), so portrait photos do not download pixels that get cropped away.
   * Absent for the hero, which is already landscape.
   */
  wide?: ImageFile
}

/**
 * Every generated WebP (full size + `-480w` variants from `npm run images`),
 * resolved to hashed URLs at build time.
 */
const files = import.meta.glob<string>('../assets/images/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

/** Collects `<base>.webp` plus its `<base>-<n>w.webp` width variants into one srcset. */
function imageFile(base: string, width: number, height: number): ImageFile | undefined {
  const src = files[`../assets/images/${base}.webp`]
  if (!src) return undefined

  const variantPattern = new RegExp(`/${base}-(\\d+)w\\.webp$`)
  const candidates = Object.entries(files)
    .flatMap(([path, url]) => {
      const match = path.match(variantPattern)
      return match ? [{ url, w: Number(match[1]) }] : []
    })
    .concat({ url: src, w: width })
    .sort((a, b) => a.w - b.w)

  return { src, srcSet: candidates.map((c) => `${c.url} ${c.w}w`).join(', '), width, height }
}

/** Builds a SiteImage from a file name in src/assets/images, wiring up width variants and the wide crop. */
function photo(name: string, width: number, height: number, alt: string): SiteImage {
  const original = imageFile(name, width, height)
  if (!original) throw new Error(`Missing image src/assets/images/${name}.webp — run npm run images`)
  return { ...original, alt, wide: imageFile(`${name}-wide`, width, Math.round(width / 1.6)) }
}

export const images = {
  wholeFoodsFlatlay: photo(
    HERO_IMAGE_NAME,
    HERO_IMAGE_WIDTH,
    490,
    'Overhead spread of whole foods on a dark surface — salmon, chicken, lean beef, eggs, cheese, lentils, beans, nuts, wholegrain bread, olive oil, grapes, berries, citrus, tomatoes, peppers and spinach.',
  ),
  quinoaChickenBowl: photo(
    'quinoa-chicken-salad-bowl',
    736,
    1104,
    'Balanced salad bowl with sliced grilled chicken breast, quinoa, avocado, cherry tomatoes, cucumber, grated carrot, red cabbage and kale.',
  ),
  wholeGrainsPlate: photo(
    'whole-grains-plate',
    736,
    736,
    'Plate of wholegrain foods — a bowl of mixed brown and red rice, slices of wholemeal bread, a bowl of almonds and hazelnuts, scattered grains and wheat stalks.',
  ),
  salmonAvocadoSalad: photo(
    'salmon-avocado-salad',
    736,
    1104,
    'Meal-prep container filled with salmon chunks, avocado, cherry tomatoes, cucumber and mixed salad leaves.',
  ),
  proteinPlate: photo(
    'protein-plate-chicken-eggs',
    736,
    1104,
    'High-protein plate of sliced grilled chicken breast, halved boiled eggs, roasted baby potatoes, broccoli, grated carrot and sweetcorn.',
  ),
  fruitSmoothies: photo(
    'fruit-smoothies',
    600,
    1200,
    'Nine fruit and vegetable smoothies in glasses topped with berries, mint, flaked almonds and coconut, surrounded by fresh avocado, blueberries and kale.',
  ),
  chickenSaladBowl: photo(
    'chicken-salad-bowl',
    640,
    630,
    'Wooden bowl of salad with shredded chicken, a halved soft-boiled egg, cherry tomatoes, sweetcorn, cucumber, red cabbage, grated carrot and lettuce.',
  ),
  eggsToastAvocado: photo(
    'eggs-toast-avocado-breakfast',
    735,
    919,
    'Breakfast plate with two fried eggs, wholemeal toast, sliced avocado, rocket and cherry tomatoes, beside a mug of tea.',
  ),
  chickpeaSalad: photo(
    'chickpea-salad',
    544,
    819,
    'Bowl of Mediterranean chickpea salad with tomato, cucumber, red onion, peppers and chopped parsley.',
  ),
  oatmealBerries: photo(
    'oatmeal-berries',
    736,
    1104,
    'Bowl of creamy oatmeal topped with strawberries, raspberries, blueberries, blackberries, chia seeds, oats and honey.',
  ),
} satisfies Record<string, SiteImage>

/* ------------------------------------------------------------------ *
 * Section mappings
 * ------------------------------------------------------------------ */

/** Above the fold — the only image loaded eagerly (and preloaded on the home page). */
export const heroImage: SiteImage = images.wholeFoodsFlatlay
export const heroImageSizes = HERO_IMAGE_SIZES

/** Service cards and the top of each service detail page, keyed by slug. */
export const serviceImages: Record<string, SiteImage> = {
  'personalized-diet-plans': images.quinoaChickenBowl,
  'diabetic-diet-consultation': images.wholeGrainsPlate,
  'pcos-management-plans': images.salmonAvocadoSalad,
  'sports-nutrition': images.proteinPlate,
  'one-on-one-consultation': images.fruitSmoothies,
  'monthly-follow-up-packages': images.chickenSaladBowl,
}

/**
 * Specialized Care block. These deliberately differ from the matching service
 * card images above, because both blocks appear on the home page.
 */
export const specializedCareImages: Record<string, SiteImage> = {
  'diabetic-diet-consultation': images.chickpeaSalad,
  'pcos-management-plans': images.eggsToastAvocado,
}

/** Blog post covers, keyed by post slug. */
export const postImages: Record<string, SiteImage> = {
  'pcos-friendly-eating': images.eggsToastAvocado,
  'managing-blood-sugar-through-diet': images.wholeGrainsPlate,
  'sustainable-weight-loss': images.chickenSaladBowl,
}

/** Final call-to-action banner, used on most pages — text sits over it. */
export const ctaImage: SiteImage = images.oatmealBerries

/** Fallback for any slug that has not been mapped yet. */
export const fallbackImage: SiteImage = images.quinoaChickenBowl
