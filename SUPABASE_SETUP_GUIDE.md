# Supabase Setup Guide

Complete step-by-step guide to set up Supabase for your Law Firm Web Application.

## Step 1: Create Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" or "Sign Up"
3. Sign up with GitHub, Google, or email
4. Verify your email if required

## Step 2: Create New Project

1. Click "New Project" from your dashboard
2. Fill in project details:
   - **Name**: `law-firm-app` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your location
   - **Pricing Plan**: Free tier is sufficient for testing
3. Click "Create new project"
4. Wait 2-3 minutes for project setup to complete

## Step 3: Get Your API Credentials

1. Once project is ready, go to **Settings** (gear icon in sidebar)
2. Click **API** in the settings menu
3. You'll see two important values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: Long string starting with `eyJ...`
4. Keep this page open - you'll need these values

## Step 4: Run Database Migrations

1. In Supabase dashboard, click **SQL Editor** in sidebar
2. Click **New Query**
3. Copy and paste the migration files in this order:

### Migration 1: Create Profiles Table
```sql
-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Profiles are viewable by authenticated users"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);
```

### Migration 2: Create News Table
```sql
-- Create news table
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

-- Enable RLS
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "News are viewable by everyone"
  ON news FOR SELECT
  TO anon, authenticated
  USING (published = true OR auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert news"
  ON news FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update news"
  ON news FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete news"
  ON news FOR DELETE
  TO authenticated
  USING (true);
```

### Migration 3: Create Articles Table
```sql
-- Create articles table
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

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Articles are viewable by everyone"
  ON articles FOR SELECT
  TO anon, authenticated
  USING (published = true OR auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert articles"
  ON articles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update articles"
  ON articles FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete articles"
  ON articles FOR DELETE
  TO authenticated
  USING (true);
```

### Migration 4: Create Videos Table
```sql
-- Create videos table
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

-- Enable RLS
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Videos are viewable by everyone"
  ON videos FOR SELECT
  TO anon, authenticated
  USING (published = true OR auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert videos"
  ON videos FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update videos"
  ON videos FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete videos"
  ON videos FOR DELETE
  TO authenticated
  USING (true);
```

### Migration 5: Create Settings Table
```sql
-- Create settings table
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

-- Enable RLS
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Settings are viewable by everyone"
  ON settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can update settings"
  ON settings FOR UPDATE
  TO authenticated
  USING (true);
```

4. Click **Run** for each migration
5. Verify "Success. No rows returned" message

## Step 5: Create Admin User

1. In Supabase dashboard, go to **Authentication** in sidebar
2. Click **Users** tab
3. Click **Add user** → **Create new user**
4. Fill in:
   - **Email**: `admin@yourlawfirm.com`
   - **Password**: Create a strong password
   - **Auto Confirm User**: Check this box
5. Click **Create user**
6. Copy the **User UID** (looks like: `a1b2c3d4-...`)

## Step 6: Create Admin Profile

1. Go back to **SQL Editor**
2. Create new query and paste:

```sql
-- Replace 'YOUR_USER_ID_HERE' with the actual User UID from Step 5
INSERT INTO profiles (id, username, role)
VALUES ('YOUR_USER_ID_HERE', 'admin', 'admin');
```

3. Replace `YOUR_USER_ID_HERE` with the actual UID
4. Click **Run**

## Step 7: Seed Sample Data

1. In **SQL Editor**, create new query
2. Copy the entire content from `supabase/seed.sql` file
3. Click **Run**
4. This will create 10 articles, 10 news items, and 10 videos

## Step 8: Configure Environment Variables

1. In your project root, find `.env.local` file (or create it)
2. Add these lines:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...your-anon-key
```

3. Replace with your actual values from Step 3
4. Save the file

## Step 9: Install Supabase Client

Run this command in your terminal:

```bash
npm install @supabase/supabase-js
```

## Step 10: Test the Connection

1. Start your development server:
```bash
npm run dev
```

2. Go to `http://localhost:3000/admin/login`
3. Login with the admin credentials from Step 5
4. You should see the dashboard with real data from Supabase!

## Verification Checklist

- [ ] Supabase project created
- [ ] All 5 migrations run successfully
- [ ] Admin user created in Authentication
- [ ] Admin profile created in profiles table
- [ ] Sample data seeded (10 items each)
- [ ] Environment variables configured
- [ ] Supabase client installed
- [ ] Can login to admin dashboard
- [ ] Can see articles, news, and videos from database

## Troubleshooting

### "Invalid API key" error
- Double-check your `.env.local` file
- Make sure you copied the **anon public** key, not the service role key
- Restart your dev server after changing `.env.local`

### "Row Level Security" errors
- Make sure all RLS policies are created
- Check that your user is authenticated
- Verify policies in Supabase dashboard under **Authentication** → **Policies**

### Can't see data in admin dashboard
- Check browser console for errors
- Verify data exists in Supabase dashboard under **Table Editor**
- Make sure `published` field is set to `true` for public pages

### Login not working
- Verify admin user exists in **Authentication** → **Users**
- Check that profile was created with correct user ID
- Try resetting password in Supabase dashboard

## Next Steps

After successful setup:

1. **Create more users**: Add team members through Authentication panel
2. **Customize content**: Edit articles, news, and videos through admin dashboard
3. **Configure settings**: Update firm information in Settings page
4. **Deploy**: Follow deployment guide for production setup

## Support

If you encounter issues:
- Check Supabase documentation: https://supabase.com/docs
- Review error messages in browser console
- Verify all migration queries ran successfully
- Ensure environment variables are correct

---

**Important**: Keep your database password and API keys secure. Never commit `.env.local` to version control!
