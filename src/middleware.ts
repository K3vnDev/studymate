import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { type NextRequest, NextResponse } from 'next/server'
import { PROTECTED_ROUTES } from './consts'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const reqUrl = new URL(req.url)
  const { pathname } = reqUrl

  if (isOnProtectedRoute(pathname)) {
    const supabase = createMiddlewareClient({ req, res })

    const {
      data: { session }
    } = await supabase.auth.getSession()

    if (!session) return NextResponse.redirect(new URL('/', req.url))
  }
  return NextResponse.next()
}

const isOnProtectedRoute = (pathname: string) => {
  return PROTECTED_ROUTES.includes(pathname)
}
