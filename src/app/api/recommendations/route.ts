import { NextRequest, NextResponse } from 'next/server';
import { RecommendationEngine } from '@/lib/recommendations/engine';
import { LocalStore } from '@/lib/storage/local-store';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const intentQuery = searchParams.get('intent');
    
    const prefs = LocalStore.getPreferences();
    const interactions = LocalStore.getInteractions();
    const currentIntent = intentQuery ? { query: intentQuery, timestamp: Date.now() } : LocalStore.getCurrentIntent();

    const feeds = await RecommendationEngine.getCategorizedFeeds(prefs, interactions, currentIntent);
    return NextResponse.json({ success: true, data: feeds });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { intentQuery, mood } = body;

    const prefs = LocalStore.getPreferences();
    const interactions = LocalStore.getInteractions();

    let intent = null;
    if (intentQuery) {
      intent = { query: intentQuery, mood, timestamp: Date.now() };
      LocalStore.setCurrentIntent(intent);
    }

    const recommendations = await RecommendationEngine.getRecommendations(prefs, interactions, intent, 16);
    return NextResponse.json({ success: true, data: recommendations });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
