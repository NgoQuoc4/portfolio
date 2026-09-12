import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/serverAuth';

const COOKIE_NAME = 'admin_session';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 ngày

// GET: kiểm tra session hiện tại
export async function GET(req: NextRequest) {
  return NextResponse.json({ authenticated: isAdminAuthenticated(req) });
}

// POST: đăng nhập — validate password server-side, set HttpOnly cookie
export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const adminPassword = process.env.ADMIN_PASSWORD;
    const sessionToken = process.env.ADMIN_API_SECRET;

    if (!adminPassword || !sessionToken) {
      return NextResponse.json(
        { error: 'Server chưa được cấu hình đúng.' },
        { status: 500 }
      );
    }

    if (username !== 'admin' || password !== adminPassword) {
      return NextResponse.json(
        { error: 'Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.' },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ success: true });
    res.cookies.set(COOKIE_NAME, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: MAX_AGE,
      path: '/',
    });
    return res;
  } catch {
    return NextResponse.json({ error: 'Yêu cầu không hợp lệ.' }, { status: 400 });
  }
}

// DELETE: đăng xuất — xóa cookie
export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete(COOKIE_NAME);
  return res;
}
