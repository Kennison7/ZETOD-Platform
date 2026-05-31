import { Terminal, Zap, Target, Award } from 'lucide-react'
import Card from '../ui/Card'

function SkillGauge() {
  const score = 78
  const circumference = 2 * Math.PI * 40
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative flex items-center justify-center">
      <svg width="100" height="100" className="-rotate-90">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="6"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#0052CC"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute text-center">
        <span className="font-heading text-2xl font-bold text-text">{score}</span>
        <p className="text-[10px] text-muted uppercase tracking-wider">Score</p>
      </div>
    </div>
  )
}

function TerminalBlock() {
  return (
    <div className="rounded-lg bg-black/40 border border-white/5 p-3 font-mono text-xs leading-relaxed">
      <div className="flex items-center gap-1.5 mb-2">
        <div className="w-2 h-2 rounded-full bg-red-500/70" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
        <div className="w-2 h-2 rounded-full bg-green-500/70" />
        <span className="text-muted ml-2">assessment.py</span>
      </div>
      <p>
        <span className="text-secondary">def</span>{' '}
        <span className="text-primary">solve</span>
        <span className="text-text">(data):</span>
      </p>
      <p className="pl-4">
        <span className="text-muted"># O(n) solution</span>
      </p>
      <p className="pl-4">
        <span className="text-secondary">return</span>{' '}
        <span className="text-accent">process</span>
        <span className="text-text">(data)</span>
      </p>
    </div>
  )
}

export default function HeroDashboard() {
  return (
    <div className="relative">
      <div className="absolute -top-20 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative space-y-4">
        <Card className="p-5 animate-float">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Terminal size={16} className="text-primary" />
              <span className="text-sm font-medium text-text">Python Assessment</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/20 text-secondary border border-secondary/30">
              Intermediate
            </span>
          </div>
          <div className="flex items-center gap-6">
            <SkillGauge />
            <div className="flex-1 space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted flex items-center gap-1">
                    <Zap size={12} /> Speed
                  </span>
                  <span className="text-text font-medium">1.2s avg</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10">
                  <div className="h-full w-[85%] rounded-full bg-accent" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted flex items-center gap-1">
                    <Target size={12} /> Precision
                  </span>
                  <span className="text-text font-medium">94%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10">
                  <div className="h-full w-[94%] rounded-full bg-secondary" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 animate-float-delay-1">
            <div className="flex items-center gap-2 mb-2">
              <Award size={14} className="text-accent" />
              <span className="text-xs text-muted">Level Badge</span>
            </div>
            <p className="font-heading font-semibold text-text">Engineer Tier</p>
            <p className="text-xs text-muted mt-1">Top 22% globally</p>
          </Card>

          <Card className="p-4 animate-float-delay-2">
            <TerminalBlock />
          </Card>
        </div>
      </div>
    </div>
  )
}
