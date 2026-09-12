import { NextRequest } from 'next/server';

const COOKIE_NAME = 'admin_session';

export function isAdminAuthenticated(req: NextRequest): boolean {
  const secret = process.env.ADMIN_API_SECRET;
  if (!secret) return false;
  return req.cookies.get(COOKIE_NAME)?.value === secret;
}
