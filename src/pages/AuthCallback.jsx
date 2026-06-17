import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleCallback = async () => {
      const fullUrl = window.location.href
      console.log("AuthCallback loaded:", fullUrl)

      const code = new URLSearchParams(window.location.search).get('code')
      console.log("Code param:", code)

      if (!code) {
        console.error("No code param found — redirecting to login")
        navigate('/login', { replace: true })
        return
      }

      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      console.log("Exchange result — data:", data, "error:", error)

      if (error) {
        console.error("Exchange failed:", error.message)
        navigate('/login', { replace: true })
        return
      }

      navigate('/dashboard', { replace: true })
    }

    handleCallback()
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="text-sm">Signing in...</span>
    </div>
  )
}
