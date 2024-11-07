"use client"

import { signUp } from '@/lib/supabase'
import { useState } from 'react'

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const { user } = await signUp(formData)
      
      if (user?.identities?.length === 0) {
        // This means the user already exists
        setError('An account with this email already exists. Please sign in instead.')
      } else {
        // New user created successfully
        window.location.href = '/?message=Please check your email to confirm your account'
      }
    } catch (err) {
      console.error('Sign up error:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign up'
      
      // Check if error indicates user already exists
      if (errorMessage.toLowerCase().includes('already registered')) {
        setError('An account with this email already exists. Please sign in instead.')
      } else {
        setError(errorMessage)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto p-8">
        <h1 className="text-2xl font-bold text-center mb-8">
          Create Your Account
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded">
              <p>{error}</p>
              {error.includes('already exists') && (
                <p className="mt-2 text-sm">
                  <a 
                    href="/auth/login" 
                    className="text-red-500 hover:text-red-400 underline"
                  >
                    Click here to sign in
                  </a>
                </p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              placeholder="you@example.com"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                placeholder="John"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                placeholder="Doe"
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-white text-black rounded-lg font-medium hover:bg-white/90 disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          <div className="text-center">
            <a 
              href="/"
              className="text-sm text-white/70 hover:text-white"
            >
              Back to Home
            </a>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-white/70">
          Already have an account?{' '}
          <a 
            href="/auth/login"
            className="text-white hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </main>
  )
}
