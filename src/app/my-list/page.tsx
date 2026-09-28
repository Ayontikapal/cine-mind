'use client';

import React, { useEffect, useState } from 'react';
import { Bookmark, Heart, Star } from 'lucide-react';
import { MovieGrid } from '@/components/movies/movie-grid';
import { TrailerModal } from '@/components/movies/trailer-modal';
import { LocalStore } from '@/lib/storage/local-store';
import { Movie } from '@/types/movie';
import { MOCK_MOVIES } from '@/lib/tmdb/mock-data';

export default function MyListPage() {
  const [activeTab, setActiveTab] = useState<'watchlist' | 'liked' | 'ratings'>('watchlist');
  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);
  const [likedMovies, setLikedMovies] = useState<Movie[]>([]);
  const [activeTrailer, setActiveTrailer] = useState<string | null>(null);

  useEffect(() => {
    const listIds = LocalStore.getWatchlist();
    const interactions = LocalStore.getInteractions();

    const likedIds = interactions
      .filter((i) => i.interaction_type === 'like')
      .map((i) => i.movie_id);

    const wMovies = MOCK_MOVIES.filter((m) => listIds.includes(m.id) || listIds.includes(`tmdb_${m.tmdb_id}`));
    const lMovies = MOCK_MOVIES.filter((m) => likedIds.includes(m.id) || likedIds.includes(`tmdb_${m.tmdb_id}`));

    setWatchlistMovies(wMovies.length ? wMovies : MOCK_MOVIES.slice(0, 3));
    setLikedMovies(lMovies.length ? lMovies : MOCK_MOVIES.slice(0, 2));
  }, []);

  return (
    <div className="space-y-8 pb-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-cinetext-main flex items-center gap-2">
          My Saved Library <Bookmark className="w-6 h-6 text-purple-pastel" />
        </h1>
        <p className="text-xs text-cinetext-muted">
          Access your bookmarked watchlist, liked titles, and rated films.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-surface-border pb-3">
        <button
          onClick={() => setActiveTab('watchlist')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'watchlist'
              ? 'bg-purple-deep text-white shadow-md'
              : 'text-cinetext-muted hover:text-cinetext-main hover:bg-surface-hover'
          }`}
        >
          <Bookmark className="w-4 h-4" /> Watchlist ({watchlistMovies.length})
        </button>

        <button
          onClick={() => setActiveTab('liked')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'liked'
              ? 'bg-red-deep text-white shadow-md'
              : 'text-cinetext-muted hover:text-cinetext-main hover:bg-surface-hover'
          }`}
        >
          <Heart className="w-4 h-4" /> Liked Films ({likedMovies.length})
        </button>
      </div>

      {/* Display Grid */}
      {activeTab === 'watchlist' && (
        <MovieGrid
          movies={watchlistMovies}
          onOpenTrailer={(url) => setActiveTrailer(url)}
        />
      )}

      {activeTab === 'liked' && (
        <MovieGrid
          movies={likedMovies}
          onOpenTrailer={(url) => setActiveTrailer(url)}
        />
      )}

      {/* Global Trailer Player Modal */}
      <TrailerModal
        isOpen={Boolean(activeTrailer)}
        onClose={() => setActiveTrailer(null)}
        trailerUrl={activeTrailer}
      />
    </div>
  );
}
