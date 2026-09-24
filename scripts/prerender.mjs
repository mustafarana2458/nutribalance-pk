/**
 * Build step 3 of 3 (see "build" in package.json): prerenders every route to
 * static HTML so text paints straight from the HTML on slow phones, instead of
 * waiting for ~120 KB of JavaScript to download and run. The client bundle then
 * hydrates it (src/main.tsx).
 *
 *   dist/index.html                  → "/" (prerendered)
 *   dist/<route>/index.html          → every other route in scripts/routes.mjs
 *   dist/200.html                    → the empty app shell, served by the SPA
 *                                      rewrite for unknown URLs (renders the 404)
 *
 * Each page also gets its own <title>, meta description and canonical link
 * baked in, so crawlers and link previews see them without running JS.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { root, routes } from './routes.mjs'

const dist = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')
const template = readFileSync(join(dist, 'index.html'), 'utf8')

const EMPTY_ROOT = '<div id="root"></div>'
if (!template.includes(EMPTY_ROOT)) throw new Error('dist/index.html has no empty #root to fill')

const escapeAttr = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escapeText = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Unknown URLs fall back to this untouched shell (see netlify.toml / _redirects).
writeFileSync(join(dist, '200.html'), template)

const { render } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)

let failed = 0
for (const { path } of routes) {
  try {
    const { html, head } = await render(path)
    // A lazy route that never resolved would leave the loading fallback behind.
    if (html.includes('Loading page') || html.length < 5000) {
      throw new Error(`rendered only the loading fallback (${html.length} chars)`)
    }

    let page = template.replace(EMPTY_ROOT, `<div id="root">${html}</div>`)
    if (head) {
      page = page
        .replace(/<title>[^<]*<\/title>/, `<title>${escapeText(head.title)}</title>`)
        .replace(
          /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
          `<meta name="description" content="${escapeAttr(head.description)}" />`,
        )
        .replace('</head>', `  <link rel="canonical" href="${escapeAttr(head.url)}" />\n  </head>`)
    }

    const outDir = path === '/' ? dist : join(dist, ...path.split('/').filter(Boolean))
    mkdirSync(outDir, { recursive: true })
    writeFileSync(join(outDir, 'index.html'), page)
    console.log(`prerendered ${path.padEnd(42)} ${(page.length / 1024).toFixed(1)} KB`)
  } catch (error) {
    failed++
    console.error(`FAILED     ${path}: ${error.message}`)
  }
}

if (!process.env.KEEP_SSR) rmSync(ssrDir, { recursive: true, force: true })

if (failed) {
  console.error(`\n${failed} route(s) failed to prerender`)
  process.exit(1)
}
console.log(`\n${routes.length} routes prerendered, plus dist/200.html fallback shell`)
