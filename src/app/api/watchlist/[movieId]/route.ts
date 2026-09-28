import { NextRequest, NextResponse } from 'next/server';
import { LocalStore } from '@/lib/storage/local-store';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ movieId: string }> }
) {
  try {
    const { movieId } = await params;
    const list = LocalStore.getWatchlist();
    const index = list.indexOf(movieId);
    if (index >= 0) {
      list.splice(index, 1);
      LocalStore.toggleWatchlist(movieId); // toggle remove
    }
    return NextResponse.json({ success: true, message: 'Removed from watchlist' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
