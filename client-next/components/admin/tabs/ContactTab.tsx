'use client';

import React from 'react';
import { Share2 } from 'lucide-react';
import type { Profile } from '@/lib/types';

interface ContactTabProps {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  handleSaveProfile: (e: React.FormEvent) => void | Promise<void>;
}

export const ContactTab: React.FC<ContactTabProps> = ({
  profile,
  setProfile,
  handleSaveProfile,
}) => {
  return (
    <form onSubmit={handleSaveProfile} className="space-y-6">
      <div className="bg-surface-1 border border-border rounded-3xl p-6 sm:p-8 shadow-float">
        <h2 className="text-lg font-bold text-ink mb-1 flex items-center gap-2">
          <Share2 className="w-4 h-4 text-pink-500" />
          <span>Cấu hình Liên hệ &amp; Mạng xã hội</span>
        </h2>
        <p className="text-xs text-ink-muted mb-6">
          Thông tin này điều khiển nút sao chép email, form liên hệ và các biểu tượng social footer.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Nhãn phụ Section (Badge / Subtitle)
            </label>
            <input
              type="text"
              value={profile.contact_subtitle || ''}
              onChange={(e) => setProfile({ ...profile, contact_subtitle: e.target.value })}
              placeholder="Liên Hệ"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Thanh trạng thái (Status Pill)
            </label>
            <input
              type="text"
              value={profile.contact_status || ''}
              onChange={(e) => setProfile({ ...profile, contact_status: e.target.value })}
              placeholder="Sẵn sàng hợp tác cho các vị trí, dự án mới & cơ hội kết nối."
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Tiêu đề lớn phần Contact (H2 Headline)
            </label>
            <input
              type="text"
              value={profile.contact_headline || ''}
              onChange={(e) => setProfile({ ...profile, contact_headline: e.target.value })}
              placeholder="Cùng nhau xây dựng sản phẩm chất lượng & bền vững"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Đoạn văn mô tả chi tiết (Description)
            </label>
            <textarea
              rows={2}
              value={profile.contact_sub_text || ''}
              onChange={(e) => setProfile({ ...profile, contact_sub_text: e.target.value })}
              placeholder="Bạn đang có ý tưởng mới, cần tư vấn giải pháp kỹ thuật tối ưu hay tìm kiếm một lập trình viên Full Stack tận tâm? Hãy kết nối với tôi qua các kênh bên dưới."
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">Email nhận tin nhắn</label>
            <input
              type="email"
              required
              value={profile.email || ''}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              placeholder="ngochiquoc140@gmail.com"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">Số điện thoại</label>
            <input
              type="text"
              value={profile.phone || ''}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              placeholder="0789898100"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Link đặt lịch hẹn (Google Calendar / Calendly)
            </label>
            <input
              type="text"
              value={profile.calendar_link || ''}
              onChange={(e) => setProfile({ ...profile, calendar_link: e.target.value })}
              placeholder="https://calendar.google.com"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">Link GitHub</label>
            <input
              type="text"
              value={profile.social_links?.github || ''}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  social_links: { ...(profile.social_links || {}), github: e.target.value },
                })
              }
              placeholder="https://github.com/NgoQuoc4"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">Link LinkedIn</label>
            <input
              type="text"
              value={profile.social_links?.linkedin || ''}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  social_links: { ...(profile.social_links || {}), linkedin: e.target.value },
                })
              }
              placeholder="https://linkedin.com"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">Link Twitter / X</label>
            <input
              type="text"
              value={profile.social_links?.twitter || ''}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  social_links: { ...(profile.social_links || {}), twitter: e.target.value },
                })
              }
              placeholder="https://x.com"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-border flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-full bg-ink text-surface-1 font-bold text-sm hover:opacity-90 transition-all shadow-sm cursor-pointer"
          >
            Lưu toàn bộ thay đổi Liên hệ
          </button>
        </div>
      </div>
    </form>
  );
};
