import React from "react";
import { X } from "lucide-react";

interface ModernModalProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  autoClose?: boolean;
  duration?: number;
}

const ModernModal: React.FC<ModernModalProps> = ({
  open,
  onClose,
  children,
  autoClose,
  duration = 2000,
}) => {
  React.useEffect(() => {
    if (open && autoClose && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [open, autoClose, duration, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center relative min-w-[320px] animate-popIn">
        {onClose && (
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        )}
        {children}
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s;
        }
        @keyframes popIn {
          0% {
            transform: scale(0.95);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-popIn {
          animation: popIn 0.25s cubic-bezier(0.4, 2, 0.6, 1);
        }
      `}</style>
    </div>
  );
};

export default ModernModal;
