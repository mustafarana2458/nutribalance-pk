import type { Plugin } from 'vite'

type PreloadOptions = {
  /** Route pattern (tested against location.pathname) → page module under src/pages. */
  routes: [pattern: RegExp, page: string][]
  /** Home-page hero image: base file name in src/assets/images, its full-size width and the <img> `sizes`. */
  hero: { name: string; width: number; sizes: string; media: string }
}

type ChunkLike = { type: 'chunk'; fileName: string; imports: string[]; isDynamicEntry: boolean; isEntry: boolean; facadeModuleId: string | null }
type AssetLike = { type: 'asset'; fileName: string; originalFileNames?: readonly string[] }

/**
 * Per-route preloading for a client-rendered SPA.
 *
 * Every route except Home is code-split, so normally the browser only learns
 * which page chunk it needs after the main bundle has downloaded and run — a
 * serial waterfall that costs a full round trip on 4G. This plugin inlines a
 * tiny script in <head> that looks at the URL and immediately adds:
 *   - <link rel="modulepreload"> for the current page's chunk and its imports
 *   - on "/" only: <link rel="preload" as="image" fetchpriority="high"> for the
 *     hero photo, with the same srcset/sizes as the <img> so the browser reuses
 *     it. Limited to desktop widths (`media`): there the photo is above the fold
 *     and is the LCP. On phones it sits below the headline (the text is the
 *     LCP), so it must not compete with the fonts, CSS and JS on slow 4G.
 * The file names come from the finished bundle, so hashes are always correct.
 */
export function routePreload({ routes, hero }: PreloadOptions): Plugin {
  let base = '/'
  return {
    name: 'nutribalance:route-preload',
    apply: 'build',
    configResolved(config) {
      base = config.base
    },
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const bundle = ctx.bundle as Record<string, ChunkLike | AssetLike> | undefined
        if (!bundle) return html
        const items = Object.values(bundle)
        const chunks = items.filter((item): item is ChunkLike => item.type === 'chunk')
        const byFile = new Map(chunks.map((chunk) => [chunk.fileName, chunk]))

        // Everything the entry already pulls in statically is modulepreloaded by Vite.
        const entry = chunks.find((chunk) => chunk.isEntry)
        const alreadyLoaded = new Set<string>()
        const walk = (file: string, into: Set<string>) => {
          if (into.has(file)) return
          into.add(file)
          byFile.get(file)?.imports.forEach((dep) => walk(dep, into))
        }
        if (entry) walk(entry.fileName, alreadyLoaded)

        const routeTable = routes.flatMap(([pattern, page]) => {
          const chunk = chunks.find(
            (c) => c.isDynamicEntry && c.facadeModuleId?.replace(/\\/g, '/').endsWith(`/src/pages/${page}.tsx`),
          )
          if (!chunk) {
            this.warn(`route-preload: no chunk found for page "${page}"`)
            return []
          }
          const files = new Set<string>()
          walk(chunk.fileName, files)
          const needed = [...files].filter((file) => !alreadyLoaded.has(file)).map((file) => base + file)
          return [[pattern.source, needed] as const]
        })

        const assets = items.filter((item): item is AssetLike => item.type === 'asset')
        const findImage = (fileName: string) =>
          assets.find((a) =>
            a.originalFileNames?.some((original) => original.replace(/\\/g, '/').endsWith(`src/assets/images/${fileName}`)),
          )
        const heroFull = findImage(`${hero.name}.webp`)
        const heroVariants = assets
          .map((asset) => {
            const original = asset.originalFileNames?.map((o) => o.replace(/\\/g, '/')).find((o) =>
              new RegExp(`src/assets/images/${hero.name}-(\\d+)w\\.webp$`).test(o),
            )
            const width = original?.match(/-(\d+)w\.webp$/)?.[1]
            return width ? `${base}${asset.fileName} ${width}w` : null
          })
          .filter(Boolean)
        const heroPreload = heroFull
          ? {
              href: base + heroFull.fileName,
              srcset: [...heroVariants, `${base}${heroFull.fileName} ${hero.width}w`].join(', '),
              sizes: hero.sizes,
              media: hero.media,
            }
          : null
        if (!heroFull) this.warn(`route-preload: hero image "${hero.name}" not found in bundle`)

        const script = `(function(){var p=location.pathname,d=document,R=${JSON.stringify(routeTable)},H=${JSON.stringify(heroPreload)};function l(a){var e=d.createElement('link');for(var k in a)e.setAttribute(k,a[k]);d.head.appendChild(e)}if(p==='/'&&H){l({rel:'preload',as:'image',href:H.href,imagesrcset:H.srcset,imagesizes:H.sizes,media:H.media,fetchpriority:'high'})}for(var i=0;i<R.length;i++){if(new RegExp(R[i][0]).test(p)){R[i][1].forEach(function(f){l({rel:'modulepreload',href:f,crossorigin:''})});break}}})()`

        return {
          html,
          tags: [{ tag: 'script', children: script, injectTo: 'head-prepend' }],
        }
      },
    },
  }
}
