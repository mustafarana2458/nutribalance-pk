/**
 * Build-time prerender entry (see scripts/prerender.mjs). Renders one route to
 * static HTML so phones can paint text straight from the HTML, before any
 * JavaScript has downloaded; main.tsx then hydrates it.
 */
import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import { LazyMotion } from 'framer-motion'
import App from './App'
import { ssrHead } from './hooks/useSeo'

// Animation features are client-only; `m` components render their initial state.
const noFeatures = () => new Promise<never>(() => {})

const tree = (url: string) => (
  <StrictMode>
    <LazyMotion features={noFeatures} strict>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </LazyMotion>
  </StrictMode>
)

export async function render(url: string) {
  ssrHead.current = null
  // `prerender` waits for the lazy route to resolve. progressiveChunkSize:
  // Infinity stops React from "outlining" large Suspense boundaries (loading
  // fallback in place + real content in a hidden div swapped in by an inline
  // script) — the page content is written inline, exactly where it belongs.
  const { prelude } = await prerender(tree(url), { progressiveChunkSize: Infinity })
  const html = await new Response(prelude).text()
  return { html, head: ssrHead.current }
}
