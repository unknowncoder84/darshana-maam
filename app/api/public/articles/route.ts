import { NextResponse } from 'next/server';
import { getSettings, getPublishedArticles } from '@/app/actions/public';

export async function GET() {
  try {
    const [settings, articles] = await Promise.all([
      getSettings(),
      getPublishedArticles(),
    ]);

    return NextResponse.json({
      settings,
      articles,
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { settings: null, articles: [] },
      { status: 200 }
    );
  }
}
