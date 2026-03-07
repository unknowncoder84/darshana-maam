-- ============================================================================
-- PRODUCTION SUPABASE DATABASE SETUP FOR LAW FIRM WEB APP
-- ============================================================================
-- Project: xexmohjnzmqsqkansitu.supabase.co
-- Run this in: https://supabase.com/dashboard/project/xexmohjnzmqsqkansitu/sql
-- ============================================================================
-- IMPORTANT: Run this entire file in the Supabase SQL Editor
-- ============================================================================

-- ============================================================================
-- STEP 1: CREATE ALL TABLES
-- ============================================================================

-- 1.1 Create profiles table (linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

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

CREATE UNIQUE INDEX IF NOT EXISTS idx_settings_singleton ON settings ((id IS NOT NULL));

-- ============================================================================
-- STEP 2: CREATE TRIGGERS FOR AUTO-UPDATE TIMESTAMPS
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_news_updated_at ON news;
CREATE TRIGGER update_news_updated_at
  BEFORE UPDATE ON news
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_articles_updated_at ON articles;
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_videos_updated_at ON videos;
CREATE TRIGGER update_videos_updated_at
  BEFORE UPDATE ON videos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_settings_updated_at ON settings;
CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- STEP 3: ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- STEP 4: DROP EXISTING POLICIES (IF ANY)
-- ============================================================================

-- Drop profiles policies
DROP POLICY IF EXISTS "Admin users can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Admin users can insert profiles" ON profiles;
DROP POLICY IF EXISTS "Admin users can update profiles" ON profiles;
DROP POLICY IF EXISTS "Admin users can delete profiles" ON profiles;

-- Drop news policies
DROP POLICY IF EXISTS "Public can view published news" ON news;
DROP POLICY IF EXISTS "Authenticated users can view all news" ON news;
DROP POLICY IF EXISTS "Authenticated users can insert news" ON news;
DROP POLICY IF EXISTS "Authenticated users can update news" ON news;
DROP POLICY IF EXISTS "Authenticated users can delete news" ON news;

-- Drop articles policies
DROP POLICY IF EXISTS "Public can view published articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can view all articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can insert articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can update articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can delete articles" ON articles;

-- Drop videos policies
DROP POLICY IF EXISTS "Public can view published videos" ON videos;
DROP POLICY IF EXISTS "Authenticated users can view all videos" ON videos;
DROP POLICY IF EXISTS "Authenticated users can insert videos" ON videos;
DROP POLICY IF EXISTS "Authenticated users can update videos" ON videos;
DROP POLICY IF EXISTS "Authenticated users can delete videos" ON videos;

-- Drop settings policies
DROP POLICY IF EXISTS "Public can view settings" ON settings;
DROP POLICY IF EXISTS "Admin users can update settings" ON settings;
DROP POLICY IF EXISTS "Admin users can insert settings" ON settings;

-- ============================================================================
-- STEP 5: CREATE RLS POLICIES
-- ============================================================================

-- 5.1 Profiles policies
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

-- 5.2 News policies
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

-- 5.3 Articles policies
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

-- 5.4 Videos policies
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

-- 5.5 Settings policies
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
-- STEP 6: CREATE HELPER FUNCTIONS FOR ADMIN DASHBOARD
-- ============================================================================

-- 6.1 Function to get content statistics
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

-- 6.2 Function to get recent content
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
-- STEP 7: INSERT INITIAL DATA
-- ============================================================================

-- 7.1 Insert firm settings
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

-- ============================================================================
-- VERIFICATION QUERIES - RUN THESE TO CHECK YOUR SETUP
-- ============================================================================

-- Check all tables exist
SELECT 'Tables Created:' as status;
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
  AND table_name IN ('profiles', 'news', 'articles', 'videos', 'settings')
ORDER BY table_name;

-- Check RLS is enabled
SELECT 'RLS Status:' as status;
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public'
  AND tablename IN ('profiles', 'news', 'articles', 'videos', 'settings');

-- Check policies exist
SELECT 'Policies Created:' as status;
SELECT tablename, COUNT(*) as policy_count
FROM pg_policies 
WHERE schemaname = 'public'
GROUP BY tablename
ORDER BY tablename;

-- Check data
SELECT 'Data Status:' as status;
SELECT 
  (SELECT COUNT(*) FROM settings) as settings_count,
  (SELECT COUNT(*) FROM profiles) as profiles_count;

-- ============================================================================
-- SETUP COMPLETE!
-- ============================================================================
-- 
-- NEXT STEPS:
-- 
-- 1. CREATE ADMIN USER IN SUPABASE AUTH:
--    - Go to: Authentication > Users > Add User
--    - Email: admin@settlehere.com
--    - Password: Admin@123456 (or your preferred password)
--    - Click "Add User"
--    - COPY THE USER UUID (you'll need it for step 2)
--
-- 2. INSERT ADMIN PROFILE:
--    Run this query (replace YOUR_ADMIN_UUID with the UUID from step 1):
--    
--    INSERT INTO profiles (id, username, role)
--    VALUES ('YOUR_ADMIN_UUID', 'admin', 'admin');
--
-- 3. UPDATE YOUR .ENV.LOCAL FILE:
--    NEXT_PUBLIC_SUPABASE_URL=https://xexmohjnzmqsqkansitu.supabase.co
--    NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhleG1vaGpuem1xc3FrYW5zaXR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4ODk0MTEsImV4cCI6MjA4ODQ2NTQxMX0.JBlN0F2BNKXKSjBML8OSLMc37yBaL8LRYSyAkmmv4IY
--
-- 4. (OPTIONAL) SETUP STORAGE FOR IMAGE UPLOADS:
--    - Go to: Storage > Create Bucket
--    - Name: uploads
--    - Public: Yes
--    - File size limit: 5MB
--    - Allowed MIME types: image/jpeg, image/png, image/webp, image/gif, application/pdf
--
-- 5. TEST YOUR SETUP:
--    - Run: npm run dev
--    - Go to: http://localhost:3000/admin/login
--    - Login with: admin@settlehere.com / Admin@123456
--
-- ============================================================================
