import { NextRequest, NextResponse } from 'next/server';
import { TMDBClient } from '@/lib/tmdb/client';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const movie = await TMDBClient.getMovieById(id);
    if (!movie) {
      return NextResponse.json({ success: false, error: 'Movie not found' }, { status: 404 });
    }

    const watchProviders = await TMDBClient.getWatchProviders(movie.tmdb_id);

    return NextResponse.json({
      success: true,
      data: {
        ...movie,
        watch_providers: watchProviders,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
