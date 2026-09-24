/**
 * Every public route, shared by the sitemap (generate-sitemap.mjs) and the
 * build-time prerender (prerender.mjs), so the two can never drift apart.
 * Slugs are read with a regex so this stays a plain .mjs file with no build step.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

export const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const readSlugs = (file) =>
  [...readFileSync(join(root, file), 'utf8').matchAll(/^\s{4}slug: '([^']+)'/gm)].map((m) => m[1])

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/about', priority: '0.8', changefreq: 'yearly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/plans', priority: '0.9', changefreq: 'monthly' },
  { path: '/tools', priority: '0.7', changefreq: 'yearly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/faq', priority: '0.6', changefreq: 'monthly' },
  { path: '/book', priority: '0.9', changefreq: 'yearly' },
]

export const routes = [
  ...staticRoutes,
  ...readSlugs('src/data/services.ts').map((slug) => ({
    path: `/services/${slug}`,
    priority: '0.7',
    changefreq: 'monthly',
  })),
  ...readSlugs('src/data/posts.ts').map((slug) => ({
    path: `/blog/${slug}`,
    priority: '0.6',
    changefreq: 'yearly',
  })),
]
