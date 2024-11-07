"use client"

import { useEffect, useState } from 'react'
import { getProfiles, createProfile, Profile } from '@/lib/supabase'
import { getUser } from '@/lib/supabase'
import { usePathname } from 'next/navigation'

export default function ProfileLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

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
    <div className="profile-layout">
      {/* Profile Sidebar */}
      <div className="profile-sidebar">
        <div className="profile-sidebar-header">
          <h2 className="profile-sidebar-title">Profiles</h2>
          {profiles.length < 5 && (
            <button
              onClick={handleAddProfile}
              className="profile-add-button"
            >
              Add
            </button>
          )}
        </div>

        <nav className="profile-nav">
          {profiles.map((profile) => (
            <a
              key={profile.id}
              href={`/dashboard/profile/${profile.id}`}
              className={`profile-nav-link ${pathname?.includes(profile.id) ? 'active' : ''}`}
            >
              {profile.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="profile-content">
        {children}
      </div>
    </div>
  )
}
