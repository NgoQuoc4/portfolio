'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Preloader } from '@/components/Preloader';
import { CustomCursor } from '@/components/CustomCursor';
import { FloatingDock } from '@/components/FloatingDock';
import { AboutSection } from '@/components/AboutSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { SmoothScroll } from '@/components/SmoothScroll';
import { defaultProfile, defaultProjects } from '@/lib/defaults';
import type { Profile, ProjectItem } from '@/lib/types';

import { HeroCanvas } from '@/components/HeroCanvas';

// Lazy load below-the-fold components to reduce initial JS payload
const SelectedWork = dynamic(() => import('@/components/SelectedWork').then(m => ({ default: m.SelectedWork })));
const ExperienceSection = dynamic(() => import('@/components/ExperienceSection').then(m => ({ default: m.ExperienceSection })));

export default function Home() {
  const [projects, setProjects] = useState<ProjectItem[]>(defaultProjects);
  const [profile, setProfile] = useState<Profile>(defaultProfile);

  useEffect(() => {
    // Hydrate from localStorage for instant customization updates
    try {
      const cachedProfile = localStorage.getItem('portfolio_profile');
      if (cachedProfile) setProfile(JSON.parse(cachedProfile));

      const cachedProjects = localStorage.getItem('portfolio_projects');
      if (cachedProjects) setProjects(JSON.parse(cachedProjects));
    } catch (e) {}
  }, []);

  return (
    <SmoothScroll>
      <main className="h-dvh overflow-hidden bg-canvas text-ink relative">
        {/* 0. Cinematic Editorial Preloader */}
        <Preloader
          label={profile?.preloader_label || `Portfolio · ${profile?.name || 'Ngô Chí Quốc'}`}
          title={profile?.preloader_title || profile?.name || 'NGO CHI QUOC'}
        />

        {/* 1. Custom Interactive Mouse Cursor */}
        <CustomCursor />

        {/* 2. Floating Navigation Dock */}
        <FloatingDock />

        {/* 3. Page Scroll Container */}
        <div
          id="page-scroll"
          className="h-dvh overflow-y-scroll [&::-webkit-scrollbar]:hidden"
          style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none' }}
        >
          {/* Section: Hero Digital Desk */}
          <HeroCanvas
            profileName={profile?.name || 'Ngô Chí Quốc'}
            avatarUrl={profile?.avatar_url}
            headline={profile?.headline || 'Tôi biến sự mơ hồ thành định hướng sản phẩm rõ ràng & tạo ra giá trị với AI.'}
            subIntro={profile?.hero_sub_text}
            statusText={profile?.hero_status || 'Sẵn sàng hợp tác cho các dự án & cơ hội mới'}
            titleRole={profile?.title || 'Lập trình viên Full Stack & Front End'}
          />

          {/* Section: About Me */}
          <AboutSection
            name={profile?.name}
            title={profile?.title}
            location={profile?.location}
            aboutSubtitle={profile?.about_subtitle}
            aboutHeadline={profile?.about_headline}
            about1={profile?.about_text_1}
            about2={profile?.about_text_2}
            skills={profile?.skills}
            brands={profile?.brand_logos}
            avatarUrl={profile?.avatar_url}
          />

          {/* Section: Selected Work */}
          <SelectedWork
            projects={projects}
            sectionSubtitle={profile?.work_subtitle}
            sectionHeadline={profile?.work_headline}
          />

          {/* Section: Career & Work Experience */}
          <ExperienceSection
            sectionSubtitle={profile?.experience_subtitle}
            sectionHeadline={profile?.experience_headline}
            sectionDescription={profile?.experience_description}
          />

          {/* Section: Contact */}
          <ContactSection
            email={profile?.email || 'ngochiquoc140@gmail.com'}
            phone={profile?.phone || '0789898100'}
            calendarLink={profile?.calendar_link}
            sectionSubtitle={profile?.contact_subtitle}
            headline={profile?.contact_headline}
            description={profile?.contact_sub_text}
            statusText={profile?.contact_status}
            githubLink={profile?.social_links?.github || 'https://github.com/NgoQuoc4'}
            linkedinLink={profile?.social_links?.linkedin}
            twitterLink={profile?.social_links?.twitter}
          />

          {/* Section: Footer */}
          <Footer
            name={profile?.name || 'Ngô Chí Quốc'}
            title={profile?.title || 'Lập trình viên Full Stack & Front End'}
            email={profile?.email || 'ngochiquoc140@gmail.com'}
            phone={profile?.phone || '0789898100'}
            location={profile?.location || 'Hồ Chí Minh, Việt Nam'}
            footerBrandText={profile?.footer_brand_text}
            copyrightText={profile?.footer_copyright}
            footerStatus={profile?.footer_status}
            githubLink={profile?.social_links?.github || 'https://github.com/NgoQuoc4'}
            linkedinLink={profile?.social_links?.linkedin}
            twitterLink={profile?.social_links?.twitter}
          />
        </div>
      </main>
    </SmoothScroll>
  );
}
