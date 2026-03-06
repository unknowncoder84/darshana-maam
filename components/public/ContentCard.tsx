'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ContentCardProps {
  title: string;
  excerpt: string;
  image?: string;
  date: Date;
  slug: string;
  type: 'news' | 'article' | 'video';
}

export default function ContentCard({
  title,
  excerpt,
  image,
  date,
  slug,
  type,
}: ContentCardProps) {
  const basePath = `/${type === 'article' ? 'articles' : type === 'video' ? 'videos' : type}`;
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col"
    >
      <Link href={`${basePath}/${slug}`} className="block">
        {/* Image */}
        {image ? (
          <div className="relative h-48 w-full bg-gray-200">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="h-48 w-full bg-gradient-to-br from-[#001f3f] to-[#003366] flex items-center justify-center">
            <svg
              className="w-16 h-16 text-white opacity-50"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {type === 'video' ? (
                <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              ) : (
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              )}
            </svg>
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Type Badge */}
          <div className="mb-2">
            <span className="inline-block bg-[#001f3f] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">
              {type}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-[#001f3f] transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Date */}
          <p className="text-sm text-gray-500 mb-3">{formattedDate}</p>

          {/* Excerpt */}
          <p className="text-gray-700 mb-4 flex-1 line-clamp-3">{excerpt}</p>

          {/* Read More Link */}
          <div className="mt-auto">
            <span className="text-[#001f3f] font-semibold hover:text-[#003366] transition-colors inline-flex items-center">
              Read More
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
