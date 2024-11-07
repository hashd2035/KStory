"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { isAuthenticated, signOut } from "@/lib/supabase"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')

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

  const renderNavLinks = () => {
    if (isDashboard) {
      return (
        <>
          <Link href="/dashboard/profile">Profile</Link>
          <Link href="/dashboard/admin">Admin</Link>
          <Link href="/dashboard/account">Account</Link>
        </>
      )
    }
    return (
      <>
        <Link href="/about">About KStory</Link>
        <Link href="/stories">Stories</Link>
        <Link href="/podcast">Podcast</Link>
      </>
    )
  }

  return (
    <div className="nav-container">
      <Link href="/" className="nav-logo">
        KStory
      </Link>

      <div className="nav-links">
        {renderNavLinks()}
      </div>

      {!isLoading && (
        <div className="nav-auth">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="nav-auth-button">
                Dashboard
              </Link>
              <button 
                onClick={handleSignOut}
                className="nav-auth-button"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="nav-auth-button">
                Sign In
              </Link>
              <Link href="/auth/signup" className="nav-auth-button">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  )
}
