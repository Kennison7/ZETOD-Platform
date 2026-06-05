import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function AuthInput({
  id,
  label,
  error,
  disabled,
  className = '',
  type = 'text',
  ...props
}) {
  const [visible, setVisible] = useState(false)
  const hasError = Boolean(error)
  const isPassword = type === 'password'
  const inputType = isPassword && visible ? 'text' : type

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-text mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          className={`w-full rounded-lg border bg-white/5 px-4 py-2.5 text-text text-sm placeholder:text-muted/60 transition-all duration-200 focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 ${
            isPassword ? 'pr-11' : ''
          } ${
            hasError
              ? 'border-accent/50 focus:border-accent focus:ring-accent/30'
              : 'border-white/10 focus:border-primary/50 focus:ring-primary/30'
          } ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((prev) => !prev)}
            disabled={disabled}
            aria-label={visible ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {hasError && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-accent">
          {error}
        </p>
      )}
    </div>
  )
}
