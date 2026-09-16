'use client';

import React from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  Sun,
  Moon,
  ExternalLink,
  ChevronRight,
  Eye,
  LogOut,
} from 'lucide-react';
import type { NavItem } from './types';

interface AdminHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  currentTabMeta: NavItem;
  isDarkMode: boolean;
  toggleTheme: () => void;
  handleLogout: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  sidebarOpen,
  setSidebarOpen,
  currentTabMeta,
  isDarkMode,
  toggleTheme,
  handleLogout,
}) => {
  const CurrentIcon = currentTabMeta.icon;

  return (
    <>
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
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
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

      {/* Desktop Top Header Bar */}
      <header className="sticky top-0 z-30 bg-surface-1/80 backdrop-blur-md border-b border-border px-6 py-3.5 hidden lg:flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-ink-subtle">Admin</span>
          <ChevronRight className="w-3.5 h-3.5 text-ink-subtle" />
          <span className="px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-500 border border-pink-500/20 font-bold">
            {currentTabMeta.pageName} ({currentTabMeta.pagePath})
          </span>
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
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {currentTabMeta.pagePath && (
            <Link
              href={currentTabMeta.pagePath}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-surface-2 border border-border text-xs font-semibold text-ink hover:border-pink-500 transition-all shadow-xs"
              title={`Mở xem trực tiếp ${currentTabMeta.pageName}`}
            >
              <Eye className="w-3.5 h-3.5 text-pink-500" />
              <span>Xem {currentTabMeta.pageName}</span>
              <ExternalLink className="w-3 h-3 text-ink-subtle" />
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl text-rose-500 bg-rose-500/10 hover:bg-rose-500/20 transition-colors cursor-pointer"
            title="Đăng xuất"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Page Scope Context Bar */}
      <div className="mb-6 p-4 rounded-2xl bg-surface-1 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-pink-500/10 text-pink-500 border border-pink-500/20 flex items-center justify-center shrink-0">
            <CurrentIcon className="w-4.5 h-4.5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono uppercase tracking-wider text-pink-500 font-bold">
                Khu vực cài đặt: {currentTabMeta.pageName}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-surface-2 border border-border text-ink-muted">
                Đường dẫn: {currentTabMeta.pagePath}
              </span>
            </div>
            <p className="text-xs text-ink-muted mt-0.5">{currentTabMeta.desc}</p>
          </div>
        </div>

        {currentTabMeta.pagePath && (
          <Link
            href={currentTabMeta.pagePath}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-surface-2 hover:bg-surface-3 border border-border text-xs font-mono font-semibold text-ink hover:text-pink-500 transition-colors shrink-0 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-pink-500" />
            <span>Mở xem trang {currentTabMeta.pageName}</span>
            <ExternalLink className="w-3 h-3 text-ink-subtle" />
          </Link>
        )}
      </div>
    </>
  );
};
