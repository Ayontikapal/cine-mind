import React from 'react';

interface GenreChartProps {
  genreAffinity: Record<string, number>;
}

export const GenreChart: React.FC<GenreChartProps> = ({ genreAffinity }) => {
  const sorted = Object.entries(genreAffinity || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7);

  return (
    <div className="space-y-4">
      {sorted.map(([genre, pct]) => (
        <div key={genre} className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-cinetext-main">{genre}</span>
            <span className="text-purple-pastel font-bold">{pct}%</span>
          </div>
          <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden border border-surface-border">
            <div
              className="h-full bg-gradient-to-r from-purple-deep via-purple-pastel to-red-primary rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(100, Math.max(5, pct))}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
