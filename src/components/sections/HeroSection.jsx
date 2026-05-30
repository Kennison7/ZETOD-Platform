import Button from '../ui/Button'
import Container from '../ui/Container'
import BackendStatus from '../ui/BackendStatus'
import HeroDashboard from './HeroDashboard'
import { ASSESSMENT_URL } from '../../config/api'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh] lg:min-h-[85vh]">
          <div className="animate-fade-in-up">
            <p className="text-accent text-sm font-medium tracking-wider uppercase mb-4">
              Zero To Deploy
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text leading-[1.1] mb-6">
              Measure Your Real{' '}
              <span className="text-primary">Python Skill Level</span>
            </h1>
            <p className="text-muted text-base lg:text-lg leading-relaxed mb-8 max-w-lg">
              ZeToD évalue vos compétences Python réelles — précision, vitesse et
              résolution de problèmes — selon les standards de l&apos;ingénierie
              logicielle, pas les certificats.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href={ASSESSMENT_URL} size="lg">
                Commencer l&apos;évaluation
              </Button>
              <Button href="#features" variant="secondary" size="lg">
                En savoir plus
              </Button>
            </div>
            <BackendStatus />
          </div>

          <div className="lg:pl-4">
            <HeroDashboard />
          </div>
        </div>
      </Container>
    </section>
  )
}
