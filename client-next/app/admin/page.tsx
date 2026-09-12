'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { defaultProfile, defaultProjects, defaultFreelanceJobs, defaultExperiences } from '@/lib/defaults';
import type { Profile, ProjectItem, Message, FreelanceJob, ExperienceItem } from '@/lib/types';
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
  Image as ImageIcon,
  Copy,
  Check,
  Search,
  Sun,
  Moon,
  Menu,
  ChevronRight,
  ShieldCheck,
  SlidersHorizontal,
  Award,
  Star,
  Building2,
} from 'lucide-react';
import { ToastProvider, useToast } from '@/components/admin/Toast';

export default function AdminPage() {
  return (
    <ToastProvider>
      <AdminDashboard />
    </ToastProvider>
  );
}

function AdminDashboard() {
  const { showToast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'hero' | 'projects' | 'about' | 'contact' | 'media' | 'messages' | 'freelance' | 'experience'>('hero');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Work Experiences state
  const [experiences, setExperiences] = useState<ExperienceItem[]>(defaultExperiences);
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

  // Freelance Jobs state
  const [freelanceJobs, setFreelanceJobs] = useState<FreelanceJob[]>(defaultFreelanceJobs);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [jobForm, setJobForm] = useState({
    title: '',
    client_name: '',
    role: '',
    timeline: '',
    category: 'Web App & EdTech',
    scope: '',
    deliverables: '',
    tech_stack: '',
    metrics: '',
    image_url: '',
    live_demo: '',
    testimonial_quote: '',
    testimonial_author: '',
    testimonial_role: '',
    testimonial_rating: 5,
  });

  // Media Library state
  const [mediaList, setMediaList] = useState<{
    public_id: string;
    url: string;
    format: string;
    width: number;
    height: number;
    bytes: number;
    created_at: string;
  }[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [uploadingMediaFile, setUploadingMediaFile] = useState(false);
  const [mediaSearch, setMediaSearch] = useState('');
  const [selectedMediaPreview, setSelectedMediaPreview] = useState<string | null>(null);
  const [copiedMediaUrl, setCopiedMediaUrl] = useState<string | null>(null);

  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [projects, setProjects] = useState<ProjectItem[]>(defaultProjects);
  const [messages, setMessages] = useState<Message[]>([]);

  const [uploading, setUploading] = useState<string | null>(null);

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

      const localJobs = localStorage.getItem('portfolio_freelance_jobs');
      if (localJobs) {
        setFreelanceJobs(JSON.parse(localJobs));
      }

      const localExp = localStorage.getItem('portfolio_experiences');
      if (localExp) {
        const parsed = JSON.parse(localExp);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setExperiences(parsed);
        }
      }
    } catch (e) {}

    // Đồng bộ theme Dark/Light với trang chính
    if (typeof document !== 'undefined') {
      const isDark = document.body.classList.contains('dark-mode') || localStorage.getItem('dark-mode') === 'true';
      setIsDarkMode(isDark);
      if (isDark) {
        document.body.classList.add('dark-mode');
      }
    }

    // Fetch live backend data if available
    fetchBackendData();
    fetchMediaList();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (typeof document !== 'undefined') {
        if (next) {
          document.body.classList.add('dark-mode');
        } else {
          document.body.classList.remove('dark-mode');
        }
      }
      localStorage.setItem('dark-mode', String(next));
      return next;
    });
  };

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
      // Hỗ trợ đăng nhập trực tiếp trên Vercel khi backend NestJS chạy ở máy local
      const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
      if (username.trim() === 'admin' && adminPassword && password === adminPassword) {
        localStorage.setItem('portfolio_admin_auth', 'true');
        setIsAuthenticated(true);
        fetchBackendData();
        return;
      }
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
    targetField: 'project_image' | 'profile_avatar' | 'freelance_image'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(targetField);
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'x-admin-secret': process.env.NEXT_PUBLIC_ADMIN_API_SECRET || '' },
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
      } else if (targetField === 'freelance_image') {
        setJobForm((prev) => ({ ...prev, image_url: data.url }));
      }

      showToast('Đã upload thành công ảnh lên Cloudinary (thư mục ngoquoc_portfolio)!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Lỗi khi upload ảnh lên Cloudinary', 'error');
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

    showToast('Đã lưu và cập nhật toàn bộ thông tin lên trang chính thành công!', 'success');
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

      showToast(`Đã cập nhật dự án "${projectForm.title}"!`, 'success');
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

      showToast(`Đã thêm mới dự án "${projectForm.title}"!`, 'success');
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

    showToast('Đã xóa dự án thành công!', 'info');
  };

  const handleResetDefaultProjects = () => {
    if (!confirm('Khôi phục danh sách 4 dự án mặc định từ ngoquoc.vercel.app?')) return;
    setProjects(defaultProjects);
    localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
    showToast('Đã khôi phục 4 dự án mặc định!', 'info');
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      await api.delete(`/messages/${id}`);
      setMessages(messages.filter((m) => m._id !== id));
      showToast('Đã xóa tin nhắn!', 'info');
    } catch {
      setMessages(messages.filter((m) => m._id !== id));
      showToast('Đã xóa tin nhắn!', 'info');
    }
  };

  // --- CLOUDINARY MEDIA ACTIONS ---
  const fetchMediaList = async () => {
    setLoadingMedia(true);
    try {
      const res = await fetch('/api/media');
      const data = await res.json();
      if (data.success && Array.isArray(data.resources)) {
        setMediaList(data.resources);
      }
    } catch (err) {
      console.warn('Không thể tải danh sách ảnh Cloudinary:', err);
    } finally {
      setLoadingMedia(false);
    }
  };

  const handleUploadMediaFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingMediaFile(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'x-admin-secret': process.env.NEXT_PUBLIC_ADMIN_API_SECRET || '' },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Upload lên Cloudinary thất bại');
      }

      showToast('Đã tải ảnh lên Cloudinary thành công!', 'success');
      await fetchMediaList();
    } catch (err: any) {
      showToast(err.message || 'Lỗi khi tải ảnh lên Cloudinary', 'error');
    } finally {
      setUploadingMediaFile(false);
      e.target.value = '';
    }
  };

  const handleDeleteMedia = async (publicId: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa ảnh "${publicId}" vĩnh viễn khỏi Cloudinary?`)) return;

    try {
      const res = await fetch(`/api/media?public_id=${encodeURIComponent(publicId)}`, {
        method: 'DELETE',
        headers: { 'x-admin-secret': process.env.NEXT_PUBLIC_ADMIN_API_SECRET || '' },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Xóa ảnh thất bại');

      setMediaList((prev) => prev.filter((m) => m.public_id !== publicId));
      showToast('Đã xóa ảnh khỏi Cloudinary thành công!', 'info');
    } catch (err: any) {
      showToast(err.message || 'Lỗi khi xóa ảnh khỏi Cloudinary', 'error');
    }
  };

  const handleCopyMediaUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedMediaUrl(url);
    showToast('Đã sao chép link ảnh vào clipboard!', 'success');
    setTimeout(() => setCopiedMediaUrl(null), 2500);
  };

  const handleSetAvatarFromMedia = (url: string) => {
    const updated = { ...profile, avatar_url: url };
    setProfile(updated);
    localStorage.setItem('portfolio_profile', JSON.stringify(updated));
    api.put('/profile', updated).catch(() => null);
    showToast('Đã cập nhật Avatar mới cho trang chính!', 'success');
  };

  const handleUseInProjectFromMedia = (url: string) => {
    setProjectForm((prev) => ({ ...prev, image_url: url }));
    setActiveTab('projects');
    showToast('Đã điền link ảnh vào form Tạo/Sửa Dự Án!', 'info');
  };

  const handleUseInFreelanceFromMedia = (url: string) => {
    setJobForm((prev) => ({ ...prev, image_url: url }));
    setActiveTab('freelance');
    showToast('Đã điền link ảnh vào form Job Freelance!', 'info');
  };

  // --- FREELANCE JOBS CRUD ---
  const handleSaveFreelanceJob = (e: React.FormEvent) => {
    e.preventDefault();
    const deliverablesArray = jobForm.deliverables.split(',').map((s) => s.trim()).filter(Boolean);
    const techStackArray = jobForm.tech_stack.split(',').map((s) => s.trim()).filter(Boolean);

    const testimonial = jobForm.testimonial_quote.trim()
      ? {
          quote: jobForm.testimonial_quote,
          author: jobForm.testimonial_author || 'Khách hàng',
          author_role: jobForm.testimonial_role || '',
          rating: Number(jobForm.testimonial_rating) || 5,
        }
      : undefined;

    if (editingJobId) {
      const updated = freelanceJobs.map((j) => {
        if (j._id === editingJobId) {
          return {
            ...j,
            ...jobForm,
            deliverables: deliverablesArray,
            tech_stack: techStackArray,
            testimonial,
          };
        }
        return j;
      });
      setFreelanceJobs(updated);
      localStorage.setItem('portfolio_freelance_jobs', JSON.stringify(updated));
      showToast(`Đã cập nhật job freelance "${jobForm.title}"!`, 'success');
      setEditingJobId(null);
    } else {
      const newJob: FreelanceJob = {
        _id: `job-${Date.now()}`,
        ...jobForm,
        deliverables: deliverablesArray,
        tech_stack: techStackArray,
        testimonial,
        status: 'completed',
      };
      const updated = [newJob, ...freelanceJobs];
      setFreelanceJobs(updated);
      localStorage.setItem('portfolio_freelance_jobs', JSON.stringify(updated));
      showToast(`Đã thêm mới job freelance "${jobForm.title}"!`, 'success');
    }

    setJobForm({
      title: '',
      client_name: '',
      role: '',
      timeline: '',
      category: 'Web App & EdTech',
      scope: '',
      deliverables: '',
      tech_stack: '',
      metrics: '',
      image_url: '',
      live_demo: '',
      testimonial_quote: '',
      testimonial_author: '',
      testimonial_role: '',
      testimonial_rating: 5,
    });
  };

  const handleEditJobClick = (job: FreelanceJob) => {
    setEditingJobId(job._id || null);
    setJobForm({
      title: job.title || '',
      client_name: job.client_name || '',
      role: job.role || '',
      timeline: job.timeline || '',
      category: job.category || 'Web App & EdTech',
      scope: job.scope || '',
      deliverables: Array.isArray(job.deliverables) ? job.deliverables.join(', ') : '',
      tech_stack: Array.isArray(job.tech_stack) ? job.tech_stack.join(', ') : '',
      metrics: job.metrics || '',
      image_url: job.image_url || '',
      live_demo: job.live_demo || '',
      testimonial_quote: job.testimonial?.quote || '',
      testimonial_author: job.testimonial?.author || '',
      testimonial_role: job.testimonial?.author_role || '',
      testimonial_rating: job.testimonial?.rating || 5,
    });
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleDeleteFreelanceJob = (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa job freelance này?')) return;
    const updated = freelanceJobs.filter((j) => j._id !== id);
    setFreelanceJobs(updated);
    localStorage.setItem('portfolio_freelance_jobs', JSON.stringify(updated));
    showToast('Đã xóa job freelance thành công!', 'info');
  };

  const handleResetDefaultJobs = () => {
    if (!confirm('Khôi phục 3 job freelance mẫu ban đầu?')) return;
    setFreelanceJobs(defaultFreelanceJobs);
    localStorage.setItem('portfolio_freelance_jobs', JSON.stringify(defaultFreelanceJobs));
    showToast('Đã khôi phục 3 job freelance mẫu!', 'info');
  };

  const handleUseInExperienceFromMedia = (url: string) => {
    setExpForm((prev) => ({ ...prev, company_logo: url }));
    setActiveTab('experience');
    showToast('Đã điền link ảnh vào logo Công ty!', 'info');
  };

  // --- WORK EXPERIENCES CRUD ---
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
      const updated = experiences.map((exp) =>
        exp._id === editingExpId
          ? {
              ...exp,
              company: expForm.company,
              company_logo: expForm.company_logo,
              role: expForm.role,
              period: expForm.period,
              location: expForm.location,
              type: expForm.type,
              description: expForm.description,
              achievements: achievementsArray,
              tech_stack: techStackArray,
            }
          : exp
      );
      setExperiences(updated);
      localStorage.setItem('portfolio_experiences', JSON.stringify(updated));
      showToast(`Đã cập nhật kinh nghiệm tại "${expForm.company}"!`, 'success');
      setEditingExpId(null);
    } else {
      const newExp: ExperienceItem = {
        _id: `exp-${Date.now()}`,
        company: expForm.company,
        company_logo: expForm.company_logo,
        role: expForm.role,
        period: expForm.period,
        location: expForm.location,
        type: expForm.type,
        description: expForm.description,
        achievements: achievementsArray,
        tech_stack: techStackArray,
      };
      const updated = [newExp, ...experiences];
      setExperiences(updated);
      localStorage.setItem('portfolio_experiences', JSON.stringify(updated));
      showToast(`Đã thêm mới kinh nghiệm tại "${expForm.company}"!`, 'success');
    }

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

  const handleDeleteExperience = (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa mốc kinh nghiệm này?')) return;
    const updated = experiences.filter((e) => e._id !== id);
    setExperiences(updated);
    localStorage.setItem('portfolio_experiences', JSON.stringify(updated));
    showToast('Đã xóa mốc kinh nghiệm thành công!', 'info');
  };

  const handleResetDefaultExperiences = () => {
    if (!confirm('Khôi phục danh sách kinh nghiệm làm việc mẫu ban đầu?')) return;
    setExperiences(defaultExperiences);
    localStorage.setItem('portfolio_experiences', JSON.stringify(defaultExperiences));
    showToast('Đã khôi phục các mốc kinh nghiệm mẫu!', 'info');
  };

  const filteredMedia = mediaList.filter((m) =>
    (m.public_id || '').toLowerCase().includes(mediaSearch.toLowerCase()) ||
    (m.format || '').toLowerCase().includes(mediaSearch.toLowerCase())
  );

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

  interface NavItem {
    id: 'hero' | 'projects' | 'freelance' | 'experience' | 'media' | 'about' | 'contact' | 'messages';
    label: string;
    icon: React.ElementType;
    desc: string;
    count?: number;
    badge?: string;
  }

  const navItems: NavItem[] = [
    { id: 'hero', label: '1. Nhận diện & Hero', icon: Sparkles, desc: 'Tùy chỉnh thông tin giới thiệu đầu trang' },
    { id: 'projects', label: '2. Quản lý Dự án', icon: Briefcase, count: projects.length, desc: 'Danh sách và thông tin các dự án tiêu biểu' },
    { id: 'freelance', label: '3. Jobs Freelance', icon: Award, count: freelanceJobs.length, desc: 'Dự án khách hàng, deliverables và đánh giá 5⭐' },
    { id: 'experience', label: '4. Kinh nghiệm làm việc', icon: Building2, count: experiences.length, desc: 'Công ty cũ, vị trí, mốc thời gian và thành tựu' },
    { id: 'media', label: '5. Thư viện Cloudinary', icon: ImageIcon, count: mediaList.length, badge: 'ngoquoc_portfolio', desc: 'Quản lý & đồng bộ hình ảnh đám mây' },
    { id: 'about', label: '6. Giới thiệu & Kỹ năng', icon: User, desc: 'Cốt lõi tiểu sử và danh sách kỹ năng công nghệ' },
    { id: 'contact', label: '7. Liên hệ & MXH', icon: Share2, desc: 'Thông tin email, điện thoại và mạng xã hội' },
    { id: 'messages', label: '8. Hộp thư Tin nhắn', icon: MessageSquare, count: messages.length, desc: 'Tin nhắn phản hồi từ khách truy cập' },
  ];

  const currentTabMeta = navItems.find((n) => n.id === activeTab) || navItems[0];
  const CurrentIcon = currentTabMeta.icon;

  // DASHBOARD MAIN
  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col lg:flex-row antialiased">
      {/* Mobile Top App Bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-surface-1/90 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-surface-2 border border-border text-ink hover:text-pink-500 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500 to-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-xs">
              NQ
            </div>
            <span className="font-bold text-sm text-ink">Quốc Admin</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-surface-2 border border-border text-ink hover:text-pink-500 transition-colors cursor-pointer"
            title={isDarkMode ? 'Chế độ Sáng' : 'Chế độ Tối'}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
          <Link
            href="/"
            target="_blank"
            className="p-2 rounded-xl bg-surface-2 border border-border text-ink hover:text-pink-500 transition-colors"
            title="Xem trang chính"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Mobile Overlay backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sleek Modern Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-[100dvh] w-72 bg-surface-1/95 lg:bg-surface-1 border-r border-border backdrop-blur-xl flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md ring-2 ring-pink-500/20">
                NQ
              </div>
              <div>
                <h2 className="font-bold text-sm text-ink leading-tight">Ngô Quốc Portfolio</h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-mono text-ink-subtle">Admin Console v2.0</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-2 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 p-2.5 rounded-xl bg-surface-2 border border-border flex items-center justify-between text-[11px] font-mono">
            <span className="text-ink-muted flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-pink-500" />
              <span>Vercel / MongoDB</span>
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Ready</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="p-3.5 flex-1 overflow-y-auto space-y-1">
          <p className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-ink-subtle">
            Quản lý nội dung
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setSidebarOpen(false);
                  if (item.id === 'media' && mediaList.length === 0) {
                    fetchMediaList();
                  }
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer group text-left ${
                  isActive
                    ? 'bg-ink text-surface-1 shadow-sm'
                    : 'text-ink-muted hover:text-ink hover:bg-surface-2'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-pink-400' : 'text-ink-subtle group-hover:text-ink'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.count !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full font-mono text-[10px] ${
                      isActive
                        ? 'bg-surface-1/20 text-surface-1'
                        : 'bg-surface-2 text-ink-muted group-hover:text-ink border border-border'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border space-y-3 bg-surface-1">
          <div className="flex items-center justify-between p-2 rounded-xl bg-surface-2 border border-border">
            <span className="text-xs font-mono text-ink-muted flex items-center gap-2">
              {isDarkMode ? <Moon className="w-3.5 h-3.5 text-indigo-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
              <span>{isDarkMode ? 'Giao diện Tối' : 'Giao diện Sáng'}</span>
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-surface-1 text-ink hover:text-pink-500 border border-border shadow-xs transition-colors cursor-pointer"
            >
              Đổi theme
            </button>
          </div>

          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-surface-2 hover:border-pink-500/40 border border-border text-xs font-semibold text-ink transition-all shadow-xs"
          >
            <Eye className="w-3.5 h-3.5 text-pink-500" />
            <span>Xem Portfolio</span>
            <ExternalLink className="w-3 h-3 text-ink-subtle" />
          </Link>

          <div className="pt-2 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-pink-500/10 text-pink-500 border border-pink-500/20 flex items-center justify-center text-xs font-bold">
                A
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-ink leading-none">admin</p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">● Online</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
              title="Đăng xuất"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-canvas overflow-x-hidden">
        {/* Desktop Top Header Bar */}
        <header className="sticky top-0 z-30 bg-surface-1/80 backdrop-blur-md border-b border-border px-6 py-3.5 hidden lg:flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs font-mono">
            <span className="text-ink-subtle">Admin</span>
            <ChevronRight className="w-3.5 h-3.5 text-ink-subtle" />
            <span className="font-bold text-ink flex items-center gap-2">
              <CurrentIcon className="w-4 h-4 text-pink-500" />
              <span>{currentTabMeta.label}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-500 text-xs font-mono font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
              <span>📁 ngoquoc_portfolio</span>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-surface-2 border border-border text-ink hover:text-pink-500 transition-colors cursor-pointer"
              title={isDarkMode ? 'Chuyển sang Chế độ Sáng' : 'Chuyển sang Chế độ Tối'}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-surface-2 border border-border text-xs font-semibold text-ink hover:border-pink-500 transition-all shadow-xs"
            >
              <Eye className="w-3.5 h-3.5 text-pink-500" />
              <span>Xem trang chính</span>
              <ExternalLink className="w-3 h-3 text-ink-subtle" />
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-rose-500 bg-rose-500/10 hover:bg-rose-500/20 transition-colors cursor-pointer"
              title="Đăng xuất"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Tab Content Container */}
        <main className="flex-1 px-4 sm:px-8 lg:px-10 py-8 max-w-6xl w-full mx-auto">

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

      {/* TAB 3: FREELANCE JOBS */}
      {activeTab === 'freelance' && (
        <div className="space-y-8">
          {/* Form Add / Edit Freelance Job */}
          <div className="bg-surface-1 border border-border rounded-3xl p-6 sm:p-8 shadow-float">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-ink flex items-center gap-2">
                  <Award className="w-5 h-5 text-pink-500" />
                  <span>{editingJobId ? 'Chỉnh Sửa Job Freelance' : 'Thêm Dự Án Freelance Mới'}</span>
                </h2>
                <p className="text-xs text-ink-muted mt-0.5">
                  Nội dung này hiển thị trực tiếp tại trang công khai <Link href="/freelance" target="_blank" className="text-pink-500 font-mono hover:underline inline-flex items-center gap-0.5">/freelance <ExternalLink className="w-3 h-3" /></Link>
                </p>
              </div>

              {editingJobId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingJobId(null);
                    setJobForm({
                      title: '',
                      client_name: '',
                      role: '',
                      timeline: '',
                      category: 'Web App & EdTech',
                      scope: '',
                      deliverables: '',
                      tech_stack: '',
                      metrics: '',
                      image_url: '',
                      live_demo: '',
                      testimonial_quote: '',
                      testimonial_author: '',
                      testimonial_role: '',
                      testimonial_rating: 5,
                    });
                  }}
                  className="text-xs text-slate-500 hover:text-ink px-3 py-1.5 rounded-lg bg-surface-2 border border-border cursor-pointer self-start"
                >
                  Hủy chỉnh sửa
                </button>
              )}
            </div>

            <form onSubmit={handleSaveFreelanceJob} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Tên dự án (Job Title) *</label>
                <input
                  type="text"
                  required
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  placeholder="Ví dụ: Nền tảng E-Learning & Thanh toán Sakia"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Khách hàng / Doanh nghiệp (Client) *</label>
                <input
                  type="text"
                  required
                  value={jobForm.client_name}
                  onChange={(e) => setJobForm({ ...jobForm, client_name: e.target.value })}
                  placeholder="Ví dụ: Sakia Edu Group (Doanh nghiệp EdTech)"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Phân loại (Category)</label>
                <select
                  value={jobForm.category}
                  onChange={(e) => setJobForm({ ...jobForm, category: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
                >
                  <option value="Web App & EdTech">Web App &amp; EdTech</option>
                  <option value="SaaS & AI Solution">SaaS &amp; AI Solution</option>
                  <option value="Tối ưu hóa & Performance">Tối ưu hóa &amp; Performance</option>
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="Landing Page">Landing Page</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Vai trò đảm nhiệm (Role)</label>
                <input
                  type="text"
                  required
                  value={jobForm.role}
                  onChange={(e) => setJobForm({ ...jobForm, role: e.target.value })}
                  placeholder="Full Stack Web Developer / Lead Frontend"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Thời gian thực hiện (Timeline)</label>
                <input
                  type="text"
                  value={jobForm.timeline}
                  onChange={(e) => setJobForm({ ...jobForm, timeline: e.target.value })}
                  placeholder="Ví dụ: 1.5 tháng (Hoàn thành trước hạn 5 ngày)"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Link sản phẩm thực tế (Live Demo nếu có)</label>
                <input
                  type="url"
                  value={jobForm.live_demo}
                  onChange={(e) => setJobForm({ ...jobForm, live_demo: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-mono text-slate-500 mb-1">Phạm vi công việc &amp; Bài toán giải quyết (Scope) *</label>
                <textarea
                  required
                  rows={2}
                  value={jobForm.scope}
                  onChange={(e) => setJobForm({ ...jobForm, scope: e.target.value })}
                  placeholder="Xây dựng trọn gói hệ thống đăng ký khóa học, tích hợp cổng thanh toán trực tuyến và CMS quản trị học viên..."
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-mono text-slate-500 mb-1">Hạng mục đã bàn giao (Deliverables - ngăn cách bằng dấu phẩy) *</label>
                <textarea
                  required
                  rows={2}
                  value={jobForm.deliverables}
                  onChange={(e) => setJobForm({ ...jobForm, deliverables: e.target.value })}
                  placeholder="Giao diện học viên responsive, Hệ thống video chống tải lậu, Dashboard doanh thu, Bảo mật JWT"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none resize-none leading-relaxed"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-mono text-slate-500 mb-1">Ngăn xếp công nghệ (Tech Stack - ngăn cách bằng dấu phẩy) *</label>
                <input
                  type="text"
                  required
                  value={jobForm.tech_stack}
                  onChange={(e) => setJobForm({ ...jobForm, tech_stack: e.target.value })}
                  placeholder="Next.js 14, NestJS, TypeScript, MySQL, Prisma, TailwindCSS"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-mono text-slate-500 mb-1">Kết quả &amp; Hiệu quả đo lường (Metrics)</label>
                <input
                  type="text"
                  value={jobForm.metrics}
                  onChange={(e) => setJobForm({ ...jobForm, metrics: e.target.value })}
                  placeholder="Tăng 140% lượt đăng ký học trong tháng đầu tiên, PageSpeed đạt 98/100"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
                />
              </div>

              {/* Client Testimonial Section */}
              <div className="md:col-span-2 p-5 rounded-2xl bg-surface-2 border border-border space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink flex items-center gap-1.5 font-sans">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>Đánh Giá &amp; Phản Hồi Từ Khách Hàng (Testimonial)</span>
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-mono text-slate-400">Số sao:</span>
                    <select
                      value={jobForm.testimonial_rating}
                      onChange={(e) => setJobForm({ ...jobForm, testimonial_rating: Number(e.target.value) })}
                      className="px-2 py-1 rounded-lg bg-surface-1 border border-border text-xs text-ink font-bold"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                      <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                      <option value={3}>⭐⭐⭐ (3/5)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1">Lời nhận xét của khách hàng (Quote)</label>
                  <textarea
                    rows={2}
                    value={jobForm.testimonial_quote}
                    onChange={(e) => setJobForm({ ...jobForm, testimonial_quote: e.target.value })}
                    placeholder="Quốc làm việc cực kỳ chuyên nghiệp và kỷ luật. Bàn giao sớm hơn dự kiến và hỗ trợ kỹ thuật nhiệt tình..."
                    className="w-full px-4 py-2 rounded-xl bg-surface-1 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none resize-none leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-500 mb-1">Tên khách hàng / Người đánh giá</label>
                    <input
                      type="text"
                      value={jobForm.testimonial_author}
                      onChange={(e) => setJobForm({ ...jobForm, testimonial_author: e.target.value })}
                      placeholder="Ví dụ: Anh Nguyễn Minh Tuấn"
                      className="w-full px-4 py-2 rounded-xl bg-surface-1 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-500 mb-1">Chức vụ / Công ty</label>
                    <input
                      type="text"
                      value={jobForm.testimonial_role}
                      onChange={(e) => setJobForm({ ...jobForm, testimonial_role: e.target.value })}
                      placeholder="Founder & Giám đốc Điều hành Sakia Edu"
                      className="w-full px-4 py-2 rounded-xl bg-surface-1 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Job Photo Upload */}
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-mono text-slate-500">Hình ảnh dự án (Screenshot / Mockup)</label>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-semibold text-pink-500 hover:text-pink-600">
                    {uploading === 'freelance_image' ? (
                      <span className="flex items-center gap-1">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Đang tải lên Cloudinary...</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>Tải ảnh từ máy lên Cloudinary (ngoquoc_portfolio)</span>
                      </span>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading === 'freelance_image'}
                      onChange={(e) => handleCloudinaryUpload(e, 'freelance_image')}
                    />
                  </label>
                </div>

                <div className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={jobForm.image_url}
                    onChange={(e) => setJobForm({ ...jobForm, image_url: e.target.value })}
                    placeholder="https://res.cloudinary.com/dguad3xyf/... hoặc nhấn tải lên ở góc phải"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
                  />
                  {jobForm.image_url && (
                    <img
                      src={jobForm.image_url}
                      alt="Preview"
                      className="w-11 h-11 rounded-xl object-cover border border-border shrink-0"
                    />
                  )}
                </div>
              </div>

              <div className="md:col-span-2 pt-4 flex items-center justify-between border-t border-border mt-2">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-pink-500 text-white font-bold text-sm hover:bg-pink-600 transition-all shadow-sm cursor-pointer"
                >
                  {editingJobId ? 'Cập nhật Job Freelance' : 'Lưu & Thêm Job Freelance'}
                </button>

                <button
                  type="button"
                  onClick={handleResetDefaultJobs}
                  className="text-xs text-slate-500 hover:text-ink flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Khôi phục 3 job freelance mẫu</span>
                </button>
              </div>
            </form>
          </div>

          {/* List of Existing Freelance Jobs */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-sans font-bold text-base text-ink">
                Danh sách dự án Freelance đã hoàn thành ({freelanceJobs.length})
              </h3>
              <Link
                href="/freelance"
                target="_blank"
                className="text-xs font-mono text-pink-500 hover:underline flex items-center gap-1"
              >
                <span>Xem trang công khai</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {freelanceJobs.map((job, idx) => (
                <div
                  key={job._id || idx}
                  className="bg-surface-1 border border-border rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:border-pink-500/50 transition-colors"
                >
                  <div className="flex gap-4">
                    {job.image_url ? (
                      <img
                        src={job.image_url}
                        alt={job.title}
                        className="w-20 h-20 rounded-xl object-cover border border-border shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-xl bg-surface-2 border border-border flex items-center justify-center text-slate-400 shrink-0">
                        <Award className="w-6 h-6 opacity-40" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-pink-500/10 text-pink-500 font-semibold border border-pink-500/20">
                          {job.category}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {job.timeline}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-ink truncate leading-tight">{job.title}</h4>
                      <p className="text-xs text-ink-muted mt-0.5 truncate">
                        Khách hàng: <span className="font-semibold text-ink">{job.client_name}</span>
                      </p>
                      {job.testimonial && (
                        <div className="flex items-center gap-1 mt-2 text-amber-400">
                          {[...Array(job.testimonial.rating || 5)].map((_, sIdx) => (
                            <Star key={sIdx} className="w-3 h-3 fill-amber-400" />
                          ))}
                          <span className="text-[10px] font-mono text-ink-muted ml-1 truncate">
                            "{job.testimonial.quote.slice(0, 45)}..."
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-border">
                    <div>
                      {job.live_demo && (
                        <a
                          href={job.live_demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-pink-500 hover:underline flex items-center gap-1"
                        >
                          Demo <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditJobClick(job)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-pink-500 hover:bg-surface-2 transition-colors cursor-pointer"
                        title="Chỉnh sửa job này"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteFreelanceJob(job._id || '')}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-500 hover:bg-surface-2 transition-colors cursor-pointer"
                        title="Xóa job này"
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

      {/* TAB: WORK EXPERIENCES */}
      {activeTab === 'experience' && (
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
                  onClick={() => {
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
                  }}
                  className="text-xs font-mono text-pink-500 hover:underline cursor-pointer"
                >
                  Hủy chỉnh sửa (Tạo mới)
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Company Name */}
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Tên công ty / Tổ chức *</label>
                <input
                  type="text"
                  required
                  value={expForm.company}
                  onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                  placeholder="Ví dụ: E-Commerce &amp; Digital Agency"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Vị trí / Chức danh đảm nhiệm *</label>
                <input
                  type="text"
                  required
                  value={expForm.role}
                  onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                  placeholder="Ví dụ: Front End &amp; E-Commerce Developer"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
                />
              </div>

              {/* Period */}
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

              {/* Work Type */}
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

              {/* Location */}
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Địa điểm / Khu vực</label>
                <input
                  type="text"
                  value={expForm.location}
                  onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                  placeholder="Ví dụ: TP. Hồ Chí Minh &amp; Remote"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
                />
              </div>

              {/* Company Logo */}
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Logo công ty (URL Cloudinary hoặc tùy chọn)</label>
                <input
                  type="text"
                  value={expForm.company_logo}
                  onChange={(e) => setExpForm({ ...expForm, company_logo: e.target.value })}
                  placeholder="https://res.cloudinary.com/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none font-mono text-xs"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-xs font-mono text-slate-500 mb-1">Mô tả tổng quan về trách nhiệm &amp; môi trường làm việc *</label>
                <textarea
                  rows={2}
                  required
                  value={expForm.description}
                  onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                  placeholder="Chuyên sâu phát triển và tùy biến giao diện thương mại điện tử chuyên nghiệp cho các thương hiệu trên nền tảng Shopify và BigCommerce..."
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none leading-relaxed"
                />
              </div>

              {/* Achievements (each line 1 achievement) */}
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

              {/* Tech Stack */}
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
                  onClick={() => {
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
                  }}
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
                        <span className="font-bold text-base text-ink font-sans">
                          {exp.role}
                        </span>
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

                  <p className="text-xs text-ink-muted leading-relaxed">
                    {exp.description}
                  </p>

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
      )}

      {/* TAB 4: ABOUT & SKILLS */}
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

      {/* TAB 5: CLOUDINARY MEDIA LIBRARY */}
      {activeTab === 'media' && (
        <div className="space-y-6">
          {/* Header & Upload Bar */}
          <div className="bg-surface-1 border border-border rounded-3xl p-6 sm:p-8 shadow-float">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
              <div>
                <h2 className="text-xl font-bold text-ink flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-pink-500" />
                  <span>Quản Lý &amp; Đồng Bộ Thư Viện Ảnh Cloudinary</span>
                </h2>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="text-xs text-ink-muted">Chỉ đồng bộ thư mục:</span>
                  <span className="px-2 py-0.5 rounded-md bg-pink-500/10 text-pink-500 font-mono text-[11px] font-semibold border border-pink-500/20">
                    📁 ngoquoc_portfolio/
                  </span>
                  <span className="text-xs text-ink-subtle">· Cloud: dguad3xyf</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={fetchMediaList}
                  disabled={loadingMedia}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-xs font-semibold text-ink hover:border-pink-500 transition-all cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingMedia ? 'animate-spin text-pink-500' : ''}`} />
                  <span>{loadingMedia ? 'Đang đồng bộ...' : 'Đồng bộ lại từ Cloudinary'}</span>
                </button>

                <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pink-500 text-white font-semibold text-xs hover:bg-pink-600 transition-all cursor-pointer shadow-sm">
                  {uploadingMediaFile ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Đang tải lên...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4" />
                      <span>Tải ảnh mới lên Cloudinary</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploadingMediaFile}
                    onChange={handleUploadMediaFile}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Stats & Search Bar */}
            <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-ink-muted">
                <span className="font-bold text-ink text-sm">{filteredMedia.length}</span> hình ảnh trên Cloudinary
                <span>·</span>
                <span>Tổng: {(filteredMedia.reduce((acc, curr) => acc + (curr.bytes || 0), 0) / 1024 / 1024).toFixed(2)} MB</span>
              </div>

              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-ink-subtle absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên / public_id..."
                  value={mediaSearch}
                  onChange={(e) => setMediaSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface-2 border border-border text-xs text-ink placeholder:text-ink-subtle focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>
          </div>

          {/* Media Grid */}
          {loadingMedia ? (
            <div className="p-16 text-center bg-surface-1 border border-border rounded-3xl flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-pink-500 animate-spin mb-3" />
              <p className="text-sm font-semibold text-ink">Đang đồng bộ thư viện ảnh từ Cloudinary...</p>
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="p-16 text-center bg-surface-1 border border-border rounded-3xl text-ink-muted">
              <ImageIcon className="w-12 h-12 text-ink-subtle mx-auto mb-3 opacity-50" />
              <p className="text-sm font-semibold text-ink">Không tìm thấy hình ảnh nào</p>
              <p className="text-xs text-ink-muted mt-1">Hãy nhấn "Tải ảnh mới lên Cloudinary" ở góc trên để bắt đầu tải ảnh.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredMedia.map((item) => (
                <div
                  key={item.public_id}
                  className="group relative bg-surface-1 border border-border rounded-2xl overflow-hidden shadow-xs hover:shadow-float hover:border-pink-500/50 transition-all flex flex-col"
                >
                  {/* Image Preview thumbnail */}
                  <div
                    onClick={() => setSelectedMediaPreview(item.url)}
                    className="relative w-full aspect-[4/3] bg-surface-2 overflow-hidden cursor-pointer flex items-center justify-center group/thumb"
                  >
                    <img
                      src={item.url}
                      alt={item.public_id}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover/thumb:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <span className="text-white text-xs font-semibold bg-black/60 px-3 py-1.5 rounded-full flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Xem lớn</span>
                      </span>
                    </div>
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/60 text-white font-mono text-[9px] uppercase tracking-wider backdrop-blur-xs">
                      {item.format}
                    </span>
                  </div>

                  {/* Details & Actions */}
                  <div className="p-3.5 flex flex-col flex-1 justify-between gap-3">
                    <div>
                      <p className="font-mono text-xs font-bold text-ink truncate" title={item.public_id}>
                        {item.public_id.split('/').pop()}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-ink-muted mt-1">
                        <span>{item.width}x{item.height}</span>
                        <span>·</span>
                        <span>{((item.bytes || 0) / 1024).toFixed(0)} KB</span>
                        <span>·</span>
                        <span>{new Date(item.created_at).toLocaleDateString('vi-VN')}</span>
                      </div>
                    </div>

                    {/* Quick action buttons */}
                    <div className="space-y-1.5 pt-2 border-t border-border">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleCopyMediaUrl(item.url)}
                          className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-surface-2 hover:bg-pink-500/10 hover:text-pink-600 text-ink text-[11px] font-semibold transition-colors cursor-pointer"
                          title="Sao chép liên kết URL ảnh"
                        >
                          {copiedMediaUrl === item.url ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-500" />
                              <span className="text-emerald-600">Đã chép!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Chép URL</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteMedia(item.public_id)}
                          className="p-1.5 rounded-lg bg-surface-2 hover:bg-rose-500/15 text-rose-500 transition-colors cursor-pointer"
                          title="Xóa vĩnh viễn khỏi Cloudinary"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-4 gap-1">
                        <button
                          type="button"
                          onClick={() => handleSetAvatarFromMedia(item.url)}
                          className="py-1 px-1 rounded-lg bg-surface-2 hover:bg-emerald-500/15 hover:text-emerald-600 text-[10px] font-mono font-medium text-ink transition-colors cursor-pointer text-center truncate"
                          title="Đặt làm ảnh Avatar trang chính"
                        >
                          Avatar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUseInProjectFromMedia(item.url)}
                          className="py-1 px-1.5 rounded-lg bg-surface-2 hover:bg-purple-500/15 hover:text-purple-600 text-[10px] font-mono font-medium text-ink transition-colors cursor-pointer text-center truncate"
                          title="Điền link ảnh vào Dự án"
                        >
                          Dự án
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUseInFreelanceFromMedia(item.url)}
                          className="py-1 px-1 rounded-lg bg-surface-2 hover:bg-pink-500/15 hover:text-pink-600 text-[10px] font-mono font-medium text-ink transition-colors cursor-pointer text-center truncate"
                          title="Điền link ảnh vào Job Freelance"
                        >
                          Freelance
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUseInExperienceFromMedia(item.url)}
                          className="py-1 px-1 rounded-lg bg-surface-2 hover:bg-amber-500/15 hover:text-amber-600 text-[10px] font-mono font-medium text-ink transition-colors cursor-pointer text-center truncate"
                          title="Điền link ảnh vào logo Công ty (Kinh nghiệm)"
                        >
                          K.nghiệm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modal Lightbox Preview */}
          {selectedMediaPreview && (
            <div
              onClick={() => setSelectedMediaPreview(null)}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer animate-fade-in"
            >
              <div className="relative max-w-4xl max-h-[90vh] bg-surface-1 rounded-3xl overflow-hidden border border-white/20 p-2 shadow-2xl cursor-default" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => setSelectedMediaPreview(null)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
                <img
                  src={selectedMediaPreview}
                  alt="Preview"
                  className="max-h-[80vh] w-auto object-contain rounded-2xl mx-auto"
                />
                <div className="p-4 flex items-center justify-between gap-4">
                  <span className="font-mono text-xs text-ink-muted truncate max-w-md">
                    {selectedMediaPreview}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyMediaUrl(selectedMediaPreview)}
                    className="px-4 py-2 rounded-full bg-ink text-surface-1 text-xs font-semibold flex items-center gap-1.5 shrink-0 hover:opacity-90"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Sao chép Link</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 6: MESSAGES */}
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
        </main>
      </div>
    </div>
  );
}
