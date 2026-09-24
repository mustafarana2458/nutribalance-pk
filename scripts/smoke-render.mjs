/**
 * Renders every page component to a string through Vite's SSR loader.
 * Not part of the build — a quick way to catch runtime errors without a browser.
 * Usage: node scripts/smoke-render.mjs
 */
import { createServer } from 'vite'
import { writeFileSync, rmSync } from 'node:fs'

const entry = 'src/__smoke-entry.tsx'

writeFileSync(
  entry,
  `import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Plans from './pages/Plans'
import Tools from './pages/Tools'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Faq from './pages/Faq'
import Book from './pages/Book'
import NotFound from './pages/NotFound'

// Same route table as App.tsx, but eager so SSR does not stop at the Suspense boundary.
export function render(path: string) {
  return renderToString(
    <StaticRouter location={path}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/book" element={<Book />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </StaticRouter>,
  )
}
`,
)

const routes = [
  '/', '/about', '/services',
  '/services/personalized-diet-plans', '/services/diabetic-diet-consultation',
  '/services/pcos-management-plans', '/services/sports-nutrition',
  '/services/one-on-one-consultation', '/services/monthly-follow-up-packages',
  '/plans', '/tools', '/blog',
  '/blog/pcos-friendly-eating', '/blog/managing-blood-sugar-through-diet',
  '/blog/sustainable-weight-loss',
  '/faq', '/book', '/definitely-missing',
]

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
let failed = 0

try {
  const { render } = await server.ssrLoadModule('/' + entry)
  for (const route of routes) {
    try {
      const html = await render(route)
      if (html.length < 8000) {
        console.log(`WARN  ${route} rendered only ${html.length} chars`)
        failed++
      } else {
        console.log(`ok    ${route} (${html.length} chars)`)
      }
    } catch (error) {
      failed++
      console.log(`FAIL  ${route}\n      ${error.message}`)
    }
  }
} finally {
  await server.close()
  rmSync(entry, { force: true })
}

console.log(failed === 0 ? '\nAll routes rendered.' : `\n${failed} route(s) had problems.`)
process.exit(failed === 0 ? 0 : 1)
