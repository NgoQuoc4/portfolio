'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, Calendar, Send, Sparkles, Phone, ArrowUpRight } from 'lucide-react';
import api from '../lib/api';

interface ContactSectionProps {
  email?: string;
  calendarLink?: string;
  headline?: string;
  statusText?: string;
  githubLink?: string;
  linkedinLink?: string;
  twitterLink?: string;
  phone?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  email = 'ngochiquoc140@gmail.com',
  calendarLink = 'https://calendar.google.com',
  headline,
  statusText = 'Sẵn sàng hợp tác cho các vị trí, dự án mới & cơ hội kết nối.',
  githubLink = 'https://github.com/NgoQuoc4',
  linkedinLink = 'https://linkedin.com',
  phone = '0789898100',
}) => {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      // 1. Send email directly through Next.js Nodemailer API route
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Gửi email thất bại.');
      }

      setStatus('success');
      setForm({ name: '', email: '', message: '' });

      // 2. Also background sync to NestJS database if available
      api.post('/messages', form).catch(() => {});
    } catch (err: any) {
      setErrorMessage(
        err?.message || `Không thể gửi tin nhắn lúc này. Vui lòng liên hệ trực tiếp: ${email}`
      );
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="snap-start relative min-h-[100dvh] md:h-dvh bg-canvas flex items-center py-12 md:py-0"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-surface-1 border border-border shadow-float overflow-hidden grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Left Panel: Info & Direct Channels (Col 6) */}
          <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 bg-surface-2/30 border-b lg:border-b-0 lg:border-r border-border flex flex-col justify-between">
            <div>
              {/* Category & Status */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="font-mono text-xs text-pink-500 uppercase tracking-widest font-semibold">
                  Liên Hệ
                </span>
                <span className="text-border">/</span>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-1 border border-border shadow-xs text-xs text-ink-muted">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>{statusText}</span>
                </div>
              </div>

              {/* Natural 2-Line Headline (no awkward orphans) */}
              <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink mb-3 leading-snug">
                Cùng nhau xây dựng <br />
                <span className="font-serif italic font-medium gradient-text-flow">
                  sản phẩm chất lượng &amp; bền vững
                </span>
              </h2>

              <p className="text-sm text-ink-muted leading-relaxed max-w-md mb-8">
                Bạn đang có ý tưởng mới, cần tư vấn giải pháp kỹ thuật tối ưu hay tìm kiếm một lập trình viên Full Stack tận tâm? Hãy kết nối với tôi qua các kênh bên dưới.
              </p>
            </div>

            {/* Direct Contact Items */}
            <div className="space-y-3 pt-4 border-t border-border">
              {/* Email item */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-surface-1 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono text-ink-subtle uppercase tracking-wider">Email trực tiếp</p>
                    <a href={`mailto:${email}`} className="text-xs sm:text-sm font-mono text-ink font-semibold hover:text-pink-500 transition-colors">
                      {email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  type="button"
                  className="px-3 py-1.5 rounded-xl hover:bg-surface-2 text-ink-muted hover:text-ink transition-colors cursor-pointer text-xs font-mono flex items-center gap-1.5"
                  title="Sao chép email"
                >
                  {copied ? (
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                      <Check className="w-3.5 h-3.5" /> Đã chép
                    </span>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Sao chép</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone & Calendar Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {phone && (
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-surface-1 border border-border hover:border-pink-300 dark:hover:border-pink-900 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-ink-subtle uppercase tracking-wider">Điện thoại / Zalo</p>
                      <p className="text-xs font-mono font-semibold text-ink group-hover:text-pink-500 transition-colors">{phone}</p>
                    </div>
                  </a>
                )}

                {calendarLink && (
                  <a
                    href={calendarLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-2xl bg-surface-1 border border-border hover:border-pink-300 dark:hover:border-pink-900 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-mono text-ink-subtle uppercase tracking-wider">Lịch hẹn</p>
                      <p className="text-xs font-semibold text-ink truncate group-hover:text-pink-500 transition-colors">Đặt lịch trao đổi</p>
                    </div>
                  </a>
                )}
              </div>

              {/* Social Channels */}
              <div className="flex items-center gap-2 pt-2">
                <span className="font-mono text-xs text-ink-subtle uppercase tracking-wider mr-1">
                  Mạng xã hội:
                </span>
                {githubLink && (
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-1 border border-border text-xs font-mono text-ink-muted hover:text-ink hover:border-border-hover transition-all"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3 h-3 text-ink-subtle" />
                  </a>
                )}
                {linkedinLink && (
                  <a
                    href={linkedinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-1 border border-border text-xs font-mono text-ink-muted hover:text-ink hover:border-border-hover transition-all"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3 text-ink-subtle" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel: Sleek Message Form (Col 6) */}
          <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 bg-surface-1 flex flex-col justify-center">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-sans text-lg font-bold text-ink">
                  Gửi tin nhắn trực tiếp
                </h3>
              </div>
              <p className="text-xs text-ink-muted">
                Tin nhắn được gửi thẳng đến hộp thư của tôi. Phản hồi trong 24h.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-[11px] text-ink-muted uppercase tracking-wider mb-1.5">
                  Họ và tên <span className="text-pink-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:border-pink-500 transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-ink-muted uppercase tracking-wider mb-1.5">
                  Địa chỉ Email <span className="text-pink-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="email@vidu.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:border-pink-500 transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-ink-muted uppercase tracking-wider mb-1.5">
                  Nội dung trao đổi <span className="text-pink-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Bạn đang có dự án, câu hỏi hay cơ hội hợp tác nào?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:border-pink-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-ink text-surface-1 font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer shadow-sm pt-3"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Đang gửi tin nhắn...' : 'Gửi Tin Nhắn'}</span>
              </button>

              {status === 'success' && (
                <p className="text-xs text-emerald-600 font-semibold text-center pt-2 animate-fade-in">
                  ✅ Tin nhắn đã được gửi thành công đến email! Tôi sẽ phản hồi sớm nhất.
                </p>
              )}
              {status === 'error' && (
                <p className="text-xs text-rose-500 font-semibold text-center pt-2 animate-fade-in leading-relaxed">
                  ❌ {errorMessage || `Không thể gửi tin nhắn lúc này. Vui lòng liên hệ trực tiếp: ${email}`}
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
