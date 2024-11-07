"use client"

import { useCallback, useEffect, useState } from 'react'

export function useNavigation() {
  const [isNavigating, setIsNavigating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log('Navigation hook mounted')
  }, [])

  const navigate = useCallback((path: string) => {
    console.log('Attempting navigation to:', path)
    setIsNavigating(true)
    setError(null)

    try {
      console.log('Current location:', window.location.href)
      console.log('Target location:', path)
      window.location.href = path
    } catch (err) {
      console.error('Navigation error:', err)
      setError(err instanceof Error ? err.message : 'Navigation failed')
      setIsNavigating(false)
    }
  }, [])

  return {
    navigate,
    isNavigating,
    error
  }
}
