import { useEffect, useState } from 'react'
import { CheckCircle2, Loader2, ServerCrash, Wifi } from 'lucide-react'
import Card from '../ui/Card'
import { checkBackendHealth } from '../../services/api'

const STATUS = {
  checking: 'checking',
  online: 'online',
  offline: 'offline',
}

export default function BackendStatus() {
  const [status, setStatus] = useState(STATUS.checking)
  const [healthData, setHealthData] = useState(null)
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    let cancelled = false
    const startedAt = Date.now()

    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt) / 1000))
    }, 1000)

    async function runHealthCheck() {
      setStatus(STATUS.checking)

      const result = await checkBackendHealth()

      if (cancelled) return

      clearInterval(timer)
      setHealthData(result)

      if (result.connected) {
        setStatus(STATUS.online)
        console.info('[ZeToD] Backend health:', result)
      } else {
        setStatus(STATUS.offline)
        console.warn('[ZeToD] Backend unreachable:', result)
      }
    }

    runHealthCheck()

    return () => {
      cancelled = true
      clearInterval(timer)
    }
  }, [])

  const statusConfig = {
    [STATUS.checking]: {
      icon: Loader2,
      iconClass: 'text-primary animate-spin',
      label: 'Connecting…',
      badge: 'Checking',
      badgeClass: 'bg-primary/20 text-primary border-primary/30',
      description:
        elapsed > 5
          ? `Waking up Render backend… (${elapsed}s). First request can take up to 50 seconds.`
          : 'Pinging backend health endpoint…',
    },
    [STATUS.online]: {
      icon: CheckCircle2,
      iconClass: 'text-secondary',
      label: 'Backend online',
      badge: 'Connected',
      badgeClass: 'bg-secondary/20 text-secondary border-secondary/30',
      description: healthData?.message || 'API is reachable and responding.',
    },
    [STATUS.offline]: {
      icon: ServerCrash,
      iconClass: 'text-accent',
      label: 'Backend offline',
      badge: 'Unreachable',
      badgeClass: 'bg-accent/20 text-accent border-accent/30',
      description: 'Could not reach the API. The server may still be starting — refresh in a moment.',
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Card className="p-5 lg:p-6 border-white/10">
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center w-11 h-11 rounded-lg border border-white/10 bg-white/5 shrink-0">
          <Icon size={20} className={config.iconClass} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-heading text-sm font-semibold text-text flex items-center gap-2">
              <Wifi size={14} className="text-muted" />
              Connection Status
            </h3>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium border ${config.badgeClass}`}
            >
              {config.badge}
            </span>
          </div>
          <p className="text-sm text-text font-medium">{config.label}</p>
          <p className="text-xs text-muted mt-1">{config.description}</p>
          {healthData?.healthStatus && (
            <p className="text-xs text-muted/70 mt-2 font-mono">
              GET /health → {healthData.healthStatus} (HTTP {healthData.status})
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}
