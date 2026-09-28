'use client';

import React, { useEffect, useState } from 'react';
import { HeroMovie } from '@/components/movies/hero-movie';
import { MovieCarousel } from '@/components/movies/movie-carousel';
import { IntentBar } from '@/components/recommendations/intent-bar';
import { SkeletonHero, SkeletonMovieCard } from '@/components/ui/skeleton';
import { TrailerModal } from '@/components/movies/trailer-modal';
import { LocalStore } from '@/lib/storage/local-store';

export default function DashboardPage() {
  const [feeds, setFeeds] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTrailer, setActiveTrailer] = useState<string | null>(null);
  const [intentQuery, setIntentQuery] = useState<string | undefined>(undefined);

  const fetchFeeds = async (intent?: string) => {
    setLoading(true);
    try {
      const url = intent ? `/api/recommendations?intent=${encodeURIComponent(intent)}` : '/api/recommendations';
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setFeeds(data.data);
      }
    } catch (err) {
      console.warn('Failed to load feeds:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedIntent = LocalStore.getCurrentIntent();
    if (savedIntent?.query) setIntentQuery(savedIntent.query);
    fetchFeeds(savedIntent?.query);
  }, []);

  const handleApplyIntent = (query: string) => {
    setIntentQuery(query);
    LocalStore.setCurrentIntent({ query, timestamp: Date.now() });
    fetchFeeds(query);
  };

  const handleClearIntent = () => {
    setIntentQuery(undefined);
    LocalStore.setCurrentIntent({ timestamp: 0 });
    fetchFeeds();
  };

  if (loading) {
    return (
      <div className="space-y-12 py-6">
        <SkeletonHero />
        <div className="space-y-4">
          <div className="h-6 bg-secondary rounded w-48 animate-pulse" />
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3, 4, 5].map((i) => (
              <SkeletonMovieCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const { heroMovie, pickedForYou, becauseYouLiked, trendingForYou, hiddenGems, continueExploring, favGenre } = feeds || {};

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Movie Banner */}
      {heroMovie && (
        <HeroMovie
          movie={heroMovie}
          onOpenTrailer={(url) => setActiveTrailer(url)}
        />
      )}

      {/* Ephemeral Current Watching Intent Bar */}
      <IntentBar
        currentIntentQuery={intentQuery}
        onApplyIntent={handleApplyIntent}
        onClearIntent={handleClearIntent}
      />

      {/* Recommendation Carousels */}
      {pickedForYou?.length > 0 && (
        <MovieCarousel
          title="Picked for You"
          subtitle="Engineered with 7-factor similarity calculations tailored to your taste profile"
          movies={pickedForYou.map((r: any) => r.movie || r)}
          onOpenTrailer={(url) => setActiveTrailer(url)}
        />
      )}

      {becauseYouLiked?.length > 0 && (
        <MovieCarousel
          title={`Because You Liked ${favGenre || 'Sci-Fi'}`}
          subtitle="Top genre compatibility alignment"
          movies={becauseYouLiked.map((r: any) => r.movie || r)}
          onOpenTrailer={(url) => setActiveTrailer(url)}
        />
      )}

      {trendingForYou?.length > 0 && (
        <MovieCarousel
          title="Trending for You"
          subtitle="Critically acclaimed movies matching your story complexity preference"
          movies={trendingForYou.map((r: any) => r.movie || r)}
          onOpenTrailer={(url) => setActiveTrailer(url)}
        />
      )}

      {hiddenGems?.length > 0 && (
        <MovieCarousel
          title="Hidden Gems"
          subtitle="High personalized match percentage under-the-radar discoveries"
          movies={hiddenGems.map((r: any) => r.movie || r)}
          onOpenTrailer={(url) => setActiveTrailer(url)}
        />
      )}

      {continueExploring?.length > 0 && (
        <MovieCarousel
          title="Continue Exploring"
          subtitle="Diverse recommendations expanding your cinematic horizon"
          movies={continueExploring.map((r: any) => r.movie || r)}
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
