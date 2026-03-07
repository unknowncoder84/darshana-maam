# Supabase Quick Start Checklist ✅

Follow this checklist to get your law firm web app running with Supabase in under 10 minutes!

## Prerequisites
- [ ] Supabase account created
- [ ] Project created: `xexmohjnzmqsqkansitu`
- [ ] Node.js installed
- [ ] Project files downloaded

## Setup Checklist

### 1. Environment Variables (2 minutes)
- [ ] Create `.env.local` file in `law-firm-web-app` folder
- [ ] Copy these exact values:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xexmohjnzmqsqkansitu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhleG1vaGpuem1xc3FrYW5zaXR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4ODk0MTEsImV4cCI6MjA4ODQ2NTQxMX0.JBlN0F2BNKXKSjBML8OSLMc37yBaL8LRYSyAkmmv4IY
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhleG1vaGpuem1xc3FrYW5zaXR1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjg4OTQxMSwiZXhwIjoyMDg4NDY1NDExfQ.Fo3xpx6-Nq2Dk7v3fDnX9vathENbpEPJ67MGP9y4Lec
```

### 2. Database Setup (3 minutes)
- [ ] Go to: https://supabase.com/dashboard/project/xexmohjnzmqsqkansitu/sql
- [ ] Click "New Query"
- [ ] Open `supabase/complete_setup.sql` file
- [ ] Copy ALL contents (Ctrl+A, Ctrl+C)
- [ ] Paste into Supabase SQL Editor
- [ ] Click "Run" button
- [ ] Wait for "Success" message

### 3. Create Admin User (2 minutes)
- [ ] Go to: https://supabase.com/dashboard/project/xexmohjnzmqsqkansitu/auth/users
- [ ] Click "Add User" → "Create new user"
- [ ] Enter:
  - Email: `admin@settlehere.com`
  - Password: `Admin@123456`
  - ✅ Check "Auto Confirm User"
- [ ] Click "Create User"
- [ ] **COPY THE UUID** (looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

### 4. Link Admin Profile (1 minute)
- [ ] Go back to SQL Editor
- [ ] Run this query (replace `YOUR_UUID` with the UUID you copied):
```sql
INSERT INTO profiles (id, username, role)
VALUES ('YOUR_UUID', 'admin', 'admin');
```

### 5. Setup Storage (2 minutes)
- [ ] Go to: https://supabase.com/dashboard/project/xexmohjnzmqsqkansitu/storage/buckets
- [ ] Click "Create a new bucket"
- [ ] Name: `uploads`
- [ ] ✅ Check "Public bucket"
- [ ] Click "Create bucket"
- [ ] Click on `uploads` bucket → "Policies" tab
- [ ] Click "New Policy" → "For full customization"
- [ ] Paste and run each policy:

**Policy 1:**
```sql
CREATE POLICY "Public can view uploads"
ON storage.objects FOR SELECT
USING (bucket_id = 'uploads');
```

**Policy 2:**
```sql
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'uploads' AND auth.uid() IS NOT NULL);
```

**Policy 3:**
```sql
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
USING (bucket_id = 'uploads' AND auth.uid() IS NOT NULL);
```

**Policy 4:**
```sql
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING (bucket_id = 'uploads' AND auth.uid() IS NOT NULL);
```

### 6. Install Dependencies & Start App (1 minute)
```bash
cd law-firm-web-app
npm install
npm run dev
```

### 7. Test Everything (1 minute)
- [ ] Open: http://localhost:3000
- [ ] See homepage with content ✅
- [ ] Open: http://localhost:3000/admin/login
- [ ] Login with:
  - Username: `admin`
  - Password: `Admin@123456`
- [ ] See admin dashboard ✅
- [ ] Check statistics show: 10 articles, 10 news, 10 videos ✅

## Verification Commands

Run these in Supabase SQL Editor to verify setup:

```sql
-- Should show 5 tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_type = 'BASE TABLE';

-- Should show: 10 articles, 10 news, 10 videos, 1 settings, 1 profile
SELECT 
  (SELECT COUNT(*) FROM articles) as articles,
  (SELECT COUNT(*) FROM news) as news,
  (SELECT COUNT(*) FROM videos) as videos,
  (SELECT COUNT(*) FROM settings) as settings,
  (SELECT COUNT(*) FROM profiles) as profiles;

-- Should show your admin user
SELECT username, role FROM profiles;
```

## What You Get

After completing this checklist, you'll have:

✅ **Database**: 5 tables with proper indexes and RLS policies
✅ **Sample Data**: 10 articles, 10 news items, 10 videos
✅ **Admin User**: Full access to admin dashboard
✅ **Storage**: Image upload capability
✅ **Security**: Row Level Security enabled
✅ **Functions**: Helper functions for dashboard stats

## Quick Links

- **Supabase Dashboard**: https://supabase.com/dashboard/project/xexmohjnzmqsqkansitu
- **SQL Editor**: https://supabase.com/dashboard/project/xexmohjnzmqsqkansitu/sql
- **Auth Users**: https://supabase.com/dashboard/project/xexmohjnzmqsqkansitu/auth/users
- **Storage**: https://supabase.com/dashboard/project/xexmohjnzmqsqkansitu/storage/buckets
- **Table Editor**: https://supabase.com/dashboard/project/xexmohjnzmqsqkansitu/editor

## Admin Dashboard Features

Once logged in, you can:

- 📊 View statistics (articles, news, videos, users)
- ✍️ Create/Edit/Delete articles with rich text editor
- 📰 Manage news items
- 🎥 Manage video content
- ⚙️ Update firm settings (name, address, contact info)
- 👥 Manage users and roles
- 📅 View calendar (upcoming feature)

## Default Login Credentials

```
URL: http://localhost:3000/admin/login
Username: admin
Password: Admin@123456
```

**⚠️ IMPORTANT**: Change the admin password after first login!

## Troubleshooting

### Can't login?
1. Check admin user exists in Auth > Users
2. Verify profile exists: `SELECT * FROM profiles WHERE username = 'admin'`
3. Make sure UUID matches between auth.users and profiles

### No data showing?
1. Verify data exists: `SELECT COUNT(*) FROM articles`
2. Check RLS policies: `SELECT * FROM pg_policies WHERE schemaname = 'public'`
3. Check browser console for errors

### Can't upload images?
1. Verify `uploads` bucket exists
2. Check bucket is set to public
3. Verify storage policies are created

### Environment variables not working?
1. Make sure file is named `.env.local` (not `.env`)
2. Restart dev server after creating .env.local
3. Check for typos in variable names

## Next Steps

After setup is complete:

1. 🔐 Change admin password
2. ✏️ Customize firm settings
3. 📝 Add your own content
4. 🎨 Customize design/colors
5. 🚀 Deploy to production

## Files Reference

- `supabase/complete_setup.sql` - Complete database setup
- `supabase/admin_queries.sql` - Useful admin queries
- `SUPABASE_SETUP_INSTRUCTIONS.md` - Detailed instructions
- `SUPABASE_QUICK_START.md` - This file

## Support

Need help? Check:
1. Supabase Logs: Dashboard > Logs
2. Browser Console: F12 > Console tab
3. Network Tab: F12 > Network tab

---

**Total Time**: ~10 minutes
**Difficulty**: Easy
**Result**: Fully functional law firm web app! 🎉
