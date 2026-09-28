import { NextRequest, NextResponse } from 'next/server';
import { LocalStore } from '@/lib/storage/local-store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, source } = body;

    if (!query) {
      return NextResponse.json({ success: false, error: 'query is required' }, { status: 400 });
    }

    LocalStore.saveSearch(query, source || 'web');

    return NextResponse.json({ success: true, message: 'Search event logged' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
