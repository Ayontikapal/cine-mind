import { NextRequest, NextResponse } from 'next/server';
import { LocalStore } from '@/lib/storage/local-store';

export async function GET() {
  try {
    const list = LocalStore.getWatchlist();
    return NextResponse.json({ success: true, data: list });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { movieId } = body;

    if (!movieId) {
      return NextResponse.json({ success: false, error: 'movieId is required' }, { status: 400 });
    }

    const added = LocalStore.toggleWatchlist(movieId);
    return NextResponse.json({ success: true, added });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
