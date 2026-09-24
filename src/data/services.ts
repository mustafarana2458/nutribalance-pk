import type { LucideIcon } from 'lucide-react'
import { Activity, CalendarSync, Dumbbell, HeartPulse, Salad, Video } from 'lucide-react'

export type Service = {
  slug: string
  title: string
  tagline: string
  /** One or two sentences, used on cards. */
  description: string
  /** Longer version for the detail page. */
  detail: string
  icon: LucideIcon
  duration: string
  format: string
  forWhom: string[]
  includes: string[]
  featured?: boolean
}

export const services: Service[] = [
  {
    slug: 'personalized-diet-plans',
    title: 'Personalized Diet Plans',
    tagline: 'Weight loss and weight gain, planned around your life',
    description:
      'A diet plan built from your own routine, food preferences and health history — whether the goal is to lose weight, gain it, or hold a healthy weight steadily.',
    detail:
      'No two plans look alike, because no two kitchens, schedules or appetites are alike. We start with what you already eat, what your day actually looks like, and what your body needs — then build a plan you can follow without feeling deprived. Portions, timings and swaps are all written out, so you are never guessing at mealtime.',
    icon: Salad,
    duration: 'Initial consultation, then a written plan',
    format: 'Online video session',
    forWhom: [
      'You want to lose weight without crash dieting or cutting out entire food groups',
      'You are trying to gain weight or build muscle and struggle to eat enough',
      'You have tried generic plans from the internet and could not sustain them',
    ],
    includes: [
      'Full diet, lifestyle and health history assessment',
      'A written plan with portions, meal timings and swap options',
      'Grocery guidance and simple eating-out suggestions',
      'A follow-up review to adjust the plan as you progress',
    ],
    featured: true,
  },
  {
    slug: 'diabetic-diet-consultation',
    title: 'Diabetic Diet Consultation',
    tagline: 'Eat well, keep your numbers steady',
    description:
      'Medical nutrition guidance for type 2 diabetes and pre-diabetes, designed to work alongside your doctor’s treatment plan rather than around it.',
    detail:
      'Managing diabetes through food is about structure, not sacrifice. We map your meals against your medication timing, balance carbohydrates across the day, and build a routine that keeps energy and glucose stable. Everything is coordinated with the treatment your physician has already prescribed — your medication is their decision, never mine.',
    icon: Activity,
    duration: 'Initial consultation, then a written plan',
    format: 'Online video session',
    forWhom: [
      'You have been diagnosed with type 2 diabetes or pre-diabetes',
      'You are unsure which foods and portions are safe for you',
      'You want to eat normally with your family without separate meals',
    ],
    includes: [
      'Review of your reports and current eating pattern',
      'Carbohydrate distribution matched to your medication timing',
      'Practical guidance for travel, family events and Ramadan',
      'Follow-up reviews to track progress with your reports',
    ],
    featured: true,
  },
  {
    slug: 'pcos-management-plans',
    title: 'PCOS Management Plans',
    tagline: 'Nutrition that supports your hormones',
    description:
      'A PCOS-focused eating plan built around blood sugar balance, fibre and steady energy — and designed to fit real life, not a restrictive protocol.',
    detail:
      'PCOS nutrition works best when it targets insulin sensitivity and consistency rather than extreme restriction. We build regular, balanced meals, add the fibre and protein that steady your energy, and keep the plan flexible enough to live with. Where medication or fertility treatment is involved, the plan is designed to sit alongside your doctor’s advice.',
    icon: HeartPulse,
    duration: 'Initial consultation, then a written plan',
    format: 'Online video session',
    forWhom: [
      'You have been diagnosed with PCOS or insulin resistance',
      'You are dealing with irregular cycles, fatigue or stubborn weight gain',
      'You want a sustainable plan rather than a long list of banned foods',
    ],
    includes: [
      'Assessment of your symptoms, reports and eating pattern',
      'A balanced, lower-glycaemic meal structure using everyday foods',
      'Guidance on meal timing, fibre and protein targets',
      'Follow-up support as your symptoms and cycle change',
    ],
    featured: true,
  },
  {
    slug: 'sports-nutrition',
    title: 'Sports Nutrition',
    tagline: 'Fuel your training properly',
    description:
      'Performance-focused nutrition for people who train seriously — energy, protein and hydration planned around your actual training week.',
    detail:
      'Training hard without fuelling properly limits both performance and recovery. We set energy and protein targets for training and rest days, plan what to eat before and after sessions, and sort out hydration. Supplements are reviewed on evidence, not marketing — most people need far fewer than they think.',
    icon: Dumbbell,
    duration: 'Initial consultation, then a written plan',
    format: 'Online video session',
    forWhom: [
      'You train regularly and want your nutrition to match the effort',
      'You are preparing for an event, season or competition',
      'You want to build muscle or lean out without losing performance',
    ],
    includes: [
      'Energy and protein targets for training and rest days',
      'Pre-, during- and post-session fuelling guidance',
      'Hydration plan for your climate and training load',
      'An evidence-based review of any supplements you use',
    ],
  },
  {
    slug: 'one-on-one-consultation',
    title: 'One-on-One Consultation',
    tagline: 'A focused online session, just for you',
    description:
      'A private video consultation to talk through your health, your goals and your questions — and leave with clear, specific next steps.',
    detail:
      'Sometimes you need a proper conversation before committing to a programme. This is a dedicated one-on-one video session where we go through your history, your reports and your questions in detail. You leave with practical changes you can start immediately and a clear picture of what a full plan would involve.',
    icon: Video,
    duration: 'Single online session',
    format: 'Zoom or Google Meet',
    forWhom: [
      'You want expert guidance without committing to a monthly package yet',
      'You have specific questions about your diet, reports or symptoms',
      'You live outside Pakistan and need a convenient online slot',
    ],
    includes: [
      'A private video consultation at a time that suits your timezone',
      'Review of your health history, goals and any reports you share',
      'Clear, practical recommendations to start straight away',
      'A written summary of what was discussed',
    ],
    featured: true,
  },
  {
    slug: 'monthly-follow-up-packages',
    title: 'Monthly Follow-up Packages',
    tagline: 'Ongoing support, not a one-off plan',
    description:
      'Continued coaching with regular video calls, plan updates and chat support — because lasting change needs adjustment over time.',
    detail:
      'Most people do not struggle with starting; they struggle with the weeks that follow. Follow-up packages keep the plan moving as your body, schedule and results change. Each tier sets how often we meet, how often the plan is updated, and how much chat support you have between sessions — full details on the Plans page.',
    icon: CalendarSync,
    duration: 'Monthly or 3-month packages',
    format: 'Online video sessions + chat support',
    forWhom: [
      'You know accountability is what keeps you consistent',
      'Your plan needs regular adjustment as results come in',
      'You want quick answers between sessions instead of guessing',
    ],
    includes: [
      'Scheduled video consultations each month',
      'Regular diet plan updates based on your progress',
      'Chat support between sessions by Instagram DM or email',
      'Ongoing progress reviews and course corrections',
    ],
  },
]

export const getService = (slug?: string) => services.find((service) => service.slug === slug)

/** Highlighted on the home page "Specialized Care" block. */
export const specializedCareSlugs = ['diabetic-diet-consultation', 'pcos-management-plans']
