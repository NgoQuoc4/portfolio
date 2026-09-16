'use client';

import React from 'react';
import Link from 'next/link';
import {
  X,
  ShieldCheck,
  ExternalLink,
  Eye,
  Sun,
  Moon,
  LogOut,
} from 'lucide-react';
import type { AdminTabId, PageFilterId, PageSectionGroup } from './types';

interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  selectedPageFilter: PageFilterId;
  setSelectedPageFilter: (filter: PageFilterId) => void;
  visiblePageGroups: PageSectionGroup[];
  activeTab: AdminTabId;
  setActiveTab: (tab: AdminTabId) => void;
  onTabSelect?: (tab: AdminTabId) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  handleLogout: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  selectedPageFilter,
  setSelectedPageFilter,
  visiblePageGroups,
  activeTab,
  setActiveTab,
  onTabSelect,
  isDarkMode,
  toggleTheme,
  handleLogout,
}) => {
  return (
    <>
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

        {/* Navigation Menu Grouped By Page */}
        <div className="p-3 flex-1 overflow-y-auto space-y-3">
          {/* Page Filter Tabs */}
          <div>
            <div className="flex items-center justify-between px-1 mb-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-ink-subtle">
                Phân loại theo trang
              </span>
              <span className="text-[10px] font-mono text-pink-500 font-semibold">
                {visiblePageGroups.length} nhóm
              </span>
            </div>

            <div
              className="flex items-center gap-1 p-1 rounded-xl bg-surface-2 border border-border overflow-x-auto [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none' }}
            >
              {[
                { id: 'all' as const, label: 'Tất cả' },
                { id: 'home' as const, label: 'Trang Chủ' },
                { id: 'freelance' as const, label: 'Freelance' },
                { id: 'resume' as const, label: 'Resume' },
                { id: 'system' as const, label: 'Hệ thống' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedPageFilter(tab.id)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap transition-all cursor-pointer ${
                    selectedPageFilter === tab.id
                      ? 'bg-ink text-surface-1 font-bold shadow-xs'
                      : 'text-ink-muted hover:text-ink hover:bg-surface-1'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grouped Page Items */}
          <div className="space-y-4">
            {visiblePageGroups.map((group) => (
              <div key={group.id} className="space-y-1">
                <div className="flex items-center justify-between px-2.5 py-1 rounded-lg bg-surface-2/60 border border-border/60 text-[10px] font-mono">
                  <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-pink-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                    <span>{group.title}</span>
                  </div>
                  {group.path && (
                    <Link
                      href={group.path}
                      target="_blank"
                      className="text-ink-subtle hover:text-pink-500 flex items-center gap-1 transition-colors"
                      title={`Xem trực tiếp ${group.title} (${group.path})`}
                    >
                      <span>{group.badge}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </Link>
                  )}
                </div>

                <div className="space-y-0.5 pt-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setSidebarOpen(false);
                          if (onTabSelect) onTabSelect(item.id);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer group text-left ${
                          isActive
                            ? 'bg-ink text-surface-1 shadow-sm'
                            : 'text-ink-muted hover:text-ink hover:bg-surface-2'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon
                            className={`w-4 h-4 shrink-0 transition-colors ${
                              isActive ? 'text-pink-400' : 'text-ink-subtle group-hover:text-ink'
                            }`}
                          />
                          <span className="truncate">{item.label}</span>
                        </div>

                        {item.count !== undefined && (
                          <span
                            className={`px-1.5 py-0.5 rounded-full font-mono text-[10px] shrink-0 ${
                              isActive
                                ? 'bg-surface-1/20 text-surface-1'
                                : 'bg-surface-2 text-ink-muted group-hover:text-ink border border-border'
                            }`}
                          >
                            {item.count}
                          </span>
                        )}
                        {item.badge && item.count === undefined && (
                          <span
                            className={`px-1.5 py-0.5 rounded-md font-mono text-[9px] shrink-0 ${
                              isActive
                                ? 'bg-surface-1/20 text-surface-1'
                                : 'text-pink-500/80 bg-pink-500/10'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border space-y-3 bg-surface-1">
          <div className="flex items-center justify-between p-2 rounded-xl bg-surface-2 border border-border">
            <span className="text-xs font-mono text-ink-muted flex items-center gap-2">
              {isDarkMode ? (
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-500" />
              )}
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
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                  ● Online
                </p>
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
    </>
  );
};
