const encoder = new TextEncoder();
const SESSION_LIFETIME_SECONDS = 8 * 60 * 60;

function base64UrlEncode(bytes) {
  let binary = '';
  for (const byte of new Uint8Array(bytes)) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(value) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(normalized + '='.repeat((4 - normalized.length % 4) % 4));
  return Uint8Array.from(binary, character => character.charCodeAt(0));
}

async function signingKey() {
  const secret = process.env.SUPERADMIN_SESSION_SECRET;
  if (!secret) throw new Error('SUPERADMIN_SESSION_SECRET is not configured.');
  return crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

export async function createBuilderSession() {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_LIFETIME_SECONDS;
  const payload = `webpage-builder:${expiresAt}`;
  const signature = await crypto.subtle.sign('HMAC', await signingKey(), encoder.encode(payload));
  return { token: `${expiresAt}.${base64UrlEncode(signature)}`, maxAge: SESSION_LIFETIME_SECONDS };
}

export async function verifyBuilderSession(token) {
  if (!token) return false;
  try {
    const [expiresAtText, signatureText, ...extra] = token.split('.');
    const expiresAt = Number(expiresAtText);
    if (extra.length || !Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return false;
    const payload = `webpage-builder:${expiresAt}`;
    return await crypto.subtle.verify('HMAC', await signingKey(), base64UrlDecode(signatureText), encoder.encode(payload));
  } catch {
    return false;
  }
}

export const SESSION_COOKIE_NAME = 'uaf_builder_session';
