import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { type NextRequest, NextResponse } from 'next/server'
import { PROTECTED_ROUTES } from './consts'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const reqUrl = new URL(req.url)
  const { pathname } = reqUrl

  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session && isOnProtectedRoute(pathname)) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  return NextResponse.next()
}

const isOnProtectedRoute = (pathname: string) => {
  return PROTECTED_ROUTES.includes(pathname)
}
