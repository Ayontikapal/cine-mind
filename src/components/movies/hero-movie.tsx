'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Sparkles, Info } from 'lucide-react';
import { Movie } from '@/types/movie';
import { MatchBadge } from '../recommendations/match-badge';
import { WatchlistButton } from './watchlist-button';
import { Button } from '../ui/button';
import { Modal } from '../ui/modal';
import { WhyThisMovie } from '../recommendations/why-this-movie';

interface HeroMovieProps {
  movie: Movie;
  onOpenTrailer?: (url: string) => void;
}

export const HeroMovie: React.FC<HeroMovieProps> = ({ movie, onOpenTrailer }) => {
  const [showWhyModal, setShowWhyModal] = useState(false);

  const releaseYear = new Date(movie.release_date).getFullYear() || 2024;
  const matchPct = movie.match_percentage || 94;

  return (
    <div className="relative w-full h-[75vh] min-h-[550px] max-h-[750px] rounded-3xl overflow-hidden shadow-2xl border border-purple-pastel/20 mb-10 group">
      {/* Background Image with Gradient Overlay */}
      <Image
        src={movie.backdrop_url || movie.poster_url}
        alt={movie.title}
        fill
        priority
        sizes="100vw"
        className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
        unoptimized
      />

      {/* Atmospheric purple + deep red gradient overlays */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-purple-red-glow opacity-80" />

      {/* Hero Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 z-20 max-w-4xl space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="px-3 py-1 bg-red-deep/90 text-white font-bold text-xs rounded-full uppercase tracking-wider shadow-lg">
            Your Next Obsession
          </span>
          <MatchBadge percentage={matchPct} size="md" />
          <span className="text-xs text-cinetext-muted font-semibold">
            {releaseYear} • {movie.runtime} min • ⭐ {movie.rating}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-cinetext-main tracking-tight leading-none drop-shadow-lg">
          {movie.title}
        </h1>

        <p className="text-xs sm:text-sm text-cinetext-muted line-clamp-3 leading-relaxed max-w-2xl drop-shadow">
          {movie.description}
        </p>

        <div className="flex items-center gap-2 text-xs font-semibold text-purple-pastel">
          <span>{movie.genres.join(' • ')}</span>
        </div>

        {/* Hero Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {movie.trailer_url && onOpenTrailer && (
            <Button
              variant="primary"
              size="lg"
              onClick={() => onOpenTrailer(movie.trailer_url!)}
              className="shadow-xl shadow-red-deep/30"
            >
              <Play className="w-5 h-5 fill-current" /> Watch Trailer
            </Button>
          )}

          <WatchlistButton movieId={movie.id} variant="button" />

          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowWhyModal(true)}
            className="border-purple-pastel/40 text-purple-pastel hover:bg-purple-deep/20"
          >
            <Sparkles className="w-4 h-4" /> Why this?
          </Button>

          <Link href={`/movies/${movie.id}`}>
            <Button variant="ghost" size="lg">
              <Info className="w-4 h-4" /> Details
            </Button>
          </Link>
        </div>
      </div>

      {/* Why This Movie Modal */}
      <Modal isOpen={showWhyModal} onClose={() => setShowWhyModal(false)} title={`AI Recommendation Analysis: ${movie.title}`}>
        <WhyThisMovie
          movieTitle={movie.title}
          matchPercentage={matchPct}
          reason={movie.match_reason || `Highly recommended based on your preferences for ${movie.genres[0]} narratives.`}
        />
      </Modal>
    </div>
  );
};
