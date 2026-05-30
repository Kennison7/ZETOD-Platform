import { Target, Code2, Zap, Briefcase } from 'lucide-react'
import Container from '../ui/Container'
import Card from '../ui/Card'
import { STATS } from '../../data/content'
import { useInView } from '../../hooks/useInView'

const iconMap = { Target, Code2, Zap, Briefcase }

export default function StatsSection() {
  const [ref, isInView] = useInView()

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div
          ref={ref}
          className={`grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 transition-all duration-700 ${isInView ? 'in-view opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {STATS.map((stat) => {
            const Icon = iconMap[stat.icon]
            return (
              <Card key={stat.title} hover className="p-5 lg:p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-text text-sm lg:text-base mb-2">
                  {stat.title}
                </h3>
                <p className="text-muted text-xs lg:text-sm leading-relaxed">
                  {stat.description}
                </p>
              </Card>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
