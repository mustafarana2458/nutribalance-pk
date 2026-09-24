/**
 * Framer Motion's animation features, split into their own chunk. The initial
 * bundle only carries the tiny `m` components; this loads right after first
 * paint via <LazyMotion> in main.tsx.
 */
export { domAnimation as default } from 'framer-motion'
