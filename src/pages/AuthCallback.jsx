import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/auth/Spinner'
import { supabase } from '../lib/supabase'
import { exchangeOAuthSession } from '../services/authService'
import { setToken } from '../utils/auth'

export default function AuthCallback() {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  useEffect(() => {
    async function completeSignIn() {
      if (!supabase) {
        setError('OAuth is not configured. Missing Supabase environment variables.')
        return
      }

      const { data: { session }, error: sessionError } = await supabase.auth.getSession()

      if (sessionError || !session?.access_token) {
        navigate('/login', { replace: true })
        return
      }

      try {
        const data = await exchangeOAuthSession(session.access_token)
        if (data?.token) {
          setToken(data.token)
        }
        navigate('/dashboard', { replace: true })
      } catch {
        setError('Unable to complete sign in. Please try again.')
      }
    }

    completeSignIn()
  }, [navigate])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <p className="text-sm text-accent">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background gap-3 text-muted">
      <Spinner />
      <span className="text-sm">Signing in…</span>
    </div>
  )
}
