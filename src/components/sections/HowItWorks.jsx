import Container from '../ui/Container'
import SectionTitle from '../ui/SectionTitle'
import { STEPS } from '../../data/content'
import { useInView } from '../../hooks/useInView'

export default function HowItWorks() {
  const [ref, isInView] = useInView()

  return (
    <section className="py-20 lg:py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />

      <Container className="relative">
        <SectionTitle
          eyebrow="Process"
          title="How It Works"
          subtitle="Three steps to an honest picture of your Python engineering ability."
        />

        <div
          ref={ref}
          className={`transition-all duration-700 ${isInView ? 'in-view opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
            <div className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0" />

            {STEPS.map((step) => (
              <div key={step.number} className="relative text-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-primary/40 bg-primary/10 mb-6 shadow-[0_0_20px_rgba(0,82,204,0.15)]">
                  <span className="font-heading text-xl font-bold text-primary">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-text text-lg mb-3">
                  {step.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
