import type { LucideIcon } from 'lucide-react'
import { CalendarPlus, FileText, MessageCircle, Video } from 'lucide-react'

export type Step = {
  number: string
  title: string
  description: string
  icon: LucideIcon
}

/** "How Online Consultation Works" — the four steps every client follows. */
export const processSteps: Step[] = [
  {
    number: '01',
    title: 'Message us with your goal and health details',
    description:
      'Send an Instagram DM or an email with your goal, age, height and weight, any medical conditions or medication, and a preferred time for the call. It means we spend the session on you, not on paperwork.',
    icon: MessageCircle,
  },
  {
    number: '02',
    title: 'Confirm your slot',
    description:
      'You get a reply with available times and the payment details. Once payment is received your slot is confirmed. All times are in PKT, and international clients are welcome.',
    icon: CalendarPlus,
  },
  {
    number: '03',
    title: 'Video consultation',
    description:
      'We meet on Zoom or Google Meet and go through your history, your reports and what your days actually look like — then agree on a realistic direction.',
    icon: Video,
  },
  {
    number: '04',
    title: 'Get your plan + follow-ups',
    description:
      'Your personalized diet plan is sent to you after the session, and follow-ups continue via Instagram DM or email so the plan can be adjusted as your results come in.',
    icon: FileText,
  },
]
