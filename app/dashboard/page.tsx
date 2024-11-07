"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getUser } from '@/lib/supabase'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    try {
      const userData = await getUser()
      setUser(userData)
    } catch (error) {
      console.error('Error loading user:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.user_metadata?.first_name || 'User'}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Profile Section */}
        <Link href="/dashboard/profile" className="block p-6 bg-white/5 rounded-lg hover:bg-white/10">
          <h2 className="text-xl font-semibold mb-2">Profile</h2>
          <p className="text-white/70">View and update your profile information</p>
        </Link>

        {/* Admin Section */}
        <Link href="/dashboard/admin" className="block p-6 bg-white/5 rounded-lg hover:bg-white/10">
          <h2 className="text-xl font-semibold mb-2">Admin</h2>
          <p className="text-white/70">Manage site content and users</p>
        </Link>

        {/* Account Section */}
        <Link href="/dashboard/account" className="block p-6 bg-white/5 rounded-lg hover:bg-white/10">
          <h2 className="text-xl font-semibold mb-2">Account</h2>
          <p className="text-white/70">Manage your account settings</p>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/5 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Stories</h3>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="p-6 bg-white/5 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Comments</h3>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="p-6 bg-white/5 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Likes</h3>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>
      </div>
    </div>
  )
}
