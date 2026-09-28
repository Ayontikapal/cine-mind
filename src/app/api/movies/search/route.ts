import { NextRequest, NextResponse } from 'next/server';
import { TMDBClient } from '@/lib/tmdb/client';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || '';
    if (!query.trim()) {
      return NextResponse.json({ success: true, data: [] });
    }
    const results = await TMDBClient.searchMovies(query);
    return NextResponse.json({ success: true, data: results });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
