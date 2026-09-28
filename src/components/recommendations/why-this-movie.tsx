'use client';

import React from 'react';
import { Sparkles, Brain, Cpu, ShieldCheck } from 'lucide-react';
import { RecommendationScoreBreakdown } from '@/types/recommendation';
import { MatchBadge } from './match-badge';

interface WhyThisMovieProps {
  movieTitle: string;
  matchPercentage: number;
  reason: string;
  scoreBreakdown?: RecommendationScoreBreakdown;
}

export const WhyThisMovie: React.FC<WhyThisMovieProps> = ({
  movieTitle,
  matchPercentage,
  reason,
  scoreBreakdown,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-surface-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-deep to-red-deep flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-cinetext-main">Why CineMind picked this</h3>
            <p className="text-xs text-cinetext-muted">Personalized Recommendation Analysis</p>
          </div>
        </div>
        <MatchBadge percentage={matchPercentage} size="lg" />
      </div>

      <div className="bg-gradient-to-r from-purple-deep/15 via-surface to-red-deep/15 border border-purple-pastel/30 rounded-2xl p-4 sm:p-5 relative overflow-hidden">
        <div className="flex gap-3">
          <Sparkles className="w-5 h-5 text-purple-pastel shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm text-cinetext-main leading-relaxed font-medium">
              "{reason}"
            </p>
            <div className="flex items-center gap-1.5 pt-2 text-[11px] text-cinetext-dim">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-pastel" />
              <span>Privacy protected: Raw URL & browser timestamps are scrubbed.</span>
            </div>
          </div>
        </div>
      </div>

      {scoreBreakdown && (
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center text-xs font-semibold text-cinetext-muted">
            <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5" /> Multi-Factor Score Signals</span>
            <span>Total Weighted Score: {Math.round(scoreBreakdown.total_score * 100)}%</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <MetricBar label="Semantic Similarity (35%)" value={Math.round(scoreBreakdown.semantic_score * 100)} />
            <MetricBar label="Genre Compatibility (20%)" value={Math.round(scoreBreakdown.genre_score * 100)} />
            <MetricBar label="Actor/Director Affinity (15%)" value={Math.round(scoreBreakdown.cast_crew_score * 100)} />
            <MetricBar label="Search Intent Match (10%)" value={Math.round(scoreBreakdown.intent_score * 100)} />
            <MetricBar label="Interaction Pattern (10%)" value={Math.round(scoreBreakdown.interaction_score * 100)} />
            <MetricBar label="Popularity & Recency (10%)" value={Math.round(scoreBreakdown.recency_score * 100)} />
          </div>
        </div>
      )}
    </div>
  );
};

const MetricBar: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="bg-surface/80 border border-surface-border p-2.5 rounded-xl space-y-1">
    <div className="flex justify-between text-[11px]">
      <span className="text-cinetext-muted">{label}</span>
      <span className="font-bold text-purple-pastel">{value}%</span>
    </div>
    <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-purple-deep via-purple-pastel to-red-primary rounded-full"
        style={{ width: `${Math.min(100, Math.max(5, value))}%` }}
      />
    </div>
  </div>
);
