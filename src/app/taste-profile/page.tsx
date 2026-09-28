'use client';

import React, { useEffect, useState } from 'react';
import { Dna, Sparkles, RefreshCw, Film, User, Clapperboard } from 'lucide-react';
import { GenreChart } from '@/components/profile/genre-chart';
import { DNARadar } from '@/components/profile/dna-radar';
import { Button } from '@/components/ui/button';
import { LocalStore, DEFAULT_USER_PREFERENCES } from '@/lib/storage/local-store';
import { UserPreferences } from '@/types/user';

export default function TasteProfilePage() {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_USER_PREFERENCES);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    setPreferences(LocalStore.getPreferences());
  }, []);

  const handleReanalyze = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/profile/analyze', { method: 'POST' });
      const data = await res.json();
      if (data.success && data.data) {
        setPreferences(data.data);
      }
    } catch (err) {
      console.warn('Re-analysis failed:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-10 pb-16 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-deep/30 via-surface to-red-deep/30 border border-purple-pastel/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-deep to-red-deep flex items-center justify-center shadow-lg shadow-purple-deep/40">
              <Dna className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xs text-purple-pastel font-bold tracking-widest uppercase">
                Spotify Wrapped-Style Personalization
              </span>
              <h1 className="text-3xl font-black text-cinetext-main tracking-tight">YOUR MOVIE DNA</h1>
            </div>
          </div>

          <Button variant="primary" size="md" isLoading={isAnalyzing} onClick={handleReanalyze}>
            <RefreshCw className="w-4 h-4 mr-1.5" /> Re-Analyze Signals with LLM
          </Button>
        </div>

        <p className="text-xs sm:text-sm text-cinetext-muted leading-relaxed max-w-3xl">
          "{preferences.profile_summary}"
        </p>
      </div>

      {/* Grid Layout for Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Genre Affinity Breakdown */}
        <section className="bg-surface/80 border border-surface-border rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
          <div className="flex items-center gap-2 pb-2 border-b border-surface-border">
            <Film className="w-5 h-5 text-purple-pastel" />
            <h2 className="text-lg font-bold text-cinetext-main">Genre Affinity Breakdown</h2>
          </div>
          <GenreChart genreAffinity={preferences.genre_affinity} />
        </section>

        {/* Narrative & Stylistic Metrics */}
        <section className="bg-surface/80 border border-surface-border rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
          <div className="flex items-center gap-2 pb-2 border-b border-surface-border">
            <Sparkles className="w-5 h-5 text-red-primary" />
            <h2 className="text-lg font-bold text-cinetext-main">Narrative Stylistic DNA</h2>
          </div>
          <DNARadar dna={preferences.dna_metrics} />
        </section>
      </div>

      {/* Favorites & Evolving Taste */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface/80 border border-surface-border p-6 rounded-2xl space-y-3 shadow-xl">
          <div className="flex items-center gap-2 text-purple-pastel">
            <Clapperboard className="w-4 h-4" />
            <h3 className="text-sm font-bold text-cinetext-main">Favorite Directors</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {preferences.favorite_directors.map((d) => (
              <span key={d} className="px-3 py-1 bg-secondary text-cinetext-main text-xs rounded-xl font-medium border border-surface-border">
                {d}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-surface/80 border border-surface-border p-6 rounded-2xl space-y-3 shadow-xl">
          <div className="flex items-center gap-2 text-purple-pastel">
            <User className="w-4 h-4" />
            <h3 className="text-sm font-bold text-cinetext-main">Favorite Actors</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {preferences.favorite_actors.map((a) => (
              <span key={a} className="px-3 py-1 bg-secondary text-cinetext-main text-xs rounded-xl font-medium border border-surface-border">
                {a}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-surface/80 border border-surface-border p-6 rounded-2xl space-y-3 shadow-xl">
          <div className="flex items-center gap-2 text-purple-pastel">
            <Sparkles className="w-4 h-4" />
            <h3 className="text-sm font-bold text-cinetext-main">Favorite Themes</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {(preferences.themes || ['space', 'time travel', 'artificial intelligence']).map((t) => (
              <span key={t} className="px-3 py-1 bg-purple-deep/20 text-purple-pastel text-xs rounded-xl font-semibold border border-purple-pastel/30">
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
