import { NextRequest, NextResponse } from 'next/server';
import { LocalStore } from '@/lib/storage/local-store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event_type, url, page_title, query, metadata } = body;

    if (!url || !page_title) {
      return NextResponse.json({ success: false, error: 'url and page_title are required' }, { status: 400 });
    }

    LocalStore.saveBrowserEvent({
      event_type: event_type || 'movie_page',
      url,
      page_title,
      query,
      metadata,
    });

    return NextResponse.json({ success: true, message: 'Browser signal ingested securely' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
