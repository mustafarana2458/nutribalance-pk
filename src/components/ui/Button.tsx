import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'accent' | 'outline' | 'ghost' | 'white'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<Variant, string> = {
  // white on forest-600 = 6.1:1 — passes AA
  primary:
    'bg-forest-600 text-white shadow-soft hover:bg-forest-700 hover:shadow-lift focus-visible:ring-forest-600 focus-visible:ring-offset-cream-50',
  // ink-900 on apricot-500 = 7.9:1 — white would fail here, so the accent always carries dark text
  accent:
    'bg-apricot-500 text-ink-900 shadow-soft hover:bg-apricot-600 hover:shadow-glow focus-visible:ring-apricot-700 focus-visible:ring-offset-cream-50',
  outline:
    'border border-forest-600/30 bg-transparent text-forest-700 hover:border-forest-600 hover:bg-forest-50 focus-visible:ring-forest-600 focus-visible:ring-offset-cream-50',
  ghost:
    'bg-transparent text-forest-700 hover:bg-sage-200 focus-visible:ring-forest-600 focus-visible:ring-offset-cream-50',
  white:
    'bg-white text-forest-700 shadow-soft hover:bg-cream-50 hover:shadow-lift focus-visible:ring-white focus-visible:ring-offset-forest-700',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-[0.95rem]',
  lg: 'px-7 py-3.5 text-base',
}

type Common = {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type AsRouterLink = Common & Omit<LinkProps, 'className'> & { href?: never }
type AsAnchor = Common & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> & {
  href: string
  to?: never
}
type AsButton = Common & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
  to?: never
  href?: never
}

export type ButtonProps = AsRouterLink | AsAnchor | AsButton

/**
 * One button, three element shapes, chosen by the props you pass:
 * `to` renders a router <Link>, `href` renders an <a>, otherwise a <button>.
 */
export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children } = props
  const classes = cn(base, variants[variant], sizes[size], className)

  if ('to' in props && props.to !== undefined) {
    const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props
    return (
      <Link className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if ('href' in props && props.href !== undefined) {
    const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    )
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as AsButton
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
