import { Check, Clock, CreditCard, Globe, Mail } from 'lucide-react'
import { instagramDmLink, paymentNote, showBookingEmbed, site } from '@/data/site'
import { useSeo } from '@/hooks/useSeo'
import { PageHeader } from '@/components/sections/PageHeader'
import { BookingCalendar } from '@/components/sections/BookingCalendar'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { EmailLink } from '@/components/ui/EmailLink'
import { useProtectedMailto } from '@/hooks/useProtectedMailto'
import { InstagramIcon } from '@/components/ui/BrandIcons'

/** What a first message should include, so the reply can go straight to slots and pricing. */
const whatToSend = [
  'Your goal — weight loss, weight gain, PCOS, diabetes, sports performance or something else',
  'Your age',
  'Your height and weight',
  'Any medical conditions or medication',
  'Your preferred time for a video call',
]

function ContactButtons({ className }: { className?: string }) {
  const mailto = useProtectedMailto()
  return (
    <div className={className}>
      <Button
        href={instagramDmLink()}
        target="_blank"
        rel="noopener noreferrer"
        variant="primary"
        size="lg"
      >
        <InstagramIcon className="h-4.5 w-4.5" />
        Message on Instagram
      </Button>
      <Button {...mailto} variant="outline" size="lg">
        <Mail className="h-4.5 w-4.5" aria-hidden />
        Email us
      </Button>
    </div>
  )
}

export default function Book() {
  useSeo({
    title: 'Get Started — Online Consultation',
    description: `Start your online nutrition consultation with ${site.nutritionist.firstName}. Send an Instagram DM or email with your goal and health details, then join by ${site.service.platforms}. Clients across Pakistan and worldwide.`,
    path: '/book',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: `Get started with ${site.name}`,
      url: `${site.url}/book`,
    },
  })

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Get started' }]}
        eyebrow="Get started"
        title="Start with one message"
        description="Send a DM on Instagram or an email with a few details about you. You will get a reply with available times and payment details — usually within one working day."
      >
        <ContactButtons className="flex flex-wrap gap-3" />
      </PageHeader>

      {showBookingEmbed && (
        <Section tone="white">
          <Reveal>
            <BookingCalendar />
          </Reveal>
        </Section>
      )}

      <Section tone="cream">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10">
          <Reveal>
            <div className="h-full rounded-[2rem] border border-cream-200 bg-white p-7 shadow-soft sm:p-9">
              <h2 className="font-display text-2xl font-semibold text-forest-700">
                What to send us
              </h2>
              <p className="mt-2 text-base leading-relaxed sm:text-sm text-ink-600">
                Include these in your first message so we can skip the back-and-forth.
              </p>
              <ul className="mt-6 space-y-3.5">
                {whatToSend.map((item) => (
                  <li key={item} className="flex gap-3 text-ink-700">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sage-200 text-forest-700">
                      <Check className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-base leading-relaxed sm:text-sm text-ink-600">
                Recent test reports (bloodwork, HbA1c, hormone panels) are welcome too — email is
                easiest for attachments.
              </p>
              <ContactButtons className="mt-7 flex flex-col gap-3 sm:flex-row" />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="h-full rounded-[2rem] bg-forest-700 p-7 text-sage-200 sm:p-9">
              <h2 className="font-display text-xl font-semibold text-white">Contact details</h2>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <InstagramIcon className="h-4 w-4 shrink-0 text-apricot-400" />
                  <a
                    href={instagramDmLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-flex min-h-11 items-center hover:text-white"
                  >
                    {site.socials.instagramHandle}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-apricot-400" aria-hidden />
                  <EmailLink className="link-underline inline-flex min-h-11 items-center break-all hover:text-white">
                    {site.contact.email}
                  </EmailLink>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-apricot-400" aria-hidden />
                  <span>{site.contact.hours}</span>
                </li>
                <li className="flex gap-3">
                  <Globe className="mt-0.5 h-4 w-4 shrink-0 text-apricot-400" aria-hidden />
                  <span>{site.service.reach}</span>
                </li>
              </ul>
              <p className="mt-7 rounded-2xl bg-forest-800/60 px-5 py-4 text-sm leading-relaxed text-sage-200/90 sm:text-xs">
                <strong className="font-semibold text-white">Timezone: </strong>
                all appointment times are in {site.service.timezone}. If you are abroad, mention
                your city or timezone and we will find a time that works for both of us.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div
            id="payment"
            className="mt-8 flex items-start gap-4 rounded-3xl border border-cream-200 bg-sage-100 p-6 sm:p-7"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white text-forest-600">
              <CreditCard className="h-5 w-5" aria-hidden />
            </span>
            <p className="text-base leading-relaxed sm:text-sm text-ink-700">
              <strong className="font-semibold text-forest-700">How payment works: </strong>
              {paymentNote}
            </p>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
