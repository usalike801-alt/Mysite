import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      return new NextResponse('Authentication Required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin Area"',
        },
      });
    }

    try {
      const base64Credentials = authHeader.split(' ')[1];
      const credentials = atob(base64Credentials).split(':');
      const pass = credentials[1];

      if (pass !== process.env.ADMIN_PASSWORD) {
        return new NextResponse('Access Denied', {
          status: 401,
          headers: {
            'WWW-Authenticate': 'Basic realm="Admin Area"',
          },
        });
      }
    } catch {
      return new NextResponse('Invalid Auth Header', { status: 400 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
