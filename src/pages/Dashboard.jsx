import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Activity,
  Award,
  BarChart3,
  Code2,
  Rocket,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'
import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import BackendStatus from '../components/dashboard/BackendStatus'
import StatsCard from '../components/dashboard/StatsCard'
import ActivityCard from '../components/dashboard/ActivityCard'
import { logout } from '../utils/auth'
import { supabase } from '../lib/supabase'

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useState(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user)
    })
  }, [])
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = () => {
    setLoggingOut(true)
    logout(navigate)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <DashboardHeader onLogout={handleLogout} loading={loggingOut} />

      <main className="relative">
        <Container className="py-8 lg:py-12">
          {/* Welcome */}
          <section className="mb-10 lg:mb-12">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <p className="text-sm text-muted mb-2 flex items-center gap-2">
                  <Rocket size={14} className="text-accent" />
                  Developer Dashboard
                </p>
                <h1 className="font-heading text-3xl lg:text-4xl font-bold text-text">
                  Welcome back, {user?.user_metadata?.full_name?.split(" ")[0] || "Developer"}
                </h1>
                <p className="text-muted mt-2 max-w-xl">
                  Track your Python skill benchmark, upcoming assessments, and performance
                  insights — all in one place.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/30 bg-primary/10 text-sm text-primary">
                <Zap size={16} />
                Ready for assessment
              </div>
            </div>
          </section>

          {/* Backend health */}
          <section className="mb-6 lg:mb-8">
            <BackendStatus />
          </section>

          {/* User status */}
          <section className="mb-10 lg:mb-12">
            <Card className="p-6 lg:p-8 border-primary/20 shadow-[0_0_30px_rgba(0,82,204,0.1)]">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-xl border border-white/10 bg-white/5 shrink-0">
                  <Code2 size={28} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h2 className="font-heading text-xl font-semibold text-text">
                      Account Status
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/20 text-secondary border border-secondary/30">
                      Verified
                    </span>
                  </div>
                  <p className="text-sm text-muted">
                    Your profile is active. Complete your first Python assessment to unlock
                    your skill score and global ranking.
                  </p>
                </div>
                <div className="flex gap-6 md:gap-8">
                  <div className="text-center">
                    <p className="font-heading text-2xl font-bold text-text">—</p>
                    <p className="text-xs text-muted mt-1">Skill Score</p>
                  </div>
                  <div className="text-center">
                    <p className="font-heading text-2xl font-bold text-text">0</p>
                    <p className="text-xs text-muted mt-1">Assessments</p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Performance stats */}
          <section className="mb-10 lg:mb-12">
            <h2 className="font-heading text-lg font-semibold text-text mb-4 flex items-center gap-2">
              <BarChart3 size={18} className="text-primary" />
              Performance Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                icon={Target}
                label="Accuracy"
                value="—"
                subtext="Complete an assessment to unlock"
                accent="primary"
              />
              <StatsCard
                icon={TrendingUp}
                label="Global Rank"
                value="—"
                subtext="Benchmark against developers worldwide"
                accent="secondary"
              />
              <StatsCard
                icon={Zap}
                label="Avg. Speed"
                value="—"
                subtext="Solution execution time"
                accent="accent"
              />
              <StatsCard
                icon={Award}
                label="Tier Badge"
                value="Unranked"
                subtext="Earn your first badge"
                accent="primary"
              />
            </div>
          </section>

          {/* Assessment placeholders */}
          <section className="mb-10 lg:mb-12">
            <h2 className="font-heading text-lg font-semibold text-text mb-4 flex items-center gap-2">
              <Activity size={18} className="text-secondary" />
              Available Assessments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ActivityCard
                title="Python Fundamentals"
                onClick={() => navigate("/assessment")}
                actionLabel="Start Assessment"
                statusVariant="active"
                status="Live"
                description="Core syntax, data types, control flow, and functions — the foundation every developer needs."
                status="Live"
                statusVariant="Active"
              />
              <ActivityCard
                title="Data Structures"
                description="Lists, dictionaries, sets, and algorithmic thinking with real problem-solving scenarios."
                status="Soon"
                statusVariant="pending"
              />
              <ActivityCard
                title="Advanced Python"
                description="Decorators, generators, context managers, and production-ready patterns."
                status="Soon"
                statusVariant="pending"
              />
            </div>
          </section>

          {/* Activity placeholder */}
          <section>
            <h2 className="font-heading text-lg font-semibold text-text mb-4">
              Recent Activity
            </h2>
            <Card className="p-8 text-center border-dashed border-white/10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 mb-4">
                <Activity size={20} className="text-muted" />
              </div>
              <p className="text-text font-medium mb-1">No activity yet</p>
              <p className="text-sm text-muted max-w-sm mx-auto">
                Your assessment history and progress updates will appear here once you
                complete your first benchmark.
              </p>
            </Card>
          </section>
        </Container>
      </main>
    </div>
  )
}
