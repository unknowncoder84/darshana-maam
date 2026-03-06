'use client';

import type { Video } from '@/lib/types/database';

const STORAGE_KEY = 'demo_videos';

const INITIAL_VIDEOS: Video[] = [
  {
    id: 'video-001',
    title: 'What to Do When Arrested: Know Your Rights',
    slug: 'what-to-do-when-arrested-know-your-rights',
    description: 'Comprehensive guide on your fundamental rights during arrest and police custody. Learn what you should and shouldn\'t do when facing arrest, your right to legal representation, and how to protect yourself during interrogation. Essential viewing for everyone.',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    published: true,
    created_at: new Date('2026-02-27').toISOString(),
    updated_at: new Date('2026-02-27').toISOString(),
  },
  {
    id: 'video-002',
    title: 'Cyber Crime in India: Types and Legal Remedies',
    slug: 'cyber-crime-india-types-legal-remedies',
    description: 'Understanding different types of cyber crimes in India including hacking, phishing, identity theft, and online fraud. Learn about IT Act provisions, how to file complaints, and legal remedies available to victims and accused persons.',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80',
    published: true,
    created_at: new Date('2026-02-25').toISOString(),
    updated_at: new Date('2026-02-25').toISOString(),
  },
  {
    id: 'video-003',
    title: 'NDPS Act Explained: Drug Laws in India',
    slug: 'ndps-act-explained-drug-laws-india',
    description: 'Detailed explanation of the Narcotic Drugs and Psychotropic Substances Act, 1985. Learn about different categories of drug offenses, penalties, bail provisions, and defense strategies in NDPS cases. Must-watch for understanding drug laws.',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
    published: true,
    created_at: new Date('2026-02-23').toISOString(),
    updated_at: new Date('2026-02-23').toISOString(),
  },
  {
    id: 'video-004',
    title: 'Bail Application Process: Step by Step Guide',
    slug: 'bail-application-process-step-by-step',
    description: 'Complete walkthrough of the bail application process in India. Learn about different types of bail, required documents, court procedures, and factors that courts consider while granting bail. Essential viewing for anyone facing criminal charges.',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&q=80',
    published: true,
    created_at: new Date('2026-02-21').toISOString(),
    updated_at: new Date('2026-02-21').toISOString(),
  },
  {
    id: 'video-005',
    title: 'Financial Crimes: Fraud, Cheating, and Money Laundering',
    slug: 'financial-crimes-fraud-cheating-money-laundering',
    description: 'Understanding financial crimes in India including cheque bounce cases, fraud under Section 420 IPC, money laundering under PMLA, and embezzlement. Learn about investigation procedures, legal defenses, and how to protect yourself from false allegations.',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80',
    published: true,
    created_at: new Date('2026-02-19').toISOString(),
    updated_at: new Date('2026-02-19').toISOString(),
  },
  {
    id: 'video-006',
    title: 'How to Handle Police Interrogation',
    slug: 'how-to-handle-police-interrogation',
    description: 'Expert advice on handling police interrogation and questioning. Learn your rights during interrogation, when you can refuse to answer, importance of legal representation, and how to avoid self-incrimination. Critical knowledge for protecting your rights.',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    published: true,
    created_at: new Date('2026-02-17').toISOString(),
    updated_at: new Date('2026-02-17').toISOString(),
  },
  {
    id: 'video-007',
    title: 'Deportation and Travel Ban Cases in India',
    slug: 'deportation-travel-ban-cases-india',
    description: 'Understanding deportation procedures, Look Out Circulars (LOC), passport impoundment, and travel restrictions in India. Learn about legal remedies, how to challenge travel bans, and rights of foreign nationals facing deportation.',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80',
    published: true,
    created_at: new Date('2026-02-15').toISOString(),
    updated_at: new Date('2026-02-15').toISOString(),
  },
  {
    id: 'video-008',
    title: 'Criminal Trial Process in India',
    slug: 'criminal-trial-process-india',
    description: 'Complete overview of the criminal trial process in India from FIR to judgment. Learn about investigation, chargesheet, framing of charges, evidence presentation, cross-examination, arguments, and appeals process. Comprehensive guide to understanding trials.',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    published: true,
    created_at: new Date('2026-02-13').toISOString(),
    updated_at: new Date('2026-02-13').toISOString(),
  },
  {
    id: 'video-009',
    title: 'Domestic Violence: Legal Protection and Remedies',
    slug: 'domestic-violence-legal-protection-remedies',
    description: 'Understanding the Protection of Women from Domestic Violence Act, 2005. Learn about types of domestic violence, how to file complaints, protection orders, residence orders, monetary relief, and custody matters. Important information for victims and their families.',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80',
    published: true,
    created_at: new Date('2026-02-11').toISOString(),
    updated_at: new Date('2026-02-11').toISOString(),
  },
  {
    id: 'video-010',
    title: 'Consumer Rights and Legal Remedies in India',
    slug: 'consumer-rights-legal-remedies-india',
    description: 'Complete guide to consumer protection laws in India. Learn about your rights as a consumer, how to file complaints in consumer forums, remedies for defective products and deficient services, and special provisions for e-commerce. Protect yourself from unfair trade practices.',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
    published: true,
    created_at: new Date('2026-02-09').toISOString(),
    updated_at: new Date('2026-02-09').toISOString(),
  },
];

function getStoredVideos(): Video[] {
  if (typeof window === 'undefined') return INITIAL_VIDEOS;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return INITIAL_VIDEOS;
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_VIDEOS));
  return INITIAL_VIDEOS;
}

function saveVideos(videos: Video[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
    window.dispatchEvent(new Event('storage'));
  }
}

export async function listVideos() {
  await new Promise(resolve => setTimeout(resolve, 200));
  return { success: true, data: getStoredVideos(), error: null };
}

export async function getVideoById(id: string) {
  await new Promise(resolve => setTimeout(resolve, 200));
  const videos = getStoredVideos();
  const video = videos.find(v => v.id === id);
  return { 
    success: !!video, 
    data: video || null, 
    error: video ? null : 'Video not found' 
  };
}

export async function createVideo(data: any) {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newVideo: Video = {
    id: `video-${Date.now()}`,
    title: data.title,
    slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    description: data.description,
    video_url: data.video_url,
    thumbnail: data.thumbnail,
    published: data.published || false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  const videos = getStoredVideos();
  videos.unshift(newVideo);
  saveVideos(videos);
  
  console.log('✅ Video created:', data.title);
  return { success: true, data: newVideo, error: null };
}

export async function updateVideo(id: string, data: any) {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const videos = getStoredVideos();
  const index = videos.findIndex(v => v.id === id);
  
  if (index !== -1) {
    videos[index] = {
      ...videos[index],
      ...data,
      id,
      updated_at: new Date().toISOString(),
    };
    saveVideos(videos);
    console.log('✅ Video updated:', data.title);
    return { success: true, data: { id }, error: null };
  }
  
  return { success: false, data: null, error: 'Video not found' };
}

export async function deleteVideo(id: string) {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const videos = getStoredVideos();
  const filtered = videos.filter(v => v.id !== id);
  saveVideos(filtered);
  
  console.log('✅ Video deleted:', id);
  return { success: true, error: null };
}
