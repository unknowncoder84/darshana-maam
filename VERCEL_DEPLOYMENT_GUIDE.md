# Vercel Deployment Guide - Settle Here Law Associates

## 🚀 Quick Deploy to Vercel

Your Next.js law firm website is ready for Vercel deployment! Follow these steps:

---

## Step 1: Prerequisites

✅ **What you need:**
- GitHub account (you already have this)
- Vercel account (free) - Sign up at https://vercel.com
- Your GitHub repository: https://github.com/unknowncoder84/darshana-maam

---

## Step 2: Deploy to Vercel

### Option A: One-Click Deploy (Recommended)

1. **Go to Vercel**
   - Visit https://vercel.com
   - Click "Sign Up" or "Login"
   - Choose "Continue with GitHub"

2. **Import Your Repository**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Find and select: `unknowncoder84/darshana-maam`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `law-firm-web-app`
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

4. **Add Environment Variables**
   Click "Environment Variables" and add:
   
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
   
   ⚠️ **Important**: Get these from your Supabase project dashboard:
   - Go to https://supabase.com/dashboard
   - Select your project
   - Go to Settings → API
   - Copy "Project URL" and "anon public" key

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at: `https://your-project-name.vercel.app`

---

## Step 3: Custom Domain (Optional)

### Add Your Own Domain

1. **In Vercel Dashboard**
   - Go to your project
   - Click "Settings" → "Domains"
   - Click "Add Domain"
   - Enter your domain (e.g., `settleherelaw.com`)

2. **Configure DNS**
   - Add these records to your domain registrar:
   
   **For root domain (settleherelaw.com):**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```
   
   **For www subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Wait for DNS Propagation**
   - Usually takes 5-30 minutes
   - Vercel will auto-issue SSL certificate

---

## Step 4: Verify Deployment

### Check These URLs:

✅ **Homepage**: `https://your-project.vercel.app`
✅ **Admin Login**: `https://your-project.vercel.app/admin/login`
✅ **Articles**: `https://your-project.vercel.app/articles`
✅ **Contact**: `https://your-project.vercel.app/contact`

### Test Admin Access:

1. Go to `/admin/login`
2. Use your Supabase credentials
3. Verify you can access the dashboard

---

## Step 5: Automatic Deployments

🎉 **Good news!** Vercel automatically deploys when you push to GitHub:

- **Push to `main` branch** → Production deployment
- **Push to other branches** → Preview deployment
- **Pull requests** → Preview deployment with unique URL

---

## Configuration Files

Your project includes:

✅ **vercel.json** - Vercel configuration
- Build settings
- Environment variables
- Security headers
- Region settings (Mumbai/India)

✅ **.nvmrc** - Node.js version (20.19.0)
✅ **package.json** - Dependencies and scripts
✅ **next.config.ts** - Next.js configuration

---

## Environment Variables Reference

### Required Variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Optional Variables:

```bash
# Service Role Key (for admin operations - keep secret!)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Analytics (if you add later)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## Troubleshooting

### Build Fails?

**Check these:**
1. ✅ Node.js version is 20.19.0 (set in .nvmrc)
2. ✅ All environment variables are set
3. ✅ Root directory is set to `law-firm-web-app`

**View build logs:**
- Go to Vercel Dashboard → Your Project → Deployments
- Click on failed deployment
- Check "Build Logs" tab

### Site Loads But No Data?

**Check Supabase connection:**
1. Verify environment variables are correct
2. Check Supabase project is active
3. Verify RLS policies allow public read access

### Admin Login Not Working?

**Check:**
1. Supabase Auth is enabled
2. Email provider is configured in Supabase
3. User exists in Supabase Auth

---

## Performance Optimization

Vercel automatically provides:

✅ **Global CDN** - Fast loading worldwide
✅ **Edge Functions** - Server-side rendering at the edge
✅ **Image Optimization** - Automatic image optimization
✅ **Automatic HTTPS** - Free SSL certificates
✅ **DDoS Protection** - Built-in security

---

## Monitoring & Analytics

### Vercel Analytics (Free)

1. Go to your project in Vercel
2. Click "Analytics" tab
3. Enable "Web Analytics"
4. View real-time visitor data

### Speed Insights

1. Click "Speed Insights" tab
2. View Core Web Vitals
3. Get performance recommendations

---

## Deployment Checklist

Before going live, verify:

- [ ] Environment variables are set
- [ ] Supabase is configured and accessible
- [ ] Admin login works
- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] Images load properly
- [ ] Mobile responsive design works
- [ ] Custom domain is configured (if applicable)
- [ ] SSL certificate is active
- [ ] Contact information is correct (+91 8055666660)

---

## Support & Resources

### Vercel Documentation
- https://vercel.com/docs
- https://vercel.com/docs/frameworks/nextjs

### Next.js Documentation
- https://nextjs.org/docs

### Supabase Documentation
- https://supabase.com/docs

### Your Repository
- https://github.com/unknowncoder84/darshana-maam

---

## Quick Commands

```bash
# Test build locally before deploying
npm run build

# Run production build locally
npm run start

# Run development server
npm run dev

# Run tests
npm run test
```

---

## What's Included

Your deployment includes:

✅ **Modern Jurist 3D Glassmorphic Theme**
✅ **Responsive Design** (Mobile, Tablet, Desktop)
✅ **Admin Dashboard** (Full CMS)
✅ **SEO Optimized** (Meta tags, sitemap, robots.txt)
✅ **Security Headers** (XSS, CSRF protection)
✅ **Performance Optimized** (Code splitting, lazy loading)
✅ **Accessibility Compliant** (WCAG guidelines)
✅ **Dark Theme Support**
✅ **WhatsApp Integration**
✅ **Contact Forms**
✅ **Article Management**
✅ **News Management**
✅ **Video Management**
✅ **User Management**

---

## Next Steps After Deployment

1. **Test Everything**
   - Browse all pages
   - Test admin functions
   - Submit test forms

2. **Add Content**
   - Login to admin panel
   - Add articles, news, videos
   - Update firm settings

3. **Configure SEO**
   - Add meta descriptions
   - Submit sitemap to Google
   - Set up Google Analytics

4. **Monitor Performance**
   - Check Vercel Analytics
   - Monitor Speed Insights
   - Review error logs

---

## 🎉 You're Ready to Deploy!

Your law firm website is production-ready and optimized for Vercel. Just follow the steps above and you'll be live in minutes!

**Need help?** Check the troubleshooting section or Vercel's excellent documentation.

---

**Deployed by:** Kiro AI Assistant
**Repository:** https://github.com/unknowncoder84/darshana-maam
**Framework:** Next.js 16.1.6
**Platform:** Vercel
