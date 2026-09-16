'use client';

import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Search,
  RefreshCw,
  X,
  Check,
  Loader2,
} from 'lucide-react';
import type { MediaResource } from './types';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  mediaList: MediaResource[];
  loadingMedia?: boolean;
  fetchMediaList?: () => void | Promise<void>;
}

export const MediaPickerModal: React.FC<MediaPickerModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  mediaList,
  loadingMedia = false,
  fetchMediaList,
}) => {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredMedia = mediaList.filter((item) =>
    (item.public_id || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full max-h-[85vh] bg-surface-1 border border-border rounded-3xl overflow-hidden flex flex-col shadow-float"
      >
        {/* Header */}
        <div className="p-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-1">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-pink-500/10 text-pink-500 flex items-center justify-center border border-pink-500/20">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-ink leading-tight">
                Chọn ảnh từ Thư viện Cloudinary
              </h3>
              <p className="text-[11px] font-mono text-ink-muted mt-0.5">
                📁 Thư mục: ngoquoc_portfolio ({mediaList.length} ảnh)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {fetchMediaList && (
              <button
                type="button"
                onClick={fetchMediaList}
                disabled={loadingMedia}
                className="p-2 rounded-xl bg-surface-2 border border-border text-ink hover:text-pink-500 hover:border-pink-500 transition-colors cursor-pointer disabled:opacity-50"
                title="Làm mới danh sách ảnh"
              >
                <RefreshCw className={`w-4 h-4 ${loadingMedia ? 'animate-spin text-pink-500' : ''}`} />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-surface-2 border border-border text-ink hover:text-rose-500 hover:border-rose-500/40 transition-colors cursor-pointer"
              title="Đóng modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search filter bar */}
        <div className="px-5 py-3 border-b border-border bg-surface-2/60">
          <div className="relative">
            <Search className="w-4 h-4 text-ink-subtle absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm ảnh theo tên hoặc public_id..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface-1 border border-border text-xs text-ink placeholder:text-ink-subtle focus:outline-none focus:border-pink-500"
            />
          </div>
        </div>

        {/* Media Grid */}
        <div className="flex-1 overflow-y-auto p-5">
          {loadingMedia ? (
            <div className="py-16 text-center flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-pink-500 animate-spin mb-3" />
              <p className="text-xs font-semibold text-ink">Đang tải danh sách ảnh từ Cloudinary...</p>
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="py-16 text-center text-ink-muted">
              <ImageIcon className="w-12 h-12 text-ink-subtle mx-auto mb-3 opacity-40" />
              <p className="text-sm font-semibold text-ink">Không tìm thấy hình ảnh nào</p>
              <p className="text-xs text-ink-muted mt-1">
                {search ? 'Thử tìm với từ khóa khác' : 'Chưa có ảnh nào trong thư mục ngoquoc_portfolio'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
              {filteredMedia.map((item) => {
                const targetUrl = item.secure_url || item.url || '';
                return (
                  <div
                    key={item.public_id}
                    onClick={() => onSelect(targetUrl)}
                    className="group relative bg-surface-2 border border-border rounded-2xl overflow-hidden hover:border-pink-500 hover:shadow-md transition-all cursor-pointer flex flex-col"
                  >
                    <div className="relative w-full aspect-[4/3] bg-surface-3 overflow-hidden">
                      <img
                        src={targetUrl}
                        alt={item.public_id}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-3 py-1 rounded-full bg-pink-500 text-white text-[11px] font-bold shadow-md flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>Chọn ảnh</span>
                        </span>
                      </div>
                      <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/60 text-white font-mono text-[9px] uppercase">
                        {item.format}
                      </span>
                    </div>

                    <div className="p-2.5">
                      <p
                        className="text-[11px] font-mono font-bold text-ink truncate group-hover:text-pink-500 transition-colors"
                        title={item.public_id}
                      >
                        {item.public_id.split('/').pop()}
                      </p>
                      <p className="text-[10px] font-mono text-ink-muted mt-0.5">
                        {item.width}x{item.height} · {((item.bytes || 0) / 1024).toFixed(0)} KB
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-surface-2/40 flex items-center justify-between text-xs text-ink-muted">
          <span>Nhấp vào bất kỳ ảnh nào để áp dụng ngay làm ảnh bìa</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-surface-2 border border-border text-ink hover:text-ink-muted font-mono text-xs cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
