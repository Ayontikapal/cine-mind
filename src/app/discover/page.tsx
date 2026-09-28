'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, Sparkles } from 'lucide-react';
import { MovieGrid } from '@/components/movies/movie-grid';
import { TrailerModal } from '@/components/movies/trailer-modal';
import { SkeletonMovieCard } from '@/components/ui/skeleton';
import { Movie } from '@/types/movie';

const GENRES = ['All', 'Sci-Fi', 'Action', 'Thriller', 'Drama', 'Comedy', 'Mystery', 'Animation', 'Adventure'];

function DiscoverContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTrailer, setActiveTrailer] = useState<string | null>(null);

  const fetchMovies = async (searchQ?: string) => {
    setLoading(true);
    try {
      let url = '/api/movies';
      if (searchQ) {
        url = `/api/movies/search?q=${encodeURIComponent(searchQ)}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setMovies(data.data || []);
      }
    } catch (err) {
      console.warn('Failed to load movies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(initialQuery);
  }, [initialQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMovies(query);
  };

  const filteredMovies = movies.filter((m) => {
    const genreMatch = selectedGenre === 'All' || m.genres.includes(selectedGenre);
    const ratingMatch = m.rating >= minRating;
    return genreMatch && ratingMatch;
  });

  return (
    <div className="space-y-8 pb-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-cinetext-main flex items-center gap-2">
          Discover Catalog <Sparkles className="w-6 h-6 text-purple-pastel" />
        </h1>
        <p className="text-xs text-cinetext-muted">
          Browse through top rated, trending, and filtered cinematic releases.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-surface/80 border border-surface-border rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
        <form onSubmit={handleSearchSubmit} className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search movies by title, actor, or keyword..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-background border border-surface-border text-cinetext-main text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-purple-pastel"
            />
            <Search className="w-4 h-4 text-cinetext-dim absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-deep to-red-deep text-white px-5 py-3 rounded-xl text-xs font-bold shadow-md hover:from-purple-pastel hover:to-red-primary transition-all"
          >
            Search
          </button>
        </form>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-surface-border">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-cinetext-muted font-semibold flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-purple-pastel" /> Genre:
            </span>
            {GENRES.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                  selectedGenre === g
                    ? 'bg-purple-deep text-white border-purple-pastel/40 shadow-sm'
                    : 'bg-secondary/60 text-cinetext-muted border-surface-border hover:bg-secondary'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-cinetext-muted">
            <span>Min Rating:</span>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="bg-background border border-surface-border text-cinetext-main text-xs rounded-lg px-2.5 py-1 focus:outline-none"
            >
              <option value={0}>All Ratings</option>
              <option value={7.5}>⭐ 7.5+</option>
              <option value={8.0}>⭐ 8.0+</option>
              <option value={8.5}>⭐ 8.5+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Movies Grid Display */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <SkeletonMovieCard key={i} />
          ))}
        </div>
      ) : (
        <MovieGrid
          movies={filteredMovies}
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

export default function DiscoverPage() {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-12">
          {[1, 2, 3, 4, 5].map((i) => (
            <SkeletonMovieCard key={i} />
          ))}
        </div>
      }
    >
      <DiscoverContent />
    </Suspense>
  );
}
