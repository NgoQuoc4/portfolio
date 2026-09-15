'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { BrandItem } from '@/lib/types';
import { defaultProfile } from '@/lib/defaults';


interface AboutSectionProps {
  name?: string;
  title?: string;
  location?: string;
  aboutSubtitle?: string;
  aboutHeadline?: string;
  about1?: string;
  about2?: string;
  skills?: string[];
  brands?: BrandItem[];
  avatarUrl?: string;
}

const defaultBrands: BrandItem[] = defaultProfile.brand_logos ?? [];

export const AboutSection: React.FC<AboutSectionProps> = ({
  name = 'Ngô Chí Quốc',
  title = 'Lập trình viên Full Stack & Front End',
  location = 'Hồ Chí Minh, Việt Nam',
  aboutSubtitle = 'Về Lập Trình Viên',
  aboutHeadline = 'Kỹ thuật chuẩn xác, tập trung vào trải nghiệm thực tế.',
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
    <section id="about" className="snap-start relative min-h-[100dvh] md:h-dvh flex flex-col justify-center py-10 md:py-0 bg-surface-1 overflow-x-hidden md:overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Left Column: Bio & Philosophy */}
          <div className="space-y-3.5 sm:space-y-4 lg:space-y-5">
            <div className="flex items-center gap-3.5">
              <Image
                src={avatarUrl}
                alt={`Ảnh đại diện ${name}`}
                width={52}
                height={52}
                className="rounded-full object-cover border-2 border-pink-500 shadow-sm ring-2 ring-pink-500/15 shrink-0"
              />
              <div>
                <p className="font-mono text-[11px] text-pink-500 uppercase tracking-wider font-semibold">
                  {aboutSubtitle}
                </p>
                <p className="font-sans font-bold text-base sm:text-lg text-ink leading-tight">
                  {name}
                </p>
                <p className="font-mono text-[11px] text-ink-muted">
                  {title} · {location}
                </p>
              </div>
            </div>

            <h2 className="font-sans font-bold text-2xl sm:text-3xl lg:text-4xl text-ink tracking-tight leading-snug">
              {aboutHeadline && aboutHeadline !== 'Kỹ thuật chuẩn xác, tập trung vào trải nghiệm thực tế.' ? (
                <span>{aboutHeadline}</span>
              ) : (
                <>
                  Kỹ thuật chuẩn xác,<br />
                  tập trung vào{' '}
                  <span className="text-pink-500 font-bold">
                    trải nghiệm thực tế
                  </span>.
                </>
              )}
            </h2>

            <div className="space-y-2 text-xs sm:text-sm text-ink/90 leading-relaxed font-sans">
              <p>
                {about1}
              </p>
              <p>
                {about2}
              </p>
            </div>

            {/* Skills Pills */}
            <div className="pt-1">
              <p className="font-mono text-[11px] text-ink-muted uppercase tracking-wider mb-2 font-bold">
                Kỹ năng &amp; Công nghệ chính
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[11px] sm:text-xs text-ink bg-surface-2 border border-border px-2.5 sm:px-3 py-1 rounded-full font-medium shadow-2xs hover:border-pink-500 hover:text-pink-500 transition-colors"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-1.5 flex flex-wrap items-center gap-2.5">
              <a
                href="/resume"
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-ink text-surface-1 text-xs sm:text-sm font-semibold hover:opacity-90 shadow-sm transition-all"
              >
                Xem chi tiết Hồ sơ / CV
              </a>
              <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 bg-emerald-500/15 rounded-full px-2.5 py-1 font-bold">
                Sẵn sàng nhận dự án mới
              </span>
            </div>
          </div>

          {/* Right Column: Brands & Tech Logos Grid */}
          <div>
            <p className="font-mono text-[11px] text-ink-muted uppercase tracking-wider mb-4 text-center md:text-left font-bold">
              Công nghệ &amp; Nền tảng chuyên môn
            </p>
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 lg:gap-3.5">
              {brands.map((b) => (
                <div
                  key={b.name}
                  className="group flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl bg-surface-2 border border-border hover:border-pink-500 transition-all duration-300 hover:scale-105 shadow-2xs"
                >
                  <Image
                    src={b.logo_url}
                    alt={b.name}
                    width={34}
                    height={34}
                    className="object-contain transition-transform duration-300 group-hover:scale-110 mb-1.5"
                  />
                  <span className="font-mono text-[11px] text-ink transition-colors font-semibold">
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

