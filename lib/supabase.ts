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

export async function signUp({ email, password, firstName, lastName }: SignUpData) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName
      }
    }
  })

  if (error) throw error
  return { user: data.user }
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
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
