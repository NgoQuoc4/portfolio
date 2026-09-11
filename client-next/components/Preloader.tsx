'use client';

import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  label?: string;
  title?: string;
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({
  label = "Hồ sơ năng lực · Ngô Chí Quốc",
  title = "NGO CHI QUOC",
  onComplete, 
}) => {
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    // Khóa cuộn trang khi đang chạy preloader
    document.body.style.overflow = 'hidden';

    const duration = 2000; // 2 giây đếm số
    let start: number | null = null;
    let animationFrameId: number;

    const tick = (now: number) => {
      if (start === null) start = now;
      const progress = Math.min((now - start) / duration, 1);

      // Hàm giải tích easeOutCubic: ban đầu số tăng nhanh, sau đó hãm phanh chậm dần về 100%
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentPct = Math.round(eased * 100);
      setCount(currentPct);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        // Đã đạt 100%: Dừng lại 240ms rồi kích hoạt hiệu ứng rèm cuốn lên
        setTimeout(() => {
          setIsDone(true);
          document.body.style.overflow = '';
          if (onComplete) onComplete();

          // Sau khi hoàn tất transition (1000ms), xóa hoàn toàn khỏi DOM
          setTimeout(() => {
            setIsRemoved(true);
          }, 1100);
        }, 240);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (isRemoved) return null;

  return (
    <aside
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      style={{
        transition: 'transform 1s cubic-bezier(0.76, 0, 0.24, 1)',
        transform: isDone ? 'translateY(-100%)' : 'translateY(0)',
        willChange: 'transform',
      }}
      className="fixed inset-0 z-[10000] bg-[#141414] text-white flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* 1. Ảnh nền nghệ thuật trừu tượng */}
      <img
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-30 pointer-events-none"
      />

      {/* 2. Lớp phủ Scrim Gradient điện ảnh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(10,10,10,.65) 0%, rgba(10,10,10,.45) 45%, rgba(10,10,10,.75) 100%)',
        }}
      />

      {/* 3. Khung nội dung trung tâm: Label & Title Serif */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="m-0 mb-4 text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-white/60 animate-[fadeInUp_0.8s_ease_forwards_0.1s]">
          {label}
        </p>
        <h1
          style={{ fontFamily: 'var(--font-serif, "Instrument Serif", "Georgia", serif)' }}
          className="m-0 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal leading-[1.05] tracking-tight text-white/95 italic animate-[fadeInUp_1s_cubic-bezier(0.2,0.7,0.2,1)_forwards_0.25s]"
        >
          {title}
        </h1>
      </div>

      {/* 4. Đồng hồ đếm số phần trăm ở góc dưới bên phải */}
      <div className="absolute right-6 sm:right-12 md:right-16 bottom-8 sm:bottom-12 z-10 flex items-baseline gap-1 tabular-nums">
        <span
          style={{ fontFamily: 'var(--font-serif, "Instrument Serif", "Georgia", serif)' }}
          className="text-4xl sm:text-6xl md:text-7xl leading-none text-white/95 font-light"
        >
          {count}
        </span>
        <span className="text-sm sm:text-xl font-mono text-white/50">%</span>
      </div>

      {/* 5. Thanh tiến trình siêu mảnh 2px ở mép đáy màn hình */}
      <div className="absolute left-0 bottom-0 w-full h-[2px] bg-white/15 z-10">
        <div
          className="h-full bg-white transition-[width] duration-75 ease-out"
          style={{ width: `${count}%` }}
        />
      </div>

      {/* Animation keyframe cục bộ */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </aside>
  );
};
