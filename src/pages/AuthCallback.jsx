import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AuthCallback() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('Starting...')

  useEffect(() => {
    const hash = window.location.hash
    setStatus('Hash found: ' + (hash.includes('access_token') ? 'YES' : 'NO'))

    if (hash && hash.includes('access_token')) {
      const params = new URLSearchParams(hash.substring(1))
      const access_token = params.get('access_token')
      const refresh_token = params.get('refresh_token')

      setStatus('Setting session...')
      supabase.auth.setSession({ access_token, refresh_token })
        .then(({ data, error }) => {
          setStatus('Result: ' + (error ? error.message : 'OK session=' + !!data.session))
          if (data?.session) {
            navigate('/dashboard', { replace: true })
          } else {
            navigate('/login', { replace: true })
          }
        })
    } else {
      navigate('/login', { replace: true })
    }
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="text-sm">{status}</span>
    </div>
  )
}
