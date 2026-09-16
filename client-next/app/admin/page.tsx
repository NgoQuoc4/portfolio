'use client';

import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import {
  defaultProfile,
  defaultProjects,
  defaultFreelanceJobs,
  defaultExperiences,
  defaultResume,
} from '@/lib/defaults';
import type {
  Profile,
  ProjectItem,
  Message,
  FreelanceJob,
  ExperienceItem,
  ResumeData,
} from '@/lib/types';
import {
  Sparkles,
  User,
  Briefcase,
  Building2,
  Share2,
  Globe,
  Award,
  FileText,
  Image as ImageIcon,
  MessageSquare,
} from 'lucide-react';
import { ToastProvider, useToast } from '@/components/admin/Toast';
import { AdminAuth } from '@/components/admin/AdminAuth';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { HeroTab } from '@/components/admin/tabs/HeroTab';
import { AboutTab } from '@/components/admin/tabs/AboutTab';
import { ProjectsTab } from '@/components/admin/tabs/ProjectsTab';
import { ExperienceTab } from '@/components/admin/tabs/ExperienceTab';
import { ContactTab } from '@/components/admin/tabs/ContactTab';
import { FooterTab } from '@/components/admin/tabs/FooterTab';
import { FreelanceTab } from '@/components/admin/tabs/FreelanceTab';
import { ResumeTab } from '@/components/admin/tabs/ResumeTab';
import { MediaTab } from '@/components/admin/tabs/MediaTab';
import { MessagesTab } from '@/components/admin/tabs/MessagesTab';
import type {
  AdminTabId,
  PageFilterId,
  PageSectionGroup,
  NavItem,
  MediaResource,
} from '@/components/admin/types';

function AdminDashboardContent() {
  const { showToast } = useToast();

  // Authentication & Global Shell State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState<AdminTabId>('hero');
  const [selectedPageFilter, setSelectedPageFilter] = useState<PageFilterId>('all');

  // Core Data
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [projects, setProjects] = useState<ProjectItem[]>(defaultProjects);
  const [freelanceJobs, setFreelanceJobs] = useState<FreelanceJob[]>(defaultFreelanceJobs);
  const [experiences, setExperiences] = useState<ExperienceItem[]>(defaultExperiences);
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResume);
  const [messages, setMessages] = useState<Message[]>([]);
  const [skillsString, setSkillsString] = useState('');

  // Media Library State
  const [mediaList, setMediaList] = useState<MediaResource[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [uploadingMediaFile, setUploadingMediaFile] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  // Initialize Data
  useEffect(() => {
    // Check active session cookie
    fetch('/api/auth')
      .then((r) => r.json())
      .then((d) => {
        if (d.authenticated) setIsAuthenticated(true);
      })
      .catch(() => {});

    // Load from localStorage
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
      if (localProj) setProjects(JSON.parse(localProj));

      const localJobs = localStorage.getItem('portfolio_freelance_jobs');
      if (localJobs) setFreelanceJobs(JSON.parse(localJobs));

      const localExp = localStorage.getItem('portfolio_experiences');
      if (localExp) setExperiences(JSON.parse(localExp));

      const localResume = localStorage.getItem('portfolio_resume');
      if (localResume) setResumeData(JSON.parse(localResume));

      const savedTheme = localStorage.getItem('portfolio_theme');
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
        if (savedTheme === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      }
    } catch {}

    fetchBackendData();
    fetchMediaList();
  }, []);

  const fetchBackendData = async () => {
    try {
      const [profRes, projRes, msgRes] = await Promise.allSettled([
        api.get('/profile'),
        api.get('/projects'),
        api.get('/messages'),
      ]);

      if (profRes.status === 'fulfilled' && profRes.value.data) {
        setProfile((prev) => ({ ...prev, ...profRes.value.data }));
        if (profRes.value.data.skills) {
          setSkillsString(profRes.value.data.skills.join(', '));
        }
        if (profRes.value.data.resume_data) {
          setResumeData(profRes.value.data.resume_data);
          localStorage.setItem('portfolio_resume', JSON.stringify(profRes.value.data.resume_data));
        }
      }

      if (
        projRes.status === 'fulfilled' &&
        Array.isArray(projRes.value.data) &&
        projRes.value.data.length > 0
      ) {
        setProjects(projRes.value.data);
      }

      if (msgRes.status === 'fulfilled' && Array.isArray(msgRes.value.data)) {
        setMessages(msgRes.value.data);
      }
    } catch (err) {
      console.warn('Backend data load deferred:', err);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('token');
    await fetch('/api/auth', { method: 'DELETE' }).catch(() => {});
    setIsAuthenticated(false);
    showToast('Đã đăng xuất an toàn khỏi trang quản trị!', 'info');
  };

  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('portfolio_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('portfolio_theme', 'light');
    }
  };

  // Cloudinary Single Upload
  const handleCloudinaryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(field);
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

      const uploadedUrl = data.url;
      if (field === 'profile_avatar') {
        const updated = { ...profile, avatar_url: uploadedUrl };
        setProfile(updated);
        localStorage.setItem('portfolio_profile', JSON.stringify(updated));
        await api.put('/profile', updated).catch(() => null);
      }

      showToast('Đã tải ảnh lên Cloudinary thành công!', 'success');
      await fetchMediaList();
    } catch (err: any) {
      showToast(err.message || 'Lỗi khi tải ảnh lên Cloudinary', 'error');
    } finally {
      setUploading(null);
      e.target.value = '';
    }
  };

  // Media List Actions
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
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Xóa ảnh thất bại');

      setMediaList((prev) => prev.filter((m) => m.public_id !== publicId));
      showToast('Đã xóa ảnh khỏi Cloudinary thành công!', 'info');
    } catch (err: any) {
      showToast(err.message || 'Lỗi khi xóa ảnh khỏi Cloudinary', 'error');
    }
  };

  const handleSetAvatarFromMedia = (url: string) => {
    const updated = { ...profile, avatar_url: url };
    setProfile(updated);
    localStorage.setItem('portfolio_profile', JSON.stringify(updated));
    api.put('/profile', updated).catch(() => null);
    showToast('Đã cập nhật Avatar mới cho trang chính!', 'success');
  };

  const handleUseInResumeFromMedia = (url: string) => {
    const updated = { ...resumeData, avatar_url: url };
    setResumeData(updated);
    localStorage.setItem('portfolio_resume', JSON.stringify(updated));
    api.put('/profile', { resume_data: updated }).catch(() => null);
    setActiveTab('resume');
    showToast('Đã đặt làm Avatar cho trang Resume (CV)!', 'success');
  };

  const handleUseInProjectFromMedia = () => {
    setActiveTab('projects');
    showToast('Vui lòng dán link ảnh vào ô Ảnh bìa dự án!', 'info');
  };

  const handleUseInFreelanceFromMedia = () => {
    setActiveTab('freelance');
    showToast('Vui lòng dán link ảnh vào ô Hình ảnh dự án!', 'info');
  };

  const handleUseInExperienceFromMedia = () => {
    setActiveTab('experience');
    showToast('Vui lòng dán link ảnh vào ô Logo công ty!', 'info');
  };

  // Save Profile Handler (for Hero, About, Contact, Footer, Section Headers)
  const handleSaveProfile = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const skillsArray = skillsString
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const updatedProfile: Profile = {
      ...profile,
      skills: skillsArray,
    };

    setProfile(updatedProfile);
    localStorage.setItem('portfolio_profile', JSON.stringify(updatedProfile));

    try {
      await api.put('/profile', updatedProfile);
      showToast('Đã lưu cấu hình thành công vào hệ thống!', 'success');
    } catch {
      showToast('Đã lưu vào bộ nhớ cục bộ (localStorage)!', 'info');
    }
  };

  // Delete Message Handler
  const handleDeleteMessage = async (id: string) => {
    try {
      await api.delete(`/messages/${id}`).catch(() => null);
    } catch {}
    setMessages(messages.filter((m) => m._id !== id));
    showToast('Đã xóa tin nhắn!', 'info');
  };

  // Navigation Structure Definitions
  const pageGroups: PageSectionGroup[] = [
    {
      id: 'home',
      title: 'Trang Chủ',
      path: '/',
      badge: '/',
      description: 'Cấu hình toàn bộ các section trên trang chủ portfolio',
      items: [
        { id: 'hero', label: '1. Nhận diện & Hero', icon: Sparkles, pageId: 'home', pageName: 'Trang Chủ', pagePath: '/', desc: 'Preloader, digital desk, headline & avatar' },
        { id: 'about', label: '2. Giới thiệu & Kỹ năng', icon: User, pageId: 'home', pageName: 'Trang Chủ', pagePath: '/', desc: 'Tiểu sử, kỹ năng chính & logo công nghệ' },
        { id: 'projects', label: '3. Dự án chọn lọc', icon: Briefcase, count: projects.length, pageId: 'home', pageName: 'Trang Chủ', pagePath: '/', desc: 'Danh sách và tiêu đề các dự án tiêu biểu' },
        { id: 'experience', label: '4. Kinh nghiệm sự nghiệp', icon: Building2, count: experiences.length, pageId: 'home', pageName: 'Trang Chủ', pagePath: '/', desc: 'Các mốc công ty, vai trò, thành tựu thực chiến' },
        { id: 'contact', label: '5. Liên hệ & MXH', icon: Share2, pageId: 'home', pageName: 'Trang Chủ', pagePath: '/', desc: 'Tiêu đề, email, điện thoại, lịch & mạng xã hội' },
        { id: 'footer', label: '6. Chân trang & Brand', icon: Globe, pageId: 'home', pageName: 'Trang Chủ', pagePath: '/', desc: 'Chữ thương hiệu lớn, bản quyền và trạng thái' },
      ],
    },
    {
      id: 'freelance',
      title: 'Trang Freelance',
      path: '/freelance',
      badge: '/freelance',
      description: 'Cấu hình case studies, dự án khách hàng và đánh giá 5⭐',
      items: [
        { id: 'freelance', label: 'Jobs Freelance & Đánh giá', icon: Award, count: freelanceJobs.length, badge: '5⭐', pageId: 'freelance', pageName: 'Trang Freelance', pagePath: '/freelance', desc: 'Dự án khách hàng, deliverables, metrics và đánh giá 5⭐' },
      ],
    },
    {
      id: 'resume',
      title: 'Trang Resume (CV)',
      path: '/resume',
      badge: '/resume',
      description: 'Cấu hình thông tin chuyên môn, kinh nghiệm, học vấn & dự án trên CV',
      items: [
        { id: 'resume', label: 'Hồ Sơ CV (Resume)', icon: FileText, badge: 'CV', pageId: 'resume', pageName: 'Trang Resume', pagePath: '/resume', desc: 'Header, Bio, Skills, Experience, Projects & Education' },
      ],
    },
    {
      id: 'system',
      title: 'Hệ Thống & Tiện Ích',
      path: '/',
      badge: 'Tiện ích',
      description: 'Kho lưu trữ đám mây và tin nhắn phản hồi từ khách',
      items: [
        { id: 'media', label: 'Thư viện Cloudinary', icon: ImageIcon, count: mediaList.length, badge: 'Cloud', pageId: 'system', pageName: 'Hệ Thống', pagePath: '/', desc: 'Quản lý & đồng bộ hình ảnh đám mây' },
        { id: 'messages', label: 'Hộp thư Tin nhắn', icon: MessageSquare, count: messages.length, pageId: 'system', pageName: 'Hệ Thống', pagePath: '/', desc: 'Tin nhắn phản hồi từ khách truy cập' },
      ],
    },
  ];

  const allNavItems: NavItem[] = pageGroups.flatMap((g) => g.items);
  const currentTabMeta = allNavItems.find((n) => n.id === activeTab) || allNavItems[0];
  const visiblePageGroups =
    selectedPageFilter === 'all'
      ? pageGroups
      : pageGroups.filter((g) => g.id === selectedPageFilter);

  if (!isAuthenticated) {
    return (
      <AdminAuth
        onLoginSuccess={() => {
          setIsAuthenticated(true);
          fetchBackendData();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col lg:flex-row antialiased">
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        selectedPageFilter={selectedPageFilter}
        setSelectedPageFilter={setSelectedPageFilter}
        visiblePageGroups={visiblePageGroups}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onTabSelect={(tab) => {
          if (tab === 'media' && mediaList.length === 0) fetchMediaList();
        }}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        handleLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col min-w-0 bg-canvas overflow-x-hidden">
        <AdminHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          currentTabMeta={currentTabMeta}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          handleLogout={handleLogout}
        />

        <main className="flex-1 px-4 sm:px-8 lg:px-10 py-8 max-w-6xl w-full mx-auto">
          {activeTab === 'hero' && (
            <HeroTab
              profile={profile}
              setProfile={setProfile}
              handleSaveProfile={handleSaveProfile}
              uploading={uploading}
              handleCloudinaryUpload={handleCloudinaryUpload}
            />
          )}

          {activeTab === 'about' && (
            <AboutTab
              profile={profile}
              setProfile={setProfile}
              skillsString={skillsString}
              setSkillsString={setSkillsString}
              handleSaveProfile={handleSaveProfile}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsTab
              profile={profile}
              setProfile={setProfile}
              onSaveProfile={handleSaveProfile}
              projects={projects}
              setProjects={setProjects}
              uploading={uploading}
              handleCloudinaryUpload={handleCloudinaryUpload}
              showToast={showToast}
              mediaList={mediaList}
              fetchMediaList={fetchMediaList}
              loadingMedia={loadingMedia}
            />
          )}

          {activeTab === 'experience' && (
            <ExperienceTab
              profile={profile}
              setProfile={setProfile}
              onSaveProfile={handleSaveProfile}
              experiences={experiences}
              setExperiences={setExperiences}
              showToast={showToast}
            />
          )}

          {activeTab === 'contact' && (
            <ContactTab
              profile={profile}
              setProfile={setProfile}
              handleSaveProfile={handleSaveProfile}
            />
          )}

          {activeTab === 'footer' && (
            <FooterTab
              profile={profile}
              setProfile={setProfile}
              handleSaveProfile={handleSaveProfile}
            />
          )}

          {activeTab === 'freelance' && (
            <FreelanceTab
              profile={profile}
              setProfile={setProfile}
              freelanceJobs={freelanceJobs}
              setFreelanceJobs={setFreelanceJobs}
              uploading={uploading}
              handleCloudinaryUpload={handleCloudinaryUpload}
              showToast={showToast}
            />
          )}

          {activeTab === 'resume' && (
            <ResumeTab
              resumeData={resumeData}
              setResumeData={setResumeData}
              profile={profile}
              setProfile={setProfile}
              experiences={experiences}
              projects={projects}
              showToast={showToast}
            />
          )}

          {activeTab === 'media' && (
            <MediaTab
              mediaList={mediaList}
              loadingMedia={loadingMedia}
              uploadingMediaFile={uploadingMediaFile}
              fetchMediaList={fetchMediaList}
              handleUploadMediaFile={handleUploadMediaFile}
              handleDeleteMedia={handleDeleteMedia}
              handleSetAvatarFromMedia={handleSetAvatarFromMedia}
              handleUseInResumeFromMedia={handleUseInResumeFromMedia}
              handleUseInProjectFromMedia={handleUseInProjectFromMedia}
              handleUseInFreelanceFromMedia={handleUseInFreelanceFromMedia}
              handleUseInExperienceFromMedia={handleUseInExperienceFromMedia}
              showToast={showToast}
            />
          )}

          {activeTab === 'messages' && (
            <MessagesTab
              messages={messages}
              onDeleteMessage={handleDeleteMessage}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <ToastProvider>
      <AdminDashboardContent />
    </ToastProvider>
  );
}
