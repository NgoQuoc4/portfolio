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
}
