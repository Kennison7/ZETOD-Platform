import axios from 'axios'
import { getToken } from '../utils/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
})

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export async function checkBackendHealth() {
  try {
    const response = await api.get('/health')
    const message =
      typeof response.data === 'string'
        ? response.data
        : response.data?.status || response.data?.message || 'OK'

    return {
      connected: true,
      status: response.status,
      message,
      data: response.data,
    }
  } catch (error) {
    if (error.response) {
      return {
        connected: true,
        status: error.response.status,
        message: 'Server responded with an error.',
        data: error.response.data,
      }
    }

    return {
      connected: false,
      status: null,
      message: error.code === 'ECONNABORTED' ? 'Request timed out.' : 'Network unreachable.',
      data: null,
    }
  }
}

export default api
