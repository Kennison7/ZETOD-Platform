import { Link } from 'react-router-dom'

const variants = {
  primary:
    'bg-accent text-background font-semibold shadow-[0_0_20px_rgba(255,139,0,0.3)] hover:shadow-[0_0_30px_rgba(255,139,0,0.5)] hover:scale-[1.02]',
  secondary:
    'border border-white/20 bg-white/5 text-text hover:border-primary/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(0,82,204,0.15)]',
  ghost: 'text-muted hover:text-text bg-transparent hover:bg-white/5',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
}

function isInternalRoute(href) {
  return href.startsWith('/') && !href.startsWith('//')
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  onClick,
  className = '',
  type = 'button',
  target,
  rel,
  disabled = false,
}) {
  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none hover:scale-100 hover:shadow-none'
    : ''

  const classes = `inline-flex items-center justify-center rounded-lg transition-all duration-300 cursor-pointer ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`

  const route = to || href

  if (route && isInternalRoute(route)) {
    return (
      <Link to={route} className={classes} onClick={onClick}>
        {children}
      </Link>
    )
  }

  if (href) {
    const isExternal = href.startsWith('http')
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        target={target ?? (isExternal ? '_blank' : undefined)}
        rel={rel ?? (isExternal ? 'noopener noreferrer' : undefined)}
      >
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
