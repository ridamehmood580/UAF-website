import { NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME, verifyBuilderSession } from './lib/builderAuth';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  if (pathname === '/login' || pathname === '/api/auth/login') return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (await verifyBuilderSession(token)) return NextResponse.next();

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Sign in to access the Page Builder.' }, { status: 401 });
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = '/login';
  loginUrl.search = '';
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|templates/|.*\\..*).*)']
};
