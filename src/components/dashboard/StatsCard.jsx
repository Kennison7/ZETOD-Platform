import Card from '../ui/Card'

export default function StatsCard({ icon: Icon, label, value, subtext, accent = 'primary' }) {
  const accentStyles = {
    primary: 'text-primary bg-primary/10 border-primary/20',
    secondary: 'text-secondary bg-secondary/10 border-secondary/20',
    accent: 'text-accent bg-accent/10 border-accent/20',
  }

  return (
    <Card hover className="p-5 lg:p-6">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-lg border ${accentStyles[accent]}`}
        >
          <Icon size={18} />
        </div>
      </div>
      <p className="text-xs text-muted uppercase tracking-wider mb-1">{label}</p>
      <p className="font-heading text-2xl font-bold text-text">{value}</p>
      {subtext && <p className="text-xs text-muted mt-2">{subtext}</p>}
    </Card>
  )
}
