'use client';

import PublicLayout from '@/components/public/PublicLayout';
import AnimatedSection from '@/components/public/AnimatedSection';
import Link from 'next/link';

const practiceAreas: Array<{
  title: string;
  description: string;
  process?: string;
  documents?: string;
  outcomes?: string;
  icon: React.ReactNode;
}> = [
  {
    title: 'Cyber Crimes',
    description: 'Expert defense in cybercrime cases including hacking, data theft, online fraud, identity theft, and IT Act violations.',
    process: 'Initial consultation → Evidence analysis → Legal strategy → Court representation',
    documents: 'FIR copy, Digital evidence, Communication records, Technical reports',
    outcomes: 'Bail, Charge dismissal, Reduced penalties, Acquittal',
    icon: (
      <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
  },
  {
    title: 'Drug Crimes',
    description: 'Comprehensive defense for NDPS Act violations, possession, trafficking, and substance abuse cases.',
    process: 'Case evaluation → Bail application → Evidence review → Trial defense',
    documents: 'Charge sheet, Medical reports, Seizure memo, Witness statements',
    outcomes: 'Bail grant, Acquittal, Reduced sentencing, Rehabilitation orders',
    icon: (
      <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    ),
  },
  {
    title: 'Financial Crimes',
    description: 'Defense in fraud, embezzlement, money laundering, cheque bounce, and economic offenses under IPC and special acts.',
    process: 'Financial analysis → Legal notice response → Settlement negotiation → Court proceedings',
    documents: 'Bank statements, Transaction records, Contracts, Cheques, Notices',
    outcomes: 'Settlement, Acquittal, Compounding, Reduced liability',
    icon: (
      <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  {
    title: 'Corporate Law',
    description: 'Comprehensive legal services for businesses, including formation, contracts, mergers, and acquisitions.',
    process: 'Business consultation → Document drafting → Compliance review → Transaction closure',
    documents: 'MOA/AOA, Contracts, Board resolutions, Compliance certificates',
    outcomes: 'Successful incorporation, Contract execution, Regulatory compliance',
    icon: (
      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    ),
  },
  {
    title: 'Deportation & Travel',
    description: 'Legal assistance for deportation defense, visa issues, passport problems, and travel ban cases.',
    process: 'Case assessment → Documentation → Legal representation → Appeal filing',
    documents: 'Passport, Visa documents, Travel records, Deportation orders',
    outcomes: 'Deportation stay, Visa approval, Travel ban removal, Legal status',
    icon: (
      <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  {
    title: 'Appeals & Trials',
    description: 'Expert representation in criminal trials, appeals, revisions, and higher court proceedings.',
    process: 'Case study → Grounds preparation → Appeal filing → Court arguments',
    documents: 'Trial court order, Evidence records, Legal precedents, Appeal memo',
    outcomes: 'Conviction reversal, Sentence reduction, Acquittal, Retrial orders',
    icon: (
      <path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    ),
  },
  {
    title: 'Bail & Habeas Corpus',
    description: 'Urgent bail applications, anticipatory bail, habeas corpus petitions, and custody matters.',
    process: 'Urgent consultation → Bail application → Court hearing → Release coordination',
    documents: 'FIR, Charge sheet, Sureties, Property documents, Personal bonds',
    outcomes: 'Bail grant, Anticipatory bail, Release orders, Custody transfer',
    icon: (
      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    ),
  },
  {
    title: 'Family Law',
    description: 'Sensitive and compassionate representation in divorce, custody, adoption, and other family matters.',
    process: 'Consultation → Mediation → Legal filing → Court proceedings',
    documents: 'Marriage certificate, Income proof, Property documents, Child records',
    outcomes: 'Divorce decree, Custody orders, Alimony settlement, Property division',
    icon: (
      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    ),
  },
  {
    title: 'Real Estate Law',
    description: 'Expert guidance on property transactions, leases, zoning, and real estate disputes.',
    icon: (
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    ),
  },
  {
    title: 'Criminal Defense',
    description: 'Aggressive defense representation for individuals facing criminal charges.',
    icon: (
      <path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    ),
  },
  {
    title: 'Employment Law',
    description: 'Protecting employee rights and advising employers on compliance and workplace issues.',
    icon: (
      <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
  },
  {
    title: 'Estate Planning',
    description: 'Comprehensive planning for wills, trusts, probate, and asset protection.',
    icon: (
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    ),
  },
  {
    title: 'Intellectual Property',
    description: 'Protection and enforcement of patents, trademarks, copyrights, and trade secrets.',
    icon: (
      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    ),
  },
  {
    title: 'Personal Injury',
    description: 'Dedicated representation for accident victims seeking compensation for their injuries.',
    icon: (
      <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    ),
  },
  {
    title: 'Immigration Law',
    description: 'Assistance with visas, green cards, citizenship, and deportation defense.',
    icon: (
      <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
];

export default function PracticeAreasPage() {
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
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80"
              alt="Legal services"
              className="w-full h-full object-cover"
            />
            {/* Light overlay only for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-transparent"></div>
          </div>
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <AnimatedSection animation="fade">
              <div className="max-w-4xl text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Practice Areas</h1>
                <p className="text-xl">
                  Comprehensive legal services across multiple areas of law
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Practice Areas Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slide">
            <div className="max-w-6xl mx-auto mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
                Our Areas of Expertise
              </h2>
              <p className="text-lg text-black max-w-3xl mx-auto">
                Our experienced attorneys provide skilled representation across a wide range of legal matters. 
                Whatever your legal needs, we have the expertise to help.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {practiceAreas.map((area, index) => (
              <AnimatedSection 
                key={area.title} 
                animation="slide" 
                delay={index * 0.05}
              >
                <div className="bg-white border-2 border-[#1e40af] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
                  <div className="w-14 h-14 bg-[#1e40af] rounded-full flex items-center justify-center mb-4">
                    <svg 
                      className="w-7 h-7 text-white" 
                      fill="none" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      {area.icon}
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-black">{area.title}</h3>
                  <p className="text-black mb-4">{area.description}</p>
                  
                  {area.process && (
                    <div className="mt-auto pt-4 border-t border-gray-200 space-y-3">
                      <div>
                        <div className="flex items-center text-sm font-semibold text-black mb-1">
                          <svg className="w-4 h-4 mr-2 text-[#1e40af]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          Process
                        </div>
                        <p className="text-xs text-black pl-6">{area.process}</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center text-sm font-semibold text-black mb-1">
                          <svg className="w-4 h-4 mr-2 text-[#1e40af]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Required Documents
                        </div>
                        <p className="text-xs text-black pl-6">{area.documents}</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center text-sm font-semibold text-black mb-1">
                          <svg className="w-4 h-4 mr-2 text-[#1e40af]" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Typical Outcomes
                        </div>
                        <p className="text-xs text-black pl-6">{area.outcomes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fade">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
                Need Legal Assistance?
              </h2>
              <p className="text-xl mb-8 text-black">
                Contact us today to discuss your legal matter and learn how we can help
              </p>
              <a
                href="/contact"
                className="inline-block bg-[#1e40af] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1e3a8a] transition-colors shadow-lg"
              >
                Schedule a Consultation
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PublicLayout>
  );
}
