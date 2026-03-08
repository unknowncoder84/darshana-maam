'use client';

import { useState, useRef, MouseEvent } from 'react';
import Link from 'next/link';

interface ServiceCard3DProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  delay?: number;
}

export default function ServiceCard3D({
  title,
  description,
  icon,
  link,
  delay = 0,
}: ServiceCard3DProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.innerWidth < 768) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(10px)
    `;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="card-3d group relative bg-white rounded-xl p-8 transition-all duration-500 animate-stagger-reveal"
      style={{
        animationDelay: `${delay}s`,
        boxShadow: isHovered
          ? '0 20px 60px rgba(10, 25, 47, 0.16)'
          : '0 4px 20px rgba(10, 25, 47, 0.08)',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Icon */}
      <div className="w-16 h-16 bg-gradient-to-br from-[#0A192F] to-[#1a3a52] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      {/* Title */}
      <h3 className="font-serif text-2xl font-bold mb-4 text-[#0A192F] group-hover:text-[#C9A961] transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="font-sans text-[#4A5568] leading-relaxed mb-6">
        {description}
      </p>

      {/* Learn More Link */}
      <Link
        href={link}
        className="inline-flex items-center text-[#0A192F] hover:text-[#C9A961] font-semibold transition-colors duration-300 group/link"
      >
        Learn More
        <svg
          className="w-5 h-5 ml-2 group-hover/link:translate-x-2 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </Link>

      {/* Subtle border on hover */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#C9A961] transition-colors duration-300 pointer-events-none" />
    </div>
  );
}
