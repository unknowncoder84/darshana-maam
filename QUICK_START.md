# Quick Start Guide

## ✅ Error Fixed!

The "useAuth must be used within an AuthProvider" error has been resolved. The root layout now properly wraps the application with both `AuthProvider` and `ToastProvider`.

## Getting Started

### 1. Install Dependencies

```bash
cd law-firm-web-app
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from your Supabase project dashboard.

### 3. Set Up Database

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run each migration file in order (001 through 011)
4. Files are located in `supabase/migrations/`

### 4. Create First Admin User

**Option A: Via Supabase Dashboard**
1. Go to Authentication → Users
2. Click "Add User"
3. Email: `admin@lawfirm.local`
4. Password: Choose a strong password (min 8 chars alphanumeric)
5. Click "Create User"

**Option B: Via SQL**
```sql
-- First create the auth user in Supabase Dashboard
-- Then run this SQL with the user's ID:
INSERT INTO profiles (id, username, role)
VALUES ('USER_ID_FROM_AUTH', 'admin', 'admin');
```

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 6. Access Admin Dashboard

1. Go to `http://localhost:3000`
2. Scroll to footer and click "Admin Login" (lock icon)
3. Login with:
   - Username: `admin`
   - Password: Your chosen password
4. You'll be redirected to the admin dashboard

## What's Working Now

✅ **Authentication System**
- Login page with secure authentication
- Session management
- Role-based access control

✅ **Admin Dashboard**
- Statistics cards
- Calendar widget
- Quick actions
- Sidebar navigation

✅ **User Management** (Admin Only)
- Create users
- Edit user roles
- Delete users
- View user list

✅ **Content Management**
- News CRUD operations
- Articles CRUD operations
- Videos CRUD operations
- Rich text editor
- Image uploads
- Publish/unpublish

✅ **Public Website**
- Home page
- About page
- Practice Areas (enhanced with details)
- Articles (enhanced layout)
- News
- Videos
- Contact

✅ **UI/UX Fixes**
- Header overlap fixed
- Enhanced content density
- Professional styling
- Responsive design

## Testing the Application

### Test Authentication
1. Visit `/admin/login`
2. Try logging in with correct credentials ✅
3. Try logging in with wrong credentials ❌
4. Verify redirect to dashboard on success

### Test User Management (Admin)
1. Go to Users page
2. Create a new user with "user" role
3. Log out and log in as the new user
4. Verify you cannot access Users or Settings pages
5. Verify you can access content management

### Test Content Management
1. Create a news item
2. Upload an image
3. Toggle published status
4. View on public website
5. Edit and delete the item

### Test Public Website
1. Visit home page
2. Navigate to Articles
3. Check category filters
4. View article details
5. Check Practice Areas page for enhanced content

## Common Issues

### "useAuth must be used within an AuthProvider"
✅ **FIXED** - Root layout now includes AuthProvider

### Cannot connect to Supabase
- Check `.env.local` file exists and has correct values
- Restart development server after changing env vars

### Cannot create users
- Verify you're logged in as admin role
- Check Supabase Auth is enabled
- Verify RLS policies are applied

### Images not uploading
- Create `images` and `videos` buckets in Supabase Storage
- Set bucket policies to allow authenticated uploads

## Next Steps

1. **Customize Branding**
   - Update firm name in settings
   - Add logo images
   - Customize colors in `globals.css`

2. **Add Content**
   - Create news items
   - Write articles
   - Upload videos
   - Update practice areas

3. **Configure Settings**
   - Update contact information
   - Add social media links
   - Set firm address and phone

4. **Create Users**
   - Add team members
   - Assign appropriate roles
   - Set strong passwords

5. **Deploy to Production**
   - Follow `DEPLOYMENT_GUIDE.md`
   - Configure production environment
   - Set up domain and SSL

## Documentation

- `README.md` - Project overview
- `ADMIN_USER_GUIDE.md` - How to use the admin dashboard
- `ADMIN_DASHBOARD_SUMMARY.md` - Technical implementation details
- `IMPLEMENTATION_COMPLETE.md` - Complete feature list
- `TROUBLESHOOTING.md` - Common issues and solutions
- `DEPLOYMENT_GUIDE.md` - Production deployment guide

## Support

If you encounter any issues:
1. Check `TROUBLESHOOTING.md`
2. Review browser console for errors
3. Check Supabase logs
4. Verify environment variables
5. Restart development server

## Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests (if configured)
npm test

# Lint code
npm run lint
```

---

**Status**: ✅ Ready to Use
**Version**: 1.0.0
**Last Updated**: February 27, 2026

🎉 **The application is now fully functional and ready for development!**
