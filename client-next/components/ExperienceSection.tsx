'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  Building2,
  FileText,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { defaultExperiences } from '@/lib/defaults';
import type { ExperienceItem } from '@/lib/types';

interface ExperienceSectionProps {
  initialExperiences?: ExperienceItem[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  initialExperiences = defaultExperiences,
}) => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>(initialExperiences);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    try {
      const local = localStorage.getItem('portfolio_experiences');
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setExperiences(parsed);
        }
      }
    } catch (e) {
      console.warn('Using fallback experiences:', e);
    }
  }, []);

  const currentExp = experiences[selectedIndex] || experiences[0] || defaultExperiences[0];

  return (
    <section
      id="experience"
      className="snap-start relative min-h-[100dvh] md:h-dvh flex flex-col justify-center py-16 md:py-0 px-6 md:px-12 bg-canvas overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-border">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-500 font-mono text-xs font-bold mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>HÀNH TRÌNH SỰ NGHIỆP</span>
            </div>
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-ink tracking-tight">
              Kinh Nghiệm Làm Việc &amp;{' '}
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Dấu Ấn Chuyên Môn
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted mt-1 max-w-2xl">
              Các vị trí và môi trường thực tế tôi đã cống hiến: từ agency thương mại điện tử, công ty công nghệ đến các dự án độc lập chất lượng cao.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-1 border border-border hover:border-pink-500/50 text-xs font-mono font-bold text-ink hover:text-pink-500 transition-all shadow-xs"
            >
              <FileText className="w-3.5 h-3.5 text-pink-500" />
              <span>Xem Full CV (PDF)</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* 2-Column Interactive Career Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Company Selector List (4 cols) */}
          <div className="lg:col-span-4 space-y-2.5">
            <p className="text-[11px] font-mono uppercase tracking-wider text-ink-subtle font-bold px-1">
              Danh sách công ty &amp; vai trò:
            </p>

            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 [&::-webkit-scrollbar]:hidden">
              {experiences.map((exp, idx) => {
                const isSelected = selectedIndex === idx;
                return (
                  <button
                    key={exp._id || idx}
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer shrink-0 min-w-[260px] lg:min-w-0 ${
                      isSelected
                        ? 'bg-surface-1 border-pink-500 shadow-md ring-1 ring-pink-500/20'
                        : 'bg-surface-1/60 border-border hover:border-border-hover hover:bg-surface-1 text-ink-muted hover:text-ink'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-[11px] font-semibold text-pink-500">
                        {exp.period}
                      </span>
                      {exp.type && (
                        <span className="px-2 py-0.5 rounded-md bg-surface-2 border border-border text-[10px] font-mono text-ink-subtle">
                          {exp.type}
                        </span>
                      )}
                    </div>

                    <h3 className={`font-bold text-sm leading-snug line-clamp-1 ${isSelected ? 'text-ink' : 'text-ink/80'}`}>
                      {exp.role}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-ink-muted mt-1">
                      <Building2 className="w-3.5 h-3.5 text-ink-subtle shrink-0" />
                      <span className="truncate">{exp.company}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Experience Card (8 cols) */}
          <div className="lg:col-span-8">
            <motion.div
              key={currentExp._id || selectedIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-surface-1 border border-border rounded-3xl p-6 sm:p-8 shadow-float space-y-6 relative overflow-hidden"
            >
              {/* Header inside card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-5">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 font-mono text-xs font-bold border border-pink-500/20 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>{currentExp.company}</span>
                    </span>

                    {currentExp.location && (
                      <span className="inline-flex items-center gap-1 text-xs font-mono text-ink-muted">
                        <MapPin className="w-3 h-3 text-ink-subtle" />
                        <span>{currentExp.location}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-ink leading-tight mt-1 font-sans">
                    {currentExp.role}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono px-3.5 py-1.5 rounded-full bg-surface-2 border border-border text-ink shrink-0 self-start">
                  <Calendar className="w-3.5 h-3.5 text-pink-500" />
                  <span>{currentExp.period}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                {currentExp.description}
              </p>

              {/* Key Achievements */}
              {currentExp.achievements && currentExp.achievements.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-ink font-bold flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                    <span>Đóng góp &amp; Kết quả then chốt:</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentExp.achievements.map((item, aIdx) => (
                      <div
                        key={aIdx}
                        className="p-3 rounded-2xl bg-surface-2 border border-border/80 text-xs text-ink leading-relaxed flex items-start gap-2.5 shadow-2xs"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              {currentExp.tech_stack && currentExp.tech_stack.length > 0 && (
                <div className="pt-2 border-t border-border">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-ink-subtle font-bold mb-2.5 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-pink-500" />
                    <span>Công nghệ sử dụng chính:</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {currentExp.tech_stack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-xl bg-surface-2 border border-border font-mono text-[11px] font-semibold text-ink hover:border-pink-500/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
