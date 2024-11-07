import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface SignUpData {
  email: string
  password: string
  firstName?: string
  lastName?: string
}

export interface Profile {
  id: string
  name: string
  user_id: string
  created_at: string
  data: any
}

export async function signUp({ email, password, firstName, lastName }: SignUpData) {
  console.log('Starting signup with email:', email)
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName
      },
      emailRedirectTo: `${window.location.origin}/auth/callback`
    }
  })

  if (error) {
    console.error('Signup error:', error)
    throw error
  }

  // Create default profile
  if (data.user) {
    await createProfile(data.user.id, 'Default Profile')
  }

  console.log('Signup successful:', data.user?.email)
  return { user: data.user }
}

export async function signIn(email: string, password: string) {
  console.log('Starting signin with email:', email)
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Signin error:', error)
    throw error
  }
  console.log('Signin successful:', data.user?.email)
  return { user: data.user }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getUser() {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch {
    return null
  }
}

export async function isAuthenticated() {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    return !!session
  } catch {
    return false
  }
}

// Profile Management Functions
export async function createProfile(userId: string, name: string) {
  const { data, error } = await supabase
    .from('profiles')
    .insert([
      { user_id: userId, name, data: {} }
    ])
    .select()

  if (error) throw error
  return data[0]
}

export async function getProfiles(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data as Profile[]
}

export async function updateProfile(profileId: string, updates: Partial<Profile>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', profileId)
    .select()

  if (error) throw error
  return data[0]
}

export async function deleteProfile(profileId: string) {
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', profileId)

  if (error) throw error
}
