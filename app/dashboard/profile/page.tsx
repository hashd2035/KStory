"use client"

import { useEffect, useState } from 'react'
import { getUser, getProfiles, Profile } from '@/lib/supabase'

export default function ProfilePage() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadProfiles()
  }, [])

  const loadProfiles = async () => {
    try {
      const user = await getUser()
      if (user) {
        const userProfiles = await getProfiles(user.id)
        setProfiles(userProfiles)
      }
    } catch (error) {
      console.error('Error loading profiles:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (profiles.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to Profiles</h1>
        <p className="text-white/70 mb-8">
          You haven't created any profiles yet. Create your first profile to get started.
        </p>
      </div>
    )
  }

  // Show the first profile by default
  const defaultProfile = profiles[0]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">{defaultProfile.name}</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <div className="p-6 bg-white/5 rounded-lg">
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(defaultProfile.data, null, 2)}
            </pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="p-6 bg-white/5 rounded-lg">
            <p className="text-white/70">No recent activity</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 bg-white/5 rounded-lg">
              <h3 className="font-medium mb-2">Stories</h3>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div className="p-6 bg-white/5 rounded-lg">
              <h3 className="font-medium mb-2">Comments</h3>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div className="p-6 bg-white/5 rounded-lg">
              <h3 className="font-medium mb-2">Likes</h3>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
