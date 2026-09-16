'use client';

import React, { useState } from 'react';
import {
  Building2,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  Edit2,
  Trash2,
} from 'lucide-react';
import { defaultExperiences } from '@/lib/defaults';
import type { Profile, ExperienceItem } from '@/lib/types';

interface ExperienceTabProps {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  onSaveProfile: (e?: React.FormEvent) => void | Promise<void>;
  experiences: ExperienceItem[];
  setExperiences: React.Dispatch<React.SetStateAction<ExperienceItem[]>>;
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}

export const ExperienceTab: React.FC<ExperienceTabProps> = ({
  profile,
  setProfile,
  onSaveProfile,
  experiences,
  setExperiences,
  showToast,
}) => {
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [expForm, setExpForm] = useState({
    company: '',
    company_logo: '',
    role: '',
    period: '',
    location: '',
    type: 'Full-time',
    description: '',
    achievements: '',
    tech_stack: '',
  });

  const resetForm = () => {
    setEditingExpId(null);
    setExpForm({
      company: '',
      company_logo: '',
      role: '',
      period: '',
      location: '',
      type: 'Full-time',
      description: '',
      achievements: '',
      tech_stack: '',
    });
  };

  const handleEditExpClick = (exp: ExperienceItem) => {
    setEditingExpId(exp._id || null);
    setExpForm({
      company: exp.company || '',
      company_logo: exp.company_logo || '',
      role: exp.role || '',
      period: exp.period || '',
      location: exp.location || '',
      type: exp.type || 'Full-time',
      description: exp.description || '',
      achievements: Array.isArray(exp.achievements) ? exp.achievements.join('\n') : '',
      tech_stack: Array.isArray(exp.tech_stack) ? exp.tech_stack.join(', ') : '',
    });
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleSaveExperience = (e: React.FormEvent) => {
    e.preventDefault();
    const achievementsArray = expForm.achievements
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const techStackArray = expForm.tech_stack
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingExpId) {
      const updated = experiences.map((exp) => {
        if (exp._id === editingExpId) {
          return {
            ...exp,
            ...expForm,
            achievements: achievementsArray,
            tech_stack: techStackArray,
          };
        }
        return exp;
      });
      setExperiences(updated);
      localStorage.setItem('portfolio_experiences', JSON.stringify(updated));
      showToast(`Đã cập nhật mốc kinh nghiệm tại "${expForm.company}"!`, 'success');
      resetForm();
    } else {
      const newExp: ExperienceItem = {
        _id: `exp-${Date.now()}`,
        ...expForm,
        achievements: achievementsArray,
        tech_stack: techStackArray,
      };
      const updated = [newExp, ...experiences];
      setExperiences(updated);
      localStorage.setItem('portfolio_experiences', JSON.stringify(updated));
      showToast(`Đã thêm mốc kinh nghiệm tại "${expForm.company}"!`, 'success');
      resetForm();
    }
  };

  const handleDeleteExperience = (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa mốc kinh nghiệm này?')) return;
    const updated = experiences.filter((e) => e._id !== id);
    setExperiences(updated);
    localStorage.setItem('portfolio_experiences', JSON.stringify(updated));
    showToast('Đã xóa mốc kinh nghiệm thành công!', 'info');
  };

  const handleResetDefaultExperiences = () => {
    if (!confirm('Khôi phục danh sách mốc kinh nghiệm ban đầu?')) return;
    setExperiences(defaultExperiences);
    localStorage.setItem('portfolio_experiences', JSON.stringify(defaultExperiences));
    showToast('Đã khôi phục các mốc kinh nghiệm mặc định!', 'info');
  };

  return (
    <div className="space-y-8">
      {/* Header & Reset Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-ink flex items-center gap-2">
            <Building2 className="w-5 h-5 text-pink-500" />
            <span>Quản Lý Kinh Nghiệm Làm Việc (Companies &amp; Roles)</span>
          </h2>
          <p className="text-xs text-ink-muted mt-1">
            Các mốc kinh nghiệm tại các công ty cũ, vai trò, thành tựu và công nghệ sẽ được hiển thị trên trang chủ và đồng bộ CV.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetDefaultExperiences}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border text-xs font-mono font-semibold text-ink-muted hover:text-ink transition-colors self-start cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Khôi phục mẫu ban đầu</span>
        </button>
      </div>

      {/* Section Header Settings */}
      <div className="bg-surface-1 border border-border rounded-3xl p-6 sm:p-8 shadow-float">
        <h3 className="text-base font-bold text-ink mb-1 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-pink-500" />
          <span>Tiêu Đề &amp; Nhãn Section Kinh Nghiệm (Experience Header)</span>
        </h3>
        <p className="text-xs text-ink-muted mb-4">
          Tùy chỉnh huy hiệu, tiêu đề H2 và đoạn mô tả tổng quan sự nghiệp trên trang chủ.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Huy hiệu Section (Badge / Subtitle)
            </label>
            <input
              type="text"
              value={profile.experience_subtitle || ''}
              onChange={(e) => setProfile({ ...profile, experience_subtitle: e.target.value })}
              placeholder="HÀNH TRÌNH SỰ NGHIỆP"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Tiêu đề lớn Section (H2 Headline)
            </label>
            <input
              type="text"
              value={profile.experience_headline || ''}
              onChange={(e) => setProfile({ ...profile, experience_headline: e.target.value })}
              placeholder="Kinh Nghiệm Làm Việc & Dấu Ấn Chuyên Môn"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Mô tả tổng quan Section (Description)
            </label>
            <textarea
              rows={2}
              value={profile.experience_description || ''}
              onChange={(e) => setProfile({ ...profile, experience_description: e.target.value })}
              placeholder="Các vị trí và môi trường thực tế tôi đã cống hiến..."
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none resize-none"
            />
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-border flex justify-end">
          <button
            type="button"
            onClick={onSaveProfile}
            className="px-6 py-2.5 rounded-full bg-ink text-surface-1 font-bold text-xs hover:opacity-90 transition-all shadow-sm cursor-pointer"
          >
            Lưu Tiêu Đề Section Kinh Nghiệm
          </button>
        </div>
      </div>

      {/* Form Create / Edit Experience */}
      <form onSubmit={handleSaveExperience} className="bg-surface-1 border border-border rounded-3xl p-6 sm:p-8 shadow-float space-y-5">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h3 className="text-base font-bold text-ink flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span>{editingExpId ? 'Chỉnh Sửa Mốc Kinh Nghiệm' : 'Thêm Mốc Kinh Nghiệm Công Ty Mới'}</span>
          </h3>
          {editingExpId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-xs font-mono text-pink-500 hover:underline cursor-pointer"
            >
              Hủy chỉnh sửa (Tạo mới)
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">Tên công ty / Tổ chức *</label>
            <input
              type="text"
              required
              value={expForm.company}
              onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
              placeholder="Ví dụ: E-Commerce & Digital Agency"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">Vị trí / Chức danh đảm nhiệm *</label>
            <input
              type="text"
              required
              value={expForm.role}
              onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
              placeholder="Ví dụ: Front End & E-Commerce Developer"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">Thời gian làm việc (Period) *</label>
            <input
              type="text"
              required
              value={expForm.period}
              onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
              placeholder="Ví dụ: 2022 — 2023 hoặc 2023 — Hiện tại"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">Hình thức làm việc</label>
            <select
              value={expForm.type}
              onChange={(e) => setExpForm({ ...expForm, type: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            >
              <option value="Full-time">Full-time (Toàn thời gian)</option>
              <option value="Part-time">Part-time (Bán thời gian)</option>
              <option value="Contract">Contract (Hợp đồng)</option>
              <option value="Full-time / Freelance">Full-time / Freelance</option>
              <option value="Internship">Internship (Thực tập sinh)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">Địa điểm / Khu vực</label>
            <input
              type="text"
              value={expForm.location}
              onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
              placeholder="Ví dụ: TP. Hồ Chí Minh & Remote"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Logo công ty (URL Cloudinary hoặc tùy chọn)
            </label>
            <input
              type="text"
              value={expForm.company_logo}
              onChange={(e) => setExpForm({ ...expForm, company_logo: e.target.value })}
              placeholder="https://res.cloudinary.com/..."
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none font-mono text-xs"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Mô tả tổng quan về trách nhiệm &amp; môi trường làm việc *
            </label>
            <textarea
              rows={2}
              required
              value={expForm.description}
              onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
              placeholder="Chuyên sâu phát triển và tùy biến giao diện thương mại điện tử chuyên nghiệp cho các thương hiệu trên nền tảng Shopify và BigCommerce..."
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none leading-relaxed"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Đóng góp &amp; Kết quả then chốt (Mỗi dòng là 1 gạch đầu dòng thành tựu) *
            </label>
            <textarea
              rows={4}
              required
              value={expForm.achievements}
              onChange={(e) => setExpForm({ ...expForm, achievements: e.target.value })}
              placeholder="Tùy biến theme chuyên sâu sử dụng Liquid (Shopify) và Handlebars (BigCommerce)&#10;Xây dựng luồng giỏ hàng động tăng 28% giá trị đơn hàng&#10;Tối ưu Core Web Vitals đạt 90+ điểm trên di động"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none font-sans text-xs leading-relaxed"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Công nghệ sử dụng chính (Ngăn cách bằng dấu phẩy)
            </label>
            <input
              type="text"
              value={expForm.tech_stack}
              onChange={(e) => setExpForm({ ...expForm, tech_stack: e.target.value })}
              placeholder="ReactJS, Next.js, TypeScript, NestJS, TailwindCSS, Liquid"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none font-mono text-xs"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border flex justify-end gap-3">
          {editingExpId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2.5 rounded-full bg-surface-2 text-ink text-xs font-semibold hover:bg-surface-3 transition-colors cursor-pointer"
            >
              Hủy
            </button>
          )}

          <button
            type="submit"
            className="px-8 py-3 rounded-full bg-ink text-surface-1 font-bold text-xs hover:opacity-90 transition-all shadow-sm cursor-pointer"
          >
            {editingExpId ? 'Cập Nhật Mốc Kinh Nghiệm' : 'Thêm Mốc Kinh Nghiệm Mới'}
          </button>
        </div>
      </form>

      {/* List of Current Experiences */}
      <div className="space-y-4">
        <h3 className="font-sans font-bold text-base text-ink flex items-center gap-2">
          <span>Danh Sách Các Mốc Kinh Nghiệm Hiện Tại ({experiences.length})</span>
        </h3>

        <div className="space-y-4">
          {experiences.map((exp, idx) => (
            <div
              key={exp._id || idx}
              className="p-5 rounded-2xl bg-surface-1 border border-border shadow-xs hover:border-pink-500/40 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-500 font-mono text-[11px] font-bold border border-pink-500/20">
                      #{idx + 1}
                    </span>
                    <span className="font-bold text-base text-ink font-sans">{exp.role}</span>
                    {exp.type && (
                      <span className="px-2 py-0.5 rounded-md bg-surface-2 text-[10px] font-mono text-ink-subtle border border-border">
                        {exp.type}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-ink-muted flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                    <strong className="text-ink font-semibold">{exp.company}</strong>
                    {exp.location && <span>· {exp.location}</span>}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-semibold text-pink-500 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20 shrink-0">
                    {exp.period}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleEditExpClick(exp)}
                      className="p-2 rounded-xl bg-surface-2 hover:bg-pink-500/10 hover:text-pink-500 text-ink-muted transition-colors cursor-pointer"
                      title="Chỉnh sửa mốc kinh nghiệm này"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteExperience(exp._id || '')}
                      className="p-2 rounded-xl bg-surface-2 hover:bg-rose-500/10 text-rose-500 transition-colors cursor-pointer"
                      title="Xóa mốc kinh nghiệm này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-xs text-ink-muted leading-relaxed">{exp.description}</p>

              {/* Achievements Preview */}
              {exp.achievements && exp.achievements.length > 0 && (
                <div className="space-y-1">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-ink-subtle font-bold">
                    Đóng góp chính:
                  </p>
                  <ul className="space-y-1 text-xs text-ink">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech stack */}
              {exp.tech_stack && exp.tech_stack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {exp.tech_stack.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-lg bg-surface-2 border border-border font-mono text-[10px] text-ink-subtle"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
