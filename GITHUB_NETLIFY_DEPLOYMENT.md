# GitHub & Netlify Deployment Guide

## 🚀 Complete Deployment Instructions

Follow these steps to push your code to GitHub and deploy to Netlify.

---

## Part 1: Push to GitHub (5 minutes)

### Step 1: Remove Old Git Configuration

```bash
cd law-firm-web-app

# Remove existing git configuration
rm -rf .git

# Verify it's removed
ls -la | grep .git
```

### Step 2: Initialize New Git Repository

```bash
# Initialize new git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Production ready law firm website"

# Rename branch to main
git branch -M main
```

### Step 3: Connect to Your GitHub Repository

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/unknowncoder84/darshana-maam.git

# Verify remote is added
git remote -v
```

### Step 4: Push to GitHub

```bash
# Push code to GitHub
git push -u origin main
```

If you encounter authentication issues:
- Use GitHub Personal Access Token instead of password
- Or use SSH key authentication

---

## Part 2: Deploy to Netlify (10 minutes)

### Option A: Deploy via Netlify Dashboard (Recommended)

#### Step 1: Login to Netlify
1. Go to https://netlify.com
2. Sign up or login with GitHub account

#### Step 2: Import Repository
1. Click "Add new site" → "Import an existing project"
2. Choose "Deploy with GitHub"
3. Authorize Netlify to access your GitHub
4. Select repository: `unknowncoder84/darshana-maam`

#### Step 3: Configure Build Settings
Netlify should auto-detect Next.js settings:

```
Build command: npm run build
Publish directory: .next
```

If not auto-detected, enter these manually.

#### Step 4: Add Environment Variables (Optional - for Supabase)
If you've set up Supabase, add these in "Site settings" → "Environment variables":

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Skip this step if using localStorage demo mode.

#### Step 5: Deploy
1. Click "Deploy site"
2. Wait 2-3 minutes for build to complete
3. Your site is live! 🎉

#### Step 6: Custom Domain (Optional)
1. Go to "Domain settings"
2. Add custom domain
3. Follow DNS configuration instructions

---

### Option B: Deploy via Netlify CLI

#### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Step 2: Login to Netlify
```bash
netlify login
```

#### Step 3: Initialize Netlify Site
```bash
cd law-firm-web-app
netlify init
```

Follow the prompts:
- Create & configure a new site
- Choose your team
- Site name: `darshana-law-firm` (or your choice)
- Build command: `npm run build`
- Publish directory: `.next`

#### Step 4: Deploy
```bash
# Deploy to production
netlify deploy --prod
```

---

## Part 3: Verify Deployment

### Check Your Live Site
1. Open the Netlify URL (e.g., `https://darshana-law-firm.netlify.app`)
2. Test all pages:
   - ✅ Homepage
   - ✅ About
   - ✅ Practice Areas
   - ✅ Articles
   - ✅ News
   - ✅ Videos
   - ✅ Contact
   - ✅ Admin Login

### Test Admin Dashboard
1. Go to `/admin/login`
2. Login with demo credentials:
   - Username: `admin`
   - Password: `admin123`
3. Verify dashboard loads correctly

---

## Part 4: Post-Deployment Configuration

### Enable Continuous Deployment
Netlify automatically deploys when you push to GitHub:

```bash
# Make a change
git add .
git commit -m "Update content"
git push origin main

# Netlify will automatically rebuild and deploy
```

### Configure Build Notifications
1. Go to Netlify dashboard
2. Site settings → Build & deploy → Deploy notifications
3. Add email or Slack notifications

### Setup Custom Domain
1. Purchase domain (e.g., GoDaddy, Namecheap)
2. In Netlify: Domain settings → Add custom domain
3. Update DNS records:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5

   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```
4. Wait for DNS propagation (up to 48 hours)

---

## Troubleshooting

### Build Fails on Netlify

**Error: "Command failed with exit code 1"**

Solution:
```bash
# Locally test the build
npm run build

# If it works locally, check Netlify build logs
# Common issues:
# - Missing dependencies
# - Environment variables not set
# - Node version mismatch
```

**Fix Node Version:**
Add to `netlify.toml`:
```toml
[build.environment]
  NODE_VERSION = "18"
```

### Site Loads but Pages Show 404

**Issue:** Next.js routing not working

**Solution:** Already configured in `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Admin Login Not Working

**Issue:** localStorage not persisting

**Solution:** This is normal behavior. Demo mode uses browser localStorage which resets on each session. For persistent data, set up Supabase.

### Images Not Loading

**Issue:** External images blocked

**Solution:** Already configured in `next.config.ts`:
```typescript
images: {
  domains: ['images.unsplash.com'],
}
```

---

## Quick Command Reference

### Git Commands
```bash
# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main

# View commit history
git log --oneline
```

### Netlify Commands
```bash
# Login
netlify login

# Check site status
netlify status

# Deploy to production
netlify deploy --prod

# Open site in browser
netlify open:site

# Open admin dashboard
netlify open:admin

# View build logs
netlify watch
```

### NPM Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test
```

---

## Environment Variables

### For localStorage Demo Mode (Current)
No environment variables needed! Deploy as-is.

### For Supabase Production Mode
Add these in Netlify dashboard:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...your-key
```

---

## Deployment Checklist

### Before Pushing to GitHub
- [x] All code changes committed
- [x] Build tested locally (`npm run build`)
- [x] All pages working
- [x] Admin dashboard functional
- [x] Demo data populated
- [x] No sensitive data in code
- [x] `.gitignore` configured properly

### After Pushing to GitHub
- [ ] Repository visible on GitHub
- [ ] All files uploaded
- [ ] README.md displays correctly

### After Deploying to Netlify
- [ ] Build successful
- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] Images loading
- [ ] Admin login works
- [ ] Mobile responsive
- [ ] Custom domain configured (optional)

---

## Next Steps

1. **Push to GitHub** (5 min)
   ```bash
   cd law-firm-web-app
   rm -rf .git
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/unknowncoder84/darshana-maam.git
   git push -u origin main
   ```

2. **Deploy to Netlify** (10 min)
   - Go to netlify.com
   - Import from GitHub
   - Deploy!

3. **Test Your Site** (5 min)
   - Visit Netlify URL
   - Test all pages
   - Login to admin

4. **Optional: Setup Supabase** (35 min)
   - Follow `SUPABASE_SETUP_GUIDE.md`
   - Add environment variables to Netlify
   - Redeploy

---

## Support

### Documentation
- Netlify Docs: https://docs.netlify.com
- Next.js Docs: https://nextjs.org/docs
- Supabase Docs: https://supabase.com/docs

### Common Issues
- Build fails: Check Node version in `netlify.toml`
- 404 errors: Check redirect rules in `netlify.toml`
- Slow builds: Enable build cache in Netlify settings

---

## 🎉 You're Ready!

Your law firm website is ready to deploy. Follow the steps above and you'll have a live website in 15 minutes!

**Quick Start:**
1. Run the git commands above
2. Go to netlify.com and import your repo
3. Click deploy
4. Done! 🚀
