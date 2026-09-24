export type BmiCategory = {
  label: string
  range: string
  tone: 'low' | 'healthy' | 'raised' | 'high'
  advice: string
}

export const bmiCategories: BmiCategory[] = [
  {
    label: 'Underweight',
    range: 'Below 18.5',
    tone: 'low',
    advice:
      'A BMI in this range can mean inadequate energy intake or an underlying medical issue. A consultation can rule out deficiencies and build a healthy gaining plan.',
  },
  {
    label: 'Healthy range',
    range: '18.5 – 24.9',
    tone: 'healthy',
    advice:
      'You are in the general healthy range. Focus stays on body composition, protein adequacy and metabolic markers rather than the scale.',
  },
  {
    label: 'Overweight',
    range: '25.0 – 29.9',
    tone: 'raised',
    advice:
      'A modest 5–10% reduction in body weight already improves blood pressure, lipids and insulin sensitivity meaningfully. Small, sustained changes do most of the work.',
  },
  {
    label: 'Obese',
    range: '30.0 and above',
    tone: 'high',
    advice:
      'This range carries a higher risk of type 2 diabetes, hypertension and joint strain. A structured, medically-aware plan with regular review is the sensible route.',
  },
]

export const calculateBmi = (weightKg: number, heightCm: number) => {
  const heightM = heightCm / 100
  if (!heightM || !weightKg) return null
  const value = weightKg / (heightM * heightM)
  return Math.round(value * 10) / 10
}

export const categoriseBmi = (bmi: number): BmiCategory => {
  if (bmi < 18.5) return bmiCategories[0]
  if (bmi < 25) return bmiCategories[1]
  if (bmi < 30) return bmiCategories[2]
  return bmiCategories[3]
}

/** Healthy weight window for a given height, using the 18.5–24.9 BMI band. */
export const healthyWeightRange = (heightCm: number) => {
  const heightM = heightCm / 100
  return {
    min: Math.round(18.5 * heightM * heightM),
    max: Math.round(24.9 * heightM * heightM),
  }
}

export type ActivityLevel = {
  id: string
  label: string
  description: string
  /** Extra millilitres of water per kg of body weight. */
  bonusMlPerKg: number
}

export const activityLevels: ActivityLevel[] = [
  { id: 'sedentary', label: 'Mostly sitting', description: 'Desk work, little planned exercise', bonusMlPerKg: 0 },
  { id: 'light', label: 'Lightly active', description: 'Walks, 1–2 workouts a week', bonusMlPerKg: 3 },
  { id: 'moderate', label: 'Moderately active', description: '3–4 workouts a week', bonusMlPerKg: 6 },
  { id: 'high', label: 'Very active', description: '5+ sessions, or a physical job', bonusMlPerKg: 10 },
]

export type ClimateLevel = { id: string; label: string; bonusMl: number }

export const climateLevels: ClimateLevel[] = [
  { id: 'mild', label: 'Mild / air-conditioned', bonusMl: 0 },
  { id: 'warm', label: 'Warm (25–35°C)', bonusMl: 350 },
  { id: 'hot', label: 'Hot (35°C+)', bonusMl: 700 },
]

/**
 * Baseline 33 ml per kg of body weight, adjusted for activity and climate.
 * General guidance for healthy adults — not for fluid-restricted conditions.
 */
export const calculateWaterIntake = (
  weightKg: number,
  activity: ActivityLevel,
  climate: ClimateLevel,
) => {
  if (!weightKg) return null
  const totalMl = weightKg * (33 + activity.bonusMlPerKg) + climate.bonusMl
  const litres = Math.round((totalMl / 1000) * 10) / 10
  return {
    litres,
    glasses: Math.round(totalMl / 250),
    ml: Math.round(totalMl),
  }
}

export const toolsDisclaimer =
  'These calculators give general guidance for healthy adults. They are not a medical assessment and do not account for pregnancy, muscle mass, kidney or heart conditions, medication or age extremes. Always speak to a qualified professional before making changes.'
