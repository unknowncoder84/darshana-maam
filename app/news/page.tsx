'use client';

import { useState, useEffect } from 'react';
import PublicLayout from '@/components/public/PublicLayout';
import AnimatedSection from '@/components/public/AnimatedSection';
import ContentCard from '@/components/public/ContentCard';
import type { NewsItem, Settings } from '@/lib/types/database';

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read from localStorage
    const stored = localStorage.getItem('demo_news');
    if (stored) {
      try {
        const allNews = JSON.parse(stored);
        // Only show published news
        const published = allNews.filter((n: NewsItem) => n.published);
        setNewsItems(published);
      } catch (e) {
        console.error('Error loading news:', e);
      }
    }
    setLoading(false);
    
    // Listen for storage changes
    const handleStorageChange = () => {
      const stored = localStorage.getItem('demo_news');
      if (stored) {
        try {
          const allNews = JSON.parse(stored);
          const published = allNews.filter((n: NewsItem) => n.published);
          setNewsItems(published);
        } catch (e) {
          console.error('Error loading news:', e);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  const firmSettings = settings || {
    id: '1',
    firm_name: 'Settle Here Law Associates',
    address: '',
    phone: '+91 8055666660',
    email: '',
    social_links: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return (
    <PublicLayout settings={firmSettings}>
      {/* Hero Section - Clean Design Without Overlay */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-16">
          <AnimatedSection animation="fade">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Latest News & Updates
              </h1>
              <p className="text-xl text-gray-600">
                Stay informed about recent legal developments and firm updates
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 bg-white">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-blue-200">Loading news...</p>
            </div>
          ) : newsItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {newsItems.map((item, index) => (
                <AnimatedSection 
                  key={item.id} 
                  animation="slide" 
                  delay={index * 0.05}
                >
                  <ContentCard
                    title={item.title}
                    excerpt={item.content.replace(/<[^>]*>/g, '').substring(0, 150)}
                    image={item.image}
                    date={new Date(item.created_at)}
                    slug={item.slug}
                    type="news"
                  />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <AnimatedSection animation="fade">
              <div className="text-center py-16 bg-gradient-to-br from-gray-900/50 to-blue-900/30 backdrop-blur-sm rounded-2xl border border-blue-500/20 max-w-2xl mx-auto">
                <svg
                  className="w-24 h-24 mx-auto text-blue-400 mb-4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <h2 className="text-2xl font-bold text-white mb-2">No News Yet</h2>
                <p className="text-blue-200">Check back soon for updates and news from our firm.</p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
