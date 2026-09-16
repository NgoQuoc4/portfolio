// Shared TypeScript types for portfolio project

export interface BrandItem {
  name: string;
  logo_url: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  figma?: string;
}

export interface Profile {
  _id?: string;
  name: string;
  title?: string;
  headline?: string;
  hero_status?: string;
  hero_sub_text?: string;
  avatar_url?: string;
  location?: string;
  email?: string;
  phone?: string;
  about_subtitle?: string;
  about_headline?: string;
  about_text_1?: string;
  about_text_2?: string;
  skills?: string[];

  work_subtitle?: string;
  work_headline?: string;
  show_projects?: boolean;
  show_freelance_jobs?: boolean;

  experience_subtitle?: string;
  experience_headline?: string;
  experience_description?: string;

  contact_subtitle?: string;
  contact_headline?: string;
  contact_sub_text?: string;
  contact_status?: string;
  calendar_link?: string;
  resume_link?: string;

  preloader_title?: string;
  preloader_label?: string;
  footer_brand_text?: string;
  footer_copyright?: string;
  footer_status?: string;

  social_links?: SocialLinks;
  brand_logos?: BrandItem[];
  resume_data?: ResumeData;
}

export interface ProjectItem {
  _id?: string;
  title: string;
  description: string;
  image_url?: string;
  tech_stack: string[];
  github_link?: string;
  live_demo?: string;
  category?: string;
  metrics?: string[];
  year?: string;
  brand_logo?: string;
  hidden?: boolean;
}

export interface Message {
  _id?: string;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
}

export interface FreelanceJob {
  _id?: string;
  title: string;
  client_name: string;
  client_avatar?: string;
  role: string;
  timeline: string;
  category: string;
  scope: string;
  deliverables: string[];
  tech_stack: string[];
  metrics: string;
  testimonial?: {
    quote: string;
    author: string;
    author_role?: string;
    rating: number;
  };
  image_url?: string;
  live_demo?: string;
  status?: 'completed' | 'ongoing';
  featured?: boolean;
}

export interface ExperienceItem {
  _id?: string;
  company: string;
  company_logo?: string;
  role: string;
  period: string;
  location?: string;
  type?: string;
  description: string;
  achievements: string[];
  tech_stack: string[];
}

// Resume Page Types
export interface ResumeSkillCategory {
  title: string;
  skills: string;
}

export interface ResumeProjectItem {
  title: string;
  category: string;
  live_demo?: string;
  github_link?: string;
  description: string;
  tech_stack: string[];
  hidden?: boolean;
}

export interface ResumeEducationItem {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface ResumeExperienceItem {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  hidden?: boolean;
}

export interface ResumeData {
  name?: string;
  title?: string;
  avatar_url?: string;
  location?: string;
  email?: string;
  phone?: string;
  github_url?: string;
  website_url?: string;
  pdf_url?: string;
  summary_title?: string;
  summary_p1?: string;
  summary_p2?: string;
  experiences_title?: string;
  experiences?: ResumeExperienceItem[];
  show_experiences?: boolean;
  skills_title?: string;
  skill_categories?: ResumeSkillCategory[];
  projects_title?: string;
  projects?: ResumeProjectItem[];
  show_projects?: boolean;
  education_title?: string;
  education?: ResumeEducationItem[];
  footer_name?: string;
  footer_updated?: string;
}
