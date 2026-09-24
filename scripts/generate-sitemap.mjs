/**
 * Writes public/sitemap.xml from the routes in src/data.
 * Runs automatically before every build (see the "prebuild" script).
 * The route list lives in scripts/routes.mjs (shared with the prerender step).
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { root, routes } from './routes.mjs'

const siteUrl =
  readFileSync(join(root, 'src/data/site.ts'), 'utf8').match(/url: '([^']+)'/)?.[1] ??
  'https://example.com'

const today = new Date().toISOString().slice(0, 10)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route.path === '/' ? '' : route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

writeFileSync(join(root, 'public/sitemap.xml'), xml)
console.log(`sitemap.xml written with ${routes.length} routes`)
