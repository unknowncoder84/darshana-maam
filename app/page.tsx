'use client';

import PublicLayout from '@/components/public/PublicLayout';
import AnimatedSection from '@/components/public/AnimatedSection';
import Link from 'next/link';

export default function Home() {
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
        <div className="relative h-[500px] md:h-[600px]">
          {/* Background Image - Fully Visible */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80)',
            }}
          ></div>
          
          {/* Very Light Overlay Only for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>
          
          {/* Hero Content */}
          <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
                Expert Legal Defense<br />
                <span className="text-[#1e40af]">
                  When You Need It Most
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white leading-relaxed">
                Specialized in Criminal & Administrative Law across India
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-gray-100 shadow-xl"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Schedule Consultation
                </Link>
                <a
                  href="tel:+918055666660"
                  className="inline-flex items-center justify-center bg-[#1e40af] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-[#1e3a8a] shadow-xl"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section - White, Black, Royal Blue Only */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
                  Settle Here Law Associates
                </h2>
                <div className="w-24 h-1 bg-[#1e40af] mx-auto mb-8"></div>
              </div>
              <div className="space-y-6 text-lg text-black leading-relaxed">
                <p className="text-center">
                  We are active both in criminal areas as in illicit administrative offense areas. We deal with criminal and administrative infringements of natural and legal persons. We are geared towards filing appeals for proceedings in whose initial stages we weren't involved.
                </p>
                <p className="text-center">
                  With our team of Licensed Expert Lawyers and consultants, we guide you through your legal matters, so you don't have to worry about legal or financial consequences and can focus on your daily business.
                </p>
              </div>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-white border-2 border-[#1e40af] rounded-xl">
                  <div className="text-4xl font-bold text-[#1e40af] mb-2">500+</div>
                  <div className="text-black font-medium">Cases Won</div>
                </div>
                <div className="text-center p-6 bg-white border-2 border-[#1e40af] rounded-xl">
                  <div className="text-4xl font-bold text-[#1e40af] mb-2">15+</div>
                  <div className="text-black font-medium">Years Experience</div>
                </div>
                <div className="text-center p-6 bg-white border-2 border-[#1e40af] rounded-xl">
                  <div className="text-4xl font-bold text-[#1e40af] mb-2">98%</div>
                  <div className="text-black font-medium">Success Rate</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid - White, Black, Royal Blue Only */}
      <section className="py-20 md:py-28 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slide">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
                Our Services
              </h2>
              <div className="w-24 h-1 bg-[#1e40af] mx-auto mb-6"></div>
              <p className="text-xl text-black max-w-3xl mx-auto">
                Comprehensive legal services for criminal and administrative matters
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Cyber Crimes */}
            <AnimatedSection animation="slide" delay={0.1}>
              <div className="relative overflow-hidden bg-white border-2 border-[#1e40af] p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full transform hover:scale-105">
                <div className="w-16 h-16 bg-[#1e40af] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">Cyber Crimes</h3>
                <p className="text-black mb-4 leading-relaxed">
                  Expert legal support for computer-based illegal activities, online fraud, hacking, and digital crimes.
                </p>
                <Link href="/practice-areas#cyber-crimes" className="inline-flex items-center text-[#1e40af] hover:text-[#1e3a8a] font-semibold">
                  Learn More 
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </AnimatedSection>

            {/* Drug Crimes */}
            <AnimatedSection animation="slide" delay={0.2}>
              <div className="relative overflow-hidden bg-white border-2 border-[#1e40af] p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full transform hover:scale-105">
                <div className="w-16 h-16 bg-[#1e40af] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">Drug Crimes</h3>
                <p className="text-black mb-4 leading-relaxed">
                  Managing high-penalty offenses and local regulations related to drug possession, trafficking, and distribution.
                </p>
                <Link href="/practice-areas#drug-crimes" className="inline-flex items-center text-[#1e40af] hover:text-[#1e3a8a] font-semibold">
                  Learn More 
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </AnimatedSection>

            {/* Financial Crimes */}
            <AnimatedSection animation="slide" delay={0.3}>
              <div className="relative overflow-hidden bg-white border-2 border-[#1e40af] p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full transform hover:scale-105">
                <div className="w-16 h-16 bg-[#1e40af] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">Financial Crimes</h3>
                <p className="text-black mb-4 leading-relaxed">
                  Defense against fraud, bounced cheques, money laundering, embezzlement, and corruption charges.
                </p>
                <Link href="/practice-areas#financial-crimes" className="inline-flex items-center text-[#1e40af] hover:text-[#1e3a8a] font-semibold">
                  Learn More 
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </AnimatedSection>

            {/* Deportation & Travel */}
            <AnimatedSection animation="slide" delay={0.4}>
              <div className="relative overflow-hidden bg-white border-2 border-[#1e40af] p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full transform hover:scale-105">
                <div className="w-16 h-16 bg-[#1e40af] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">Deportation & Travel</h3>
                <p className="text-black mb-4 leading-relaxed">
                  Resolving travel bans, deportation issues, and extradition matters for Indian and foreign nationals.
                </p>
                <Link href="/practice-areas#deportation" className="inline-flex items-center text-[#1e40af] hover:text-[#1e3a8a] font-semibold">
                  Learn More 
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </AnimatedSection>

            {/* Criminal Trials */}
            <AnimatedSection animation="slide" delay={0.5}>
              <div className="relative overflow-hidden bg-white border-2 border-[#1e40af] p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full transform hover:scale-105">
                <div className="w-16 h-16 bg-[#1e40af] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">Criminal Trials & Appeals</h3>
                <p className="text-black mb-4 leading-relaxed">
                  Complete representation in criminal trials, appeals to High Court, Supreme Court, and Constitutional Court.
                </p>
                <Link href="/practice-areas#criminal-trials" className="inline-flex items-center text-[#1e40af] hover:text-[#1e3a8a] font-semibold">
                  Learn More 
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </AnimatedSection>

            {/* Habeas Corpus & Bail */}
            <AnimatedSection animation="slide" delay={0.6}>
              <div className="relative overflow-hidden bg-white border-2 border-[#1e40af] p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full transform hover:scale-105">
                <div className="w-16 h-16 bg-[#1e40af] rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">Habeas Corpus & Bail</h3>
                <p className="text-black mb-4 leading-relaxed">
                  Immediate action for detained defendants, bail applications, and cancellation of bail proceedings.
                </p>
                <Link href="/practice-areas#bail" className="inline-flex items-center text-[#1e40af] hover:text-[#1e3a8a] font-semibold">
                  Learn More 
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </AnimatedSection>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/practice-areas"
              className="inline-flex items-center bg-[#1e40af] hover:bg-[#1e3a8a] text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg"
            >
              See All Services
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Client Portal CTA - White, Black, Royal Blue */}
      <section className="py-20 md:py-28 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade">
            <div className="max-w-5xl mx-auto">
              <div className="bg-black rounded-3xl p-12 md:p-16 text-white shadow-2xl">
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    For People and Businesses in India
                  </h2>
                  <p className="text-lg text-white leading-relaxed mb-10 max-w-3xl mx-auto">
                    We support you in your legal matters to protect your rights and interests. With our team of Licensed Expert Lawyers and consultants, we guide you through your legal matters, so you don't have to worry about legal or financial consequences and can focus on your daily business.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/admin/login"
                      className="inline-flex items-center justify-center bg-white text-black px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-100 shadow-xl"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Client Portal Login
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center bg-[#1e40af] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-[#1e3a8a] shadow-xl"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Schedule Consultation
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact CTA - White, Black, Royal Blue Only */}
      <section className="relative py-20 md:py-28 bg-[#1e40af] text-white">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Need Legal Assistance?
              </h2>
              <p className="text-xl mb-12 text-white">
                Our expert team is dedicated to providing you with the best legal representation
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <a
                  href="tel:+918055666660"
                  className="flex flex-col items-center justify-center bg-white text-black p-8 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-2xl"
                >
                  <div className="w-16 h-16 bg-[#1e40af] rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="text-lg font-bold mb-1">Call Us Now</div>
                  <div className="text-2xl font-bold text-[#1e40af]">+91 8055666660</div>
                </a>
                <a
                  href="https://wa.me/918055666660"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center bg-black text-white p-8 rounded-2xl font-semibold hover:bg-gray-900 transition-all duration-300 shadow-2xl"
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div className="text-lg font-bold mb-1">WhatsApp Us</div>
                  <div className="text-sm">Instant Response</div>
                </a>
              </div>
              <p className="mt-8 text-white text-lg">
                ⏰ Available 24/7 for urgent legal matters
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PublicLayout>
  );
}
