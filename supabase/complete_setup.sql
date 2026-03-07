-- ============================================================================
-- COMPLETE SUPABASE DATABASE SETUP FOR LAW FIRM WEB APP
-- ============================================================================
-- This file contains all necessary SQL to set up your Supabase database
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/xexmohjnzmqsqkansitu/sql
-- ============================================================================

-- ============================================================================
-- STEP 1: CREATE TABLES
-- ============================================================================

-- 1.1 Create profiles table (linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for profiles
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- 1.2 Create news table
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  image TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for news
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
CREATE INDEX IF NOT EXISTS idx_news_published ON news(published);
CREATE INDEX IF NOT EXISTS idx_news_created_at ON news(created_at DESC);

-- 1.3 Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  image TEXT,
  video_url TEXT,
  pdf_url TEXT,
  tags TEXT[],
  seo_meta JSONB,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for articles
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_tags ON articles USING GIN(tags);

-- 1.4 Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for videos
CREATE INDEX IF NOT EXISTS idx_videos_slug ON videos(slug);
CREATE INDEX IF NOT EXISTS idx_videos_published ON videos(published);
CREATE INDEX IF NOT EXISTS idx_videos_created_at ON videos(created_at DESC);

-- 1.5 Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firm_name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  social_links JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure only one settings row exists
CREATE UNIQUE INDEX IF NOT EXISTS idx_settings_singleton ON settings ((id IS NOT NULL));

-- ============================================================================
-- STEP 2: CREATE FUNCTIONS AND TRIGGERS
-- ============================================================================

-- 2.1 Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2.2 Create triggers for all tables
CREATE TRIGGER update_news_updated_at
  BEFORE UPDATE ON news
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_videos_updated_at
  BEFORE UPDATE ON videos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- STEP 3: ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- 3.1 Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- STEP 4: CREATE RLS POLICIES
-- ============================================================================

-- 4.1 Profiles policies
CREATE POLICY "Admin users can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "Admin users can insert profiles"
  ON profiles FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admin users can update profiles"
  ON profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admin users can delete profiles"
  ON profiles FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 4.2 News policies
CREATE POLICY "Public can view published news"
  ON news FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can view all news"
  ON news FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert news"
  ON news FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update news"
  ON news FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete news"
  ON news FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- 4.3 Articles policies
CREATE POLICY "Public can view published articles"
  ON articles FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can view all articles"
  ON articles FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert articles"
  ON articles FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update articles"
  ON articles FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete articles"
  ON articles FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- 4.4 Videos policies
CREATE POLICY "Public can view published videos"
  ON videos FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can view all videos"
  ON videos FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert videos"
  ON videos FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update videos"
  ON videos FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete videos"
  ON videos FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- 4.5 Settings policies
CREATE POLICY "Public can view settings"
  ON settings FOR SELECT
  USING (true);

CREATE POLICY "Admin users can update settings"
  ON settings FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admin users can insert settings"
  ON settings FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================================
-- STEP 5: CREATE ADMIN USER
-- ============================================================================
-- IMPORTANT: You need to create the admin user in Supabase Auth first!
-- Go to: Authentication > Users > Add User
-- Email: admin@settlehere.com
-- Password: Admin@123456
-- After creating the user, copy the UUID and run the INSERT below

-- Replace 'YOUR_ADMIN_USER_UUID' with the actual UUID from Supabase Auth
-- Example:
-- INSERT INTO profiles (id, username, role)
-- VALUES ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'admin', 'admin');

-- ============================================================================
-- STEP 6: INSERT INITIAL DATA
-- ============================================================================

-- 6.1 Insert firm settings
INSERT INTO settings (firm_name, address, phone, email, social_links)
VALUES (
  'Settle Here Law Associates',
  'Connaught Place, New Delhi, India',
  '+91 8055666660',
  'contact@settlehere.com',
  '{
    "facebook": "https://facebook.com/settleherelawfirm",
    "twitter": "https://twitter.com/settleherelawfirm",
    "linkedin": "https://linkedin.com/company/settleherelawfirm",
    "instagram": "https://instagram.com/settleherelawfirm"
  }'::jsonb
)
ON CONFLICT DO NOTHING;

-- 6.2 Insert sample articles (10 items)
INSERT INTO articles (title, slug, content, image, video_url, pdf_url, tags, seo_meta, published, created_at)
VALUES 
  (
    'Understanding Cyber Crime Laws in India',
    'understanding-cyber-crime-laws-india',
    '<h2>Introduction to Cyber Crime in India</h2><p>Cyber crime has become one of the fastest-growing criminal activities in India. With the increasing digitalization of services and businesses, understanding cyber crime laws is crucial for both individuals and organizations.</p><h2>What Constitutes Cyber Crime?</h2><p>Cyber crimes include hacking, identity theft, phishing, online fraud, cyberstalking, data theft, and distribution of malicious software. The Information Technology Act, 2000 (IT Act) is the primary legislation dealing with cyber crimes in India.</p><h3>Key Provisions of IT Act</h3><ul><li><strong>Section 66:</strong> Computer-related offenses including hacking</li><li><strong>Section 66C:</strong> Identity theft and punishment</li><li><strong>Section 66D:</strong> Cheating by personation using computer resources</li><li><strong>Section 67:</strong> Publishing obscene material in electronic form</li></ul><h2>Penalties and Punishments</h2><p>Cyber crimes can attract imprisonment ranging from 3 years to life imprisonment, depending on the severity of the offense. Fines can range from ₹1 lakh to ₹10 lakhs or more.</p>',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    NULL,
    ARRAY['Cyber Crimes', 'IT Act', 'Criminal Law'],
    '{"title": "Understanding Cyber Crime Laws in India", "description": "Complete guide to cyber crime laws, IT Act provisions, and legal defense strategies", "keywords": ["cyber crime", "IT Act", "hacking", "online fraud"]}'::jsonb,
    true,
    NOW() - INTERVAL '8 days'
  ),
  (
    'Drug Crime Defense: Your Rights Under NDPS Act',
    'drug-crime-defense-ndps-act',
    '<h2>Overview of NDPS Act</h2><p>The Narcotic Drugs and Psychotropic Substances Act, 1985 (NDPS Act) is a stringent law that deals with drug-related offenses in India.</p><h2>Types of Drug Offenses</h2><ul><li><strong>Small Quantity:</strong> Possession for personal consumption</li><li><strong>Commercial Quantity:</strong> Possession with intent to sell</li><li><strong>Intermediate Quantity:</strong> Between small and commercial</li></ul><h2>Your Legal Rights</h2><p>Even under the strict NDPS Act, you have fundamental rights including right to legal representation, right to bail in certain circumstances, and right to fair trial.</p>',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
    NULL,
    'https://www.example.com/ndps-guide.pdf',
    ARRAY['Drug Crimes', 'NDPS Act', 'Criminal Defense'],
    '{"title": "Drug Crime Defense Under NDPS Act", "description": "Understanding NDPS Act provisions and your legal rights in drug crime cases", "keywords": ["NDPS Act", "drug crimes", "bail", "legal defense"]}'::jsonb,
    true,
    NOW() - INTERVAL '10 days'
  ),
  (
    'Financial Crimes: Fraud and Money Laundering Defense',
    'financial-crimes-fraud-money-laundering',
    '<h2>Understanding Financial Crimes in India</h2><p>Financial crimes encompass fraud, cheating, embezzlement, money laundering, and corruption. These offenses are governed by IPC, PMLA, and Prevention of Corruption Act.</p><h2>Common Types of Financial Crimes</h2><h3>1. Cheque Bounce Cases (Section 138 NI Act)</h3><p>Dishonor of cheques is punishable with imprisonment up to 2 years or fine up to twice the cheque amount.</p><h3>2. Fraud and Cheating (Section 420 IPC)</h3><p>Cheating can result in imprisonment up to 7 years and fine.</p><h3>3. Money Laundering (PMLA)</h3><p>Concealing proceeds of crime can lead to imprisonment up to 7 years and heavy fines.</p>',
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://www.example.com/financial-crimes.pdf',
    ARRAY['Financial Crimes', 'Fraud', 'Money Laundering'],
    '{"title": "Financial Crimes Defense Guide", "description": "Expert legal defense for fraud, money laundering, and financial crime cases", "keywords": ["financial crimes", "fraud", "money laundering", "PMLA"]}'::jsonb,
    true,
    NOW() - INTERVAL '12 days'
  ),
  (
    'Bail Applications: Complete Legal Guide',
    'bail-applications-complete-guide',
    '<h2>Understanding Bail in India</h2><p>Bail is the temporary release of an accused person awaiting trial. Understanding the bail process is crucial for anyone facing criminal charges.</p><h2>Types of Bail</h2><h3>1. Regular Bail</h3><p>Applied for when a person is already arrested and in custody.</p><h3>2. Anticipatory Bail</h3><p>Applied for before arrest when a person apprehends arrest. Governed by Section 438 of CrPC.</p><h3>3. Interim Bail</h3><p>Temporary bail granted for a short period.</p>',
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    NULL,
    NULL,
    ARRAY['Bail', 'Criminal Law', 'Legal Rights'],
    '{"title": "Bail Applications Complete Guide", "description": "Everything you need to know about bail applications in India", "keywords": ["bail", "anticipatory bail", "criminal law", "legal rights"]}'::jsonb,
    true,
    NOW() - INTERVAL '14 days'
  ),
  (
    'Deportation and Travel Ban Cases in India',
    'deportation-travel-ban-cases',
    '<h2>Understanding Deportation and Travel Restrictions</h2><p>Deportation and travel bans can have serious consequences for both Indian nationals and foreign citizens.</p><h2>Types of Travel Restrictions</h2><h3>1. Look Out Circular (LOC)</h3><p>Issued by law enforcement to prevent a person from leaving the country.</p><h3>2. Deportation Orders</h3><p>Foreign nationals can be deported for visa violations or criminal activities.</p><h3>3. Passport Impoundment</h3><p>Passport can be impounded under the Passport Act, 1967.</p>',
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    NULL,
    ARRAY['Deportation', 'Travel Ban', 'Immigration'],
    '{"title": "Deportation and Travel Ban Cases", "description": "Legal remedies for deportation orders and travel restrictions in India", "keywords": ["deportation", "travel ban", "LOC", "passport impoundment"]}'::jsonb,
    true,
    NOW() - INTERVAL '16 days'
  ),
  (
    'Criminal Trial Process: From FIR to Judgment',
    'criminal-trial-process-fir-to-judgment',
    '<h2>Understanding Criminal Trial in India</h2><p>The criminal trial process in India follows a structured procedure from the filing of FIR to the final judgment.</p><h2>Stages of Criminal Trial</h2><h3>1. FIR and Investigation</h3><p>First Information Report is filed, followed by police investigation.</p><h3>2. Chargesheet</h3><p>Police file chargesheet if sufficient evidence is found.</p><h3>3. Framing of Charges</h3><p>Court frames charges after hearing both parties.</p>',
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    NULL,
    NULL,
    ARRAY['Criminal Trials', 'Court Procedures', 'Legal Process'],
    '{"title": "Criminal Trial Process in India", "description": "Complete guide to criminal trial stages from FIR to judgment", "keywords": ["criminal trial", "FIR", "chargesheet", "court procedures"]}'::jsonb,
    true,
    NOW() - INTERVAL '18 days'
  ),
  (
    'White Collar Crimes: Corporate Fraud and Embezzlement',
    'white-collar-crimes-corporate-fraud',
    '<h2>Understanding White Collar Crimes</h2><p>White collar crimes are non-violent crimes committed for financial gain, typically in business or professional settings.</p><h2>Types of White Collar Crimes</h2><ul><li><strong>Corporate Fraud:</strong> Misrepresentation of company finances</li><li><strong>Embezzlement:</strong> Theft of funds by employees</li><li><strong>Insider Trading:</strong> Trading based on non-public information</li><li><strong>Tax Evasion:</strong> Illegal non-payment of taxes</li><li><strong>Bribery and Corruption:</strong> Offering or accepting bribes</li></ul>',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80',
    NULL,
    'https://www.example.com/white-collar-crimes.pdf',
    ARRAY['White Collar Crimes', 'Corporate Fraud', 'Embezzlement'],
    '{"title": "White Collar Crimes Defense", "description": "Expert legal defense for corporate fraud and embezzlement cases", "keywords": ["white collar crimes", "corporate fraud", "embezzlement", "insider trading"]}'::jsonb,
    true,
    NOW() - INTERVAL '20 days'
  ),
  (
    'Domestic Violence Cases: Legal Protection and Remedies',
    'domestic-violence-legal-protection',
    '<h2>Protection Against Domestic Violence</h2><p>The Protection of Women from Domestic Violence Act, 2005 provides legal protection to women facing domestic abuse.</p><h2>What Constitutes Domestic Violence?</h2><ul><li>Physical abuse</li><li>Emotional and verbal abuse</li><li>Economic abuse</li><li>Sexual abuse</li></ul><h2>Legal Remedies Available</h2><h3>1. Protection Orders</h3><p>Court can pass orders to prevent the abuser from committing acts of domestic violence.</p>',
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    NULL,
    ARRAY['Domestic Violence', 'Women Rights', 'Legal Protection'],
    '{"title": "Domestic Violence Legal Protection", "description": "Legal remedies and protection for domestic violence victims", "keywords": ["domestic violence", "women rights", "protection orders", "legal remedies"]}'::jsonb,
    true,
    NOW() - INTERVAL '22 days'
  ),
  (
    'Consumer Protection Laws in India',
    'consumer-protection-laws-india',
    '<h2>Consumer Rights in India</h2><p>The Consumer Protection Act, 2019 provides comprehensive protection to consumers against unfair trade practices.</p><h2>Consumer Rights</h2><ul><li>Right to safety</li><li>Right to be informed</li><li>Right to choose</li><li>Right to be heard</li><li>Right to seek redressal</li><li>Right to consumer education</li></ul>',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
    NULL,
    NULL,
    ARRAY['Consumer Protection', 'Consumer Rights', 'Legal Remedies'],
    '{"title": "Consumer Protection Laws in India", "description": "Complete guide to consumer rights and legal remedies", "keywords": ["consumer protection", "consumer rights", "consumer forum", "legal remedies"]}'::jsonb,
    true,
    NOW() - INTERVAL '24 days'
  ),
  (
    'Property Disputes: Legal Solutions and Court Procedures',
    'property-disputes-legal-solutions',
    '<h2>Understanding Property Disputes in India</h2><p>Property disputes are among the most common civil litigation matters in India, involving ownership, possession, and title issues.</p><h2>Common Types of Property Disputes</h2><ul><li><strong>Title Disputes:</strong> Conflicting claims of ownership</li><li><strong>Boundary Disputes:</strong> Disagreements over property boundaries</li><li><strong>Inheritance Disputes:</strong> Conflicts over ancestral property</li></ul>',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80',
    NULL,
    'https://www.example.com/property-disputes.pdf',
    ARRAY['Property Disputes', 'Civil Law', 'Real Estate'],
    '{"title": "Property Disputes Legal Solutions", "description": "Legal remedies and court procedures for property disputes in India", "keywords": ["property disputes", "civil law", "real estate", "title disputes"]}'::jsonb,
    true,
    NOW() - INTERVAL '26 days'
  )
ON CONFLICT (slug) DO NOTHING;

-- 6.3 Insert sample news (10 items)
INSERT INTO news (title, slug, content, image, published, created_at)
VALUES 
  (
    'Supreme Court Landmark Judgment on Bail Rights',
    'supreme-court-landmark-judgment-bail-rights',
    '<p><strong>New Delhi, February 27, 2026</strong> - The Supreme Court delivered a landmark judgment strengthening bail rights for accused persons.</p><p>The apex court held that "bail is the rule and jail is the exception," reiterating that liberty is a constitutional right.</p><h3>Key Highlights</h3><ul><li>Courts must consider personal liberty while deciding bail</li><li>Prolonged incarceration without trial violates Article 21</li><li>Economic status should not be a barrier to bail</li><li>Trial courts must provide detailed reasons when rejecting bail</li></ul>',
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    true,
    NOW() - INTERVAL '1 day'
  ),
  (
    'New Amendments to IT Act 2026',
    'new-amendments-it-act-2026',
    '<p><strong>Mumbai, February 25, 2026</strong> - Parliament passed significant amendments to the Information Technology Act, 2000.</p><h3>Major Changes</h3><ul><li>Enhanced penalties for cyber fraud (3 to 5 years)</li><li>New data protection provisions</li><li>Social media platform accountability</li><li>Cryptocurrency regulations framework</li></ul>',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80',
    true,
    NOW() - INTERVAL '3 days'
  ),
  (
    'Major Victory: Client Acquitted in NDPS Case',
    'major-victory-client-acquitted-ndps-case',
    '<p><strong>Delhi, February 23, 2026</strong> - Settle Here Law Associates secured complete acquittal in a high-profile NDPS case.</p><p>Our client was arrested in 2023 on charges of possession of commercial quantity of narcotics. The Sessions Court noted serious procedural lapses and held that prosecution failed to prove the case beyond reasonable doubt.</p>',
    'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&q=80',
    true,
    NOW() - INTERVAL '5 days'
  ),
  (
    'Free Webinar: Understanding Your Rights in Criminal Cases',
    'webinar-understanding-rights-criminal-cases',
    '<p><strong>Announcement</strong> - Free webinar on March 5, 2026, at 6:00 PM IST.</p><h3>Topics Covered</h3><ul><li>Fundamental rights of accused persons</li><li>Bail application process</li><li>Handling police interrogation</li><li>Rights during arrest and custody</li><li>Common mistakes to avoid</li></ul>',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
    true,
    NOW() - INTERVAL '7 days'
  ),
  (
    'New Office Opening in Bangalore',
    'new-office-opening-bangalore',
    '<p><strong>Bangalore, February 19, 2026</strong> - Expanding our presence in South India with a new Bangalore office.</p><h3>Services Available</h3><ul><li>Criminal law consultation</li><li>Cyber crime legal support</li><li>NDPS Act cases</li><li>Financial crime defense</li><li>Bail applications</li></ul>',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    true,
    NOW() - INTERVAL '9 days'
  ),
  (
    'High Court Sets Precedent in Cyber Stalking Case',
    'high-court-precedent-cyber-stalking',
    '<p><strong>Mumbai, February 17, 2026</strong> - Bombay High Court set an important precedent in a cyber stalking case, clarifying the scope of Section 354D IPC in digital context.</p><p>The court held that persistent online harassment through multiple platforms constitutes stalking under law, even without physical following.</p>',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80',
    true,
    NOW() - INTERVAL '11 days'
  ),
  (
    'Government Announces Fast-Track Courts for Financial Crimes',
    'fast-track-courts-financial-crimes',
    '<p><strong>New Delhi, February 15, 2026</strong> - Government announced establishment of 50 fast-track courts dedicated to financial crime cases.</p><p>These courts will handle cases related to cheque bounce, fraud, money laundering, and corporate crimes with a target to dispose cases within 6 months.</p>',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80',
    true,
    NOW() - INTERVAL '13 days'
  ),
  (
    'Legal Aid Clinic Launch for Underprivileged',
    'legal-aid-clinic-launch',
    '<p><strong>Delhi, February 13, 2026</strong> - Settle Here Law Associates launches free legal aid clinic for underprivileged sections of society.</p><p>The clinic will provide free legal consultation, representation in lower courts, and assistance with bail applications for those who cannot afford legal services.</p>',
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80',
    true,
    NOW() - INTERVAL '15 days'
  ),
  (
    'Supreme Court Ruling on Digital Evidence Admissibility',
    'supreme-court-digital-evidence-ruling',
    '<p><strong>New Delhi, February 11, 2026</strong> - Supreme Court issued comprehensive guidelines on admissibility of digital evidence in criminal trials.</p><p>The ruling addresses concerns about authenticity, chain of custody, and forensic examination of digital evidence including WhatsApp messages, emails, and social media posts.</p>',
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    true,
    NOW() - INTERVAL '17 days'
  ),
  (
    'Successful Bail in High-Profile Money Laundering Case',
    'successful-bail-money-laundering-case',
    '<p><strong>Mumbai, February 9, 2026</strong> - Our legal team secured bail for a prominent businessman in a ₹500 crore money laundering case.</p><p>The Special PMLA Court granted bail after accepting our arguments on lack of prima facie evidence and violation of procedural safeguards during investigation.</p>',
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80',
    true,
    NOW() - INTERVAL '19 days'
  )
ON CONFLICT (slug) DO NOTHING;

-- 6.4 Insert sample videos (10 items)
INSERT INTO videos (title, slug, description, video_url, thumbnail, published, created_at)
VALUES 
  (
    'What to Do When Arrested: Know Your Rights',
    'what-to-do-when-arrested-know-your-rights',
    'Comprehensive guide on your fundamental rights during arrest and police custody. Learn what you should and shouldn''t do when facing arrest, your right to legal representation, and how to protect yourself during interrogation.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    true,
    NOW() - INTERVAL '1 day'
  ),
  (
    'Cyber Crime in India: Types and Legal Remedies',
    'cyber-crime-india-types-legal-remedies',
    'Understanding different types of cyber crimes in India including hacking, phishing, identity theft, and online fraud. Learn about IT Act provisions, how to file complaints, and legal remedies available.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80',
    true,
    NOW() - INTERVAL '3 days'
  ),
  (
    'NDPS Act Explained: Drug Laws in India',
    'ndps-act-explained-drug-laws-india',
    'Detailed explanation of the Narcotic Drugs and Psychotropic Substances Act, 1985. Learn about different categories of drug offenses, penalties, bail provisions, and defense strategies in NDPS cases.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
    true,
    NOW() - INTERVAL '5 days'
  ),
  (
    'Bail Application Process: Step by Step Guide',
    'bail-application-process-step-by-step',
    'Complete walkthrough of the bail application process in India. Learn about different types of bail, required documents, court procedures, and factors that courts consider while granting bail.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&q=80',
    true,
    NOW() - INTERVAL '7 days'
  ),
  (
    'Financial Crimes: Fraud, Cheating, and Money Laundering',
    'financial-crimes-fraud-cheating-money-laundering',
    'Understanding financial crimes in India including cheque bounce cases, fraud under Section 420 IPC, money laundering under PMLA, and embezzlement. Learn about investigation procedures and legal defenses.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80',
    true,
    NOW() - INTERVAL '9 days'
  ),
  (
    'How to Handle Police Interrogation',
    'how-to-handle-police-interrogation',
    'Expert advice on handling police interrogation and questioning. Learn your rights during interrogation, when you can refuse to answer, importance of legal representation, and how to avoid self-incrimination.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    true,
    NOW() - INTERVAL '11 days'
  ),
  (
    'Deportation and Travel Ban Cases in India',
    'deportation-travel-ban-cases-india',
    'Understanding deportation procedures, Look Out Circulars (LOC), passport impoundment, and travel restrictions in India. Learn about legal remedies and how to challenge travel bans.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80',
    true,
    NOW() - INTERVAL '13 days'
  ),
  (
    'Criminal Trial Process in India',
    'criminal-trial-process-india',
    'Complete overview of the criminal trial process in India from FIR to judgment. Learn about investigation, chargesheet, framing of charges, evidence presentation, cross-examination, and appeals.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    true,
    NOW() - INTERVAL '15 days'
  ),
  (
    'Domestic Violence: Legal Protection and Remedies',
    'domestic-violence-legal-protection-remedies',
    'Understanding the Protection of Women from Domestic Violence Act, 2005. Learn about types of domestic violence, how to file complaints, protection orders, residence orders, and monetary relief.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80',
    true,
    NOW() - INTERVAL '17 days'
  ),
  (
    'Consumer Rights and Legal Remedies in India',
    'consumer-rights-legal-remedies-india',
    'Complete guide to consumer protection laws in India. Learn about your rights as a consumer, how to file complaints in consumer forums, and remedies for defective products and deficient services.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
    true,
    NOW() - INTERVAL '19 days'
  )
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- STEP 7: CREATE HELPER FUNCTIONS FOR ADMIN DASHBOARD
-- ============================================================================

-- 7.1 Function to get content statistics
CREATE OR REPLACE FUNCTION get_content_stats()
RETURNS TABLE (
  total_articles BIGINT,
  published_articles BIGINT,
  total_news BIGINT,
  published_news BIGINT,
  total_videos BIGINT,
  published_videos BIGINT,
  total_users BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    (SELECT COUNT(*) FROM articles) AS total_articles,
    (SELECT COUNT(*) FROM articles WHERE published = true) AS published_articles,
    (SELECT COUNT(*) FROM news) AS total_news,
    (SELECT COUNT(*) FROM news WHERE published = true) AS published_news,
    (SELECT COUNT(*) FROM videos) AS total_videos,
    (SELECT COUNT(*) FROM videos WHERE published = true) AS published_videos,
    (SELECT COUNT(*) FROM profiles) AS total_users;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7.2 Function to get recent content
CREATE OR REPLACE FUNCTION get_recent_content(content_limit INT DEFAULT 5)
RETURNS TABLE (
  content_type TEXT,
  id UUID,
  title TEXT,
  slug TEXT,
  published BOOLEAN,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  (
    SELECT 'article'::TEXT, a.id, a.title, a.slug, a.published, a.created_at
    FROM articles a
    ORDER BY a.created_at DESC
    LIMIT content_limit
  )
  UNION ALL
  (
    SELECT 'news'::TEXT, n.id, n.title, n.slug, n.published, n.created_at
    FROM news n
    ORDER BY n.created_at DESC
    LIMIT content_limit
  )
  UNION ALL
  (
    SELECT 'video'::TEXT, v.id, v.title, v.slug, v.published, v.created_at
    FROM videos v
    ORDER BY v.created_at DESC
    LIMIT content_limit
  )
  ORDER BY created_at DESC
  LIMIT content_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- STEP 8: ENABLE STORAGE (FOR IMAGE UPLOADS)
-- ============================================================================

-- Create storage bucket for uploads (if not exists)
-- Note: This needs to be done in Supabase Dashboard > Storage
-- Bucket name: 'uploads'
-- Public: true
-- File size limit: 5MB
-- Allowed MIME types: image/jpeg, image/png, image/webp, image/gif, application/pdf

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Run these queries to verify your setup:

-- Check all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Check policies
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Check data counts
SELECT 
  (SELECT COUNT(*) FROM articles) as articles_count,
  (SELECT COUNT(*) FROM news) as news_count,
  (SELECT COUNT(*) FROM videos) as videos_count,
  (SELECT COUNT(*) FROM settings) as settings_count,
  (SELECT COUNT(*) FROM profiles) as profiles_count;

-- ============================================================================
-- SETUP COMPLETE!
-- ============================================================================
-- Next steps:
-- 1. Create admin user in Supabase Auth (Authentication > Users)
-- 2. Insert admin profile using the UUID from step 1
-- 3. Update your .env.local file with Supabase credentials
-- 4. Test the admin dashboard login
-- ============================================================================
