export type Result = {
  id: string
  name: string
  program: string
  duration: string
  headline: string
  metrics: { label: string; before: string; after: string }[]
  note: string
}

/**
 * Hidden until real, consented client outcomes exist. Add entries below,
 * then set `showResults` to true. Never publish client data without written consent.
 */
export const showResults = false

export const results: Result[] = [
  // Expected format:
  // {
  //   id: 'r1',
  //   name: 'Sana, Lahore',
  //   program: 'Personalized Diet Plan',
  //   duration: '3 months',
  //   headline: 'Steady weight loss while eating home-cooked meals',
  //   metrics: [
  //     { label: 'Weight', before: '78 kg', after: '71 kg' },
  //     { label: 'Waist', before: '36 in', after: '33 in' },
  //   ],
  //   note: 'A short note about what changed and what stayed the same.',
  // },
]

export const resultsDisclaimer =
  'Results are individual and achieved alongside medical care where relevant. Nutrition is personal — your own results will depend on your health, your consistency and your circumstances.'
