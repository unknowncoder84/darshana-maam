# 🚀 Deploy Now - Quick Guide

## Step 1: Push to GitHub (Copy & Paste These Commands)

Open your terminal in the `law-firm-web-app` folder and run:

```bash
# Remove old git configuration
rm -rf .git

# Initialize new repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Law firm website ready for deployment"

# Set main branch
git branch -M main

# Add your GitHub repository
git remote add origin https://github.com/unknowncoder84/darshana-maam.git

# Push to GitHub
git push -u origin main
```

**Done!** Your code is now on GitHub at: https://github.com/unknowncoder84/darshana-maam

---

## Step 2: Deploy to Netlify (5 Minutes)

### A. Go to Netlify
1. Open https://app.netlify.com
2. Click "Add new site" → "Import an existing project"

### B. Connect GitHub
1. Click "Deploy with GitHub"
2. Authorize Netlify (if first time)
3. Search for: `darshana-maam`
4. Click on your repository

### C. Configure Build
Netlify should auto-detect these settings:
- **Build command:** `npm run build`
- **Publish directory:** `.next`

If not, enter them manually.

### D. Deploy!
1. Click "Deploy site"
2. Wait 2-3 minutes
3. Your site is LIVE! 🎉

---

## Step 3: Get Your Live URL

After deployment completes:
1. You'll see a URL like: `https://random-name-123.netlify.app`
2. Click on it to view your live website!

---

## Step 4: Test Your Website

Visit these pages to verify everything works:
- ✅ Homepage: `https://your-site.netlify.app/`
- ✅ About: `https://your-site.netlify.app/about`
- ✅ Services: `https://your-site.netlify.app/practice-areas`
- ✅ Articles: `https://your-site.netlify.app/articles`
- ✅ News: `https://your-site.netlify.app/news`
- ✅ Videos: `https://your-site.netlify.app/videos`
- ✅ Contact: `https://your-site.netlify.app/contact`
- ✅ Admin: `https://your-site.netlify.app/admin/login`

### Test Admin Login
- Username: `admin`
- Password: `admin123`

---

## Optional: Change Site Name

1. In Netlify dashboard, go to "Site settings"
2. Click "Change site name"
3. Enter: `darshana-law-firm` (or your choice)
4. Your new URL: `https://darshana-law-firm.netlify.app`

---

## Optional: Add Custom Domain

1. Buy a domain (e.g., `settleherelawfirm.com`)
2. In Netlify: "Domain settings" → "Add custom domain"
3. Follow DNS setup instructions
4. Wait 24-48 hours for DNS propagation

---

## Future Updates

To update your website:

```bash
# Make changes to your code
# Then:

git add .
git commit -m "Updated content"
git push origin main

# Netlify will automatically rebuild and deploy!
```

---

## 🎉 That's It!

Your law firm website is now live on the internet!

**What you have:**
- ✅ Professional law firm website
- ✅ 10 legal articles
- ✅ 10 news items
- ✅ 10 educational videos
- ✅ Admin dashboard
- ✅ Mobile responsive
- ✅ Fast loading
- ✅ Secure (HTTPS)
- ✅ Free hosting

**Need help?** Check `GITHUB_NETLIFY_DEPLOYMENT.md` for detailed instructions.
