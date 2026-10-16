import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { createBuilderSession, SESSION_COOKIE_NAME } from '../../../../lib/builderAuth';

export const runtime = 'nodejs';

function constantTimeEqual(received, expected) {
  if (typeof received !== 'string' || typeof expected !== 'string') return false;
  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);
  return receivedBuffer.length === expectedBuffer.length && timingSafeEqual(receivedBuffer, expectedBuffer);
}

function allowedOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin) return null;
  const ownOrigin = new URL(request.url).origin;
  const configured = (process.env.UNI_ORIGIN || '').split(',').map(value => value.trim()).filter(Boolean);
  const localOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];
  return [ownOrigin, ...configured, ...localOrigins].includes(origin) ? origin : false;
}

function corsHeaders(origin) {
  const headers = new Headers({ Vary: 'Origin' });
  if (origin) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Access-Control-Allow-Credentials', 'true');
  }
  return headers;
}

export async function OPTIONS(request) {
  const origin = allowedOrigin(request);
  if (origin === false) return new Response(null, { status: 403 });
  const headers = corsHeaders(origin);
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  headers.set('Access-Control-Max-Age', '600');
  return new Response(null, { status: 204, headers });
}

export async function POST(request) {
  const origin = allowedOrigin(request);
  if (origin === false) return NextResponse.json({ error: 'Sign-in request origin is not allowed.' }, { status: 403 });

  const expectedUsername = process.env.SUPERADMIN_USERNAME;
  const expectedPassword = process.env.SUPERADMIN_PASSWORD;
  if (!expectedUsername || !expectedPassword || !process.env.SUPERADMIN_SESSION_SECRET) {
    return NextResponse.json({ error: 'Page Builder sign-in is not configured on the server.' }, { status: 503, headers: corsHeaders(origin) });
  }

  let credentials;
  try { credentials = JSON.parse(await request.text()); }
  catch { return NextResponse.json({ error: 'Enter a valid username and password.' }, { status: 400, headers: corsHeaders(origin) }); }

  const valid = constantTimeEqual(credentials?.username, expectedUsername)
    && constantTimeEqual(credentials?.password, expectedPassword);
  if (!valid) return NextResponse.json({ error: 'The username or password is incorrect.' }, { status: 401, headers: corsHeaders(origin) });

  try {
    const { token, maxAge } = await createBuilderSession();
    const response = NextResponse.json({ ok: true }, { headers: corsHeaders(origin) });
    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: new URL(request.url).protocol === 'https:',
      sameSite: 'lax',
      path: '/',
      maxAge
    });
    return response;
  } catch (error) {
    console.error('Could not create Page Builder session:', error);
    return NextResponse.json({ error: 'Could not start a Page Builder session.' }, { status: 500, headers: corsHeaders(origin) });
  }
}
