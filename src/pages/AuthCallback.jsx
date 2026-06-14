import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    let timeout

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        clearTimeout(timeout)
        subscription.unsubscribe()
        navigate('/dashboard', { replace: true })
      }
    })

    timeout = setTimeout(() => {
      subscription.unsubscribe()
      navigate('/login', { replace: true })
    }, 5000)

    return () => {
      clearTimeout(timeout)
      subscription.unsubscribe()
    }
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="text-sm">Signing in...</span>
    </div>
  )
}
