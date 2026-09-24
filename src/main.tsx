import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LazyMotion } from 'framer-motion'
import App from './App.tsx'
import './index.css'

const loadMotionFeatures = () => import('@/lib/motionFeatures').then((mod) => mod.default)

const app = (
  <StrictMode>
    {/* `strict` makes any accidental full `motion.*` import fail loudly — use `m.*`. */}
    <LazyMotion features={loadMotionFeatures} strict>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LazyMotion>
  </StrictMode>
)

// Known routes are prerendered at build time (scripts/prerender.mjs) — hydrate
// that HTML. Anything else is served the empty 200.html shell and renders fresh.
const root = document.getElementById('root')!
if (root.hasChildNodes()) {
  // Yield one frame first so the browser paints the prerendered page before
  // hydration occupies the main thread (on a slow phone that is a few hundred ms).
  requestAnimationFrame(() => setTimeout(() => hydrateRoot(root, app), 0))
} else {
  createRoot(root).render(app)
}
