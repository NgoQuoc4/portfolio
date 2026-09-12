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
  about_text_1?: string;
  about_text_2?: string;
  skills?: string[];
  calendar_link?: string;
  resume_link?: string;
  contact_headline?: string;
  preloader_title?: string;
  preloader_label?: string;
  social_links?: SocialLinks;
  brand_logos?: BrandItem[];
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
