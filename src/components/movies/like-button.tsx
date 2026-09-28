'use client';

import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { LocalStore } from '@/lib/storage/local-store';

interface LikeButtonProps {
  movieId: string;
  initialState?: 'like' | 'dislike' | null;
  onStateChange?: (state: 'like' | 'dislike' | null) => void;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  movieId,
  initialState = null,
  onStateChange,
}) => {
  const [state, setState] = useState<'like' | 'dislike' | null>(initialState);

  const handleToggle = (type: 'like' | 'dislike') => {
    const newState = state === type ? null : type;
    setState(newState);

    if (newState) {
      LocalStore.recordInteraction({
        user_id: 'demo-user-123',
        movie_id: movieId,
        interaction_type: newState,
      });
    }

    if (onStateChange) onStateChange(newState);
  };

  return (
    <div className="flex items-center gap-1 bg-surface/80 border border-surface-border p-1 rounded-xl">
      <button
        onClick={() => handleToggle('like')}
        title="Like movie"
        className={`p-1.5 rounded-lg transition-colors ${
          state === 'like'
            ? 'bg-purple-deep text-white'
            : 'text-cinetext-muted hover:text-cinetext-main hover:bg-surface-hover'
        }`}
      >
        <ThumbsUp className="w-4 h-4" />
      </button>

      <button
        onClick={() => handleToggle('dislike')}
        title="Dislike movie"
        className={`p-1.5 rounded-lg transition-colors ${
          state === 'dislike'
            ? 'bg-red-deep text-white'
            : 'text-cinetext-muted hover:text-cinetext-main hover:bg-surface-hover'
        }`}
      >
        <ThumbsDown className="w-4 h-4" />
      </button>
    </div>
  );
};
