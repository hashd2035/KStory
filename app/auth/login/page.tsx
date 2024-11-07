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
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-md mx-auto p-8">
        <h1 className="text-2xl font-bold text-center mb-8">
          Sign In
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
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
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              required
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-white text-black rounded-lg font-medium hover:bg-white/90 disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
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
      </main>
    </div>
  )
}
