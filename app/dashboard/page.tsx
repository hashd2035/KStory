"use client"

import { getUser, signOut } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await getUser()
        if (userData) {
          setUser(userData)
        } else {
          // If no user, the middleware will handle the redirect
          window.location.href = '/auth/login'
        }
      } catch (error) {
        // Silently handle auth errors - middleware will redirect
        window.location.href = '/auth/login'
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
      window.location.href = '/'
    } catch (error) {
      console.error('Failed to sign out:', error)
      alert('Failed to sign out. Please try again.')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto p-8 text-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto p-8 text-center">
          <div className="animate-pulse">Redirecting to login...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-4xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Your Profile</h1>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-sm border border-white/10 rounded-lg hover:bg-white/5"
          >
            Sign Out
          </button>
        </div>

        <div className="bg-white/5 rounded-lg p-6 space-y-4">
          <div>
            <label className="text-sm text-white/50">Email</label>
            <p className="text-lg">{user.email}</p>
          </div>

          {user.user_metadata?.first_name && (
            <div>
              <label className="text-sm text-white/50">Name</label>
              <p className="text-lg">
                {user.user_metadata.first_name} {user.user_metadata.last_name}
              </p>
            </div>
          )}

          <div>
            <label className="text-sm text-white/50">Account Created</label>
            <p className="text-lg">
              {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <a 
            href="/"
            className="text-sm text-white/70 hover:text-white"
          >
            ← Back to Home
          </a>
        </div>
      </main>
    </div>
  )
}
