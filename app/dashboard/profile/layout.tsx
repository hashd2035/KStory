"use client"

import { useEffect, useState } from 'react'
import { getProfiles, createProfile, Profile } from '@/lib/supabase'
import { getUser } from '@/lib/supabase'

export default function ProfileLayout({
  children
}: {
  children: React.ReactNode
}) {
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

  const handleAddProfile = async () => {
    if (profiles.length >= 5) {
      alert('Maximum of 5 profiles allowed')
      return
    }

    try {
      const user = await getUser()
      if (user) {
        const newProfile = await createProfile(user.id, `Profile ${profiles.length + 1}`)
        setProfiles([...profiles, newProfile])
      }
    } catch (error) {
      console.error('Error creating profile:', error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex">
      {/* Profile Sidebar */}
      <div className="w-64 min-h-screen bg-white/5 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Profiles</h2>
          {profiles.length < 5 && (
            <button
              onClick={handleAddProfile}
              className="px-2 py-1 bg-white/10 rounded hover:bg-white/20"
            >
              Add
            </button>
          )}
        </div>

        <nav className="space-y-2">
          {profiles.map((profile) => (
            <a
              key={profile.id}
              href={`/dashboard/profile/${profile.id}`}
              className="block px-4 py-2 rounded hover:bg-white/10"
            >
              {profile.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  )
}
