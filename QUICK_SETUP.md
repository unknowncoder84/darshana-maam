# Quick Setup Guide - 5 Minutes

## Your Credentials

```
Project URL: https://xexmohjnzmqsqkansitu.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhleG1vaGpuem1xc3FrYW5zaXR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4ODk0MTEsImV4cCI6MjA4ODQ2NTQxMX0.JBlN0F2BNKXKSjBML8OSLMc37yBaL8LRYSyAkmmv4IY
```

---

## 5 Steps to Get Running

### 1️⃣ Run SQL Script (2 minutes)

Go to: https://supabase.com/dashboard/project/xexmohjnzmqsqkansitu/sql

Copy and paste entire `supabase/PRODUCTION_SETUP.sql` file → Click Run

### 2️⃣ Create Admin User (1 minute)

Go to: https://supabase.com/dashboard/project/xexmohjnzmqsqkansitu/auth/users

Click "Add User":
- Email: `admin@settlehere.com`
- Password: `Admin@123456`
- ✅ Auto Confirm User

**COPY THE UUID!**

### 3️⃣ Create Admin Profile (30 seconds)

Back in SQL Editor, run (replace YOUR_UUID):

```sql
INSERT INTO profiles (id, username, role)
VALUES ('YOUR_UUID', 'admin', 'admin');
```

### 4️⃣ Setup Environment (30 seconds)

Create `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xexmohjnzmqsqkansitu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhleG1vaGpuem1xc3FrYW5zaXR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4ODk0MTEsImV4cCI6MjA4ODQ2NTQxMX0.JBlN0F2BNKXKSjBML8OSLMc37yBaL8LRYSyAkmmv4IY
```

### 5️⃣ Test It (1 minute)

```bash
npm run dev
```

Go to: http://localhost:3000/admin/login

Login:
- Email: `admin@settlehere.com`
- Password: `Admin@123456`

---

## ✅ Done!

Your admin dashboard should now be working. You can:
- Create articles
- Post news
- Add videos
- Manage users
- Update settings

---

## Optional: Add Sample Data

Want 10 articles, 10 news, 10 videos for testing?

Run `supabase/seed.sql` in SQL Editor

---

## Need Help?

See `SUPABASE_SETUP_INSTRUCTIONS.md` for detailed guide
