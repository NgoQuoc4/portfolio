'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, FileText, Compass, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-canvas bg-grid text-ink flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden select-none">
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-pink-500/10 blur-[120px] pointer-events-none -z-0" />

      {/* Top bar */}
      <header className="relative z-10 max-w-[1400px] mx-auto w-full flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 font-sans font-extrabold text-lg sm:text-xl tracking-tight text-ink group"
        >
          <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
            Q
          </div>
          <span>NGÔ CHÍ QUỐC</span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-1 border border-border shadow-xs text-xs font-mono text-ink-muted">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>Lỗi 404: Trang không tồn tại</span>
        </div>
      </header>

      {/* Main 404 Content */}
      <main className="relative z-10 max-w-2xl mx-auto w-full text-center my-auto py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Giant artistic 404 numbers */}
          <div className="relative inline-block mb-4">
            <h1 className="font-sans font-black text-8xl sm:text-9xl md:text-[11rem] tracking-tighter text-ink/10 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif italic text-4xl sm:text-5xl md:text-6xl gradient-text-flow font-medium">
                Lạc Đường Rồi!
              </span>
            </div>
          </div>

          {/* Descriptive text */}
          <h2 className="font-sans font-bold text-2xl sm:text-3xl text-ink tracking-tight mb-3">
            Trang này không tồn tại trên bàn làm việc
          </h2>
          <p className="text-sm sm:text-base text-ink-muted max-w-md mx-auto leading-relaxed mb-8">
            Đường dẫn bạn vừa truy cập có thể đã được đổi tên, chuyển vị trí hoặc không còn khả dụng.
          </p>

          {/* Terminal / Digital Desk note */}
          <div className="max-w-md mx-auto mb-8 p-4 rounded-2xl bg-surface-1/90 border border-border shadow-float text-left font-mono text-xs text-ink-muted backdrop-blur-sm">
            <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-border text-[11px] text-ink-subtle">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
              <span className="ml-2 font-semibold">status: 404_not_found</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              &gt; Không tìm thấy trang tương ứng với yêu cầu.
            </p>
            <p className="text-pink-500 mt-1 font-semibold">
              &gt; Đề xuất: Quay lại trang chủ hoặc xem hồ sơ năng lực.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-ink text-surface-1 font-semibold text-sm hover:opacity-90 hover:scale-105 transition-all shadow-sm cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Về Trang Chủ</span>
            </Link>

            <Link
              href="/resume"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-surface-1 border border-border text-ink font-semibold text-sm hover:border-pink-300 dark:hover:border-pink-900 transition-colors shadow-sm"
            >
              <FileText className="w-4 h-4 text-pink-500" />
              <span>Xem Hồ Sơ / CV</span>
            </Link>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-surface-1 border border-border text-ink-muted hover:text-ink text-sm font-medium transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>Liên Hệ</span>
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-[1400px] mx-auto w-full text-center text-xs font-mono text-ink-subtle">
        <span>Ngô Chí Quốc · Lập trình viên Full Stack &amp; Front End</span>
      </footer>
    </div>
  );
}
