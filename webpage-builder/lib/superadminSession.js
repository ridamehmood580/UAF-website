import { timingSafeEqual, createHmac } from 'node:crypto';

export const SUPERADMIN_COOKIE_NAME = 'uaf_superadmin_session';

export function hasSuperadminSession(request) {
  if (!process.env.SUPERADMIN_USERNAME || !process.env.SUPERADMIN_PASSWORD || !process.env.SUPERADMIN_SESSION_SECRET) return false;
  const token = request.cookies.get(SUPERADMIN_COOKIE_NAME)?.value || '';
  const [payload, providedSignature] = token.split('.');
  if (!payload || !providedSignature) return false;
  const expected = createHmac('sha256', process.env.SUPERADMIN_SESSION_SECRET).update(payload).digest('base64url');
  const actualBuffer = Buffer.from(providedSignature);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return data.role === 'superadmin' && data.exp > Date.now();
  } catch {
    return false;
  }
}
