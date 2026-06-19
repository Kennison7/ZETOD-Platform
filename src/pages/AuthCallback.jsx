import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AuthCallback() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('Starting...')

  useEffect(() => {
    setStatus('Hash: ' + window.location.hash.substring(0, 50))
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setStatus('Event: ' + event + ' Session: ' + (session ? 'YES' : 'NO'))
      if (session) {
        setTimeout(() => navigate('/dashboard', { replace: true }), 1000)
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="text-sm">{status}</span>
    </div>
  )
}
