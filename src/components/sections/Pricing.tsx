import { useState } from 'react'
import { Check, MessagesSquare, RefreshCw, Sparkles, Video, X } from 'lucide-react'
import {
  defaultBilling,
  defaultCurrency,
  formatPrice,
  plans,
  planIncludesAll,
  priceOnRequestLabel,
  showBillingToggle,
  showCurrencyToggle,
  type Billing,
  type Currency,
  type Plan,
} from '@/data/plans'
import { instagramDmLink } from '@/data/site'
import { InstagramIcon } from '@/components/ui/BrandIcons'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

/** Shared segmented control for both toggles. */
function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: { id: T; label: string; badge?: string }[]
  onChange: (next: T) => void
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="inline-flex items-center gap-1 rounded-full border border-cream-200 bg-white p-1 shadow-soft"
    >
      {options.map((option) => {
        const active = value === option.id
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.id)}
            className={cn(
              'min-h-11 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-soft focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2 sm:px-5',
              active ? 'bg-forest-600 text-white shadow-soft' : 'text-ink-600 hover:text-forest-700',
            )}
          >
            {option.label}
            {option.badge && (
              <span
                className={cn(
                  'ml-2 rounded-full px-2 py-0.5 text-[0.7rem] font-semibold',
                  active ? 'bg-apricot-500 text-ink-900' : 'bg-apricot-100 text-apricot-700',
                )}
              >
                {option.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

const detailIcons = {
  videoCalls: Video,
  planUpdates: RefreshCw,
  chatSupport: MessagesSquare,
  followUps: Check,
}

export function PlanCard({
  plan,
  billing,
  currency,
}: {
  plan: Plan
  billing: Billing
  currency: Currency
}) {
  const price = formatPrice(plan.price[billing][currency], currency)
  const period = billing === 'monthly' ? '/month' : ' for 3 months'

  return (
    <article
      className={cn(
        'relative flex h-full flex-col rounded-3xl border p-7 transition-all duration-300 ease-soft sm:p-8',
        plan.popular
          ? 'border-forest-600 bg-forest-700 text-sage-200 shadow-lift lg:-my-4 lg:py-12'
          : 'border-cream-200 bg-white shadow-soft hover:-translate-y-1 hover:shadow-lift',
      )}
    >
      {plan.popular && (
        <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-apricot-500 px-4 py-1.5 text-xs font-semibold text-ink-900 shadow-soft">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Most popular
        </span>
      )}

      <h3
        className={cn(
          'font-display text-2xl font-semibold',
          plan.popular ? 'text-white' : 'text-forest-700',
        )}
      >
        {plan.name}
      </h3>
      <p className={cn('mt-2 text-sm', plan.popular ? 'text-sage-200/85' : 'text-ink-600')}>
        {plan.blurb}
      </p>

      <div className="mt-7">
        <p
          className={cn(
            'font-display text-3xl font-semibold sm:text-4xl',
            plan.popular ? 'text-white' : 'text-forest-700',
          )}
        >
          {price ?? priceOnRequestLabel}
          {price && (
            <span
              className={cn(
                'ml-1.5 font-sans text-base font-medium',
                plan.popular ? 'text-sage-200/80' : 'text-ink-500',
              )}
            >
              {period}
            </span>
          )}
        </p>
        <p className={cn('mt-2 text-xs', plan.popular ? 'text-sage-200/70' : 'text-ink-500')}>
          {billing === 'quarterly'
            ? (plan.quarterlyNote ?? 'Billed once for 3 months')
            : 'Billed monthly · cancel or pause any time'}
        </p>
      </div>

      <p
        className={cn(
          'mt-6 rounded-2xl px-4 py-3 text-xs leading-relaxed',
          plan.popular ? 'bg-forest-600 text-sage-200' : 'bg-sage-100 text-ink-600',
        )}
      >
        <span className="font-semibold">Best for:</span> {plan.bestFor}
      </p>

      {/* The four details every tier states */}
      <ul className="mt-6 space-y-3">
        {(Object.keys(plan.details) as (keyof Plan['details'])[]).map((key) => {
          const Icon = detailIcons[key]
          return (
            <li key={key} className="flex gap-3 text-sm">
              <Icon
                className={cn(
                  'mt-0.5 h-4 w-4 shrink-0',
                  plan.popular ? 'text-apricot-400' : 'text-forest-600',
                )}
                aria-hidden
              />
              <span className={plan.popular ? 'text-white' : 'text-ink-900'}>
                {plan.details[key]}
              </span>
            </li>
          )
        })}
      </ul>

      <ul
        className={cn(
          'mt-5 flex-1 space-y-3 border-t pt-5',
          plan.popular ? 'border-forest-600' : 'border-cream-200',
        )}
      >
        {plan.extras.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm">
            <Check
              className={cn(
                'mt-0.5 h-4 w-4 shrink-0',
                plan.popular ? 'text-apricot-400' : 'text-forest-600',
              )}
              aria-hidden
            />
            <span className={plan.popular ? 'text-sage-200/90' : 'text-ink-700'}>{feature}</span>
          </li>
        ))}
        {plan.notIncluded?.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm">
            <X className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" aria-hidden />
            <span className="text-ink-400 line-through">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        to="/book"
        variant={plan.popular ? 'accent' : 'outline'}
        size="lg"
        className="mt-8 w-full"
      >
        {plan.ctaLabel}
      </Button>
    </article>
  )
}

type PricingProps = {
  tone?: 'cream' | 'white' | 'sage'
  eyebrow?: string
  title?: string
  description?: string
  showFinePrint?: boolean
}

export function Pricing({
  tone = 'cream',
  eyebrow = 'Plans & pricing',
  title = 'Monthly follow-up packages',
  description = 'Three levels of ongoing support. Each tier sets how often we meet, how often your plan is updated, and how much chat support you have in between.',
  showFinePrint = true,
}: PricingProps) {
  // The toggles are hidden until 3-month and USD pricing are confirmed
  // (see showBillingToggle / showCurrencyToggle in src/data/plans.ts).
  const [billing, setBilling] = useState<Billing>(defaultBilling)
  const [currency, setCurrency] = useState<Currency>(defaultCurrency)

  return (
    <Section tone={tone} id="plans">
      <SectionHeading align="center" eyebrow={eyebrow} title={title} description={description} />

      {(showBillingToggle || showCurrencyToggle) && (
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          {showBillingToggle && (
            <Segmented
              label="Billing period"
              value={billing}
              onChange={setBilling}
              options={[
                { id: 'monthly', label: 'Monthly' },
                { id: 'quarterly', label: '3 months', badge: 'Save' },
              ]}
            />
          )}
          {showCurrencyToggle && (
            <Segmented
              label="Currency"
              value={currency}
              onChange={setCurrency}
              options={[
                { id: 'PKR', label: 'PKR' },
                { id: 'USD', label: 'USD' },
              ]}
            />
          )}
        </div>
      )}

      <div className="mt-10 grid items-start gap-6 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <Reveal key={plan.id} delay={index * 0.08} className="h-full">
            <PlanCard plan={plan} billing={billing} currency={currency} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.08}>
        <p className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-ink-600">
          Outside Pakistan?
          <a
            href={instagramDmLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex items-center gap-1.5 font-semibold text-forest-700 hover:text-forest-600"
          >
            <InstagramIcon className="h-4 w-4" />
            Message us on Instagram
          </a>
          for international pricing.
        </p>
      </Reveal>

      {showFinePrint && (
        <Reveal delay={0.12}>
          <ul className="mx-auto mt-10 flex max-w-4xl flex-col items-center gap-2.5 text-center text-sm text-ink-600 sm:flex-row sm:justify-center sm:gap-7">
            {planIncludesAll.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-forest-600" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </Section>
  )
}
