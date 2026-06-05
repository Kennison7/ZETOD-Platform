import { ArrowRight } from 'lucide-react'
import Card from '../ui/Card'

export default function ActivityCard({
  title,
  description,
  status,
  statusVariant = 'default',
  actionLabel = 'Coming soon',
}) {
  const statusStyles = {
    default: 'bg-white/5 text-muted border-white/10',
    active: 'bg-secondary/10 text-secondary border-secondary/30',
    pending: 'bg-accent/10 text-accent border-accent/30',
  }

  return (
    <Card hover className="p-5 lg:p-6 flex flex-col h-full">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-heading font-semibold text-text">{title}</h3>
        <span
          className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider border ${statusStyles[statusVariant]}`}
        >
          {status}
        </span>
      </div>
      <p className="text-sm text-muted leading-relaxed flex-1">{description}</p>
      <button
        type="button"
        disabled
        className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted/60 cursor-not-allowed"
      >
        {actionLabel}
        <ArrowRight size={12} />
      </button>
    </Card>
  )
}
