-- Seed file for initial data with 10 items each for articles, news, and videos
-- NOTE: Run this AFTER creating tables and admin user

-- Insert initial firm settings
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

-- Insert 10 comprehensive articles
INSERT INTO articles (title, slug, content, image, video_url, pdf_url, tags, seo_meta, published, created_at)
VALUES 
  (
    'Understanding Cyber Crime Laws in India',
    'understanding-cyber-crime-laws-india',
    '<h2>Introduction to Cyber Crime in India</h2><p>Cyber crime has become one of the fastest-growing criminal activities in India. With the increasing digitalization of services and businesses, understanding cyber crime laws is crucial for both individuals and organizations.</p><h2>What Constitutes Cyber Crime?</h2><p>Cyber crimes include hacking, identity theft, phishing, online fraud, cyberstalking, data theft, and distribution of malicious software. The Information Technology Act, 2000 (IT Act) is the primary legislation dealing with cyber crimes in India.</p><h3>Key Provisions of IT Act</h3><ul><li><strong>Section 66:</strong> Computer-related offenses including hacking</li><li><strong>Section 66C:</strong> Identity theft and punishment</li><li><strong>Section 66D:</strong> Cheating by personation using computer resources</li><li><strong>Section 67:</strong> Publishing obscene material in electronic form</li></ul><h2>Penalties and Punishments</h2><p>Cyber crimes can attract imprisonment ranging from 3 years to life imprisonment, depending on the severity of the offense. Fines can range from ₹1 lakh to ₹10 lakhs or more.</p><h2>How We Can Help</h2><p>Our experienced legal team specializes in cyber crime defense. We provide comprehensive legal support including investigation assistance, bail applications, trial representation, and appeals to higher courts.</p><blockquote>"In the digital age, protecting your rights requires specialized legal expertise. We''re here to defend you against cyber crime allegations."</blockquote>',
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
    '<h2>Overview of NDPS Act</h2><p>The Narcotic Drugs and Psychotropic Substances Act, 1985 (NDPS Act) is a stringent law that deals with drug-related offenses in India.</p><h2>Types of Drug Offenses</h2><ul><li><strong>Small Quantity:</strong> Possession for personal consumption</li><li><strong>Commercial Quantity:</strong> Possession with intent to sell</li><li><strong>Intermediate Quantity:</strong> Between small and commercial</li></ul><h2>Your Legal Rights</h2><p>Even under the strict NDPS Act, you have fundamental rights including right to legal representation, right to bail in certain circumstances, and right to fair trial.</p><blockquote>"NDPS cases require immediate legal intervention. The first 24 hours are critical for building a strong defense."</blockquote>',
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
    '<h2>Understanding Financial Crimes in India</h2><p>Financial crimes encompass fraud, cheating, embezzlement, money laundering, and corruption. These offenses are governed by IPC, PMLA, and Prevention of Corruption Act.</p><h2>Common Types of Financial Crimes</h2><h3>1. Cheque Bounce Cases (Section 138 NI Act)</h3><p>Dishonor of cheques is punishable with imprisonment up to 2 years or fine up to twice the cheque amount.</p><h3>2. Fraud and Cheating (Section 420 IPC)</h3><p>Cheating can result in imprisonment up to 7 years and fine.</p><h3>3. Money Laundering (PMLA)</h3><p>Concealing proceeds of crime can lead to imprisonment up to 7 years and heavy fines.</p><h2>Legal Defense Strategies</h2><p>Defending financial crime cases requires expertise in both criminal law and financial regulations.</p>',
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
    '<h2>Understanding Bail in India</h2><p>Bail is the temporary release of an accused person awaiting trial. Understanding the bail process is crucial for anyone facing criminal charges.</p><h2>Types of Bail</h2><h3>1. Regular Bail</h3><p>Applied for when a person is already arrested and in custody.</p><h3>2. Anticipatory Bail</h3><p>Applied for before arrest when a person apprehends arrest. Governed by Section 438 of CrPC.</p><h3>3. Interim Bail</h3><p>Temporary bail granted for a short period.</p><h2>Factors Considered for Bail</h2><ul><li>Nature and gravity of offense</li><li>Severity of punishment</li><li>Character of accused</li><li>Risk of fleeing justice</li></ul><blockquote>"Time is critical in bail matters. Immediate legal action can mean the difference between custody and freedom."</blockquote>',
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
    '<h2>Understanding Deportation and Travel Restrictions</h2><p>Deportation and travel bans can have serious consequences for both Indian nationals and foreign citizens.</p><h2>Types of Travel Restrictions</h2><h3>1. Look Out Circular (LOC)</h3><p>Issued by law enforcement to prevent a person from leaving the country.</p><h3>2. Deportation Orders</h3><p>Foreign nationals can be deported for visa violations or criminal activities.</p><h3>3. Passport Impoundment</h3><p>Passport can be impounded under the Passport Act, 1967.</p><h2>Legal Remedies</h2><p>Several legal remedies are available including writ petitions, representations, and court permissions for specific travel.</p>',
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
    '<h2>Understanding Criminal Trial in India</h2><p>The criminal trial process in India follows a structured procedure from the filing of FIR to the final judgment.</p><h2>Stages of Criminal Trial</h2><h3>1. FIR and Investigation</h3><p>First Information Report is filed, followed by police investigation.</p><h3>2. Chargesheet</h3><p>Police file chargesheet if sufficient evidence is found.</p><h3>3. Framing of Charges</h3><p>Court frames charges after hearing both parties.</p><h3>4. Trial</h3><p>Evidence presentation, examination, and cross-examination of witnesses.</p><h3>5. Arguments</h3><p>Final arguments by prosecution and defense.</p><h3>6. Judgment</h3><p>Court delivers judgment based on evidence and arguments.</p><h2>Your Rights During Trial</h2><p>You have the right to legal representation, right to cross-examine witnesses, and right to present defense evidence.</p>',
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
    '<h2>Understanding White Collar Crimes</h2><p>White collar crimes are non-violent crimes committed for financial gain, typically in business or professional settings.</p><h2>Types of White Collar Crimes</h2><ul><li><strong>Corporate Fraud:</strong> Misrepresentation of company finances</li><li><strong>Embezzlement:</strong> Theft of funds by employees</li><li><strong>Insider Trading:</strong> Trading based on non-public information</li><li><strong>Tax Evasion:</strong> Illegal non-payment of taxes</li><li><strong>Bribery and Corruption:</strong> Offering or accepting bribes</li></ul><h2>Investigation Agencies</h2><p>White collar crimes are investigated by CBI, ED, SFIO, and Income Tax Department.</p><h2>Penalties</h2><p>Penalties can include imprisonment, heavy fines, and disqualification from holding company positions.</p><h2>Defense Strategies</h2><p>Our team provides expert defense in white collar crime cases with focus on financial analysis and regulatory compliance.</p>',
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
    '<h2>Protection Against Domestic Violence</h2><p>The Protection of Women from Domestic Violence Act, 2005 provides legal protection to women facing domestic abuse.</p><h2>What Constitutes Domestic Violence?</h2><ul><li>Physical abuse</li><li>Emotional and verbal abuse</li><li>Economic abuse</li><li>Sexual abuse</li></ul><h2>Legal Remedies Available</h2><h3>1. Protection Orders</h3><p>Court can pass orders to prevent the abuser from committing acts of domestic violence.</p><h3>2. Residence Orders</h3><p>Victim can seek right to reside in the shared household.</p><h3>3. Monetary Relief</h3><p>Compensation for injuries, medical expenses, and loss of earnings.</p><h3>4. Custody Orders</h3><p>Temporary custody of children can be granted.</p><h2>How to File a Complaint</h2><p>Complaints can be filed with Protection Officers, police, or directly with Magistrate.</p>',
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
    '<h2>Consumer Rights in India</h2><p>The Consumer Protection Act, 2019 provides comprehensive protection to consumers against unfair trade practices.</p><h2>Consumer Rights</h2><ul><li>Right to safety</li><li>Right to be informed</li><li>Right to choose</li><li>Right to be heard</li><li>Right to seek redressal</li><li>Right to consumer education</li></ul><h2>Consumer Disputes</h2><p>Common consumer disputes include defective products, deficient services, unfair trade practices, and misleading advertisements.</p><h2>Filing Consumer Complaints</h2><h3>District Consumer Forum</h3><p>For disputes up to ₹1 crore</p><h3>State Consumer Commission</h3><p>For disputes between ₹1 crore and ₹10 crores</p><h3>National Consumer Commission</h3><p>For disputes above ₹10 crores</p><h2>E-Commerce Consumer Rights</h2><p>Special provisions for online shopping including return policies, refunds, and liability of e-commerce platforms.</p>',
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
    '<h2>Understanding Property Disputes in India</h2><p>Property disputes are among the most common civil litigation matters in India, involving ownership, possession, and title issues.</p><h2>Common Types of Property Disputes</h2><ul><li><strong>Title Disputes:</strong> Conflicting claims of ownership</li><li><strong>Boundary Disputes:</strong> Disagreements over property boundaries</li><li><strong>Inheritance Disputes:</strong> Conflicts over ancestral property</li><li><strong>Landlord-Tenant Disputes:</strong> Rent, eviction, and maintenance issues</li><li><strong>Illegal Possession:</strong> Encroachment and unauthorized occupation</li></ul><h2>Legal Remedies</h2><h3>1. Civil Suit for Declaration</h3><p>To establish ownership rights and title.</p><h3>2. Suit for Possession</h3><p>To recover possession of property.</p><h3>3. Suit for Partition</h3><p>To divide jointly owned property.</p><h3>4. Injunction</h3><p>To prevent illegal construction or encroachment.</p><h2>Important Documents</h2><p>Sale deed, title deed, property tax receipts, mutation records, and encumbrance certificate are crucial for property disputes.</p><h2>Alternative Dispute Resolution</h2><p>Mediation and arbitration can provide faster resolution compared to lengthy court proceedings.</p>',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80',
    NULL,
    'https://www.example.com/property-disputes.pdf',
    ARRAY['Property Disputes', 'Civil Law', 'Real Estate'],
    '{"title": "Property Disputes Legal Solutions", "description": "Legal remedies and court procedures for property disputes in India", "keywords": ["property disputes", "civil law", "real estate", "title disputes"]}'::jsonb,
    true,
    NOW() - INTERVAL '26 days'
  )
ON CONFLICT (slug) DO NOTHING;


-- Insert 10 news items
INSERT INTO news (title, slug, content, image, published, created_at)
VALUES 
  (
    'Supreme Court Landmark Judgment on Bail Rights',
    'supreme-court-landmark-judgment-bail-rights',
    '<p><strong>New Delhi, February 27, 2026</strong> - The Supreme Court delivered a landmark judgment strengthening bail rights for accused persons.</p><p>The apex court held that "bail is the rule and jail is the exception," reiterating that liberty is a constitutional right.</p><h3>Key Highlights</h3><ul><li>Courts must consider personal liberty while deciding bail</li><li>Prolonged incarceration without trial violates Article 21</li><li>Economic status should not be a barrier to bail</li><li>Trial courts must provide detailed reasons when rejecting bail</li></ul><p>This judgment will have far-reaching implications for thousands of undertrials in jails across India.</p>',
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    true,
    NOW() - INTERVAL '1 day'
  ),
  (
    'New Amendments to IT Act 2026',
    'new-amendments-it-act-2026',
    '<p><strong>Mumbai, February 25, 2026</strong> - Parliament passed significant amendments to the Information Technology Act, 2000.</p><h3>Major Changes</h3><ul><li>Enhanced penalties for cyber fraud (3 to 5 years)</li><li>New data protection provisions</li><li>Social media platform accountability</li><li>Cryptocurrency regulations framework</li></ul><p>Companies handling customer data must comply with new security standards by April 1, 2026.</p>',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80',
    true,
    NOW() - INTERVAL '3 days'
  ),
  (
    'Major Victory: Client Acquitted in NDPS Case',
    'major-victory-client-acquitted-ndps-case',
    '<p><strong>Delhi, February 23, 2026</strong> - Settle Here Law Associates secured complete acquittal in a high-profile NDPS case.</p><p>Our client was arrested in 2023 on charges of possession of commercial quantity of narcotics. The Sessions Court noted serious procedural lapses and held that prosecution failed to prove the case beyond reasonable doubt.</p><h3>Legal Strategy</h3><ul><li>Challenged legality of search and seizure</li><li>Questioned chain of custody</li><li>Challenged admissibility of confessions</li><li>Proved failure to establish conscious possession</li></ul>',
    'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&q=80',
    true,
    NOW() - INTERVAL '5 days'
  ),
  (
    'Free Webinar: Understanding Your Rights in Criminal Cases',
    'webinar-understanding-rights-criminal-cases',
    '<p><strong>Announcement</strong> - Free webinar on March 5, 2026, at 6:00 PM IST.</p><h3>Topics Covered</h3><ul><li>Fundamental rights of accused persons</li><li>Bail application process</li><li>Handling police interrogation</li><li>Rights during arrest and custody</li><li>Common mistakes to avoid</li></ul><p>Register now by calling +91 8055666660. Limited seats available!</p>',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
    true,
    NOW() - INTERVAL '7 days'
  ),
  (
    'New Office Opening in Bangalore',
    'new-office-opening-bangalore',
    '<p><strong>Bangalore, February 19, 2026</strong> - Expanding our presence in South India with a new Bangalore office.</p><h3>Services Available</h3><ul><li>Criminal law consultation</li><li>Cyber crime legal support</li><li>NDPS Act cases</li><li>Financial crime defense</li><li>Bail applications</li></ul><p><strong>Opening Date:</strong> March 1, 2026<br><strong>Special Offer:</strong> 20% discount for first month registrations</p>',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    true,
    NOW() - INTERVAL '9 days'
  ),
  (
    'High Court Sets Precedent in Cyber Stalking Case',
    'high-court-precedent-cyber-stalking',
    '<p><strong>Mumbai, February 17, 2026</strong> - Bombay High Court set an important precedent in a cyber stalking case, clarifying the scope of Section 354D IPC in digital context.</p><p>The court held that persistent online harassment through multiple platforms constitutes stalking under law, even without physical following.</p><h3>Implications</h3><ul><li>Broader interpretation of stalking laws</li><li>Protection for online harassment victims</li><li>Clear guidelines for social media conduct</li></ul>',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80',
    true,
    NOW() - INTERVAL '11 days'
  ),
  (
    'Government Announces Fast-Track Courts for Financial Crimes',
    'fast-track-courts-financial-crimes',
    '<p><strong>New Delhi, February 15, 2026</strong> - Government announced establishment of 50 fast-track courts dedicated to financial crime cases.</p><p>These courts will handle cases related to cheque bounce, fraud, money laundering, and corporate crimes with a target to dispose cases within 6 months.</p><h3>Key Features</h3><ul><li>Dedicated judges with financial crime expertise</li><li>Digital case management system</li><li>Time-bound trial completion</li><li>Special prosecutors for complex cases</li></ul>',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80',
    true,
    NOW() - INTERVAL '13 days'
  ),
  (
    'Legal Aid Clinic Launch for Underprivileged',
    'legal-aid-clinic-launch',
    '<p><strong>Delhi, February 13, 2026</strong> - Settle Here Law Associates launches free legal aid clinic for underprivileged sections of society.</p><p>The clinic will provide free legal consultation, representation in lower courts, and assistance with bail applications for those who cannot afford legal services.</p><h3>Services Offered</h3><ul><li>Free legal consultation (every Saturday)</li><li>Assistance with bail applications</li><li>Representation in trial courts</li><li>Legal awareness programs</li></ul><p><strong>Location:</strong> Community Center, Connaught Place<br><strong>Timings:</strong> Every Saturday, 10 AM - 2 PM</p>',
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80',
    true,
    NOW() - INTERVAL '15 days'
  ),
  (
    'Supreme Court Ruling on Digital Evidence Admissibility',
    'supreme-court-digital-evidence-ruling',
    '<p><strong>New Delhi, February 11, 2026</strong> - Supreme Court issued comprehensive guidelines on admissibility of digital evidence in criminal trials.</p><p>The ruling addresses concerns about authenticity, chain of custody, and forensic examination of digital evidence including WhatsApp messages, emails, and social media posts.</p><h3>Key Guidelines</h3><ul><li>Mandatory forensic certification for digital evidence</li><li>Proper documentation of chain of custody</li><li>Cross-examination rights on digital evidence</li><li>Standards for screenshot authentication</li></ul><p>This ruling will significantly impact cyber crime prosecutions and defenses across India.</p>',
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    true,
    NOW() - INTERVAL '17 days'
  ),
  (
    'Successful Bail in High-Profile Money Laundering Case',
    'successful-bail-money-laundering-case',
    '<p><strong>Mumbai, February 9, 2026</strong> - Our legal team secured bail for a prominent businessman in a ₹500 crore money laundering case.</p><p>The Special PMLA Court granted bail after accepting our arguments on lack of prima facie evidence and violation of procedural safeguards during investigation.</p><h3>Case Highlights</h3><ul><li>Challenged ED''s investigation methodology</li><li>Proved compliance with all summons</li><li>Demonstrated no flight risk</li><li>Highlighted medical grounds</li></ul><p>This case demonstrates that even in serious PMLA cases, bail is possible with strong legal arguments and proper documentation.</p>',
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80',
    true,
    NOW() - INTERVAL '19 days'
  )
ON CONFLICT (slug) DO NOTHING;

-- Insert 10 videos
INSERT INTO videos (title, slug, description, video_url, thumbnail, published, created_at)
VALUES 
  (
    'What to Do When Arrested: Know Your Rights',
    'what-to-do-when-arrested-know-your-rights',
    'Comprehensive guide on your fundamental rights during arrest and police custody. Learn what you should and shouldn''t do when facing arrest, your right to legal representation, and how to protect yourself during interrogation. Essential viewing for everyone.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    true,
    NOW() - INTERVAL '1 day'
  ),
  (
    'Cyber Crime in India: Types and Legal Remedies',
    'cyber-crime-india-types-legal-remedies',
    'Understanding different types of cyber crimes in India including hacking, phishing, identity theft, and online fraud. Learn about IT Act provisions, how to file complaints, and legal remedies available to victims and accused persons.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80',
    true,
    NOW() - INTERVAL '3 days'
  ),
  (
    'NDPS Act Explained: Drug Laws in India',
    'ndps-act-explained-drug-laws-india',
    'Detailed explanation of the Narcotic Drugs and Psychotropic Substances Act, 1985. Learn about different categories of drug offenses, penalties, bail provisions, and defense strategies in NDPS cases. Must-watch for understanding drug laws.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
    true,
    NOW() - INTERVAL '5 days'
  ),
  (
    'Bail Application Process: Step by Step Guide',
    'bail-application-process-step-by-step',
    'Complete walkthrough of the bail application process in India. Learn about different types of bail, required documents, court procedures, and factors that courts consider while granting bail. Essential viewing for anyone facing criminal charges.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&q=80',
    true,
    NOW() - INTERVAL '7 days'
  ),
  (
    'Financial Crimes: Fraud, Cheating, and Money Laundering',
    'financial-crimes-fraud-cheating-money-laundering',
    'Understanding financial crimes in India including cheque bounce cases, fraud under Section 420 IPC, money laundering under PMLA, and embezzlement. Learn about investigation procedures, legal defenses, and how to protect yourself from false allegations.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80',
    true,
    NOW() - INTERVAL '9 days'
  ),
  (
    'How to Handle Police Interrogation',
    'how-to-handle-police-interrogation',
    'Expert advice on handling police interrogation and questioning. Learn your rights during interrogation, when you can refuse to answer, importance of legal representation, and how to avoid self-incrimination. Critical knowledge for protecting your rights.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    true,
    NOW() - INTERVAL '11 days'
  ),
  (
    'Deportation and Travel Ban Cases in India',
    'deportation-travel-ban-cases-india',
    'Understanding deportation procedures, Look Out Circulars (LOC), passport impoundment, and travel restrictions in India. Learn about legal remedies, how to challenge travel bans, and rights of foreign nationals facing deportation.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80',
    true,
    NOW() - INTERVAL '13 days'
  ),
  (
    'Criminal Trial Process in India',
    'criminal-trial-process-india',
    'Complete overview of the criminal trial process in India from FIR to judgment. Learn about investigation, chargesheet, framing of charges, evidence presentation, cross-examination, arguments, and appeals process. Comprehensive guide to understanding trials.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    true,
    NOW() - INTERVAL '15 days'
  ),
  (
    'Domestic Violence: Legal Protection and Remedies',
    'domestic-violence-legal-protection-remedies',
    'Understanding the Protection of Women from Domestic Violence Act, 2005. Learn about types of domestic violence, how to file complaints, protection orders, residence orders, monetary relief, and custody matters. Important information for victims and their families.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80',
    true,
    NOW() - INTERVAL '17 days'
  ),
  (
    'Consumer Rights and Legal Remedies in India',
    'consumer-rights-legal-remedies-india',
    'Complete guide to consumer protection laws in India. Learn about your rights as a consumer, how to file complaints in consumer forums, remedies for defective products and deficient services, and special provisions for e-commerce. Protect yourself from unfair trade practices.',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
    true,
    NOW() - INTERVAL '19 days'
  )
ON CONFLICT (slug) DO NOTHING;
