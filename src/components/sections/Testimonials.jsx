import { Quote } from 'lucide-react'
import Container from '../ui/Container'
import Card from '../ui/Card'
import SectionTitle from '../ui/SectionTitle'
import { TESTIMONIALS } from '../../data/content'
import { useInView } from '../../hooks/useInView'

export default function Testimonials() {
  const [ref, isInView] = useInView()

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionTitle
          eyebrow="Testimonials"
          title="Trusted by Developers"
          subtitle="Real feedback from engineers who wanted an honest measure of their skills."
        />

        <div
          ref={ref}
          className={`grid md:grid-cols-3 gap-6 transition-all duration-700 ${isInView ? 'in-view opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {TESTIMONIALS.map((testimonial) => (
            <Card key={testimonial.name} hover className="p-6 flex flex-col">
              <Quote size={20} className="text-primary/40 mb-4" />
              <p className="text-text/90 text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div
                  className={`w-10 h-10 rounded-full ${testimonial.color} flex items-center justify-center text-sm font-semibold text-white`}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-medium text-text text-sm">{testimonial.name}</p>
                  <p className="text-muted text-xs">
                    {testimonial.role} &middot; {testimonial.location}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
