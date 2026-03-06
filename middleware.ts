import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // DEMO MODE: Middleware disabled - using localStorage authentication
  // In production, this would check Supabase sessions
  
  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
}

export const config = {
  matcher: ['/admin/:path*'],
};
