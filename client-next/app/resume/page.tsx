'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Printer, Mail, Phone, MapPin, ExternalLink, Globe, Briefcase, Calendar, GraduationCap } from 'lucide-react';

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-canvas text-ink py-12 px-6 md:px-12 print:p-0 print:bg-white print:text-black">
      {/* Top action toolbar (hidden when printing) */}
      <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-1 border border-border text-sm font-medium hover:border-border-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về trang chủ</span>
        </Link>

        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-ink text-surface-1 text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
        >
          <Printer className="w-4 h-4" />
          <span>In / Lưu PDF</span>
        </button>
      </div>

      {/* Main Resume Sheet */}
      <main className="max-w-4xl mx-auto bg-surface-1 border border-border rounded-3xl p-8 sm:p-12 shadow-float print:border-none print:shadow-none print:p-0 print:rounded-none">
        {/* Header section */}
        <header className="border-b border-border pb-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <Image
              src="https://res.cloudinary.com/dguad3xyf/image/upload/v1776242078/MeUJ0ogEM8MjZvYWfSb9_665822b791856_cvtpl_yljpfv.jpg"
              alt="Ngô Chí Quốc"
              width={96}
              height={96}
              className="w-24 h-24 rounded-2xl object-cover border-2 border-pink-500 shadow-md ring-4 ring-pink-500/10"
              priority
            />
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-ink">
                Ngô Chí Quốc
              </h1>
              <p className="text-pink-500 font-semibold text-lg mt-0.5">
                Lập trình viên Full Stack &amp; Front End
              </p>
              <div className="flex items-center gap-2 text-xs text-ink-muted mt-1 font-mono">
                <MapPin className="w-3.5 h-3.5" />
                <span>TP. Hồ Chí Minh, Việt Nam</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 font-mono text-xs sm:text-right w-full sm:w-auto">
            <a
              href="mailto:ngochiquoc140@gmail.com"
              className="inline-flex items-center sm:justify-end gap-2 text-ink hover:text-pink-500 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-pink-500" />
              <span>ngochiquoc140@gmail.com</span>
            </a>
            <a
              href="tel:0789898100"
              className="inline-flex items-center sm:justify-end gap-2 text-ink hover:text-pink-500 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-pink-500" />
              <span>0789898100</span>
            </a>
            <a
              href="https://github.com/NgoQuoc4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center sm:justify-end gap-2 text-ink hover:text-pink-500 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-pink-500" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>github.com/NgoQuoc4</span>
            </a>
            <a
              href="https://ngoquoc.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center sm:justify-end gap-2 text-ink hover:text-pink-500 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-pink-500" />
              <span>ngoquoc.vercel.app</span>
            </a>
          </div>
        </header>

        {/* Executive Summary */}
        <section className="mb-10">
          <h2 className="font-mono text-xs text-pink-500 uppercase tracking-widest font-semibold mb-3">
            Tóm tắt chuyên môn
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-ink-muted">
            <p>
              Là một nhà phát triển Full Stack tận tâm, luôn cam kết mang lại kết quả tốt nhất, tôi sở hữu kỹ năng nâng cao trong việc triển khai các công nghệ tiên tiến như <strong className="text-ink">ReactJS, NextJS, NestJS, ExpressJS</strong>. Tôi chuyên xây dựng các sản phẩm chất lượng cao, hướng đến người dùng và chuyển đổi các thiết kế thành trải nghiệm kỹ thuật số liền mạch.
            </p>
            <p>
              Ngoài Full Stack, tôi còn có chuyên môn vững chắc về Vanilla JavaScript, Liquid (Shopify) và Handlebars (BigCommerce), cho phép tôi phát triển và tùy chỉnh các nền tảng thương mại điện tử một cách hiệu quả, tối ưu hóa hiệu suất và tạo ra các giải pháp front-end linh hoạt, có khả năng mở rộng.
            </p>
          </div>
        </section>

        {/* Work Experience */}
        <section className="mb-10">
          <h2 className="font-mono text-xs text-pink-500 uppercase tracking-widest font-semibold mb-6 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-pink-500" />
            <span>Kinh nghiệm làm việc (Work Experience)</span>
          </h2>

          <div className="space-y-6">
            {/* Experience 1 */}
            <div className="p-5 rounded-2xl bg-surface-2 border border-border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div>
                  <h3 className="font-sans font-bold text-base text-ink">
                    Lập trình viên Full Stack &amp; Front End
                  </h3>
                  <p className="text-pink-500 font-mono text-xs font-semibold">
                    Freelance &amp; Dự án Độc lập
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-ink-muted font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>2023 — Hiện tại</span>
                </div>
              </div>
              <ul className="list-disc list-inside text-xs text-ink-muted space-y-1.5 mt-3 leading-relaxed">
                <li>
                  Thiết kế kiến trúc và trực tiếp phát triển các ứng dụng web phức tạp với <strong className="text-ink">ReactJS, Next.js (App Router), TypeScript, NestJS</strong> và TailwindCSS.
                </li>
                <li>
                  Thiết kế và chuẩn hóa RESTful APIs, hệ thống xác thực phân quyền <strong className="text-ink">JWT</strong>, quản lý cơ sở dữ liệu <strong className="text-ink">MySQL, PostgreSQL, MongoDB</strong> thông qua Prisma ORM.
                </li>
                <li>
                  Tích hợp giải pháp AI vào sản phẩm thực tế (Recipe-Cookbook AI), tối ưu hóa trải nghiệm nấu ăn tương tác và gợi ý thông minh.
                </li>
                <li>
                  Tối ưu hóa hiệu năng render, cơ chế cache thông minh (TanStack Query, Next.js Cache) đạt điểm số cao trên Lighthouse và Core Web Vitals.
                </li>
              </ul>
            </div>

            {/* Experience 2 */}
            <div className="p-5 rounded-2xl bg-surface-2 border border-border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div>
                  <h3 className="font-sans font-bold text-base text-ink">
                    Lập trình viên Front End &amp; E-Commerce
                  </h3>
                  <p className="text-pink-500 font-mono text-xs font-semibold">
                    Dự án Thương mại điện tử &amp; Khách hàng
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-ink-muted font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>2022 — 2023</span>
                </div>
              </div>
              <ul className="list-disc list-inside text-xs text-ink-muted space-y-1.5 mt-3 leading-relaxed">
                <li>
                  Tùy biến và phát triển giao diện thương mại điện tử chuyên sâu sử dụng <strong className="text-ink">Liquid (Shopify)</strong> và <strong className="text-ink">Handlebars (BigCommerce)</strong>.
                </li>
                <li>
                  Xây dựng luồng giỏ hàng động, tối ưu quy trình thanh toán (checkout) và tương tác người dùng, cải thiện tỷ lệ hoàn tất đơn hàng.
                </li>
                <li>
                  Đảm bảo giao diện chuẩn responsive 100% trên điện thoại, máy tính bảng và desktop; tuân thủ các nguyên tắc UI/UX hiện đại.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technical Skills */}
        <section className="mb-10">
          <h2 className="font-mono text-xs text-pink-500 uppercase tracking-widest font-semibold mb-4">
            Kỹ năng kỹ thuật (Technical Skills)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-surface-2 border border-border">
              <span className="font-bold text-ink block mb-2 font-sans text-sm">Frontend Engineering</span>
              <p className="text-ink-muted leading-normal">
                ReactJS, NextJS (App Router), TypeScript, JavaScript (ES6+), TailwindCSS, Redux Toolkit, TanStack React Query, Ant Design, Styled-Components, Zod, Responsive UI/UX.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-surface-2 border border-border">
              <span className="font-bold text-ink block mb-2 font-sans text-sm">Backend &amp; Cloud</span>
              <p className="text-ink-muted leading-normal">
                NestJS, Node.js, Express.js, RESTful APIs, JWT Authentication, Prisma ORM, MySQL, PostgreSQL, MongoDB, Cloudinary CDN.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-surface-2 border border-border">
              <span className="font-bold text-ink block mb-2 font-sans text-sm">E-commerce &amp; CMS</span>
              <p className="text-ink-muted leading-normal">
                Liquid (Shopify Theme Customization), Handlebars (BigCommerce), Headless Commerce integration, Custom Admin Dashboards.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-surface-2 border border-border">
              <span className="font-bold text-ink block mb-2 font-sans text-sm">Architecture &amp; Tools</span>
              <p className="text-ink-muted leading-normal">
                Git, GitHub, Vite, Postman, Figma, Agile/Scrum, Web Performance Optimization, Modular Architecture.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="mb-10">
          <h2 className="font-mono text-xs text-pink-500 uppercase tracking-widest font-semibold mb-6">
            Dự án tiêu biểu (Featured Projects)
          </h2>

          <div className="space-y-6">
            {/* Project 1 */}
            <div className="p-5 rounded-2xl bg-surface-2 border border-border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className="font-sans font-bold text-base text-ink flex items-center gap-2">
                  <span>Trang Sakia Online</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-500 border border-pink-500/20">Full-stack</span>
                </h3>
                <a
                  href="http://trangsakiaonline.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-pink-500 flex items-center gap-1 hover:underline"
                >
                  trangsakiaonline.com <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed mb-3">
                Nền tảng đăng ký khóa học trực tuyến, quản lý lịch sử đơn hàng và xem nội dung bài giảng, tích hợp bảng quản trị (Admin Dashboard) tùy chỉnh để quản lý học viên, khóa học và doanh thu.
              </p>
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {['NextJS', 'NestJS', 'TypeScript', 'Prisma ORM', 'MySQL', 'Ant Design', 'Tailwind', 'JWT', 'RESTful APIs'].map((t) => (
                  <span key={t} className="px-2 py-0.5 bg-surface-1 border border-border rounded-md text-ink-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Project 2 */}
            <div className="p-5 rounded-2xl bg-surface-2 border border-border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className="font-sans font-bold text-base text-ink flex items-center gap-2">
                  <span>Recipe-Cookbook (Sổ tay ẩm thực AI)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">AI &amp; Web</span>
                </h3>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <a
                    href="https://github.com/NgoQuoc4/Recipe-Cookbook"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-muted hover:text-ink flex items-center gap-1"
                  >
                    GitHub <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://recipe-cookbook-phi.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:underline flex items-center gap-1"
                  >
                    Live Demo <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed mb-3">
                Nền tảng sổ tay công thức nấu ăn toàn diện cho phép người dùng tạo, quản lý, tìm kiếm công thức, đánh giá món ăn và được thiết kế tối ưu với chế độ nấu ăn (Cooking Mode), tích hợp AI để gợi ý công thức thông minh.
              </p>
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {['ReactJS', 'TypeScript', 'Vite', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'TanStack Query', 'TailwindCSS', 'Zod'].map((t) => (
                  <span key={t} className="px-2 py-0.5 bg-surface-1 border border-border rounded-md text-ink-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Project 3 */}
            <div className="p-5 rounded-2xl bg-surface-2 border border-border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className="font-sans font-bold text-base text-ink flex items-center gap-2">
                  <span>CDF Course</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20">EdTech</span>
                </h3>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <a
                    href="https://github.com/NgoQuoc4/course_main"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-muted hover:text-ink flex items-center gap-1"
                  >
                    GitHub <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://course-main-seven.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:underline flex items-center gap-1"
                  >
                    Live Demo <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed mb-3">
                Nền tảng đăng ký khóa học, quản lý lịch sử đơn hàng và tương tác với nội dung blog giáo dục, tích hợp bảng quản trị (Admin Dashboard) tùy chỉnh để quản lý hệ thống.
              </p>
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {['ReactJS', 'TypeScript', 'Vite', 'Redux Toolkit', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Cloudinary'].map((t) => (
                  <span key={t} className="px-2 py-0.5 bg-surface-1 border border-border rounded-md text-ink-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Project 4 */}
            <div className="p-5 rounded-2xl bg-surface-2 border border-border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h3 className="font-sans font-bold text-base text-ink flex items-center gap-2">
                  <span>CFD Shop</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 border border-purple-500/20">Ecommerce</span>
                </h3>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <a
                    href="https://github.com/NgoQuoc4/cfdshop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-muted hover:text-ink flex items-center gap-1"
                  >
                    GitHub <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://cfdshop-eosin.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:underline flex items-center gap-1"
                  >
                    Live Demo <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed mb-3">
                Hệ thống bán hàng thương mại điện tử trực tuyến hiện đại với giỏ hàng tối ưu, cơ chế fetch &amp; cache thông minh bằng TanStack React Query.
              </p>
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {['ReactJS', 'Vite', 'TanStack React Query', 'Axios', 'TailwindCSS'].map((t) => (
                  <span key={t} className="px-2 py-0.5 bg-surface-1 border border-border rounded-md text-ink-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education & Training */}
        <section className="mb-10">
          <h2 className="font-mono text-xs text-pink-500 uppercase tracking-widest font-semibold mb-6 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-pink-500" />
            <span>Học vấn &amp; Đào tạo (Education &amp; Training)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-surface-2 border border-border">
              <span className="text-[10px] font-mono uppercase tracking-wider text-pink-500 bg-pink-500/10 px-2.5 py-0.5 rounded-full font-semibold">
                Đại Học
              </span>
              <h3 className="font-sans font-bold text-base text-ink mt-2">
                Công Nghệ Thông Tin
              </h3>
              <p className="font-mono text-xs text-ink-muted mt-1">
                Chuyên ngành Kỹ thuật Phần mềm
              </p>
              <p className="text-xs text-ink-muted mt-2 leading-relaxed">
                Nền tảng vững chắc về cấu trúc dữ liệu, giải thuật, cơ sở dữ liệu quan hệ, mạng máy tính và quy trình phát triển phần mềm chuẩn mực.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface-2 border border-border">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 bg-emerald-500/10 px-2.5 py-0.5 rounded-full font-semibold">
                Đào Tạo Chuyên Sâu
              </span>
              <h3 className="font-sans font-bold text-base text-ink mt-2">
                Front End &amp; Full Stack Web Development
              </h3>
              <p className="font-mono text-xs text-ink-muted mt-1">
                Chứng chỉ Chuyên sâu ReactJS &amp; Next.js Ecosystem
              </p>
              <p className="text-xs text-ink-muted mt-2 leading-relaxed">
                Chương trình thực chiến chuyên sâu về ReactJS, Next.js, Node.js/NestJS, TypeScript, Clean Code, và State Management trong các dự án thực tế.
              </p>
            </div>
          </div>
        </section>

        {/* Footer info */}
        <footer className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-ink-muted font-mono gap-2">
          <span>Ngô Chí Quốc · Resume</span>
          <span>Cập nhật mới nhất: 2026</span>
        </footer>
      </main>
    </div>
  );
}
