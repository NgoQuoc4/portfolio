'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface PlaygroundItem {
  id: string;
  title: string;
  badge: string;
  year: string;
  description: string;
  cover_url: string;
  link?: string;
  isComingSoon?: boolean;
}

const playgroundItems: PlaygroundItem[] = [
  {
    id: '1',
    title: 'Catalog Drop',
    badge: 'Figma Plugin',
    year: '2026',
    description: 'Plugin Figma kéo sản phẩm thực tế — tên, giá, ảnh chất lượng cao — trực tiếp từ API vào mockup.',
    cover_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    link: 'https://figma.com',
  },
  {
    id: '2',
    title: 'The Treadmill League',
    badge: 'iOS App',
    year: '2026',
    description: 'Biến chiếc máy chạy bộ gia đình thành cuộc thi bảng xếp hạng hàng tuần. Mọi người ghi lại số vòng và tranh nhất bảng.',
    cover_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    link: '#',
  },
  {
    id: '3',
    title: 'Onlythree',
    badge: 'Công Cụ Năng Suất',
    year: '2026',
    description: 'Danh sách việc theo phống brutalist — chỉ cho phép 3 ưu tiên quan trọng mỗi ngày. Việc bạn nói KHÔNG mới được ăn mừng.',
    cover_url: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=600&q=80',
    link: 'https://example.com',
  },
  {
    id: '4',
    title: 'Time to Stand Up',
    badge: 'Chrome Extension',
    year: '2026',
    description: 'Tiện mở rộng Chrome bắt buộc bạn đứng dậy mỗi 45 phút. Giao diện Windows 98, không có nút snooze.',
    cover_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    link: '#',
  },
  {
    id: '5',
    title: 'Vibe 100',
    badge: 'Thử Thách',
    year: '2026',
    description: '100 micro-interaction được làm trong 100 ngày bằng CSS thuần và Framer Motion.',
    cover_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
    isComingSoon: true,
  },
];

export const PlaygroundSection = () => {
  return (
    <section id="play" className="relative py-24 bg-canvas overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <div>
            <p className="font-mono text-xs text-pink-500 uppercase tracking-widest mb-2 font-semibold">
              Khu Vui Chơi
            </p>
            <h2 className="font-sans font-semibold text-3xl sm:text-4xl md:text-5xl text-ink tracking-tight">
              Xây Từ Ma Sát
            </h2>
          </div>
          <p className="text-sm sm:text-base text-ink-muted max-w-lg md:text-right leading-relaxed">
            Những thứ tôi tự xây vì thấy mọi thứ cứ phức tạp vô lý — cho bản thân, nhóm, hay bạn bè. Giải pháp đơn giản nhất cho vấn đề thực tế.
          </p>
        </div>
      </div>

      {/* Horizontal Scrollable Cards */}
      <div
        className="flex gap-6 overflow-x-auto px-6 md:px-12 pb-6 no-scrollbar"
        style={{
          maskImage: 'linear-gradient(to right, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, black 85%, transparent 100%)',
        }}
      >
        {playgroundItems.map((item) => (
          <div
            key={item.id}
            className="group relative shrink-0 w-72 sm:w-80 rounded-3xl overflow-hidden border border-border bg-surface-1 shadow-float transition-all duration-300 hover:-translate-y-1 hover:border-pink-300 dark:hover:border-pink-900 cursor-pointer"
          >
            {/* Cover Image */}
            <div className="relative aspect-[4/3] bg-surface-2 overflow-hidden">
              <img
                src={item.cover_url}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              <div className="absolute inset-x-0 top-0 p-4 flex items-center justify-between text-white/90">
                <span className="font-mono text-[10px] uppercase tracking-widest bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  {item.year}
                </span>
                {item.isComingSoon ? (
                  <span className="font-mono text-[9px] uppercase tracking-widest bg-pink-500 text-white px-2 py-0.5 rounded-full font-bold">
                    Sắp Ra Mắt
                  </span>
                ) : (
                  <ArrowUpRight className="w-4 h-4" />
                )}
              </div>
            </div>

            {/* Content & Hover Accordion */}
            <div className="p-6">
              <span className="inline-block font-mono text-[10px] uppercase tracking-wider text-pink-600 bg-pink-500/10 px-2.5 py-1 rounded-full mb-2 font-semibold">
                {item.badge}
              </span>
              <h4 className="font-sans font-semibold text-xl text-ink">
                {item.title}
              </h4>

              {/* Expand on hover */}
              <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-48 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                <p className="text-xs sm:text-sm text-ink-muted mt-3 leading-relaxed">
                  {item.description}
                </p>
                {item.link && !item.isComingSoon && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-pink-500 hover:text-pink-600 font-semibold mt-3"
                  >
                  <span>Xem thử</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
