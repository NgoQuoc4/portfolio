import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CV & Hồ sơ năng lực · Ngô Chí Quốc (Full Stack & Front End)',
  description:
    'Hồ sơ năng lực (CV/Resume) của Ngô Chí Quốc - Lập trình viên Full Stack & Front End chuyên ReactJS, Next.js, NestJS, TypeScript.',
  alternates: {
    canonical: 'https://ngoquoc.vercel.app/resume',
  },
  openGraph: {
    title: 'CV & Hồ sơ năng lực · Ngô Chí Quốc',
    description:
      'Hồ sơ năng lực (CV/Resume) của Ngô Chí Quốc - Lập trình viên Full Stack & Front End chuyên ReactJS, Next.js, NestJS, TypeScript.',
    url: 'https://ngoquoc.vercel.app/resume',
    siteName: 'Ngô Chí Quốc Portfolio',
    locale: 'vi_VN',
    type: 'profile',
    images: [
      {
        url: 'https://res.cloudinary.com/dguad3xyf/image/upload/v1776242078/MeUJ0ogEM8MjZvYWfSb9_665822b791856_cvtpl_yljpfv.jpg',
        width: 1200,
        height: 630,
        alt: 'CV & Hồ sơ năng lực · Ngô Chí Quốc',
      },
    ],
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
