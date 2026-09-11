'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { defaultProfile, defaultProjects } from '@/lib/defaults';
import type { Profile, ProjectItem, Message } from '@/lib/types';
import {
  Lock,
  Plus,
  Trash2,
  Edit2,
  LogOut,
  CheckCircle2,
  MessageSquare,
  Briefcase,
  User,
  Sparkles,
  UploadCloud,
  ExternalLink,
  Loader2,
  Globe,
  Share2,
  Eye,
  RefreshCw,
  X,
} from 'lucide-react';


export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'hero' | 'projects' | 'about' | 'contact' | 'messages'>('hero');

  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [projects, setProjects] = useState<ProjectItem[]>(defaultProjects);
  const [messages, setMessages] = useState<Message[]>([]);

  const [uploading, setUploading] = useState<string | null>(null);
  const [msgNotice, setMsgNotice] = useState<string | null>(null);

  // Editing Project state
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
  });

  // Skills input helper
  const [skillsString, setSkillsString] = useState('');

  // Initial load
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const devAuth = localStorage.getItem('portfolio_admin_auth');
    if (savedToken || devAuth === 'true') {
      setIsAuthenticated(true);
    }

    // Load custom profile & projects from localStorage if available
    try {
      const localProf = localStorage.getItem('portfolio_profile');
      if (localProf) {
        const parsed = JSON.parse(localProf);
        setProfile(parsed);
        setSkillsString(Array.isArray(parsed.skills) ? parsed.skills.join(', ') : '');
      } else {
        setSkillsString((defaultProfile.skills || []).join(', '));
      }

      const localProj = localStorage.getItem('portfolio_projects');
      if (localProj) {
        setProjects(JSON.parse(localProj));
      }
    } catch (e) {}

    // Fetch live backend data if available
    fetchBackendData();
  }, []);

  const fetchBackendData = async () => {
    try {
      const [projRes, profRes, msgRes] = await Promise.all([
        api.get('/projects').catch(() => null),
        api.get('/profile').catch(() => null),
        api.get('/messages').catch(() => null),
      ]);

      if (projRes && projRes.data && projRes.data.length > 0) {
        setProjects(projRes.data);
      }
      if (profRes && profRes.data) {
        setProfile((prev: any) => {
          const merged = { ...prev, ...profRes.data };
          setSkillsString(Array.isArray(merged.skills) ? merged.skills.join(', ') : '');
          return merged;
        });
      }
      if (msgRes && msgRes.data) {
        setMessages(msgRes.data);
      }
    } catch (err) {
      console.warn('Backend server not reachable, using local storage mode:', err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await api.post('/auth/login', { username, password });
      const jwtToken = res.data.token;
      localStorage.setItem('token', jwtToken);
      localStorage.removeItem('portfolio_admin_auth');
      setIsAuthenticated(true);
      fetchBackendData();
    } catch {
      setLoginError('Sai tài khoản hoặc mật khẩu. Vui lòng thử lại.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('portfolio_admin_auth');
    setIsAuthenticated(false);
  };

  // Cloudinary Uploader
  const handleCloudinaryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    targetField: 'project_image' | 'profile_avatar'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(targetField);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Upload lên Cloudinary thất bại');
      }

      if (targetField === 'project_image') {
        setProjectForm((prev) => ({ ...prev, image_url: data.url }));
      } else if (targetField === 'profile_avatar') {
        setProfile((prev: any) => ({ ...prev, avatar_url: data.url }));
      }

      setMsgNotice('Đã upload thành công ảnh lên Cloudinary (thư mục ngoquoc_portfolio)!');
      setTimeout(() => setMsgNotice(null), 4000);
    } catch (err: any) {
      alert(err.message || 'Lỗi khi upload ảnh lên Cloudinary');
    } finally {
      setUploading(null);
    }
  };

  // Save Profile (Hero, About, Contact)
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProfile = {
      ...profile,
      skills: skillsString.split(',').map((s) => s.trim()).filter(Boolean),
    };

    // 1. Instant save to localStorage
    localStorage.setItem('portfolio_profile', JSON.stringify(updatedProfile));
    setProfile(updatedProfile);

    // 2. Sync to NestJS backend
    try {
      await api.post('/profile', updatedProfile).catch(async () => {
        await api.put('/profile', updatedProfile).catch(() => null);
      });
    } catch (err) {
      console.warn('Backend sync deferred (saved locally):', err);
    }

    setMsgNotice('Đã lưu và cập nhật toàn bộ thông tin lên trang chính thành công!');
    setTimeout(() => setMsgNotice(null), 4000);
  };

  // Projects CRUD
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();

    const techStackArray = projectForm.tech_stack.split(',').map((s) => s.trim()).filter(Boolean);
    const metricsArray = projectForm.metrics.split(',').map((s) => s.trim()).filter(Boolean);

    if (editingProjectId) {
      // Update existing
      const updatedList = projects.map((p) => {
        if (p._id === editingProjectId) {
          return {
            ...p,
            ...projectForm,
            tech_stack: techStackArray,
            metrics: metricsArray,
          };
        }
        return p;
      });

      setProjects(updatedList);
      localStorage.setItem('portfolio_projects', JSON.stringify(updatedList));

      try {
        await api.put(`/projects/${editingProjectId}`, {
          ...projectForm,
          tech_stack: techStackArray,
          metrics: metricsArray,
        }).catch(() => null);
      } catch (err) {}

      setMsgNotice(`Đã cập nhật dự án "${projectForm.title}"!`);
      setEditingProjectId(null);
    } else {
      // Create new
      const newProj = {
        _id: String(Date.now()),
        ...projectForm,
        tech_stack: techStackArray,
        metrics: metricsArray,
      };

      const updatedList = [newProj, ...projects];
      setProjects(updatedList);
      localStorage.setItem('portfolio_projects', JSON.stringify(updatedList));

      try {
        await api.post('/projects', {
          ...projectForm,
          tech_stack: techStackArray,
          metrics: metricsArray,
        }).catch(() => null);
      } catch (err) {}

      setMsgNotice(`Đã thêm mới dự án "${projectForm.title}"!`);
    }

    // Reset form
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
    });

    setTimeout(() => setMsgNotice(null), 4000);
  };

  const handleEditProjectClick = (p: any) => {
    setEditingProjectId(p._id);
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
    });
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa dự án này?')) return;

    const updated = projects.filter((p) => p._id !== id);
    setProjects(updated);
    localStorage.setItem('portfolio_projects', JSON.stringify(updated));

    try {
      await api.delete(`/projects/${id}`).catch(() => null);
    } catch (err) {}

    setMsgNotice('Đã xóa dự án thành công!');
    setTimeout(() => setMsgNotice(null), 3000);
  };

  const handleResetDefaultProjects = () => {
    if (!confirm('Khôi phục danh sách 4 dự án mặc định từ ngoquoc.vercel.app?')) return;
    setProjects(defaultProjects);
    localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
    setMsgNotice('Đã khôi phục 4 dự án mặc định!');
    setTimeout(() => setMsgNotice(null), 3000);
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      await api.delete(`/messages/${id}`);
      setMessages(messages.filter((m) => m._id !== id));
      setMsgNotice('Đã xóa tin nhắn!');
      setTimeout(() => setMsgNotice(null), 3000);
    } catch {
      setMessages(messages.filter((m) => m._id !== id));
    }
  };

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-surface-1 border border-border rounded-3xl p-8 shadow-float">
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
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">Tài khoản</label>
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
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">Mật khẩu</label>
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
              className="w-full py-3 rounded-xl bg-ink text-surface-1 font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer"
            >
              Đăng nhập
            </button>

            {loginError && (
              <p className="text-xs text-rose-500 font-medium text-center">{loginError}</p>
            )}
          </form>
        </div>
      </div>
    );
  }

  // DASHBOARD MAIN
  return (
    <div className="min-h-screen bg-canvas text-ink py-10 px-6 max-w-6xl mx-auto">
      {/* Top Header Bar */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-500" />
            <span>Bảng Điều Khiển Quản Trị Trang Chính</span>
          </h1>
          <p className="text-xs text-ink-muted mt-1">
            Tùy chỉnh thông tin Hero, Dự án, Kỹ năng, Liên hệ và ảnh Cloudinary
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-1 border border-border text-xs font-semibold text-ink hover:border-pink-500 shadow-sm transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-pink-500" />
            <span>Xem trang chính (Live Site)</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-rose-500 bg-rose-500/10 px-3.5 py-2 rounded-full hover:bg-rose-500/20 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </header>

      {/* Floating Status Notification */}
      {msgNotice && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-sm font-semibold flex items-center gap-2 shadow-sm animate-fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{msgNotice}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <nav className="flex flex-wrap gap-2 border-b border-border pb-3 mb-8">
        {[
          { id: 'hero', label: '1. Nhận diện & Hero', icon: <Sparkles className="w-4 h-4" /> },
          { id: 'projects', label: `2. Dự án (${projects.length})`, icon: <Briefcase className="w-4 h-4" /> },
          { id: 'about', label: '3. Giới thiệu & Kỹ năng', icon: <User className="w-4 h-4" /> },
          { id: 'contact', label: '4. Liên hệ & MXH', icon: <Share2 className="w-4 h-4" /> },
          { id: 'messages', label: `5. Tin nhắn (${messages.length})`, icon: <MessageSquare className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-ink text-surface-1 shadow-sm'
                : 'text-slate-600 hover:text-ink bg-surface-1 border border-border'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* TAB 1: HERO & IDENTITY */}
      {activeTab === 'hero' && (
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="bg-surface-1 border border-border rounded-3xl p-6 sm:p-8 shadow-float">
            <h2 className="text-lg font-bold text-ink mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span>Cấu hình phần Đầu trang &amp; Hero Section</span>
            </h2>
            <p className="text-xs text-ink-muted mb-6">Thông tin này xuất hiện ngay trên Preloader và Bàn làm việc số Hero.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Họ và tên hiển thị</label>
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
                <label className="block text-xs font-mono text-slate-500 mb-1">Chức danh / Nghề nghiệp</label>
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
                  <label className="block text-xs font-mono text-slate-500">Ảnh đại diện (Avatar Photo)</label>
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
                <label className="block text-xs font-mono text-slate-500 mb-1">Tiêu đề lớn Hero (H1 Headline)</label>
                <textarea
                  rows={2}
                  value={profile.headline || ''}
                  onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                  placeholder="I turn ambiguity into clear product direction & ship what matters with AI."
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none resize-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-mono text-slate-500 mb-1">Đoạn giới thiệu ngắn Hero (Sub-intro)</label>
                <textarea
                  rows={2}
                  value={profile.hero_sub_text || ''}
                  onChange={(e) => setProfile({ ...profile, hero_sub_text: e.target.value })}
                  placeholder="Hi, I'm Ngô Chí Quốc. A dedicated Full Stack & Front End Developer..."
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Thanh trạng thái Hero (Status Pill)</label>
                <input
                  type="text"
                  value={profile.hero_status || ''}
                  onChange={(e) => setProfile({ ...profile, hero_status: e.target.value })}
                  placeholder="Available for high-impact roles & projects"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Tỉnh / Thành phố (Location)</label>
                <input
                  type="text"
                  value={profile.location || ''}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  placeholder="Hồ Chí Minh, Việt Nam"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Tiêu đề màn hình nạp (Preloader Title)</label>
                <input
                  type="text"
                  value={profile.preloader_title || ''}
                  onChange={(e) => setProfile({ ...profile, preloader_title: e.target.value })}
                  placeholder="NGO CHI QUOC"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Dòng phụ Preloader (Preloader Label)</label>
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
      )}

      {/* TAB 2: PROJECTS & SELECTED WORK */}
      {activeTab === 'projects' && (
        <div className="space-y-8">
          {/* Form Create / Edit Project */}
          <div className="bg-surface-1 border border-border rounded-3xl p-6 sm:p-8 shadow-float">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-ink flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-pink-500" />
                <span>{editingProjectId ? 'Chỉnh sửa dự án đã chọn' : 'Thêm dự án mới vào Selected Work'}</span>
              </h2>
              {editingProjectId && (
                <button
                  type="button"
                  onClick={() => {
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
                    });
                  }}
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

              {/* Project Image with Cloudinary Upload */}
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-mono text-slate-500">Ảnh bìa dự án (Cover Image)</label>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-semibold text-pink-500 hover:text-pink-600">
                    {uploading === 'project_image' ? (
                      <span className="flex items-center gap-1">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Đang tải lên Cloudinary...</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>Tải ảnh lên Cloudinary (thư mục: ngoquoc_portfolio)</span>
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

              <div className="md:col-span-2 pt-2 flex items-center justify-between">
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
            </form>
          </div>

          {/* List of Existing Projects */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-sans font-bold text-base text-ink">
                Danh sách dự án hiển thị trên thẻ Stacking Sticky Cards ({projects.length})
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((p, idx) => (
                <div
                  key={p._id || idx}
                  className="bg-surface-1 border border-border rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:border-pink-500/50 transition-colors"
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
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-500 font-semibold">
                          {p.category || '0 → 1'}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400">{p.year || '2026'}</span>
                      </div>
                      <h4 className="font-bold text-sm text-ink truncate">{p.title}</h4>
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
                        onClick={() => handleEditProjectClick(p)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-pink-500 hover:bg-surface-2 transition-colors cursor-pointer"
                        title="Chỉnh sửa"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(p._id || '')}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-pink-500 hover:bg-surface-2 transition-colors cursor-pointer"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ABOUT & SKILLS */}
      {activeTab === 'about' && (
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="bg-surface-1 border border-border rounded-3xl p-6 sm:p-8 shadow-float">
            <h2 className="text-lg font-bold text-ink mb-1 flex items-center gap-2">
              <User className="w-4 h-4 text-pink-500" />
              <span>Cấu hình phần Giới thiệu &amp; Danh sách Kỹ năng</span>
            </h2>
            <p className="text-xs text-ink-muted mb-6">Nội dung này hiển thị tại mục About Me và lưới logo thương hiệu.</p>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Đoạn giới thiệu 1 (Bio Paragraph 1)</label>
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
                <label className="block text-xs font-mono text-slate-500 mb-1">Đoạn giới thiệu 2 (Bio Paragraph 2)</label>
                <textarea
                  rows={3}
                  value={profile.about_text_2 || ''}
                  onChange={(e) => setProfile({ ...profile, about_text_2: e.target.value })}
                  placeholder="Ngoài Full Stack, tôi còn có chuyên môn vững chắc về..."
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Danh sách Kỹ năng cốt lõi (ngăn cách bằng dấu phẩy)</label>
                <textarea
                  rows={3}
                  value={skillsString}
                  onChange={(e) => setSkillsString(e.target.value)}
                  placeholder="ReactJS, NextJS, TypeScript, NestJS, NodeJS, ExpressJS, TailwindCSS..."
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none font-mono text-xs leading-relaxed"
                />
                <p className="text-[11px] text-slate-400 mt-1">Mỗi kỹ năng ngăn cách bằng dấu phẩy sẽ được tự động hiển thị thành một pill badge đẹp mắt.</p>
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
      )}

      {/* TAB 4: CONTACT & SOCIAL */}
      {activeTab === 'contact' && (
        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="bg-surface-1 border border-border rounded-3xl p-6 sm:p-8 shadow-float">
            <h2 className="text-lg font-bold text-ink mb-1 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-pink-500" />
              <span>Cấu hình Liên hệ &amp; Mạng xã hội</span>
            </h2>
            <p className="text-xs text-ink-muted mb-6">Thông tin này điều khiển nút sao chép email, form liên hệ và các biểu tượng social footer.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

              <div className="md:col-span-2">
                <label className="block text-xs font-mono text-slate-500 mb-1">Tiêu đề lớn phần Contact</label>
                <input
                  type="text"
                  value={profile.contact_headline || ''}
                  onChange={(e) => setProfile({ ...profile, contact_headline: e.target.value })}
                  placeholder="Let's build something thoughtful together"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Link đặt lịch hẹn (Google Calendar / Calendly)</label>
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
      )}

      {/* TAB 5: MESSAGES */}
      {activeTab === 'messages' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-sans font-bold text-base text-ink">
              Hộp thư tin nhắn nhận từ biểu mẫu Liên hệ
            </h3>
          </div>

          {messages.length === 0 ? (
            <div className="p-12 text-center bg-surface-1 border border-border rounded-3xl text-slate-500">
              Chưa có tin nhắn nào được gửi đến. Mọi tin nhắn gửi từ trang chính sẽ hiển thị tại đây.
            </div>
          ) : (
            messages.map((m) => (
              <div key={m._id} className="bg-surface-1 border border-border rounded-2xl p-6 flex items-start justify-between gap-4 shadow-sm">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-ink text-sm">{m.name}</span>
                    <span className="text-xs text-pink-500 font-mono">({m.email})</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed whitespace-pre-wrap">{m.message}</p>
                  <span className="font-mono text-[10px] text-slate-400 mt-3 block">
                    {new Date(m.createdAt || Date.now()).toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteMessage(m._id || '')}
                  className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer"
                  title="Xóa tin nhắn"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
