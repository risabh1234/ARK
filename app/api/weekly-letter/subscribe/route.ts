import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    let email = '';
    let website = '';

    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const json = await req.json().catch(() => ({}));
      email = String(json.email ?? '').trim();
      website = String(json.website ?? '').trim();
    } else {
      const form = await req.formData().catch(() => new FormData());
      email = String(form.get('email') ?? '').trim();
      website = String(form.get('website') ?? '').trim();
    }

    // Honeypot: silent reject
    if (website) {
      return NextResponse.json({ status: 'subscribed', message: 'Check your inbox for a confirmation email.' });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { status: 'error', message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    console.log(`[weekly-letter] subscribe: ${email}`);
    return NextResponse.json({
      status: 'subscribed',
      message: 'Welcome. Check your inbox for a confirmation email.',
    });
  } catch {
    return NextResponse.json(
      { status: 'error', message: "Couldn't reach the server. Try again." },
      { status: 500 }
    );
  }
}
