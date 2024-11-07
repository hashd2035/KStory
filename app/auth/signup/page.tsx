"use client"

import { signUp } from '@/lib/supabase'
import { useState } from 'react'

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
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
      console.log('Starting signup process...')
      const { user } = await signUp(formData)
      console.log('Signup response:', user)
      
      if (user?.identities?.length === 0) {
        console.log('User already exists')
        setError('An account with this email already exists. Please sign in instead.')
      } else {
        console.log('New user created successfully')
        setSuccess(true)
      }
    } catch (err) {
      console.error('Sign up error:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to sign up'
      
      if (errorMessage.toLowerCase().includes('already registered')) {
        setError('An account with this email already exists. Please sign in instead.')
      } else {
        setError(errorMessage)
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <main className="auth-container">
        <div className="auth-main">
          <h1 className="auth-title">Check Your Email</h1>
          <p className="text-center mb-8">
            We've sent you an email with a confirmation link. Please check your email and click the link to verify your account.
          </p>
          <div className="text-center">
            <a href="/" className="auth-link">
              Return to Home
            </a>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="auth-container">
      <div className="auth-main">
        <h1 className="auth-title">
          Create Your Account
        </h1>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="auth-error">
              <p>{error}</p>
              {error.includes('already exists') && (
                <p className="mt-2 text-sm">
                  <a 
                    href="/auth/login" 
                    className="auth-error-link"
                  >
                    Click here to sign in
                  </a>
                </p>
              )}
            </div>
          )}

          <div className="auth-field">
            <label className="auth-label">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="auth-input"
              placeholder="you@example.com"
              disabled={isLoading}
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="auth-input"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="auth-field">
              <label className="auth-label">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className="auth-input"
                placeholder="John"
                disabled={isLoading}
              />
            </div>

            <div className="auth-field">
              <label className="auth-label">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className="auth-input"
                placeholder="Doe"
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="auth-button"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          <div className="text-center">
            <a 
              href="/"
              className="auth-link"
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
