'use client';

import React from 'react';
import { User } from 'lucide-react';
import type { Profile } from '@/lib/types';

interface AboutTabProps {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  skillsString: string;
  setSkillsString: React.Dispatch<React.SetStateAction<string>>;
  handleSaveProfile: (e: React.FormEvent) => void | Promise<void>;
}

export const AboutTab: React.FC<AboutTabProps> = ({
  profile,
  setProfile,
  skillsString,
  setSkillsString,
  handleSaveProfile,
}) => {
  return (
    <form onSubmit={handleSaveProfile} className="space-y-6">
      <div className="bg-surface-1 border border-border rounded-3xl p-6 sm:p-8 shadow-float">
        <h2 className="text-lg font-bold text-ink mb-1 flex items-center gap-2">
          <User className="w-4 h-4 text-pink-500" />
          <span>Cấu hình phần Giới thiệu &amp; Danh sách Kỹ năng</span>
        </h2>
        <p className="text-xs text-ink-muted mb-6">
          Nội dung này hiển thị tại mục About Me và lưới logo thương hiệu.
        </p>

        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">
                Nhãn phụ Section (Badge / Subtitle)
              </label>
              <input
                type="text"
                value={profile.about_subtitle || ''}
                onChange={(e) => setProfile({ ...profile, about_subtitle: e.target.value })}
                placeholder="Về Lập Trình Viên"
                className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">
                Tiêu đề lớn About (H2 Headline)
              </label>
              <input
                type="text"
                value={profile.about_headline || ''}
                onChange={(e) => setProfile({ ...profile, about_headline: e.target.value })}
                placeholder="Kỹ thuật chuẩn xác, tập trung vào trải nghiệm thực tế."
                className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Đoạn giới thiệu 1 (Bio Paragraph 1)
            </label>
            <textarea
              rows={4}
              required
              value={profile.about_text_1 || ''}
              onChange={(e) => setProfile({ ...profile, about_text_1: e.target.value })}
              placeholder="Là một nhà phát triển Full Stack tận tâm..."
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Đoạn giới thiệu 2 (Bio Paragraph 2)
            </label>
            <textarea
              rows={3}
              value={profile.about_text_2 || ''}
              onChange={(e) => setProfile({ ...profile, about_text_2: e.target.value })}
              placeholder="Ngoài Full Stack, tôi còn có chuyên môn vững chắc về..."
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Danh sách Kỹ năng cốt lõi (ngăn cách bằng dấu phẩy)
            </label>
            <textarea
              rows={3}
              value={skillsString}
              onChange={(e) => setSkillsString(e.target.value)}
              placeholder="ReactJS, NextJS, TypeScript, NestJS, NodeJS, ExpressJS, TailwindCSS..."
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none font-mono text-xs leading-relaxed"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Mỗi kỹ năng ngăn cách bằng dấu phẩy sẽ được tự động hiển thị thành một pill badge đẹp mắt.
            </p>
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-border flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-full bg-ink text-surface-1 font-bold text-sm hover:opacity-90 transition-all shadow-sm cursor-pointer"
          >
            Lưu toàn bộ thay đổi Giới thiệu
          </button>
        </div>
      </div>
    </form>
  );
};
