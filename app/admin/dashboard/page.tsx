'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState({
    totalNews: 0,
    publishedNews: 0,
    draftNews: 0,
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    totalVideos: 0,
    publishedVideos: 0,
    draftVideos: 0,
    totalUsers: 2,
    activeUsers: 2,
    totalViews: 1247,
    todayViews: 89,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem('demo_session');
    if (session) {
      const parsed = JSON.parse(session);
      setProfile(parsed.profile);
    }

    // Load dynamic data from localStorage
    const loadData = () => {
      const news = JSON.parse(localStorage.getItem('demo_news') || '[]');
      const articles = JSON.parse(localStorage.getItem('demo_articles') || '[]');
      const videos = JSON.parse(localStorage.getItem('demo_videos') || '[]');

      setStats({
        totalNews: news.length,
        publishedNews: news.filter((n: any) => n.status === 'published').length,
        draftNews: news.filter((n: any) => n.status === 'draft').length,
        totalArticles: articles.length,
        publishedArticles: articles.filter((a: any) => a.status === 'published').length,
        draftArticles: articles.filter((a: any) => a.status === 'draft').length,
        totalVideos: videos.length,
        publishedVideos: videos.filter((v: any) => v.status === 'published').length,
        draftVideos: videos.filter((v: any) => v.status === 'draft').length,
        totalUsers: 2,
        activeUsers: 2,
        totalViews: 1247 + Math.floor(Math.random() * 100),
        todayViews: 89 + Math.floor(Math.random() * 20),
      });
      setLoading(false);
    };

    loadData();

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 absolute top-0 left-0"></div>
        </div>
      </div>
    );
  }

  const timeString = currentTime.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className="space-y-6">
      {/* Welcome message with live clock - Enhanced Glassmorphism */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-2xl shadow-2xl p-8 transform hover:scale-[1.01] transition-all duration-300">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl animate-float"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {profile?.username || 'Admin'}! 👋
              </h1>
              <p className="text-blue-100 text-lg">
                You are logged in as{' '}
                <span className="font-semibold capitalize bg-white/20 px-3 py-1 rounded-full">
                  {profile?.role || 'admin'}
                </span>
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-white font-mono">{timeString}</div>
              <div className="text-blue-100 text-sm mt-1">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-5 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Content</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.totalNews + stats.totalArticles + stats.totalVideos}
              </p>
            </div>
            <div className="text-4xl">📊</div>
          </div>
          <div className="mt-3 flex items-center text-xs text-green-600">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">All items</span>
          </div>
        </div>

        <div className="glass-card rounded-xl p-5 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Published</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {stats.publishedNews + stats.publishedArticles + stats.publishedVideos}
              </p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
          <div className="mt-3 flex items-center text-xs text-gray-600">
            <span className="font-medium">Live on website</span>
          </div>
        </div>

        <div className="glass-card rounded-xl p-5 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Drafts</p>
              <p className="text-3xl font-bold text-amber-600 mt-2">
                {stats.draftNews + stats.draftArticles + stats.draftVideos}
              </p>
            </div>
            <div className="text-4xl">📝</div>
          </div>
          <div className="mt-3 flex items-center text-xs text-gray-600">
            <span className="font-medium">Pending review</span>
          </div>
        </div>

        <div className="glass-card rounded-xl p-5 transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Views</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalViews}</p>
            </div>
            <div className="text-4xl">👁️</div>
          </div>
          <div className="mt-3 flex items-center text-xs text-blue-600">
            <span className="font-medium">+{stats.todayViews} today</span>
          </div>
        </div>
      </div>

      {/* Detailed Stats Grid - Enhanced Glassmorphism */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* News stats */}
        <Link
          href="/admin/news"
          className="relative overflow-hidden glass-card rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                <span className="text-3xl">📰</span>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-gray-900">{stats.totalNews}</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">News Items</h3>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="font-medium">{stats.publishedNews} Published</span>
              </div>
              <div className="flex items-center text-amber-600">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                <span className="font-medium">{stats.draftNews} Drafts</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center text-xs text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>Click to manage</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Articles stats */}
        <Link
          href="/admin/articles"
          className="relative overflow-hidden glass-card rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-indigo-100 rounded-xl group-hover:bg-indigo-200 transition-colors">
                <span className="text-3xl">📝</span>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-gray-900">{stats.totalArticles}</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Legal Articles</h3>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="font-medium">{stats.publishedArticles} Published</span>
              </div>
              <div className="flex items-center text-amber-600">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                <span className="font-medium">{stats.draftArticles} Drafts</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center text-xs text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>Click to manage</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Videos stats */}
        <Link
          href="/admin/videos"
          className="relative overflow-hidden glass-card rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-300"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                <span className="text-3xl">🎥</span>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-gray-900">{stats.totalVideos}</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Content</h3>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="font-medium">{stats.publishedVideos} Published</span>
              </div>
              <div className="flex items-center text-amber-600">
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                <span className="font-medium">{stats.draftVideos} Drafts</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center text-xs text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>Click to manage</span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Calendar and Quick Actions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar Widget - Only for Admin */}
        {profile?.role === 'admin' && (
          <div className="relative overflow-hidden glass-card rounded-2xl shadow-xl p-6 transform hover:scale-[1.01] transition-all duration-300">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center">
                <span className="mr-2 text-2xl">📅</span> Upcoming Events
              </h2>
              <div className="space-y-3">
                <div className="flex items-start p-4 bg-red-50 rounded-xl border-l-4 border-red-500 hover:shadow-md transition-all duration-200 transform hover:translate-x-1">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-xl">⚖️</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      Court Hearing - Case #123
                    </p>
                    <p className="text-xs text-gray-600 mt-1">Feb 28, 2026 • 10:00 AM</p>
                    <p className="text-xs text-red-600 mt-1 font-medium">High Priority</p>
                  </div>
                </div>
                <div className="flex items-start p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500 hover:shadow-md transition-all duration-200 transform hover:translate-x-1">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-xl">👥</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      Client Consultation
                    </p>
                    <p className="text-xs text-gray-600 mt-1">Mar 5, 2026 • 2:00 PM</p>
                    <p className="text-xs text-blue-600 mt-1 font-medium">Meeting</p>
                  </div>
                </div>
                <div className="flex items-start p-4 bg-amber-50 rounded-xl border-l-4 border-amber-500 hover:shadow-md transition-all duration-200 transform hover:translate-x-1">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-xl">📄</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      Document Filing Deadline
                    </p>
                    <p className="text-xs text-gray-600 mt-1">Mar 10, 2026 • 5:00 PM</p>
                    <p className="text-xs text-amber-600 mt-1 font-medium">Deadline</p>
                  </div>
                </div>
              </div>
              <Link
                href="/admin/calendar"
                className="mt-5 w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-xl"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                View Full Calendar
              </Link>
            </div>
          </div>
        )}

        {/* Quick actions */}
        <div className="relative overflow-hidden glass-card rounded-2xl shadow-xl p-6 transform hover:scale-[1.01] transition-all duration-300">
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center">
              <span className="mr-2 text-2xl">⚡</span> Quick Actions
            </h2>
            <div className="grid grid-cols-1 gap-3">
              <Link
                href="/admin/news"
                className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <span className="text-xl">➕</span>
                </div>
                <div className="flex-1">
                  <span className="text-sm font-semibold text-gray-900">Create News</span>
                  <p className="text-xs text-gray-600">Add latest updates</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/admin/articles"
                className="flex items-center p-4 bg-gradient-to-r from-indigo-50 to-indigo-100/50 border border-indigo-200 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <span className="text-xl">➕</span>
                </div>
                <div className="flex-1">
                  <span className="text-sm font-semibold text-gray-900">Create Article</span>
                  <p className="text-xs text-gray-600">Write legal insights</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/admin/videos"
                className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100/50 border border-purple-200 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <span className="text-xl">➕</span>
                </div>
                <div className="flex-1">
                  <span className="text-sm font-semibold text-gray-900">Create Video</span>
                  <p className="text-xs text-gray-600">Upload video content</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              {profile?.role === 'admin' && (
                <>
                  <Link
                    href="/admin/users"
                    className="flex items-center p-4 bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                      <span className="text-xl">👥</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-gray-900">Manage Users</span>
                      <p className="text-xs text-gray-600">{stats.totalUsers} active users</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href="/admin/settings"
                    className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                      <span className="text-xl">⚙️</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-gray-900">Firm Settings</span>
                      <p className="text-xs text-gray-600">Configure system</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Activity & Tips Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="relative overflow-hidden glass-card rounded-2xl shadow-xl p-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center">
              <span className="mr-2 text-2xl">📊</span> Recent Activity
            </h2>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm">✅</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Article published</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm">📝</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">News item created</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm">🎥</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Video uploaded</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="relative overflow-hidden glass-card rounded-2xl shadow-xl p-6 border-l-4 border-l-blue-500">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="mr-2 text-2xl">💡</span> Quick Tips
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-0.5">•</span>
                <span className="text-sm text-gray-700">Data is stored in your browser's local storage</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-0.5">•</span>
                <span className="text-sm text-gray-700">Use the sidebar to navigate between sections</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-0.5">•</span>
                <span className="text-sm text-gray-700">Admin role has full access to all features</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-0.5">•</span>
                <span className="text-sm text-gray-700">User role can only manage content items</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-0.5">•</span>
                <span className="text-sm text-gray-700">Click "View Site" to see the public website</span>
              </li>
            </ul>
            <div className="mt-5 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-800 font-medium">
                🎭 Demo Mode Active - Perfect for testing and exploration!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
