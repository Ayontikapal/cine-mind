import { NextRequest, NextResponse } from 'next/server';
import { LocalStore } from '@/lib/storage/local-store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { movieId, interactionType, rating } = body;

    if (!movieId || !interactionType) {
      return NextResponse.json({ success: false, error: 'movieId and interactionType are required' }, { status: 400 });
    }

    const recorded = LocalStore.recordInteraction({
      user_id: 'demo-user-123',
      movie_id: movieId,
      interaction_type: interactionType,
      rating: rating ? Number(rating) : undefined,
    });

    return NextResponse.json({ success: true, data: recorded });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    LocalStore.clearHistory();
    return NextResponse.json({ success: true, message: 'Interaction history cleared' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
