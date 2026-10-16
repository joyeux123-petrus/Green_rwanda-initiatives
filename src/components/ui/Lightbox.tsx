import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { normalizeImageUrl, handleImageError } from '../../lib/imageUtils';

interface LightboxProps {
  isOpen: boolean;
  imageUrl: string;
  title: string;
  description?: string;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  imageUrl,
  title,
  description,
  onClose,
  onNext,
  onPrev
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in" onClick={onClose}>
      <button
        onClick={onClose}
        className="absolute top-3 right-3 sm:top-6 sm:right-6 text-white bg-white/20 hover:bg-white/30 p-2.5 sm:p-3 rounded-full transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-white min-h-[44px] min-w-[44px] flex items-center justify-center"
        aria-label="Close lightbox"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {onPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/30 p-2.5 sm:p-3 rounded-full transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-white min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      )}

      {onNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/30 p-2.5 sm:p-3 rounded-full transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-white min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      )}

      <div className="max-w-5xl max-h-[85vh] flex flex-col items-center px-2" onClick={(e) => e.stopPropagation()}>
        <img
          src={normalizeImageUrl(imageUrl)}
          alt={title}
          onError={handleImageError}
          className="max-h-[65vh] sm:max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
        />
        <div className="mt-3 sm:mt-4 text-center max-w-2xl px-2">
          <h3 className="text-white text-base sm:text-xl font-bold font-serif">{title}</h3>
          {description && <p className="text-gray-300 text-xs sm:text-sm mt-1 leading-relaxed">{description}</p>}
        </div>
      </div>
    </div>
  );
};
