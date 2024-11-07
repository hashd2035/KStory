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
        <h1 className="profile-title mb-4">Welcome to Profiles</h1>
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
      <h1 className="profile-title mb-8">{defaultProfile.name}</h1>
      
      <div className="profile-section">
        <h2 className="profile-section-title">Profile Information</h2>
        <div className="profile-card">
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(defaultProfile.data, null, 2)}
          </pre>
        </div>
      </div>

      <div className="profile-section">
        <h2 className="profile-section-title">Recent Activity</h2>
        <div className="profile-card">
          <p className="text-white/70">No recent activity</p>
        </div>
      </div>

      <div className="profile-section">
        <h2 className="profile-section-title">Statistics</h2>
        <div className="profile-stats">
          <div className="profile-stat-card">
            <h3 className="profile-stat-label">Stories</h3>
            <p className="profile-stat-value">0</p>
          </div>
          <div className="profile-stat-card">
            <h3 className="profile-stat-label">Comments</h3>
            <p className="profile-stat-value">0</p>
          </div>
          <div className="profile-stat-card">
            <h3 className="profile-stat-label">Likes</h3>
            <p className="profile-stat-value">0</p>
          </div>
        </div>
      </div>
    </div>
  )
}
