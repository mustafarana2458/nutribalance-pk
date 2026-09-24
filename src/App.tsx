import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import Home from '@/pages/Home'

// Home ships in the initial bundle; everything else is split per route.
const About = lazy(() => import('@/pages/About'))
const Services = lazy(() => import('@/pages/Services'))
const ServiceDetail = lazy(() => import('@/pages/ServiceDetail'))
const Plans = lazy(() => import('@/pages/Plans'))
const Tools = lazy(() => import('@/pages/Tools'))
const Blog = lazy(() => import('@/pages/Blog'))
const BlogPost = lazy(() => import('@/pages/BlogPost'))
const Faq = lazy(() => import('@/pages/Faq'))
const Book = lazy(() => import('@/pages/Book'))
const NotFound = lazy(() => import('@/pages/NotFound'))

/**
 * Shown while a route chunk loads. Full viewport height (dvh, so it matches the
 * visible area on mobile browsers) keeps the footer below the fold — otherwise
 * the footer paints high up and jumps down when the page arrives (CLS).
 */
function RouteFallback() {
  return (
    <div className="flex min-h-dvh items-center justify-center" role="status" aria-live="polite">
      <span className="sr-only">Loading page</span>
      <span
        aria-hidden
        className="h-9 w-9 animate-spin rounded-full border-2 border-sage-300 border-t-forest-600"
      />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="*"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="/plans" element={<Plans />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/book" element={<Book />} />
                {/* Old route kept so existing links and bookmarks still land somewhere useful. */}
                <Route path="/contact" element={<Navigate to="/book" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}
