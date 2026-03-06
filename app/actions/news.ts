'use client';

import type { NewsItem } from '@/lib/types/database';

const STORAGE_KEY = 'demo_news';

const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'news-001',
    title: 'Supreme Court Landmark Judgment on Bail Rights',
    slug: 'supreme-court-landmark-judgment-bail-rights',
    content: `
      <p><strong>New Delhi, February 27, 2026</strong> - The Supreme Court delivered a landmark judgment strengthening bail rights for accused persons.</p>
      
      <p>The apex court held that "bail is the rule and jail is the exception," reiterating that liberty is a constitutional right.</p>
      
      <h3>Key Highlights</h3>
      <ul>
        <li>Courts must consider personal liberty while deciding bail</li>
        <li>Prolonged incarceration without trial violates Article 21</li>
        <li>Economic status should not be a barrier to bail</li>
        <li>Trial courts must provide detailed reasons when rejecting bail</li>
      </ul>
      
      <p>This judgment will have far-reaching implications for thousands of undertrials in jails across India.</p>
    `,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    published: true,
    created_at: new Date('2026-02-27').toISOString(),
    updated_at: new Date('2026-02-27').toISOString(),
  },
  {
    id: 'news-002',
    title: 'New Amendments to IT Act 2026',
    slug: 'new-amendments-it-act-2026',
    content: `
      <p><strong>Mumbai, February 25, 2026</strong> - Parliament passed significant amendments to the Information Technology Act, 2000.</p>
      
      <h3>Major Changes</h3>
      <ul>
        <li>Enhanced penalties for cyber fraud (3 to 5 years)</li>
        <li>New data protection provisions</li>
        <li>Social media platform accountability</li>
        <li>Cryptocurrency regulations framework</li>
      </ul>
      
      <p>Companies handling customer data must comply with new security standards by April 1, 2026.</p>
    `,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80',
    published: true,
    created_at: new Date('2026-02-25').toISOString(),
    updated_at: new Date('2026-02-25').toISOString(),
  },
  {
    id: 'news-003',
    title: 'Major Victory: Client Acquitted in NDPS Case',
    slug: 'major-victory-client-acquitted-ndps-case',
    content: `
      <p><strong>Delhi, February 23, 2026</strong> - Settle Here Law Associates secured complete acquittal in a high-profile NDPS case.</p>
      
      <p>Our client was arrested in 2023 on charges of possession of commercial quantity of narcotics. The Sessions Court noted serious procedural lapses and held that prosecution failed to prove the case beyond reasonable doubt.</p>
      
      <h3>Legal Strategy</h3>
      <ul>
        <li>Challenged legality of search and seizure</li>
        <li>Questioned chain of custody</li>
        <li>Challenged admissibility of confessions</li>
        <li>Proved failure to establish conscious possession</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&q=80',
    published: true,
    created_at: new Date('2026-02-23').toISOString(),
    updated_at: new Date('2026-02-23').toISOString(),
  },
  {
    id: 'news-004',
    title: 'Free Webinar: Understanding Your Rights in Criminal Cases',
    slug: 'webinar-understanding-rights-criminal-cases',
    content: `
      <p><strong>Announcement</strong> - Free webinar on March 5, 2026, at 6:00 PM IST.</p>
      
      <h3>Topics Covered</h3>
      <ul>
        <li>Fundamental rights of accused persons</li>
        <li>Bail application process</li>
        <li>Handling police interrogation</li>
        <li>Rights during arrest and custody</li>
        <li>Common mistakes to avoid</li>
      </ul>
      
      <p>Register now by calling +91 8055666660. Limited seats available!</p>
    `,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
    published: true,
    created_at: new Date('2026-02-21').toISOString(),
    updated_at: new Date('2026-02-21').toISOString(),
  },
  {
    id: 'news-005',
    title: 'New Office Opening in Bangalore',
    slug: 'new-office-opening-bangalore',
    content: `
      <p><strong>Bangalore, February 19, 2026</strong> - Expanding our presence in South India with a new Bangalore office.</p>
      
      <h3>Services Available</h3>
      <ul>
        <li>Criminal law consultation</li>
        <li>Cyber crime legal support</li>
        <li>NDPS Act cases</li>
        <li>Financial crime defense</li>
        <li>Bail applications</li>
      </ul>
      
      <p><strong>Opening Date:</strong> March 1, 2026<br>
      <strong>Special Offer:</strong> 20% discount for first month registrations</p>
    `,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    published: true,
    created_at: new Date('2026-02-19').toISOString(),
    updated_at: new Date('2026-02-19').toISOString(),
  },
  {
    id: 'news-006',
    title: 'High Court Sets Precedent in Cyber Stalking Case',
    slug: 'high-court-precedent-cyber-stalking',
    content: `
      <p><strong>Mumbai, February 17, 2026</strong> - Bombay High Court set an important precedent in a cyber stalking case, clarifying the scope of Section 354D IPC in digital context.</p>
      
      <p>The court held that persistent online harassment through multiple platforms constitutes stalking under law, even without physical following.</p>
      
      <h3>Implications</h3>
      <ul>
        <li>Broader interpretation of stalking laws</li>
        <li>Protection for online harassment victims</li>
        <li>Clear guidelines for social media conduct</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80',
    published: true,
    created_at: new Date('2026-02-17').toISOString(),
    updated_at: new Date('2026-02-17').toISOString(),
  },
  {
    id: 'news-007',
    title: 'Government Announces Fast-Track Courts for Financial Crimes',
    slug: 'fast-track-courts-financial-crimes',
    content: `
      <p><strong>New Delhi, February 15, 2026</strong> - Government announced establishment of 50 fast-track courts dedicated to financial crime cases.</p>
      
      <p>These courts will handle cases related to cheque bounce, fraud, money laundering, and corporate crimes with a target to dispose cases within 6 months.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>Dedicated judges with financial crime expertise</li>
        <li>Digital case management system</li>
        <li>Time-bound trial completion</li>
        <li>Special prosecutors for complex cases</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80',
    published: true,
    created_at: new Date('2026-02-15').toISOString(),
    updated_at: new Date('2026-02-15').toISOString(),
  },
  {
    id: 'news-008',
    title: 'Legal Aid Clinic Launch for Underprivileged',
    slug: 'legal-aid-clinic-launch',
    content: `
      <p><strong>Delhi, February 13, 2026</strong> - Settle Here Law Associates launches free legal aid clinic for underprivileged sections of society.</p>
      
      <p>The clinic will provide free legal consultation, representation in lower courts, and assistance with bail applications for those who cannot afford legal services.</p>
      
      <h3>Services Offered</h3>
      <ul>
        <li>Free legal consultation (every Saturday)</li>
        <li>Assistance with bail applications</li>
        <li>Representation in trial courts</li>
        <li>Legal awareness programs</li>
      </ul>
      
      <p><strong>Location:</strong> Community Center, Connaught Place<br>
      <strong>Timings:</strong> Every Saturday, 10 AM - 2 PM</p>
    `,
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80',
    published: true,
    created_at: new Date('2026-02-13').toISOString(),
    updated_at: new Date('2026-02-13').toISOString(),
  },
  {
    id: 'news-009',
    title: 'Supreme Court Ruling on Digital Evidence Admissibility',
    slug: 'supreme-court-digital-evidence-ruling',
    content: `
      <p><strong>New Delhi, February 11, 2026</strong> - Supreme Court issued comprehensive guidelines on admissibility of digital evidence in criminal trials.</p>
      
      <p>The ruling addresses concerns about authenticity, chain of custody, and forensic examination of digital evidence including WhatsApp messages, emails, and social media posts.</p>
      
      <h3>Key Guidelines</h3>
      <ul>
        <li>Mandatory forensic certification for digital evidence</li>
        <li>Proper documentation of chain of custody</li>
        <li>Cross-examination rights on digital evidence</li>
        <li>Standards for screenshot authentication</li>
      </ul>
      
      <p>This ruling will significantly impact cyber crime prosecutions and defenses across India.</p>
    `,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    published: true,
    created_at: new Date('2026-02-11').toISOString(),
    updated_at: new Date('2026-02-11').toISOString(),
  },
  {
    id: 'news-010',
    title: 'Successful Bail in High-Profile Money Laundering Case',
    slug: 'successful-bail-money-laundering-case',
    content: `
      <p><strong>Mumbai, February 9, 2026</strong> - Our legal team secured bail for a prominent businessman in a ₹500 crore money laundering case.</p>
      
      <p>The Special PMLA Court granted bail after accepting our arguments on lack of prima facie evidence and violation of procedural safeguards during investigation.</p>
      
      <h3>Case Highlights</h3>
      <ul>
        <li>Challenged ED's investigation methodology</li>
        <li>Proved compliance with all summons</li>
        <li>Demonstrated no flight risk</li>
        <li>Highlighted medical grounds</li>
      </ul>
      
      <p>This case demonstrates that even in serious PMLA cases, bail is possible with strong legal arguments and proper documentation.</p>
    `,
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80',
    published: true,
    created_at: new Date('2026-02-09').toISOString(),
    updated_at: new Date('2026-02-09').toISOString(),
  },
];

function getStoredNews(): NewsItem[] {
  if (typeof window === 'undefined') return INITIAL_NEWS;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return INITIAL_NEWS;
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_NEWS));
  return INITIAL_NEWS;
}

function saveNews(news: NewsItem[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(news));
    window.dispatchEvent(new Event('storage'));
  }
}

export async function listNews() {
  await new Promise(resolve => setTimeout(resolve, 200));
  return { success: true, data: getStoredNews(), error: null };
}

export async function getNewsById(id: string) {
  await new Promise(resolve => setTimeout(resolve, 200));
  const news = getStoredNews();
  const item = news.find(n => n.id === id);
  return { success: !!item, data: item || null, error: item ? null : 'News not found' };
}

export async function createNews(data: any) {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newNews: NewsItem = {
    id: `news-${Date.now()}`,
    title: data.title,
    slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    content: data.content,
    image: data.image,
    published: data.published || false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  const news = getStoredNews();
  news.unshift(newNews);
  saveNews(news);
  
  console.log('✅ News created:', data.title);
  return { success: true, data: newNews, error: null };
}

export async function updateNews(id: string, data: any) {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const news = getStoredNews();
  const index = news.findIndex(n => n.id === id);
  
  if (index !== -1) {
    news[index] = {
      ...news[index],
      ...data,
      id,
      updated_at: new Date().toISOString(),
    };
    saveNews(news);
    console.log('✅ News updated:', data.title);
    return { success: true, data: { id }, error: null };
  }
  
  return { success: false, data: null, error: 'News not found' };
}

export async function deleteNews(id: string) {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const news = getStoredNews();
  const filtered = news.filter(n => n.id !== id);
  saveNews(filtered);
  
  console.log('✅ News deleted:', id);
  return { success: true, error: null };
}
