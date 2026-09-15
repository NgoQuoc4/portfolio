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
  const bigDisplayText = 'NGO CHI QUOC';

  return (
    <footer
      id="footer"
      className="snap-start relative min-h-[100dvh] bg-canvas text-ink flex flex-col justify-between pt-16 md:pt-24 pb-0 overflow-hidden border-t border-border transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full relative z-10 flex flex-col justify-between flex-1 gap-12 md:gap-14">
        {/* SECTION 1: Brand & Newsletter (Left) + Multi-column Links (Right) */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">
          {/* Left Column: Brand Logo & Newsletter */}
          <div className="w-full lg:max-w-md flex flex-col gap-8">
            {/* Author Brand Monogram & Name */}
            <a href="#home" className="inline-flex items-center gap-3.5 group w-fit">
              <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-black text-lg shadow-sm group-hover:scale-105 transition-transform">
                Q
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-extrabold text-2xl tracking-tight text-ink leading-tight">
                  {name.toUpperCase()}
                </span>
                <span className="font-mono text-[11px] text-ink-muted uppercase tracking-wider">
                  {title}
                </span>
              </div>
            </a>

            {/* Newsletter Box */}
            <div className="flex flex-col gap-3">
              <p className="font-sans font-bold text-lg text-ink">Bản tin cập nhật</p>
              <p className="text-sm text-ink-muted leading-relaxed">
                Nhận thông tin về các dự án mới nhất, bài viết kỹ thuật và kinh nghiệm thực chiến.
              </p>

              <form onSubmit={handleSubscribe} className="mt-2 flex flex-col gap-3">
                <label htmlFor="newsletter-email" className="text-xs font-mono text-ink-subtle uppercase tracking-wider">
                  Địa chỉ email
                </label>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    id="newsletter-email"
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder={email}
                    required
                    disabled={submitting || subscribed}
                    className="flex-1 px-4 py-3 rounded-xl bg-surface-1 border border-border focus:border-pink-500 dark:focus:border-pink-400 text-ink text-sm outline-none transition-all placeholder:text-ink-subtle shadow-sm disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={submitting || subscribed}
                    className="px-6 py-3 rounded-xl bg-ink text-surface-1 font-semibold text-sm hover:opacity-90 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 shrink-0"
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
          <div className="w-full lg:w-auto grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-14 lg:gap-20">
            {/* Menu */}
            <div className="flex flex-col gap-4">
              <p className="font-mono text-xs uppercase tracking-widest text-ink-muted font-semibold">
                Điều hướng
              </p>
              <ul className="flex flex-col gap-3 text-sm sm:text-base">
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
            <div className="flex flex-col gap-4">
              <p className="font-mono text-xs uppercase tracking-widest text-ink-muted font-semibold">
                Mạng xã hội
              </p>
              <ul className="flex flex-col gap-3 text-sm sm:text-base">
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
            <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
              <p className="font-mono text-xs uppercase tracking-widest text-ink-muted font-semibold">
                Địa điểm
              </p>
              <p className="text-sm sm:text-base text-ink leading-relaxed">
                {location}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-mono text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold whitespace-nowrap">
                  Làm việc toàn cầu / Remote
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Copyright (Left) + Direct Inquiries (Right) */}
        <div className="border-t border-border pt-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          {/* Left: Copyright */}
          <div className="flex items-center gap-2 text-xs text-ink-muted font-sans">
            <span>© 2026 {name}.</span>
            <span>Bảo lưu mọi quyền.</span>
          </div>

          {/* Right: Direct Inquiries */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-14 lg:gap-20">
            {/* For New Project */}
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted font-semibold">
                Hợp tác dự án mới
              </span>
              <a
                href={`mailto:${email}`}
                className="text-sm sm:text-base font-semibold text-ink hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
              >
                {email}
              </a>
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="text-xs sm:text-sm font-mono text-ink-muted hover:text-ink transition-colors"
                >
                  {phone}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 3: THE GIGANTIC BRAND TEXT AT THE VERY BOTTOM */}
        <div className="w-full relative overflow-hidden pt-4 md:pt-6">
          <svg
            role="img"
            viewBox="0 0 1140 158"
            className="w-full h-auto text-ink fill-current block select-none pointer-events-none opacity-90 hover:opacity-100 transition-opacity"
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

      {/* Signature Brand Ambient Glow Behind Bottom Big Text (Harmonized with website accent) */}
      <div
        className="absolute -bottom-64 left-0 right-0 h-[600px] pointer-events-none -z-0"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, rgba(244, 114, 182, 0.16) 0%, rgba(192, 132, 252, 0.05) 50%, transparent 100%)',
          filter: 'blur(70px)',
          WebkitFilter: 'blur(70px)',
        }}
      />
    </footer>
  );
};
