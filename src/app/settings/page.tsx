'use client';

import React from 'react';
import { Settings, Shield } from 'lucide-react';
import { PrivacyControls } from '@/components/profile/privacy-controls';

export default function SettingsPage() {
  return (
    <div className="space-y-8 pb-16">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-cinetext-main flex items-center gap-2">
          Settings & Privacy <Settings className="w-6 h-6 text-purple-pastel" />
        </h1>
        <p className="text-xs text-cinetext-muted">
          Manage account security, authorized signal collection, and Chrome extension integration.
        </p>
      </div>

      <PrivacyControls />
    </div>
  );
}
