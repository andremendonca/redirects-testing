// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Log all headers
  console.log('--- Request Headers ---')
  request.headers.forEach((value, key) => {
    console.log(`${key}: ${value}`)
  })
  console.log('--- End Headers ---')

  const hostname = request.headers.get('host')
  const referer = request.headers.get('referer')

  // Check if this is coming from a redirected domain
  const isRedirect = request.headers.get('x-forwarded-host') !== hostname
  
  // You can also check specific domains
  const vercelDomains = ['yourdomain.vercel.app', 'old-domain.com']
  const forwardedHost = request.headers.get('x-forwarded-host')
  
  if (forwardedHost && vercelDomains.includes(forwardedHost)) {
    // Track the redirect
    console.log(`Redirected from: ${forwardedHost} to ${hostname}`)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}