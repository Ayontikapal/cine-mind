'use client';

import React from 'react';
import { Movie } from '@/types/movie';
import { MovieCard } from './movie-card';

interface MovieGridProps {
  movies: Movie[];
  onOpenTrailer?: (url: string) => void;
}

export const MovieGrid: React.FC<MovieGridProps> = ({ movies, onOpenTrailer }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-16 bg-surface/40 border border-surface-border rounded-2xl">
        <p className="text-sm font-semibold text-cinetext-muted">No movies found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onOpenTrailer={onOpenTrailer} />
      ))}
    </div>
  );
};
