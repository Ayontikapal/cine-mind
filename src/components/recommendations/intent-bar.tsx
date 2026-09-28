'use client';

import React, { useState } from 'react';
import { Sparkles, Compass, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IntentBarProps {
  onApplyIntent: (query: string) => void;
  onClearIntent: () => void;
  currentIntentQuery?: string;
}

export const IntentBar: React.FC<IntentBarProps> = ({
  onApplyIntent,
  onClearIntent,
  currentIntentQuery,
}) => {
  const [query, setQuery] = useState(currentIntentQuery || '');
  const [isExpanded, setIsExpanded] = useState(false);

  const presets = [
    'Mind-bending sci-fi with plot twists',
    'I want something funny tonight',
    'Atmospheric psychological thriller',
    'Emotional drama about space exploration',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onApplyIntent(query.trim());
      setIsExpanded(false);
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-surface via-secondary to-surface border border-purple-pastel/20 rounded-2xl p-4 shadow-xl mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-deep/30 border border-purple-pastel/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-purple-pastel animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-cinetext-main">Current Watching Intent</h3>
              <span className="text-[10px] bg-purple-deep/30 text-purple-pastel px-2 py-0.5 rounded-full border border-purple-pastel/20">
                Ephemeral Filter
              </span>
            </div>
            <p className="text-xs text-cinetext-muted">
              {currentIntentQuery ? (
                <>Currently prioritizing: <strong className="text-purple-pastel">"{currentIntentQuery}"</strong></>
              ) : (
                'Filter recommendations for your exact mood without permanently changing your taste DNA.'
              )}
            </p>
          </div>
        </div>

        {currentIntentQuery ? (
          <Button variant="outline" size="sm" onClick={onClearIntent} className="shrink-0">
            <X className="w-3.5 h-3.5 mr-1" /> Reset to Long-Term Taste
          </Button>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="shrink-0 border-purple-pastel/30"
          >
            <Compass className="w-3.5 h-3.5 mr-1" /> {isExpanded ? 'Close Intent' : 'Set Current Intent'}
          </Button>
        )}
      </div>

      {isExpanded && !currentIntentQuery && (
        <div className="mt-4 pt-4 border-t border-surface-border space-y-3">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="What are you in the mood for right now? (e.g., something funny, dark sci-fi...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-background border border-surface-border rounded-xl px-4 py-2 text-xs text-cinetext-main focus:outline-none focus:border-purple-pastel"
            />
            <Button type="submit" size="sm" variant="primary">
              Apply Mood
            </Button>
          </form>

          <div className="flex flex-wrap gap-2 pt-1">
            <span className="text-[11px] text-cinetext-dim self-center mr-1">Quick Presets:</span>
            {presets.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  setQuery(preset);
                  onApplyIntent(preset);
                  setIsExpanded(false);
                }}
                className="text-[11px] bg-surface-hover hover:bg-purple-deep/30 text-cinetext-muted hover:text-purple-pastel px-3 py-1 rounded-full border border-surface-border transition-colors"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
