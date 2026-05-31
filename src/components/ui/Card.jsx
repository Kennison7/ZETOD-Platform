export default function Card({ children, hover = false, className = '' }) {
  const hoverClasses = hover
    ? 'transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(0,82,204,0.15)] hover:-translate-y-0.5'
    : ''

  return (
    <div
      className={`rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  )
}
