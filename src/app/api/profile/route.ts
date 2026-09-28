import { NextResponse } from 'next/server';
import { LocalStore } from '@/lib/storage/local-store';

export async function GET() {
  try {
    const preferences = LocalStore.getPreferences();
    const user = LocalStore.getUser();
    return NextResponse.json({
      success: true,
      data: {
        user,
        preferences,
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
