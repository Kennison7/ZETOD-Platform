import { useEffect, useState } from 'react'

const COLD_START_DELAY_MS = 3000

export default function useColdStartHint(loading) {
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    if (!loading) {
      setShowHint(false)
      return undefined
    }

    const timer = setTimeout(() => setShowHint(true), COLD_START_DELAY_MS)
    return () => clearTimeout(timer)
  }, [loading])

  return showHint
}
