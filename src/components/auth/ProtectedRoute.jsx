import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { getToken } from '../../utils/auth'

export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true)
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const check = async () => {
      const token = getToken()
      if (token) {
        setAllowed(true)
        setChecking(false)
        return
      }
      const { data: { session } } = await supabase.auth.getSession()
      setAllowed(!!session)
      setChecking(false)
    }
    check()
  }, [])

  if (checking) return null
  if (!allowed) return <Navigate to="/login" replace />
  return children
}
