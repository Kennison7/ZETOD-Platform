import { useEffect, useState } from 'react'
import { checkBackendConnection } from '../../services/api'

export default function BackendStatus() {
  const [status, setStatus] = useState({ loading: true, connected: false, url: '' })

  useEffect(() => {
    checkBackendConnection().then((result) => {
      setStatus({ loading: false, ...result })
    })
  }, [])

  if (status.loading) {
    return (
      <p className="text-xs text-muted mt-4">
        Connexion au backend en cours…
      </p>
    )
  }

  return (
    <p className="text-xs mt-4 flex items-center gap-2">
      <span
        className={`inline-block w-2 h-2 rounded-full ${status.connected ? 'bg-secondary' : 'bg-accent'}`}
        aria-hidden="true"
      />
      <span className="text-muted">
        Backend{' '}
        {status.connected ? 'connecté' : 'indisponible (Render peut mettre ~1 min au démarrage)'}
        {' — '}
        <a
          href={status.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {status.url}
        </a>
      </span>
    </p>
  )
}
