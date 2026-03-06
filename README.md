# Settle Here Law Associates - Website

Professional law firm website built with Next.js 14, TypeScript, and Tailwind CSS.

## 🌟 Features

- ✅ Modern, responsive design
- ✅ 3-color scheme (White, Black, Royal Blue)
- ✅ Admin dashboard with content management
- ✅ 10 legal articles with comprehensive content
- ✅ 10 news items with recent updates
- ✅ 10 educational videos
- ✅ Demo authentication system
- ✅ Mobile-first responsive design
- ✅ Professional animations and transitions
- ✅ SEO optimized
- ✅ Fast loading performance

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Visit http://localhost:3000
```

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
law-firm-web-app/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── practice-areas/    # Services page
│   ├── articles/          # Articles section
│   ├── news/              # News section
│   ├── videos/            # Videos section
│   ├── contact/           # Contact page
│   └── admin/             # Admin dashboard
├── components/            # React components
│   ├── public/           # Public-facing components
│   ├── admin/            # Admin components
│   └── shared/           # Shared components
├── lib/                  # Utilities and helpers
│   ├── types/           # TypeScript types
│   ├── contexts/        # React contexts
│   └── utils/           # Utility functions
└── supabase/            # Database migrations and seeds
```

## 🎨 Design

### Color Scheme
- **Primary**: Royal Blue (#1e40af)
- **Text**: Black (#000000)
- **Background**: White (#FFFFFF)

### Pages
1. **Homepage** - Hero section, services overview, statistics
2. **About** - Firm story, values, team information
3. **Practice Areas** - 15 legal service categories
4. **Articles** - 10 comprehensive legal guides
5. **News** - 10 recent firm updates
6. **Videos** - 10 educational legal videos
7. **Contact** - Contact information and office hours

### Admin Dashboard
- Statistics and analytics
- Content management (articles, news, videos)
- User management (admin only)
- Settings configuration
- Calendar and events

## 🔐 Demo Credentials

### Admin Access (Full Access)
- Username: `admin`
- Password: `admin123`

### User Access (Content Only)
- Username: `user`
- Password: `user123`

## 📦 Sample Data

The website comes pre-loaded with:
- **10 Articles**: Cyber crimes, NDPS Act, financial crimes, bail, deportation, trials, white collar crimes, domestic violence, consumer protection, property disputes
- **10 News Items**: Court judgments, legal amendments, firm victories, webinars, office openings
- **10 Videos**: Legal rights, procedures, and educational content

## 🚀 Deployment

### Deploy to Netlify (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/unknowncoder84/darshana-maam.git
   git push -u origin main
   ```

2. **Deploy on Netlify**
   - Go to https://netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub and select your repository
   - Build settings (auto-detected):
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Click "Deploy site"

3. **Your site is live!** 🎉

For detailed instructions, see `DEPLOY_NOW.md`

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🗄️ Database Options

### Option 1: localStorage (Current - Demo Mode)
- No setup required
- Works immediately
- Perfect for testing
- Data stored in browser

### Option 2: Supabase (Production Mode)
- Real PostgreSQL database
- Multi-user support
- Data persistence
- Production-ready

To setup Supabase, follow the guide in `SUPABASE_SETUP_GUIDE.md`

## 📚 Documentation

- **DEPLOY_NOW.md** - Quick deployment guide
- **GITHUB_NETLIFY_DEPLOYMENT.md** - Detailed deployment instructions
- **PRODUCTION_READY.md** - Production readiness checklist
- **SUPABASE_SETUP_GUIDE.md** - Database setup guide
- **QUICK_SUPABASE_START.md** - Fast track Supabase setup

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL) / localStorage
- **Authentication**: Demo mode / Supabase Auth
- **Deployment**: Netlify / Vercel
- **Testing**: Vitest

## 📝 Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Testing
npm test             # Run tests
npm run test:watch   # Run tests in watch mode

# Linting
npm run lint         # Run ESLint
```

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `netlify.toml` - Netlify deployment configuration
- `.env.local.example` - Environment variables template

## 🌐 Environment Variables

### For localStorage Demo Mode (Current)
No environment variables needed!

### For Supabase Production Mode
Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is a private project for Settle Here Law Associates.

## 📄 License

Proprietary - All rights reserved

## 📞 Support

For support or questions, contact the development team.

---

**Built with ❤️ for Settle Here Law Associates**

**Status**: Production Ready ✅
**Version**: 1.0.0
**Last Updated**: March 2026
