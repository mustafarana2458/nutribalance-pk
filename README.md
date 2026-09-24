# NutriBalance PK — online nutrition consultancy website

A production-ready marketing and booking site for a **100% online** nutrition practice: services,
follow-up packages, interactive tools, a blog, and a "Get Started" page (Instagram DM or email —
no forms) that explains how payment works. Built with React, Vite, TypeScript, Tailwind CSS and Framer Motion, and ready to deploy to
Netlify as a single-page app.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Generates `public/sitemap.xml`, typechecks, builds to `dist/`, then prerenders every route to static HTML |
| `npm run analyze` | Production build plus an interactive bundle treemap at `dist/stats.html` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Lints with oxlint |
| `npm run sitemap` | Regenerates `public/sitemap.xml` on its own |
| `npm run images` | Re-encodes `./images` into WebP (plus 480w and 16:10 crop variants) in `src/assets/images/` and rebuilds `public/og-image.jpg` |
| `node scripts/smoke-render.mjs` | Renders every route server-side to catch runtime errors |

Requires Node 20 or newer.

---

## ⚠ Placeholders to replace before launch

This build deliberately contains **no invented statistics**. Anything in `[square brackets]` is a
placeholder. Work through this list:

- [ ] **Contact details** — `src/data/site.ts`: working hours, Facebook/YouTube links.
      **The email (`ayeshaghulamrasool97@gmail.com`) and Instagram links are already real**
      (`@nutritionwith_ayesha` profile and `ig.me` DM link). There are no forms and no phone or
      messaging number on the site — Instagram DM is the primary contact route and email is the
      secondary one. Email links use `EmailLink` / `useProtectedMailto`
      (`src/components/ui/EmailLink.tsx`, `src/hooks/useProtectedMailto.ts`), which only writes the `mailto:` href after a hover,
      focus or tap, to keep it away from scrapers
- [ ] **Qualifications & experience** — `src/data/about.ts` (every entry is bracketed)
- [ ] **Scheduling embed (optional)** — hidden by default. When a real scheduling link exists, set
      `bookingEmbedUrl` in `src/data/site.ts` and flip `showBookingEmbed` to `true`
- [ ] **Testimonials (hidden)** — `src/data/testimonials.ts` is an empty array with a commented
      example (`quote`, `firstName`, `city`, `service`). Add real, consented feedback, then set
      `showTestimonials` to `true`. Never invent names or quotes
- [ ] **Results / before-after cards (hidden)** — `src/data/results.ts` is an empty array with a
      commented example. Add real, consented outcomes, then set `showResults` to `true`
- [ ] **Rescheduling window** — the `[X] hours` in the "What if I miss my slot?" answer in
      `src/data/faqs.ts`
- [ ] **Live URL** — `site.url` in `src/data/site.ts` and the `Sitemap:` line in `public/robots.txt`
- [ ] **Photography** — the ten photos in `src/assets/images/` are stock placeholders. To swap one,
      drop the replacement in `./images`, add it to `SOURCES` in `scripts/build-images.mjs`, run
      `npm run images`, then point the mapping in `src/data/images.ts` at the new file
- [ ] **App icons** — `public/favicon.svg` and the `icons` array in `public/site.webmanifest`

### Pricing: the two display toggles

Monthly PKR pricing is live (**Rs 2,000 / Rs 4,000 / Rs 6,000**). Three-month and USD pricing are
not confirmed, so both toggles are switched off in `src/data/plans.ts`:

```ts
export const showBillingToggle = false   // monthly ⇄ 3 months
export const showCurrencyToggle = false  // PKR ⇄ USD
```

The billing and currency logic is all still there — the cards simply fall back to
`defaultBilling` / `defaultCurrency`. To switch either control back on:

1. Fill in the missing amounts in `plans` — `price.quarterly.PKR` for 3-month pricing, or the
   `USD` amounts for dollar pricing. Amounts are **plain numbers** (`2000`), not strings;
   `formatPrice` renders them as `Rs 2,000`.
2. Set the matching flag to `true`. Optionally add a `quarterlyNote` (e.g. a saving line) per plan.

Any amount left as `null` shows as *"On request"* rather than a broken price, so a half-filled
table can never render nonsense. While the currency toggle is off, the plans carry a line pointing
overseas clients to Instagram for international pricing.

---

## Editing content

**All copy lives in `src/data/` — you rarely need to touch a component to change text.**

| File | Contains |
| --- | --- |
| `site.ts` | Business name, logo lockup, practitioner details, service mode & timezone, contact routes (Instagram DM primary, email secondary), socials, nav links, trust badges, medical disclaimer |
| `services.ts` | The six services — each generates its own page at `/services/<slug>` |
| `plans.ts` | Basic / Standard / Premium packages, prices, the two display toggles, and the four comparison rows |
| `process.ts` | The four "How online consultation works" steps |
| `faqs.ts` | FAQ entries, grouped by category |
| `posts.ts` | Blog articles, written in light markdown |
| `about.ts` | Intro, mission, approach, qualifications, experience, affiliations |
| `testimonials.ts` / `results.ts` | Carousel quotes and before/after cards — empty and hidden behind `showTestimonials` / `showResults` until real data is added |
| `whyChoose.ts` | The four "Why Clients Choose Ayesha" value cards on the home page |

### Adding a blog post

Append to the `posts` array in `src/data/posts.ts`. The `body` supports `##`/`###` headings,
paragraphs, `-` and `1.` lists, `> ` blockquotes, `**bold**` and `*italic*`. The route, the listing
card and the sitemap entry all follow from the `slug`.

### Adding a service

Append to `services` in `src/data/services.ts` with a unique `slug` and a `lucide-react` icon. It
appears on the home page, the services listing and the footer, and gets
its own detail page with a "Book this service" CTA.

### Swapping a photo

Every photo is mapped in **`src/data/images.ts`** — imports, alt text and the section mappings
(`heroImage`, `serviceImages`, `specializedCareImages`, `postImages`, `ctaImage`). The originals stay
in `./images`; `npm run images` converts them to WebP under the size caps (hero/CTA 1920px, cards
1000px, all under 200KB) and re-renders the 1200×630 `public/og-image.jpg` share card.

It also writes responsive variants, which `src/data/images.ts` picks up automatically by file name:
`<name>-480w.webp` (only when the source is wider — nothing is upscaled) and, for every non-hero
photo, a centred 16:10 crop `<name>-wide.webp` / `<name>-wide-480w.webp`. Every card and banner slot
is landscape, so those use `<Img variant="wide">` and phones never download the parts of a portrait
photo that `object-cover` would crop away. Always pass an accurate `sizes` to `<Img>`.

Images are reused across sections, but the mappings are arranged so **no page ever shows the same
photo twice**. If you re-point a mapping, keep that in mind — the Specialized Care images are
deliberately different from the diabetic and PCOS service-card images because both appear on the
home page.

Only the hero image loads eagerly (`priority` on `<Img>`); everything else is lazy-loaded with
intrinsic `width`/`height` so nothing shifts as it arrives.

---

## Design system

Tokens live in `tailwind.config.js` — no raw hex values in components.

| Token | Hex | Use |
| --- | --- | --- |
| `forest-700` | `#124A31` | Headings, dark sections |
| `forest-600` | `#1F6F4A` | Primary brand, primary buttons |
| `sage-200` | `#DDEFE3` | Section backgrounds, eyebrows |
| `sage-100` | `#EEF7F1` | Card fills |
| `apricot-500` | `#F4A261` | Accent CTAs, highlights |
| `apricot-700` | `#9E561C` | Accent *text* (darkened to pass AA) |
| `cream-50` | `#FAF8F3` | Page background |
| `ink-900` / `ink-600` | `#22201C` / `#5B564E` | Body / muted text |

Every text/background pair in the UI meets **WCAG AA (4.5:1)**, including text over the translucent
dark cards. The accent orange always carries dark `ink-900` text, because white on `apricot-500`
fails. Fonts are **Fraunces** (display) and **DM Sans** (body), self-hosted from
`src/assets/fonts/` (latin subset, `font-display: swap`): DM Sans 400–700 variable, DM Sans italic
(blog emphasis only) and Fraunces 600 with its optical-size axis. The two upright files are
preloaded in `index.html`. If you start using another weight, add it there and in `src/index.css`.

The logo is a leaf mark plus the **NutriBalance** wordmark with **by Ayesha** underneath. Both
strings live in `site.logo` (`wordmark` / `subtext`) and render in `Navbar.tsx` and `Footer.tsx`.

Shared primitives in `src/components/ui/`: `Button`, `Section`, `SectionHeading`, `Reveal`,
`Accordion`, `Field` (Input/Select), `Img`, `EmailLink`, `Blob`, `Markdown`, `BrandIcons`.

---

## Project structure

```
src/
├── components/
│   ├── ui/         Reusable primitives
│   ├── layout/     Navbar, Footer, Layout, ContactFab
│   └── sections/   Page sections — Hero, DeviceMockup, SpecializedCare, HowItWorks,
│                   Results, WhyChoose, Testimonials, Pricing, BookingCalendar,
│                   calculators, CtaBanner, PageHeader
├── data/           All editable content
├── hooks/          useSeo, usePrefersReducedMotion, useScrollLock
├── lib/            cn (class joiner), calculators
├── pages/          One file per route
└── App.tsx         Route table — Home eager, every other page code-split
```

Routes: `/`, `/about`, `/services`, `/services/:slug`, `/plans`, `/tools`, `/blog`, `/blog/:slug`,
`/faq`, `/book`, and a catch-all 404. `/contact` redirects to `/book`.

---

## Deploying to Netlify

**From Git (recommended)**

1. Push the repo to GitHub/GitLab.
2. In Netlify: *Add new site → Import an existing project*.
3. Build command `npm run build`, publish directory `dist`. `netlify.toml` already sets these plus
   the fallback rewrite and cache headers.

**From the CLI**

```bash
npm i -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

**Prerendering.** `npm run build` renders every route listed in `scripts/routes.mjs` (the same list
the sitemap uses) to `dist/<route>/index.html` via `src/entry-server.tsx` and
`scripts/prerender.mjs`, with that page's title, description and canonical link baked in. Phones
paint text straight from the HTML, and the client bundle then hydrates it. The build fails if a
route does not render. Unknown URLs are rewritten to `dist/200.html`, an empty app shell that
renders the 404 page (`netlify.toml` and `public/_redirects`). New services and blog posts are
picked up automatically. Add a new top-level page to `scripts/routes.mjs` and to the route list in
`vite.config.ts` (used for per-route preloading).

**Caching.** Everything in `/assets/` has a content hash in its name and is cached for a year
(`immutable`). HTML is served `no-cache` (always revalidated), so a new deploy is picked up
immediately.

---

## Accessibility & performance notes

- Semantic landmarks, a skip link, visible focus rings on every interactive element, and keyboard
  support for the carousel (arrow keys), accordion, toggles and mobile menu.
- The floating contact button is a direct Instagram DM link. It uses the brand green rather than
  the Instagram gradient, because white on that gradient's light end measures about 2.4:1 and would
  fail AA. All external links open in a new tab with `rel="noopener noreferrer"`.
- Calculator errors are announced with `role="alert"` and linked via `aria-describedby`.
- All animation goes through `Reveal` / `usePrefersReducedMotion` plus a global CSS media query, so
  `prefers-reduced-motion: reduce` removes transforms, carousel autoplay and floating shapes.
- Every route is prerendered to HTML and hydrated. Hydration waits one frame so the page paints
  first.
- Routes are code-split; only the home page ships in the initial bundle. An inline script in
  `<head>` (`vite.route-preload.ts`) modulepreloads the current route's chunk as the HTML is parsed,
  and on `/` preloads the hero photo at high priority on desktop widths (on phones the headline is
  the LCP and the photo sits below it).
- Framer Motion is loaded through `LazyMotion` + `m` components: the initial bundle carries only
  the small core, and the `domAnimation` features (`src/lib/motionFeatures.ts`) load after first
  paint. Use `m.*`, never `motion.*` — `strict` mode throws if you do.
- Animations use only `opacity` and `transform`. The hero and page-header text (the LCP on phones)
  is never faded in. Blurred background blobs, the floating hero card and `backdrop-filter` blurs
  are desktop-only (`md:`/`lg:`); the navbar is a solid bar on phones.
- Mobile: no horizontal scroll at 360px, tap targets at least 44×44px (`min-h-11` on buttons and
  chips, `.tap-target` for small standalone links), body copy 16px on phones, `100dvh` for
  full-height layouts, and the floating Instagram button respects iOS safe areas, hides on `/book`
  and whenever the footer is on screen. The testimonials carousel supports touch swipe.
- Per-page `<title>`, meta description, canonical, Open Graph, Twitter card and JSON-LD
  (`NutritionistBusiness`, `Service`, `FAQPage`, `BlogPosting`) come from the `useSeo` hook. Target
  keywords: *online nutritionist Pakistan*, *PCOS diet plan*, *diabetic diet consultation*.
- `public/sitemap.xml` is regenerated from the data files on every build.

---

## Medical disclaimer

Nutrition guidance on this site supports, and never replaces, a doctor's diagnosis, treatment or
medication. The disclaimers in the footer, on `/tools` and in the results section should stay in
place.
