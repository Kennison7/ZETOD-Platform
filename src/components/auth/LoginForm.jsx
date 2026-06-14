import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import AuthInput from './AuthInput'
import Spinner from './Spinner'
import ColdStartNotice from './ColdStartNotice'
import { loginUser, loginWithOAuth } from '../../services/authService'
import { setToken } from '../../utils/auth'
import { getApiErrorMessage } from '../../utils/errors'

function extractToken(data) {
  return data?.token || data?.access_token || null
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="currentColor"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="currentColor"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="currentColor"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 0C5.37 0 0 5.37 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.216.69.825.573C20.565 21.795 24 17.298 24 12c0-6.63-5.37-12-12-12z"
      />
    </svg>
  )
}

export default function LoginForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState(null)
  const [error, setError] = useState('')

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

  const handleOAuth = async (provider) => {
    setOauthLoading(provider)
    setError('')

    try {
      await loginWithOAuth(provider)
    } catch (err) {
      setError(
        getApiErrorMessage(err, `Unable to sign in with ${provider}. Please try again.`)
      )
      setOauthLoading(null)
    }
  }

  const isDisabled = loading || oauthLoading

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <ColdStartNotice />

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent"
        >
          {error}
        </div>
      )}

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
        disabled={isDisabled}
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
        disabled={isDisabled}
      />

      <Button type="submit" className="w-full gap-2" size="lg" disabled={isDisabled}>
        {loading && <Spinner />}
        {loading ? 'Signing in…' : 'Sign in'}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="secondary"
          className="w-full gap-2"
          disabled={isDisabled}
          onClick={() => handleOAuth('google')}
        >
          {oauthLoading === 'google' ? <Spinner /> : <GoogleIcon />}
          Google
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="w-full gap-2"
          disabled={isDisabled}
          onClick={() => handleOAuth('github')}
        >
          {oauthLoading === 'github' ? <Spinner /> : <GitHubIcon />}
          GitHub
        </Button>
      </div>
    </form>
  )
}
