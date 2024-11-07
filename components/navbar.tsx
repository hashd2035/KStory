"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getUser } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

export function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function loadUser() {
      try {
        const userData = await getUser()
        if (mounted && userData) {
          setUser(userData)
        }
      } catch {
        // Silently handle auth errors
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    loadUser()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <nav className="bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="text-3xl font-bold text-white">
            KStory
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/about" className="text-white/70 hover:text-white">
              About KStory
            </Link>
            <Link href="/stories" className="text-white/70 hover:text-white">
              Stories
            </Link>
            <Link href="/podcast" className="text-white/70 hover:text-white">
              Podcast
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isLoading ? (
              <div className="w-20 h-8 bg-white/5 rounded animate-pulse" />
            ) : user ? (
              <Link 
                href="/dashboard"
                className="text-sm text-white/70 hover:text-white"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-sm text-white/70 hover:text-white"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="text-sm px-4 py-2 bg-white text-black rounded-lg hover:bg-white/90"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
