import { useState } from 'react'
import { Droplet } from 'lucide-react'
import { activityLevels, calculateWaterIntake, climateLevels } from '@/lib/calculators'
import { Input, Select } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

export function WaterCalculator() {
  const [weight, setWeight] = useState('')
  const [activityId, setActivityId] = useState(activityLevels[1].id)
  const [climateId, setClimateId] = useState(climateLevels[1].id)
  const [error, setError] = useState<string | undefined>()
  const [submitted, setSubmitted] = useState(false)

  const activity = activityLevels.find((level) => level.id === activityId) ?? activityLevels[0]
  const climate = climateLevels.find((level) => level.id === climateId) ?? climateLevels[0]
  const weightKg = Number(weight)
  const result = submitted ? calculateWaterIntake(weightKg, activity, climate) : null

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!weightKg || weightKg < 25 || weightKg > 300) {
      setError('Enter a weight between 25 kg and 300 kg.')
      setSubmitted(false)
      return
    }
    setError(undefined)
    setSubmitted(true)
  }

  return (
    <section
      aria-labelledby="water-heading"
      className="rounded-[2rem] border border-cream-200 bg-white p-7 shadow-soft sm:p-9"
    >
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sage-200 text-forest-600">
          <Droplet className="h-6 w-6" aria-hidden />
        </span>
        <div>
          <h2 id="water-heading" className="font-display text-2xl font-semibold text-forest-700">
            Daily water intake
          </h2>
          <p className="mt-1.5 text-base text-ink-600 sm:text-sm">
            Based on 33 ml per kg of body weight, adjusted for how much you move and how hot it is.
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} noValidate className="mt-7 space-y-5">
        <Input
          label="Your weight"
          type="number"
          inputMode="decimal"
          step="0.1"
          min={25}
          max={300}
          required
          placeholder="68"
          hint="In kilograms"
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
          error={error}
        />

        <Select
          label="Activity level"
          required
          value={activityId}
          onChange={(event) => {
            setActivityId(event.target.value)
            setSubmitted(false)
          }}
        >
          {activityLevels.map((level) => (
            <option key={level.id} value={level.id}>
              {level.label} — {level.description}
            </option>
          ))}
        </Select>

        <Select
          label="Climate"
          required
          value={climateId}
          onChange={(event) => {
            setClimateId(event.target.value)
            setSubmitted(false)
          }}
        >
          {climateLevels.map((level) => (
            <option key={level.id} value={level.id}>
              {level.label}
            </option>
          ))}
        </Select>

        <div className="pt-1">
          <Button type="submit" size="lg">
            Calculate intake
          </Button>
        </div>
      </form>

      <div aria-live="polite">
        {result && (
          <div className="mt-8 rounded-3xl border border-cream-200 bg-cream-50 p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
              Suggested daily intake
            </p>
            <p className="mt-1 font-display text-5xl font-semibold text-forest-700">
              {result.litres}
              <span className="ml-1.5 text-2xl font-medium text-ink-500">litres</span>
            </p>
            <p className="mt-2 text-sm text-ink-600">
              About {result.glasses} glasses of 250 ml ({result.ml.toLocaleString()} ml) across the day.
            </p>

            {/* Glass fill visualisation */}
            <ul className="mt-6 flex flex-wrap gap-1.5" aria-hidden>
              {Array.from({ length: Math.min(result.glasses, 16) }).map((_, index) => (
                <li
                  key={index}
                  className={cn(
                    'h-9 w-6 rounded-b-lg rounded-t-sm border-2 border-forest-300',
                    'bg-gradient-to-t from-forest-400/70 to-sage-200',
                  )}
                />
              ))}
              {result.glasses > 16 && (
                <li className="self-end text-xs text-ink-500">+{result.glasses - 16} more</li>
              )}
            </ul>

            <ul className="mt-6 space-y-2 text-sm text-ink-600">
              <li>· Tea, coffee, milk, lassi and soups all count toward the total.</li>
              <li>· Add 500–750 ml for every hour of hard training or outdoor work.</li>
              <li>· Pale straw-coloured urine is a better day-to-day signal than any formula.</li>
            </ul>

            <p className="mt-5 rounded-2xl bg-apricot-50 px-5 py-4 text-base leading-relaxed sm:text-sm text-ink-700">
              <strong className="text-apricot-700">Important:</strong> if you have kidney disease,
              heart failure, or have been told to restrict fluids, follow your doctor&rsquo;s limit —
              not this calculator.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
