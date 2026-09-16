'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  SlidersHorizontal,
  UploadCloud,
  Loader2,
  X,
  Eye,
  EyeOff,
  RefreshCw,
  ExternalLink,
  Image as ImageIcon,
  Edit2,
  Trash2,
} from 'lucide-react';
import api from '@/lib/api';
import { defaultProjects } from '@/lib/defaults';
import type { Profile, ProjectItem } from '@/lib/types';
import { MediaPickerModal } from '../MediaPickerModal';
import type { MediaResource } from '../types';

interface ProjectsTabProps {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  onSaveProfile: (e: React.FormEvent) => void | Promise<void>;
  projects: ProjectItem[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectItem[]>>;
  uploading: string | null;
  handleCloudinaryUpload: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void | Promise<void>;
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  mediaList?: MediaResource[];
  loadingMedia?: boolean;
  fetchMediaList?: () => void | Promise<void>;
}

export const ProjectsTab: React.FC<ProjectsTabProps> = ({
  profile,
  setProfile,
  onSaveProfile,
  projects,
  setProjects,
  uploading,
  handleCloudinaryUpload,
  showToast,
  mediaList = [],
  loadingMedia = false,
  fetchMediaList,
}) => {
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    category: '0 → 1',
    year: '2026',
    tech_stack: '',
    image_url: '',
    live_demo: '',
    github_link: '',
    metrics: '',
    hidden: false,
  });

  const resetForm = () => {
    setEditingProjectId(null);
    setProjectForm({
      title: '',
      description: '',
      category: '0 → 1',
      year: '2026',
      tech_stack: '',
      image_url: '',
      live_demo: '',
      github_link: '',
      metrics: '',
      hidden: false,
    });
  };

  const handleEditProjectClick = (p: ProjectItem) => {
    setEditingProjectId(p._id || null);
    setProjectForm({
      title: p.title || '',
      description: p.description || '',
      category: p.category || '0 → 1',
      year: p.year || '2026',
      tech_stack: Array.isArray(p.tech_stack) ? p.tech_stack.join(', ') : '',
      image_url: p.image_url || '',
      live_demo: p.live_demo || '',
      github_link: p.github_link || '',
      metrics: Array.isArray(p.metrics) ? p.metrics.join(', ') : '',
      hidden: !!p.hidden,
    });
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();

    const techArray = projectForm.tech_stack
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const metricsArray = projectForm.metrics
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const projectPayload: Partial<ProjectItem> = {
      title: projectForm.title,
      description: projectForm.description,
      category: projectForm.category,
      year: projectForm.year,
      image_url: projectForm.image_url,
      live_demo: projectForm.live_demo,
      github_link: projectForm.github_link,
      tech_stack: techArray,
      metrics: metricsArray,
      hidden: projectForm.hidden,
    };

    if (editingProjectId) {
      const updated = projects.map((p) =>
        p._id === editingProjectId ? ({ ...p, ...projectPayload } as ProjectItem) : p
      );
      setProjects(updated);
      localStorage.setItem('portfolio_projects', JSON.stringify(updated));

      try {
        await api.put(`/projects/${editingProjectId}`, projectPayload).catch(() => null);
      } catch {}

      showToast(`Đã cập nhật dự án "${projectForm.title}"!`, 'success');
    } else {
      const newId = `proj_${Date.now()}`;
      const newProj = { _id: newId, ...projectPayload } as ProjectItem;
      const updated = [newProj, ...projects];
      setProjects(updated);
      localStorage.setItem('portfolio_projects', JSON.stringify(updated));

      try {
        await api.post('/projects', projectPayload).catch(() => null);
      } catch {}

      showToast(`Đã thêm mới dự án "${projectForm.title}"!`, 'success');
    }

    resetForm();
  };

  const handleToggleProjectHidden = async (id: string) => {
    const target = projects.find((p) => p._id === id);
    if (!target) return;

    const nextHidden = !target.hidden;
    const updatedList = projects.map((p) => (p._id === id ? { ...p, hidden: nextHidden } : p));
    setProjects(updatedList);
    localStorage.setItem('portfolio_projects', JSON.stringify(updatedList));

    try {
      await api.put(`/projects/${id}`, { ...target, hidden: nextHidden }).catch(() => null);
    } catch {}

    showToast(
      nextHidden
        ? `Đã ẨN dự án "${target.title}" khỏi thẻ Stacking Sticky Cards trên Trang Chủ!`
        : `Đã HIỂN THỊ dự án "${target.title}" trên thẻ Stacking Sticky Cards trên Trang Chủ!`,
      'success'
    );
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa dự án này?')) return;

    const updated = projects.filter((p) => p._id !== id);
    setProjects(updated);
    localStorage.setItem('portfolio_projects', JSON.stringify(updated));

    try {
      await api.delete(`/projects/${id}`).catch(() => null);
    } catch {}

    showToast('Đã xóa dự án thành công!', 'info');
  };

  const handleResetDefaultProjects = () => {
    if (!confirm('Khôi phục danh sách 4 dự án mặc định từ ngoquoc.vercel.app?')) return;
    setProjects(defaultProjects);
    localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
    showToast('Đã khôi phục 4 dự án mặc định!', 'info');
  };

  return (
    <div className="space-y-8">
      {/* Section Header Settings */}
      <form onSubmit={onSaveProfile} className="bg-surface-1 border border-border rounded-3xl p-6 sm:p-8 shadow-float">
        <h3 className="text-base font-bold text-ink mb-1 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-pink-500" />
          <span>Tiêu đề Section Dự Án Chọn Lọc (Selected Work)</span>
        </h3>
        <p className="text-xs text-ink-muted mb-4">
          Tùy biến dòng chữ nhỏ và tiêu đề lớn của khối Stacking Sticky Cards trên Trang Chủ.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">Dòng phụ (Subtitle)</label>
            <input
              type="text"
              value={profile.work_subtitle || ''}
              onChange={(e) => setProfile({ ...profile, work_subtitle: e.target.value })}
              placeholder="DỰ ÁN CHỌN LỌC"
              className="w-full px-4 py-2 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">Tiêu đề lớn (Headline)</label>
            <input
              type="text"
              value={profile.work_headline || ''}
              onChange={(e) => setProfile({ ...profile, work_headline: e.target.value })}
              placeholder="Các sản phẩm đã phát triển"
              className="w-full px-4 py-2 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-border flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 rounded-full bg-ink text-surface-1 font-bold text-xs hover:opacity-90 transition-all cursor-pointer"
          >
            Lưu tiêu đề Section
          </button>
        </div>
      </form>

      {/* Project Form (Create / Edit) */}
      <div className="bg-surface-1 border border-border rounded-3xl p-6 sm:p-8 shadow-float">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-ink flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-pink-500" />
            <span>{editingProjectId ? 'Chỉnh sửa Dự Án' : 'Thêm Dự Án Mới'}</span>
          </h2>
          {editingProjectId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-xs text-rose-500 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Hủy chế độ sửa</span>
            </button>
          )}
        </div>

        <form onSubmit={handleSaveProject} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">Tên dự án (Title) *</label>
            <input
              type="text"
              required
              value={projectForm.title}
              onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
              placeholder="Ví dụ: Trang Sakia Online"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">Phân loại (Category)</label>
              <select
                value={projectForm.category}
                onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
              >
                <option value="0 → 1">0 → 1</option>
                <option value="Growth">Growth</option>
                <option value="Research">Research</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">Năm phát triển</label>
              <input
                type="text"
                value={projectForm.year}
                onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                placeholder="2026"
                className="w-full px-3 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Project Image with Cloudinary Upload & Library Picker */}
          <div className="md:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
              <label className="block text-xs font-mono text-slate-500">Ảnh bìa dự án (Cover Image)</label>
              
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    setIsMediaPickerOpen(true);
                    if (fetchMediaList && (!mediaList || mediaList.length === 0)) {
                      fetchMediaList();
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 text-pink-500 border border-pink-500/20 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Chọn từ Thư viện Cloudinary</span>
                </button>

                <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-surface-2 hover:bg-surface-3 text-xs font-semibold text-ink border border-border transition-all">
                  {uploading === 'project_image' ? (
                    <span className="flex items-center gap-1">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Đang tải lên...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <UploadCloud className="w-3.5 h-3.5 text-pink-500" />
                      <span>Tải ảnh mới từ máy</span>
                    </span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploading === 'project_image'}
                    onChange={(e) => handleCloudinaryUpload(e, 'project_image')}
                  />
                </label>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={projectForm.image_url}
                onChange={(e) => setProjectForm({ ...projectForm, image_url: e.target.value })}
                placeholder="https://res.cloudinary.com/dguad3xyf/... hoặc nhấn tải lên ở góc phải"
                className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
              />
              {projectForm.image_url && (
                <img
                  src={projectForm.image_url}
                  alt="Preview"
                  className="w-14 h-10 rounded-lg object-cover border border-border shrink-0 shadow-sm"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">Link Live Demo</label>
            <input
              type="text"
              value={projectForm.live_demo}
              onChange={(e) => setProjectForm({ ...projectForm, live_demo: e.target.value })}
              placeholder="https://trangsakiaonline.com/"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">Link GitHub Repo</label>
            <input
              type="text"
              value={projectForm.github_link}
              onChange={(e) => setProjectForm({ ...projectForm, github_link: e.target.value })}
              placeholder="https://github.com/NgoQuoc4/..."
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-mono text-slate-500 mb-1">Tech Stack (ngăn cách bằng dấu phẩy)</label>
            <input
              type="text"
              required
              value={projectForm.tech_stack}
              onChange={(e) => setProjectForm({ ...projectForm, tech_stack: e.target.value })}
              placeholder="Next.js, NestJS, TypeScript, Prisma ORM, MySQL"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-mono text-slate-500 mb-1">Mô tả dự án (Description) *</label>
            <textarea
              required
              rows={2}
              value={projectForm.description}
              onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
              placeholder="Mô tả các tính năng chính, bài toán giải quyết và giá trị sản phẩm mang lại..."
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none resize-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-mono text-slate-500 mb-1">Điểm nổi bật / Metrics (ngăn cách bằng dấu phẩy)</label>
            <input
              type="text"
              value={projectForm.metrics}
              onChange={(e) => setProjectForm({ ...projectForm, metrics: e.target.value })}
              placeholder="Hệ thống học trực tuyến, Bảo mật JWT, Giao diện tối ưu đa thiết bị"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2 pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-ink select-none">
              <input
                type="checkbox"
                checked={!projectForm.hidden}
                onChange={(e) => setProjectForm({ ...projectForm, hidden: !e.target.checked })}
                className="w-4 h-4 rounded text-pink-500 focus:ring-pink-500 cursor-pointer"
              />
              <span>Hiển thị dự án này trên thẻ Stacking Sticky Cards (Trang Chủ)</span>
            </label>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="px-8 py-3 rounded-full bg-pink-500 text-white font-bold text-sm hover:bg-pink-600 transition-all shadow-sm cursor-pointer"
              >
                {editingProjectId ? 'Cập nhật Dự án' : 'Lưu & Thêm Dự án'}
              </button>

              <button
                type="button"
                onClick={handleResetDefaultProjects}
                className="text-xs text-slate-500 hover:text-ink flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Khôi phục 4 dự án gốc</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* List of Existing Projects */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-1 border border-border p-4 sm:p-5 rounded-2xl shadow-xs">
          <div>
            <h3 className="font-sans font-bold text-base text-ink flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-pink-500" />
              <span>Danh sách dự án hiển thị trên thẻ Stacking Sticky Cards ({projects.length})</span>
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Kiểm soát bật/tắt toàn bộ section Dự Án Chọn Lọc (Stacking Sticky Cards) trên Trang Chủ.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                profile.show_projects !== false
                  ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  profile.show_projects !== false ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
              />
              {profile.show_projects !== false ? 'Đang hiển thị trên Trang Chủ' : 'Đang ẩn khỏi Trang Chủ'}
            </span>

            <button
              type="button"
              onClick={() => {
                const nextVal = profile.show_projects === false ? true : false;
                const updated = { ...profile, show_projects: nextVal };
                setProfile(updated);
                localStorage.setItem('portfolio_profile', JSON.stringify(updated));
                api.put('/profile', updated).catch(() => null);
                showToast(
                  nextVal
                    ? 'Đã BẬT hiển thị danh sách dự án Stacking Sticky Cards trên Trang Chủ'
                    : 'Đã ẨN danh sách dự án Stacking Sticky Cards khỏi Trang Chủ',
                  'success'
                );
              }}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                profile.show_projects !== false
                  ? 'bg-surface-2 border border-border text-ink hover:border-rose-500/40 hover:text-rose-500'
                  : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm'
              }`}
            >
              {profile.show_projects !== false ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Ẩn khỏi Trang Chủ</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Hiện lên Trang Chủ</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p, idx) => (
            <div
              key={p._id || idx}
              className={`bg-surface-1 border rounded-2xl p-5 flex flex-col justify-between shadow-sm transition-all ${
                p.hidden
                  ? 'border-dashed border-border opacity-70 bg-surface-1/60'
                  : 'border-border hover:border-pink-500/50'
              }`}
            >
              <div className="flex gap-4">
                {p.image_url ? (
                  <img
                    src={p.image_url}
                    alt={p.title}
                    className="w-20 h-20 rounded-xl object-cover border border-border shrink-0"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-surface-2 border border-border flex items-center justify-center text-xs text-slate-400 shrink-0 font-mono">
                    No image
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-500 font-semibold">
                      {p.category || '0 → 1'}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">{p.year || '2026'}</span>
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${
                        p.hidden
                          ? 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                          : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                      }`}
                    >
                      {p.hidden ? 'Đang ẩn' : 'Hiển thị'}
                    </span>
                  </div>
                  <h4 className={`font-bold text-sm truncate ${p.hidden ? 'text-ink-muted line-through' : 'text-ink'}`}>
                    {p.title}
                  </h4>
                  <p className="text-xs text-ink-muted line-clamp-2 mt-1">{p.description}</p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {p.live_demo && (
                    <a
                      href={p.live_demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-pink-500 hover:underline flex items-center gap-1"
                    >
                      Demo <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {p.github_link && (
                    <a
                      href={p.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-slate-500 hover:text-ink flex items-center gap-1 ml-2"
                    >
                      GitHub <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleProjectHidden(p._id || String(idx))}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      p.hidden
                        ? 'text-rose-500 bg-rose-500/10 hover:bg-rose-500/20'
                        : 'text-emerald-600 bg-emerald-500/10 hover:bg-emerald-500/20'
                    }`}
                    title={
                      p.hidden
                        ? 'Dự án đang ẩn. Bấm để hiển thị trên Trang Chủ'
                        : 'Dự án đang hiển thị. Bấm để ẩn khỏi Trang Chủ'
                    }
                  >
                    {p.hidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEditProjectClick(p)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-pink-500 hover:bg-surface-2 transition-colors cursor-pointer"
                    title="Chỉnh sửa"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteProject(p._id || '')}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    title="Xóa dự án"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={(url) => {
          setProjectForm((prev) => ({ ...prev, image_url: url }));
          setIsMediaPickerOpen(false);
          showToast('Đã chọn ảnh bìa từ Thư viện Cloudinary!', 'success');
        }}
        mediaList={mediaList}
        loadingMedia={loadingMedia}
        fetchMediaList={fetchMediaList}
      />
    </div>
  );
};
