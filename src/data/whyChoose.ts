import type { LucideIcon } from 'lucide-react'
import { CookingPot, HeartPulse, MessagesSquare, Stethoscope } from 'lucide-react'

export type ValueCard = {
  title: string
  description: string
  icon: LucideIcon
}

/** "Why Clients Choose Ayesha" — value cards on the home page. */
export const whyChoose: ValueCard[] = [
  {
    title: 'Clinical nutrition background',
    description:
      'Advice grounded in dietetics and clinical nutrition, and planned around your health history, reports and any medication your doctor has prescribed.',
    icon: Stethoscope,
  },
  {
    title: 'Plans built around Pakistani home food',
    description:
      'Roti, daal, sabzi and the meals your family already cooks, with portions and swaps that fit your routine. No imported diet foods or separate cooking.',
    icon: CookingPot,
  },
  {
    title: 'Focused care for diabetes & PCOS',
    description:
      'Structured eating plans for steadier blood sugar and hormone balance, always working alongside the treatment from your doctor.',
    icon: HeartPulse,
  },
  {
    title: 'Ongoing support, not just a one-time plan',
    description:
      'Follow-up calls, plan updates and Instagram DM or email support between sessions, so the plan changes as your results do.',
    icon: MessagesSquare,
  },
]
