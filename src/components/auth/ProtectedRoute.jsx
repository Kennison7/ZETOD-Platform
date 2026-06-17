import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function ProtectedRoute({ children }) {
  const [checking, setChecking] = useState(true)
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAllowed(!!session)
      setChecking(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAllowed(!!session)
      setChecking(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (checking) return null
  if (!allowed) return <Navigate to="/login" replace />
  return children
}
