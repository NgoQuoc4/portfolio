import { IsString, IsOptional, IsArray, IsObject } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  avatar_url?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  about_text_1?: string;

  @IsOptional()
  @IsString()
  about_text_2?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @IsOptional()
  @IsString()
  headline?: string;

  @IsOptional()
  @IsString()
  hero_status?: string;

  @IsOptional()
  @IsString()
  hero_sub_text?: string;

  @IsOptional()
  @IsString()
  about_subtitle?: string;

  @IsOptional()
  @IsString()
  about_headline?: string;

  @IsOptional()
  @IsString()
  work_subtitle?: string;

  @IsOptional()
  @IsString()
  work_headline?: string;

  @IsOptional()
  @IsString()
  experience_subtitle?: string;

  @IsOptional()
  @IsString()
  experience_headline?: string;

  @IsOptional()
  @IsString()
  experience_description?: string;

  @IsOptional()
  @IsString()
  contact_subtitle?: string;

  @IsOptional()
  @IsString()
  contact_headline?: string;

  @IsOptional()
  @IsString()
  contact_sub_text?: string;

  @IsOptional()
  @IsString()
  contact_status?: string;

  @IsOptional()
  @IsString()
  preloader_title?: string;

  @IsOptional()
  @IsString()
  preloader_label?: string;

  @IsOptional()
  @IsString()
  footer_brand_text?: string;

  @IsOptional()
  @IsString()
  footer_copyright?: string;

  @IsOptional()
  @IsString()
  footer_status?: string;

  @IsOptional()
  @IsString()
  calendar_link?: string;

  @IsOptional()
  @IsString()
  resume_link?: string;

  @IsOptional()
  @IsObject()
  social_links?: Record<string, string>;

  @IsOptional()
  @IsArray()
  brand_logos?: { name: string; logo_url: string }[];

  @IsOptional()
  @IsObject()
  resume_data?: Record<string, any>;
}
