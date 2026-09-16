import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema({ timestamps: true })
export class Profile {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  avatar_url: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  about_text_1: string;

  @Prop({ required: false })
  about_text_2: string;

  @Prop({ type: [String], default: [] })
  skills: string[];

  @Prop({ required: false })
  headline: string;

  @Prop({ required: false })
  hero_status: string;

  @Prop({ required: false })
  hero_sub_text: string;

  @Prop({ required: false })
  about_subtitle: string;

  @Prop({ required: false })
  about_headline: string;

  @Prop({ required: false })
  work_subtitle: string;

  @Prop({ required: false })
  work_headline: string;

  @Prop({ required: false })
  experience_subtitle: string;

  @Prop({ required: false })
  experience_headline: string;

  @Prop({ required: false })
  experience_description: string;

  @Prop({ required: false })
  contact_subtitle: string;

  @Prop({ required: false })
  contact_headline: string;

  @Prop({ required: false })
  contact_sub_text: string;

  @Prop({ required: false })
  contact_status: string;

  @Prop({ required: false })
  preloader_title: string;

  @Prop({ required: false })
  preloader_label: string;

  @Prop({ required: false })
  footer_brand_text: string;

  @Prop({ required: false })
  footer_copyright: string;

  @Prop({ required: false })
  footer_status: string;

  @Prop({ required: false })
  calendar_link: string;

  @Prop({ required: false })
  resume_link: string;

  @Prop({ type: Object, default: {} })
  social_links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    figma?: string;
  };

  @Prop({ type: [Object], default: [] })
  brand_logos: {
    name: string;
    logo_url: string;
  }[];

  @Prop({ type: Object, default: {} })
  resume_data: Record<string, any>;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
