import React from 'react';

interface MatchBadgeProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
}

export const MatchBadge: React.FC<MatchBadgeProps> = ({ percentage, size = 'md' }) => {
  const isHigh = percentage >= 85;
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[11px] font-bold',
    md: 'px-2.5 py-1 text-xs font-extrabold',
    lg: 'px-3.5 py-1.5 text-sm font-black',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border shadow-md transition-all ${
        sizeClasses[size]
      } ${
        isHigh
          ? 'bg-gradient-to-r from-purple-deep/90 via-red-deep/90 to-purple-pastel/90 text-white border-purple-pastel/40 shadow-purple-deep/30 match-pill-glow'
          : 'bg-surface/90 text-purple-pastel border-purple-pastel/30'
      }`}
    >
      <span className="mr-1 text-red-primary">✦</span>
      {percentage}% Match
    </span>
  );
};
