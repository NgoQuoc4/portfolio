import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-serif',
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ngoquoc.vercel.app'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  },
  title: {
    default: 'Ngô Chí Quốc · Lập trình viên Full Stack & Front End',
    template: '%s | Ngô Chí Quốc',
  },
  description:
    'Portfolio của Ngô Chí Quốc - Lập trình viên Full Stack & Front End chuyên ReactJS, Next.js, NestJS, TypeScript và xây dựng trải nghiệm kỹ thuật số chất lượng cao.',
  keywords: [
    // Định danh cá nhân & biến thể
    'Ngô Chí Quốc',
    'Ngo Chi Quoc',
    'Quoc Ngo',
    'NgoQuoc4',
    // Vị trí & Nghề nghiệp
    'Lập trình viên Full Stack',
    'Lập trình viên Front End',
    'Full Stack Developer',
    'Frontend Developer',
    'Kỹ sư phần mềm',
    'Software Engineer Vietnam',
    'Web Developer Vietnam',
    'Lập trình viên TP Hồ Chí Minh',
    'Lập trình viên Hồ Chí Minh',
    'Web Developer Ho Chi Minh City',
    // Kỹ thuật & Công nghệ
    'ReactJS Developer',
    'Next.js Developer',
    'NestJS Developer',
    'TypeScript Developer',
    'Node.js Developer',
    'TailwindCSS',
    'Prisma ORM',
    'MongoDB',
    'MySQL',
    // Tìm kiếm tuyển dụng & Hợp tác
    'Tuyển dụng Frontend Developer',
    'Tuyển dụng Full Stack Developer',
    'Thuê lập trình viên web',
    'Freelance Web Developer',
    'Portfolio lập trình viên',
    'Web Developer Portfolio',
    'Frontend Portfolio Vietnam',
  ],
  authors: [{ name: 'Ngô Chí Quốc', url: 'https://github.com/NgoQuoc4' }],
  creator: 'Ngô Chí Quốc',
  verification: {
    google: 'ojFer0DtyjXzyGIihiGzdGsKsXxIo118N8XCqoOAoYQ',
  },
  openGraph: {
    title: 'Ngô Chí Quốc · Lập trình viên Full Stack & Front End',
    description:
      'Chuyên xây dựng các sản phẩm chất lượng cao, tối ưu hiệu suất và chuyển đổi thiết kế thành trải nghiệm kỹ thuật số liền mạch.',
    url: 'https://ngoquoc.vercel.app',
    siteName: 'Ngô Chí Quốc Portfolio',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dguad3xyf/image/upload/v1776242078/MeUJ0ogEM8MjZvYWfSb9_665822b791856_cvtpl_yljpfv.jpg',
        width: 1200,
        height: 630,
        alt: 'Ngô Chí Quốc · Lập trình viên Full Stack & Front End',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ngô Chí Quốc · Lập trình viên Full Stack & Front End',
    description:
      'Chuyên xây dựng các sản phẩm chất lượng cao, tối ưu hiệu suất và chuyển đổi thiết kế thành trải nghiệm kỹ thuật số liền mạch.',
    images: [
      'https://res.cloudinary.com/dguad3xyf/image/upload/v1776242078/MeUJ0ogEM8MjZvYWfSb9_665822b791856_cvtpl_yljpfv.jpg',
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': 'https://ngoquoc.vercel.app/#profilepage',
      url: 'https://ngoquoc.vercel.app',
      name: 'Ngô Chí Quốc · Lập trình viên Full Stack & Front End',
      mainEntity: {
        '@id': 'https://ngoquoc.vercel.app/#person',
      },
    },
    {
      '@type': 'Person',
      '@id': 'https://ngoquoc.vercel.app/#person',
      name: 'Ngô Chí Quốc',
      alternateName: ['Ngo Chi Quoc', 'Quoc Ngo', 'NgoQuoc4'],
      jobTitle: 'Full Stack & Front End Developer',
      description:
        'Lập trình viên Full Stack & Front End chuyên ReactJS, Next.js, NestJS, TypeScript và xây dựng trải nghiệm kỹ thuật số chất lượng cao.',
      url: 'https://ngoquoc.vercel.app',
      image:
        'https://res.cloudinary.com/dguad3xyf/image/upload/v1776242078/MeUJ0ogEM8MjZvYWfSb9_665822b791856_cvtpl_yljpfv.jpg',
      sameAs: [
        'https://github.com/NgoQuoc4',
      ],
      email: 'mailto:ngochiquoc140@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Hồ Chí Minh',
        addressRegion: 'Hồ Chí Minh',
        addressCountry: 'VN',
      },
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Full Stack & Front End Developer',
        occupationalCategory: '15-1252.00 - Software Developers',
        skills: 'ReactJS, Next.js, TypeScript, NestJS, NodeJS, ExpressJS, Prisma ORM, MongoDB, MySQL, TailwindCSS',
      },
      knowsAbout: [
        'ReactJS',
        'Next.js',
        'TypeScript',
        'NestJS',
        'NodeJS',
        'ExpressJS',
        'Prisma ORM',
        'MongoDB',
        'MySQL',
        'TailwindCSS',
        'Full Stack Development',
        'Frontend Architecture',
        'Web Performance Optimization',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://ngoquoc.vercel.app/#website',
      url: 'https://ngoquoc.vercel.app',
      name: 'Ngô Chí Quốc Portfolio',
      description:
        'Portfolio của Ngô Chí Quốc - Lập trình viên Full Stack & Front End chuyên ReactJS, Next.js, NestJS, TypeScript.',
      publisher: {
        '@id': 'https://ngoquoc.vercel.app/#person',
      },
      inLanguage: 'vi-VN',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${jakarta.variable} ${jetbrains.variable} ${instrumentSerif.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-canvas text-ink min-h-screen">
        {children}
      </body>
    </html>
  );
}
