import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '@/data/site'

type SeoOptions = {
  title: string
  description: string
  /** Falls back to the current path. */
  path?: string
  type?: 'website' | 'article'
  /** JSON-LD object injected as structured data for this page. */
  jsonLd?: Record<string, unknown>
}

/**
 * Filled while prerendering (no `document` on the server) so the build can bake
 * the page's title, description and canonical URL into its static HTML.
 */
export const ssrHead: { current: { title: string; description: string; url: string } | null } = {
  current: null,
}

const upsertMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const upsertLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Per-page document head management: title, description, canonical,
 * Open Graph, Twitter card and optional JSON-LD.
 */
export function useSeo({ title, description, path, type = 'website', jsonLd }: SeoOptions) {
  const location = useLocation()
  const resolvedPath = path ?? location.pathname
  const url = `${site.url}${resolvedPath === '/' ? '' : resolvedPath}`
  const fullTitle = resolvedPath === '/' ? title : `${title} | ${site.name}`

  if (typeof document === 'undefined') ssrHead.current = { title: fullTitle, description, url }

  useEffect(() => {
    document.title = fullTitle
    upsertMeta('meta[name="description"]', 'name', 'description', description)
    upsertLink('canonical', url)

    upsertMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description)
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', type)
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', url)
    upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', site.name)
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', `${site.url}/og-image.jpg`)
    upsertMeta('meta[property="og:image:width"]', 'property', 'og:image:width', '1200')
    upsertMeta('meta[property="og:image:height"]', 'property', 'og:image:height', '630')
    upsertMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', `${site.name} — ${site.tagline}`)
    upsertMeta('meta[property="og:locale"]', 'property', 'og:locale', 'en_PK')

    upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle)
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', `${site.url}/og-image.jpg`)
  }, [fullTitle, description, url, type])

  useEffect(() => {
    if (!jsonLd) return
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(jsonLd)
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(jsonLd ?? null)])
}
