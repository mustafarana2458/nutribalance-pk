import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import { routePreload } from './vite.route-preload.ts'
import {
  HERO_IMAGE_NAME,
  HERO_IMAGE_PRELOAD_MEDIA,
  HERO_IMAGE_SIZES,
  HERO_IMAGE_WIDTH,
} from './src/data/hero.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    routePreload({
      // Mirrors the lazy routes in src/App.tsx.
      routes: [
        [/^\/about\/?$/, 'About'],
        [/^\/services\/?$/, 'Services'],
        [/^\/services\/[^/]+\/?$/, 'ServiceDetail'],
        [/^\/plans\/?$/, 'Plans'],
        [/^\/tools\/?$/, 'Tools'],
        [/^\/blog\/?$/, 'Blog'],
        [/^\/blog\/[^/]+\/?$/, 'BlogPost'],
        [/^\/faq\/?$/, 'Faq'],
        [/^\/book\/?$/, 'Book'],
      ],
      hero: {
        name: HERO_IMAGE_NAME,
        width: HERO_IMAGE_WIDTH,
        sizes: HERO_IMAGE_SIZES,
        media: HERO_IMAGE_PRELOAD_MEDIA,
      },
    }),
    // `npm run analyze` writes an interactive treemap of the bundle to dist/stats.html.
    mode === 'analyze' &&
      visualizer({ filename: 'dist/stats.html', gzipSize: true, brotliSize: true, template: 'treemap' }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Router gets its own long-cached chunk. Framer Motion is deliberately NOT
        // forced into one chunk: its lazily-loaded animation features
        // (src/lib/motionFeatures.ts) must stay out of the initial download.
        manualChunks(id: string) {
          if (id.includes('node_modules/react-router')) return 'router'
          return undefined
        },
      },
    },
  },
}))
