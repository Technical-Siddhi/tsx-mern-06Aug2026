const TOKEN_EXPIRY_SECONDS = 15 * 60;

function base64UrlEncode(str: string): string {
  return btoa(str).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return atob(base64);
}

export function generateFakeJWT(username: string): string {
  const header = JSON.stringify({ alg: 'HS256', typ: 'JWT' });
  const now = Math.floor(Date.now() / 1000);
  const payload = JSON.stringify({
    sub: 'user-001',
    username,
    name: 'Galactic Administrator',
    email: 'admin@holocron.sw',
    role: 'admin',
    iat: now,
    exp: now + TOKEN_EXPIRY_SECONDS,
  });

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(payload);
  const fakeSignature = base64UrlEncode(`sig_${now}`);

  return `${encodedHeader}.${encodedPayload}.${fakeSignature}`;
}

export interface JWTPayload {
  username: string;
  name: string;
  email: string;
  role: 'admin';
  exp: number;
}

export function parseFakeJWT(token: string): JWTPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payloadStr = base64UrlDecode(parts[1]);
    return JSON.parse(payloadStr);
  } catch {
    return null;
  }
}
