"use client"

import { useEffect } from 'react'

export default function AuthPage() {
  useEffect(() => {
    console.log('Auth page mounted')
    // Redirect to login page
    window.location.href = '/auth/login'
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold mb-8">
          Redirecting...
        </h1>
      </main>
    </div>
  )
}
