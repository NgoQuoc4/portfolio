'use client';

import React from 'react';
import { Sparkles, Loader2, UploadCloud } from 'lucide-react';
import type { Profile } from '@/lib/types';

interface HeroTabProps {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  handleSaveProfile: (e: React.FormEvent) => void | Promise<void>;
  uploading: string | null;
  handleCloudinaryUpload: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void | Promise<void>;
}

export const HeroTab: React.FC<HeroTabProps> = ({
  profile,
  setProfile,
  handleSaveProfile,
  uploading,
  handleCloudinaryUpload,
}) => {
  return (
    <form onSubmit={handleSaveProfile} className="space-y-6">
      <div className="bg-surface-1 border border-border rounded-3xl p-6 sm:p-8 shadow-float">
        <h2 className="text-lg font-bold text-ink mb-1 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-pink-500" />
          <span>Cấu hình phần Đầu trang &amp; Hero Section</span>
        </h2>
        <p className="text-xs text-ink-muted mb-6">
          Thông tin này xuất hiện ngay trên Preloader và Bàn làm việc số Hero.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Họ và tên hiển thị
            </label>
            <input
              type="text"
              required
              value={profile.name || ''}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder="Ngô Chí Quốc"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Chức danh / Nghề nghiệp
            </label>
            <input
              type="text"
              required
              value={profile.title || ''}
              onChange={(e) => setProfile({ ...profile, title: e.target.value })}
              placeholder="Front End / Full-stack Developer"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          {/* Avatar Upload with Cloudinary */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-mono text-slate-500">
                Ảnh đại diện (Avatar Photo)
              </label>
              <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-semibold text-pink-500 hover:text-pink-600">
                {uploading === 'profile_avatar' ? (
                  <span className="flex items-center gap-1">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Đang tải lên Cloudinary...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Tải ảnh từ máy lên Cloudinary (thư mục: ngoquoc_portfolio)</span>
                  </span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={uploading === 'profile_avatar'}
                  onChange={(e) => handleCloudinaryUpload(e, 'profile_avatar')}
                />
              </label>
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={profile.avatar_url || ''}
                onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
                placeholder="https://res.cloudinary.com/dguad3xyf/... hoặc nhấn tải lên ở góc phải"
                className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
              />
              {profile.avatar_url && (
                <img
                  src={profile.avatar_url}
                  alt="Avatar Preview"
                  className="w-11 h-11 rounded-full object-cover border-2 border-pink-500 ring-2 ring-pink-500/20 shrink-0 shadow-sm"
                />
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Tiêu đề lớn Hero (H1 Headline)
            </label>
            <textarea
              rows={2}
              value={profile.headline || ''}
              onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
              placeholder="I turn ambiguity into clear product direction & ship what matters with AI."
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none resize-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Đoạn giới thiệu ngắn Hero (Sub-intro)
            </label>
            <textarea
              rows={2}
              value={profile.hero_sub_text || ''}
              onChange={(e) => setProfile({ ...profile, hero_sub_text: e.target.value })}
              placeholder="Hi, I'm Ngô Chí Quốc. A dedicated Full Stack & Front End Developer..."
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Thanh trạng thái Hero (Status Pill)
            </label>
            <input
              type="text"
              value={profile.hero_status || ''}
              onChange={(e) => setProfile({ ...profile, hero_status: e.target.value })}
              placeholder="Available for high-impact roles & projects"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Tỉnh / Thành phố (Location)
            </label>
            <input
              type="text"
              value={profile.location || ''}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              placeholder="Hồ Chí Minh, Việt Nam"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Tiêu đề màn hình nạp (Preloader Title)
            </label>
            <input
              type="text"
              value={profile.preloader_title || ''}
              onChange={(e) => setProfile({ ...profile, preloader_title: e.target.value })}
              placeholder="NGO CHI QUOC"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Dòng phụ Preloader (Preloader Label)
            </label>
            <input
              type="text"
              value={profile.preloader_label || ''}
              onChange={(e) => setProfile({ ...profile, preloader_label: e.target.value })}
              placeholder="Portfolio · Ngô Chí Quốc"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-border flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-full bg-ink text-surface-1 font-bold text-sm hover:opacity-90 transition-all shadow-sm cursor-pointer"
          >
            Lưu toàn bộ thay đổi Hero
          </button>
        </div>
      </div>
    </form>
  );
};
