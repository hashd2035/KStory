"use client"

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const error = searchParams.get('error')
    const error_description = searchParams.get('error_description')

    if (error) {
      console.error('Auth error:', error, error_description)
      router.push(`/auth/login?error=${encodeURIComponent(error_description || error)}`)
      return
    }

    // Get the hash fragment
    const hash = window.location.hash.substring(1)
    const params = new URLSearchParams(hash)
    const accessToken = params.get('access_token')
    const type = params.get('type')

    if (accessToken && type === 'signup') {
      // Make a POST request to handle the session server-side
      fetch('/api/auth/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: accessToken,
          refresh_token: params.get('refresh_token'),
        }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.error)
        }
        router.push('/dashboard')
      })
      .catch(error => {
        console.error('Error setting session:', error)
        router.push('/auth/login?error=Failed to complete authentication')
      })
    } else {
      router.push('/auth/login?error=Invalid authentication data')
    }
  }, [router, searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-white text-lg">
        <div className="animate-pulse">Completing authentication...</div>
        <p className="text-sm text-white/50 mt-2">Please wait while we set up your account.</p>
      </div>
    </div>
  )
}
