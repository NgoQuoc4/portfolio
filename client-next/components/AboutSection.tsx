'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { BrandItem } from '@/lib/types';
import { defaultProfile } from '@/lib/defaults';


interface AboutSectionProps {
  about1?: string;
  about2?: string;
  skills?: string[];
  brands?: BrandItem[];
  avatarUrl?: string;
}

const defaultBrands: BrandItem[] = defaultProfile.brand_logos ?? [];

export const AboutSection: React.FC<AboutSectionProps> = ({
  about1 = 'Là một nhà phát triển Full Stack tận tâm, luôn cam kết mang lại kết quả tốt nhất, tôi sở hữu kỹ năng nâng cao trong việc triển khai các công nghệ tiên tiến như ReactJS, NextJS, NestJS, ExpressJS. Tôi chuyên xây dựng các sản phẩm chất lượng cao, hướng đến người dùng và chuyển đổi các thiết kế thành trải nghiệm kỹ thuật số liền mạch.',
  about2 = 'Ngoài Full Stack, tôi còn có chuyên môn vững chắc về Vanilla JavaScript, Liquid (Shopify) và Handlebars (BigCommerce), cho phép tôi phát triển và tùy chỉnh các nền tảng thương mại điện tử một cách hiệu quả, tối ưu hóa hiệu suất và tạo ra các giải pháp front-end linh hoạt, có khả năng mở rộng.',
  skills = [
    'ReactJS',
    'NextJS',
    'TypeScript',
    'NestJS',
    'NodeJS',
    'ExpressJS',
    'Prisma ORM',
    'MongoDB',
    'MySQL',
    'TailwindCSS',
    'Redux Toolkit',
    'TanStack React Query',
    'Ant Design',
    'Zod',
    'JWT',
    'RESTful APIs',
  ],
  brands = defaultBrands,
  avatarUrl = 'https://res.cloudinary.com/dguad3xyf/image/upload/v1776242078/MeUJ0ogEM8MjZvYWfSb9_665822b791856_cvtpl_yljpfv.jpg',
}) => {
  return (
    <section id="about" className="snap-start relative min-h-[100dvh] md:h-dvh flex items-center py-16 md:py-0 bg-surface-1">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Left Column: Bio & Philosophy */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Image
                src={avatarUrl}
                alt="Ngô Chí Quốc"
                width={64}
                height={64}
                className="rounded-full object-cover border-2 border-pink-500 shadow-md ring-4 ring-pink-500/10"
              />
              <div>
                <p className="font-mono text-xs text-pink-500 uppercase tracking-widest font-semibold">
                  Về Lập Trình Viên
                </p>
                <p className="font-sans font-bold text-lg text-ink">
                  Ngô Chí Quốc
                </p>
                <p className="font-mono text-xs text-ink-muted">
                  Lập trình viên Full Stack &amp; Front End · Hồ Chí Minh
                </p>
              </div>
            </div>

            <h2 className="font-sans font-bold text-3xl sm:text-4xl lg:text-[42px] text-ink tracking-tight leading-[1.25]">
              Kỹ thuật chuẩn xác,<br />
              tập trung vào{' '}
              <span className="text-pink-500 dark:text-pink-400 font-bold">
                trải nghiệm thực tế
              </span>.
            </h2>
            <p className="text-base text-slate-700 dark:text-slate-200 leading-relaxed font-sans font-normal">
              {about1}
            </p>
            <p className="text-base text-slate-700 dark:text-slate-200 leading-relaxed font-sans font-normal">
              {about2}
            </p>

            {/* Skills Pills */}
            <div className="pt-2">
              <p className="font-mono text-xs text-slate-600 dark:text-slate-300 uppercase tracking-widest mb-3 font-semibold">
                Kỹ năng &amp; Công nghệ chính
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-xs text-slate-800 dark:text-slate-100 bg-slate-100/90 dark:bg-surface-2 border border-slate-300/80 dark:border-border px-3 py-1.5 rounded-full font-medium hover:border-pink-500 hover:text-pink-600 transition-colors shadow-2xs"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <a
                href="/resume"
                className="inline-flex items-center px-6 py-3 rounded-full bg-ink text-surface-1 text-sm font-semibold hover:opacity-90 shadow-sm transition-all"
              >
                Xem chi tiết Hồ sơ / CV
              </a>
              <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 bg-emerald-500/15 rounded-full px-3 py-1 font-semibold">
                Sẵn sàng nhận dự án mới
              </span>
            </div>
          </div>

          {/* Right Column: Brands & Tech Logos Grid */}
          <div>
            <p className="font-mono text-xs text-slate-600 dark:text-slate-300 uppercase tracking-widest mb-6 text-center lg:text-left font-semibold">
              Công nghệ &amp; Nền tảng chuyên môn
            </p>
            <div className="grid grid-cols-3 gap-4">
              {brands.map((b) => (
                <div
                  key={b.name}
                  className="group flex flex-col items-center justify-center p-5 rounded-2xl bg-surface-2 border border-border hover:border-pink-400/80 dark:hover:border-pink-600 transition-all duration-300 hover:scale-105 shadow-2xs"
                >
                  <Image
                    src={b.logo_url}
                    alt={b.name}
                    width={40}
                    height={40}
                    className="object-contain transition-transform duration-300 group-hover:scale-110 mb-2"
                  />
                  <span className="font-mono text-[11px] text-slate-700 dark:text-slate-300 group-hover:text-pink-500 transition-colors font-semibold">
                    {b.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
