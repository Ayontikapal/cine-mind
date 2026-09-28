'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { LocalStore } from '@/lib/storage/local-store';

interface RatingControlProps {
  movieId: string;
  initialRating?: number;
  onRate?: (rating: number) => void;
}

export const RatingControl: React.FC<RatingControlProps> = ({
  movieId,
  initialRating = 0,
  onRate,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRate = (value: number) => {
    setRating(value);
    LocalStore.recordInteraction({
      user_id: 'demo-user-123',
      movie_id: movieId,
      interaction_type: 'rating',
      rating: value,
    });
    if (onRate) onRate(value);
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = (hoverRating || rating) >= star;
        return (
          <button
            key={star}
            type="button"
            onClick={() => handleRate(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="p-1 transition-transform hover:scale-125 focus:outline-none"
          >
            <Star
              className={`w-5 h-5 ${
                active
                  ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                  : 'text-cinetext-dim'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};
