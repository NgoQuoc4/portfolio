'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Sparkles,
  RefreshCw,
  Eye,
  EyeOff,
  ExternalLink,
  Check,
  User,
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Code2,
  GraduationCap,
  Globe,
} from 'lucide-react';
import api from '@/lib/api';
import { defaultResume } from '@/lib/defaults';
import type {
  ResumeData,
  ResumeExperienceItem,
  ResumeSkillCategory,
  ResumeProjectItem,
  ResumeEducationItem,
  Profile,
  ExperienceItem,
  ProjectItem,
} from '@/lib/types';

interface ResumeTabProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}

export const ResumeTab: React.FC<ResumeTabProps> = ({
  resumeData,
  setResumeData,
  profile,
  setProfile,
  experiences,
  projects,
  showToast,
}) => {
  // Resume Experience Item form state
  const [editingResumeExpIdx, setEditingResumeExpIdx] = useState<number | null>(null);
  const [resumeExpForm, setResumeExpForm] = useState<{
    role: string;
    company: string;
    period: string;
    bullets: string;
    hidden: boolean;
  }>({
    role: '',
    company: '',
    period: '',
    bullets: '',
    hidden: false,
  });

  // Resume Project Item form state
  const [editingResumeProjIdx, setEditingResumeProjIdx] = useState<number | null>(null);
  const [resumeProjForm, setResumeProjForm] = useState<{
    title: string;
    category: string;
    live_demo: string;
    github_link: string;
    description: string;
    tech_stack: string;
    hidden: boolean;
  }>({
    title: '',
    category: 'Full-stack',
    live_demo: '',
    github_link: '',
    description: '',
    tech_stack: '',
    hidden: false,
  });

  // Resume Education Item form state
  const [editingResumeEduIdx, setEditingResumeEduIdx] = useState<number | null>(null);
  const [resumeEduForm, setResumeEduForm] = useState<{
    badge: string;
    title: string;
    subtitle: string;
    description: string;
  }>({
    badge: 'Đại Học',
    title: '',
    subtitle: '',
    description: '',
  });

  // Resume Skill Category form state
  const [editingResumeSkillIdx, setEditingResumeSkillIdx] = useState<number | null>(null);
  const [resumeSkillForm, setResumeSkillForm] = useState<{
    title: string;
    skills: string;
  }>({
    title: '',
    skills: '',
  });

  const handleSaveResume = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    localStorage.setItem('portfolio_resume', JSON.stringify(resumeData));

    try {
      const updatedProf = { ...profile, resume_data: resumeData };
      setProfile(updatedProf);
      localStorage.setItem('portfolio_profile', JSON.stringify(updatedProf));
      await api.put('/profile', updatedProf).catch(() => null);
    } catch (err) {
      console.warn('Backend sync deferred:', err);
    }

    showToast('Đã lưu và cập nhật cấu hình trang Resume (/resume) thành công!', 'success');
  };

  const handleResetDefaultResume = () => {
    if (!confirm('Bạn có chắc chắn muốn khôi phục toàn bộ nội dung CV về trạng thái mặc định ban đầu?')) return;
    setResumeData(defaultResume);
    localStorage.setItem('portfolio_resume', JSON.stringify(defaultResume));
    showToast('Đã khôi phục trang Resume về dữ liệu mẫu ban đầu!', 'info');
  };

  const handleSyncResumeFromExperiences = () => {
    if (!confirm('Đồng bộ các mốc từ tab Kinh nghiệm làm việc sang trang Resume?')) return;
    const converted: ResumeExperienceItem[] = experiences.map((exp) => ({
      role: exp.role,
      company: exp.company,
      period: exp.period,
      bullets:
        Array.isArray(exp.achievements) && exp.achievements.length > 0
          ? exp.achievements
          : exp.description
          ? [exp.description]
          : [],
    }));
    setResumeData((prev) => ({ ...prev, experiences: converted }));
    showToast('Đã đồng bộ kinh nghiệm sang CV! Hãy nhấn "Lưu Cấu Hình Resume" để hoàn tất.', 'info');
  };

  const handleSyncResumeFromProjects = () => {
    if (!confirm('Đồng bộ các dự án tiêu biểu sang trang Resume?')) return;
    const converted: ResumeProjectItem[] = projects.map((p) => ({
      title: p.title,
      category: p.category || 'Full-stack',
      live_demo: p.live_demo || '',
      github_link: p.github_link || '',
      description: p.description || '',
      tech_stack: Array.isArray(p.tech_stack) ? p.tech_stack : [],
    }));
    setResumeData((prev) => ({ ...prev, projects: converted }));
    showToast('Đã đồng bộ dự án sang CV! Hãy nhấn "Lưu Cấu Hình Resume" để hoàn tất.', 'info');
  };

  const handleSyncResumeFromHero = () => {
    setResumeData((prev) => ({
      ...prev,
      name: profile.name || prev.name,
      title: profile.title || prev.title,
      avatar_url: profile.avatar_url || prev.avatar_url,
      location: profile.location || prev.location,
      email: profile.email || prev.email,
      phone: profile.phone || prev.phone,
      github_url: profile.social_links?.github || prev.github_url,
    }));
    showToast('Đã sao chép thông tin cá nhân & liên hệ từ Tab 1 sang CV!', 'info');
  };

  // Resume Experience CRUD
  const handleSaveResumeExp = (e: React.FormEvent) => {
    e.preventDefault();
    const bulletsArray = resumeExpForm.bullets
      .split('\n')
      .map((b) => b.trim())
      .filter(Boolean);

    const currentList = resumeData.experiences || [];
    if (editingResumeExpIdx !== null) {
      const updated = currentList.map((item, idx) => {
        if (idx === editingResumeExpIdx) {
          return {
            role: resumeExpForm.role,
            company: resumeExpForm.company,
            period: resumeExpForm.period,
            bullets: bulletsArray,
            hidden: resumeExpForm.hidden,
          };
        }
        return item;
      });
      setResumeData((prev) => ({ ...prev, experiences: updated }));
      setEditingResumeExpIdx(null);
      showToast(`Đã cập nhật mốc kinh nghiệm "${resumeExpForm.role}"!`, 'success');
    } else {
      const newItem: ResumeExperienceItem = {
        role: resumeExpForm.role,
        company: resumeExpForm.company,
        period: resumeExpForm.period,
        bullets: bulletsArray,
        hidden: resumeExpForm.hidden,
      };
      setResumeData((prev) => ({ ...prev, experiences: [newItem, ...currentList] }));
      showToast(`Đã thêm mốc kinh nghiệm "${resumeExpForm.role}" vào CV!`, 'success');
    }

    setResumeExpForm({ role: '', company: '', period: '', bullets: '', hidden: false });
  };

  const handleToggleResumeExpHidden = (targetIdx: number) => {
    const currentList = resumeData.experiences || [];
    const target = currentList[targetIdx];
    if (!target) return;

    const nextHidden = !target.hidden;
    const updated = currentList.map((item, idx) => (idx === targetIdx ? { ...item, hidden: nextHidden } : item));
    const nextResume = { ...resumeData, experiences: updated };
    setResumeData(nextResume);
    localStorage.setItem('portfolio_resume', JSON.stringify(nextResume));
    api.put('/profile', { resume_data: nextResume }).catch(() => null);
    showToast(
      nextHidden
        ? `Đã ẨN mốc kinh nghiệm "${target.role}" khỏi trang CV!`
        : `Đã HIỂN THỊ mốc kinh nghiệm "${target.role}" trên trang CV!`,
      'success'
    );
  };

  const handleEditResumeExp = (idx: number) => {
    const item = (resumeData.experiences || [])[idx];
    if (!item) return;
    setEditingResumeExpIdx(idx);
    setResumeExpForm({
      role: item.role || '',
      company: item.company || '',
      period: item.period || '',
      bullets: Array.isArray(item.bullets) ? item.bullets.join('\n') : '',
      hidden: !!item.hidden,
    });
  };

  const handleDeleteResumeExp = (idx: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa mốc kinh nghiệm này khỏi CV?')) return;
    const updated = (resumeData.experiences || []).filter((_, i) => i !== idx);
    setResumeData((prev) => ({ ...prev, experiences: updated }));
    if (editingResumeExpIdx === idx) {
      setEditingResumeExpIdx(null);
      setResumeExpForm({ role: '', company: '', period: '', bullets: '', hidden: false });
    }
    showToast('Đã xóa mốc kinh nghiệm khỏi CV!', 'info');
  };

  // Resume Skills CRUD
  const handleSaveResumeSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const currentList = resumeData.skill_categories || [];
    if (editingResumeSkillIdx !== null) {
      const updated = currentList.map((item, idx) => {
        if (idx === editingResumeSkillIdx) {
          return {
            title: resumeSkillForm.title,
            skills: resumeSkillForm.skills,
          };
        }
        return item;
      });
      setResumeData((prev) => ({ ...prev, skill_categories: updated }));
      setEditingResumeSkillIdx(null);
      showToast(`Đã cập nhật nhóm kỹ năng "${resumeSkillForm.title}"!`, 'success');
    } else {
      const newItem: ResumeSkillCategory = {
        title: resumeSkillForm.title,
        skills: resumeSkillForm.skills,
      };
      setResumeData((prev) => ({ ...prev, skill_categories: [...currentList, newItem] }));
      showToast(`Đã thêm nhóm kỹ năng "${resumeSkillForm.title}"!`, 'success');
    }

    setResumeSkillForm({ title: '', skills: '' });
  };

  const handleDeleteResumeSkill = (idx: number) => {
    if (!confirm('Xóa nhóm kỹ năng này khỏi CV?')) return;
    const updated = (resumeData.skill_categories || []).filter((_, i) => i !== idx);
    setResumeData((prev) => ({ ...prev, skill_categories: updated }));
    showToast('Đã xóa nhóm kỹ năng!', 'info');
  };

  // Resume Projects CRUD
  const handleSaveResumeProj = (e: React.FormEvent) => {
    e.preventDefault();
    const stackArray = resumeProjForm.tech_stack
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const currentList = resumeData.projects || [];
    if (editingResumeProjIdx !== null) {
      const updated = currentList.map((item, idx) => {
        if (idx === editingResumeProjIdx) {
          return {
            title: resumeProjForm.title,
            category: resumeProjForm.category,
            live_demo: resumeProjForm.live_demo,
            github_link: resumeProjForm.github_link,
            description: resumeProjForm.description,
            tech_stack: stackArray,
            hidden: resumeProjForm.hidden,
          };
        }
        return item;
      });
      setResumeData((prev) => ({ ...prev, projects: updated }));
      setEditingResumeProjIdx(null);
      showToast(`Đã cập nhật dự án CV "${resumeProjForm.title}"!`, 'success');
    } else {
      const newItem: ResumeProjectItem = {
        title: resumeProjForm.title,
        category: resumeProjForm.category,
        live_demo: resumeProjForm.live_demo,
        github_link: resumeProjForm.github_link,
        description: resumeProjForm.description,
        tech_stack: stackArray,
        hidden: resumeProjForm.hidden,
      };
      setResumeData((prev) => ({ ...prev, projects: [...currentList, newItem] }));
      showToast(`Đã thêm dự án "${resumeProjForm.title}" vào CV!`, 'success');
    }

    setResumeProjForm({
      title: '',
      category: 'Full-stack',
      live_demo: '',
      github_link: '',
      description: '',
      tech_stack: '',
      hidden: false,
    });
  };

  const handleToggleResumeProjHidden = (targetIdx: number) => {
    const currentList = resumeData.projects || [];
    const target = currentList[targetIdx];
    if (!target) return;

    const nextHidden = !target.hidden;
    const updated = currentList.map((item, idx) => (idx === targetIdx ? { ...item, hidden: nextHidden } : item));
    const nextResume = { ...resumeData, projects: updated };
    setResumeData(nextResume);
    localStorage.setItem('portfolio_resume', JSON.stringify(nextResume));
    api.put('/profile', { resume_data: nextResume }).catch(() => null);
    showToast(
      nextHidden
        ? `Đã ẨN dự án "${target.title}" khỏi trang CV!`
        : `Đã HIỂN THỊ dự án "${target.title}" trên trang CV!`,
      'success'
    );
  };

  const handleEditResumeProj = (idx: number) => {
    const item = (resumeData.projects || [])[idx];
    if (!item) return;
    setEditingResumeProjIdx(idx);
    setResumeProjForm({
      title: item.title || '',
      category: item.category || 'Full-stack',
      live_demo: item.live_demo || '',
      github_link: item.github_link || '',
      description: item.description || '',
      tech_stack: Array.isArray(item.tech_stack) ? item.tech_stack.join(', ') : '',
      hidden: !!item.hidden,
    });
  };

  const handleDeleteResumeProj = (idx: number) => {
    if (!confirm('Xóa dự án này khỏi trang CV?')) return;
    const updated = (resumeData.projects || []).filter((_, i) => i !== idx);
    setResumeData((prev) => ({ ...prev, projects: updated }));
    if (editingResumeProjIdx === idx) {
      setEditingResumeProjIdx(null);
      setResumeProjForm({
        title: '',
        category: 'Full-stack',
        live_demo: '',
        github_link: '',
        description: '',
        tech_stack: '',
        hidden: false,
      });
    }
    showToast('Đã xóa dự án khỏi CV!', 'info');
  };

  // Resume Education CRUD
  const handleSaveResumeEdu = (e: React.FormEvent) => {
    e.preventDefault();
    const currentList = resumeData.education || [];
    if (editingResumeEduIdx !== null) {
      const updated = currentList.map((item, idx) => {
        if (idx === editingResumeEduIdx) {
          return {
            badge: resumeEduForm.badge,
            title: resumeEduForm.title,
            subtitle: resumeEduForm.subtitle,
            description: resumeEduForm.description,
          };
        }
        return item;
      });
      setResumeData((prev) => ({ ...prev, education: updated }));
      setEditingResumeEduIdx(null);
      showToast(`Đã cập nhật mục học vấn "${resumeEduForm.title}"!`, 'success');
    } else {
      const newItem: ResumeEducationItem = {
        badge: resumeEduForm.badge,
        title: resumeEduForm.title,
        subtitle: resumeEduForm.subtitle,
        description: resumeEduForm.description,
      };
      setResumeData((prev) => ({ ...prev, education: [...currentList, newItem] }));
      showToast(`Đã thêm mục học vấn "${resumeEduForm.title}" vào CV!`, 'success');
    }

    setResumeEduForm({
      badge: 'Đại Học',
      title: '',
      subtitle: '',
      description: '',
    });
  };

  const handleEditResumeEdu = (idx: number) => {
    const item = (resumeData.education || [])[idx];
    if (!item) return;
    setEditingResumeEduIdx(idx);
    setResumeEduForm({
      badge: item.badge || 'Đại Học',
      title: item.title || '',
      subtitle: item.subtitle || '',
      description: item.description || '',
    });
  };

  const handleDeleteResumeEdu = (idx: number) => {
    if (!confirm('Xóa mục học vấn này khỏi CV?')) return;
    const updated = (resumeData.education || []).filter((_, i) => i !== idx);
    setResumeData((prev) => ({ ...prev, education: updated }));
    if (editingResumeEduIdx === idx) {
      setEditingResumeEduIdx(null);
      setResumeEduForm({
        badge: 'Đại Học',
        title: '',
        subtitle: '',
        description: '',
      });
    }
    showToast('Đã xóa mục học vấn khỏi CV!', 'info');
  };

  return (
    <div className="space-y-8">
      {/* Header & Quick Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-ink flex items-center gap-2">
            <FileText className="w-5 h-5 text-pink-500" />
            <span>Cấu Hình Trang Resume / CV (/resume)</span>
          </h2>
          <p className="text-xs text-ink-muted mt-1">
            Tùy chỉnh toàn bộ thông tin cá nhân, liên hệ, tóm tắt, kinh nghiệm, kỹ năng, dự án và học vấn xuất hiện trên trang CV.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleSyncResumeFromHero}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border text-xs font-mono font-semibold text-ink-muted hover:text-ink transition-colors cursor-pointer"
            title="Sao chép tên, title, avatar, email, phone từ Tab Hero"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Đồng bộ từ Hero</span>
          </button>

          <button
            type="button"
            onClick={handleResetDefaultResume}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border text-xs font-mono font-semibold text-ink-muted hover:text-ink transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Khôi phục mẫu CV</span>
          </button>

          <Link
            href="/resume"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-pink-500/10 text-pink-500 border border-pink-500/20 text-xs font-semibold hover:bg-pink-500/20 transition-all shadow-xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Xem trang CV</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          <button
            type="button"
            onClick={() => handleSaveResume()}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-ink text-surface-1 text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Lưu Cấu Hình Resume</span>
          </button>
        </div>
      </div>

      {/* CARD 1: PERSONAL & CONTACT INFO */}
      <div className="bg-surface-1 border border-border rounded-3xl p-6 sm:p-8 shadow-float space-y-6">
        <h3 className="text-base font-bold text-ink mb-1 flex items-center gap-2">
          <User className="w-4 h-4 text-pink-500" />
          <span>1. Thông Tin Định Danh &amp; Liên Hệ CV</span>
        </h3>
        <p className="text-xs text-ink-muted mb-4">
          Hiển thị ở phần đầu (Header) của trang Resume. Có thể tùy chỉnh link tải file PDF trực tiếp.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">Họ và tên hiển thị</label>
            <input
              type="text"
              value={resumeData.name || ''}
              onChange={(e) => setResumeData({ ...resumeData, name: e.target.value })}
              placeholder="Ngô Chí Quốc"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">Chức danh / Vị trí trên CV</label>
            <input
              type="text"
              value={resumeData.title || ''}
              onChange={(e) => setResumeData({ ...resumeData, title: e.target.value })}
              placeholder="Lập trình viên Full Stack & Front End"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">Địa chỉ / Tỉnh thành</label>
            <input
              type="text"
              value={resumeData.location || ''}
              onChange={(e) => setResumeData({ ...resumeData, location: e.target.value })}
              placeholder="TP. Hồ Chí Minh, Việt Nam"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">Email liên hệ CV</label>
            <input
              type="email"
              value={resumeData.email || ''}
              onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
              placeholder="ngochiquoc140@gmail.com"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">Số điện thoại CV</label>
            <input
              type="text"
              value={resumeData.phone || ''}
              onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
              placeholder="0789898100"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">Link GitHub</label>
            <input
              type="text"
              value={resumeData.github_url || ''}
              onChange={(e) => setResumeData({ ...resumeData, github_url: e.target.value })}
              placeholder="https://github.com/NgoQuoc4"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">Link Website Cá Nhân</label>
            <input
              type="text"
              value={resumeData.website_url || ''}
              onChange={(e) => setResumeData({ ...resumeData, website_url: e.target.value })}
              placeholder="https://ngoquoc.vercel.app"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Link Tải File PDF Trực Tiếp (Tùy chọn)
            </label>
            <input
              type="text"
              value={resumeData.pdf_url || ''}
              onChange={(e) => setResumeData({ ...resumeData, pdf_url: e.target.value })}
              placeholder="https://res.cloudinary.com/.../cv.pdf (hoặc để trống)"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
            <p className="text-[11px] text-ink-subtle mt-1 font-mono">
              * Nếu để trống, trang CV dùng nút In / Lưu PDF mặc định của trình duyệt.
            </p>
          </div>

          {/* Avatar for Resume */}
          <div className="md:col-span-2 pt-2 border-t border-border">
            <label className="block text-xs font-mono text-slate-500 mb-2">Ảnh đại diện trên CV</label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {resumeData.avatar_url && (
                <img
                  src={resumeData.avatar_url}
                  alt="CV Avatar"
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-pink-500 shadow-sm"
                />
              )}
              <div className="flex-1 space-y-2 w-full">
                <input
                  type="text"
                  value={resumeData.avatar_url || ''}
                  onChange={(e) => setResumeData({ ...resumeData, avatar_url: e.target.value })}
                  placeholder="URL ảnh đại diện CV..."
                  className="w-full px-4 py-2 rounded-xl bg-surface-2 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none"
                />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (profile.avatar_url) {
                        setResumeData({ ...resumeData, avatar_url: profile.avatar_url });
                        showToast('Đã sao chép ảnh đại diện từ Hero!', 'info');
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-surface-2 hover:bg-surface-3 border border-border text-xs font-mono text-ink-muted hover:text-ink cursor-pointer"
                  >
                    Lấy từ Tab Hero
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CARD 2: EXECUTIVE SUMMARY */}
      <div className="bg-surface-1 border border-border rounded-3xl p-6 sm:p-8 shadow-float space-y-4">
        <h3 className="text-base font-bold text-ink mb-1 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-pink-500" />
          <span>2. Tóm Tắt Chuyên Môn (Executive Summary)</span>
        </h3>
        <p className="text-xs text-ink-muted mb-3">
          Mô tả ngắn gọn về kinh nghiệm, định hướng và thế mạnh nổi bật của bạn.
        </p>

        <div>
          <label className="block text-xs font-mono text-slate-500 mb-1">Tiêu đề mục</label>
          <input
            type="text"
            value={resumeData.summary_title || ''}
            onChange={(e) => setResumeData({ ...resumeData, summary_title: e.target.value })}
            placeholder="Tóm tắt chuyên môn"
            className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-500 mb-1">Đoạn giới thiệu 1</label>
          <textarea
            rows={3}
            value={resumeData.summary_p1 || ''}
            onChange={(e) => setResumeData({ ...resumeData, summary_p1: e.target.value })}
            placeholder="Là một nhà phát triển Full Stack tận tâm..."
            className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-500 mb-1">Đoạn giới thiệu 2 (Tùy chọn)</label>
          <textarea
            rows={3}
            value={resumeData.summary_p2 || ''}
            onChange={(e) => setResumeData({ ...resumeData, summary_p2: e.target.value })}
            placeholder="Ngoài Full Stack, tôi còn có chuyên môn vững chắc về..."
            className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none resize-none"
          />
        </div>
      </div>

      {/* CARD 3: WORK EXPERIENCES */}
      <div className="bg-surface-1 border border-border rounded-3xl p-6 sm:p-8 shadow-float space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
          <div>
            <h3 className="text-base font-bold text-ink mb-1 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-pink-500" />
              <span>3. Kinh Nghiệm Làm Việc (Work Experience)</span>
            </h3>
            <p className="text-xs text-ink-muted">
              Các vị trí, công ty và thành tựu gạch đầu dòng xuất hiện trên Resume.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-center flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                resumeData.show_experiences !== false
                  ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  resumeData.show_experiences !== false ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
              />
              {resumeData.show_experiences !== false ? 'Đang hiển thị trên CV' : 'Đang ẩn trên CV'}
            </span>

            <button
              type="button"
              onClick={() => {
                const nextVal = resumeData.show_experiences === false ? true : false;
                const updated = { ...resumeData, show_experiences: nextVal };
                setResumeData(updated);
                localStorage.setItem('portfolio_resume', JSON.stringify(updated));
                api.put('/profile', { resume_data: updated }).catch(() => null);
                showToast(
                  nextVal
                    ? 'Đã BẬT hiển thị mục Kinh nghiệm làm việc trên trang CV'
                    : 'Đã ẨN mục Kinh nghiệm làm việc khỏi trang CV',
                  'success'
                );
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                resumeData.show_experiences !== false
                  ? 'bg-surface-2 border border-border text-ink hover:border-rose-500/40 hover:text-rose-500'
                  : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm'
              }`}
            >
              {resumeData.show_experiences !== false ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Ẩn khỏi CV</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Hiện lên CV</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleSyncResumeFromExperiences}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border text-xs font-mono font-semibold text-ink hover:text-pink-500 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Đồng bộ từ Tab Kinh nghiệm</span>
            </button>
          </div>
        </div>

        {/* Experience Section Title */}
        <div>
          <label className="block text-xs font-mono text-slate-500 mb-1">Tiêu đề mục</label>
          <input
            type="text"
            value={resumeData.experiences_title || ''}
            onChange={(e) => setResumeData({ ...resumeData, experiences_title: e.target.value })}
            placeholder="Kinh nghiệm làm việc (Work Experience)"
            className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
          />
        </div>

        {/* Form Add/Edit Experience */}
        <form onSubmit={handleSaveResumeExp} className="p-5 rounded-2xl bg-surface-2 border border-border space-y-4">
          <h4 className="text-xs font-mono font-bold text-pink-500 uppercase tracking-wider flex items-center gap-1.5">
            {editingResumeExpIdx !== null ? <Edit2 className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            <span>{editingResumeExpIdx !== null ? 'Chỉnh Sửa Mốc Kinh Nghiệm CV' : 'Thêm Mốc Kinh Nghiệm Mới'}</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">Vị trí / Chức danh *</label>
              <input
                type="text"
                required
                value={resumeExpForm.role}
                onChange={(e) => setResumeExpForm({ ...resumeExpForm, role: e.target.value })}
                placeholder="Front End Developer"
                className="w-full px-3.5 py-2 rounded-xl bg-surface-1 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">Công ty / Tổ chức *</label>
              <input
                type="text"
                required
                value={resumeExpForm.company}
                onChange={(e) => setResumeExpForm({ ...resumeExpForm, company: e.target.value })}
                placeholder="Digital Agency & E-Commerce"
                className="w-full px-3.5 py-2 rounded-xl bg-surface-1 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">Thời gian làm việc *</label>
              <input
                type="text"
                required
                value={resumeExpForm.period}
                onChange={(e) => setResumeExpForm({ ...resumeExpForm, period: e.target.value })}
                placeholder="2022 — 2023"
                className="w-full px-3.5 py-2 rounded-xl bg-surface-1 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xs font-mono text-slate-500 mb-1">
                Các thành tựu &amp; đóng góp (Mỗi dòng là 1 gạch đầu dòng) *
              </label>
              <textarea
                rows={4}
                required
                value={resumeExpForm.bullets}
                onChange={(e) => setResumeExpForm({ ...resumeExpForm, bullets: e.target.value })}
                placeholder="Tùy biến theme chuyên sâu sử dụng React và Next.js&#10;Tối ưu Core Web Vitals đạt 95+ điểm&#10;Xây dựng hệ thống quản trị dữ liệu"
                className="w-full px-3.5 py-2 rounded-xl bg-surface-1 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none leading-relaxed"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-ink select-none">
              <input
                type="checkbox"
                checked={!resumeExpForm.hidden}
                onChange={(e) => setResumeExpForm({ ...resumeExpForm, hidden: !e.target.checked })}
                className="w-4 h-4 rounded text-pink-500 focus:ring-pink-500 cursor-pointer"
              />
              <span>Hiển thị mốc kinh nghiệm này trên trang CV</span>
            </label>

            <div className="flex items-center gap-2">
              {editingResumeExpIdx !== null && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingResumeExpIdx(null);
                    setResumeExpForm({ role: '', company: '', period: '', bullets: '', hidden: false });
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-ink-muted hover:text-ink cursor-pointer"
                >
                  Hủy bỏ
                </button>
              )}
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-ink text-surface-1 text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
              >
                {editingResumeExpIdx !== null ? 'Cập Nhật Mốc Kinh Nghiệm' : 'Thêm Vào CV'}
              </button>
            </div>
          </div>
        </form>

        {/* List of Experiences */}
        <div className="space-y-4">
          {(resumeData.experiences || []).map((exp, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl bg-surface-2 border transition-all flex items-start justify-between gap-4 ${
                exp.hidden ? 'border-dashed border-border opacity-70 bg-surface-2/60' : 'border-border'
              }`}
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`font-bold text-sm ${exp.hidden ? 'text-ink-muted line-through' : 'text-ink'}`}>
                    {exp.role}
                  </span>
                  <span className="text-xs text-pink-500 font-mono">@{exp.company}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-1 text-ink-muted border border-border">
                    {exp.period}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      exp.hidden
                        ? 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                        : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                    }`}
                  >
                    {exp.hidden ? 'Đang ẩn trên CV' : 'Đang hiển thị'}
                  </span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="text-xs text-ink-muted space-y-1 list-disc list-inside mt-2 leading-relaxed">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggleResumeExpHidden(idx)}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    exp.hidden
                      ? 'text-rose-500 bg-rose-500/10 hover:bg-rose-500/20'
                      : 'text-emerald-600 bg-emerald-500/10 hover:bg-emerald-500/20'
                  }`}
                  title={
                    exp.hidden
                      ? 'Mốc kinh nghiệm đang ẩn. Bấm để hiển thị trên CV'
                      : 'Mốc kinh nghiệm đang hiển thị. Bấm để ẩn khỏi CV'
                  }
                >
                  {exp.hidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => handleEditResumeExp(idx)}
                  className="p-1.5 rounded-lg text-ink-muted hover:text-pink-500 hover:bg-surface-1 transition-colors cursor-pointer"
                  title="Chỉnh sửa"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteResumeExp(idx)}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  title="Xóa"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CARD 4: TECHNICAL SKILLS CATEGORIES */}
      <div className="bg-surface-1 border border-border rounded-3xl p-6 sm:p-8 shadow-float space-y-6">
        <h3 className="text-base font-bold text-ink mb-1 flex items-center gap-2">
          <Code2 className="w-4 h-4 text-pink-500" />
          <span>4. Kỹ Năng Kỹ Thuật Theo Nhóm (Technical Skills)</span>
        </h3>
        <p className="text-xs text-ink-muted mb-4">
          Phân loại kỹ năng theo các mảng chuyên môn (Frontend, Backend, E-Commerce, Architecture...).
        </p>

        <div>
          <label className="block text-xs font-mono text-slate-500 mb-1">Tiêu đề mục</label>
          <input
            type="text"
            value={resumeData.skills_title || ''}
            onChange={(e) => setResumeData({ ...resumeData, skills_title: e.target.value })}
            placeholder="Kỹ năng kỹ thuật (Technical Skills)"
            className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
          />
        </div>

        {/* Form Add/Edit Skill Category */}
        <form onSubmit={handleSaveResumeSkill} className="p-5 rounded-2xl bg-surface-2 border border-border space-y-4">
          <h4 className="text-xs font-mono font-bold text-pink-500 uppercase tracking-wider flex items-center gap-1.5">
            {editingResumeSkillIdx !== null ? <Edit2 className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            <span>{editingResumeSkillIdx !== null ? 'Chỉnh Sửa Nhóm Kỹ Năng' : 'Thêm Nhóm Kỹ Năng Mới'}</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">Tên nhóm kỹ năng</label>
              <input
                type="text"
                required
                value={resumeSkillForm.title}
                onChange={(e) => setResumeSkillForm({ ...resumeSkillForm, title: e.target.value })}
                placeholder="Frontend Engineering"
                className="w-full px-3.5 py-2 rounded-xl bg-surface-1 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-mono text-slate-500 mb-1">Danh sách công nghệ / kỹ năng</label>
              <input
                type="text"
                required
                value={resumeSkillForm.skills}
                onChange={(e) => setResumeSkillForm({ ...resumeSkillForm, skills: e.target.value })}
                placeholder="ReactJS, NextJS, TypeScript, TailwindCSS, Redux Toolkit..."
                className="w-full px-3.5 py-2 rounded-xl bg-surface-1 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            {editingResumeSkillIdx !== null && (
              <button
                type="button"
                onClick={() => {
                  setEditingResumeSkillIdx(null);
                  setResumeSkillForm({ title: '', skills: '' });
                }}
                className="px-4 py-2 rounded-xl text-xs font-mono text-ink-muted hover:text-ink cursor-pointer"
              >
                Hủy bỏ
              </button>
            )}
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-ink text-surface-1 text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
            >
              {editingResumeSkillIdx !== null ? 'Cập Nhật Nhóm Kỹ Năng' : 'Thêm Nhóm Kỹ Năng'}
            </button>
          </div>
        </form>

        {/* List of Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(resumeData.skill_categories || []).map((cat, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-surface-2 border border-border flex items-start justify-between gap-3">
              <div>
                <span className="font-bold text-ink text-sm block mb-1">{cat.title}</span>
                <p className="text-xs font-mono text-ink-muted leading-relaxed">{cat.skills}</p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setEditingResumeSkillIdx(idx);
                    setResumeSkillForm({ title: cat.title, skills: cat.skills });
                  }}
                  className="p-1.5 rounded-lg text-ink-muted hover:text-pink-500 transition-colors cursor-pointer"
                  title="Sửa"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteResumeSkill(idx)}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  title="Xóa"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CARD 5: FEATURED PROJECTS */}
      <div className="bg-surface-1 border border-border rounded-3xl p-6 sm:p-8 shadow-float space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
          <div>
            <h3 className="text-base font-bold text-ink mb-1 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-pink-500" />
              <span>5. Dự Án Tiêu Biểu Trên CV (Featured Projects)</span>
            </h3>
            <p className="text-xs text-ink-muted">
              Các dự án nổi bật, link demo và công nghệ sử dụng hiển thị trong CV.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-center flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                resumeData.show_projects !== false
                  ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  resumeData.show_projects !== false ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
              />
              {resumeData.show_projects !== false ? 'Đang hiển thị trên CV' : 'Đang ẩn khỏi CV'}
            </span>

            <button
              type="button"
              onClick={() => {
                const nextVal = resumeData.show_projects === false ? true : false;
                const updated = { ...resumeData, show_projects: nextVal };
                setResumeData(updated);
                localStorage.setItem('portfolio_resume', JSON.stringify(updated));
                api.put('/profile', { resume_data: updated }).catch(() => null);
                showToast(
                  nextVal
                    ? 'Đã BẬT hiển thị mục Dự án tiêu biểu trên trang CV'
                    : 'Đã ẨN mục Dự án tiêu biểu khỏi trang CV',
                  'success'
                );
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                resumeData.show_projects !== false
                  ? 'bg-surface-2 border border-border text-ink hover:border-rose-500/40 hover:text-rose-500'
                  : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm'
              }`}
            >
              {resumeData.show_projects !== false ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Ẩn khỏi CV</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Hiện lên CV</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleSyncResumeFromProjects}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border text-xs font-mono font-semibold text-ink hover:text-pink-500 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Đồng bộ từ Tab Dự án</span>
            </button>
          </div>
        </div>

        {/* Project Section Title */}
        <div>
          <label className="block text-xs font-mono text-slate-500 mb-1">Tiêu đề mục</label>
          <input
            type="text"
            value={resumeData.projects_title || ''}
            onChange={(e) => setResumeData({ ...resumeData, projects_title: e.target.value })}
            placeholder="Dự án tiêu biểu (Featured Projects)"
            className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
          />
        </div>

        {/* Form Add/Edit Project */}
        <form onSubmit={handleSaveResumeProj} className="p-5 rounded-2xl bg-surface-2 border border-border space-y-4">
          <h4 className="text-xs font-mono font-bold text-pink-500 uppercase tracking-wider flex items-center gap-1.5">
            {editingResumeProjIdx !== null ? <Edit2 className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            <span>{editingResumeProjIdx !== null ? 'Chỉnh Sửa Dự Án CV' : 'Thêm Dự Án Mới Vào CV'}</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">Tên dự án *</label>
              <input
                type="text"
                required
                value={resumeProjForm.title}
                onChange={(e) => setResumeProjForm({ ...resumeProjForm, title: e.target.value })}
                placeholder="Sakia Online Learning Platform"
                className="w-full px-3.5 py-2 rounded-xl bg-surface-1 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">Phân loại / Vai trò</label>
              <input
                type="text"
                value={resumeProjForm.category}
                onChange={(e) => setResumeProjForm({ ...resumeProjForm, category: e.target.value })}
                placeholder="Full-stack / Lead"
                className="w-full px-3.5 py-2 rounded-xl bg-surface-1 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">Link Demo (Live URL)</label>
              <input
                type="text"
                value={resumeProjForm.live_demo}
                onChange={(e) => setResumeProjForm({ ...resumeProjForm, live_demo: e.target.value })}
                placeholder="https://trangsakiaonline.com"
                className="w-full px-3.5 py-2 rounded-xl bg-surface-1 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">Link GitHub Repo</label>
              <input
                type="text"
                value={resumeProjForm.github_link}
                onChange={(e) => setResumeProjForm({ ...resumeProjForm, github_link: e.target.value })}
                placeholder="https://github.com/NgoQuoc4/..."
                className="w-full px-3.5 py-2 rounded-xl bg-surface-1 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-mono text-slate-500 mb-1">Công nghệ sử dụng (ngăn cách bằng dấu phẩy)</label>
              <input
                type="text"
                value={resumeProjForm.tech_stack}
                onChange={(e) => setResumeProjForm({ ...resumeProjForm, tech_stack: e.target.value })}
                placeholder="Next.js 15, NestJS, TypeScript, TailwindCSS, MongoDB"
                className="w-full px-3.5 py-2 rounded-xl bg-surface-1 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-mono text-slate-500 mb-1">Mô tả ngắn dự án</label>
              <textarea
                rows={2}
                value={resumeProjForm.description}
                onChange={(e) => setResumeProjForm({ ...resumeProjForm, description: e.target.value })}
                placeholder="Nền tảng thi và học trực tuyến hiện đại với trải nghiệm mượt mà..."
                className="w-full px-3.5 py-2 rounded-xl bg-surface-1 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none resize-none"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-ink select-none">
              <input
                type="checkbox"
                checked={!resumeProjForm.hidden}
                onChange={(e) => setResumeProjForm({ ...resumeProjForm, hidden: !e.target.checked })}
                className="w-4 h-4 rounded text-pink-500 focus:ring-pink-500 cursor-pointer"
              />
              <span>Hiển thị dự án này trên trang CV</span>
            </label>

            <div className="flex items-center gap-2">
              {editingResumeProjIdx !== null && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingResumeProjIdx(null);
                    setResumeProjForm({
                      title: '',
                      category: 'Full-stack',
                      live_demo: '',
                      github_link: '',
                      description: '',
                      tech_stack: '',
                      hidden: false,
                    });
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-mono text-ink-muted hover:text-ink cursor-pointer"
                >
                  Hủy bỏ
                </button>
              )}
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-ink text-surface-1 text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
              >
                {editingResumeProjIdx !== null ? 'Cập Nhật Dự Án' : 'Thêm Vào CV'}
              </button>
            </div>
          </div>
        </form>

        {/* List of Projects */}
        <div className="space-y-4">
          {(resumeData.projects || []).map((proj, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl bg-surface-2 border transition-all flex items-start justify-between gap-4 ${
                proj.hidden ? 'border-dashed border-border opacity-70 bg-surface-2/60' : 'border-border'
              }`}
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`font-bold text-sm ${proj.hidden ? 'text-ink-muted line-through' : 'text-ink'}`}>
                    {proj.title}
                  </span>
                  {proj.category && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-500 border border-pink-500/20">
                      {proj.category}
                    </span>
                  )}
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      proj.hidden
                        ? 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                        : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                    }`}
                  >
                    {proj.hidden ? 'Đang ẩn trên CV' : 'Đang hiển thị'}
                  </span>
                </div>
                {proj.description && (
                  <p className="text-xs text-ink-muted leading-relaxed">{proj.description}</p>
                )}
                {proj.tech_stack && proj.tech_stack.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.tech_stack.map((t, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-1 text-ink-subtle">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggleResumeProjHidden(idx)}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    proj.hidden
                      ? 'text-rose-500 bg-rose-500/10 hover:bg-rose-500/20'
                      : 'text-emerald-600 bg-emerald-500/10 hover:bg-emerald-500/20'
                  }`}
                  title={
                    proj.hidden
                      ? 'Dự án đang ẩn. Bấm để hiển thị trên CV'
                      : 'Dự án đang hiển thị. Bấm để ẩn khỏi CV'
                  }
                >
                  {proj.hidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => handleEditResumeProj(idx)}
                  className="p-1.5 rounded-lg text-ink-muted hover:text-pink-500 hover:bg-surface-1 transition-colors cursor-pointer"
                  title="Sửa"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteResumeProj(idx)}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  title="Xóa"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CARD 6: EDUCATION & TRAINING */}
      <div className="bg-surface-1 border border-border rounded-3xl p-6 sm:p-8 shadow-float space-y-6">
        <h3 className="text-base font-bold text-ink mb-1 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-pink-500" />
          <span>6. Học Vấn &amp; Đào Tạo (Education &amp; Training)</span>
        </h3>
        <p className="text-xs text-ink-muted mb-4">
          Bằng cấp đại học, chứng chỉ chuyên sâu hoặc khóa học nghề nghiệp.
        </p>

        <div>
          <label className="block text-xs font-mono text-slate-500 mb-1">Tiêu đề mục</label>
          <input
            type="text"
            value={resumeData.education_title || ''}
            onChange={(e) => setResumeData({ ...resumeData, education_title: e.target.value })}
            placeholder="Học vấn & Đào tạo (Education & Training)"
            className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
          />
        </div>

        {/* Form Add/Edit Education */}
        <form onSubmit={handleSaveResumeEdu} className="p-5 rounded-2xl bg-surface-2 border border-border space-y-4">
          <h4 className="text-xs font-mono font-bold text-pink-500 uppercase tracking-wider flex items-center gap-1.5">
            {editingResumeEduIdx !== null ? <Edit2 className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            <span>{editingResumeEduIdx !== null ? 'Chỉnh Sửa Mục Học Vấn' : 'Thêm Mục Học Vấn Mới'}</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">Nhãn huy hiệu</label>
              <input
                type="text"
                value={resumeEduForm.badge}
                onChange={(e) => setResumeEduForm({ ...resumeEduForm, badge: e.target.value })}
                placeholder="Đại Học / Đào Tạo Chuyên Sâu"
                className="w-full px-3.5 py-2 rounded-xl bg-surface-1 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">Tiêu đề bằng cấp / Ngành</label>
              <input
                type="text"
                required
                value={resumeEduForm.title}
                onChange={(e) => setResumeEduForm({ ...resumeEduForm, title: e.target.value })}
                placeholder="Công Nghệ Thông Tin"
                className="w-full px-3.5 py-2 rounded-xl bg-surface-1 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">Đơn vị / Phụ đề</label>
              <input
                type="text"
                value={resumeEduForm.subtitle}
                onChange={(e) => setResumeEduForm({ ...resumeEduForm, subtitle: e.target.value })}
                placeholder="Chuyên ngành Kỹ thuật Phần mềm"
                className="w-full px-3.5 py-2 rounded-xl bg-surface-1 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xs font-mono text-slate-500 mb-1">Mô tả chi tiết</label>
              <textarea
                rows={2}
                value={resumeEduForm.description}
                onChange={(e) => setResumeEduForm({ ...resumeEduForm, description: e.target.value })}
                placeholder="Nền tảng vững chắc về cấu trúc dữ liệu, giải thuật, cơ sở dữ liệu..."
                className="w-full px-3.5 py-2 rounded-xl bg-surface-1 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none resize-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            {editingResumeEduIdx !== null && (
              <button
                type="button"
                onClick={() => {
                  setEditingResumeEduIdx(null);
                  setResumeEduForm({
                    badge: 'Đại Học',
                    title: '',
                    subtitle: '',
                    description: '',
                  });
                }}
                className="px-4 py-2 rounded-xl text-xs font-mono text-ink-muted hover:text-ink cursor-pointer"
              >
                Hủy bỏ
              </button>
            )}
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-ink text-surface-1 text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
            >
              {editingResumeEduIdx !== null ? 'Cập Nhật Học Vấn' : 'Thêm Vào CV'}
            </button>
          </div>
        </form>

        {/* List of Education */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(resumeData.education || []).map((edu, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-surface-2 border border-border flex items-start justify-between gap-3">
              <div className="space-y-1 flex-1">
                {edu.badge && (
                  <span className="text-[10px] font-mono uppercase tracking-wider text-pink-500 bg-pink-500/10 px-2.5 py-0.5 rounded-full font-semibold">
                    {edu.badge}
                  </span>
                )}
                <h4 className="font-sans font-bold text-sm text-ink mt-2">{edu.title}</h4>
                {edu.subtitle && (
                  <p className="font-mono text-xs text-ink-muted">{edu.subtitle}</p>
                )}
                {edu.description && (
                  <p className="text-xs text-ink-muted mt-1 leading-relaxed">{edu.description}</p>
                )}
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleEditResumeEdu(idx)}
                  className="p-1.5 rounded-lg text-ink-muted hover:text-pink-500 transition-colors cursor-pointer"
                  title="Sửa"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteResumeEdu(idx)}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  title="Xóa"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CARD 7: FOOTER & METADATA */}
      <div className="bg-surface-1 border border-border rounded-3xl p-6 sm:p-8 shadow-float space-y-4">
        <h3 className="text-base font-bold text-ink mb-1 flex items-center gap-2">
          <Globe className="w-4 h-4 text-pink-500" />
          <span>7. Chân Trang CV &amp; Ngày Cập Nhật</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">Tên thương hiệu chân trang</label>
            <input
              type="text"
              value={resumeData.footer_name || ''}
              onChange={(e) => setResumeData({ ...resumeData, footer_name: e.target.value })}
              placeholder="Ngô Chí Quốc · Resume"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">Ghi chú cập nhật</label>
            <input
              type="text"
              value={resumeData.footer_updated || ''}
              onChange={(e) => setResumeData({ ...resumeData, footer_updated: e.target.value })}
              placeholder="Cập nhật mới nhất: 2026"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* STICKY BOTTOM SAVE ACTION BAR */}
      <div className="sticky bottom-6 z-20 p-4 rounded-2xl bg-surface-1/95 border border-border backdrop-blur-md shadow-float flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-ink-muted">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          <span>Các thay đổi sẽ được lưu tức thời vào hệ thống &amp; trang CV.</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/resume"
            target="_blank"
            className="px-4 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border text-xs font-semibold text-ink transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-pink-500" />
            <span>Xem Trước CV</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          <button
            type="button"
            onClick={() => handleSaveResume()}
            className="px-6 py-2.5 rounded-xl bg-ink text-surface-1 font-bold text-xs hover:opacity-90 transition-all shadow-sm cursor-pointer flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Lưu Cấu Hình Resume</span>
          </button>
        </div>
      </div>
    </div>
  );
};
