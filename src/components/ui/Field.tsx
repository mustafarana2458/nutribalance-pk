import type { ReactNode, SelectHTMLAttributes, InputHTMLAttributes } from 'react'
import { useId } from 'react'
import { CircleAlert } from 'lucide-react'
import { cn } from '@/lib/cn'

const control =
  'w-full rounded-2xl border bg-white px-4 py-3 text-ink-900 placeholder:text-ink-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-forest-600 focus:ring-offset-2 focus:ring-offset-cream-50'

type WrapperProps = {
  label: string
  error?: string
  hint?: string
  required?: boolean
  children: (props: { id: string; describedBy: string | undefined; invalid: boolean }) => ReactNode
}

function FieldWrapper({ label, error, hint, required, children }: WrapperProps) {
  const id = useId()
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-ink-700">
        {label}
        {required && (
          <span className="ml-1 text-apricot-700" aria-hidden>
            *
          </span>
        )}
        {!required && <span className="ml-2 text-xs font-normal text-ink-400">Optional</span>}
      </label>
      {hint && (
        <p id={hintId} className="text-xs text-ink-500">
          {hint}
        </p>
      )}
      {children({ id, describedBy, invalid: Boolean(error) })}
      {error && (
        <p id={errorId} role="alert" className="flex items-center gap-1.5 text-sm text-apricot-700">
          <CircleAlert className="h-4 w-4 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  )
}

type BaseProps = { label: string; error?: string; hint?: string }

export function Input({
  label,
  error,
  hint,
  className,
  ...props
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldWrapper label={label} error={error} hint={hint} required={props.required}>
      {({ id, describedBy, invalid }) => (
        <input
          id={id}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          className={cn(control, invalid ? 'border-apricot-600' : 'border-cream-200', className)}
          {...props}
        />
      )}
    </FieldWrapper>
  )
}

export function Select({
  label,
  error,
  hint,
  className,
  children,
  ...props
}: BaseProps & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <FieldWrapper label={label} error={error} hint={hint} required={props.required}>
      {({ id, describedBy, invalid }) => (
        <select
          id={id}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          className={cn(control, 'appearance-none pr-10', invalid ? 'border-apricot-600' : 'border-cream-200', className)}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235B564E' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.9rem center',
            backgroundSize: '1.1rem',
          }}
          {...props}
        >
          {children}
        </select>
      )}
    </FieldWrapper>
  )
}
