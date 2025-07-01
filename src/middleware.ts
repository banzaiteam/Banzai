// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  console.log(NextRequest, NextResponse)
  const token = request.cookies.get('accessToken')?.value
  console.log('sdfsdfsdf')

  const isAuth = Boolean(token)
  const pathname = request.nextUrl.pathname

  const protectedRoutes = ['/profile', '/posts/create']

  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtected && !isAuth) {
    return NextResponse.redirect(new URL('/auth/signIn', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile/:path*', '/posts/create'],
}
