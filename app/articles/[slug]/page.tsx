'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PublicLayout from '@/components/public/PublicLayout';
import AnimatedSection from '@/components/public/AnimatedSection';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Article } from '@/lib/types/database';

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read from localStorage
    const stored = localStorage.getItem('demo_articles');
    if (stored) {
      try {
        const articles: Article[] = JSON.parse(stored);
        const found = articles.find((a) => a.slug === slug && a.published);
        setArticle(found || null);
      } catch (e) {
        console.error('Error loading article:', e);
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

  if (!article) {
    return (
      <PublicLayout settings={firmSettings}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <Link href="/articles" className="text-blue-600 hover:text-blue-700">
              ← Back to Articles
            </Link>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout settings={firmSettings}>
      {/* Hero Section - Professional Blue Gradient */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-black text-white py-16 md:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-float-delayed"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection animation="fade">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <div className="mb-6">
                <Link href="/articles" className="text-blue-200 hover:text-white text-sm font-medium transition-colors">
                  ← Back to Articles
                </Link>
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mb-4">
                  <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-semibold uppercase border border-white/30">
                    {article.tags[0]}
                  </span>
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Meta Info */}
              <div className="flex items-center text-blue-100">
                <svg className="w-5 h-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">{formatDate(article.created_at)}</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Article Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Featured Image */}
            {article.image && (
              <AnimatedSection animation="fade" delay={0.1}>
                <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </AnimatedSection>
            )}

            {/* Video Player */}
            {article.video_url && (
              <AnimatedSection animation="fade" delay={0.15}>
                <div className="mb-12">
                  <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border-2 border-blue-200 shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <svg className="w-7 h-7 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                      Related Video
                    </h3>
                    <div className="rounded-xl overflow-hidden shadow-lg bg-black">
                      {article.video_url.includes('youtube.com') || article.video_url.includes('youtu.be') ? (
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                          <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${getYouTubeId(article.video_url)}`}
                            title={article.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <video
                          className="w-full"
                          controls
                          poster={article.image}
                        >
                          <source src={article.video_url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* PDF Viewer */}
            {article.pdf_url && (
              <AnimatedSection animation="fade" delay={0.2}>
                <div className="mb-12">
                  <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border-2 border-blue-200 shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <svg className="w-7 h-7 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                      Related Document
                    </h3>
                    <div className="rounded-xl overflow-hidden shadow-lg border-2 border-gray-200">
                      <iframe
                        src={article.pdf_url}
                        className="w-full h-[600px]"
                        title="PDF Document"
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <a
                        href={article.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download PDF
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* Article Body */}
            <AnimatedSection animation="fade" delay={0.25}>
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
                <div 
                  className="prose prose-lg max-w-none
                    prose-headings:font-bold prose-headings:text-black
                    prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-6 prose-h2:border-b-2 prose-h2:border-blue-600 prose-h2:pb-3
                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-blue-900
                    prose-p:text-black prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
                    prose-a:text-blue-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-black prose-strong:font-bold
                    prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                    prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
                    prose-li:text-black prose-li:mb-3 prose-li:leading-relaxed
                    prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-800 prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:rounded-r-lg
                    prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-2 prose-code:py-1 prose-code:rounded
                    [&>*]:text-black"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>
            </AnimatedSection>

            {/* Tags Section */}
            {article.tags && article.tags.length > 1 && (
              <AnimatedSection animation="fade" delay={0.3}>
                <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-white rounded-xl border border-blue-200">
                  <h4 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Related Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-white text-blue-700 px-4 py-2 rounded-full text-sm font-semibold border border-blue-300 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* Call to Action */}
            <AnimatedSection animation="fade" delay={0.35}>
              <div className="mt-12 p-8 bg-gradient-to-br from-blue-900 to-black text-white rounded-2xl shadow-xl">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Need Legal Assistance?</h3>
                  <p className="text-blue-100 mb-6 text-lg">
                    Contact our expert legal team for professional consultation
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/contact"
                      className="inline-block bg-white text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-lg"
                    >
                      Contact Us
                    </Link>
                    <a
                      href="tel:+918055666660"
                      className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg border-2 border-white/20"
                    >
                      Call +91 8055666660
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* More Articles */}
            <AnimatedSection animation="fade" delay={0.4}>
              <div className="mt-12 pt-8 border-t-2 border-gray-200 text-center">
                <Link
                  href="/articles"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-bold text-lg transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M15 19l-7-7 7-7" />
                  </svg>
                  View All Articles
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

// Helper function to extract YouTube video ID
function getYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}
