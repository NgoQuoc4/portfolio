// Single source of truth for all default/fallback data
import type { Profile, ProjectItem } from './types';

export const defaultProfile: Profile = {
  name: 'Ngô Chí Quốc',
  title: 'Lập trình viên Full Stack & Front End',
  headline: 'Tôi biến sự mơ hồ thành định hướng sản phẩm rõ ràng & tạo ra giá trị với AI.',
  hero_status: 'Sẵn sàng hợp tác cho các dự án & cơ hội mới',
  hero_sub_text:
    "Xin chào, tôi là Ngô Chí Quốc. Lập trình viên Full Stack & Front End chuyên sâu về ReactJS, Next.js, NestJS, tập trung xây dựng các ứng dụng web hiệu năng cao, tối ưu trải nghiệm người dùng.",
  avatar_url:
    'https://res.cloudinary.com/dguad3xyf/image/upload/v1776242078/MeUJ0ogEM8MjZvYWfSb9_665822b791856_cvtpl_yljpfv.jpg',
  location: 'Hồ Chí Minh, Việt Nam',
  email: 'ngochiquoc140@gmail.com',
  phone: '0789898100',
  about_text_1:
    'Là một nhà phát triển Full Stack tận tâm, luôn cam kết mang lại kết quả tốt nhất, tôi sở hữu kỹ năng nâng cao trong việc triển khai các công nghệ tiên tiến như ReactJS, NextJS, NestJS, ExpressJS. Tôi chuyên xây dựng các sản phẩm chất lượng cao, hướng đến người dùng và chuyển đổi các thiết kế thành trải nghiệm kỹ thuật số liền mạch.',
  about_text_2:
    'Ngoài Full Stack, tôi còn có chuyên môn vững chắc về Vanilla JavaScript, Liquid (Shopify) và Handlebars (BigCommerce), cho phép tôi phát triển và tùy chỉnh các nền tảng thương mại điện tử một cách hiệu quả, tối ưu hóa hiệu suất và tạo ra các giải pháp front-end linh hoạt, có khả năng mở rộng.',
  skills: [
    'ReactJS', 'NextJS', 'TypeScript', 'NestJS', 'NodeJS', 'ExpressJS',
    'Prisma ORM', 'MongoDB', 'MySQL', 'TailwindCSS', 'Redux Toolkit',
    'TanStack React Query', 'Ant Design', 'Zod', 'RESTful APIs', 'JWT',
  ],
  calendar_link: 'https://calendar.google.com',
  resume_link: '/resume',
  contact_headline: 'Cùng nhau xây dựng sản phẩm chất lượng & bền vững',
  preloader_title: 'NGO CHI QUOC',
  preloader_label: 'Hồ sơ năng lực · Ngô Chí Quốc',
  social_links: {
    github: 'https://github.com/NgoQuoc4',
    linkedin: 'https://linkedin.com',
    twitter: '',
    figma: '',
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
};

export const defaultProjects: ProjectItem[] = [
  {
    _id: '1',
    title: 'Trang Sakia Online',
    description:
      'Nền tảng đăng ký khóa học, quản lý lịch sử đơn hàng và tương tác với nội dung khóa học trực tuyến, tích hợp bảng quản trị (Admin Dashboard) tùy chỉnh toàn diện.',
    image_url:
      'https://res.cloudinary.com/dguad3xyf/image/upload/v1786779310/premium_photo-1661290231745-15f1ed6fea88_gcrnme.avif',
    tech_stack: ['Next.js', 'NestJS', 'TypeScript', 'Prisma ORM', 'MySQL', 'Tailwind CSS', 'Ant Design', 'JWT'],
    category: '0 → 1',
    year: '2026',
    brand_logo: 'Sakia Online',
    metrics: ['Hệ thống đăng ký & học trực tuyến', 'Admin Dashboard quản lý toàn diện', 'Bảo mật JWT & RESTful APIs'],
    live_demo: 'http://trangsakiaonline.com/',
  },
  {
    _id: '2',
    title: 'Recipe-Cookbook (Sổ tay ẩm thực AI)',
    description:
      'Nền tảng sổ tay công thức nấu ăn trực tuyến toàn diện cho phép người dùng tạo, quản lý, tìm kiếm công thức, thiết kế tối ưu với Cooking Mode và tích hợp AI gợi ý công thức thông minh.',
    image_url:
      'https://res.cloudinary.com/dguad3xyf/image/upload/v1777965113/21f8ebd4-9547-4110-b704-99130b7090dd_xumnav.jpg',
    tech_stack: ['ReactJS', 'TypeScript', 'Vite', 'Node.js', 'Express.js', 'PostgreSQL', 'TanStack Query', 'TailwindCSS', 'Zod'],
    category: '0 → 1',
    year: '2026',
    brand_logo: 'Cookbook AI',
    metrics: ['Tích hợp AI gợi ý món ăn thông minh', 'Chế độ Cooking Mode tương tác thực tế', 'Tìm kiếm & lọc công thức chuẩn xác'],
    live_demo: 'https://recipe-cookbook-phi.vercel.app/',
    github_link: 'https://github.com/NgoQuoc4/Recipe-Cookbook',
  },
  {
    _id: '3',
    title: 'CDF Course',
    description:
      'Nền tảng đăng ký khóa học công nghệ, quản lý lịch sử đơn hàng và blog giáo dục tương tác, tích hợp hệ thống quản trị nội dung linh hoạt.',
    image_url:
      'https://res.cloudinary.com/dguad3xyf/image/upload/v1776339617/6c4e14b5-73c4-4445-9d40-e86d3fae4254_oyzud9.jpg',
    tech_stack: ['ReactJS', 'TypeScript', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'Redux Toolkit', 'Cloudinary'],
    category: 'Tăng trưởng',
    year: '2026',
    brand_logo: 'CDF Education',
    metrics: ['Giao diện mượt mà với Vite & Redux Toolkit', 'Hệ thống blog giáo dục tương tác', 'Quản lý đơn hàng & người dùng'],
    live_demo: 'https://course-main-seven.vercel.app/',
    github_link: 'https://github.com/NgoQuoc4/course_main',
  },
  {
    _id: '4',
    title: 'CFD Shop Ecommerce',
    description:
      'Hệ thống bán hàng thương mại điện tử trực tuyến hiện đại với tối ưu hóa giỏ hàng, quy trình thanh toán nhanh chóng và giao diện phản hồi mượt mà.',
    image_url:
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
    tech_stack: ['ReactJS', 'Vite', 'TanStack React Query', 'Axios', 'TailwindCSS'],
    category: 'Tăng trưởng',
    year: '2026',
    brand_logo: 'CFD Shop',
    metrics: ['Tối ưu hóa luồng checkout & giỏ hàng', 'Cơ chế cache thông minh với TanStack Query', 'Giao diện tương thích đa thiết bị'],
    live_demo: 'https://cfdshop-eosin.vercel.app/',
    github_link: 'https://github.com/NgoQuoc4/cfdshop',
  },
];
