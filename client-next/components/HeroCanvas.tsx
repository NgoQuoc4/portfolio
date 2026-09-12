'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Coffee, Lightbulb, Folder, Sparkles, Award } from 'lucide-react';

interface HeroCanvasProps {
  profileName?: string;
  avatarUrl?: string;
  headline?: string;
  subIntro?: string;
  statusText?: string;
  titleRole?: string;
}

export const HeroCanvas: React.FC<HeroCanvasProps> = ({
  profileName = 'Ngô Chí Quốc',
  avatarUrl = 'https://res.cloudinary.com/dguad3xyf/image/upload/v1776242078/MeUJ0ogEM8MjZvYWfSb9_665822b791856_cvtpl_yljpfv.jpg',
  headline = 'Tôi biến sự mơ hồ thành định hướng sản phẩm rõ ràng & tạo ra giá trị với AI.',
  subIntro,
  statusText = 'Sẵn sàng hợp tác cho các dự án & cơ hội mới',
  titleRole = 'Lập trình viên Full Stack & Front End',
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFolderOpen, setIsFolderOpen] = useState(false);

  // Restore dark mode preference on mount
  useEffect(() => {
    const saved = localStorage.getItem('dark-mode');
    if (saved === 'true') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleMood = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
      localStorage.setItem('dark-mode', String(next));
      return next;
    });
  };

  const candidatePrompt = encodeURIComponent(
    `Tôi đang đánh giá năng lực của ${profileName} cho vị trí Kỹ sư Lập trình & Sản phẩm. Vui lòng xem xét hồ sơ và đưa ra đánh giá trực tiếp: phạm vi kỹ thuật thực tế, loại đội ngũ phù hợp nhất và giá trị cụ thể mà ứng viên sẽ đóng góp?`
  );

  return (
    <section id="home" className="snap-start relative min-h-[100dvh] md:h-dvh w-full bg-canvas bg-grid flex flex-col justify-center items-center px-6 overflow-hidden select-none">
      {/* Background radial highlight */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-pink-400/5 blur-3xl" />
      </div>

      {/* 1. DESKTOP DRAGGABLE DIGITAL DESK (>= 768px) */}
      <div className="absolute inset-0 max-w-[1600px] mx-auto hidden md:block pointer-events-none">
       

        {/* Polaroid Avatar Photo (Style Sara Khalil) */}
        <motion.div
          drag
          dragMomentum={false}
          className="absolute left-[10%] lg:left-[3%] top-[3%] lg:top-[4%] pointer-events-auto cursor-grab active:cursor-grabbing z-20"
          initial={{ opacity: 0, y: -20, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: -4 }}
          whileHover={{ rotate: 0, scale: 1.05 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="group relative">
            <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-ink-subtle bg-surface-1 border border-border rounded-full px-2.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-30 shadow-sm">
              kéo tôi đi nè 📸
            </span>

            {/* Polaroid Frame */}
            <div className="relative w-48 sm:w-52 md:w-56 lg:w-60 bg-surface-1 border border-border shadow-float rounded-2xl p-2.5 sm:p-3 flex flex-col items-center transition-shadow hover:shadow-2xl">
              {/* Subtle Washi Tape decoration */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-4 bg-amber-200/70 dark:bg-amber-100/20 backdrop-blur-sm -rotate-2 shadow-sm border border-amber-300/40 rounded-[2px] z-10 pointer-events-none" />

              {/* Photo Area */}
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-surface-2 border border-border/60 shadow-inner">
                <Image
                  src={avatarUrl}
                  alt={`Ảnh đại diện chân dung ${profileName}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 160px, 240px"
                  className="object-cover object-top pointer-events-none select-none"
                />
              </div>

              {/* Polaroid Caption */}
              <div className="pt-2.5 pb-0.5 flex items-center justify-between w-full px-1.5">
                <span className="font-serif italic text-sm sm:text-base text-ink font-semibold">
                  {profileName.split(' ').pop()} 👋
                </span>
                <span className="font-mono text-[10px] sm:text-xs text-ink-subtle uppercase tracking-wider">
                  2026
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sticky Note (Top-Right-Center) */}
        <motion.div
          drag
          dragMomentum={false}
          className="absolute left-[85%] top-[40%] pointer-events-auto cursor-grab active:cursor-grabbing z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="w-48 h-48 bg-amber-100 dark:bg-amber-900/60 border border-amber-300 dark:border-amber-700/50 shadow-float rounded-xl p-5 -rotate-3 hover:rotate-0 transition-transform cursor-grab active:cursor-grabbing">
            <p className="font-mono text-[10px] uppercase tracking-widest text-amber-800 dark:text-amber-200 mb-2 font-bold">Nguyên tắc</p>
            <div className="space-y-1.5 text-xs text-amber-900 dark:text-amber-100 italic font-serif">
              <p>✨ Thực tế &gt; tranh luận</p>
              <p>🚀 Hoàn thành quan trọng nhất</p>
              <p>💡 Hỏi "tại sao" hai lần</p>
              <p>⚡ Hiệu quả hơn hào nhoáng</p>
            </div>
          </div>
        </motion.div>

        {/* Đèn bàn Mood Lamp (Top-Right) */}
        <motion.div
          drag
          dragMomentum={false}
          className="absolute right-[4%] top-[5%] pointer-events-auto cursor-grab active:cursor-grabbing z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="group relative">
            <span className="absolute -bottom-6 right-0 whitespace-nowrap font-mono text-[10px] text-ink-subtle bg-surface-1 border border-border rounded-full px-2.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              đổi giao diện 💡
            </span>
            <button
              type="button"
              onClick={toggleMood}
              aria-label="Chuyển đổi giao diện sáng tối"
              className={`w-28 h-28 rounded-2xl border shadow-float flex flex-col items-center justify-center p-3 transition-all ${
                isDarkMode
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                  : 'bg-surface-1 border-border text-ink hover:text-amber-500'
              }`}
            >
              <Lightbulb className={`w-8 h-8 mb-1.5 ${isDarkMode ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span className="text-[10px] font-mono font-medium">{isDarkMode ? 'Chế độ Tối' : 'Chế độ Sáng'}</span>
            </button>
          </div>
        </motion.div>

        {/* Mini Terminal macOS (Bottom-Right) */}
        <motion.div
          drag
          dragMomentum={false}
          className="absolute right-[5%] bottom-[7%] pointer-events-auto cursor-grab active:cursor-grabbing z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="w-80 rounded-2xl bg-surface-1 border border-border shadow-float overflow-hidden -rotate-1 hover:rotate-0 transition-transform">
            <div className="flex items-center gap-1.5 bg-surface-2 px-3 py-2 border-b border-border">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <p className="font-mono text-[10px] text-ink-subtle ml-2">quoc — zsh</p>
            </div>
            <div className="p-3.5 space-y-1.5 font-mono text-[11px]">
              <p className="text-ink-muted"><span className="text-pink-500">~ $</span> whoami</p>
              <p className="text-ink font-semibold">Lập trình viên Full Stack &amp; Front End</p>
              <p className="text-ink-muted mt-1"><span className="text-pink-500">~ $</span> chuyen_mon</p>
              <p className="text-ink">ReactJS, NextJS, NestJS &amp; TypeScript</p>
              <p className="text-ink-muted mt-1">
                <span className="text-pink-500">~ $</span> <span className="inline-block w-1.5 h-3.5 bg-ink-muted animate-cursor align-middle" />
              </p>
            </div>
          </div>
        </motion.div>

        {/* Folder Stack (Bottom-Center-Left) */}
        <motion.div
          drag
          dragMomentum={false}
          className="absolute left-[38%] bottom-[6%] pointer-events-auto cursor-grab active:cursor-grabbing z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div
            onMouseEnter={() => setIsFolderOpen(true)}
            onMouseLeave={() => setIsFolderOpen(false)}
            className="group relative cursor-pointer"
          >
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-ink-subtle bg-surface-1 border border-border rounded-full px-2.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              công nghệ 📂
            </span>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-surface-1 border border-border rounded-xl shadow-float hover:scale-105 transition-all">
              <Folder className={`w-5 h-5 text-pink-500 transition-transform ${isFolderOpen ? 'scale-110' : ''}`} />
              <span className="font-mono text-xs text-ink font-medium">React · Next.js · NestJS</span>
            </div>
          </div>
        </motion.div>

        {/* Ask AI Box (Bottom-Left) */}
        <motion.div
          drag
          dragMomentum={false}
          className="absolute left-[3%] bottom-[7%] pointer-events-auto cursor-grab active:cursor-grabbing z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center gap-3 bg-surface-1 border border-border rounded-2xl px-4 py-3 shadow-float">
            <div>
              <p className="font-sans text-xs font-semibold text-ink flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                <span>Hỏi AI</span>
              </p>
              <p className="font-mono text-[9px] text-ink-subtle uppercase tracking-widest">Về Quốc</p>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex items-center gap-2">
              <a
                href={`https://chatgpt.com/?q=${candidatePrompt}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hỏi ChatGPT về năng lực của Ngô Chí Quốc"
                className="w-7 h-7 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 flex items-center justify-center transition-colors"
                title="Hỏi ChatGPT"
              >
                <span className="font-bold text-[10px]">GPT</span>
              </a>
              <a
                href={`https://claude.ai/new?q=${candidatePrompt}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hỏi Claude về năng lực của Ngô Chí Quốc"
                className="w-7 h-7 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 flex items-center justify-center transition-colors"
                title="Hỏi Claude"
              >
                <span className="font-bold text-[10px]">CL</span>
              </a>
              <a
                href={`https://www.google.com/search?q=${candidatePrompt}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hỏi Gemini về năng lực của Ngô Chí Quốc"
                className="w-7 h-7 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 flex items-center justify-center transition-colors"
                title="Hỏi Gemini"
              >
                <span className="font-bold text-[10px]">GEM</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 2. MOBILE QUICK CONTROLS (md:hidden) */}
      <div className="md:hidden w-full flex items-center justify-between mb-4 pt-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-pink-500" />
          <span className="font-sans text-sm font-bold text-ink">{profileName}</span>
          <span className="font-mono text-[10px] text-ink-subtle">· {titleRole}</span>
        </div>
        <button
          type="button"
          onClick={toggleMood}
          aria-label="Chuyển đổi giao diện sáng tối"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-1 border border-border text-xs font-mono text-ink shadow-sm"
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          <span>{isDarkMode ? 'Tối' : 'Sáng'}</span>
        </button>
      </div>

      {/* 3. CENTRAL HEADLINE (Main Hero Text) */}
      <div className="max-w-4xl mx-auto text-center z-10 my-auto py-10 md:py-20">
        {/* Mobile Polaroid Avatar (md:hidden) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: -3 }}
          transition={{ duration: 0.6 }}
          className="md:hidden mx-auto mb-6 w-70 sm:w-40 relative group"
        >
          {/* Subtle Washi Tape decoration */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-amber-200/70 dark:bg-amber-100/20 backdrop-blur-sm -rotate-2 shadow-sm border border-amber-300/40 rounded-[2px] z-10 pointer-events-none" />

          {/* Polaroid Frame */}
          <div className="w-full bg-surface-1 border border-border shadow-float rounded-2xl p-2.5 flex flex-col items-center">
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-surface-2 border border-border/60 shadow-inner">
              <Image
                src={avatarUrl}
                alt={`Ảnh đại diện chân dung ${profileName}`}
                fill
                priority
                sizes="160px"
                className="object-cover object-top"
              />
            </div>
            <div className="pt-2 pb-0.5 flex items-center justify-between w-full px-1">
              <span className="font-serif italic text-xs text-ink font-semibold">{profileName.split(' ').pop()} 👋</span>
              <span className="font-mono text-[9px] text-ink-subtle uppercase tracking-wider">2026</span>
            </div>
          </div>
        </motion.div>

        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-1 border border-border shadow-sm mb-6 md:mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500" />
          </span>
          <span className="font-mono text-xs text-ink-muted">{statusText}</span>
        </motion.div>

        {/* Big H1 Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-sans font-semibold text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.15] tracking-tight text-ink"
        >
          Tôi biến <span className="underline decoration-pink-400/60 decoration-wavy underline-offset-8">sự mơ hồ</span> thành{' '}
          <span className="text-pink-500 font-bold">định hướng</span> sản phẩm &amp; <br className="hidden md:block" />
          <span className="italic font-serif">tạo giá trị</span> cùng <span className="gradient-text-flow font-extrabold">AI</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-sm sm:text-base md:text-lg text-ink-muted max-w-2xl mx-auto font-sans leading-relaxed"
        >
          {subIntro || (
            <>
              Xin chào, tôi là <strong className="text-ink font-semibold">{profileName}</strong>. Một lập trình viên Full Stack &amp; Front End tâm huyết, chuyên sâu về ReactJS, Next.js, NestJS, tập trung xây dựng các ứng dụng web hiệu năng cao, tối ưu trải nghiệm người dùng.
            </>
          )}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#work"
            className="btn-gradient-ring shadow-sm hover:scale-105 transition-transform"
          >
            <span className="btn-gradient-ring-inner px-6 py-3 text-sm font-semibold flex items-center gap-2">
              Xem Dự Án Nổi Bật
            </span>
          </a>

          <Link
            href="/freelance"
            className="px-6 py-3 rounded-full bg-surface-1 border border-border hover:border-pink-500/50 text-sm font-semibold text-ink shadow-sm hover:scale-105 transition-all flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Freelance Works</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-pink-500/10 text-pink-500 font-bold">Mới</span>
          </Link>

          <a
            href="#contact"
            className="px-6 py-3 rounded-full bg-surface-1 border border-border hover:border-border-hover text-sm font-semibold text-ink shadow-sm hover:scale-105 transition-all"
          >
            Liên Hệ Ngay
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none opacity-40 hidden md:flex">
        <span className="font-mono text-[10px] uppercase tracking-widest mb-1 text-ink-subtle">Cuộn xuống</span>
        <div className="w-4 h-7 rounded-full border border-border flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-ink-muted animate-bounce" />
        </div>
      </div>
    </section>
  );
};
