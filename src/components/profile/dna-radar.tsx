import React from 'react';
import { DNAMetrics } from '@/types/user';

interface DNARadarProps {
  dna: DNAMetrics;
}

export const DNARadar: React.FC<DNARadarProps> = ({ dna }) => {
  const metrics = [
    { label: 'Story Complexity', value: dna.story_complexity || 85, color: 'from-purple-deep to-purple-pastel' },
    { label: 'Emotional Depth', value: dna.emotional_depth || 80, color: 'from-red-deep to-red-primary' },
    { label: 'Action Preference', value: dna.action_preference || 60, color: 'from-purple-pastel to-red-primary' },
    { label: 'Romance Preference', value: dna.romance_preference || 40, color: 'from-secondary to-purple-deep' },
    { label: 'Animation Preference', value: dna.animation_preference || 45, color: 'from-purple-deep to-surface-hover' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {metrics.map((m) => (
        <div key={m.label} className="bg-surface/80 border border-surface-border p-4 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-cinetext-main">{m.label}</span>
            <span className="font-black text-purple-pastel text-sm">{m.value}/100</span>
          </div>
          <div className="w-full h-3 bg-secondary rounded-full overflow-hidden p-0.5 border border-surface-border">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${m.color} transition-all duration-1000`}
              style={{ width: `${Math.min(100, Math.max(5, m.value))}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
