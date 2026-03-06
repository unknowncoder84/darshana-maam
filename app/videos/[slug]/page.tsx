'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PublicLayout from '@/components/public/PublicLayout';
import AnimatedSection from '@/components/public/AnimatedSection';
import type { Video, Settings } from '@/lib/types/database';

export default function VideoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [video, setVideo] = useState<Video | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read from localStorage
    const stored = localStorage.getItem('demo_videos');
    if (stored) {
      try {
        const allVideos = JSON.parse(stored);
        const foundVideo = allVideos.find((v: Video) => v.slug === slug);
        if (foundVideo) {
          setVideo(foundVideo);
        }
      } catch (e) {
        console.error('Error loading video:', e);
      }
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading video...</p>
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Video Not Found</h1>
          <p className="text-gray-600 mb-8">The video you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/videos')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Videos
          </button>
        </div>
      </div>
    );
  }

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

  const formattedDate = new Date(video.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Check if video is YouTube URL
  const isYouTube = video.video_url.includes('youtube.com') || video.video_url.includes('youtu.be');
  
  // Extract YouTube video ID
  const getYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const youtubeId = isYouTube ? getYouTubeId(video.video_url) : null;

  return (
    <PublicLayout settings={firmSettings}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#001f3f] to-[#003366] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade">
            <div className="max-w-4xl mx-auto">
              <div className="mb-4">
                <a
                  href="/videos"
                  className="inline-flex items-center text-gray-200 hover:text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Videos
                </a>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{video.title}</h1>
              <p className="text-gray-200 text-lg">{formattedDate}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="slide">
              {/* Video Player */}
              <div className="mb-8 rounded-lg overflow-hidden shadow-lg bg-black">
                {isYouTube && youtubeId ? (
                  // YouTube Embed
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${youtubeId}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  // Native Video Player
                  <video
                    className="w-full"
                    controls
                    poster={video.thumbnail}
                  >
                    <source src={video.video_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>

              {/* Description */}
              {video.description && (
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 text-lg">{video.description}</p>
                </div>
              )}
            </AnimatedSection>

            {/* Navigation */}
            <AnimatedSection animation="fade" delay={0.2}>
              <div className="mt-12 pt-8 border-t border-gray-200">
                <a
                  href="/videos"
                  className="inline-flex items-center text-[#001f3f] hover:text-[#003366] font-semibold transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M15 19l-7-7 7-7" />
                  </svg>
                  View All Videos
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
