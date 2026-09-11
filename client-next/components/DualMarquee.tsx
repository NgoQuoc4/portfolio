'use client';

import React from 'react';

const visualItemsRow1 = [
  { id: 1, title: 'Giao Diện Kiến Trúc Sạch', img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80' },
  { id: 2, title: 'Giao Diện Trợ Lý AI', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80' },
  { id: 3, title: 'Design System & Tokens', img: 'https://images.unsplash.com/photo-1581291518655-9523b932edcf?auto=format&fit=crop&w=600&q=80' },
  { id: 4, title: 'Dashboard Dark Mode', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80' },
  { id: 5, title: 'Luồng Thanh Toán Mobile', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80' },
];

const visualItemsRow2 = [
  { id: 6, title: 'Giao Diện Ví Fintech', img: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80' },
  { id: 7, title: 'Card Số Liệu SaaS', img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80' },
  { id: 8, title: 'Hero Typography Hiện Đại', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=600&q=80' },
  { id: 9, title: 'Phân Tích & Thống Kê', img: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=600&q=80' },
  { id: 10, title: 'Blog Tối Giản', img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80' },
];

export const DualMarquee = () => {
  return (
    <section id="visual" className="relative py-24 bg-surface-1 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center px-6 mb-12">
        <p className="font-mono text-xs text-pink-500 uppercase tracking-widest mb-2 font-semibold">
          Triển Lãm Trực Quan
        </p>
        <h2 className="font-sans font-semibold text-3xl sm:text-4xl text-ink tracking-tight mb-3">
          Giao Diện &amp; Hình Ảnh
        </h2>
        <p className="text-sm sm:text-base text-ink-muted max-w-lg mx-auto">
          Một góc nhìn về các giao diện kỹ thuật số, design system và component tôi đã xây dựng.
        </p>
      </div>

      {/* Mask Gradient container */}
      <div
        className="flex flex-col gap-6"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        {/* Row 1: Running Reverse */}
        <div className="animate-marquee-reverse flex gap-6">
          {[...visualItemsRow1, ...visualItemsRow1, ...visualItemsRow1].map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-72 sm:w-80 h-48 sm:h-56 rounded-2xl overflow-hidden border border-border bg-surface-2 shadow-sm shrink-0 group transition-all duration-300 hover:-translate-y-1 hover:shadow-float"
            >
              <div className="relative w-full h-full">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="font-mono text-xs text-white font-medium">{item.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Running Normal */}
        <div className="animate-marquee flex gap-6">
          {[...visualItemsRow2, ...visualItemsRow2, ...visualItemsRow2].map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-72 sm:w-80 h-48 sm:h-56 rounded-2xl overflow-hidden border border-border bg-surface-2 shadow-sm shrink-0 group transition-all duration-300 hover:-translate-y-1 hover:shadow-float"
            >
              <div className="relative w-full h-full">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="font-mono text-xs text-white font-medium">{item.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
