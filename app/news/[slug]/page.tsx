'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PublicLayout from '@/components/public/PublicLayout';
import AnimatedSection from '@/components/public/AnimatedSection';
import Link from 'next/link';
import type { NewsItem } from '@/lib/types/database';

export default function NewsDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('demo_news');
    if (stored) {
      try {
        const allNews: NewsItem[] = JSON.parse(stored);
        const found = allNews.find((n) => n.slug === slug && n.published);
        setNews(found || null);
      } catch (e) {
        console.error('Error loading news:', e);
      }
    }
    setLoading(false);
  }, [slug]);

  const firmSettings = {
    id: '1',
    firm_name: 'Settle Here Law Associates',
    address: '',
    phone: '+91 8055666660',
    email: '',
    social_links: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <PublicLayout settings={firmSettings}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </PublicLayout>
    );
  }

  if (!news) {
    return (
      <PublicLayout settings={firmSettings}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">News Not Found</h1>
            <Link href="/news" className="text-blue-600 hover:text-blue-700">
              ← Back to News
            </Link>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout settings={firmSettings}>
      {news.image && (
        <section className="relative h-[400px] bg-gray-900">
          <div className="absolute inset-0">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"></div>
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
            <AnimatedSection animation="fade">
              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {news.title}
                </h1>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="fade">
              <div className="mb-8">
                <Link href="/news" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  ← Back to News
                </Link>
              </div>
            </AnimatedSection>

            {!news.image && (
              <AnimatedSection animation="fade">
                <div className="mb-8">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    {news.title}
                  </h1>
                </div>
              </AnimatedSection>
            )}

            <AnimatedSection animation="fade" delay={0.1}>
              <div className="border-b border-gray-200 pb-6 mb-8">
                <div className="text-gray-600">
                  <span className="font-semibold">{formatDate(news.created_at)}</span>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade" delay={0.2}>
              <div 
                className="prose prose-lg max-w-none text-gray-900
                  prose-headings:font-bold prose-headings:text-gray-900
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-gray-900 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-base
                  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900 prose-strong:font-bold
                  [&>*]:text-gray-900"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
            </AnimatedSection>

            <AnimatedSection animation="fade" delay={0.3}>
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">More News</h3>
                <div className="text-center py-8">
                  <Link
                    href="/news"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-semibold transition-colors"
                  >
                    View All News
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
