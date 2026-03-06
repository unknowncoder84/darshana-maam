'use client';

import PublicLayout from '@/components/public/PublicLayout';
import AnimatedSection from '@/components/public/AnimatedSection';

export default function AboutPage() {
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

  return (
    <PublicLayout settings={firmSettings}>
      {/* Hero Section - Image Visible with Light Overlay */}
      <section className="relative bg-white">
        <div className="relative h-[300px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1920&q=80"
              alt="About our law firm"
              className="w-full h-full object-cover"
            />
            {/* Light overlay only for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-transparent"></div>
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <AnimatedSection animation="fade">
              <div className="max-w-4xl text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
                <p className="text-xl">
                  Dedicated to providing exceptional legal services with integrity and professionalism
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="slide">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-black">Our Story</h2>
              <div className="prose prose-lg max-w-none text-black">
                <p className="mb-6">
                  {firmSettings.firm_name} has been serving clients with distinction for years, 
                  building a reputation for excellence in legal representation. Our firm was founded 
                  on the principles of integrity, dedication, and unwavering commitment to our clients' 
                  success.
                </p>
                <p className="mb-6">
                  We understand that legal matters can be complex and overwhelming. That's why we take 
                  a client-centered approach, ensuring that you receive personalized attention and clear 
                  communication throughout your legal journey. Our team of experienced attorneys brings 
                  diverse expertise across multiple practice areas, allowing us to provide comprehensive 
                  legal solutions.
                </p>
                <p>
                  Whether you're facing a challenging legal issue or need proactive counsel to protect 
                  your interests, we're here to help. Our commitment to excellence and our track record 
                  of successful outcomes speak to our dedication to achieving the best possible results 
                  for our clients.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slide">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black">
              Our Core Values
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <AnimatedSection animation="slide" delay={0.1}>
              <div className="bg-white border-2 border-[#1e40af] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-[#1e40af] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">Integrity</h3>
                <p className="text-black">
                  We uphold the highest ethical standards in all our dealings
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide" delay={0.2}>
              <div className="bg-white border-2 border-[#1e40af] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-[#1e40af] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">Excellence</h3>
                <p className="text-black">
                  We strive for excellence in every case we handle
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide" delay={0.3}>
              <div className="bg-white border-2 border-[#1e40af] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-[#1e40af] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">Dedication</h3>
                <p className="text-black">
                  We are committed to achieving the best outcomes for our clients
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide" delay={0.4}>
              <div className="bg-white border-2 border-[#1e40af] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-[#1e40af] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">Communication</h3>
                <p className="text-black">
                  We maintain clear and open communication with our clients
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
                Let Us Help You
              </h2>
              <p className="text-xl mb-8 text-black">
                Contact us today to discuss how we can assist with your legal needs
              </p>
              <a
                href="/contact"
                className="inline-block bg-[#1e40af] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1e3a8a] transition-colors shadow-lg"
              >
                Get in Touch
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PublicLayout>
  );
}
