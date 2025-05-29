import { createClientServer } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createClientServer()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // URL to redirect to after signup process completes
      return NextResponse.redirect(`${requestUrl.origin}/`)
    }
  }

  // URL to redirect to if the signup process fails
  return NextResponse.redirect(`${requestUrl.origin}/auth/auth-error`)
} 