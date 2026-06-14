import api from './api'
import { supabase } from '../lib/supabase'

export async function loginUser(credentials) {
  const response = await api.post('/api/auth/login', credentials)
  return response.data
}

export async function registerUser(userData) {
  const response = await api.post('/api/auth/register', userData)
  return response.data
}

export async function exchangeOAuthSession(accessToken) {
  const response = await api.post('/api/auth/oauth/session', { access_token: accessToken })
  return response.data
}

export async function loginWithOAuth(provider) {
  if (!supabase) {
    throw new Error('OAuth is not configured. Missing Supabase environment variables.')
  }

  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  if (error) {
    throw error
  }
}
