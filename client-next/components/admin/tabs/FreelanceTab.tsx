'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  Briefcase,
  ExternalLink,
  UploadCloud,
  Loader2,
  RefreshCw,
  Eye,
  EyeOff,
  Star,
  Edit2,
  Trash2,
} from 'lucide-react';
import api from '@/lib/api';
import { defaultFreelanceJobs } from '@/lib/defaults';
import type { Profile, FreelanceJob } from '@/lib/types';

interface FreelanceTabProps {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  freelanceJobs: FreelanceJob[];
  setFreelanceJobs: React.Dispatch<React.SetStateAction<FreelanceJob[]>>;
  uploading: string | null;
  handleCloudinaryUpload: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void | Promise<void>;
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}

export const FreelanceTab: React.FC<FreelanceTabProps> = ({
  profile,
  setProfile,
  freelanceJobs,
  setFreelanceJobs,
  uploading,
  handleCloudinaryUpload,
  showToast,
}) => {
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

  const resetForm = () => {
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

  const handleSaveFreelanceJob = (e: React.FormEvent) => {
    e.preventDefault();
    const deliverablesArray = jobForm.deliverables
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const techStackArray = jobForm.tech_stack
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

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
      resetForm();
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
      resetForm();
    }
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

  return (
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
              Nội dung này hiển thị trực tiếp tại trang công khai{' '}
              <Link
                href="/freelance"
                target="_blank"
                className="text-pink-500 font-mono hover:underline inline-flex items-center gap-0.5"
              >
                /freelance <ExternalLink className="w-3 h-3" />
              </Link>
            </p>
          </div>

          {editingJobId && (
            <button
              type="button"
              onClick={resetForm}
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
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Khách hàng / Doanh nghiệp (Client) *
            </label>
            <input
              type="text"
              required
              value={jobForm.client_name}
              onChange={(e) => setJobForm({ ...jobForm, client_name: e.target.value })}
              placeholder="Ví dụ: Sakia Edu Group (Doanh nghiệp EdTech)"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">Vai trò đảm nhiệm</label>
              <input
                type="text"
                required
                value={jobForm.role}
                onChange={(e) => setJobForm({ ...jobForm, role: e.target.value })}
                placeholder="Full Stack Lead Developer"
                className="w-full px-3 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">Thời gian triển khai</label>
              <input
                type="text"
                required
                value={jobForm.timeline}
                onChange={(e) => setJobForm({ ...jobForm, timeline: e.target.value })}
                placeholder="10/2025 - 01/2026 (3 tháng)"
                className="w-full px-3 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">Phân loại lĩnh vực</label>
              <select
                value={jobForm.category}
                onChange={(e) => setJobForm({ ...jobForm, category: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
              >
                <option value="Web App & EdTech">Web App &amp; EdTech</option>
                <option value="Landing Page & Marketing">Landing Page &amp; Marketing</option>
                <option value="Admin & CRM System">Admin &amp; CRM System</option>
                <option value="E-Commerce & Retail">E-Commerce &amp; Retail</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">Link Live Demo (nếu có)</label>
              <input
                type="text"
                value={jobForm.live_demo}
                onChange={(e) => setJobForm({ ...jobForm, live_demo: e.target.value })}
                placeholder="https://client-demo.com"
                className="w-full px-3 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Phạm vi bài toán &amp; Thách thức (Scope / Problem) *
            </label>
            <textarea
              required
              rows={2}
              value={jobForm.scope}
              onChange={(e) => setJobForm({ ...jobForm, scope: e.target.value })}
              placeholder="Mô tả bài toán của khách hàng: ví dụ hệ thống cũ chậm, không bảo mật, cần xây mới kiến trúc..."
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none resize-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Các kết quả bàn giao (Deliverables - ngăn cách bằng dấu phẩy) *
            </label>
            <input
              type="text"
              required
              value={jobForm.deliverables}
              onChange={(e) => setJobForm({ ...jobForm, deliverables: e.target.value })}
              placeholder="Kiến trúc Microservices, Giao diện Next.js 15, Cổng thanh toán MoMo/VNPAY, Hệ thống LMS"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Công nghệ sử dụng (Tech Stack - ngăn cách bằng dấu phẩy) *
            </label>
            <input
              type="text"
              required
              value={jobForm.tech_stack}
              onChange={(e) => setJobForm({ ...jobForm, tech_stack: e.target.value })}
              placeholder="Next.js, NestJS, TailwindCSS, MongoDB, Redis, Docker"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-500 mb-1">
              Kết quả đo lường nổi bật (Key Metric / Result) *
            </label>
            <input
              type="text"
              required
              value={jobForm.metrics}
              onChange={(e) => setJobForm({ ...jobForm, metrics: e.target.value })}
              placeholder="Tăng 180% lưu lượng truy cập, 99.9% Uptime, Tải trang < 0.8s"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-sm text-ink focus:border-pink-500 focus:outline-none"
            />
          </div>

          {/* Testimonial Section */}
          <div className="md:col-span-2 p-4 rounded-2xl bg-surface-2 border border-border space-y-3">
            <span className="text-xs font-bold text-ink uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Đánh giá &amp; Phản hồi từ khách hàng (Testimonial)</span>
            </span>

            <div>
              <label className="block text-[11px] font-mono text-slate-500 mb-1">Nội dung lời khen / trích dẫn</label>
              <textarea
                rows={2}
                value={jobForm.testimonial_quote}
                onChange={(e) => setJobForm({ ...jobForm, testimonial_quote: e.target.value })}
                placeholder="Ví dụ: Quốc làm việc rất chuẩn chỉ, tốc độ hoàn thành nhanh ngoài mong đợi và kiến trúc cực kỳ sạch..."
                className="w-full px-3 py-2 rounded-xl bg-surface-1 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-slate-500 mb-1">Họ tên người đánh giá</label>
                <input
                  type="text"
                  value={jobForm.testimonial_author}
                  onChange={(e) => setJobForm({ ...jobForm, testimonial_author: e.target.value })}
                  placeholder="Nguyễn Văn A"
                  className="w-full px-3 py-2 rounded-xl bg-surface-1 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-slate-500 mb-1">Chức vụ / Công ty</label>
                <input
                  type="text"
                  value={jobForm.testimonial_role}
                  onChange={(e) => setJobForm({ ...jobForm, testimonial_role: e.target.value })}
                  placeholder="Founder &amp; CEO, Sakia Edu"
                  className="w-full px-3 py-2 rounded-xl bg-surface-1 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-slate-500 mb-1">Số sao đánh giá (1 - 5)</label>
                <select
                  value={jobForm.testimonial_rating}
                  onChange={(e) => setJobForm({ ...jobForm, testimonial_rating: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-1 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 sao - Xuất sắc)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 sao - Rất tốt)</option>
                  <option value={3}>⭐⭐⭐ (3 sao - Tốt)</option>
                </select>
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-1 border border-border p-4 sm:p-5 rounded-2xl shadow-xs">
          <div>
            <h3 className="font-sans font-bold text-base text-ink flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-pink-500" />
              <span>Danh sách dự án Freelance đã hoàn thành ({freelanceJobs.length})</span>
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Kiểm soát bật/tắt hiển thị danh sách các case study dự án Freelance và bộ lọc trên trang /freelance.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                profile.show_freelance_jobs !== false
                  ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  profile.show_freelance_jobs !== false ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
              />
              {profile.show_freelance_jobs !== false ? 'Đang hiển thị trên trang' : 'Đang ẩn khỏi trang'}
            </span>

            <button
              type="button"
              onClick={() => {
                const nextVal = profile.show_freelance_jobs === false ? true : false;
                const updated = { ...profile, show_freelance_jobs: nextVal };
                setProfile(updated);
                localStorage.setItem('portfolio_profile', JSON.stringify(updated));
                api.put('/profile', updated).catch(() => null);
                showToast(
                  nextVal
                    ? 'Đã BẬT hiển thị danh sách dự án Freelance trên trang /freelance'
                    : 'Đã ẨN danh sách dự án Freelance khỏi trang /freelance',
                  'success'
                );
              }}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                profile.show_freelance_jobs !== false
                  ? 'bg-surface-2 border border-border text-ink hover:border-rose-500/40 hover:text-rose-500'
                  : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm'
              }`}
            >
              {profile.show_freelance_jobs !== false ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Ẩn khỏi trang Freelance</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Hiện lên trang Freelance</span>
                </>
              )}
            </button>

            <Link
              href="/freelance"
              target="_blank"
              className="text-xs font-mono text-pink-500 hover:underline flex items-center gap-1 ml-1"
            >
              <span>Xem trang</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
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
                    <span className="text-[10px] font-mono text-slate-400">{job.timeline}</span>
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
                        &quot;{job.testimonial.quote.slice(0, 45)}...&quot;
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
  );
};
