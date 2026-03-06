# Quick Start: Supabase Setup (5 Steps)

## 🚀 Fast Track Setup

### Step 1: Create Supabase Project (5 min)
1. Go to https://supabase.com
2. Sign up and create new project
3. Save your database password!

### Step 2: Get Credentials (2 min)
1. Go to Settings → API
2. Copy:
   - Project URL
   - anon public key

### Step 3: Run Migrations (10 min)
1. Go to SQL Editor in Supabase
2. Run these 5 migrations in order:
   - Profiles table
   - News table
   - Articles table
   - Videos table
   - Settings table

(Copy from SUPABASE_SETUP_GUIDE.md)

### Step 4: Create Admin & Seed Data (5 min)
1. Go to Authentication → Users
2. Create admin user
3. Copy User UID
4. Run profile creation SQL (replace UID)
5. Run seed.sql to add 10 items each

### Step 5: Configure App (3 min)
1. Copy `.env.local.example` to `.env.local`
2. Add your Supabase URL and key
3. Run: `npm install @supabase/supabase-js`
4. Run: `npm run dev`
5. Login at http://localhost:3000/admin/login

## ✅ Done!

You now have:
- 10 Legal Articles
- 10 News Items
- 10 Videos
- Real database backend
- Production-ready setup

## 📚 Need Details?

See **SUPABASE_SETUP_GUIDE.md** for complete step-by-step instructions with screenshots and troubleshooting.

## 🎯 What You Get

All sample data covers:
- Cyber Crimes & IT Act
- NDPS Act & Drug Laws
- Financial Crimes & Fraud
- Bail Applications
- Deportation & Travel Bans
- Criminal Trials
- White Collar Crimes
- Domestic Violence
- Consumer Protection
- Property Disputes

Each with professional content, images, and proper formatting!
