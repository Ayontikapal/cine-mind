'use client';

import React, { useState, useEffect } from 'react';
import { Bookmark, Check, Plus } from 'lucide-react';
import { LocalStore } from '@/lib/storage/local-store';
import { Button } from '@/components/ui/button';

interface WatchlistButtonProps {
  movieId: string;
  variant?: 'icon' | 'button';
}

export const WatchlistButton: React.FC<WatchlistButtonProps> = ({
  movieId,
  variant = 'button',
}) => {
  const [inList, setInList] = useState(false);

  useEffect(() => {
    const list = LocalStore.getWatchlist();
    setInList(list.includes(movieId));
  }, [movieId]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = LocalStore.toggleWatchlist(movieId);
    setInList(added);

    LocalStore.recordInteraction({
      user_id: 'demo-user-123',
      movie_id: movieId,
      interaction_type: added ? 'watchlist_add' : 'watchlist_remove',
    });
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={handleToggle}
        title={inList ? 'Remove from My List' : 'Add to My List'}
        className={`p-2 rounded-xl transition-all ${
          inList
            ? 'bg-purple-deep text-white border border-purple-pastel/40'
            : 'bg-surface/80 text-cinetext-muted hover:text-cinetext-main border border-surface-border hover:bg-surface-hover'
        }`}
      >
        {inList ? <Check className="w-4 h-4 text-purple-pastel" /> : <Plus className="w-4 h-4" />}
      </button>
    );
  }

  return (
    <Button
      variant={inList ? 'outline' : 'secondary'}
      size="md"
      onClick={handleToggle}
      className={inList ? 'border-purple-pastel text-purple-pastel' : ''}
    >
      {inList ? (
        <>
          <Check className="w-4 h-4 text-purple-pastel" /> In My List
        </>
      ) : (
        <>
          <Plus className="w-4 h-4" /> Add to My List
        </>
      )}
    </Button>
  );
};
