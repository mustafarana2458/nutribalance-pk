export type Testimonial = {
  id: string
  quote: string
  /** First name only, with the client's written consent. */
  firstName: string
  city: string
  /** The service or package the client used, e.g. 'PCOS Management Plan'. */
  service: string
}

/**
 * Hidden until real, consented client feedback exists. Add entries below,
 * then set `showTestimonials` to true.
 */
export const showTestimonials = false

export const testimonials: Testimonial[] = [
  // Expected format:
  // {
  //   id: 't1',
  //   quote: 'What the client said, in their own words.',
  //   firstName: 'Sana',
  //   city: 'Lahore',
  //   service: 'PCOS Management Plan',
  // },
]
