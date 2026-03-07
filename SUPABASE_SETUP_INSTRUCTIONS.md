# Complete Supabase Setup Instructions

## Your Supabase Project Details

- **Project URL**: `https://xexmohjnzmqsqkansitu.supabase.co`
- **Project Reference**: `xexmohjnzmqsqkansitu`
- **Anon Public Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhleG1vaGpuem1xc3FrYW5zaXR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4ODk0MTEsImV4cCI6MjA4ODQ2NTQxMX0.JBlN0F2BNKXKSjBML8OSLMc37yBaL8LRYSyAkmmv4IY`
- **Service Role Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhleG1vaGpuem1xc3FrYW5zaXR1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjg4OTQxMSwiZXhwIjoyMDg4NDY1NDExfQ.Fo3xpx6-Nq2Dk7v3fDnX9vathENbpEPJ67MGP9y4Lec`

---

## Step-by-Step Setup Guide

### Step 1: Run the SQL Setup Script

1. Open your Supabase Dashboard:
   ```
   https://supabase.com/dashboard/project/xexmohjnzmqsqkansitu/sql
   ```

2. Click on "SQL Editor" in the left sidebar

3. Click "New Query"

4. Copy the entire contents of `supabase/PRODUCTION_SETUP.sql` file

5. Paste it into the SQL Editor

6. Click "Run" button (or press Ctrl+Enter)

7. Wait for the script to complete (should take 5-10 seconds)

8. You should see success messages for:
   - Tables created
   - Indexes created
   - Triggers created
   - RLS enabled
   - Policies created
   - Functions created
   - Initial data inserted

---

### Step 2: Create Admin User

1. Go to Authentication section:
   ```
   https://supabase.com/dashboard/project/xexmohjnzmqsqkansitu/auth/users
   ```

2. Click "Add User" button

3. Fill in the form:
   - **Email**: `admin@settlehere.com`
   - **Password**: `Admin@123456` (or choose your own secure password)
   - **Auto Confirm User**: ✅ Check this box

4. Click "Create User"

5. **IMPORTANT**: Copy the UUID that appears in the user list
   - It will look like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`
   - You'll need this in the next step

---

### Step 3: Create Admin Profile

1. Go back to SQL Editor:
   ```
   https://supabase.com/dashboard/project/xexmohjnzmqsqkansitu/sql
   ```

2. Create a new query

3. Replace `YOUR_ADMIN_UUID` with the UUID you copied in Step 2:

   ```sql
   INSERT INTO profiles (id, username, role)
   VALUES ('YOUR_ADMIN_UUID', 'admin', 'admin');
   ```

4. Click "Run"

5. You should see: "Success. No rows returned"

---

### Step 4: Configure Environment Variables

1. Open your project folder: `law-firm-web-app`

2. Create or update `.env.local` file with these values:

   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://xexmohjnzmqsqkansitu.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhleG1vaGpuem1xc3FrYW5zaXR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4ODk0MTEsImV4cCI6MjA4ODQ2NTQxMX0.JBlN0F2BNKXKSjBML8OSLMc37yBaL8LRYSyAkmmv4IY
   ```

3. Save the file

---

### Step 5: Setup Storage for Image Uploads (Optional but Recommended)

1. Go to Storage section:
   ```
   https://supabase.com/dashboard/project/xexmohjnzmqsqkansitu/storage/buckets
   ```

2. Click "Create Bucket"

3. Fill in the form:
   - **Name**: `uploads`
   - **Public bucket**: ✅ Check this box
   - **File size limit**: `5 MB`
   - **Allowed MIME types**: 
     - `image/jpeg`
     - `image/png`
     - `image/webp`
     - `image/gif`
     - `application/pdf`

4. Click "Create Bucket"

5. Click on the `uploads` bucket

6. Go to "Policies" tab

7. Click "New Policy" and add these policies:

   **Policy 1: Public Read Access**
   ```sql
   CREATE POLICY "Public can view uploaded files"
   ON storage.objects FOR SELECT
   USING (bucket_id = 'uploads');
   ```

   **Policy 2: Authenticated Upload**
   ```sql
   CREATE POLICY "Authenticated users can upload files"
   ON storage.objects FOR INSERT
   WITH CHECK (
     bucket_id = 'uploads' 
     AND auth.uid() IS NOT NULL
   );
   ```

   **Policy 3: Authenticated Update**
   ```sql
   CREATE POLICY "Authenticated users can update files"
   ON storage.objects FOR UPDATE
   USING (
     bucket_id = 'uploads' 
     AND auth.uid() IS NOT NULL
   );
   ```

   **Policy 4: Authenticated Delete**
   ```sql
   CREATE POLICY "Authenticated users can delete files"
   ON storage.objects FOR DELETE
   USING (
     bucket_id = 'uploads' 
     AND auth.uid() IS NOT NULL
   );
   ```

---

### Step 6: Test Your Setup

1. Open terminal in your project folder

2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and go to:
   ```
   http://localhost:3000/admin/login
   ```

5. Login with:
   - **Email**: `admin@settlehere.com`
   - **Password**: `Admin@123456` (or the password you chose)

6. You should be redirected to the admin dashboard

7. Test the following features:
   - ✅ View dashboard statistics
   - ✅ Create a new article
   - ✅ Create a new news item
   - ✅ Create a new video
   - ✅ Update settings
   - ✅ Manage users

---

## Verification Queries

Run these queries in SQL Editor to verify your setup:

### Check Tables
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
ORDER BY table_name;
```

**Expected Result**: profiles, news, articles, videos, settings

### Check RLS Status
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
```

**Expected Result**: All tables should have `rowsecurity = true`

### Check Policies
```sql
SELECT tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

**Expected Result**: Multiple policies for each table

### Check Data
```sql
SELECT 
  (SELECT COUNT(*) FROM articles) as articles_count,
  (SELECT COUNT(*) FROM news) as news_count,
  (SELECT COUNT(*) FROM videos) as videos_count,
  (SELECT COUNT(*) FROM settings) as settings_count,
  (SELECT COUNT(*) FROM profiles) as profiles_count;
```

**Expected Result**: 
- settings_count: 1
- profiles_count: 1 (after creating admin user)
- Others: 0 (will increase as you add content)

### Check Admin User
```sql
SELECT id, username, role, created_at 
FROM profiles 
WHERE role = 'admin';
```

**Expected Result**: One row with your admin user

---

## Adding Sample Data (Optional)

If you want to populate your database with sample articles, news, and videos for testing:

1. Go to SQL Editor

2. Copy the contents of `supabase/seed.sql`

3. Paste and run it

4. This will add:
   - 10 sample articles
   - 10 sample news items
   - 10 sample videos

---

## Troubleshooting

### Issue: "relation does not exist"
**Solution**: Make sure you ran the PRODUCTION_SETUP.sql script completely

### Issue: "permission denied for table"
**Solution**: Check that RLS policies are created correctly. Run the verification queries.

### Issue: "Cannot login to admin dashboard"
**Solution**: 
1. Verify admin user exists in Authentication > Users
2. Verify admin profile exists in profiles table
3. Check that the UUID in profiles matches the UUID in auth.users

### Issue: "Cannot upload images"
**Solution**: 
1. Make sure you created the `uploads` storage bucket
2. Verify storage policies are created
3. Check that the bucket is set to public

### Issue: "Cannot create/edit content"
**Solution**: 
1. Verify you're logged in as admin
2. Check RLS policies for the specific table
3. Verify your session is valid (try logging out and back in)

---

## Database Schema Overview

### Tables Created:

1. **profiles** - User accounts linked to Supabase Auth
   - id (UUID, FK to auth.users)
   - username (TEXT, unique)
   - role (TEXT: 'admin' or 'user')
   - created_at (TIMESTAMPTZ)

2. **articles** - Legal articles and guides
   - id (UUID)
   - title, slug, content
   - image, video_url, pdf_url
   - tags (TEXT[])
   - seo_meta (JSONB)
   - published (BOOLEAN)
   - created_at, updated_at

3. **news** - News items and firm updates
   - id (UUID)
   - title, slug, content
   - image
   - published (BOOLEAN)
   - created_at, updated_at

4. **videos** - Video content
   - id (UUID)
   - title, slug, description
   - video_url, thumbnail
   - published (BOOLEAN)
   - created_at, updated_at

5. **settings** - Firm-wide settings (singleton)
   - id (UUID)
   - firm_name, address, phone, email
   - social_links (JSONB)
   - created_at, updated_at

---

## Security Features

✅ **Row Level Security (RLS)** enabled on all tables
✅ **Public users** can only view published content
✅ **Authenticated users** can manage all content
✅ **Admin users** can manage users and settings
✅ **Automatic timestamp updates** on all modifications
✅ **Secure password hashing** via Supabase Auth
✅ **JWT-based authentication** with automatic token refresh

---

## Next Steps After Setup

1. **Customize Settings**
   - Go to Admin Dashboard > Settings
   - Update firm name, address, phone, email
   - Add social media links

2. **Create Content**
   - Add articles about your legal services
   - Post news updates
   - Upload educational videos

3. **Invite Team Members**
   - Go to Admin Dashboard > Users
   - Create accounts for your team
   - Assign appropriate roles

4. **Deploy to Production**
   - Follow the deployment guide in DEPLOYMENT_GUIDE.md
   - Update environment variables on your hosting platform
   - Test all features in production

---

## Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the Supabase documentation: https://supabase.com/docs
3. Check the browser console for error messages
4. Verify all environment variables are set correctly

---

**Setup Date**: March 7, 2026
**Database Version**: PostgreSQL 15.x (Supabase)
**Application**: Law Firm Web App - Settle Here Law Associates
