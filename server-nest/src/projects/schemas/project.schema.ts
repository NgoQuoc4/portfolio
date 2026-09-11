import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  image_url: string;

  @Prop({ type: [String], required: true, default: [] })
  tech_stack: string[];

  @Prop({ required: false })
  github_link: string;

  @Prop({ required: false })
  live_demo: string;

  @Prop({ default: 0 })
  sort_order: number;

  @Prop({ default: '0 → 1' })
  category: string;

  @Prop({ type: [String], default: [] })
  metrics: string[];

  @Prop({ required: false })
  year: string;

  @Prop({ required: false })
  brand_logo: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
