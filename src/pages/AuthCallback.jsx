import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    console.log("AuthCallback loaded:", window.location.href)

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth event:", event, "Session:", session)
      if (event === 'SIGNED_IN' && session) {
        subscription.unsubscribe()
        navigate('/dashboard', { replace: true })
      } else if (event === 'SIGNED_OUT') {
        subscription.unsubscribe()
        navigate('/login', { replace: true })
      }
    })

    // Fallback after 5 seconds
    const timeout = setTimeout(async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        navigate('/dashboard', { replace: true })
      } else {
        navigate('/login', { replace: true })
      }
    }, 5000)

    return () => {
      subscription.unsubscribe()
      clearTimeout(timeout)
    }
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="text-sm">Signing in...</span>
    </div>
  )
}
