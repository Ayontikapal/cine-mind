import { NextResponse } from 'next/server';
import { LocalStore } from '@/lib/storage/local-store';
import { ProfileExtractor } from '@/lib/ai/profile-extractor';

export async function POST() {
  try {
    const prefs = LocalStore.getPreferences();
    const interactions = LocalStore.getInteractions();
    const searches = LocalStore.getSearches();
    const browserEvents = LocalStore.getBrowserEvents();

    const updatedProfile = await ProfileExtractor.extractProfileFromSignals(
      interactions,
      searches,
      browserEvents,
      prefs
    );

    LocalStore.setPreferences(updatedProfile);

    return NextResponse.json({ success: true, data: updatedProfile });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
