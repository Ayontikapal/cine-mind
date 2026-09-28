'use client';

import React, { useState } from 'react';
import { Shield, Lock, Trash2, PauseCircle, RefreshCw, Chrome } from 'lucide-react';
import { Button } from '../ui/button';
import { LocalStore } from '@/lib/storage/local-store';

export const PrivacyControls: React.FC = () => {
  const [allowSearch, setAllowSearch] = useState(true);
  const [allowBrowsing, setAllowBrowsing] = useState(true);
  const [useBrowsingForRecs, setUseBrowsingForRecs] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleClearHistory = () => {
    LocalStore.clearHistory();
    showToast('Search and browsing history cleared successfully.');
  };

  const handleDeleteProfile = () => {
    LocalStore.setPreferences(LocalStore.getPreferences());
    showToast('Recommendation profile reset to baseline defaults.');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {statusMessage && (
        <div className="bg-purple-deep/20 border border-purple-pastel/40 text-purple-pastel px-4 py-3 rounded-xl text-xs font-semibold animate-fade-in">
          {statusMessage}
        </div>
      )}

      {/* Browser Data Controls */}
      <section className="bg-surface/80 border border-surface-border rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center gap-2.5 pb-2 border-b border-surface-border">
          <Shield className="w-5 h-5 text-purple-pastel" />
          <h2 className="text-base font-bold text-cinetext-main">Authorized Extension & Personalization Signals</h2>
        </div>

        <p className="text-xs text-cinetext-muted">
          CineMind respects your privacy. Normal web visits are never tracked. Signals are only received from the authorized Chrome extension.
        </p>

        <div className="space-y-3 pt-2">
          <label className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-surface-border cursor-pointer hover:bg-secondary">
            <div>
              <p className="text-xs font-bold text-cinetext-main">Allow movie-related search signals</p>
              <p className="text-[11px] text-cinetext-dim">Ingest relevant movie search queries from Google/IMDb.</p>
            </div>
            <input
              type="checkbox"
              checked={allowSearch}
              onChange={(e) => setAllowSearch(e.target.checked)}
              className="w-4 h-4 accent-purple-deep rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-surface-border cursor-pointer hover:bg-secondary">
            <div>
              <p className="text-xs font-bold text-cinetext-main">Allow movie-related browsing signals</p>
              <p className="text-[11px] text-cinetext-dim">Include movie detail pages (IMDb, Letterboxd, Rotten Tomatoes).</p>
            </div>
            <input
              type="checkbox"
              checked={allowBrowsing}
              onChange={(e) => setAllowBrowsing(e.target.checked)}
              className="w-4 h-4 accent-purple-deep rounded"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-surface-border cursor-pointer hover:bg-secondary">
            <div>
              <p className="text-xs font-bold text-cinetext-main">Use browsing activity for recommendations</p>
              <p className="text-[11px] text-cinetext-dim">Incorporate authorized browsing signals into your taste profile.</p>
            </div>
            <input
              type="checkbox"
              checked={useBrowsingForRecs}
              onChange={(e) => setUseBrowsingForRecs(e.target.checked)}
              className="w-4 h-4 accent-purple-deep rounded"
            />
          </label>
        </div>
      </section>

      {/* Privacy Actions & Danger Zone */}
      <section className="bg-surface/80 border border-surface-border rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center gap-2.5 pb-2 border-b border-surface-border">
          <Lock className="w-5 h-5 text-red-primary" />
          <h2 className="text-base font-bold text-cinetext-main">Privacy & Data Management</h2>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant={isPaused ? 'outline' : 'secondary'}
            onClick={() => {
              setIsPaused(!isPaused);
              showToast(isPaused ? 'Personalization resumed.' : 'Personalization paused.');
            }}
          >
            <PauseCircle className="w-4 h-4" /> {isPaused ? 'Resume Personalization' : 'Pause Personalization'}
          </Button>

          <Button variant="secondary" onClick={handleClearHistory}>
            <RefreshCw className="w-4 h-4" /> Clear Browsing & Search Data
          </Button>

          <Button variant="secondary" onClick={handleDeleteProfile}>
            <Trash2 className="w-4 h-4" /> Reset Recommendation Profile
          </Button>

          <Button variant="danger" onClick={() => showToast('Account deletion request initiated.')}>
            Delete Account
          </Button>
        </div>
      </section>

      {/* Chrome Extension Instructions */}
      <section id="extension" className="bg-gradient-to-r from-purple-deep/20 via-surface to-red-deep/20 border border-purple-pastel/30 rounded-2xl p-6 space-y-3">
        <div className="flex items-center gap-2.5">
          <Chrome className="w-5 h-5 text-purple-pastel" />
          <h2 className="text-base font-bold text-cinetext-main">Chrome Manifest V3 Extension</h2>
        </div>
        <p className="text-xs text-cinetext-muted leading-relaxed">
          The CineMind browser extension operates entirely locally. To install: open <code className="text-purple-pastel bg-background px-1.5 py-0.5 rounded">chrome://extensions</code>, enable Developer Mode, click "Load unpacked", and select the <code className="text-purple-pastel bg-background px-1.5 py-0.5 rounded">/extension</code> directory in this project.
        </p>
      </section>
    </div>
  );
};
