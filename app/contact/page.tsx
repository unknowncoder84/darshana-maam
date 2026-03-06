'use client';

import PublicLayout from '@/components/public/PublicLayout';
import AnimatedSection from '@/components/public/AnimatedSection';

export default function ContactPage() {
  const firmSettings = {
    id: '1',
    firm_name: 'Settle Here Law Associates',
    address: 'Connaught Place, New Delhi, India',
    phone: '+91 8055666660',
    email: 'contact@settleherelawassociates.com',
    social_links: {
      facebook: '',
      twitter: '',
      linkedin: '',
    },
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
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80"
              alt="Contact us"
              className="w-full h-full object-cover"
            />
            {/* Light overlay only for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-transparent"></div>
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <AnimatedSection animation="fade">
              <div className="max-w-4xl text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                <p className="text-xl">
                  We're here to help. Reach out to discuss your legal needs.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <AnimatedSection animation="slide">
              <div>
                <h2 className="text-3xl font-bold mb-8 text-black">Get in Touch</h2>
                
                <div className="space-y-6">
                  {firmSettings.address && (
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-[#1e40af] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-black mb-1">Address</h3>
                        <p className="text-black">{firmSettings.address}</p>
                      </div>
                    </div>
                  )}

                  {firmSettings.phone && (
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-[#1e40af] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-black mb-1">Phone</h3>
                        <a href={`tel:${firmSettings.phone}`} className="text-black hover:text-[#1e40af] transition-colors">
                          {firmSettings.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {firmSettings.email && (
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-[#1e40af] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-black mb-1">Email</h3>
                        <a href={`mailto:${firmSettings.email}`} className="text-black hover:text-[#1e40af] transition-colors">
                          {firmSettings.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Office Hours */}
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-[#1e40af] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-black mb-1">Office Hours</h3>
                      <p className="text-black">Monday - Friday: 9:00 AM - 5:00 PM</p>
                      <p className="text-black">Saturday - Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                {firmSettings.social_links && Object.keys(firmSettings.social_links).length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-black mb-4">Connect With Us</h3>
                    <div className="flex space-x-4">
                      {firmSettings.social_links.facebook && (
                        <a
                          href={firmSettings.social_links.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-[#1e40af] rounded-full flex items-center justify-center text-white hover:bg-[#1e3a8a] transition-colors"
                          aria-label="Facebook"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        </a>
                      )}
                      {firmSettings.social_links.twitter && (
                        <a
                          href={firmSettings.social_links.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-[#1e40af] rounded-full flex items-center justify-center text-white hover:bg-[#1e3a8a] transition-colors"
                          aria-label="Twitter"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        </a>
                      )}
                      {firmSettings.social_links.linkedin && (
                        <a
                          href={firmSettings.social_links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-[#1e40af] rounded-full flex items-center justify-center text-white hover:bg-[#1e3a8a] transition-colors"
                          aria-label="LinkedIn"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </AnimatedSection>

            {/* Contact Form Placeholder */}
            <AnimatedSection animation="slide" delay={0.2}>
              <div className="bg-white border-2 border-gray-200 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-black">Send Us a Message</h2>
                <p className="text-black mb-6">
                  Please call or email us directly to schedule a consultation. We look forward to hearing from you.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-lg border-2 border-[#1e40af]">
                    <h3 className="font-semibold text-black mb-2">Schedule a Consultation</h3>
                    <p className="text-black mb-4">
                      Contact us today to discuss your legal needs and learn how we can assist you.
                    </p>
                    {firmSettings.phone && (
                      <a
                        href={`tel:${firmSettings.phone}`}
                        className="inline-block bg-[#1e40af] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#1e3a8a] transition-colors"
                      >
                        Call Now
                      </a>
                    )}
                  </div>

                  <div className="bg-white p-6 rounded-lg border-2 border-gray-300">
                    <h3 className="font-semibold text-black mb-2">Email Inquiry</h3>
                    <p className="text-black mb-4">
                      Send us an email with your questions or to request more information.
                    </p>
                    {firmSettings.email && (
                      <a
                        href={`mailto:${firmSettings.email}`}
                        className="inline-block bg-white text-[#1e40af] border-2 border-[#1e40af] px-6 py-2 rounded-lg font-semibold hover:bg-[#1e40af] hover:text-white transition-colors"
                      >
                        Send Email
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
