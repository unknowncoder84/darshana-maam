'use server';

import { createClient } from '@/lib/supabase/server';
import { FirmSettings, NewsItem, Article, Video } from '@/lib/types/database';

export async function getSettings(): Promise<FirmSettings | null> {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .single();

    if (error) {
      console.error('Error fetching settings:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Supabase not configured:', error);
    // Return default settings when Supabase is not configured
    return null;
  }
}

export async function getPublishedNews(): Promise<NewsItem[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching news:', error);
    return [];
  }

  return data || [];
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) {
    console.error('Error fetching news by slug:', error);
    return null;
  }

  return data;
}

export async function getPublishedArticles(): Promise<Article[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }

  return data || [];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) {
    console.error('Error fetching article by slug:', error);
    return null;
  }

  return data;
}

export async function getPublishedVideos(): Promise<Video[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching videos:', error);
    return [];
  }

  return data || [];
}

export async function getVideoBySlug(slug: string): Promise<Video | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) {
    console.error('Error fetching video by slug:', error);
    return null;
  }

  return data;
}
