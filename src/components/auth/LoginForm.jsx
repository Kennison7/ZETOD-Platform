import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import { loginUser } from '../../services/api'

export default function LoginForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const data = await loginUser(form)
      if (data.token) {
        localStorage.setItem('zetod_token', data.token)
      }
      navigate('/')
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        'Unable to sign in. Please check your credentials or try again later.'
      setError(typeof message === 'string' ? message : 'Unable to sign in.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-text text-sm placeholder:text-muted/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text mb-2">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-text text-sm placeholder:text-muted/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
          placeholder="••••••••"
        />
      </div>

      <Button type="submit" className="w-full" size="lg">
        {loading ? 'Signing in…' : 'Start Assessment'}
      </Button>
    </form>
  )
}
