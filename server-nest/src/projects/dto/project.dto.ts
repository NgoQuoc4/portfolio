import { IsString, IsArray, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  image_url?: string;

  @IsArray()
  @IsString({ each: true })
  tech_stack: string[];

  @IsOptional()
  @IsString()
  github_link?: string;

  @IsOptional()
  @IsString()
  live_demo?: string;

  @IsOptional()
  @IsNumber()
  sort_order?: number;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  metrics?: string[];

  @IsOptional()
  @IsString()
  year?: string;

  @IsOptional()
  @IsString()
  brand_logo?: string;

  @IsOptional()
  @IsBoolean()
  hidden?: boolean;
}

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image_url?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tech_stack?: string[];

  @IsOptional()
  @IsString()
  github_link?: string;

  @IsOptional()
  @IsString()
  live_demo?: string;

  @IsOptional()
  @IsNumber()
  sort_order?: number;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  metrics?: string[];

  @IsOptional()
  @IsString()
  year?: string;

  @IsOptional()
  @IsString()
  brand_logo?: string;

  @IsOptional()
  @IsBoolean()
  hidden?: boolean;
}
