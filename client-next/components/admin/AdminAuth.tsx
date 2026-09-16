'use client';

import React, { useState } from 'react';
import { Lock, Loader2 } from 'lucide-react';
import api from '@/lib/api';

interface AdminAuthProps {
  onLoginSuccess: () => void;
}

export const AdminAuth: React.FC<AdminAuthProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    try {
      // 1. Thử NestJS backend trước
      const res = await api.post('/auth/login', { username, password });
      const jwtToken = res.data.token;
      localStorage.setItem('token', jwtToken);
      onLoginSuccess();
      return;
    } catch {
      // 2. Dự phòng: Dùng Next.js cookie session
      try {
        const res = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          setLoginError(data.error || 'Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.');
          return;
        }
        onLoginSuccess();
      } catch {
        setLoginError('Không thể kết nối server. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface-1 border border-border rounded-3xl p-8 shadow-float">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-pink-500/10 text-pink-500 mx-auto mb-6">
          <Lock className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-bold font-sans text-center text-ink mb-1">
          Quản trị Portfolio
        </h1>
        <p className="text-xs text-center text-ink-muted mb-8">
          Đăng nhập để tùy biến toàn bộ nội dung, ảnh đại diện và dự án
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
              Tài khoản
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:outline-none focus:border-pink-500"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:outline-none focus:border-pink-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-ink text-surface-1 font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>Đăng nhập</span>
          </button>

          {loginError && (
            <p className="text-xs text-rose-500 font-medium text-center">{loginError}</p>
          )}
        </form>
      </div>
    </div>
  );
};
