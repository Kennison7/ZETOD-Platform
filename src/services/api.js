import axios from 'axios'

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://zetod-backend.onrender.com'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('zetod_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export async function checkBackendHealth() {
  try {
    const response = await api.get('/')
    return { connected: true, status: response.status }
  } catch (error) {
    if (error.response) {
      return { connected: true, status: error.response.status }
    }
    return { connected: false, status: null }
  }
}

export async function loginUser(credentials) {
  const response = await api.post('/api/auth/login', credentials)
  return response.data
}

export async function registerUser(userData) {
  const response = await api.post('/api/auth/register', userData)
  return response.data
}

export default api
