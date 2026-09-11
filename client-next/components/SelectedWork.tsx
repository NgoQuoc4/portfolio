'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, CheckCircle2 } from 'lucide-react';
import type { ProjectItem } from '@/lib/types';
import { defaultProjects } from '@/lib/defaults';

export type { ProjectItem };

interface SelectedWorkProps {
  projects?: ProjectItem[];
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ projects = [] }) => {
  const displayProjects = projects.length > 0 ? projects : defaultProjects;
  const [selectedFilter, setSelectedFilter] = useState('Tất cả');

  const categories = ['Tất cả', '0 → 1', 'Tăng trưởng', 'Nghiên cứu'];

  const filtered =
    selectedFilter === 'Tất cả'
      ? displayProjects
      : displayProjects.filter((p) => (p.category || '0 → 1') === selectedFilter);

  return (
    <section id="work" className="snap-start relative z-10 min-h-dvh md:h-dvh flex flex-col bg-canvas">
      {/* 1. Header (Fixed height slot on desktop) */}
      <div className="shrink-0 bg-canvas flex items-end pt-8 md:pt-0" style={{ height: 210 }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full pb-6">
          <p className="font-mono text-xs text-pink-500 uppercase tracking-widest mb-1.5 font-semibold">
            Dự Án Chọn Lọc
          </p>
          <h2 className="font-sans font-semibold text-3xl sm:text-4xl text-ink tracking-tight">
            Các sản phẩm đã phát triển
          </h2>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedFilter(cat)}
                className={`font-mono text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full border transition-all ${
                  selectedFilter === cat
                    ? 'bg-ink text-surface-1 border-ink font-semibold shadow-sm'
                    : 'text-ink-muted border-border hover:border-border-hover bg-surface-1'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Scrollable Cards Slot Container */}
      <div
        className="md:flex-1 overflow-y-auto overflow-x-hidden pb-24 md:pb-0 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none' }}
      >
        {filtered.map((proj, idx) => (
          <div
            key={proj._id || idx}
            className="snap-start w-full md:sticky md:top-0 md:h-[var(--slot-h)] mb-8 md:mb-0 md:flex md:flex-col md:justify-center"
            style={{
              ['--slot-h' as any]: 'calc(100dvh - 210px)',
              zIndex: (idx + 1) * 10,
            }}
          >
            <div
              className="max-w-[1400px] mx-auto w-full px-6 md:px-12 h-auto md:h-[var(--card-h)]"
              style={{
                ['--card-h' as any]: 'min(calc(100dvh - 260px), 640px)',
              }}
            >
              <div
                data-project-card="true"
                className="relative flex flex-col md:flex-row h-auto md:h-full rounded-3xl overflow-hidden bg-surface-1 border border-border shadow-float group transition-all duration-300 hover:border-pink-300 dark:hover:border-pink-900"
              >
                {/* Left Column: Mockup Image */}
                <div className="w-full md:w-1/2 h-60 sm:h-72 md:h-auto relative overflow-hidden bg-surface-2 shrink-0 group/image">
                  {proj.image_url ? (
                    <Image
                      src={proj.image_url}
                      alt={proj.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover/image:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-surface-2">
                      <span className="font-mono text-ink-subtle text-sm">Xem trước dự án</span>
                    </div>
                  )}
                  <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
                  <span className="absolute top-4 left-5 font-mono text-[10px] uppercase tracking-widest text-white/90 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    {proj.year || '2025'}
                  </span>
                </div>

                {/* Right Column: Project Details */}
                <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col justify-center shrink-0">
                  {proj.brand_logo && (
                    <span className="font-mono text-xs uppercase tracking-wider text-pink-500 font-semibold mb-2">
                      {proj.brand_logo}
                    </span>
                  )}

                  <h3 className="font-sans font-bold text-xl sm:text-2xl md:text-3xl text-ink tracking-tight mb-3 leading-tight">
                    {proj.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mb-4 line-clamp-3">
                    {proj.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.tech_stack.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] uppercase tracking-wider text-ink-muted bg-surface-2 px-2.5 py-1 rounded-full border border-border"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Metrics Bullet points */}
                  {proj.metrics && proj.metrics.length > 0 && (
                    <div className="space-y-1.5 mb-6 border-t border-border pt-3">
                      {proj.metrics.map((m, mIdx) => (
                        <p key={mIdx} className="font-mono text-xs text-ink-muted flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                          <span>{m}</span>
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex items-center gap-4 mt-auto">
                    {proj.live_demo && (
                      <a
                        href={proj.live_demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-600 hover:text-pink-500 font-mono uppercase tracking-wider transition-colors"
                      >
                        <span>Trải Nghiệm Trực Tiếp</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {proj.github_link && (
                      <a
                        href={proj.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink font-mono uppercase tracking-wider transition-colors"
                      >
                        <span>Mã Nguồn (GitHub)</span>
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
