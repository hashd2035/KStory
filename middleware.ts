import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Create a response to modify
  const res = NextResponse.next()
  
  // Create supabase client
  const supabase = createMiddlewareClient({ req: request, res })
  
  // Get session
  const { data: { session } } = await supabase.auth.getSession()

  // Get the current pathname
  const path = request.nextUrl.pathname

  // If accessing dashboard without session, redirect to login
  if (path === '/dashboard') {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  // Allow all other routes
  return res
}

export const config = {
  matcher: ['/dashboard']
}
