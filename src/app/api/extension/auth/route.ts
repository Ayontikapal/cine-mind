import { NextRequest, NextResponse } from 'next/server';
import { LocalStore } from '@/lib/storage/local-store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Validate credentials or return user session
    const user = LocalStore.getUser();

    return NextResponse.json({
      success: true,
      token: 'cinemind_ext_token_' + Date.now(),
      user: {
        id: user.id,
        email: email || user.email,
        display_name: user.display_name,
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
