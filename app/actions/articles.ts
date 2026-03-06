'use client';

import type { Article } from '@/lib/types/database';

const STORAGE_KEY = 'demo_articles';

// DEMO MODE: Initial articles data - 10 comprehensive articles
const INITIAL_ARTICLES: Article[] = [
  {
    id: 'article-001',
    title: 'Understanding Cyber Crime Laws in India',
    slug: 'understanding-cyber-crime-laws-india',
    content: `
      <h2>Introduction to Cyber Crime in India</h2>
      <p>Cyber crime has become one of the fastest-growing criminal activities in India. With the increasing digitalization of services and businesses, understanding cyber crime laws is crucial for both individuals and organizations.</p>
      
      <h2>What Constitutes Cyber Crime?</h2>
      <p>Cyber crimes include hacking, identity theft, phishing, online fraud, cyberstalking, data theft, and distribution of malicious software. The Information Technology Act, 2000 (IT Act) is the primary legislation dealing with cyber crimes in India.</p>
      
      <h3>Key Provisions of IT Act</h3>
      <ul>
        <li><strong>Section 66:</strong> Computer-related offenses including hacking</li>
        <li><strong>Section 66C:</strong> Identity theft and punishment</li>
        <li><strong>Section 66D:</strong> Cheating by personation using computer resources</li>
        <li><strong>Section 67:</strong> Publishing obscene material in electronic form</li>
      </ul>
      
      <h2>Penalties and Punishments</h2>
      <p>Cyber crimes can attract imprisonment ranging from 3 years to life imprisonment, depending on the severity of the offense. Fines can range from ₹1 lakh to ₹10 lakhs or more.</p>
      
      <h2>How We Can Help</h2>
      <p>Our experienced legal team specializes in cyber crime defense. We provide comprehensive legal support including investigation assistance, bail applications, trial representation, and appeals to higher courts.</p>
      
      <blockquote>"In the digital age, protecting your rights requires specialized legal expertise. We're here to defend you against cyber crime allegations."</blockquote>
    `,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    tags: ['Cyber Crimes', 'IT Act', 'Criminal Law'],
    published: true,
    created_at: new Date('2026-02-26').toISOString(),
    updated_at: new Date('2026-02-26').toISOString(),
  },
  {
    id: 'article-002',
    title: 'Drug Crime Defense: Your Rights Under NDPS Act',
    slug: 'drug-crime-defense-ndps-act',
    content: `
      <h2>Overview of NDPS Act</h2>
      <p>The Narcotic Drugs and Psychotropic Substances Act, 1985 (NDPS Act) is a stringent law that deals with drug-related offenses in India.</p>
      
      <h2>Types of Drug Offenses</h2>
      <ul>
        <li><strong>Small Quantity:</strong> Possession for personal consumption</li>
        <li><strong>Commercial Quantity:</strong> Possession with intent to sell</li>
        <li><strong>Intermediate Quantity:</strong> Between small and commercial</li>
      </ul>
      
      <h2>Your Legal Rights</h2>
      <p>Even under the strict NDPS Act, you have fundamental rights including right to legal representation, right to bail in certain circumstances, and right to fair trial.</p>
      
      <blockquote>"NDPS cases require immediate legal intervention. The first 24 hours are critical for building a strong defense."</blockquote>
    `,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
    pdf_url: 'https://www.example.com/ndps-guide.pdf',
    tags: ['Drug Crimes', 'NDPS Act', 'Criminal Defense'],
    published: true,
    created_at: new Date('2026-02-24').toISOString(),
    updated_at: new Date('2026-02-24').toISOString(),
  },
  {
    id: 'article-003',
    title: 'Financial Crimes: Fraud and Money Laundering Defense',
    slug: 'financial-crimes-fraud-money-laundering',
    content: `
      <h2>Understanding Financial Crimes in India</h2>
      <p>Financial crimes encompass fraud, cheating, embezzlement, money laundering, and corruption. These offenses are governed by IPC, PMLA, and Prevention of Corruption Act.</p>
      
      <h2>Common Types of Financial Crimes</h2>
      <h3>1. Cheque Bounce Cases (Section 138 NI Act)</h3>
      <p>Dishonor of cheques is punishable with imprisonment up to 2 years or fine up to twice the cheque amount.</p>
      
      <h3>2. Fraud and Cheating (Section 420 IPC)</h3>
      <p>Cheating can result in imprisonment up to 7 years and fine.</p>
      
      <h3>3. Money Laundering (PMLA)</h3>
      <p>Concealing proceeds of crime can lead to imprisonment up to 7 years and heavy fines.</p>
      
      <h2>Legal Defense Strategies</h2>
      <p>Defending financial crime cases requires expertise in both criminal law and financial regulations.</p>
    `,
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    pdf_url: 'https://www.example.com/financial-crimes.pdf',
    tags: ['Financial Crimes', 'Fraud', 'Money Laundering'],
    published: true,
    created_at: new Date('2026-02-22').toISOString(),
    updated_at: new Date('2026-02-22').toISOString(),
  },
  {
    id: 'article-004',
    title: 'Bail Applications: Complete Legal Guide',
    slug: 'bail-applications-complete-guide',
    content: `
      <h2>Understanding Bail in India</h2>
      <p>Bail is the temporary release of an accused person awaiting trial. Understanding the bail process is crucial for anyone facing criminal charges.</p>
      
      <h2>Types of Bail</h2>
      <h3>1. Regular Bail</h3>
      <p>Applied for when a person is already arrested and in custody.</p>
      
      <h3>2. Anticipatory Bail</h3>
      <p>Applied for before arrest when a person apprehends arrest. Governed by Section 438 of CrPC.</p>
      
      <h3>3. Interim Bail</h3>
      <p>Temporary bail granted for a short period.</p>
      
      <h2>Factors Considered for Bail</h2>
      <ul>
        <li>Nature and gravity of offense</li>
        <li>Severity of punishment</li>
        <li>Character of accused</li>
        <li>Risk of fleeing justice</li>
      </ul>
      
      <blockquote>"Time is critical in bail matters. Immediate legal action can mean the difference between custody and freedom."</blockquote>
    `,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    tags: ['Bail', 'Criminal Law', 'Legal Rights'],
    published: true,
    created_at: new Date('2026-02-20').toISOString(),
    updated_at: new Date('2026-02-20').toISOString(),
  },
  {
    id: 'article-005',
    title: 'Deportation and Travel Ban Cases in India',
    slug: 'deportation-travel-ban-cases',
    content: `
      <h2>Understanding Deportation and Travel Restrictions</h2>
      <p>Deportation and travel bans can have serious consequences for both Indian nationals and foreign citizens.</p>
      
      <h2>Types of Travel Restrictions</h2>
      <h3>1. Look Out Circular (LOC)</h3>
      <p>Issued by law enforcement to prevent a person from leaving the country.</p>
      
      <h3>2. Deportation Orders</h3>
      <p>Foreign nationals can be deported for visa violations or criminal activities.</p>
      
      <h3>3. Passport Impoundment</h3>
      <p>Passport can be impounded under the Passport Act, 1967.</p>
      
      <h2>Legal Remedies</h2>
      <p>Several legal remedies are available including writ petitions, representations, and court permissions for specific travel.</p>
    `,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    tags: ['Deportation', 'Travel Ban', 'Immigration'],
    published: true,
    created_at: new Date('2026-02-18').toISOString(),
    updated_at: new Date('2026-02-18').toISOString(),
  },
  {
    id: 'article-006',
    title: 'Criminal Trial Process: From FIR to Judgment',
    slug: 'criminal-trial-process-fir-to-judgment',
    content: `
      <h2>Understanding Criminal Trial in India</h2>
      <p>The criminal trial process in India follows a structured procedure from the filing of FIR to the final judgment.</p>
      
      <h2>Stages of Criminal Trial</h2>
      <h3>1. FIR and Investigation</h3>
      <p>First Information Report is filed, followed by police investigation.</p>
      
      <h3>2. Chargesheet</h3>
      <p>Police file chargesheet if sufficient evidence is found.</p>
      
      <h3>3. Framing of Charges</h3>
      <p>Court frames charges after hearing both parties.</p>
      
      <h3>4. Trial</h3>
      <p>Evidence presentation, examination, and cross-examination of witnesses.</p>
      
      <h3>5. Arguments</h3>
      <p>Final arguments by prosecution and defense.</p>
      
      <h3>6. Judgment</h3>
      <p>Court delivers judgment based on evidence and arguments.</p>
      
      <h2>Your Rights During Trial</h2>
      <p>You have the right to legal representation, right to cross-examine witnesses, and right to present defense evidence.</p>
    `,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    tags: ['Criminal Trials', 'Court Procedures', 'Legal Process'],
    published: true,
    created_at: new Date('2026-02-16').toISOString(),
    updated_at: new Date('2026-02-16').toISOString(),
  },
  {
    id: 'article-007',
    title: 'White Collar Crimes: Corporate Fraud and Embezzlement',
    slug: 'white-collar-crimes-corporate-fraud',
    content: `
      <h2>Understanding White Collar Crimes</h2>
      <p>White collar crimes are non-violent crimes committed for financial gain, typically in business or professional settings.</p>
      
      <h2>Types of White Collar Crimes</h2>
      <ul>
        <li><strong>Corporate Fraud:</strong> Misrepresentation of company finances</li>
        <li><strong>Embezzlement:</strong> Theft of funds by employees</li>
        <li><strong>Insider Trading:</strong> Trading based on non-public information</li>
        <li><strong>Tax Evasion:</strong> Illegal non-payment of taxes</li>
        <li><strong>Bribery and Corruption:</strong> Offering or accepting bribes</li>
      </ul>
      
      <h2>Investigation Agencies</h2>
      <p>White collar crimes are investigated by CBI, ED, SFIO, and Income Tax Department.</p>
      
      <h2>Penalties</h2>
      <p>Penalties can include imprisonment, heavy fines, and disqualification from holding company positions.</p>
      
      <h2>Defense Strategies</h2>
      <p>Our team provides expert defense in white collar crime cases with focus on financial analysis and regulatory compliance.</p>
    `,
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80',
    pdf_url: 'https://www.example.com/white-collar-crimes.pdf',
    tags: ['White Collar Crimes', 'Corporate Fraud', 'Embezzlement'],
    published: true,
    created_at: new Date('2026-02-14').toISOString(),
    updated_at: new Date('2026-02-14').toISOString(),
  },
  {
    id: 'article-008',
    title: 'Domestic Violence Cases: Legal Protection and Remedies',
    slug: 'domestic-violence-legal-protection',
    content: `
      <h2>Protection Against Domestic Violence</h2>
      <p>The Protection of Women from Domestic Violence Act, 2005 provides legal protection to women facing domestic abuse.</p>
      
      <h2>What Constitutes Domestic Violence?</h2>
      <ul>
        <li>Physical abuse</li>
        <li>Emotional and verbal abuse</li>
        <li>Economic abuse</li>
        <li>Sexual abuse</li>
      </ul>
      
      <h2>Legal Remedies Available</h2>
      <h3>1. Protection Orders</h3>
      <p>Court can pass orders to prevent the abuser from committing acts of domestic violence.</p>
      
      <h3>2. Residence Orders</h3>
      <p>Victim can seek right to reside in the shared household.</p>
      
      <h3>3. Monetary Relief</h3>
      <p>Compensation for injuries, medical expenses, and loss of earnings.</p>
      
      <h3>4. Custody Orders</h3>
      <p>Temporary custody of children can be granted.</p>
      
      <h2>How to File a Complaint</h2>
      <p>Complaints can be filed with Protection Officers, police, or directly with Magistrate.</p>
    `,
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    tags: ['Domestic Violence', 'Women Rights', 'Legal Protection'],
    published: true,
    created_at: new Date('2026-02-12').toISOString(),
    updated_at: new Date('2026-02-12').toISOString(),
  },
  {
    id: 'article-009',
    title: 'Consumer Protection Laws in India',
    slug: 'consumer-protection-laws-india',
    content: `
      <h2>Consumer Rights in India</h2>
      <p>The Consumer Protection Act, 2019 provides comprehensive protection to consumers against unfair trade practices.</p>
      
      <h2>Consumer Rights</h2>
      <ul>
        <li>Right to safety</li>
        <li>Right to be informed</li>
        <li>Right to choose</li>
        <li>Right to be heard</li>
        <li>Right to seek redressal</li>
        <li>Right to consumer education</li>
      </ul>
      
      <h2>Consumer Disputes</h2>
      <p>Common consumer disputes include defective products, deficient services, unfair trade practices, and misleading advertisements.</p>
      
      <h2>Filing Consumer Complaints</h2>
      <h3>District Consumer Forum</h3>
      <p>For disputes up to ₹1 crore</p>
      
      <h3>State Consumer Commission</h3>
      <p>For disputes between ₹1 crore and ₹10 crores</p>
      
      <h3>National Consumer Commission</h3>
      <p>For disputes above ₹10 crores</p>
      
      <h2>E-Commerce Consumer Rights</h2>
      <p>Special provisions for online shopping including return policies, refunds, and liability of e-commerce platforms.</p>
    `,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
    tags: ['Consumer Protection', 'Consumer Rights', 'Legal Remedies'],
    published: true,
    created_at: new Date('2026-02-10').toISOString(),
    updated_at: new Date('2026-02-10').toISOString(),
  },
  {
    id: 'article-010',
    title: 'Property Disputes: Legal Solutions and Court Procedures',
    slug: 'property-disputes-legal-solutions',
    content: `
      <h2>Understanding Property Disputes in India</h2>
      <p>Property disputes are among the most common civil litigation matters in India, involving ownership, possession, and title issues.</p>
      
      <h2>Common Types of Property Disputes</h2>
      <ul>
        <li><strong>Title Disputes:</strong> Conflicting claims of ownership</li>
        <li><strong>Boundary Disputes:</strong> Disagreements over property boundaries</li>
        <li><strong>Inheritance Disputes:</strong> Conflicts over ancestral property</li>
        <li><strong>Landlord-Tenant Disputes:</strong> Rent, eviction, and maintenance issues</li>
        <li><strong>Illegal Possession:</strong> Encroachment and unauthorized occupation</li>
      </ul>
      
      <h2>Legal Remedies</h2>
      <h3>1. Civil Suit for Declaration</h3>
      <p>To establish ownership rights and title.</p>
      
      <h3>2. Suit for Possession</h3>
      <p>To recover possession of property.</p>
      
      <h3>3. Suit for Partition</h3>
      <p>To divide jointly owned property.</p>
      
      <h3>4. Injunction</h3>
      <p>To prevent illegal construction or encroachment.</p>
      
      <h2>Important Documents</h2>
      <p>Sale deed, title deed, property tax receipts, mutation records, and encumbrance certificate are crucial for property disputes.</p>
      
      <h2>Alternative Dispute Resolution</h2>
      <p>Mediation and arbitration can provide faster resolution compared to lengthy court proceedings.</p>
    `,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80',
    pdf_url: 'https://www.example.com/property-disputes.pdf',
    tags: ['Property Disputes', 'Civil Law', 'Real Estate'],
    published: true,
    created_at: new Date('2026-02-08').toISOString(),
    updated_at: new Date('2026-02-08').toISOString(),
  },
];

// Helper to get articles from localStorage
function getStoredArticles(): Article[] {
  if (typeof window === 'undefined') return INITIAL_ARTICLES;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return INITIAL_ARTICLES;
    }
  }
  // Initialize with default data
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ARTICLES));
  return INITIAL_ARTICLES;
}

// Helper to save articles to localStorage
function saveArticles(articles: Article[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    window.dispatchEvent(new Event('storage'));
  }
}

export async function listArticles() {
  await new Promise(resolve => setTimeout(resolve, 200));
  const articles = getStoredArticles();
  return { success: true, data: articles, error: null };
}

export async function getArticleById(id: string) {
  await new Promise(resolve => setTimeout(resolve, 200));
  const articles = getStoredArticles();
  const article = articles.find(a => a.id === id);
  return { 
    success: !!article, 
    data: article || null, 
    error: article ? null : 'Article not found' 
  };
}

export async function createArticle(data: any) {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newArticle: Article = {
    id: `article-${Date.now()}`,
    title: data.title,
    slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    content: data.content,
    image: data.image,
    video_url: data.video_url,
    pdf_url: data.pdf_url,
    tags: data.tags || [],
    seo_meta: data.seo_meta,
    published: data.published || false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  const articles = getStoredArticles();
  articles.unshift(newArticle);
  saveArticles(articles);
  
  console.log('✅ Article created:', data.title);
  return { success: true, data: newArticle, error: null };
}

export async function updateArticle(id: string, data: any) {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const articles = getStoredArticles();
  const index = articles.findIndex(a => a.id === id);
  
  if (index !== -1) {
    articles[index] = {
      ...articles[index],
      ...data,
      id,
      updated_at: new Date().toISOString(),
    };
    saveArticles(articles);
    console.log('✅ Article updated:', data.title);
    return { success: true, data: { id }, error: null };
  }
  
  return { success: false, data: null, error: 'Article not found' };
}

export async function deleteArticle(id: string) {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const articles = getStoredArticles();
  const filtered = articles.filter(a => a.id !== id);
  saveArticles(filtered);
  
  console.log('✅ Article deleted:', id);
  return { success: true, error: null };
}
