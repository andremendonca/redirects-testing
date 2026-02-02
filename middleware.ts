import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log('--- Request Headers ---')
  request.headers.forEach((value, key) => {
    console.log(`${key}: ${value}`)
  })
  console.log('--- End Headers ---')

  const hostname = request.headers.get('host')
  const forwardedHost = request.headers.get('x-forwarded-host')

  if (hostname === 'www.codesteam.co' || forwardedHost === 'www.codesteam.co') {
    return NextResponse.redirect('https://www.andremedonca.co/crowdplay', 301)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}