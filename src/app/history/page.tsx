'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { History, Trash2, Film, ThumbsUp, Star, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LocalStore } from '@/lib/storage/local-store';
import { UserInteraction } from '@/types/user';
import { MOCK_MOVIES } from '@/lib/tmdb/mock-data';

export default function HistoryPage() {
  const [interactions, setInteractions] = useState<UserInteraction[]>([]);

  useEffect(() => {
    setInteractions(LocalStore.getInteractions());
  }, []);

  const handleClear = () => {
    LocalStore.clearHistory();
    setInteractions([]);
  };

  const getMovieTitle = (id: string) => {
    const found = MOCK_MOVIES.find((m) => m.id === id || `tmdb_${m.tmdb_id}` === id);
    return found ? found.title : 'Movie ID ' + id;
  };

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <ThumbsUp className="w-4 h-4 text-purple-pastel" />;
      case 'rating':
        return <Star className="w-4 h-4 text-amber-400" />;
      case 'watchlist_add':
        return <Bookmark className="w-4 h-4 text-red-primary" />;
      default:
        return <Film className="w-4 h-4 text-cinetext-muted" />;
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-cinetext-main flex items-center gap-2">
            Interaction History <History className="w-6 h-6 text-purple-pastel" />
          </h1>
          <p className="text-xs text-cinetext-muted">
            Tracked activities that inform your CineMind recommendation score.
          </p>
        </div>

        {interactions.length > 0 && (
          <Button variant="outline" size="sm" onClick={handleClear} className="border-red-primary/40 text-red-primary">
            <Trash2 className="w-4 h-4" /> Clear History
          </Button>
        )}
      </div>

      {interactions.length === 0 ? (
        <div className="bg-surface/50 border border-surface-border rounded-2xl p-12 text-center space-y-3">
          <History className="w-10 h-10 text-cinetext-dim mx-auto" />
          <p className="text-sm font-bold text-cinetext-main">No history recorded</p>
          <p className="text-xs text-cinetext-muted">Start interacting with movies to train your AI recommendation engine.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {interactions.map((item) => (
            <div
              key={item.id}
              className="bg-surface/80 border border-surface-border p-4 rounded-2xl flex items-center justify-between hover:bg-surface transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-secondary border border-surface-border">
                  {getInteractionIcon(item.interaction_type)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-cinetext-main">{getMovieTitle(item.movie_id)}</h4>
                  <p className="text-xs text-cinetext-muted capitalize">
                    Action: {item.interaction_type.replace('_', ' ')}
                    {item.rating ? ` (${item.rating}/5 Stars)` : ''}
                  </p>
                </div>
              </div>

              <span className="text-[11px] text-cinetext-dim font-mono">
                {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
