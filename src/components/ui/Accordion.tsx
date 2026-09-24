import { useId, useState } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/cn'

export type AccordionItem = {
  id: string
  question: string
  answer: string
}

type AccordionProps = {
  items: AccordionItem[]
  /** id of the item open on first render */
  defaultOpenId?: string
  className?: string
}

export function Accordion({ items, defaultOpenId, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null)
  const baseId = useId()

  return (
    <div className={cn('divide-y divide-cream-200 overflow-hidden rounded-3xl border border-cream-200 bg-white', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id
        const panelId = `${baseId}-${item.id}-panel`
        const buttonId = `${baseId}-${item.id}-button`

        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-start justify-between gap-5 px-5 py-5 text-left transition-colors duration-200 hover:bg-sage-50 sm:px-7 sm:py-6"
              >
                <span className="font-display text-lg font-semibold text-forest-700">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    'mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-forest-200 text-forest-600 transition-all duration-300 ease-soft',
                    isOpen && 'rotate-45 border-forest-600 bg-forest-600 text-white',
                  )}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>

            {/* Opens with a short opacity/transform fade (no height animation, so no
                per-frame layout). Reduced motion is handled by the global CSS rule. */}
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="animate-fade-in"
              >
                <p className="px-5 pb-6 text-pretty leading-relaxed text-ink-600 sm:px-7 sm:pb-7 sm:pr-16">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
