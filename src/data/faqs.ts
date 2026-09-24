export type Faq = {
  id: string
  question: string
  answer: string
  category: 'Online consultations' | 'Your plan' | 'Booking & payment' | 'Medical'
}

export const faqs: Faq[] = [
  {
    id: 'f0',
    question: 'How do I book, or get in touch?',
    answer:
      'Send an Instagram DM to @nutritionwith_ayesha — DMs are the quickest way to reach me — or an email if you prefer a longer message or need to attach reports. Include your goal, age, height and weight, any medical conditions or medication, and your preferred time for a video call. You will get a reply with available slots and the payment details, usually within one working day.',
    category: 'Booking & payment',
  },
  {
    id: 'f1',
    question: 'How do video consultations work?',
    answer:
      'Once your slot is confirmed you receive a meeting link for Zoom or Google Meet. Join from a phone, tablet or laptop — both work in a browser, so there is usually nothing to install. The session runs like an in-person consultation: we go through your health history, your current eating pattern and your goals, and agree on a direction before the call ends.',
    category: 'Online consultations',
  },
  {
    id: 'f2',
    question: 'What do I need before the call?',
    answer:
      'Three things: the goal and health details you sent when booking, any recent test reports you have (bloodwork, HbA1c, hormone panels, ultrasound reports), and a quiet spot with a stable internet connection. If you know your current weight and height, have those ready too. Nothing else is required — you do not need to prepare a food diary unless you would like to.',
    category: 'Online consultations',
  },
  {
    id: 'f3',
    question: 'How will I receive my diet plan?',
    answer:
      'Your personalized plan is emailed to you after the consultation, and a copy can be sent by Instagram DM if that is easier to keep on your phone. It is a written document you can save or print, covering meals, portions, timings and swap options. Any updates during your package are sent the same way.',
    category: 'Your plan',
  },
  {
    id: 'f4',
    question: 'Can I join from outside Pakistan?',
    answer:
      'Yes. The practice is fully online and international clients are welcome. Booking times are shown in PKT (GMT+5), so mention your city or timezone when you message and we will find a time that suits you both. Plans take local food availability into account, so tell me where you are based and what is easy for you to buy.',
    category: 'Online consultations',
  },
  {
    id: 'f5',
    question: 'What if I miss my slot?',
    answer:
      'Message as early as you can — an Instagram DM is quickest, email is fine too — and we will reschedule. If you let me know at least [X] hours in advance, rescheduling is free. Missed appointments without notice may count as a used session from your package, so a quick message always helps.',
    category: 'Booking & payment',
  },
  {
    id: 'f6',
    question: 'How do I pay?',
    answer:
      "Once you've booked, we'll send you payment details privately via Instagram DM or email. Your plan starts after payment is confirmed, and you will always get a confirmation.",
    category: 'Booking & payment',
  },
  {
    id: 'f7',
    question: 'Do you work with diabetic and PCOS clients who are on medication?',
    answer:
      'Yes — and in those cases the plan is built to work alongside your doctor’s advice, not around it. Your medication, dosage and treatment plan remain entirely your physician’s decision. What nutrition does is support that treatment: steadying blood sugar through the day, balancing meals around your medication timing, and making the whole thing sustainable. I will never advise you to stop or change a prescribed medicine.',
    category: 'Medical',
  },
  {
    id: 'f8',
    question: 'Do I have to give up rice, roti or my favourite foods?',
    answer:
      'No. Plans are built around the food you already eat — what usually changes is portion, pairing and timing rather than the food itself. Items are removed only where there is a genuine clinical reason, such as a diagnosed allergy or intolerance.',
    category: 'Your plan',
  },
  {
    id: 'f9',
    question: 'How soon will I see results?',
    answer:
      'Most people notice improvements in energy and digestion within the first few weeks. Changes in weight or test results usually take longer and depend on your starting point, your health history and how consistently the plan fits your routine. The aim is steady, sustainable progress rather than a quick drop that does not last.',
    category: 'Your plan',
  },
  {
    id: 'f10',
    question: 'Are the calculators on this site a substitute for a consultation?',
    answer:
      'No. The BMI and water intake calculators give general, population-level guidance only. They cannot account for muscle mass, pregnancy, medical conditions or medication. Treat them as a starting point for a conversation, not an assessment.',
    category: 'Medical',
  },
]
