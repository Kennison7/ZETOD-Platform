export default function Logo({ showTagline = false, size = 'md' }) {
  const sizeClasses = {
    sm: { box: 'w-8 h-8 text-lg', text: 'text-lg', tagline: 'text-xs' },
    md: { box: 'w-9 h-9 text-xl', text: 'text-xl', tagline: 'text-xs' },
    lg: { box: 'w-10 h-10 text-2xl', text: 'text-2xl', tagline: 'text-sm' },
  }

  const s = sizeClasses[size]

  return (
    <div className="flex items-center gap-2.5">
      <div className={`${s.box} relative flex items-center justify-center rounded-lg border border-primary/30 bg-primary/10 font-heading font-bold text-primary`}>
        <span className="relative z-10">Z</span>
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 border-t border-r border-accent" />
      </div>
      <div>
        <span className={`${s.text} font-heading font-bold tracking-tight text-text`}>
          ZeToD
        </span>
        {showTagline && (
          <p className={`${s.tagline} text-muted leading-none mt-0.5`}>Zero To Deploy</p>
        )}
      </div>
    </div>
  )
}
