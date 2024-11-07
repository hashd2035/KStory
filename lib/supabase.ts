import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const supabase = createClientComponentClient()

export interface SignUpData {
  email: string
  password: string
  firstName?: string
  lastName?: string
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
    // Silently handle auth errors
    return null
  }
}

export async function isAuthenticated() {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    return !!session
  } catch {
    // Silently handle auth errors
    return false
  }
}
