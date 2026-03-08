'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  cta1Text: string;
  cta1Link: string;
  cta2Text: string;
  cta2Link: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80',
    title: 'Expert Legal Defense',
    subtitle: 'When You Need It Most',
    cta1Text: 'Schedule Consultation',
    cta1Link: '/contact',
    cta2Text: 'Call Now',
    cta2Link: 'tel:+918055666660',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1920&q=80',
    title: 'Criminal Law Specialists',
    subtitle: 'Protecting Your Rights Across India',
    cta1Text: 'Our Services',
    cta1Link: '/practice-areas',
    cta2Text: 'Contact Us',
    cta2Link: '/contact',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80',
    title: 'Administrative Law Experts',
    subtitle: 'Comprehensive Legal Solutions',
    cta1Text: 'Learn More',
    cta1Link: '/about',
    cta2Text: 'Get Started',
    cta2Link: '/contact',
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden bg-[#0A192F]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image with Professional Desaturation */}
          <div
            className="absolute inset-0 bg-cover bg-center image-professional"
            style={{
              backgroundImage: `url(${slides[currentSlide].image})`,
            }}
          />

          {/* Editorial Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F]/80 via-[#0A192F]/50 to-transparent" />

          {/* Content */}
          <div className="relative z-10 container-editorial h-full flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-3xl"
            >
              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="font-sans text-[#C9A961] text-sm md:text-base uppercase tracking-wider mb-4 font-semibold"
              >
                Settle Here Law Associates
              </motion.p>

              {/* Main Title - Serif Font */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white"
              >
                {slides[currentSlide].title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="font-sans text-xl md:text-3xl mb-10 text-white/90 leading-relaxed"
              >
                {slides[currentSlide].subtitle}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href={slides[currentSlide].cta1Link}
                  className="inline-flex items-center justify-center bg-white text-[#0A192F] px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-[#C9A961] hover:text-white shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  {slides[currentSlide].cta1Text}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href={slides[currentSlide].cta2Link}
                  className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-[#0A192F] shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  {slides[currentSlide].cta2Text}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-[#C9A961] w-8'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => goToSlide((currentSlide + 1) % slides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
}
