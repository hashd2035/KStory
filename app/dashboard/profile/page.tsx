"use client"

import { useEffect, useState } from 'react'
import { getUser } from '@/lib/supabase'

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const user = await getUser()
      setProfile(user)
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Profile</h1>
      
      {profile && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <p>{profile.email}</p>
          </div>

          {profile.user_metadata && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <p>{profile.user_metadata.first_name || 'Not set'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <p>{profile.user_metadata.last_name || 'Not set'}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
