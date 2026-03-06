// Database types for Supabase tables

export interface Profile {
  id: string;
  username: string;
  role: 'admin' | 'user';
  created_at: string;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  image?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  image?: string;
  video_url?: string;
  pdf_url?: string;
  tags?: string[];
  seo_meta?: SEOMeta;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Video {
  id: string;
  title: string;
  slug: string;
  description?: string;
  video_url: string;
  thumbnail?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface FirmSettings {
  id: string;
  firm_name: string;
  address?: string;
  phone?: string;
  email?: string;
  social_links?: SocialLinks;
  created_at: string;
  updated_at: string;
}

// Alias for backward compatibility
export type Settings = FirmSettings;

export interface SEOMeta {
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
}

// Form data types
export interface LoginFormData {
  username: string;
  password: string;
}

export interface UserFormData {
  username: string;
  password?: string;
  role: 'admin' | 'user';
}

export interface ContentFormData {
  title: string;
  content?: string;
  description?: string;
  slug: string;
  published: boolean;
  image?: File;
  videoUrl?: string;
  tags?: string[];
  seoMeta?: SEOMeta;
}

// Supabase database type
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
      };
      news: {
        Row: NewsItem;
        Insert: Omit<NewsItem, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<NewsItem, 'id' | 'created_at'>>;
      };
      articles: {
        Row: Article;
        Insert: Omit<Article, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Article, 'id' | 'created_at'>>;
      };
      videos: {
        Row: Video;
        Insert: Omit<Video, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Video, 'id' | 'created_at'>>;
      };
      settings: {
        Row: FirmSettings;
        Insert: Omit<FirmSettings, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<FirmSettings, 'id' | 'created_at'>>;
      };
    };
  };
}
