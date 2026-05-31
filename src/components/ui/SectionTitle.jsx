export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
}) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-2xl mb-12 lg:mb-16 ${alignClass} ${className}`}>
      {eyebrow && (
        <p className="text-accent text-sm font-medium tracking-wider uppercase mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted text-base lg:text-lg leading-relaxed">{subtitle}</p>
      )}
    </div>
  )
}
