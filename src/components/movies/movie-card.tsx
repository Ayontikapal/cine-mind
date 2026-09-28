'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Info, Sparkles } from 'lucide-react';
import { Movie } from '@/types/movie';
import { MatchBadge } from '../recommendations/match-badge';
import { LikeButton } from './like-button';
import { WatchlistButton } from './watchlist-button';
import { Modal } from '../ui/modal';
import { WhyThisMovie } from '../recommendations/why-this-movie';

interface MovieCardProps {
  movie: Movie;
  onOpenTrailer?: (url: string) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onOpenTrailer }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showWhyModal, setShowWhyModal] = useState(false);

  const releaseYear = new Date(movie.release_date).getFullYear() || 2024;
  const matchPct = movie.match_percentage || 88;

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05, y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative w-[180px] sm:w-[220px] shrink-0 rounded-2xl bg-surface border border-surface-border overflow-hidden shadow-xl transition-shadow hover:shadow-purple-deep/30"
      >
        <Link href={`/movies/${movie.id}`} className="block relative aspect-[2/3] w-full overflow-hidden bg-secondary">
          <Image
            src={movie.poster_url}
            alt={movie.title}
            fill
            sizes="(max-width: 640px) 180px, 220px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />

          {/* Top badge */}
          <div className="absolute top-2.5 right-2.5 z-10">
            <MatchBadge percentage={matchPct} size="sm" />
          </div>

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-20 bg-gradient-to-t from-background via-surface/90 to-transparent p-4 flex flex-col justify-between"
          >
            <div className="flex justify-end">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowWhyModal(true);
                }}
                className="flex items-center gap-1 bg-purple-deep/80 hover:bg-purple-deep text-white text-[10px] px-2 py-1 rounded-full border border-purple-pastel/30"
              >
                <Sparkles className="w-3 h-3" /> Why this?
              </button>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-xs text-purple-pastel font-semibold truncate">
                  {movie.genres.slice(0, 2).join(' • ')}
                </p>
                <h4 className="font-bold text-sm text-cinetext-main leading-snug line-clamp-2">
                  {movie.title}
                </h4>
                <p className="text-[11px] text-cinetext-muted mt-0.5">
                  {releaseYear} • ⭐ {movie.rating}
                </p>
              </div>

              {/* Action buttons on hover */}
              <div className="flex items-center justify-between pt-2 border-t border-surface-border/60">
                <div className="flex items-center gap-1">
                  <WatchlistButton movieId={movie.id} variant="icon" />
                  <LikeButton movieId={movie.id} />
                </div>
                {movie.trailer_url && onOpenTrailer && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onOpenTrailer(movie.trailer_url!);
                    }}
                    className="p-2 rounded-xl bg-red-deep text-white hover:bg-red-primary transition-colors"
                    title="Watch Trailer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Card Footer below image */}
        <div className="p-3 bg-surface">
          <h3 className="font-semibold text-xs text-cinetext-main truncate">{movie.title}</h3>
          <div className="flex justify-between items-center mt-1 text-[11px] text-cinetext-muted">
            <span>{releaseYear}</span>
            <span className="text-purple-pastel font-medium">{matchPct}% Match</span>
          </div>
        </div>
      </motion.div>

      {/* Why This Movie Modal */}
      <Modal isOpen={showWhyModal} onClose={() => setShowWhyModal(false)} title={`Recommendation Insight: ${movie.title}`}>
        <WhyThisMovie
          movieTitle={movie.title}
          matchPercentage={matchPct}
          reason={movie.match_reason || `Strong affinity with your preferences for ${movie.genres[0]} films.`}
        />
      </Modal>
    </>
  );
};
