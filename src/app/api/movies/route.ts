import { NextResponse } from 'next/server';
import { TMDBClient } from '@/lib/tmdb/client';

export async function GET() {
  try {
    const movies = await TMDBClient.getTrending();
    return NextResponse.json({ success: true, data: movies });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
