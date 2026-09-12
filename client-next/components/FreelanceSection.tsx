'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Award,
  Star,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Zap,
  TrendingUp,
  Send,
  MessageCircle,
  Phone,
  Mail,
  Loader2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Quote,
} from 'lucide-react';
import { defaultFreelanceJobs } from '@/lib/defaults';
import type { FreelanceJob } from '@/lib/types';

interface FreelanceSectionProps {
  calendarLink?: string;
  email?: string;
  phone?: string;
}

export const FreelanceSection: React.FC<FreelanceSectionProps> = ({
  calendarLink = 'https://calendar.google.com',
  email = 'ngochiquoc140@gmail.com',
  phone = '0981729304',
}) => {
  const [jobs, setJobs] = useState<FreelanceJob[]>(defaultFreelanceJobs);
  const [selectedJobIndex, setSelectedJobIndex] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Quick Booking Form State
  const [serviceType, setServiceType] = useState('Web App Fullstack');
  const [clientName, setClientName] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [budget, setBudget] = useState('10 - 25 triệu');
  const [projectBrief, setProjectBrief] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    try {
      const local = localStorage.getItem('portfolio_freelance_jobs');
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setJobs(parsed);
        }
      }
    } catch (e) {
      console.warn('Using default freelance jobs for section:', e);
    }
  }, []);

  const currentJob = jobs[selectedJobIndex] || jobs[0] || defaultFreelanceJobs[0];

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientContact) return;

    setSubmitting(true);
    try {
      const fullMessage = `[YÊU CẦU BOOKING FREELANCE]\n- Dịch vụ: ${serviceType}\n- Khách hàng: ${clientName}\n- Liên hệ: ${clientContact}\n- Ngân sách: ${budget}\n- Mô tả nhu cầu: ${projectBrief || 'Cần tư vấn trực tiếp'}`;

      // 1. Send via contact API
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: clientName,
          email: clientContact.includes('@') ? clientContact : `${clientName.toLowerCase().replace(/\s+/g, '')}@booking.client`,
          message: fullMessage,
        }),
      }).catch(() => null);

      setBookingSuccess(true);
      setClientName('');
      setClientContact('');
      setProjectBrief('');
      setTimeout(() => setBookingSuccess(false), 6000);
    } catch {
      setBookingSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  const services = [
    'Web App Fullstack',
    'Tối ưu PageSpeed (90+)',
    'Landing Page Chuyển đổi',
    'Sửa lỗi & Nâng cấp Web',
  ];

  return (
    <>
    <section
      id="freelance"
      className="snap-start relative min-h-dvh flex flex-col justify-center py-20 px-6 md:px-12 bg-canvas overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto w-full">
        {/* 1. Header & Trust Banner */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-500 font-mono text-xs font-bold mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>FREELANCE &amp; CLIENT STORIES</span>
            </div>
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-ink tracking-tight">
              Dự Án Khách Hàng &amp; <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Đặt Lịch Hợp Tác</span>
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted mt-2 max-w-xl">
              Thực chiến đa dạng bài toán cùng startups và doanh nghiệp: Cam kết đúng tiến độ, chuẩn chỉ về kỹ thuật và tối ưu tỷ lệ chuyển đổi.
            </p>
          </div>

          {/* Quick Metrics Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-1 border border-border text-emerald-600 dark:text-emerald-400 font-bold shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% Đúng hẹn</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-1 border border-border text-amber-500 font-bold shadow-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>5.0 Đánh giá</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-1 border border-border text-pink-500 font-bold shadow-xs">
              <Zap className="w-3.5 h-3.5" />
              <span>95+ PageSpeed</span>
            </span>
          </div>
        </div>

        {/* 2. Main Grid: Left Showcase (7 cols) + Right Quick Booking (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Featured Freelance Job Showcase */}
          <div className="lg:col-span-7 space-y-5">
            {/* Job Switcher Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
              {jobs.map((job, idx) => (
                <button
                  key={job._id || idx}
                  onClick={() => setSelectedJobIndex(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    selectedJobIndex === idx
                      ? 'bg-ink text-surface-1 shadow-sm'
                      : 'bg-surface-1 border border-border text-ink-muted hover:text-ink'
                  }`}
                >
                  <span className="opacity-60">#{idx + 1}</span>
                  <span className="truncate max-w-[150px] sm:max-w-[200px]">{job.client_name.split('(')[0].trim()}</span>
                </button>
              ))}

              <Link
                href="/freelance"
                className="px-3 py-2 rounded-xl text-xs font-mono text-pink-500 hover:text-pink-600 bg-pink-500/10 border border-pink-500/20 whitespace-nowrap shrink-0 flex items-center gap-1 ml-auto font-bold"
              >
                <span>Xem tất cả ({jobs.length})</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            {/* Featured Job Card */}
            <div className="bg-surface-1 border border-border rounded-3xl p-6 sm:p-7 shadow-float space-y-5 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-500 font-mono text-[11px] font-bold border border-pink-500/20">
                      {currentJob.category}
                    </span>
                    <span className="text-xs font-mono text-ink-subtle">
                      · {currentJob.timeline}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl text-ink leading-snug">
                    {currentJob.title}
                  </h3>
                  <p className="text-xs text-ink-muted mt-0.5">
                    Khách hàng: <strong className="text-ink font-semibold">{currentJob.client_name}</strong>
                  </p>
                </div>

                {currentJob.live_demo && (
                  <a
                    href={currentJob.live_demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-2 border border-border hover:border-pink-500/50 text-xs font-mono font-semibold text-ink transition-all shrink-0 self-start"
                  >
                    <span>Xem Web</span>
                    <ExternalLink className="w-3 h-3 text-pink-500" />
                  </a>
                )}
              </div>

              {/* Mockup Preview & Deliverables Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                {currentJob.image_url && (
                  <div className="sm:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface-2 border border-border group">
                    <img
                      src={currentJob.image_url}
                      alt={currentJob.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      {currentJob.live_demo && (
                        <button
                          onClick={() => setPreviewUrl(currentJob.live_demo!)}
                          className="px-3 py-1.5 rounded-full bg-pink-500 text-white font-mono text-[11px] font-semibold hover:bg-pink-600 transition-colors"
                        >
                          🖥️ Live Preview
                        </button>
                      )}
                      <Link
                        href="/freelance"
                        className="px-3 py-1.5 rounded-full bg-black/80 text-white font-mono text-[11px] font-semibold"
                      >
                        Chi tiết dự án ↗
                      </Link>
                    </div>
                  </div>
                )}

                <div className={currentJob.image_url ? 'sm:col-span-7 space-y-2' : 'sm:col-span-12 space-y-2'}>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {currentJob.scope}
                  </p>

                  {/* Deliverables snippet */}
                  {currentJob.deliverables && currentJob.deliverables.length > 0 && (
                    <div className="space-y-1 pt-1">
                      {currentJob.deliverables.slice(0, 3).map((d, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-1.5 text-xs text-ink">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="truncate">{d}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Metrics Banner */}
                  {currentJob.metrics && (
                    <div className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-[11px] text-pink-600 dark:text-pink-400 font-semibold flex items-center gap-1.5 mt-2">
                      <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{currentJob.metrics}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Client Testimonial Box */}
              {currentJob.testimonial && (
                <div className="p-4 rounded-2xl bg-surface-2 border border-border relative">
                  <div className="flex items-center gap-1 mb-1 text-amber-400">
                    {[...Array(currentJob.testimonial.rating || 5)].map((_, sIdx) => (
                      <Star key={sIdx} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                    <span className="text-[11px] font-mono font-bold text-ink ml-1.5">5.0</span>
                  </div>
                  <p className="text-xs text-ink italic leading-relaxed mb-2">
                    "{currentJob.testimonial.quote}"
                  </p>
                  <p className="text-xs font-bold text-ink">
                    {currentJob.testimonial.author}
                    {currentJob.testimonial.author_role && (
                      <span className="text-ink-subtle font-normal"> · {currentJob.testimonial.author_role}</span>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Quick Booking Widget */}
          <div className="lg:col-span-5">
            <div className="bg-surface-1 border border-border rounded-3xl p-6 sm:p-7 shadow-float space-y-5 relative">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-ink flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-pink-500" />
                    <span>Đặt Lịch Hợp Tác Nhanh</span>
                  </h3>
                  <p className="text-xs text-ink-muted mt-0.5">
                    Nhận tư vấn giải pháp &amp; báo giá sơ bộ trong 24h
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Sẵn sàng</span>
                </span>
              </div>

              {bookingSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                  <p className="font-bold text-sm text-ink">Đã gửi yêu cầu Booking thành công!</p>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Cảm ơn bạn! Tôi đã nhận được thông tin và sẽ phản hồi qua Zalo / Email sớm nhất trong vòng 24 giờ.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  {/* Service Selection */}
                  <div>
                    <label className="block text-xs font-mono text-ink-muted mb-1.5">
                      1. Chọn dịch vụ bạn quan tâm
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {services.map((srv) => (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => setServiceType(srv)}
                          className={`p-2 rounded-xl text-[11px] font-medium border text-left transition-all cursor-pointer truncate ${
                            serviceType === srv
                              ? 'bg-ink text-surface-1 border-ink font-bold shadow-xs'
                              : 'bg-surface-2 border-border text-ink hover:border-pink-500/40'
                          }`}
                        >
                          {srv}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Client Info Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-ink-muted mb-1">
                        2. Tên của bạn / Công ty *
                      </label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Nguyễn Văn A"
                        className="w-full px-3.5 py-2 rounded-xl bg-surface-2 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-ink-muted mb-1">
                        3. Số điện thoại / Zalo *
                      </label>
                      <input
                        type="text"
                        required
                        value={clientContact}
                        onChange={(e) => setClientContact(e.target.value)}
                        placeholder="098... hoặc email"
                        className="w-full px-3.5 py-2 rounded-xl bg-surface-2 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Budget & Scope */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-mono text-ink-muted">
                        4. Ngân sách dự kiến
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="px-2 py-0.5 rounded-lg bg-surface-2 border border-border text-[11px] text-ink font-semibold"
                      >
                        <option value="Dưới 10 triệu">&lt; 10 triệu</option>
                        <option value="10 - 25 triệu">10 - 25 triệu</option>
                        <option value="25 - 50 triệu">25 - 50 triệu</option>
                        <option value="Trên 50 triệu">&gt; 50 triệu</option>
                        <option value="Linh hoạt theo tính năng">Linh hoạt</option>
                      </select>
                    </div>

                    <textarea
                      rows={2}
                      value={projectBrief}
                      onChange={(e) => setProjectBrief(e.target.value)}
                      placeholder="Mô tả ngắn gọn về tính năng bạn muốn xây dựng hoặc link tài liệu (nếu có)..."
                      className="w-full px-3.5 py-2 rounded-xl bg-surface-2 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-full bg-ink text-surface-1 font-bold text-xs hover:opacity-90 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Đang gửi yêu cầu...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-pink-400" />
                        <span>Gửi Yêu Cầu Booking &amp; Báo Giá Ngay</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Direct Booking Shortcuts */}
              <div className="pt-4 border-t border-border space-y-2">
                <p className="text-[10px] font-mono uppercase tracking-wider text-ink-subtle text-center">
                  Hoặc kết nối trực tiếp trong 1 phút:
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://zalo.me/0981729304"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold transition-colors text-center"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Chat Zalo</span>
                  </a>

                  <a
                    href={`tel:${phone}`}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border text-ink text-xs font-semibold transition-colors text-center"
                  >
                    <Phone className="w-3.5 h-3.5 text-pink-500" />
                    <span>{phone}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Live Preview Modal */}
      {previewUrl && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setPreviewUrl(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-surface-1 rounded-2xl overflow-hidden shadow-2xl border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Browser chrome bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-surface-2 border-b border-border">
              <div className="flex gap-1.5">
                <button onClick={() => setPreviewUrl(null)} className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 mx-3 px-3 py-1 rounded-lg bg-surface-1 border border-border text-xs font-mono text-ink-muted truncate">
                {previewUrl}
              </div>
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-3 py-1 rounded-lg bg-pink-500 text-white text-xs font-mono font-semibold hover:bg-pink-600 transition-colors flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                Mở tab mới
              </a>
            </div>

            {/* Screenshot preview */}
            <div className="relative aspect-video bg-surface-2 overflow-hidden">
              <img
                src={`https://image.thum.io/get/width/1200/crop/800/${previewUrl}`}
                alt={`Preview of ${previewUrl}`}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80';
                }}
              />
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/60 text-white text-[10px] font-mono">
                Screenshot · thum.io
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
