import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import AuthInput from './AuthInput'
import Spinner from './Spinner'
import ColdStartNotice from './ColdStartNotice'
import { loginUser } from '../../services/authService'
import { setToken } from '../../utils/auth'
import { getApiErrorMessage } from '../../utils/errors'
import useColdStartHint from '../../hooks/useColdStartHint'

function extractToken(data) {
  return data?.token || data?.access_token || null
}

export default function LoginForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const showColdStart = useColdStartHint(loading)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
    setFieldErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errors = {}

    if (!form.email.trim()) {
      errors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Enter a valid email address.'
    }

    if (!form.password) {
      errors.password = 'Password is required.'
    } else if (form.password.length < 8) {
      errors.password = 'Password must be at least 8 characters.'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setError('')

    try {
      const data = await loginUser({
        email: form.email.trim(),
        password: form.password,
      })

      const token = extractToken(data)
      if (token) {
        setToken(token)
      }

      navigate('/dashboard')
    } catch (err) {
      setError(
        getApiErrorMessage(err, 'Unable to sign in. Please check your credentials and try again.')
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent"
        >
          {error}
        </div>
      )}

      <ColdStartNotice visible={showColdStart} />

      <AuthInput
        id="email"
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        value={form.email}
        onChange={handleChange}
        placeholder="you@example.com"
        error={fieldErrors.email}
        disabled={loading}
      />

      <AuthInput
        id="password"
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        value={form.password}
        onChange={handleChange}
        placeholder="••••••••"
        error={fieldErrors.password}
        disabled={loading}
      />

      <Button type="submit" className="w-full gap-2" size="lg" disabled={loading}>
        {loading && <Spinner />}
        {loading ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  )
}
