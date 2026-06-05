import { Link } from 'react-router-dom'
import { ArrowLeft, Code2, Sparkles } from 'lucide-react'
import Logo from '../ui/Logo'
import Card from '../ui/Card'

export default function AuthCard({
  headline,
  subtitle,
  children,
  footer,
  accent = 'primary',
}) {
  const glowClass =
    accent === 'secondary'
      ? 'bg-secondary/5'
      : accent === 'accent'
        ? 'bg-accent/5'
        : 'bg-primary/5'

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className={`absolute top-1/4 left-1/4 w-[32rem] h-[32rem] ${glowClass} rounded-full blur-3xl pointer-events-none`} />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative min-h-screen flex flex-col lg:flex-row">
        {/* Branding panel */}
        <div className="lg:w-1/2 flex flex-col justify-between p-6 lg:p-12 xl:p-16 border-b lg:border-b-0 lg:border-r border-white/5">
          <div>
            <div className="flex items-center justify-between mb-12 lg:mb-0">
              <Link to="/" className="shrink-0">
                <Logo />
              </Link>
              <Link
                to="/"
                className="lg:hidden inline-flex items-center gap-2 text-sm text-muted hover:text-text transition-colors"
              >
                <ArrowLeft size={16} />
                Home
              </Link>
            </div>

            <div className="hidden lg:block max-w-md mt-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-muted mb-6">
                <Sparkles size={12} className="text-accent" />
                Zero To Deploy
              </div>
              <h2 className="font-heading text-4xl xl:text-5xl font-bold text-text leading-tight mb-4">
                Real skills.
                <br />
                <span className="text-primary">Real benchmarks.</span>
              </h2>
              <p className="text-muted leading-relaxed">
                ZeToD evaluates your Python ability through practical assessments — not
                certificates. Built for developers who want to prove what they can actually
                build.
              </p>

              <div className="mt-10 flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 bg-white/5">
                  <Code2 size={18} className="text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text">Production-grade assessments</p>
                  <p className="text-xs text-muted">Algorithm, data structures & real-world tasks</p>
                </div>
              </div>
            </div>
          </div>

          <Link
            to="/"
            className="hidden lg:inline-flex items-center gap-2 text-sm text-muted hover:text-text transition-colors mt-8"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </div>

        {/* Form panel */}
        <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12 xl:p-16">
          <div className="w-full max-w-md animate-fade-in-up">
            <div className="mb-8">
              <h1 className="font-heading text-3xl font-bold text-text mb-2">{headline}</h1>
              <p className="text-muted text-sm leading-relaxed">{subtitle}</p>
            </div>

            <Card className="p-6 lg:p-8 shadow-[0_0_40px_rgba(0,82,204,0.08)] border-white/10">
              {children}
            </Card>

            {footer && <div className="mt-6">{footer}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
