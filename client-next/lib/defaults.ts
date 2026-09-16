import type { Profile, ProjectItem, FreelanceJob, ExperienceItem, ResumeData } from './types';

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
  about_subtitle: 'Về Lập Trình Viên',
  about_headline: 'Kỹ thuật chuẩn xác, tập trung vào trải nghiệm thực tế.',
  about_text_1:
    'Là một nhà phát triển Full Stack tận tâm, luôn cam kết mang lại kết quả tốt nhất, tôi sở hữu kỹ năng nâng cao trong việc triển khai các công nghệ tiên tiến như ReactJS, NextJS, NestJS, ExpressJS. Tôi chuyên xây dựng các sản phẩm chất lượng cao, hướng đến người dùng và chuyển đổi các thiết kế thành trải nghiệm kỹ thuật số liền mạch.',
  about_text_2:
    'Ngoài Full Stack, tôi còn có chuyên môn vững chắc về Vanilla JavaScript, Liquid (Shopify) và Handlebars (BigCommerce), cho phép tôi phát triển và tùy chỉnh các nền tảng thương mại điện tử một cách hiệu quả, tối ưu hóa hiệu suất và tạo ra các giải pháp front-end linh hoạt, có khả năng mở rộng.',
  skills: [
    'ReactJS', 'NextJS', 'TypeScript', 'NestJS', 'NodeJS', 'ExpressJS',
    'Prisma ORM', 'MongoDB', 'MySQL', 'TailwindCSS', 'Redux Toolkit',
    'TanStack React Query', 'Ant Design', 'Zod', 'RESTful APIs', 'JWT',
  ],

  work_subtitle: 'Dự Án Chọn Lọc',
  work_headline: 'Các sản phẩm đã phát triển',
  show_projects: true,
  show_freelance_jobs: true,
  project_categories: ['0 → 1', 'Tăng trưởng', 'Nghiên cứu'],

  experience_subtitle: 'HÀNH TRÌNH SỰ NGHIỆP',
  experience_headline: 'Kinh Nghiệm Làm Việc & Dấu Ấn Chuyên Môn',
  experience_description:
    'Các vị trí và môi trường thực tế tôi đã cống hiến: từ agency thương mại điện tử, công ty công nghệ đến các dự án độc lập chất lượng cao.',

  contact_subtitle: 'Liên Hệ',
  contact_headline: 'Cùng nhau xây dựng sản phẩm chất lượng & bền vững',
  contact_sub_text:
    'Bạn đang có ý tưởng mới, cần tư vấn giải pháp kỹ thuật tối ưu hay tìm kiếm một lập trình viên Full Stack tận tâm? Hãy kết nối với tôi qua các kênh bên dưới.',
  contact_status: 'Sẵn sàng hợp tác cho các vị trí, dự án mới & cơ hội kết nối.',
  calendar_link: 'https://calendar.google.com',
  resume_link: '/resume',

  preloader_title: 'NGO CHI QUOC',
  preloader_label: 'Hồ sơ năng lực · Ngô Chí Quốc',
  footer_brand_text: 'NGO CHI QUOC',
  footer_copyright: '© 2026 Ngô Chí Quốc. Bảo lưu mọi quyền.',
  footer_status: 'Làm việc toàn cầu / Remote',
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
      'https://images.unsplash.com/photo-1661956602944-249bcd04b63f?w=800&q=80',
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

export const defaultFreelanceJobs: FreelanceJob[] = [
  {
    _id: 'job-1',
    title: 'Nền tảng E-Learning & Thanh toán Trực tuyến Sakia',
    client_name: 'Sakia Edu Group (Doanh nghiệp EdTech)',
    role: 'Full Stack Web Developer',
    timeline: '1.5 tháng (Hoàn thành trước hạn 5 ngày)',
    category: 'Web App & EdTech',
    scope: 'Xây dựng trọn gói hệ thống đăng ký khóa học, tích hợp cổng thanh toán trực tuyến và CMS quản trị học viên.',
    deliverables: [
      'Giao diện học viên responsive đa thiết bị',
      'Hệ thống xem video bài giảng chống tải lậu',
      'Dashboard quản trị doanh thu & đơn hàng cho admin',
      'Tích hợp xác thực JWT bảo mật 2 lớp',
    ],
    tech_stack: ['Next.js 14', 'NestJS', 'TypeScript', 'MySQL', 'Prisma', 'TailwindCSS'],
    metrics: 'Tăng 140% lượt đăng ký học trực tuyến trong tháng đầu tiên ra mắt, điểm PageSpeed đạt 98/100.',
    testimonial: {
      quote: 'Quốc làm việc cực kỳ chuyên nghiệp và kỷ luật. Giải pháp kiến trúc bạn đưa ra rất tối ưu, bàn giao sớm hơn thỏa thuận ban đầu và hỗ trợ kỹ thuật nhiệt tình sau khi go-live.',
      author: 'Anh Nguyễn Minh Tuấn',
      author_role: 'Founder & Giám đốc Điều hành Sakia Edu',
      rating: 5,
    },
    image_url: 'https://res.cloudinary.com/dguad3xyf/image/upload/v1786779310/premium_photo-1661290231745-15f1ed6fea88_gcrnme.avif',
    live_demo: 'http://trangsakiaonline.com/',
    status: 'completed',
    featured: true,
  },
  {
    _id: 'job-2',
    title: 'Hệ thống Đặt món & Sổ tay Công thức AI Thông minh',
    client_name: 'Gourmet Lab Studio (Singapore)',
    role: 'Lead Frontend Developer',
    timeline: '3 tuần',
    category: 'SaaS & AI Solution',
    scope: 'Phát triển giao diện tương tác cao hỗ trợ Cooking Mode rảnh tay và gợi ý thực đơn bằng OpenAI API.',
    deliverables: [
      'Chế độ Cooking Mode toàn màn hình với bộ đếm giờ thông minh',
      'Giao diện tìm kiếm tức thì theo nguyên liệu có sẵn trong tủ lạnh',
      'Tích hợp AI Prompting tối ưu chi phí token',
      'Hệ thống quản lý trạng thái mượt mà không re-render dư thừa',
    ],
    tech_stack: ['React 18', 'TypeScript', 'Vite', 'TanStack Query', 'TailwindCSS', 'OpenAI API'],
    metrics: 'Thời gian tương tác trung bình của người dùng tăng gấp 2.8 lần so với ứng dụng cũ.',
    testimonial: {
      quote: 'Excellent frontend execution! Quoc delivered clean, modular code with exceptional attention to UI micro-interactions. Will definitely hire him again for future frontend modules.',
      author: 'David Tan',
      author_role: 'Product Lead @ Gourmet Lab',
      rating: 5,
    },
    image_url: 'https://res.cloudinary.com/dguad3xyf/image/upload/v1777965113/21f8ebd4-9547-4110-b704-99130b7090dd_xumnav.jpg',
    live_demo: 'https://recipe-cookbook-phi.vercel.app/',
    status: 'completed',
    featured: true,
  },
  {
    _id: 'job-3',
    title: 'Tối ưu hóa Hiệu năng & Tái cấu trúc Frontend CDF Course',
    client_name: 'Trung tâm Đào tạo Công nghệ CDF',
    role: 'Performance Optimization & Frontend Specialist',
    timeline: '2 tuần',
    category: 'Tối ưu hóa & Performance',
    scope: 'Kiểm toán Core Web Vitals, tối ưu bundle JavaScript, nén tài nguyên hình ảnh và chuẩn hóa SEO.',
    deliverables: [
      'Giảm 68% kích thước bundle ban đầu bằng code-splitting',
      'Tối ưu LCP từ 4.8s xuống còn 1.1s trên mạng di động 4G',
      'Cấu hình lazy loading thông minh cho danh sách khóa học',
      'Bổ sung Schema.org và sitemap tự động phục vụ SEO',
    ],
    tech_stack: ['ReactJS', 'Vite', 'Redux Toolkit', 'Cloudinary CDN', 'Web Vitals'],
    metrics: 'Điểm Lighthouse Performance trên Mobile tăng từ 43 lên 96 điểm. Tỉ lệ bounce rate giảm 32%.',
    testimonial: {
      quote: 'Website chạy nhanh như bay sau khi bạn Quốc tối ưu. Học viên không còn phàn nàn về tình trạng giật lag khi tải video hay xem chi tiết khóa học nữa.',
      author: 'Chị Hoàng Thảo My',
      author_role: 'Quản lý Đào tạo & Vận hành CDF',
      rating: 5,
    },
    image_url: 'https://res.cloudinary.com/dguad3xyf/image/upload/v1776339617/6c4e14b5-73c4-4445-9d40-e86d3fae4254_oyzud9.jpg',
    live_demo: 'https://course-main-seven.vercel.app/',
    status: 'completed',
    featured: true,
  },
];

export const defaultExperiences: ExperienceItem[] = [
  {
    _id: 'exp-1',
    company: 'Freelance & Independent Software Projects',
    role: 'Senior Full Stack & Front End Developer',
    period: '2023 — Hiện tại',
    location: 'TP. Hồ Chí Minh & Remote',
    type: 'Full-time / Freelance',
    description: 'Chịu trách nhiệm kiến trúc kỹ thuật và trực tiếp phát triển các ứng dụng web tương tác cao cho các đối tác startups, trung tâm đào tạo và giải pháp SaaS.',
    achievements: [
      'Thiết kế kiến trúc và phát triển full-stack các web app với React 18, Next.js App Router, TypeScript và NestJS.',
      'Chuẩn hóa hệ thống RESTful API, hệ thống bảo mật JWT Authentication, kết nối Prisma ORM với MySQL/PostgreSQL/MongoDB.',
      'Tối ưu hóa hiệu năng render và caching (TanStack Query, Next.js Cache), đạt 95+ PageSpeed và Lighthouse.',
      'Tích hợp các giải pháp AI (OpenAI API) vào sản phẩm thực tế, mang lại trải nghiệm thông minh cho người dùng.',
    ],
    tech_stack: ['ReactJS', 'Next.js', 'TypeScript', 'NestJS', 'Prisma ORM', 'TailwindCSS', 'PostgreSQL'],
  },
  {
    _id: 'exp-2',
    company: 'E-Commerce & Digital Commerce Agency',
    role: 'Front End & E-Commerce Developer',
    period: '2022 — 2023',
    location: 'TP. Hồ Chí Minh',
    type: 'Full-time',
    description: 'Chuyên sâu phát triển và tùy biến giao diện thương mại điện tử chuyên nghiệp cho các thương hiệu trên nền tảng Shopify và BigCommerce.',
    achievements: [
      'Tùy biến theme chuyên sâu sử dụng Liquid (Shopify) và Handlebars (BigCommerce) đáp ứng 100% bản vẽ Figma.',
      'Xây dựng luồng giỏ hàng động (Dynamic Cart Drawer, Upsell/Cross-sell) giúp tăng 28% giá trị đơn hàng trung bình.',
      'Tối ưu Core Web Vitals, tối thiểu hóa JavaScript dư thừa và tăng tốc độ tải trang trên thiết bị di động.',
      'Tích hợp các cổng thanh toán và đối tác vận chuyển phổ biến đảm bảo giao dịch mượt mà, bảo mật.',
    ],
    tech_stack: ['JavaScript (ES6+)', 'Liquid (Shopify)', 'Handlebars', 'HTML5/SCSS', 'REST APIs', 'Webpack'],
  },
  {
    _id: 'exp-3',
    company: 'Software Solutions & Web Development Lab',
    role: 'Junior Web Developer / Intern',
    period: '2021 — 2022',
    location: 'TP. Hồ Chí Minh',
    type: 'Full-time',
    description: 'Tham gia phát triển các module giao diện người dùng, xây dựng landing page doanh nghiệp và bảo trì hệ thống web nội bộ.',
    achievements: [
      'Phát triển các component giao diện người dùng tái sử dụng được bằng ReactJS và Bootstrap/TailwindCSS.',
      'Phối hợp cùng Backend team tích hợp các RESTful APIs xử lý dữ liệu biểu mẫu và xác thực người dùng.',
      'Tham gia viết unit test cơ bản, rà soát code và khắc phục lỗi hiển thị trên đa trình duyệt (cross-browser).',
    ],
    tech_stack: ['ReactJS', 'JavaScript', 'HTML5/CSS3', 'Git', 'Bootstrap', 'Node.js'],
  },
];

export const defaultResume: ResumeData = {
  name: 'Ngô Chí Quốc',
  title: 'Lập trình viên Full Stack & Front End',
  avatar_url: 'https://res.cloudinary.com/dguad3xyf/image/upload/v1776242078/MeUJ0ogEM8MjZvYWfSb9_665822b791856_cvtpl_yljpfv.jpg',
  location: 'TP. Hồ Chí Minh, Việt Nam',
  email: 'ngochiquoc140@gmail.com',
  phone: '0789898100',
  github_url: 'https://github.com/NgoQuoc4',
  website_url: 'https://ngoquoc.vercel.app',
  pdf_url: '',
  summary_title: 'Tóm tắt chuyên môn',
  summary_p1:
    'Là một nhà phát triển Full Stack tận tâm, luôn cam kết mang lại kết quả tốt nhất, tôi sở hữu kỹ năng nâng cao trong việc triển khai các công nghệ tiên tiến như ReactJS, NextJS, NestJS, ExpressJS. Tôi chuyên xây dựng các sản phẩm chất lượng cao, hướng đến người dùng và chuyển đổi các thiết kế thành trải nghiệm kỹ thuật số liền mạch.',
  summary_p2:
    'Ngoài Full Stack, tôi còn có chuyên môn vững chắc về Vanilla JavaScript, Liquid (Shopify) và Handlebars (BigCommerce), cho phép tôi phát triển và tùy chỉnh các nền tảng thương mại điện tử một cách hiệu quả, tối ưu hóa hiệu suất và tạo ra các giải pháp front-end linh hoạt, có khả năng mở rộng.',
  experiences_title: 'Kinh nghiệm làm việc (Work Experience)',
  show_experiences: true,
  experiences: [
    {
      role: 'Lập trình viên Full Stack & Front End',
      company: 'Freelance & Dự án Độc lập',
      period: '2023 — Hiện tại',
      bullets: [
        'Thiết kế kiến trúc và trực tiếp phát triển các ứng dụng web phức tạp với ReactJS, Next.js (App Router), TypeScript, NestJS và TailwindCSS.',
        'Thiết kế và chuẩn hóa RESTful APIs, hệ thống xác thực phân quyền JWT, quản lý cơ sở dữ liệu MySQL, PostgreSQL, MongoDB thông qua Prisma ORM.',
        'Tích hợp giải pháp AI vào sản phẩm thực tế (Recipe-Cookbook AI), tối ưu hóa trải nghiệm nấu ăn tương tác và gợi ý thông minh.',
        'Tối ưu hóa hiệu năng render, cơ chế cache thông minh (TanStack Query, Next.js Cache) đạt điểm số cao trên Lighthouse và Core Web Vitals.',
      ],
    },
    {
      role: 'Lập trình viên Front End & E-Commerce',
      company: 'Dự án Thương mại điện tử & Khách hàng',
      period: '2022 — 2023',
      bullets: [
        'Tùy biến và phát triển giao diện thương mại điện tử chuyên sâu sử dụng Liquid (Shopify) và Handlebars (BigCommerce).',
        'Xây dựng luồng giỏ hàng động, tối ưu quy trình thanh toán (checkout) và tương tác người dùng, cải thiện tỷ lệ hoàn tất đơn hàng.',
        'Đảm bảo giao diện chuẩn responsive 100% trên điện thoại, máy tính bảng và desktop; tuân thủ các nguyên tắc UI/UX hiện đại.',
      ],
    },
  ],
  skills_title: 'Kỹ năng kỹ thuật (Technical Skills)',
  skill_categories: [
    {
      title: 'Frontend Engineering',
      skills:
        'ReactJS, NextJS (App Router), TypeScript, JavaScript (ES6+), TailwindCSS, Redux Toolkit, TanStack React Query, Ant Design, Styled-Components, Zod, Responsive UI/UX.',
    },
    {
      title: 'Backend & Cloud',
      skills:
        'NestJS, Node.js, Express.js, RESTful APIs, JWT Authentication, Prisma ORM, MySQL, PostgreSQL, MongoDB, Cloudinary CDN.',
    },
    {
      title: 'E-commerce & CMS',
      skills:
        'Liquid (Shopify Theme Customization), Handlebars (BigCommerce), Headless Commerce integration, Custom Admin Dashboards.',
    },
    {
      title: 'Architecture & Tools',
      skills:
        'Git, GitHub, Vite, Postman, Figma, Agile/Scrum, Web Performance Optimization, Modular Architecture.',
    },
  ],
  projects_title: 'Dự án tiêu biểu (Featured Projects)',
  show_projects: true,
  projects: [
    {
      title: 'Trang Sakia Online',
      category: 'Full-stack',
      live_demo: 'http://trangsakiaonline.com/',
      github_link: '',
      description:
        'Nền tảng đăng ký khóa học trực tuyến, quản lý lịch sử đơn hàng và xem nội dung bài giảng, tích hợp bảng quản trị (Admin Dashboard) tùy chỉnh để quản lý học viên, khóa học và doanh thu.',
      tech_stack: ['NextJS', 'NestJS', 'TypeScript', 'Prisma ORM', 'MySQL', 'Ant Design', 'Tailwind', 'JWT', 'RESTful APIs'],
    },
    {
      title: 'Recipe-Cookbook (Sổ tay ẩm thực AI)',
      category: 'AI & Web',
      live_demo: 'https://recipe-cookbook-phi.vercel.app/',
      github_link: 'https://github.com/NgoQuoc4/Recipe-Cookbook',
      description:
        'Nền tảng sổ tay công thức nấu ăn toàn diện cho phép người dùng tạo, quản lý, tìm kiếm công thức, đánh giá món ăn và được thiết kế tối ưu với chế độ nấu ăn (Cooking Mode), tích hợp AI để gợi ý công thức thông minh.',
      tech_stack: ['ReactJS', 'TypeScript', 'Vite', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'TanStack Query', 'TailwindCSS', 'Zod'],
    },
    {
      title: 'CDF Course',
      category: 'EdTech',
      live_demo: 'https://course-main-seven.vercel.app/',
      github_link: 'https://github.com/NgoQuoc4/course_main',
      description:
        'Nền tảng đăng ký khóa học, quản lý lịch sử đơn hàng và tương tác với nội dung blog giáo dục, tích hợp bảng quản trị (Admin Dashboard) tùy chỉnh để quản lý hệ thống.',
      tech_stack: ['ReactJS', 'TypeScript', 'Vite', 'Redux Toolkit', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Cloudinary'],
    },
    {
      title: 'CFD Shop',
      category: 'Ecommerce',
      live_demo: 'https://cfdshop-eosin.vercel.app/',
      github_link: 'https://github.com/NgoQuoc4/cfdshop',
      description:
        'Hệ thống bán hàng thương mại điện tử trực tuyến hiện đại với giỏ hàng tối ưu, cơ chế fetch & cache thông minh bằng TanStack React Query.',
      tech_stack: ['ReactJS', 'Vite', 'TanStack React Query', 'Axios', 'TailwindCSS'],
    },
  ],
  education_title: 'Học vấn & Đào tạo (Education & Training)',
  education: [
    {
      badge: 'Đại Học',
      title: 'Công Nghệ Thông Tin',
      subtitle: 'Chuyên ngành Kỹ thuật Phần mềm',
      description:
        'Nền tảng vững chắc về cấu trúc dữ liệu, giải thuật, cơ sở dữ liệu quan hệ, mạng máy tính và quy trình phát triển phần mềm chuẩn mực.',
    },
    {
      badge: 'Đào Tạo Chuyên Sâu',
      title: 'Front End & Full Stack Web Development',
      subtitle: 'Chứng chỉ Chuyên sâu ReactJS & Next.js Ecosystem',
      description:
        'Chương trình thực chiến chuyên sâu về ReactJS, Next.js, Node.js/NestJS, TypeScript, Clean Code, và State Management trong các dự án thực tế.',
    },
  ],
  footer_name: 'Ngô Chí Quốc · Resume',
  footer_updated: 'Cập nhật mới nhất: 2026',
};

