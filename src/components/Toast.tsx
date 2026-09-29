import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#222321] text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-white/10 text-xs sm:text-sm font-medium">
        <CheckCircle2 className="w-4 h-4 text-[#7FA9BC] shrink-0" />
        <span>{message}</span>
        <button
          onClick={onClose}
          className="text-white/50 hover:text-white transition-colors ml-2"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
