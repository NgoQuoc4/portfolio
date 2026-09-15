'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check, Send } from 'lucide-react';
import api from '../lib/api';

interface FooterProps {
  name?: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  footerBrandText?: string;
  copyrightText?: string;
  footerStatus?: string;
  githubLink?: string;
  linkedinLink?: string;
  twitterLink?: string;
  facebookLink?: string;
}

export const Footer: React.FC<FooterProps> = ({
  name = 'Ngô Chí Quốc',
  title = 'Lập trình viên Full Stack & Front End',
  email = 'ngochiquoc140@gmail.com',
  phone = '0789898100',
  location = 'Hồ Chí Minh, Việt Nam',
  footerBrandText = 'NGO CHI QUOC',
  copyrightText = '© 2026 Ngô Chí Quốc. Bảo lưu mọi quyền.',
  footerStatus = 'Làm việc toàn cầu / Remote',
  githubLink = 'https://github.com/NgoQuoc4',
  linkedinLink = 'https://linkedin.com',
  twitterLink = 'https://x.com',
  facebookLink = 'https://facebook.com',
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setSubmitting(true);
    try {
      // 1. Send notification via Next.js contact email API
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Người Đăng Ký Bản Tin',
          email: newsletterEmail,
          message: 'Đăng ký nhận thông tin cập nhật dự án mới và bài viết kỹ thuật từ Portfolio.',
        }),
      }).catch(() => {});

      // 2. Also record in NestJS messages if backend is running
      await api.post('/messages', {
        name: 'Người đăng ký nhận bản tin',
        email: newsletterEmail,
        message: 'Đăng ký nhận bản tin cập nhật',
      }).catch(() => {});

      setSubscribed(true);
      setNewsletterEmail('');
    } catch {
      // Optimistic success for UI demo
      setSubscribed(true);
      setNewsletterEmail('');
    } finally {
      setSubmitting(false);
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  // Wide geometric display text for the giant brand mark
  const bigDisplayText = (footerBrandText || name || 'NGO CHI QUOC').toUpperCase();

  return (
    <footer
      id="footer"
      className="snap-start relative min-h-dvh md:h-dvh bg-canvas text-ink flex flex-col justify-between pt-8 md:pt-10 pb-20 md:pb-4 overflow-hidden border-t border-border transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full relative z-10 flex flex-col justify-between flex-1 gap-4 md:gap-6 min-h-0">
        {/* SECTION 1: Brand & Newsletter (Left) + Multi-column Links (Right) */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-12 shrink-0">
          {/* Left Column: Brand Logo & Newsletter */}
          <div className="w-full lg:max-w-md flex flex-col gap-4 md:gap-5">
            {/* Author Brand Monogram & Name */}
            <a href="#home" className="inline-flex items-center gap-3 group w-fit">
              <div className="w-9 h-9 rounded-full bg-pink-500 flex items-center justify-center text-white font-black text-base shadow-sm group-hover:scale-105 transition-transform">
                Q
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-extrabold text-xl md:text-2xl tracking-tight text-ink leading-tight">
                  {name.toUpperCase()}
                </span>
                <span className="font-mono text-[11px] text-ink-muted uppercase tracking-wider">
                  {title}
                </span>
              </div>
            </a>

            {/* Newsletter Box */}
            <div className="flex flex-col gap-2">
              <p className="font-sans font-bold text-base md:text-lg text-ink">Bản tin cập nhật</p>
              <p className="text-xs md:text-sm text-ink-muted leading-relaxed">
                Nhận thông tin về các dự án mới nhất, bài viết kỹ thuật và kinh nghiệm thực chiến.
              </p>

              <form onSubmit={handleSubscribe} className="mt-1 flex flex-col gap-2">
                <label htmlFor="newsletter-email" className="sr-only">
                  Địa chỉ email
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    id="newsletter-email"
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder={email}
                    required
                    disabled={submitting || subscribed}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-surface-1 border border-border focus:border-pink-500 dark:focus:border-pink-400 text-ink text-xs md:text-sm outline-none transition-all placeholder:text-ink-subtle shadow-sm disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={submitting || subscribed}
                    className="px-5 py-2.5 rounded-xl bg-ink text-surface-1 font-semibold text-xs md:text-sm hover:opacity-90 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 shrink-0"
                  >
                    {subscribed ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span>Đã đăng ký!</span>
                      </>
                    ) : submitting ? (
                      <span>Đang gửi...</span>
                    ) : (
                      <span>Đăng ký</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: 3 Navigation Columns (Menu, Social Media, Location) */}
          <div className="w-full lg:w-auto grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10 lg:gap-14">
            {/* Menu */}
            <div className="flex flex-col gap-2.5">
              <p className="font-mono text-xs uppercase tracking-widest text-ink-muted font-semibold">
                Điều hướng
              </p>
              <ul className="flex flex-col gap-2 text-xs sm:text-sm">
                <li>
                  <a
                    href="#home"
                    className="text-ink hover:text-pink-500 dark:hover:text-pink-400 transition-colors inline-block hover:translate-x-1 duration-200"
                  >
                    Trang chủ
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-ink hover:text-pink-500 dark:hover:text-pink-400 transition-colors inline-block hover:translate-x-1 duration-200"
                  >
                    Giới thiệu
                  </a>
                </li>
                <li>
                  <a
                    href="#work"
                    className="text-ink hover:text-pink-500 dark:hover:text-pink-400 transition-colors inline-block hover:translate-x-1 duration-200"
                  >
                    Dịch vụ
                  </a>
                </li>
                <li>
                  <a
                    href="#work"
                    className="text-ink hover:text-pink-500 dark:hover:text-pink-400 transition-colors inline-block hover:translate-x-1 duration-200"
                  >
                    Dự án
                  </a>
                </li>
                <li>
                  <Link
                    href="/freelance"
                    className="text-ink hover:text-pink-500 dark:hover:text-pink-400 transition-colors inline-flex items-center gap-1.5 hover:translate-x-1 duration-200 font-semibold"
                  >
                    <span>Freelance Works</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-pink-100 dark:bg-pink-950 text-pink-800 dark:text-pink-300 font-bold">Mới</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="flex flex-col gap-2.5">
              <p className="font-mono text-xs uppercase tracking-widest text-ink-muted font-semibold">
                Mạng xã hội
              </p>
              <ul className="flex flex-col gap-2 text-xs sm:text-sm">
                {githubLink && (
                  <li>
                    <a
                      href={githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink hover:text-pink-500 dark:hover:text-pink-400 transition-colors inline-flex items-center gap-1.5 hover:translate-x-1 duration-200"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-ink-subtle" />
                    </a>
                  </li>
                )}
                {linkedinLink && (
                  <li>
                    <a
                      href={linkedinLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink hover:text-pink-500 dark:hover:text-pink-400 transition-colors inline-flex items-center gap-1.5 hover:translate-x-1 duration-200"
                    >
                      <span>LinkedIn</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-ink-subtle" />
                    </a>
                  </li>
                )}
                {twitterLink && (
                  <li>
                    <a
                      href={twitterLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink hover:text-pink-500 dark:hover:text-pink-400 transition-colors inline-flex items-center gap-1.5 hover:translate-x-1 duration-200"
                    >
                      <span>Twitter / X</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-ink-subtle" />
                    </a>
                  </li>
                )}
                {facebookLink && (
                  <li>
                    <a
                      href={facebookLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink hover:text-pink-500 dark:hover:text-pink-400 transition-colors inline-flex items-center gap-1.5 hover:translate-x-1 duration-200"
                    >
                      <span>Facebook</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-ink-subtle" />
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {/* Location */}
            <div className="flex flex-col gap-2.5 col-span-2 sm:col-span-1">
              <p className="font-mono text-xs uppercase tracking-widest text-ink-muted font-semibold">
                Địa điểm
              </p>
              <p className="text-xs sm:text-sm text-ink leading-relaxed">
                {location}
              </p>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-mono text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold whitespace-nowrap">
                  {footerStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Copyright (Left) + Direct Inquiries (Right) */}
        <div className="border-t border-border pt-3 md:pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shrink-0">
          {/* Left: Copyright */}
          <div className="flex items-center gap-2 text-xs text-ink-muted font-sans">
            <span>{copyrightText}</span>
          </div>

          {/* Right: Direct Inquiries */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs md:text-sm">
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted font-semibold">
              Hợp tác dự án:
            </span>
            <a
              href={`mailto:${email}`}
              className="font-medium text-ink hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
            >
              {email}
            </a>
            {phone && (
              <a
                href={`tel:${phone}`}
                className="font-mono text-ink-muted hover:text-ink transition-colors"
              >
                {phone}
              </a>
            )}
          </div>
        </div>

        {/* SECTION 3: THE GIGANTIC BRAND TEXT AT THE VERY BOTTOM */}
        <div className="w-full relative overflow-hidden pt-1 md:pt-2 flex items-center justify-center shrink-0">
          <svg
            role="img"
            viewBox="0 0 1140 158"
            className="w-full max-h-16 md:max-h-20 lg:max-h-24 h-auto text-ink fill-current block select-none pointer-events-none opacity-90 hover:opacity-100 transition-opacity object-contain"
            style={{ width: '100%', height: 'auto', aspectRatio: '7.2025' }}
            aria-label={bigDisplayText}
          >
            <text
              x="50%"
              y="54%"
              dominantBaseline="central"
              textAnchor="middle"
              className="font-sans font-black uppercase select-none"
              fontSize="140"
              fontWeight="900"
              letterSpacing="-0.02em"
              textLength="1140"
              lengthAdjust="spacingAndGlyphs"
            >
              {bigDisplayText}
            </text>
          </svg>
        </div>
      </div>

      {/* Signature Brand Ambient Glow Behind Bottom Big Text */}
      <div
        className="absolute -bottom-64 left-0 right-0 h-[500px] pointer-events-none -z-0"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(244, 114, 182, 0.14) 0%, rgba(192, 132, 252, 0.04) 50%, transparent 100%)',
          filter: 'blur(70px)',
          WebkitFilter: 'blur(70px)',
        }}
      />
    </footer>
  );
};

