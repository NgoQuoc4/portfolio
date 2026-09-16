'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import type { Profile } from '@/lib/types';

interface FooterTabProps {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  handleSaveProfile: (e: React.FormEvent) => void | Promise<void>;
}

export const FooterTab: React.FC<FooterTabProps> = ({
  profile,
  setProfile,
  handleSaveProfile,
}) => {
  return (
    <form onSubmit={handleSaveProfile} className="space-y-6">
      <div className="bg-surface-1 border border-border rounded-3xl p-6 sm:p-8 shadow-float">
        <h2 className="text-lg font-bold text-ink mb-1 flex items-center gap-2">
          <Globe className="w-4 h-4 text-pink-500" />
          <span>Cấu hình Chân Trang &amp; Dấu Ấn Thương Hiệu (Footer)</span>
        </h2>
        <p className="text-xs text-ink-muted mb-6">
          Tùy chỉnh chữ đồ họa thương hiệu khổng lồ, thông điệp bản quyền và trạng thái làm việc ở phần cuối website.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Chữ Thương Hiệu Khổng Lồ Đáy Trang (Giant Display Brand Text)
            </label>
            <input
              type="text"
              required
              value={profile.footer_brand_text || ''}
              onChange={(e) => setProfile({ ...profile, footer_brand_text: e.target.value })}
              placeholder="NGO CHI QUOC"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none uppercase font-bold tracking-wider"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Dòng chữ này được tự động co giãn theo chiều ngang toàn màn hình ở chân trang với hiệu ứng ambient glow ấn tượng.
            </p>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Dòng Bản Quyền (Copyright Text)
            </label>
            <input
              type="text"
              value={profile.footer_copyright || ''}
              onChange={(e) => setProfile({ ...profile, footer_copyright: e.target.value })}
              placeholder="© 2026 Ngô Chí Quốc. Bảo lưu mọi quyền."
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Trạng thái làm việc (Work Status Pill)
            </label>
            <input
              type="text"
              value={profile.footer_status || ''}
              onChange={(e) => setProfile({ ...profile, footer_status: e.target.value })}
              placeholder="Làm việc toàn cầu / Remote"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-border flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-full bg-ink text-surface-1 font-bold text-sm hover:opacity-90 transition-all shadow-sm cursor-pointer"
          >
            Lưu toàn bộ thay đổi Chân trang
          </button>
        </div>
      </div>
    </form>
  );
};
