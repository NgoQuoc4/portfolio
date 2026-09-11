import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import { UpdateProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  async getProfile() {
    let profile = await this.profileModel.findOne().exec();
    if (!profile) {
      // Cung cấp dữ liệu mặc định phong cách hiện đại nếu chưa tạo
      profile = await this.profileModel.create({
        name: 'Ngô Chí Quốc',
        title: 'Front End Developer',
        headline: 'I turn ambiguity into clear product direction & ship what matters with AI.',
        avatar_url: 'https://res.cloudinary.com/dguad3xyf/image/upload/v1776242078/MeUJ0ogEM8MjZvYWfSb9_665822b791856_cvtpl_yljpfv.jpg',
        location: 'Hồ Chí Minh',
        email: 'ngochiquoc140@gmail.com',
        phone: '0789898100',
        about_text_1: 'Là một nhà phát triển Full Stack tận tâm, luôn cam kết mang lại kết quả tốt nhất, tôi sở hữu kỹ năng nâng cao trong việc triển khai các công nghệ tiên tiến như ReactJS, NextJS, NestJS, ExpressJS. Tôi chuyên xây dựng các sản phẩm chất lượng cao, hướng đến người dùng và chuyển đổi các thiết kế thành trải nghiệm kỹ thuật số liền mạch.',
        about_text_2: 'Ngoài Full Stack, tôi còn có chuyên môn vững chắc về Vanilla JavaScript, Liquid (Shopify) và Handlebars (BigCommerce), cho phép tôi phát triển và tùy chỉnh các nền tảng thương mại điện tử một cách hiệu quả, tối ưu hóa hiệu suất và tạo ra các giải pháp front-end linh hoạt, có khả năng mở rộng.',
        skills: [
          'ReactJS',
          'NextJS',
          'TypeScript',
          'NestJS',
          'NodeJS',
          'ExpressJS',
          'Prisma ORM',
          'MongoDB',
          'MySQL',
          'TailwindCSS',
          'Redux Toolkit',
          'TanStack React Query',
          'Ant Design',
          'Zod',
          'RESTful APIs',
          'JWT',
        ],
        calendar_link: 'https://calendar.google.com',
        resume_link: '/resume',
        social_links: {
          github: 'https://github.com/NgoQuoc4',
          linkedin: 'https://linkedin.com',
          twitter: 'https://x.com',
          figma: 'https://figma.com',
        },
        brand_logos: [
          { name: 'React', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
          { name: 'Next.js', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
          { name: 'NestJS', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg' },
          { name: 'TypeScript', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
          { name: 'Node.js', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
          { name: 'TailwindCSS', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
          { name: 'Prisma ORM', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg' },
          { name: 'MySQL', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
          { name: 'MongoDB', logo_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        ],
      });
    }
    return profile;
  }

  async updateProfile(dto: UpdateProfileDto) {
    let profile = await this.profileModel.findOne().exec();
    if (profile) {
      Object.assign(profile, dto);
      return profile.save();
    } else {
      return this.profileModel.create(dto);
    }
  }
}
