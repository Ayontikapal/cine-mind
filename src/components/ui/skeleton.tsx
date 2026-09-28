import React from 'react';

export const SkeletonMovieCard: React.FC = () => {
  return (
    <div className="w-[180px] sm:w-[220px] shrink-0 animate-pulse rounded-xl bg-surface border border-surface-border overflow-hidden">
      <div className="h-[270px] sm:h-[330px] bg-secondary/60" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-secondary rounded w-3/4" />
        <div className="flex justify-between items-center">
          <div className="h-3 bg-secondary rounded w-1/3" />
          <div className="h-5 bg-purple-deep/30 rounded-full w-12" />
        </div>
      </div>
    </div>
  );
};

export const SkeletonHero: React.FC = () => {
  return (
    <div className="w-full h-[70vh] min-h-[500px] animate-pulse bg-secondary/40 rounded-3xl relative overflow-hidden flex items-end p-8 sm:p-12">
      <div className="space-y-4 max-w-2xl w-full">
        <div className="h-6 bg-purple-deep/40 rounded w-1/4" />
        <div className="h-12 bg-secondary rounded w-3/4" />
        <div className="h-16 bg-secondary/80 rounded w-full" />
        <div className="flex gap-4 pt-4">
          <div className="h-12 bg-purple-deep rounded-xl w-36" />
          <div className="h-12 bg-secondary rounded-xl w-36" />
        </div>
      </div>
    </div>
  );
};
