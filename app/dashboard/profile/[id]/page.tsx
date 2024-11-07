"use client"

import { useEffect, useState } from 'react'
import { getUser, getProfiles, updateProfile, Profile } from '@/lib/supabase'

export default function ProfilePage({ params }: { params: { id: string } }) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [profileName, setProfileName] = useState('')

  useEffect(() => {
    loadProfile()
  }, [params.id])

  const loadProfile = async () => {
    try {
      const user = await getUser()
      if (user) {
        const profiles = await getProfiles(user.id)
        const currentProfile = profiles.find(p => p.id === params.id)
        if (currentProfile) {
          setProfile(currentProfile)
          setProfileName(currentProfile.name)
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!profile) return

    try {
      const updatedProfile = await updateProfile(profile.id, {
        ...profile,
        name: profileName
      })
      setProfile(updatedProfile)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!profile) {
    return <div>Profile not found</div>
  }

  return (
    <div>
      <div className="profile-header">
        {isEditing ? (
          <div className="profile-edit-group">
            <input
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              className="profile-input"
            />
            <button
              onClick={handleSave}
              className="profile-button"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false)
                setProfileName(profile.name)
              }}
              className="profile-button"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="profile-edit-group">
            <h1 className="profile-title">{profile.name}</h1>
            <button
              onClick={() => setIsEditing(true)}
              className="profile-button"
            >
              Edit Name
            </button>
          </div>
        )}
      </div>
      
      <div className="profile-section">
        <h2 className="profile-section-title">Profile Information</h2>
        <div className="profile-card">
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(profile.data, null, 2)}
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
