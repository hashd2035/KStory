"use client"

import { signIn } from '@/lib/supabase'
import { useState } from 'react'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const { email, password } = formData
      console.log('Attempting login with:', email)
      
      const { user } = await signIn(email, password)
      console.log('Login response:', user?.email)

      if (user) {
        console.log('Login successful, redirecting...')
        window.location.href = '/dashboard'
      } else {
        setError('Login failed. Please check your credentials.')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError(err instanceof Error ? err.message : 'Failed to login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <main className="auth-main">
        <h1 className="auth-title">
          Sign In
        </h1>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <div className="auth-field">
            <label className="auth-label">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
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
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              required
              className="auth-input"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="auth-button"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
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
      </main>
    </div>
  )
}
