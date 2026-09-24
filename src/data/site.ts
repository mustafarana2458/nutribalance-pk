/**
 * Single source of truth for business details.
 * Change these values and the whole site updates.
 *
 * ⚠ PLACEHOLDERS: every value wrapped in [square brackets] is a placeholder and
 * must be replaced before launch — see the checklist in README.md. The email
 * address and the Instagram links below are real.
 *
 * Contact routes: Instagram DM is primary, email is secondary. There are no
 * forms and no phone or messaging number anywhere on the site. Render email
 * links with `EmailLink` / `useProtectedMailto` so the mailto stays spam-protected.
 */
export const site = {
  name: 'NutriBalance PK',
  shortName: 'NutriBalance',

  /** Logo lockup: wordmark with the practitioner credit underneath. */
  logo: {
    wordmark: 'NutriBalance',
    subtext: 'by Ayesha',
  },

  tagline: 'Science-based, sustainable nutrition',
  mission: 'Science-based, sustainable nutrition solutions for every client.',

  nutritionist: {
    firstName: 'Ayesha',
    name: 'Ayesha',
    credentials: 'Dietetics & Nutrition Professional',
    role: 'Clinical Nutrition & Personalized Diet Planning',
    yearsExperience: '2+',
    clientsHelped: '50+',
  },

  service: {
    mode: '100% online consultations',
    reach: 'Anywhere in Pakistan & worldwide',
    platforms: 'Zoom or Google Meet',
    timezone: 'PKT (Pakistan Standard Time, GMT+5)',
  },

  contact: {
    email: 'ayeshaghulamrasool97@gmail.com',
    hours: '[Mon–Sat · 10:00 AM – 7:00 PM PKT]',
    responseTime: 'Replies usually within one working day',
  },

  socials: {
    instagram: 'https://instagram.com/nutritionwith_ayesha',
    /** Deep link that opens a direct message thread. */
    instagramDm: 'https://ig.me/m/nutritionwith_ayesha',
    instagramHandle: '@nutritionwith_ayesha',
    facebook: 'https://facebook.com/nutribalancepk', // PLACEHOLDER
    youtube: 'https://youtube.com/@nutribalancepk', // PLACEHOLDER
  },

  url: 'https://nutribalancepk.netlify.app', // PLACEHOLDER — set your live domain

  defaultEnquirySubject: 'Online nutrition consultation enquiry',
}

/**
 * Primary contact route. ig.me only opens the message thread — it cannot
 * pre-fill text — so any context has to live in the surrounding copy.
 */
export const instagramDmLink = () => site.socials.instagramDm

/** Secondary contact route. Pre-fills subject and body where a summary helps. */
export const emailLink = (subject: string = site.defaultEnquirySubject, body?: string) => {
  const params = new URLSearchParams({ subject })
  if (body) params.set('body', body)
  return `mailto:${site.contact.email}?${params.toString()}`
}

/**
 * Optional scheduling embed on the booking page. Hidden until a real link
 * exists: paste the scheduling URL into `bookingEmbedUrl`, then set
 * `showBookingEmbed` to true.
 */
export const showBookingEmbed = false
export const bookingEmbedUrl = ''

/** Shown on the Book page after a "How payment works:" label. Payment details are only ever shared privately. */
export const paymentNote =
  "once you've booked, we'll send you payment details privately via Instagram DM or email. Your plan starts after payment is confirmed."

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Plans', to: '/plans' },
  { label: 'Tools', to: '/tools' },
  { label: 'Blog', to: '/blog' },
  { label: 'FAQ', to: '/faq' },
]

/** Trust badges (Home hero + About). Figures come from `site.nutritionist`. */
export const trustBadges = [
  { value: site.nutritionist.yearsExperience, label: 'Years of experience' },
  { value: site.nutritionist.clientsHelped, label: 'Clients helped' },
  { value: '100%', label: 'Online consultations' },
]

export const medicalDisclaimer =
  'Nutrition guidance on this site supports, and never replaces, your doctor’s diagnosis, treatment or medication. Always consult your physician before making changes, especially if you manage a medical condition.'
