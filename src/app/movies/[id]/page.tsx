'use client';

import React, { useEffect, useState, use } from 'react';
import Image from 'next/image';
import { Play, Sparkles, Star, Clock, Calendar, Film, UserCheck } from 'lucide-react';
import { Movie, MovieWatchProviders } from '@/types/movie';
import { MatchBadge } from '@/components/recommendations/match-badge';
import { WatchlistButton } from '@/components/movies/watchlist-button';
import { LikeButton } from '@/components/movies/like-button';
import { RatingControl } from '@/components/movies/rating-control';
import { WatchProviderSection } from '@/components/movies/watch-provider';
import { WhyThisMovie } from '@/components/recommendations/why-this-movie';
import { TrailerModal } from '@/components/movies/trailer-modal';
import { Button } from '@/components/ui/button';

export default function MovieDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [movie, setMovie] = useState<Movie | null>(null);
  const [watchProviders, setWatchProviders] = useState<MovieWatchProviders | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTrailer, setActiveTrailer] = useState<string | null>(null);

  useEffect(() => {
    async function loadMovie() {
      try {
        const res = await fetch(`/api/movies/${id}`);
        const data = await res.json();
        if (data.success && data.data) {
          setMovie(data.data);
          setWatchProviders(data.data.watch_providers);
        }
      } catch (err) {
        console.warn('Failed to load movie details:', err);
      } finally {
        setLoading(false);
      }
    }
    loadMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center space-y-4">
        <div className="w-10 h-10 border-4 border-purple-pastel border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-cinetext-muted">Retrieving cinematic metadata...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="py-20 text-center space-y-3">
        <h2 className="text-xl font-bold text-cinetext-main">Movie Not Found</h2>
        <p className="text-xs text-cinetext-muted">The requested title could not be located in our index.</p>
      </div>
    );
  }

  const releaseYear = new Date(movie.release_date).getFullYear() || 2024;
  const matchPct = movie.match_percentage || 94;

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Backdrop Banner */}
      <div className="relative w-full h-[60vh] min-h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-purple-pastel/20">
        <Image
          src={movie.backdrop_url || movie.poster_url}
          alt={movie.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
          unoptimized
        />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-purple-red-glow opacity-60" />
      </div>

      {/* Main Content Layout */}
      <div className="-mt-32 relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Poster & Actions */}
        <div className="space-y-6">
          <div className="relative aspect-[2/3] w-full max-w-[320px] mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl border border-purple-pastel/30">
            <Image
              src={movie.poster_url}
              alt={movie.title}
              fill
              sizes="(max-width: 1024px) 320px, 320px"
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Interactive Controls */}
          <div className="bg-surface/80 border border-surface-border rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cinetext-muted">Rate this film</span>
              <RatingControl movieId={movie.id} />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-surface-border">
              <span className="text-xs font-bold text-cinetext-muted">Reaction</span>
              <LikeButton movieId={movie.id} />
            </div>

            <div className="pt-2">
              <WatchlistButton movieId={movie.id} variant="button" />
            </div>
          </div>
        </div>

        {/* Right Column: Information & Recommendations */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <MatchBadge percentage={matchPct} size="lg" />
              <span className="text-xs text-cinetext-muted font-semibold flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-purple-pastel" /> {releaseYear}
              </span>
              <span className="text-xs text-cinetext-muted font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-purple-pastel" /> {movie.runtime} min
              </span>
              <span className="text-xs text-cinetext-muted font-semibold flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400" /> {movie.rating}/10
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-cinetext-main tracking-tight">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="text-sm italic text-purple-pastel font-medium">"{movie.tagline}"</p>
            )}

            <div className="flex flex-wrap gap-2 pt-1">
              {movie.genres.map((g) => (
                <span
                  key={g}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-purple-deep/30 text-purple-pastel border border-purple-pastel/20"
                >
                  {g}
                </span>
              ))}
            </div>

            <p className="text-sm text-cinetext-muted leading-relaxed pt-2">
              {movie.description}
            </p>

            {movie.trailer_url && (
              <div className="pt-2">
                <Button variant="primary" size="lg" onClick={() => setActiveTrailer(movie.trailer_url!)}>
                  <Play className="w-5 h-5 fill-current" /> Watch Official Trailer
                </Button>
              </div>
            )}
          </div>

          {/* Why This Movie Recommendation Analysis */}
          <WhyThisMovie
            movieTitle={movie.title}
            matchPercentage={matchPct}
            reason={movie.match_reason || `Strong affinity with your story complexity preference and favorite ${movie.genres[0]} themes.`}
          />

          {/* Cast & Director */}
          <div className="bg-surface/80 border border-surface-border rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-cinetext-main flex items-center gap-2">
              <Film className="w-4 h-4 text-purple-pastel" /> Cast & Filmmakers
            </h3>

            {movie.directors && movie.directors.length > 0 && (
              <div>
                <p className="text-xs text-cinetext-muted font-semibold">Director</p>
                <p className="text-sm font-bold text-cinetext-main">{movie.directors.map(d => d.name).join(', ')}</p>
              </div>
            )}

            {movie.cast && movie.cast.length > 0 && (
              <div>
                <p className="text-xs text-cinetext-muted font-semibold mb-2">Lead Cast</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {movie.cast.map((c) => (
                    <div key={c.name} className="bg-secondary/60 p-2.5 rounded-xl border border-surface-border">
                      <p className="text-xs font-bold text-cinetext-main truncate">{c.name}</p>
                      <p className="text-[11px] text-cinetext-dim truncate">{c.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Streaming Availability */}
          <WatchProviderSection providers={watchProviders} />
        </div>
      </div>

      {/* Global Trailer Player Modal */}
      <TrailerModal
        isOpen={Boolean(activeTrailer)}
        onClose={() => setActiveTrailer(null)}
        trailerUrl={activeTrailer}
        title={`Trailer: ${movie.title}`}
      />
    </div>
  );
}
