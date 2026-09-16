'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Printer,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Globe,
  Briefcase,
  Calendar,
  GraduationCap,
  Download,
  Code2,
} from 'lucide-react';
import { defaultResume } from '@/lib/defaults';
import type { ResumeData } from '@/lib/types';

export default function ResumePage() {
  const [resume, setResume] = useState<ResumeData>(defaultResume);

  useEffect(() => {
    try {
      const localResume = localStorage.getItem('portfolio_resume');
      if (localResume) {
        const parsed = JSON.parse(localResume);
        setResume((prev) => ({ ...prev, ...parsed }));
      } else {
        // Fallback: merge basic identity from portfolio_profile if customized
        const localProf = localStorage.getItem('portfolio_profile');
        if (localProf) {
          const prof = JSON.parse(localProf);
          setResume((prev) => ({
            ...prev,
            name: prof.name || prev.name,
            title: prof.title || prev.title,
            avatar_url: prof.avatar_url || prev.avatar_url,
            location: prof.location || prev.location,
            email: prof.email || prev.email,
            phone: prof.phone || prev.phone,
            github_url: prof.social_links?.github || prev.github_url,
            ...(prof.resume_data || {}),
          }));
        }
      }
    } catch (e) {
      console.warn('Lỗi khi nạp dữ liệu resume:', e);
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const experiences = resume.experiences && resume.experiences.length > 0
    ? resume.experiences
    : defaultResume.experiences || [];

  const skillCategories = resume.skill_categories && resume.skill_categories.length > 0
    ? resume.skill_categories
    : defaultResume.skill_categories || [];

  const projects = resume.projects && resume.projects.length > 0
    ? resume.projects
    : defaultResume.projects || [];

  const education = resume.education && resume.education.length > 0
    ? resume.education
    : defaultResume.education || [];

  // Extract clean domain for github/website displays
  const cleanGithubText = (url?: string) => {
    if (!url) return 'github.com/NgoQuoc4';
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  };

  const cleanWebsiteText = (url?: string) => {
    if (!url) return 'ngoquoc.vercel.app';
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  };

  return (
    <div className="min-h-screen bg-canvas text-ink py-12 px-6 md:px-12 print:p-0 print:bg-white print:text-black">
      {/* Top action toolbar (hidden when printing) */}
      <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-1 border border-border text-sm font-medium hover:border-border-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về trang chủ</span>
        </Link>

        <div className="flex items-center gap-3">
          {resume.pdf_url && (
            <a
              href={resume.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 text-pink-500 border border-pink-500/20 text-sm font-semibold hover:bg-pink-500/20 transition-all shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Tải file PDF</span>
            </a>
          )}
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-ink text-surface-1 text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>In / Lưu PDF</span>
          </button>
        </div>
      </div>

      {/* Main Resume Sheet */}
      <main className="max-w-4xl mx-auto bg-surface-1 border border-border rounded-3xl p-8 sm:p-12 shadow-float print:border-none print:shadow-none print:p-0 print:rounded-none">
        {/* Header section */}
        <header className="border-b border-border pb-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {resume.avatar_url ? (
              <Image
                src={resume.avatar_url}
                alt={resume.name || 'Ảnh đại diện'}
                width={96}
                height={96}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-pink-500 shadow-md ring-4 ring-pink-500/10"
                priority
              />
            ) : null}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-ink">
                {resume.name || defaultResume.name}
              </h1>
              <p className="text-pink-500 font-semibold text-lg mt-0.5">
                {resume.title || defaultResume.title}
              </p>
              {resume.location && (
                <div className="flex items-center gap-2 text-xs text-ink-muted mt-1 font-mono">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{resume.location}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 font-mono text-xs sm:text-right w-full sm:w-auto">
            {resume.email && (
              <a
                href={`mailto:${resume.email}`}
                className="inline-flex items-center sm:justify-end gap-2 text-ink hover:text-pink-500 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-pink-500" />
                <span>{resume.email}</span>
              </a>
            )}
            {resume.phone && (
              <a
                href={`tel:${resume.phone}`}
                className="inline-flex items-center sm:justify-end gap-2 text-ink hover:text-pink-500 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-pink-500" />
                <span>{resume.phone}</span>
              </a>
            )}
            {resume.github_url && (
              <a
                href={resume.github_url.startsWith('http') ? resume.github_url : `https://${resume.github_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center sm:justify-end gap-2 text-ink hover:text-pink-500 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-pink-500" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>{cleanGithubText(resume.github_url)}</span>
              </a>
            )}
            {resume.website_url && (
              <a
                href={resume.website_url.startsWith('http') ? resume.website_url : `https://${resume.website_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center sm:justify-end gap-2 text-ink hover:text-pink-500 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-pink-500" />
                <span>{cleanWebsiteText(resume.website_url)}</span>
              </a>
            )}
          </div>
        </header>

        {/* Executive Summary */}
        {(resume.summary_p1 || resume.summary_p2) && (
          <section className="mb-10">
            <h2 className="font-mono text-xs text-pink-500 uppercase tracking-widest font-semibold mb-3">
              {resume.summary_title || 'Tóm tắt chuyên môn'}
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-ink-muted">
              {resume.summary_p1 && <p>{resume.summary_p1}</p>}
              {resume.summary_p2 && <p>{resume.summary_p2}</p>}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {experiences.length > 0 && (
          <section className="mb-10">
            <h2 className="font-mono text-xs text-pink-500 uppercase tracking-widest font-semibold mb-6 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-pink-500" />
              <span>{resume.experiences_title || 'Kinh nghiệm làm việc (Work Experience)'}</span>
            </h2>

            <div className="space-y-6">
              {experiences.map((exp, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-surface-2 border border-border">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <div>
                      <h3 className="font-sans font-bold text-base text-ink">{exp.role}</h3>
                      <p className="text-pink-500 font-mono text-xs font-semibold">{exp.company}</p>
                    </div>
                    {exp.period && (
                      <div className="flex items-center gap-1.5 text-xs text-ink-muted font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.period}</span>
                      </div>
                    )}
                  </div>
                  {Array.isArray(exp.bullets) && exp.bullets.length > 0 && (
                    <ul className="list-disc list-inside text-xs text-ink-muted space-y-1.5 mt-3 leading-relaxed">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technical Skills */}
        {skillCategories.length > 0 && (
          <section className="mb-10">
            <h2 className="font-mono text-xs text-pink-500 uppercase tracking-widest font-semibold mb-4 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-pink-500" />
              <span>{resume.skills_title || 'Kỹ năng kỹ thuật (Technical Skills)'}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              {skillCategories.map((cat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-surface-2 border border-border">
                  <span className="font-bold text-ink block mb-2 font-sans text-sm">{cat.title}</span>
                  <p className="text-ink-muted leading-normal">{cat.skills}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Projects */}
        {projects.length > 0 && (
          <section className="mb-10">
            <h2 className="font-mono text-xs text-pink-500 uppercase tracking-widest font-semibold mb-6">
              {resume.projects_title || 'Dự án tiêu biểu (Featured Projects)'}
            </h2>

            <div className="space-y-6">
              {projects.map((proj, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-surface-2 border border-border">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h3 className="font-sans font-bold text-base text-ink flex items-center gap-2">
                      <span>{proj.title}</span>
                      {proj.category && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-500 border border-pink-500/20">
                          {proj.category}
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center gap-3 text-xs font-mono">
                      {proj.github_link && (
                        <a
                          href={proj.github_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ink-muted hover:text-ink flex items-center gap-1"
                        >
                          GitHub <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {proj.live_demo && (
                        <a
                          href={proj.live_demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-500 hover:underline flex items-center gap-1"
                        >
                          Live Demo <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                  {proj.description && (
                    <p className="text-xs text-ink-muted leading-relaxed mb-3">{proj.description}</p>
                  )}
                  {Array.isArray(proj.tech_stack) && proj.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                      {proj.tech_stack.map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-surface-1 border border-border rounded-md text-ink-muted">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Training */}
        {education.length > 0 && (
          <section className="mb-10">
            <h2 className="font-mono text-xs text-pink-500 uppercase tracking-widest font-semibold mb-6 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-pink-500" />
              <span>{resume.education_title || 'Học vấn & Đào tạo (Education & Training)'}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {education.map((edu, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-surface-2 border border-border">
                  {edu.badge && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-pink-500 bg-pink-500/10 px-2.5 py-0.5 rounded-full font-semibold">
                      {edu.badge}
                    </span>
                  )}
                  <h3 className="font-sans font-bold text-base text-ink mt-2">{edu.title}</h3>
                  {edu.subtitle && (
                    <p className="font-mono text-xs text-ink-muted mt-1">{edu.subtitle}</p>
                  )}
                  {edu.description && (
                    <p className="text-xs text-ink-muted mt-2 leading-relaxed">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer info */}
        <footer className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-ink-muted font-mono gap-2">
          <span>{resume.footer_name || defaultResume.footer_name}</span>
          <span>{resume.footer_updated || defaultResume.footer_updated}</span>
        </footer>
      </main>
    </div>
  );
}
