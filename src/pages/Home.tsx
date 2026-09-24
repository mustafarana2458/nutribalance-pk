import { site } from '@/data/site'
import { useSeo } from '@/hooks/useSeo'
import { Hero } from '@/components/sections/Hero'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { SpecializedCare } from '@/components/sections/SpecializedCare'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Results } from '@/components/sections/Results'
import { Testimonials } from '@/components/sections/Testimonials'
import { WhyChoose } from '@/components/sections/WhyChoose'
import { Pricing } from '@/components/sections/Pricing'
import { CtaBanner } from '@/components/sections/CtaBanner'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NutritionistBusiness',
  name: site.name,
  description:
    'Online nutritionist in Pakistan offering personalized diet plans, PCOS diet plans, diabetic diet consultation and sports nutrition by video consultation.',
  url: site.url,
  sameAs: [site.socials.instagram],
  areaServed: 'Worldwide',
  availableLanguage: ['English', 'Urdu'],
  founder: {
    '@type': 'Person',
    name: site.nutritionist.name,
    jobTitle: site.nutritionist.credentials,
  },
}

export default function Home() {
  useSeo({
    title: `${site.name} — Online Nutritionist in Pakistan | Personalized Diet Plans`,
    description:
      'Online nutritionist in Pakistan. Personalized diet plans for weight loss and weight gain, PCOS diet plans, diabetic diet consultation and sports nutrition — by video consultation, worldwide.',
    path: '/',
    jsonLd,
  })

  return (
    <>
      <Hero />
      <ServicesGrid />
      <SpecializedCare />
      <HowItWorks />
      {/* Results and Testimonials render nothing until their show flags are on. */}
      <Results />
      <WhyChoose />
      <Testimonials />
      <Pricing
        eyebrow="Plans"
        title="Monthly follow-up packages"
        description="Ongoing support with regular video calls, plan updates and chat support between sessions. Full comparison on the plans page."
        showFinePrint={false}
      />
      <CtaBanner />
    </>
  )
}
