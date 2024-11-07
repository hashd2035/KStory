"use client"

import { useNavigation } from '@/lib/hooks/use-navigation'
import { useEffect, useState } from 'react'

export function NavigationButton({ href, children }: { href: string, children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)
  const { navigate, isNavigating, error } = useNavigation()

  useEffect(() => {
    console.log('Navigation button mounted')
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (error) {
      console.error('Navigation error:', error)
    }
  }, [error])

  if (!isClient) {
    return null
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    console.log('Button clicked, navigating to:', href)
    navigate(href)
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={isNavigating}
        className="inline-block px-6 py-3 text-lg font-medium border-2 border-white rounded-lg hover:bg-white/10 disabled:opacity-50"
      >
        {isNavigating ? 'Navigating...' : children}
      </button>
      {error && (
        <div className="mt-2 text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  )
}
