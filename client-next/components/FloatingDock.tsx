'use client';

import React, { useEffect, useState } from 'react';
import { Home, Briefcase, User, Mail, FileText, Settings, Award } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Trang chủ', icon: <Home className="w-4 h-4" /> },
  { id: 'work', label: 'Dự án', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'about', label: 'Giới thiệu', icon: <User className="w-4 h-4" /> },
  { id: 'contact', label: 'Liên hệ', icon: <Mail className="w-4 h-4" /> },
];

export const FloatingDock = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check admin auth once on mount
    setIsAdmin(!!localStorage.getItem('token'));
  }, []);

  useEffect(() => {
    const pageScroll = document.getElementById('page-scroll');
    if (!pageScroll) return;

    const sections = navItems.map((item) => item.id);
    let positions: { id: string; top: number }[] = [];

    const updatePositions = () => {
      positions = sections.map((id) => {
        const el = document.getElementById(id);
        return { id, top: el ? el.offsetTop : Infinity };
      });
    };

    const handleScroll = () => {
      const mid = pageScroll.scrollTop + pageScroll.clientHeight / 2;
      let current = sections[0];
      for (const pos of positions) {
        if (pos.top <= mid) {
          current = pos.id;
        }
      }
      setActiveSection(current);
    };

    updatePositions();
    handleScroll();

    pageScroll.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updatePositions);

    return () => {
      pageScroll.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updatePositions);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Desktop Vertical Dock (Left) */}
      <nav
        aria-label="Điều hướng chính trên máy tính"
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-1 p-1.5 backdrop-blur-md"
        style={{
          width: '52px',
          background: 'rgba(244, 245, 248, 0.85)',
          border: '1px solid rgba(228, 231, 239, 0.9)',
          borderRadius: '18px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.03)',
        }}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <div key={item.id} className="relative flex items-center">
              <button
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`relative flex items-center justify-center w-10 h-10 rounded-[12px] transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-pink-600 bg-pink-500/15 font-semibold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-black/5'
                }`}
                aria-label={item.label}
              >
                {item.icon}
              </button>

              {/* Tooltip on right */}
              {hoveredItem === item.id && (
                <div className="absolute left-14 px-2.5 py-1 bg-slate-900 text-white text-xs rounded-lg whitespace-nowrap pointer-events-none shadow-md transition-opacity">
                  {item.label}
                </div>
              )}
            </div>
          );
        })}

        <div className="mx-2 my-1 border-t border-slate-300/60" />

        {/* Freelance & Booking Page Link */}
        <div className="relative flex items-center">
          <a
            href="/freelance"
            aria-label="Xem dự án Freelance và Đặt lịch hợp tác"
            onMouseEnter={() => setHoveredItem('freelance')}
            onMouseLeave={() => setHoveredItem(null)}
            className="flex items-center justify-center w-10 h-10 rounded-[12px] text-pink-600 hover:bg-pink-500/10 transition-colors"
            title="Freelance & Booking"
          >
            <Award className="w-4 h-4 text-pink-500" />
          </a>
          {hoveredItem === 'freelance' && (
            <div className="absolute left-14 px-2.5 py-1 bg-slate-900 text-white text-xs rounded-lg whitespace-nowrap pointer-events-none shadow-md">
              Dự Án Freelance &amp; Booking ↗
            </div>
          )}
        </div>

        {/* Resume link */}
        <div className="relative flex items-center">
          <a
            href="/resume"
            aria-label="Xem hồ sơ và CV của Ngô Chí Quốc"
            onMouseEnter={() => setHoveredItem('resume')}
            onMouseLeave={() => setHoveredItem(null)}
            className="flex items-center justify-center w-10 h-10 rounded-[12px] text-slate-600 hover:text-slate-900 hover:bg-black/5 transition-colors"
            title="Hồ sơ / CV"
          >
            <FileText className="w-4 h-4" />
          </a>
          {hoveredItem === 'resume' && (
            <div className="absolute left-14 px-2.5 py-1 bg-slate-900 text-white text-xs rounded-lg whitespace-nowrap pointer-events-none shadow-md">
              Hồ sơ / CV
            </div>
          )}
        </div>

        {/* Admin Dashboard Link — only visible when logged in */}
        {isAdmin && (
          <div className="relative flex items-center">
            <a
              href="/admin"
              aria-label="Trang quản trị Admin"
              onMouseEnter={() => setHoveredItem('admin')}
              onMouseLeave={() => setHoveredItem(null)}
              className="flex items-center justify-center w-10 h-10 rounded-[12px] text-slate-600 hover:text-pink-600 hover:bg-pink-500/10 transition-colors"
              title="Admin Dashboard"
            >
              <Settings className="w-4 h-4" />
            </a>
            {hoveredItem === 'admin' && (
              <div className="absolute left-14 px-2.5 py-1 bg-slate-900 text-white text-xs rounded-lg whitespace-nowrap pointer-events-none shadow-md">
                Quản trị Admin
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Mobile Horizontal Dock (Bottom) */}
      <nav
        aria-label="Điều hướng trên thiết bị di động"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex md:hidden items-center gap-1.5 p-1.5 backdrop-blur-md"
        style={{
          background: 'rgba(244, 245, 248, 0.92)',
          border: '1px solid rgba(228, 231, 239, 0.9)',
          borderRadius: '9999px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.04)',
        }}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                isActive
                  ? 'text-pink-600 bg-pink-500/15'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              aria-label={item.label}
            >
              {item.icon}
            </button>
          );
        })}

        {isAdmin && (
          <a
            href="/admin"
            aria-label="Trang quản trị Admin"
            className="flex items-center justify-center w-10 h-10 rounded-full text-slate-600 hover:text-pink-600 transition-all"
            title="Quản trị Admin"
          >
            <Settings className="w-4 h-4" />
          </a>
        )}

        <a
          href="/freelance"
          aria-label="Dự Án Khách Hàng & Đặt Lịch Hợp Tác"
          className="flex items-center justify-center w-10 h-10 rounded-full text-pink-500 hover:bg-pink-500/10 transition-all"
          title="Dự Án Khách Hàng & Đặt Lịch Hợp Tác"
        >
          <Award className="w-4 h-4" />
        </a>
      </nav>
    </>
  );
};
