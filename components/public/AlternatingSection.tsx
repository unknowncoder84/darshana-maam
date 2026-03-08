'use client';

import Image from 'next/image';
import ScrollReveal from '../shared/ScrollReveal';

interface AlternatingSectionProps {
  title: string;
  content: string;
  image: string;
  imageAlt: string;
  imagePosition: 'left' | 'right';
  features?: string[];
}

export default function AlternatingSection({
  title,
  content,
  image,
  imageAlt,
  imagePosition,
  features,
}: AlternatingSectionProps) {
  const isImageLeft = imagePosition === 'left';

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-editorial">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${isImageLeft ? '' : 'lg:grid-flow-dense'}`}>
          {/* Image Column */}
          <ScrollReveal direction={isImageLeft ? 'left' : 'right'} delay={0.2}>
            <div className={`relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl ${isImageLeft ? '' : 'lg:col-start-2'}`}>
              <div className="image-overlay">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  className="object-cover image-professional"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Content Column */}
          <ScrollReveal direction={isImageLeft ? 'right' : 'left'} delay={0.3}>
            <div className={isImageLeft ? 'lg:pl-8' : 'lg:pr-8'}>
              {/* Title - Serif Font */}
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-[#0A192F] leading-tight">
                {title}
              </h2>

              {/* Gold Divider */}
              <div className="divider-gold" style={{ margin: '2rem 0' }} />

              {/* Content - Sans Font */}
              <div className="font-sans text-lg text-[#4A5568] leading-relaxed space-y-4 mb-8">
                {content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Features List */}
              {features && features.length > 0 && (
                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-6 h-6 text-[#C9A961] mr-3 flex-shrink-0 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="font-sans text-[#4A5568] text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
