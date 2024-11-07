"use client"

import { useEffect, useState } from 'react'
import { getUser } from '@/lib/supabase'

export default function AccountPage() {
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
      <h1 className="text-2xl font-bold mb-8">Account Settings</h1>
      
      <div className="space-y-8">
        {/* Email Settings */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Email Settings</h2>
          <div className="p-6 bg-white/5 rounded-lg">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Current Email</label>
              <p>{user?.email}</p>
            </div>
            <button className="px-4 py-2 bg-white/10 rounded hover:bg-white/20">
              Change Email
            </button>
          </div>
        </section>

        {/* Password Settings */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Password Settings</h2>
          <div className="p-6 bg-white/5 rounded-lg">
            <button className="px-4 py-2 bg-white/10 rounded hover:bg-white/20">
              Change Password
            </button>
          </div>
        </section>

        {/* Notification Settings */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          <div className="p-6 bg-white/5 rounded-lg space-y-4">
            <div>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Email notifications for new stories</span>
              </label>
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Email notifications for new podcast episodes</span>
              </label>
            </div>
          </div>
        </section>

        {/* Delete Account */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Delete Account</h2>
          <div className="p-6 bg-white/5 rounded-lg">
            <p className="text-white/70 mb-4">
              Warning: This action cannot be undone. All your data will be permanently deleted.
            </p>
            <button className="px-4 py-2 bg-red-500/20 text-red-500 rounded hover:bg-red-500/30">
              Delete Account
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
