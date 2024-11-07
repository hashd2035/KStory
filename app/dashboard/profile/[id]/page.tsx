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
      <div className="flex justify-between items-center mb-8">
        {isEditing ? (
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
            />
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-white/10 rounded hover:bg-white/20"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false)
                setProfileName(profile.name)
              }}
              className="px-4 py-2 bg-white/10 rounded hover:bg-white/20"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-white/10 rounded hover:bg-white/20"
            >
              Edit Name
            </button>
          </div>
        )}
      </div>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <div className="p-6 bg-white/5 rounded-lg">
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(profile.data, null, 2)}
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
