"use client"

import { useEffect, useState } from 'react'
import { getUser } from '@/lib/supabase'

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAdminStatus()
  }, [])

  const checkAdminStatus = async () => {
    try {
      const user = await getUser()
      // TODO: Implement proper admin check based on user roles
      setIsAdmin(user?.user_metadata?.role === 'admin')
    } catch (error) {
      console.error('Error checking admin status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAdmin) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p>You do not have permission to access this page.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white/5 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <p className="text-white/70">Manage user accounts and permissions</p>
          <button className="mt-4 px-4 py-2 bg-white/10 rounded hover:bg-white/20">
            View Users
          </button>
        </div>

        <div className="p-6 bg-white/5 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Content Management</h2>
          <p className="text-white/70">Manage stories and podcast content</p>
          <button className="mt-4 px-4 py-2 bg-white/10 rounded hover:bg-white/20">
            Manage Content
          </button>
        </div>

        <div className="p-6 bg-white/5 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Analytics</h2>
          <p className="text-white/70">View site analytics and metrics</p>
          <button className="mt-4 px-4 py-2 bg-white/10 rounded hover:bg-white/20">
            View Analytics
          </button>
        </div>

        <div className="p-6 bg-white/5 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          <p className="text-white/70">Configure site settings</p>
          <button className="mt-4 px-4 py-2 bg-white/10 rounded hover:bg-white/20">
            Site Settings
          </button>
        </div>
      </div>
    </div>
  )
}
