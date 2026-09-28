'use client';

import React from 'react';
import { Modal } from '../ui/modal';

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  trailerUrl?: string | null;
  title?: string;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({
  isOpen,
  onClose,
  trailerUrl,
  title = 'Watch Trailer',
}) => {
  const getEmbedUrl = (url?: string | null) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(trailerUrl);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-4xl">
      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-surface-border">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="flex items-center justify-center h-full text-cinetext-muted text-sm">
            Trailer video unavailable.
          </div>
        )}
      </div>
    </Modal>
  );
};
