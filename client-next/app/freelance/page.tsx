'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Star,
  ExternalLink,
  CheckCircle2,
  Calendar,
  UserCheck,
  Sparkles,
  Zap,
  Layers,
  ShieldCheck,
  MessageCircle,
  Mail,
  Sun,
  Moon,
  Briefcase,
  TrendingUp,
  Quote,
  Send,
  Phone,
  Loader2,
} from 'lucide-react';
import { defaultFreelanceJobs } from '@/lib/defaults';
import type { FreelanceJob } from '@/lib/types';

export default function FreelancePage() {
  const [jobs, setJobs] = useState<FreelanceJob[]>(defaultFreelanceJobs);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    // Theme sync
    if (typeof document !== 'undefined') {
      const isDark = document.body.classList.contains('dark-mode') || localStorage.getItem('dark-mode') === 'true';
      setIsDarkMode(isDark);
      if (isDark) {
        document.body.classList.add('dark-mode');
      }
    }

    // Load jobs from localStorage or fallback to defaults
    try {
      const local = localStorage.getItem('portfolio_freelance_jobs');
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setJobs(parsed);
        }
      }
    } catch (e) {
      console.warn('Using default freelance jobs:', e);
    }
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

  const categories = [
    { id: 'all', label: 'Tất cả dự án' },
    { id: 'Web App & EdTech', label: 'Web App & EdTech' },
    { id: 'SaaS & AI Solution', label: 'SaaS & AI' },
    { id: 'Tối ưu hóa & Performance', label: 'Tối ưu hóa Hiệu năng' },
  ];

  const filteredJobs = jobs.filter((job) => {
    if (activeCategory === 'all') return true;
    return (job.category || '').toLowerCase().includes(activeCategory.toLowerCase());
  });

  // Booking Form State
  const [serviceType, setServiceType] = useState('Web App Fullstack');
  const [clientName, setClientName] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [budget, setBudget] = useState('10 - 25 triệu');
  const [projectBrief, setProjectBrief] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientContact) return;

    setSubmitting(true);
    try {
      const fullMessage = `[YÊU CẦU BOOKING FREELANCE TỪ TRANG /FREELANCE]\n- Dịch vụ: ${serviceType}\n- Khách hàng: ${clientName}\n- Liên hệ: ${clientContact}\n- Ngân sách: ${budget}\n- Chi tiết nhu cầu: ${projectBrief || 'Cần tư vấn trực tiếp'}`;

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
      setTimeout(() => setBookingSuccess(false), 7000);
    } catch {
      setBookingSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  const services = [
    'Web App Fullstack',
    'Landing Page Chuyển đổi',
    'Tối ưu PageSpeed (90+)',
    'Sửa lỗi & Nâng cấp Web',
  ];

  return (
    <div className="min-h-screen bg-canvas text-ink antialiased selection:bg-pink-500 selection:text-white">
      {/* 1. TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-surface-1/80 backdrop-blur-xl border-b border-border transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-ink-muted hover:text-ink px-3 py-1.5 rounded-full bg-surface-2 border border-border hover:border-pink-500/40 transition-all shadow-xs group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Trang chủ</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-ink-subtle">
              <span>/</span>
              <span className="text-ink font-semibold flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-pink-500" />
                <span>Dự Án Khách Hàng &amp; Đặt Lịch Hợp Tác</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-surface-2 border border-border text-ink hover:text-pink-500 transition-colors cursor-pointer"
              title={isDarkMode ? 'Chuyển sang Chế độ Sáng' : 'Chuyển sang Chế độ Tối'}
              aria-label="Toggle dark/light theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            <a
              href="#booking"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink text-surface-1 font-bold text-xs hover:opacity-90 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>Đặt lịch hợp tác</span>
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="pt-16 pb-12 px-4 sm:px-6 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-600 dark:text-pink-400 text-xs font-mono font-bold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Freelance &amp; Client Stories</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-ink tracking-tight mb-4 max-w-3xl mx-auto leading-tight font-sans">
          Dự Án Khách Hàng &amp; <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">Đặt Lịch Hợp Tác</span>
        </h1>

        <p className="text-sm sm:text-base text-ink-muted max-w-2xl mx-auto leading-relaxed mb-10">
          Tổng hợp các sản phẩm số thực chiến tôi đã trực tiếp đảm nhiệm và bàn giao cho khách hàng cá nhân, startups và doanh nghiệp.
          Cam kết chuẩn kỹ thuật, đúng tiến độ và tối ưu hóa chuyển đổi kinh doanh.
        </p>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-surface-1 border border-border shadow-xs text-left">
            <div className="flex items-center gap-1.5 text-emerald-500 mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span className="font-bold text-base text-ink">100%</span>
            </div>
            <p className="text-xs text-ink-muted font-medium">Bàn giao đúng hẹn</p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-1 border border-border shadow-xs text-left">
            <div className="flex items-center gap-1.5 text-amber-500 mb-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-base text-ink">5.0 / 5.0</span>
            </div>
            <p className="text-xs text-ink-muted font-medium">Đánh giá khách hàng</p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-1 border border-border shadow-xs text-left">
            <div className="flex items-center gap-1.5 text-pink-500 mb-1">
              <Zap className="w-4 h-4" />
              <span className="font-bold text-base text-ink">95+</span>
            </div>
            <p className="text-xs text-ink-muted font-medium">PageSpeed Performance</p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-1 border border-border shadow-xs text-left">
            <div className="flex items-center gap-1.5 text-indigo-500 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-bold text-base text-ink">Clean Code</span>
            </div>
            <p className="text-xs text-ink-muted font-medium">Bảo mật &amp; Dễ bảo trì</p>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY FILTER TABS */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-center gap-2 flex-wrap pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-ink text-surface-1 shadow-sm'
                  : 'bg-surface-1 border border-border text-ink-muted hover:text-ink hover:border-pink-500/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* 4. FREELANCE JOBS LIST */}
      <main className="px-4 sm:px-6 max-w-6xl mx-auto pb-20 space-y-10">
        {filteredJobs.length === 0 ? (
          <div className="p-16 text-center bg-surface-1 border border-border rounded-3xl text-ink-muted">
            <Briefcase className="w-12 h-12 text-ink-subtle mx-auto mb-3 opacity-50" />
            <p className="font-bold text-base text-ink">Không có dự án nào trong danh mục này</p>
            <p className="text-xs text-ink-muted mt-1">Vui lòng chọn danh mục khác để xem thêm dự án.</p>
          </div>
        ) : (
          filteredJobs.map((job, idx) => (
            <article
              key={job._id || idx}
              className="bg-surface-1 border border-border rounded-3xl overflow-hidden shadow-float hover:border-pink-500/40 transition-all group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Image Showcase Column */}
                <div className="lg:col-span-5 relative bg-surface-2 overflow-hidden min-h-[260px] lg:min-h-[420px] flex items-center justify-center border-b lg:border-b-0 lg:border-r border-border">
                  {job.image_url ? (
                    <img
                      src={job.image_url}
                      alt={job.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="p-8 text-center text-ink-subtle">
                      <Briefcase className="w-12 h-12 mx-auto mb-2 opacity-40" />
                      <span className="text-xs font-mono">Dự án nội bộ khách hàng</span>
                    </div>
                  )}

                  {/* Badge floating */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white font-mono text-[11px] font-bold">
                      #{idx + 1}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-pink-500/90 backdrop-blur-md text-white font-mono text-[11px] font-semibold">
                      {job.category}
                    </span>
                  </div>

                  {job.live_demo && (
                    <div className="absolute bottom-4 right-4 flex items-center gap-2">
                      <button
                        onClick={() => setPreviewUrl(job.live_demo!)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-pink-500/90 hover:bg-pink-500 text-white font-mono text-xs font-semibold backdrop-blur-md transition-all shadow-md"
                      >
                        <span>🖥️ Preview</span>
                      </button>
                      <a
                        href={job.live_demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/80 hover:bg-black text-white font-mono text-xs font-semibold backdrop-blur-md transition-all shadow-md"
                      >
                        <span>Xem Sản Phẩm</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Information Column */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    {/* Meta Top (Client, Role, Timeline) */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-2 border border-border text-xs font-bold text-ink">
                        <UserCheck className="w-3.5 h-3.5 text-pink-500" />
                        <span>{job.client_name}</span>
                      </span>

                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-2 border border-border text-xs font-mono text-ink-muted">
                        <Calendar className="w-3 h-3 text-ink-subtle" />
                        <span>{job.timeline}</span>
                      </span>

                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-bold">
                        Đã hoàn thành
                      </span>
                    </div>

                    {/* Job Title */}
                    <h2 className="text-xl sm:text-2xl font-bold text-ink mb-3 leading-snug group-hover:text-pink-500 transition-colors">
                      {job.title}
                    </h2>

                    {/* Scope / Description */}
                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mb-5">
                      {job.scope}
                    </p>

                    {/* Deliverables List */}
                    {job.deliverables && job.deliverables.length > 0 && (
                      <div className="mb-5 space-y-1.5">
                        <p className="text-[11px] font-mono uppercase tracking-wider text-ink-subtle font-bold mb-2">
                          Hạng mục đã bàn giao:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {job.deliverables.map((item, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-2 text-xs text-ink leading-normal">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Metrics Banner */}
                    {job.metrics && (
                      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 border border-pink-500/20 mb-5 flex items-start gap-2.5">
                        <TrendingUp className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-mono uppercase tracking-wider text-pink-600 dark:text-pink-400 font-bold">
                            Kết quả &amp; Hiệu quả đo lường:
                          </p>
                          <p className="text-xs font-semibold text-ink mt-0.5 leading-relaxed">
                            {job.metrics}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Tech Stack Pills */}
                    {job.tech_stack && job.tech_stack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {job.tech_stack.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-lg bg-surface-2 border border-border font-mono text-[11px] text-ink-muted font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Testimonial Box */}
                  {job.testimonial && (
                    <div className="pt-5 border-t border-border mt-2">
                      <div className="bg-surface-2/80 rounded-2xl p-4 border border-border relative">
                        <Quote className="w-6 h-6 text-pink-500/20 absolute right-3 top-3 pointer-events-none" />
                        
                        {/* 5 Stars */}
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(job.testimonial.rating || 5)].map((_, sIdx) => (
                            <Star key={sIdx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                          <span className="text-[11px] font-mono font-bold text-ink ml-1.5">5.0 / 5.0</span>
                        </div>

                        <p className="text-xs text-ink italic leading-relaxed mb-3">
                          "{job.testimonial.quote}"
                        </p>

                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-pink-500/20 text-pink-500 flex items-center justify-center text-[10px] font-bold">
                            {job.testimonial.author.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-ink leading-tight">
                              {job.testimonial.author}
                            </p>
                            {job.testimonial.author_role && (
                              <p className="text-[10px] text-ink-subtle leading-tight mt-0.5">
                                {job.testimonial.author_role}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))
        )}
      </main>

      {/* 5. QUICK BOOKING SECTION */}
      <section id="booking" className="scroll-mt-24 py-16 px-4 sm:px-6 bg-surface-1/50 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-500 font-mono text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ĐẶT LỊCH HỢP TÁC TRỰC TIẾP</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-ink tracking-tight font-sans">
              Khởi Động Dự Án &amp; <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Nhận Báo Giá Sơ Bộ</span>
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted mt-2">
              Chia sẻ ngắn gọn yêu cầu hoặc tính năng bạn muốn xây dựng. Tôi sẽ phản hồi giải pháp kiến trúc và báo giá trong vòng 24 giờ.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Commitments & Quick Channels */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-7 rounded-3xl bg-surface-1 border border-border shadow-xs space-y-5">
                <h3 className="text-base font-bold text-ink flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span>Quy Trình &amp; Cam Kết Hợp Tác</span>
                </h3>

                <ul className="space-y-3.5 text-xs text-ink-muted">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-ink">Tư vấn giải pháp miễn phí:</strong> Phân tích nghiệp vụ và đề xuất tech stack tối ưu nhất trước khi chốt hợp đồng.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-ink">Tiến độ chuẩn chỉ:</strong> Chia nhỏ milestone bàn giao rõ ràng, cập nhật demo trực tiếp từng tuần.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-ink">Bảo hành 30 ngày:</strong> Hỗ trợ fix bug, hướng dẫn deploy và bàn giao toàn bộ source code sạch.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-ink">Bảo mật thông tin:</strong> Ký cam kết bảo mật (NDA) đối với các dự án nội bộ và dữ liệu kinh doanh.
                    </span>
                  </li>
                </ul>

                <div className="pt-4 border-t border-border space-y-2.5">
                  <p className="text-[11px] font-mono text-ink-subtle uppercase tracking-wider font-bold">
                    Kênh trao đổi trực tiếp nhanh:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="https://zalo.me/0981729304"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold transition-all text-center"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat Zalo</span>
                    </a>
                    <a
                      href="tel:0981729304"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border text-ink text-xs font-bold transition-all text-center"
                    >
                      <Phone className="w-4 h-4 text-pink-500" />
                      <span>098.172.9304</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Booking Form */}
            <div className="lg:col-span-7">
              <div className="bg-surface-1 border border-border rounded-3xl p-6 sm:p-8 shadow-float relative">
                {bookingSuccess ? (
                  <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                    <h4 className="font-bold text-base text-ink">Gửi Yêu Cầu Thành Công!</h4>
                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed max-w-md mx-auto">
                      Cảm ơn bạn đã liên hệ. Tôi đã nhận được thông tin dự án và sẽ liên hệ lại qua Zalo/Email trong vòng 24 giờ tới.
                    </p>
                    <button
                      onClick={() => setBookingSuccess(false)}
                      className="mt-2 px-4 py-2 rounded-full bg-ink text-surface-1 text-xs font-bold"
                    >
                      Gửi yêu cầu khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    {/* Service Selection Chips */}
                    <div>
                      <label className="block text-xs font-mono text-ink-muted mb-2 font-semibold">
                        1. Bạn đang cần dịch vụ gì?
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {services.map((srv) => (
                          <button
                            key={srv}
                            type="button"
                            onClick={() => setServiceType(srv)}
                            className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
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

                    {/* Inputs Name & Contact */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-xs font-mono text-ink-muted mb-1 font-semibold">
                          2. Tên của bạn / Doanh nghiệp *
                        </label>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="Ví dụ: Anh Nam - Tech Startup"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-ink-muted mb-1 font-semibold">
                          3. Số điện thoại / Zalo *
                        </label>
                        <input
                          type="text"
                          required
                          value={clientContact}
                          onChange={(e) => setClientContact(e.target.value)}
                          placeholder="098... hoặc email@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Budget selector */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-mono text-ink-muted font-semibold">
                          4. Ngân sách dự kiến
                        </label>
                        <span className="text-[11px] text-pink-500 font-mono">Đã chọn: {budget}</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                        {[
                          'Dưới 10 triệu',
                          '10 - 25 triệu',
                          '25 - 50 triệu',
                          'Trên 50 triệu',
                          'Linh hoạt',
                        ].map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setBudget(b)}
                            className={`py-2 px-1 text-center rounded-xl text-[11px] font-mono border transition-all cursor-pointer ${
                              budget === b
                                ? 'bg-pink-500 text-white border-pink-500 font-bold shadow-xs'
                                : 'bg-surface-2 border-border text-ink-muted hover:text-ink'
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Project Brief */}
                    <div>
                      <label className="block text-xs font-mono text-ink-muted mb-1 font-semibold">
                        5. Mô tả ngắn gọn về yêu cầu dự án
                      </label>
                      <textarea
                        rows={3}
                        value={projectBrief}
                        onChange={(e) => setProjectBrief(e.target.value)}
                        placeholder="Ví dụ: Cần xây dựng web app quản lý học sinh bằng Next.js, có tính năng điểm danh và xuất file Excel..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surface-2 border border-border text-xs text-ink focus:border-pink-500 focus:outline-none resize-none leading-relaxed transition-colors"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 rounded-full bg-ink text-surface-1 font-bold text-xs hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Đang gửi yêu cầu...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-pink-400" />
                          <span>Gửi Yêu Cầu Booking &amp; Nhận Báo Giá Ngay</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION SECTION */}
      <section className="bg-surface-1 border-t border-border py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-b from-surface-2 to-surface-1 border border-border p-8 sm:p-12 rounded-3xl shadow-float relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-500 font-mono text-xs font-bold mb-4">
            🚀 Khởi động dự án của bạn
          </span>

          <h2 className="text-2xl sm:text-4xl font-bold text-ink mb-4 font-sans tracking-tight">
            Bạn có ý tưởng hoặc dự án cần triển khai?
          </h2>

          <p className="text-xs sm:text-sm text-ink-muted max-w-xl mx-auto leading-relaxed mb-8">
            Dù là xây dựng Web App từ đầu, Landing Page tối ưu chuyển đổi, hay tối ưu hóa tốc độ tải trang — tôi sẵn sàng đồng hành và mang lại kết quả vượt kỳ vọng.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="mailto:ngochiquoc4@gmail.com?subject=Liên hệ hợp tác dự án Freelance"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-ink text-surface-1 font-bold text-xs hover:opacity-90 transition-all shadow-md"
            >
              <Mail className="w-4 h-4 text-pink-400" />
              <span>Gửi email trao đổi: ngochiquoc4@gmail.com</span>
            </a>

            <a
              href="https://zalo.me/0981729304"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-surface-1 border border-border text-ink font-bold text-xs hover:border-pink-500 transition-all shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              <span>Chat Zalo: 098.172.9304</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="py-8 px-4 border-t border-border bg-canvas text-center text-xs font-mono text-ink-subtle">
        <p>© 2026 Ngô Chí Quốc. Mọi quyền được bảo lưu.</p>
      </footer>

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
            {/* Browser chrome */}
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
                className="shrink-0 px-3 py-1 rounded-lg bg-pink-500 text-white text-xs font-mono font-semibold hover:bg-pink-600 transition-colors flex items-center gap-1.5"
              >
                <ExternalLink className="w-3 h-3" />
                Mở tab mới
              </a>
            </div>
            {/* Screenshot */}
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
    </div>
  );
}

