import { FlaskConical, Gauge, BarChart3, Compass } from 'lucide-react'
import Container from '../ui/Container'
import Card from '../ui/Card'
import SectionTitle from '../ui/SectionTitle'
import { FEATURES } from '../../data/content'
import { useInView } from '../../hooks/useInView'

const iconMap = { FlaskConical, Gauge, BarChart3, Compass }

export default function FeaturesSection() {
  const [ref, isInView] = useInView()

  return (
    <section id="features" className="py-20 lg:py-28">
      <Container>
        <SectionTitle
          eyebrow="Features"
          title="Built for Real Developers"
          subtitle="No certificates. No fluff. Just honest evaluation of what you can actually build."
        />

        <div
          ref={ref}
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 ${isInView ? 'in-view opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {FEATURES.map((feature) => {
            const Icon = iconMap[feature.icon]
            return (
              <Card key={feature.title} hover className="p-6 group">
                <div className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-300">
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-text text-lg mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
