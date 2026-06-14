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
    const healthStatus = response.data?.status
    const message =
      healthStatus === 'healthy'
        ? 'API is reachable and responding.'
        : typeof response.data === 'string'
          ? response.data
          : response.data?.message || healthStatus || 'OK'

    return {
      connected: true,
      status: response.status,
      healthStatus,
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
