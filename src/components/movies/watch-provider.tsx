import React from 'react';
import Image from 'next/image';
import { ExternalLink, Tv } from 'lucide-react';
import { MovieWatchProviders } from '@/types/movie';

interface WatchProviderProps {
  providers?: MovieWatchProviders | null;
}

export const WatchProviderSection: React.FC<WatchProviderProps> = ({ providers }) => {
  const flatrate = providers?.flatrate || [];
  const rent = providers?.rent || [];
  const buy = providers?.buy || [];

  const hasAnyProvider = flatrate.length > 0 || rent.length > 0 || buy.length > 0;

  if (!hasAnyProvider) {
    return (
      <div className="bg-surface/50 border border-surface-border rounded-2xl p-5 text-center space-y-2">
        <Tv className="w-8 h-8 text-cinetext-dim mx-auto" />
        <p className="text-xs font-semibold text-cinetext-muted">Availability information unavailable</p>
        <p className="text-[11px] text-cinetext-dim">Check local theater listings or digital storefronts.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface/80 border border-purple-pastel/20 rounded-2xl p-6 space-y-5 shadow-xl">
      <div className="flex items-center gap-2">
        <Tv className="w-5 h-5 text-purple-pastel" />
        <h3 className="text-base font-bold text-cinetext-main">Where to Watch</h3>
      </div>

      {flatrate.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-purple-pastel">Stream On</p>
          <div className="flex flex-wrap gap-3">
            {flatrate.map((prov) => (
              <ProviderChip key={prov.provider_id} provider={prov} />
            ))}
          </div>
        </div>
      )}

      {rent.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-cinetext-muted">Rent On</p>
          <div className="flex flex-wrap gap-3">
            {rent.map((prov) => (
              <ProviderChip key={prov.provider_id} provider={prov} />
            ))}
          </div>
        </div>
      )}

      {buy.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-cinetext-muted">Buy On</p>
          <div className="flex flex-wrap gap-3">
            {buy.map((prov) => (
              <ProviderChip key={prov.provider_id} provider={prov} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ProviderChip: React.FC<{ provider: any }> = ({ provider }) => (
  <a
    href={provider.link || '#'}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2.5 bg-secondary hover:bg-secondary-hover border border-surface-border px-3.5 py-2 rounded-xl text-xs font-medium text-cinetext-main transition-colors group"
  >
    {provider.logo_path && (
      <div className="relative w-5 h-5 rounded overflow-hidden shrink-0">
        <Image src={provider.logo_path} alt={provider.provider_name} fill className="object-cover" unoptimized />
      </div>
    )}
    <span>{provider.provider_name}</span>
    <ExternalLink className="w-3.5 h-3.5 text-cinetext-dim group-hover:text-purple-pastel transition-colors" />
  </a>
);
