import { API_BASE_URL } from '../config/api'

export async function checkBackendConnection() {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      signal: AbortSignal.timeout(15000),
    })

    return {
      connected: response.ok,
      status: response.status,
      url: API_BASE_URL,
    }
  } catch {
    return {
      connected: false,
      status: null,
      url: API_BASE_URL,
    }
  }
}
