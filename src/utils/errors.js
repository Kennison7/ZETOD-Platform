export function getApiErrorMessage(err, fallback = 'Something went wrong. Please try again.') {
  if (!err.response) {
    if (err.code === 'ECONNABORTED') {
      return 'Request timed out. The server may still be waking up — please try again.'
    }
    return 'Network error. Please check your connection and try again.'
  }

  const detail = err.response?.data?.detail

  if (typeof detail === 'string') {
    return detail
  }

  if (Array.isArray(detail)) {
    return detail.map((item) => item.msg || item.message).join('. ')
  }

  return err.response?.data?.message || fallback
}
