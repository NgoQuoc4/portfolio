'use client';

import React, { useState } from 'react';
import {
  Image as ImageIcon,
  RefreshCw,
  UploadCloud,
  Loader2,
  Search,
  Eye,
  Copy,
  Check,
  Trash2,
  X,
} from 'lucide-react';
import type { MediaResource } from '../types';

interface MediaTabProps {
  mediaList: MediaResource[];
  loadingMedia: boolean;
  uploadingMediaFile: boolean;
  fetchMediaList: () => void | Promise<void>;
  handleUploadMediaFile: (e: React.ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  handleDeleteMedia: (publicId: string) => void | Promise<void>;
  handleSetAvatarFromMedia: (url: string) => void;
  handleUseInResumeFromMedia: (url: string) => void;
  handleUseInProjectFromMedia: (url: string) => void;
  handleUseInFreelanceFromMedia: (url: string) => void;
  handleUseInExperienceFromMedia: (url: string) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}

export const MediaTab: React.FC<MediaTabProps> = ({
  mediaList,
  loadingMedia,
  uploadingMediaFile,
  fetchMediaList,
  handleUploadMediaFile,
  handleDeleteMedia,
  handleSetAvatarFromMedia,
  handleUseInResumeFromMedia,
  handleUseInProjectFromMedia,
  handleUseInFreelanceFromMedia,
  handleUseInExperienceFromMedia,
  showToast,
}) => {
  const [mediaSearch, setMediaSearch] = useState('');
  const [selectedMediaPreview, setSelectedMediaPreview] = useState<string | null>(null);
  const [copiedMediaUrl, setCopiedMediaUrl] = useState<string | null>(null);

  const handleCopyMediaUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedMediaUrl(url);
    showToast('Đã sao chép link ảnh vào clipboard!', 'success');
    setTimeout(() => setCopiedMediaUrl(null), 2500);
  };

  const filteredMedia = mediaList.filter((item) =>
    (item.public_id || '').toLowerCase().includes(mediaSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header & Upload Bar */}
      <div className="bg-surface-1 border border-border rounded-3xl p-6 sm:p-8 shadow-float">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h2 className="text-xl font-bold text-ink flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-pink-500" />
              <span>Quản Lý &amp; Đồng Bộ Thư Viện Ảnh Cloudinary</span>
            </h2>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="text-xs text-ink-muted">Chỉ đồng bộ thư mục:</span>
              <span className="px-2 py-0.5 rounded-md bg-pink-500/10 text-pink-500 font-mono text-[11px] font-semibold border border-pink-500/20">
                📁 ngoquoc_portfolio/
              </span>
              <span className="text-xs text-ink-subtle">· Cloud: dguad3xyf</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchMediaList}
              disabled={loadingMedia}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-2 border border-border text-xs font-semibold text-ink hover:border-pink-500 transition-all cursor-pointer shadow-xs disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingMedia ? 'animate-spin text-pink-500' : ''}`} />
              <span>{loadingMedia ? 'Đang đồng bộ...' : 'Đồng bộ lại từ Cloudinary'}</span>
            </button>

            <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pink-500 text-white font-semibold text-xs hover:bg-pink-600 transition-all cursor-pointer shadow-sm">
              {uploadingMediaFile ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Đang tải lên...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4" />
                  <span>Tải ảnh mới lên Cloudinary</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                disabled={uploadingMediaFile}
                onChange={handleUploadMediaFile}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Stats & Search Bar */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-ink-muted">
            <span className="font-bold text-ink text-sm">{filteredMedia.length}</span> hình ảnh trên Cloudinary
            <span>·</span>
            <span>
              Tổng: {(filteredMedia.reduce((acc, curr) => acc + (curr.bytes || 0), 0) / 1024 / 1024).toFixed(2)} MB
            </span>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-ink-subtle absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên / public_id..."
              value={mediaSearch}
              onChange={(e) => setMediaSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface-2 border border-border text-xs text-ink placeholder:text-ink-subtle focus:outline-none focus:border-pink-500"
            />
          </div>
        </div>
      </div>

      {/* Media Grid */}
      {loadingMedia ? (
        <div className="p-16 text-center bg-surface-1 border border-border rounded-3xl flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 text-pink-500 animate-spin mb-3" />
          <p className="text-sm font-semibold text-ink">Đang đồng bộ thư viện ảnh từ Cloudinary...</p>
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="p-16 text-center bg-surface-1 border border-border rounded-3xl text-ink-muted">
          <ImageIcon className="w-12 h-12 text-ink-subtle mx-auto mb-3 opacity-50" />
          <p className="text-sm font-semibold text-ink">Không tìm thấy hình ảnh nào</p>
          <p className="text-xs text-ink-muted mt-1">
            Hãy nhấn &quot;Tải ảnh mới lên Cloudinary&quot; ở góc trên để bắt đầu tải ảnh.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMedia.map((item) => (
            <div
              key={item.public_id}
              className="group relative bg-surface-1 border border-border rounded-2xl overflow-hidden shadow-xs hover:shadow-float hover:border-pink-500/50 transition-all flex flex-col"
            >
              {/* Image Preview thumbnail */}
              <div
                onClick={() => setSelectedMediaPreview(item.secure_url || item.url || '')}
                className="relative w-full aspect-[4/3] bg-surface-2 overflow-hidden cursor-pointer flex items-center justify-center group/thumb"
              >
                <img
                  src={item.secure_url || item.url}
                  alt={item.public_id}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover/thumb:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <span className="text-white text-xs font-semibold bg-black/60 px-3 py-1.5 rounded-full flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Xem lớn</span>
                  </span>
                </div>
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/60 text-white font-mono text-[9px] uppercase tracking-wider backdrop-blur-xs">
                  {item.format}
                </span>
              </div>

              {/* Details & Actions */}
              <div className="p-3.5 flex flex-col flex-1 justify-between gap-3">
                <div>
                  <p className="font-mono text-xs font-bold text-ink truncate" title={item.public_id}>
                    {item.public_id.split('/').pop()}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-ink-muted mt-1">
                    <span>
                      {item.width}x{item.height}
                    </span>
                    <span>·</span>
                    <span>{((item.bytes || 0) / 1024).toFixed(0)} KB</span>
                    <span>·</span>
                    <span>{new Date(item.created_at).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>

                {/* Quick action buttons */}
                <div className="space-y-1.5 pt-2 border-t border-border">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleCopyMediaUrl(item.secure_url || item.url || '')}
                      className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-surface-2 hover:bg-pink-500/10 hover:text-pink-600 text-ink text-[11px] font-semibold transition-colors cursor-pointer"
                      title="Sao chép liên kết URL ảnh"
                    >
                      {copiedMediaUrl === (item.secure_url || item.url) ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span className="text-emerald-600">Đã chép!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Chép URL</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteMedia(item.public_id)}
                      className="p-1.5 rounded-lg bg-surface-2 hover:bg-rose-500/15 text-rose-500 transition-colors cursor-pointer"
                      title="Xóa vĩnh viễn khỏi Cloudinary"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-5 gap-1">
                    <button
                      type="button"
                      onClick={() => handleSetAvatarFromMedia(item.secure_url || item.url || '')}
                      className="py-1 px-1 rounded-lg bg-surface-2 hover:bg-emerald-500/15 hover:text-emerald-600 text-[10px] font-mono font-medium text-ink transition-colors cursor-pointer text-center truncate"
                      title="Đặt làm ảnh Avatar trang chính"
                    >
                      Avatar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUseInResumeFromMedia(item.secure_url || item.url || '')}
                      className="py-1 px-1 rounded-lg bg-surface-2 hover:bg-rose-500/15 hover:text-rose-600 text-[10px] font-mono font-medium text-ink transition-colors cursor-pointer text-center truncate"
                      title="Đặt làm Avatar trang Resume (CV)"
                    >
                      CV
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUseInProjectFromMedia(item.secure_url || item.url || '')}
                      className="py-1 px-1.5 rounded-lg bg-surface-2 hover:bg-purple-500/15 hover:text-purple-600 text-[10px] font-mono font-medium text-ink transition-colors cursor-pointer text-center truncate"
                      title="Điền link ảnh vào Dự án"
                    >
                      Dự án
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUseInFreelanceFromMedia(item.secure_url || item.url || '')}
                      className="py-1 px-1 rounded-lg bg-surface-2 hover:bg-pink-500/15 hover:text-pink-600 text-[10px] font-mono font-medium text-ink transition-colors cursor-pointer text-center truncate"
                      title="Điền link ảnh vào Job Freelance"
                    >
                      Freelance
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUseInExperienceFromMedia(item.secure_url || item.url || '')}
                      className="py-1 px-1 rounded-lg bg-surface-2 hover:bg-amber-500/15 hover:text-amber-600 text-[10px] font-mono font-medium text-ink transition-colors cursor-pointer text-center truncate"
                      title="Điền link ảnh vào logo Công ty (Kinh nghiệm)"
                    >
                      K.nghiệm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Lightbox Preview */}
      {selectedMediaPreview && (
        <div
          onClick={() => setSelectedMediaPreview(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer animate-fade-in"
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-surface-1 rounded-3xl overflow-hidden border border-white/20 p-2 shadow-2xl cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedMediaPreview(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedMediaPreview}
              alt="Preview"
              className="max-h-[80vh] w-auto object-contain rounded-2xl mx-auto"
            />
            <div className="p-4 flex items-center justify-between gap-4">
              <span className="font-mono text-xs text-ink-muted truncate max-w-md">
                {selectedMediaPreview}
              </span>
              <button
                type="button"
                onClick={() => handleCopyMediaUrl(selectedMediaPreview)}
                className="px-4 py-2 rounded-full bg-ink text-surface-1 text-xs font-semibold flex items-center gap-1.5 shrink-0 hover:opacity-90"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Sao chép Link</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
