'use client';

import React from 'react';
import { Trash2 } from 'lucide-react';
import type { Message } from '@/lib/types';

interface MessagesTabProps {
  messages: Message[];
  onDeleteMessage: (id: string) => void | Promise<void>;
}

export const MessagesTab: React.FC<MessagesTabProps> = ({
  messages,
  onDeleteMessage,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-sans font-bold text-base text-ink">
          Hộp thư tin nhắn nhận từ biểu mẫu Liên hệ
        </h3>
      </div>

      {messages.length === 0 ? (
        <div className="p-12 text-center bg-surface-1 border border-border rounded-3xl text-slate-500">
          Chưa có tin nhắn nào được gửi đến. Mọi tin nhắn gửi từ trang chính sẽ hiển thị tại đây.
        </div>
      ) : (
        messages.map((m) => (
          <div
            key={m._id}
            className="bg-surface-1 border border-border rounded-2xl p-6 flex items-start justify-between gap-4 shadow-sm"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-ink text-sm">{m.name}</span>
                <span className="text-xs text-pink-500 font-mono">({m.email})</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed whitespace-pre-wrap">
                {m.message}
              </p>
              <span className="font-mono text-[10px] text-slate-400 mt-3 block">
                {new Date(m.createdAt || Date.now()).toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => onDeleteMessage(m._id || '')}
              className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer"
              title="Xóa tin nhắn"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))
      )}
    </div>
  );
};
