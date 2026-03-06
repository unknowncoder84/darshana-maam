'use client';

import { useState, useEffect } from 'react';
import PublicLayout from '@/components/public/PublicLayout';
import AnimatedSection from '@/components/public/AnimatedSection';
import Link from 'next/link';
import type { Article, Settings } from '@/lib/types/database';

const categories = [
  { id: 'all', label: 'ALL' },
  { id: 'criminal-law', label: 'CRIMINAL LAW' },
  { id: 'cyber-crimes', label: 'CYBER CRIMES' },
  { id: 'drug-crimes', label: 'DRUG CRIMES' },
  { id: 'financial-crimes', label: 'FINANCIAL CRIMES' },
  { id: 'deportation', label: 'DEPORTATION & TRAVEL' },
  { id: 'appeals', label: 'APPEALS & TRIALS' },
  { id: 'bail', label: 'BAIL & HABEAS CORPUS' },
];

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [articles, setArticles] = useState<Article[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read from localStorage
    const stored = localStorage.getItem('demo_articles');
    if (stored) {
      try {
        const allArticles = JSON.parse(stored);
        // Only show published articles
        const published = allArticles.filter((a: Article) => a.published);
        setArticles(published);
      } catch (e) {
        console.error('Error loading articles:', e);
      }
    }
    setLoading(false);
    
    // Listen for storage changes
    const handleStorageChange = () => {
      const stored = localStorage.getItem('demo_articles');
      if (stored) {
        try {
          const allArticles = JSON.parse(stored);
          const published = allArticles.filter((a: Article) => a.published);
          setArticles(published);
        } catch (e) {
          console.error('Error loading articles:', e);
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

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => 
        article.tags?.some(tag => 
          tag.toLowerCase().includes(selectedCategory.replace('-', ' '))
        )
      );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  return (
    <PublicLayout settings={firmSettings}>
      {/* Hero Section */}
      <section className="relative bg-gray-900">
        <div className="relative h-[300px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80"
              alt="Legal consultation"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/80"></div>
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <AnimatedSection animation="fade">
              <div className="max-w-4xl text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Articles
                </h1>
                <p className="text-xl text-blue-100">
                  Expert legal insights and analysis on criminal and administrative law
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-gray-50 border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-md font-medium text-sm transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading articles...</p>
              </div>
            ) : filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article, index) => (
                  <AnimatedSection 
                    key={article.id} 
                    animation="slide" 
                    delay={index * 0.05}
                  >
                    <Link 
                      href={`/articles/${article.slug}`}
                      className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 h-full flex flex-col"
                    >
                      {/* Article Image - Full Width on Top */}
                      {article.image ? (
                        <div className="relative w-full h-56 bg-gray-200 overflow-hidden">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="relative w-full h-56 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                          <svg className="w-16 h-16 text-blue-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      )}
                      
                      {/* Article Content Below Image */}
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Date and Category */}
                        <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
                          <span>{formatDate(article.created_at)}</span>
                          {article.tags && article.tags.length > 0 && (
                            <span className="text-amber-600 font-medium uppercase text-xs">
                              {article.tags[0]}
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
                          {article.title}
                        </h3>
                        
                        {/* Excerpt */}
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                          {article.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                        </p>
                        
                        {/* Read More Link */}
                        <div className="text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors">
                          See article →
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            ) : (
              <AnimatedSection animation="fade">
                <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
                  <svg
                    className="w-24 h-24 mx-auto text-gray-400 mb-4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">No Articles Yet</h2>
                  <p className="text-gray-600">
                    {selectedCategory === 'all' 
                      ? 'Check back soon for legal articles and insights.' 
                      : 'No articles found in this category. Try selecting a different category.'}
                  </p>
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
