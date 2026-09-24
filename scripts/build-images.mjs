/**
 * Converts the originals in ./images into optimised WebP files in
 * src/assets/images/, and renders the 1200x630 social share card.
 *
 *   node scripts/build-images.mjs
 *
 * The originals are never modified or deleted. Re-run this after dropping a new
 * file into ./images and adding it to the SOURCES table below.
 *
 * Size caps follow where each image is used:
 *   hero / cta  →  max 1920px wide
 *   card        →  max 1000px wide
 * Images are never enlarged, so small sources stay at their native size.
 *
 * Responsive variants: for every width in VARIANT_WIDTHS that is smaller than
 * the full-size output, a `<name>-<width>w.webp` is written beside it. The site
 * picks these up automatically (src/data/images.ts) and serves them via srcset,
 * so phones download the smaller file. A variant is skipped when the source is
 * not wider than it — nothing is ever upscaled.
 *
 * Wide crops: every card/banner slot on the site is landscape (16:10, 16:9 or
 * wider) while most photos are portrait, so `object-cover` throws away over half
 * of the downloaded pixels. For each non-hero photo a centred 16:10 crop is also
 * written (`<name>-wide.webp` + `<name>-wide-480w.webp`) — the same area
 * object-cover shows — and card slots use it via `<Img variant="wide">`.
 */
import sharp from 'sharp'
import { existsSync, mkdirSync, readdirSync, statSync, unlinkSync } from 'node:fs'
import { join } from 'node:path'

const SRC_DIR = 'images'
const OUT_DIR = 'src/assets/images'
const TARGET_KB = 200

const CAPS = { hero: 1920, cta: 1920, card: 1000 }
const VARIANT_WIDTHS = [480, 800]
const VARIANT_QUALITY = 72
const WIDE_RATIO = 16 / 10

/** original filename → { name, role } */
const SOURCES = [
  { from: '10 Best Foods To Eat On a Keto Diet.jfif', name: 'whole-foods-flatlay', role: 'hero' },
  { from: 'A Fresh Take on Healthy Eating with Salmon Avocado Salad Recipe.jfif', name: 'salmon-avocado-salad', role: 'card' },
  { from: 'Choose Whole Grains.jfif', name: 'whole-grains-plate', role: 'card' },
  { from: 'Delicious and healthy smoothie recipes for every day.jfif', name: 'fruit-smoothies', role: 'card' },
  { from: 'Healthy High Protein Slow Cooker Meals.jfif', name: 'protein-plate-chicken-eggs', role: 'card' },
  { from: 'Vibrant Healthy Salad Bowl – Fresh and Nourishing.jfif', name: 'quinoa-chicken-salad-bowl', role: 'card' },
  { from: 'download (1).jfif', name: 'eggs-toast-avocado-breakfast', role: 'card' },
  { from: 'download.jfif', name: 'chicken-salad-bowl', role: 'card' },
  { from: '🌱 Creamy Oatmeal with Mixed Berries (Plant-Based).jfif', name: 'oatmeal-berries', role: 'cta' },
  { from: '🥗 Mediterranean Chickpea Delight.jfif', name: 'chickpea-salad', role: 'card' },
]

/** The photo the social share card is built from. */
const OG_SOURCE = '10 Best Foods To Eat On a Keto Diet.jfif'
const OG_OUT = 'public/og-image.jpg'

const kb = (bytes) => bytes / 1024

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true })

/** Drops quality in steps until the file fits the budget. */
async function encodeWebp(input, outPath, width) {
  for (const quality of [78, 72, 66, 58, 50]) {
    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(outPath)
    if (kb(statSync(outPath).size) <= TARGET_KB) return quality
  }
  return 50
}

const rows = []

for (const { from, name, role } of SOURCES) {
  const input = join(SRC_DIR, from)
  if (!existsSync(input)) {
    console.error(`missing source: ${from}`)
    process.exitCode = 1
    continue
  }
  const outPath = join(OUT_DIR, `${name}.webp`)
  const meta = await sharp(input).metadata()
  const quality = await encodeWebp(input, outPath, CAPS[role])
  const out = await sharp(outPath).metadata()

  const variants = []
  for (const width of VARIANT_WIDTHS) {
    const variantPath = join(OUT_DIR, `${name}-${width}w.webp`)
    if (width >= out.width) {
      // Never upscale; also clear a stale variant from an earlier, larger source.
      if (existsSync(variantPath)) unlinkSync(variantPath)
      continue
    }
    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: VARIANT_QUALITY, effort: 6 })
      .toFile(variantPath)
    variants.push(`${width}w ${kb(statSync(variantPath).size).toFixed(0)}KB`)
  }

  if (role !== 'hero') {
    // Centred 16:10 crop at the full output width, plus a 480w version.
    for (const width of [out.width, ...VARIANT_WIDTHS.filter((w) => w < out.width)]) {
      const suffix = width === out.width ? '-wide' : `-wide-${width}w`
      const widePath = join(OUT_DIR, `${name}${suffix}.webp`)
      await sharp(input)
        .resize({ width, height: Math.round(width / WIDE_RATIO), fit: 'cover', position: 'centre', withoutEnlargement: true })
        .webp({ quality: VARIANT_QUALITY, effort: 6 })
        .toFile(widePath)
      variants.push(`wide ${width}w ${kb(statSync(widePath).size).toFixed(0)}KB`)
    }
  }

  rows.push({
    from,
    to: `${name}.webp`,
    role,
    dims: `${out.width}x${out.height}`,
    before: kb(statSync(input).size),
    after: kb(statSync(outPath).size),
    quality,
    resized: meta.width !== out.width,
    variants,
  })
}

/* ---- social share card: 1200x630, photo + darkened band + brand text ---- */
const OG_W = 1200
const OG_H = 630

const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0B2A1C" stop-opacity="0.95"/>
      <stop offset="55%" stop-color="#0B2A1C" stop-opacity="0.82"/>
      <stop offset="100%" stop-color="#0B2A1C" stop-opacity="0.35"/>
    </linearGradient>
  </defs>
  <rect width="${OG_W}" height="${OG_H}" fill="url(#shade)"/>
  <rect x="72" y="70" width="56" height="56" rx="16" fill="#DDEFE3"/>
  <path d="M114 84c1.5 10.2-3 19-11 21.2-2.2.6-4.4.5-5.9-.2.7-8 5.2-14.6 11.7-17.5 1.8-.8 3.5-1.5 5.2-3.5Z" fill="#1F6F4A"/>
  <text x="144" y="100" font-family="Georgia, serif" font-size="30" font-weight="600" fill="#FFFFFF">NutriBalance</text>
  <text x="145" y="122" font-family="Helvetica, Arial, sans-serif" font-size="16" letter-spacing="1.5" fill="#DDEFE3">by Ayesha</text>

  <text x="72" y="268" font-family="Georgia, serif" font-size="62" font-weight="700" fill="#FFFFFF">Personalized nutrition,</text>
  <text x="72" y="342" font-family="Georgia, serif" font-size="62" font-weight="700" fill="#FFFFFF">grounded in science</text>
  <rect x="72" y="360" width="452" height="8" rx="4" fill="#F4A261"/>

  <text x="72" y="432" font-family="Helvetica, Arial, sans-serif" font-size="25" fill="#DDEFE3">Weight management · PCOS · Diabetes · Sports nutrition</text>
  <text x="72" y="474" font-family="Helvetica, Arial, sans-serif" font-size="23" fill="#DDEFE3">Ayesha · Dietetics &amp; Nutrition Professional</text>

  <rect x="72" y="514" width="506" height="52" rx="26" fill="#F4A261"/>
  <text x="102" y="548" font-family="Helvetica, Arial, sans-serif" font-size="21" font-weight="600" fill="#22201C">Online consultations · Pakistan &amp; worldwide</text>
</svg>`)

await sharp(join(SRC_DIR, OG_SOURCE))
  .resize({ width: OG_W, height: OG_H, fit: 'cover', position: 'centre', kernel: 'lanczos3' })
  .composite([{ input: overlay, top: 0, left: 0 }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(OG_OUT)

/* ---- report ---- */
const pad = (s, n) => String(s).padEnd(n)
console.log(
  `\n${pad('new name', 34)}${pad('role', 7)}${pad('dims', 11)}${pad('before', 9)}${pad('after', 9)}${pad('q', 4)}variants`,
)
console.log('-'.repeat(78))
for (const r of rows) {
  console.log(
    pad(r.to, 34) +
      pad(r.role, 7) +
      pad(r.dims, 11) +
      pad(`${r.before.toFixed(0)}KB`, 9) +
      pad(`${r.after.toFixed(0)}KB`, 9) +
      pad(r.quality, 4) +
      (r.variants.length ? r.variants.join(', ') : '(no smaller variants)'),
  )
}
const ogKb = kb(statSync(OG_OUT).size)
console.log(pad('og-image.jpg (generated)', 34) + pad('og', 7) + pad(`${OG_W}x${OG_H}`, 11) + pad('—', 9) + `${ogKb.toFixed(0)}KB`)

const over = rows.filter((r) => r.after > TARGET_KB)
console.log(
  over.length === 0
    ? `\nAll ${rows.length} images under ${TARGET_KB}KB. Originals in ./${SRC_DIR} untouched (${readdirSync(SRC_DIR).length} files).`
    : `\n${over.length} image(s) over budget: ${over.map((r) => r.to).join(', ')}`,
)
