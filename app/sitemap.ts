import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/practice-areas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ];

  // Fetch published news items
  const { data: newsItems } = await supabase
    .from('news')
    .select('slug, updated_at')
    .eq('published', true)
    .order('created_at', { ascending: false });

  // @ts-ignore - Bypass Supabase type inference
  const newsPages: MetadataRoute.Sitemap = (newsItems || []).map((item: any) => ({
    url: `${baseUrl}/news/${item.slug}`,
    lastModified: new Date(item.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Fetch published articles
  const { data: articles } = await supabase
    .from('articles')
    .select('slug, updated_at')
    .eq('published', true)
    .order('created_at', { ascending: false });

  // @ts-ignore - Bypass Supabase type inference
  const articlePages: MetadataRoute.Sitemap = (articles || []).map((item: any) => ({
    url: `${baseUrl}/articles/${item.slug}`,
    lastModified: new Date(item.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Fetch published videos
  const { data: videos } = await supabase
    .from('videos')
    .select('slug, updated_at')
    .eq('published', true)
    .order('created_at', { ascending: false });

  const videoPages: MetadataRoute.Sitemap = (videos || []).map((item: any) => ({
    url: `${baseUrl}/videos/${item.slug}`,
    lastModified: new Date(item.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...newsPages, ...articlePages, ...videoPages];
}
