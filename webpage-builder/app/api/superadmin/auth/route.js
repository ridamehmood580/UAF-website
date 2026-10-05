import { createHmac } from 'node:crypto';
import { NextResponse } from 'next/server';
import { hasSuperadminSession, SUPERADMIN_COOKIE_NAME } from '../../../../lib/superadminSession';

const MAX_AGE_SECONDS = 60 * 60 * 8;

function configured() {
  return process.env.SUPERADMIN_USERNAME && process.env.SUPERADMIN_PASSWORD && process.env.SUPERADMIN_SESSION_SECRET;
}

function signature(value) {
  return createHmac('sha256', process.env.SUPERADMIN_SESSION_SECRET).update(value).digest('base64url');
}

function setSessionCookie(response, value) {
  response.cookies.set(SUPERADMIN_COOKIE_NAME, value, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE_SECONDS,
  });
  return response;
}

export async function GET(request) {
  if (!configured()) return NextResponse.json({ authenticated: false, configured: false }, { status: 503 });
  return NextResponse.json({ authenticated: hasSuperadminSession(request), configured: true });
}

export async function POST(request) {
  if (!configured()) return NextResponse.json({ error: 'Superadmin login is not configured. Set SUPERADMIN_USERNAME, SUPERADMIN_PASSWORD, and SUPERADMIN_SESSION_SECRET in webpage-builder/.env.local.' }, { status: 503 });
  let credentials;
  try { credentials = await request.json(); } catch { return NextResponse.json({ error: 'Enter your username and password.' }, { status: 400 }); }
  const username = String(credentials?.username || '').trim();
  const password = String(credentials?.password || '');
  if (username !== process.env.SUPERADMIN_USERNAME || password !== process.env.SUPERADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Incorrect username or password.' }, { status: 401 });
  }
  const payload = Buffer.from(JSON.stringify({ role: 'superadmin', exp: Date.now() + MAX_AGE_SECONDS * 1000 })).toString('base64url');
  return setSessionCookie(NextResponse.json({ authenticated: true }), `${payload}.${signature(payload)}`);
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(SUPERADMIN_COOKIE_NAME, '', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 0 });
  return response;
}
