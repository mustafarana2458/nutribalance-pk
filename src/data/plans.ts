export type Currency = 'PKR' | 'USD'
export type Billing = 'monthly' | 'quarterly'

/**
 * Amounts in the currency's major unit, or `null` where the price has not been
 * confirmed yet. Store numbers, not strings — formatting happens in one place,
 * so changing a price only means changing a number.
 */
export type Money = Record<Currency, number | null>

/**
 * Display toggles.
 *
 * Only monthly PKR pricing is confirmed, so both toggles are off and the cards
 * fall back to monthly / PKR. The billing and currency logic is untouched
 * underneath — fill in the `quarterly` and `USD` amounts below, flip the flag
 * back to `true`, and the control reappears with no other changes needed.
 */
export const showBillingToggle = false
export const showCurrencyToggle = false

/** Used when the currency toggle is hidden. */
export const defaultCurrency: Currency = 'PKR'
/** Used when the billing toggle is hidden. */
export const defaultBilling: Billing = 'monthly'

export type Plan = {
  id: string
  name: string
  blurb: string
  bestFor: string
  price: Record<Billing, Money>
  /** Saving note under the 3-month price. `null` until 3-month pricing is set. */
  quarterlyNote: string | null
  /** The four things every tier must state, used by both the cards and the table. */
  details: {
    videoCalls: string
    planUpdates: string
    chatSupport: string
    followUps: string
  }
  extras: string[]
  notIncluded?: string[]
  popular?: boolean
  ctaLabel: string
}

export const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    blurb: 'A solid plan and enough guidance to run it yourself.',
    bestFor: 'First-time clients who mainly need structure',
    price: {
      monthly: { PKR: 2000, USD: null },
      quarterly: { PKR: null, USD: null },
    },
    quarterlyNote: null,
    details: {
      videoCalls: '1 video call per month',
      planUpdates: 'Diet plan updated once a month',
      chatSupport: 'Instagram DM or email support for [X] days after each call',
      followUps: 'Follow-up once a month',
    },
    extras: [
      'Written diet plan with portions and meal timings',
      'Grocery guidance and swap options',
      'Email support within [X] working days',
    ],
    notIncluded: ['Ongoing chat access between sessions', 'Weekly plan adjustments'],
    ctaLabel: 'Start with Basic',
  },
  {
    id: 'standard',
    name: 'Standard',
    blurb: 'Regular check-ins and plan updates — the most popular choice.',
    bestFor: 'Weight, diabetes and PCOS clients who want steady guidance',
    price: {
      monthly: { PKR: 4000, USD: null },
      quarterly: { PKR: null, USD: null },
    },
    quarterlyNote: null,
    details: {
      videoCalls: '2 video calls per month',
      planUpdates: 'Diet plan updated every 2 weeks',
      chatSupport: 'Instagram DM or email support on working days',
      followUps: 'Follow-up every 2 weeks',
    },
    extras: [
      'Everything in Basic',
      'Progress review at each follow-up',
      'Report and bloodwork review each cycle',
      'Recipe ideas and eating-out guidance',
    ],
    popular: true,
    ctaLabel: 'Choose Standard',
  },
  {
    id: 'premium',
    name: 'Premium',
    blurb: 'Close, hands-on coaching with priority access.',
    bestFor: 'Complex cases, athletes, and anyone wanting maximum support',
    price: {
      monthly: { PKR: 6000, USD: null },
      quarterly: { PKR: null, USD: null },
    },
    quarterlyNote: null,
    details: {
      videoCalls: '4 video calls per month (weekly)',
      planUpdates: 'Diet plan updated weekly',
      chatSupport: 'Daily Instagram DM or email support, priority replies',
      followUps: 'Weekly follow-up',
    },
    extras: [
      'Everything in Standard',
      'Detailed report review coordinated with your doctor',
      'Supplement guidance where clinically indicated',
      'Household and family meal planning',
      'Priority booking for consultation slots',
    ],
    ctaLabel: 'Apply for Premium',
  },
]

const formatters: Record<Currency, Intl.NumberFormat> = {
  PKR: new Intl.NumberFormat('en-PK'),
  USD: new Intl.NumberFormat('en-US'),
}

const prefixes: Record<Currency, string> = { PKR: 'Rs ', USD: '$' }

/** "Rs 2,000" / "$25". Returns null when the amount is not confirmed yet. */
export const formatPrice = (amount: number | null, currency: Currency) =>
  amount === null ? null : `${prefixes[currency]}${formatters[currency].format(amount)}`

/** Shown wherever a price has not been set — the toggles keep these out of sight. */
export const priceOnRequestLabel = 'On request'

/** The cheapest confirmed monthly price, for "packages from …" links. */
export const lowestMonthlyPrice = (currency: Currency = defaultCurrency) => {
  const amounts = plans
    .map((plan) => plan.price.monthly[currency])
    .filter((amount): amount is number => amount !== null)
  return amounts.length ? formatPrice(Math.min(...amounts), currency) : null
}

export const planIncludesAll = [
  'Every plan is written personally for you — never a template',
  'Fully online, wherever you are in the world',
  'Change or pause your package before the next cycle begins',
]

/** Row labels for the comparison table on the Plans page. */
export const planComparisonRows: { label: string; key: keyof Plan['details'] }[] = [
  { label: 'Video consultations', key: 'videoCalls' },
  { label: 'Diet plan updates', key: 'planUpdates' },
  { label: 'Chat support', key: 'chatSupport' },
  { label: 'Follow-up frequency', key: 'followUps' },
]
