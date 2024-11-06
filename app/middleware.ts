import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ZKUBE_PUZZLESET_ADDRESS } from './src/config';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/puzzle/')) {
    return NextResponse.next();
  }

  return NextResponse.redirect(
    new URL(`/puzzle/${ZKUBE_PUZZLESET_ADDRESS}/0`, request.url)
  );
}

export const config = {
  matcher: ['/((?!puzzle/|zk/|api/|_next/|favicon.ico).*)'],
};
