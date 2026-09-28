'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '@/types/movie';
import { MovieCard } from './movie-card';

interface MovieCarouselProps {
  title: string;
  subtitle?: string;
  movies: Movie[];
  onOpenTrailer?: (url: string) => void;
}

export const MovieCarousel: React.FC<MovieCarouselProps> = ({
  title,
  subtitle,
  movies,
  onOpenTrailer,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -500 : 500;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <section className="space-y-3 py-4">
      <div className="flex items-end justify-between px-1">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-cinetext-main tracking-tight">
            {title}
          </h2>
          {subtitle && <p className="text-xs text-cinetext-muted mt-0.5">{subtitle}</p>}
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-xl bg-surface border border-surface-border text-cinetext-muted hover:text-cinetext-main hover:bg-surface-hover transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-xl bg-surface border border-surface-border text-cinetext-muted hover:text-cinetext-main hover:bg-surface-hover transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-3 px-1 scroll-smooth"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onOpenTrailer={onOpenTrailer} />
        ))}
      </div>
    </section>
  );
};
