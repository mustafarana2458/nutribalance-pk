import { useMemo, useState } from 'react'
import { Scale } from 'lucide-react'
import { bmiCategories, calculateBmi, categoriseBmi, healthyWeightRange } from '@/lib/calculators'
import { Input } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

type Units = 'metric' | 'imperial'

const toneStyles = {
  low: 'bg-apricot-100 text-apricot-700 border-apricot-200',
  healthy: 'bg-sage-200 text-forest-700 border-forest-200',
  raised: 'bg-apricot-100 text-apricot-700 border-apricot-200',
  high: 'bg-apricot-200 text-apricot-700 border-apricot-300',
}

/** Where the marker sits on the 15–40 BMI scale, clamped to the track. */
const markerPosition = (bmi: number) => Math.min(100, Math.max(0, ((bmi - 15) / 25) * 100))

export function BmiCalculator() {
  const [units, setUnits] = useState<Units>('metric')
  const [heightCm, setHeightCm] = useState('')
  const [feet, setFeet] = useState('')
  const [inches, setInches] = useState('')
  const [weight, setWeight] = useState('')
  const [error, setError] = useState<string | undefined>()
  const [submitted, setSubmitted] = useState(false)

  const height = useMemo(() => {
    if (units === 'metric') return Number(heightCm)
    const totalInches = Number(feet) * 12 + Number(inches || 0)
    return totalInches * 2.54
  }, [units, heightCm, feet, inches])

  const weightKg = units === 'metric' ? Number(weight) : Number(weight) * 0.453592

  const bmi = submitted ? calculateBmi(weightKg, height) : null
  const category = bmi ? categoriseBmi(bmi) : null
  const range = bmi ? healthyWeightRange(height) : null

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!height || height < 100 || height > 250) {
      setError('Enter a height between 100 cm and 250 cm (3′10″ to 8′2″).')
      setSubmitted(false)
      return
    }
    if (!weightKg || weightKg < 25 || weightKg > 300) {
      setError('Enter a weight between 25 kg and 300 kg (55 lb to 660 lb).')
      setSubmitted(false)
      return
    }
    setError(undefined)
    setSubmitted(true)
  }

  const reset = () => {
    setHeightCm('')
    setFeet('')
    setInches('')
    setWeight('')
    setError(undefined)
    setSubmitted(false)
  }

  return (
    <section
      aria-labelledby="bmi-heading"
      className="rounded-[2rem] border border-cream-200 bg-white p-7 shadow-soft sm:p-9"
    >
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sage-200 text-forest-600">
          <Scale className="h-6 w-6" aria-hidden />
        </span>
        <div>
          <h2 id="bmi-heading" className="font-display text-2xl font-semibold text-forest-700">
            BMI calculator
          </h2>
          <p className="mt-1.5 text-base text-ink-600 sm:text-sm">
            A population-level screening number — useful as a starting point, not a diagnosis.
          </p>
        </div>
      </div>

      <div
        role="radiogroup"
        aria-label="Measurement units"
        className="mt-7 inline-flex rounded-full border border-cream-200 bg-cream-50 p-1"
      >
        {(
          [
            { id: 'metric', label: 'cm / kg' },
            { id: 'imperial', label: 'ft / lb' },
          ] as const
        ).map((option) => (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={units === option.id}
            onClick={() => {
              setUnits(option.id)
              setSubmitted(false)
            }}
            className={cn(
              'min-h-11 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ease-soft focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2',
              units === option.id ? 'bg-forest-600 text-white' : 'text-ink-600 hover:text-forest-700',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-5">
        {units === 'metric' ? (
          <Input
            label="Height"
            type="number"
            inputMode="decimal"
            min={100}
            max={250}
            step="0.1"
            required
            placeholder="165"
            hint="In centimetres"
            value={heightCm}
            onChange={(event) => setHeightCm(event.target.value)}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Height (feet)"
              type="number"
              inputMode="numeric"
              min={3}
              max={8}
              required
              placeholder="5"
              value={feet}
              onChange={(event) => setFeet(event.target.value)}
            />
            <Input
              label="Height (inches)"
              type="number"
              inputMode="numeric"
              min={0}
              max={11}
              placeholder="5"
              value={inches}
              onChange={(event) => setInches(event.target.value)}
            />
          </div>
        )}

        <Input
          label="Weight"
          type="number"
          inputMode="decimal"
          step="0.1"
          required
          placeholder={units === 'metric' ? '68' : '150'}
          hint={units === 'metric' ? 'In kilograms' : 'In pounds'}
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
          error={error}
        />

        <div className="flex flex-wrap gap-3 pt-1">
          <Button type="submit" size="lg">
            Calculate BMI
          </Button>
          {submitted && (
            <Button type="button" variant="ghost" size="lg" onClick={reset}>
              Reset
            </Button>
          )}
        </div>
      </form>

      <div aria-live="polite">
        {bmi && category && range && (
          <div className="mt-8 rounded-3xl border border-cream-200 bg-cream-50 p-6 sm:p-7">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
                  Your BMI
                </p>
                <p className="mt-1 font-display text-5xl font-semibold text-forest-700">{bmi}</p>
              </div>
              <span
                className={cn(
                  'rounded-full border px-4 py-1.5 text-sm font-semibold',
                  toneStyles[category.tone],
                )}
              >
                {category.label}
              </span>
            </div>

            {/* Scale, 15 to 40 */}
            <div className="mt-7">
              <div className="relative h-3 rounded-full bg-gradient-to-r from-apricot-300 via-forest-400 to-apricot-500">
                <span
                  aria-hidden
                  className="absolute -top-1.5 h-6 w-6 -translate-x-1/2 rounded-full border-4 border-white bg-forest-700 shadow-soft transition-all duration-500 ease-soft"
                  style={{ left: `${markerPosition(bmi)}%` }}
                />
              </div>
              <div className="mt-2.5 flex justify-between text-[0.7rem] text-ink-500">
                <span>15</span>
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
                <span>40</span>
              </div>
            </div>

            <p className="mt-6 text-pretty text-base leading-relaxed sm:text-sm text-ink-700">
              {category.advice}
            </p>

            <p className="mt-5 rounded-2xl bg-white px-5 py-4 text-base text-ink-600 sm:text-sm">
              A BMI of 18.5–24.9 for your height corresponds to roughly{' '}
              <strong className="text-forest-700">
                {range.min}–{range.max} kg
              </strong>
              . Body composition, waist measurement and bloodwork say far more than this number alone.
            </p>
          </div>
        )}
      </div>

      <details className="group mt-7">
        <summary className="cursor-pointer list-none text-sm font-medium text-forest-700 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-forest-600 focus-visible:ring-offset-2">
          What the BMI categories mean
        </summary>
        <ul className="mt-4 space-y-2">
          {bmiCategories.map((item) => (
            <li
              key={item.label}
              className="flex items-center justify-between gap-4 rounded-2xl bg-cream-50 px-5 py-3 text-sm"
            >
              <span className="font-medium text-ink-700">{item.label}</span>
              <span className="text-ink-500">{item.range}</span>
            </li>
          ))}
        </ul>
      </details>
    </section>
  )
}
