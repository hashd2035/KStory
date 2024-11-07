import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { access_token, refresh_token } = body

    if (!access_token) {
      return NextResponse.json(
        { error: 'No access token provided' },
        { status: 400 }
      )
    }

    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    await supabase.auth.setSession({
      access_token,
      refresh_token: refresh_token || ''
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Auth callback error:', error)
    return NextResponse.json(
      { error: 'Failed to set session' },
      { status: 500 }
    )
  }
}

// Handle GET requests for the initial auth callback
export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
      const cookieStore = cookies()
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
      await supabase.auth.exchangeCodeForSession(code)
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // If no code is present, check for error parameters
    const error = requestUrl.searchParams.get('error')
    const errorDescription = requestUrl.searchParams.get('error_description')

    if (error) {
      return NextResponse.redirect(
        new URL(`/auth/login?error=${encodeURIComponent(errorDescription || error)}`, request.url)
      )
    }

    // No code or error present
    return NextResponse.redirect(
      new URL('/auth/login?error=Invalid callback request', request.url)
    )
  } catch (error) {
    console.error('Auth callback error:', error)
    return NextResponse.redirect(
      new URL('/auth/login?error=Authentication failed', request.url)
    )
  }
}
