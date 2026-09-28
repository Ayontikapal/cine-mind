'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { LocalStore, DEFAULT_USER_PREFERENCES } from '@/lib/storage/local-store';

const GENRES = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime',
  'Documentary', 'Drama', 'Fantasy', 'Horror', 'Mystery',
  'Romance', 'Sci-Fi', 'Thriller', 'Western'
];

export const OnboardingFlow: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(['Sci-Fi', 'Thriller']);
  const [actors, setActors] = useState('Leonardo DiCaprio, Amy Adams');
  const [directors, setDirectors] = useState('Christopher Nolan, Denis Villeneuve');
  const [languages, setLanguages] = useState<string[]>(['en']);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleFinish = async () => {
    setIsGenerating(true);

    const actorList = actors.split(',').map((s) => s.trim()).filter(Boolean);
    const directorList = directors.split(',').map((s) => s.trim()).filter(Boolean);

    const initialAffinity: Record<string, number> = {};
    GENRES.forEach((g) => {
      initialAffinity[g] = selectedGenres.includes(g) ? 88 : 35;
    });

    const preferences = {
      ...DEFAULT_USER_PREFERENCES,
      favorite_genres: selectedGenres.length ? selectedGenres : ['Sci-Fi', 'Drama'],
      favorite_actors: actorList.length ? actorList : ['Leonardo DiCaprio'],
      favorite_directors: directorList.length ? directorList : ['Christopher Nolan'],
      preferred_languages: languages,
      genre_affinity: initialAffinity,
      profile_summary: `Drawn to ${selectedGenres.join(', ')} films featuring narratives by ${directorList.join(', ') || 'acclaimed visionaries'}.`,
    };

    LocalStore.setPreferences(preferences);

    // Call profile analyze API to refine profile with LLM if online
    await fetch('/api/profile/analyze', { method: 'POST' }).catch(() => {});

    setIsGenerating(false);
    router.push('/');
  };

  return (
    <div className="max-w-2xl mx-auto glass-panel rounded-3xl p-6 sm:p-10 border border-purple-pastel/30 shadow-2xl space-y-8">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-deep to-red-deep flex items-center justify-center mx-auto shadow-lg shadow-purple-deep/40">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-cinetext-main">
          {step === 1 ? 'What kind of movies do you love?' : 'Fine-Tune Your Taste DNA'}
        </h1>
        <p className="text-xs text-cinetext-muted">
          {step === 1
            ? 'Select your favorite genres to build your baseline CineMind recommendation engine.'
            : 'Tell us about directors and actors that captivate you.'}
        </p>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {GENRES.map((genre) => {
              const selected = selectedGenres.includes(genre);
              return (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`p-3.5 rounded-2xl text-xs font-bold border transition-all flex items-center justify-between ${
                    selected
                      ? 'bg-gradient-to-r from-purple-deep to-red-deep text-white border-purple-pastel/40 shadow-lg shadow-purple-deep/20 scale-[1.02]'
                      : 'bg-surface/80 border-surface-border text-cinetext-muted hover:text-cinetext-main hover:bg-surface-hover'
                  }`}
                >
                  <span>{genre}</span>
                  {selected && <Check className="w-4 h-4 text-white" />}
                </button>
              );
            })}
          </div>

          <div className="flex justify-end">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setStep(2)}
              disabled={selectedGenres.length === 0}
            >
              Continue <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-cinetext-main mb-1">
                Favorite Actors (comma separated)
              </label>
              <input
                type="text"
                value={actors}
                onChange={(e) => setActors(e.target.value)}
                placeholder="e.g. Leonardo DiCaprio, Amy Adams, Ryan Gosling"
                className="w-full bg-background border border-surface-border rounded-xl px-4 py-2.5 text-xs text-cinetext-main focus:outline-none focus:border-purple-pastel"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-cinetext-main mb-1">
                Favorite Directors (comma separated)
              </label>
              <input
                type="text"
                value={directors}
                onChange={(e) => setDirectors(e.target.value)}
                placeholder="e.g. Christopher Nolan, Denis Villeneuve, Bong Joon-ho"
                className="w-full bg-background border border-surface-border rounded-xl px-4 py-2.5 text-xs text-cinetext-main focus:outline-none focus:border-purple-pastel"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-4">
            <Button variant="ghost" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button variant="primary" size="lg" isLoading={isGenerating} onClick={handleFinish}>
              Generate Taste DNA <Sparkles className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
