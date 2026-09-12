import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dự Án Freelance & Đánh Giá Khách Hàng · Ngô Chí Quốc',
  description:
    'Danh sách các dự án Freelance đã thực hiện của Ngô Chí Quốc kèm phản hồi đánh giá 5 sao từ khách hàng: Web App, Landing Page, E-Commerce và giải pháp tối ưu hiệu năng.',
  alternates: {
    canonical: 'https://ngoquoc.vercel.app/freelance',
  },
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
        url: 'https://res.cloudinary.com/dguad3xyf/image/upload/v1786779310/premium_photo-1661290231745-15f1ed6fea88_gcrnme.avif',
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
