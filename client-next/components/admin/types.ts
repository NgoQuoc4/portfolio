import React from 'react';

export type AdminTabId =
  | 'hero'
  | 'about'
  | 'projects'
  | 'experience'
  | 'contact'
  | 'footer'
  | 'freelance'
  | 'resume'
  | 'media'
  | 'messages';

export type PageFilterId = 'all' | 'home' | 'freelance' | 'resume' | 'system';

export interface NavItem {
  id: AdminTabId;
  label: string;
  icon: React.ElementType;
  desc: string;
  pageId: 'home' | 'freelance' | 'resume' | 'system';
  pageName: string;
  pagePath: string;
  count?: number;
  badge?: string;
}

export interface PageSectionGroup {
  id: 'home' | 'freelance' | 'resume' | 'system';
  title: string;
  path: string;
  badge: string;
  description: string;
  items: NavItem[];
}

export interface MediaResource {
  asset_id: string;
  public_id: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  created_at: string;
  folder?: string;
  url?: string;
  resource_type?: string;
  type?: string;
  version?: number;
}
