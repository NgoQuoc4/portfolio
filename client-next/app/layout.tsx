import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
});

const jetbrains = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

const instrumentSerif = Instrument_Serif({
  variable: '--font-serif',
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ngoquoc.vercel.app'),
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  },
  title: 'Ngô Chí Quốc · Lập trình viên Full Stack & Front End',
  description:
    'Portfolio của Ngô Chí Quốc - Lập trình viên Full Stack & Front End chuyên ReactJS, Next.js, NestJS, TypeScript và xây dựng trải nghiệm kỹ thuật số chất lượng cao.',
  keywords: [
    'Ngô Chí Quốc',
    'Ngo Chi Quoc',
    'Full Stack Developer',
    'Frontend Developer',
    'ReactJS',
    'Next.js',
    'NestJS',
    'TypeScript',
    'Portfolio',
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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${jakarta.variable} ${jetbrains.variable} ${instrumentSerif.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-canvas text-ink min-h-screen">
        {children}
      </body>
    </html>
  );
}
