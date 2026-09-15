import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dự Án Freelance & Đánh Giá Khách Hàng · Ngô Chí Quốc',
  description:
    'Danh sách các dự án Freelance đã thực hiện của Ngô Chí Quốc kèm phản hồi đánh giá 5 sao từ khách hàng: Web App, Landing Page, E-Commerce và giải pháp tối ưu hiệu năng.',
  alternates: {
    canonical: 'https://ngoquoc.vercel.app/freelance',
  },
  keywords: [
    // Định danh cá nhân
    'Ngô Chí Quốc',
    'Ngo Chi Quoc',
    'Quoc Ngo freelance',
    // Dịch vụ tìm kiếm phổ biến
    'nhận làm web freelance',
    'nhận làm dự án web',
    'thuê lập trình viên freelance',
    'thuê frontend developer',
    'thuê full stack developer',
    'lập trình viên freelance TP HCM',
    'lập trình viên freelance Hồ Chí Minh',
    'freelance developer Việt Nam',
    // Công nghệ
    'ReactJS developer',
    'Next.js developer',
    'NestJS developer',
    'TypeScript developer',
    'TailwindCSS developer',
    'NodeJS freelance',
    // Loại dự án
    'xây dựng web app',
    'xây dựng SaaS',
    'tích hợp AI vào web',
    'tối ưu hiệu năng website',
    'tối ưu Core Web Vitals',
    'làm landing page',
    'thiết kế giao diện web',
    'phát triển e-commerce',
    // English keywords
    'hire frontend developer Vietnam',
    'hire full stack developer Vietnam',
    'web development freelance Vietnam',
    'React developer for hire',
    'Next.js developer for hire',
    'AI web integration freelance',
    'SaaS frontend developer',
    'remote developer Vietnam',
    'freelance web developer Ho Chi Minh City',
    'portfolio freelance projects',
  ],
  openGraph: {
    title: 'Dự Án Freelance & Đánh Giá Khách Hàng · Ngô Chí Quốc',
    description:
      'Danh sách các dự án Freelance đã thực hiện của Ngô Chí Quốc kèm phản hồi đánh giá 5 sao từ khách hàng.',
    url: 'https://ngoquoc.vercel.app/freelance',
    siteName: 'Ngô Chí Quốc Portfolio',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1661956602944-249bcd04b63f?w=800&q=80',
        width: 1200,
        height: 630,
        alt: 'Dự Án Freelance & Đánh Giá Khách Hàng · Ngô Chí Quốc',
      },
    ],
  },
};

export default function FreelanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
