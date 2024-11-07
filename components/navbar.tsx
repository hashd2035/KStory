"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { isAuthenticated, signOut } from "@/lib/supabase"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const authed = await isAuthenticated()
    setIsLoggedIn(authed)
    setIsLoading(false)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      setIsLoggedIn(false)
      window.location.href = '/'
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className="nav-container">
      {/* Logo */}
      <Link href="/" className="nav-logo">
        KStory
      </Link>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link href="/about">About KStory</Link>
        <Link href="/stories">Stories</Link>
        <Link href="/podcast">Podcast</Link>
      </div>

      {/* Auth Links */}
      {!isLoading && (
        <div className="nav-auth">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <button 
                onClick={handleSignOut}
                className="text-white hover:text-white/80"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login">Sign In</Link>
              <Link href="/auth/signup">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </div>
  )
}
