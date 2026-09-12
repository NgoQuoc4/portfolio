'use client';

import React, { useEffect, useState } from 'react';
import { Preloader } from '@/components/Preloader';
import { CustomCursor } from '@/components/CustomCursor';
import { FloatingDock } from '@/components/FloatingDock';
import { HeroCanvas } from '@/components/HeroCanvas';
import { SelectedWork } from '@/components/SelectedWork';
import { ExperienceSection } from '@/components/ExperienceSection';
import { AboutSection } from '@/components/AboutSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { SmoothScroll } from '@/components/SmoothScroll';
import api from '@/lib/api';
import { defaultProfile, defaultProjects } from '@/lib/defaults';
import type { Profile, ProjectItem } from '@/lib/types';

export default function Home() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [profile, setProfile] = useState<Profile>(defaultProfile);

  useEffect(() => {
    // 1. First hydrate from localStorage for instant customization updates
    try {
      const cachedProfile = localStorage.getItem('portfolio_profile');
      if (cachedProfile) {
        setProfile(JSON.parse(cachedProfile));
      }
      const cachedProjects = localStorage.getItem('portfolio_projects');
      if (cachedProjects) {
        setProjects(JSON.parse(cachedProjects));
      }
    } catch (e) {}

    // 2. Fetch data from NestJS backend with gentle fallback
    const fetchData = async () => {
      try {
        const [projRes, profRes] = await Promise.all([
          api.get('/projects').catch(() => null),
          api.get('/profile').catch(() => null),
        ]);

        if (projRes && projRes.data && projRes.data.length > 0) {
          setProjects(projRes.data);
        }
        if (profRes && profRes.data) {
          setProfile((prev) => ({ ...prev, ...profRes.data } as Profile));
        }
      } catch (err) {
        console.warn('Backend not yet connected, using rich default showcase data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <SmoothScroll>
      <main className="h-dvh overflow-hidden bg-canvas text-ink relative">
        {/* 0. Cinematic Editorial Preloader (Style adikrz.netlify.app) */}
        <Preloader
          label={profile?.preloader_label || `Portfolio · ${profile?.name || 'Ngô Chí Quốc'}`}
          title={profile?.preloader_title || profile?.name || 'NGO CHI QUOC'}
        />

        {/* 1. Custom Interactive Mouse Cursor */}
        <CustomCursor />

        {/* 2. Floating Navigation Dock (Left on Desktop, Bottom on Mobile) */}
        <FloatingDock />

        {/* 3. Page Scroll Container (Smooth scrolling like sara-khalil.pages.dev) */}
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

          {/* Section: Selected Work */}
          <SelectedWork projects={projects} />

          {/* Section: Career & Work Experience */}
          <ExperienceSection />

          {/* Section: About Me */}
          <AboutSection
            about1={profile?.about_text_1}
            about2={profile?.about_text_2}
            skills={profile?.skills}
            brands={profile?.brand_logos}
            avatarUrl={profile?.avatar_url}
          />

          {/* Section: Contact */}
          <ContactSection
            email={profile?.email || 'ngochiquoc140@gmail.com'}
            phone={profile?.phone || '0789898100'}
            calendarLink={profile?.calendar_link}
            headline={profile?.contact_headline}
            githubLink={profile?.social_links?.github || 'https://github.com/NgoQuoc4'}
            linkedinLink={profile?.social_links?.linkedin}
            twitterLink={profile?.social_links?.twitter}
          />

          {/* Section: Portvio-inspired Footer */}
          <Footer
            name={profile?.name || 'Ngô Chí Quốc'}
            title={profile?.title || 'Lập trình viên Full Stack & Front End'}
            email={profile?.email || 'ngochiquoc140@gmail.com'}
            phone={profile?.phone || '0789898100'}
            location={profile?.location || 'Hồ Chí Minh, Việt Nam'}
            githubLink={profile?.social_links?.github || 'https://github.com/NgoQuoc4'}
            linkedinLink={profile?.social_links?.linkedin}
            twitterLink={profile?.social_links?.twitter}
          />
        </div>
      </main>
    </SmoothScroll>
  );
}
