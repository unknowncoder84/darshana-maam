# Troubleshooting Guide

## Common Issues and Solutions

### 1. "useAuth must be used within an AuthProvider" Error

**Problem**: The AuthProvider is not wrapping the application properly.

**Solution**: ✅ FIXED - The root layout (`app/layout.tsx`) now includes both `AuthProvider` and `ToastProvider` wrapping all children.

**Verification**:
```typescript
// app/layout.tsx should have:
<AuthProvider>
  <ToastProvider>
    {children}
  </ToastProvider>
</AuthProvider>
```

### 2. Supabase Connection Issues

**Problem**: Cannot connect to Supabase or authentication fails.

**Solution**:
1. Check environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```
2. Restart the development server after changing environment variables
3. Verify Supabase project is active and accessible

### 3. Database Migration Issues

**Problem**: Tables don't exist or RLS policies are not working.

**Solution**:
1. Run migrations in order:
   ```bash
   # In Supabase SQL Editor, run each migration file in order:
   # 001_create_profiles_table.sql
   # 002_create_news_table.sql
   # 003_create_articles_table.sql
   # 004_create_videos_table.sql
   # 005_create_settings_table.sql
   # 006_enable_rls_profiles.sql
   # 007_enable_rls_news.sql
   # 008_enable_rls_articles.sql
   # 009_enable_rls_videos.sql
   # 010_enable_rls_settings.sql
   # 011_add_image_to_articles.sql
   ```

2. Verify RLS is enabled:
   ```sql
   SELECT tablename, rowsecurity 
   FROM pg_tables 
   WHERE schemaname = 'public';
   ```

### 4. Cannot Create First Admin User

**Problem**: No users exist and cannot log in to create users.

**Solution**:
1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add User" (via email)
3. Create user with email format: `admin@lawfirm.local`
4. Set a password (minimum 8 characters alphanumeric)
5. Go to SQL Editor and run:
   ```sql
   INSERT INTO profiles (id, username, role)
   VALUES (
     'USER_ID_FROM_AUTH_USERS',
     'admin',
     'admin'
   );
   ```
6. Now you can log in with username: `admin` and your password

### 5. Login Page Not Loading

**Problem**: Login page shows blank or errors.

**Solution**:
1. Clear browser cache and cookies
2. Check browser console for errors
3. Verify `.env.local` has correct Supabase credentials
4. Restart development server: `npm run dev`

### 6. Admin Routes Not Protected

**Problem**: Can access admin pages without logging in.

**Solution**:
1. Verify middleware is configured in `middleware.ts`
2. Check that admin layout has authentication check
3. Clear browser cache and test again

### 7. Images Not Uploading

**Problem**: Image upload fails or images don't display.

**Solution**:
1. Check Supabase Storage buckets exist:
   - `images` bucket
   - `videos` bucket
2. Verify bucket policies allow authenticated uploads:
   ```sql
   -- In Supabase SQL Editor
   CREATE POLICY "Authenticated users can upload images"
   ON storage.objects FOR INSERT
   TO authenticated
   WITH CHECK (bucket_id = 'images');
   ```
3. Check file size limits (default 5MB)
4. Verify file format is supported (JPG, PNG, WebP)

### 8. Calendar Widget Not Showing

**Problem**: Calendar widget doesn't appear on dashboard.

**Solution**:
1. Verify you're logged in as an admin (not user role)
2. Check browser console for errors
3. Clear cache and refresh page
4. Verify `CalendarWidget.tsx` component exists

### 9. User Management Page Shows 403 Error

**Problem**: Cannot access user management page.

**Solution**:
1. Verify you're logged in as admin role (not user)
2. Check profile role in database:
   ```sql
   SELECT * FROM profiles WHERE username = 'your_username';
   ```
3. If role is 'user', update to 'admin':
   ```sql
   UPDATE profiles SET role = 'admin' WHERE username = 'your_username';
   ```

### 10. Development Server Won't Start

**Problem**: `npm run dev` fails or shows errors.

**Solution**:
1. Delete `.next` folder: `rm -rf .next` (or manually delete)
2. Delete `node_modules`: `rm -rf node_modules`
3. Reinstall dependencies: `npm install`
4. Clear npm cache: `npm cache clean --force`
5. Restart: `npm run dev`

### 11. TypeScript Errors

**Problem**: TypeScript compilation errors.

**Solution**:
1. Run type check: `npm run type-check` (if available)
2. Check for missing type definitions
3. Verify all imports are correct
4. Restart TypeScript server in VS Code: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

### 12. Styling Issues / Tailwind Not Working

**Problem**: Styles not applying or Tailwind classes not working.

**Solution**:
1. Verify `tailwind.config.ts` is configured correctly
2. Check `globals.css` imports Tailwind:
   ```css
   @import "tailwindcss";
   ```
3. Restart development server
4. Clear browser cache

### 13. Rich Text Editor Not Loading

**Problem**: Rich text editor doesn't appear in forms.

**Solution**:
1. Check if TipTap/Quill is installed: `npm list @tiptap/react`
2. Install if missing: `npm install @tiptap/react @tiptap/starter-kit`
3. Verify `RichTextEditor.tsx` component exists
4. Check browser console for errors

### 14. Session Expires Too Quickly

**Problem**: User gets logged out frequently.

**Solution**:
1. Check Supabase Auth settings in dashboard
2. Adjust session timeout in Supabase project settings
3. Implement refresh token logic if needed

### 15. Mobile Responsive Issues

**Problem**: Layout breaks on mobile devices.

**Solution**:
1. Test with browser dev tools mobile view
2. Check Tailwind responsive classes (sm:, md:, lg:)
3. Verify viewport meta tag in layout
4. Test on actual mobile devices

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Type check
npx tsc --noEmit

# Lint code
npm run lint

# Format code
npm run format
```

## Useful Supabase SQL Queries

```sql
-- Check all users and roles
SELECT p.username, p.role, p.created_at, u.email
FROM profiles p
JOIN auth.users u ON p.id = u.id
ORDER BY p.created_at DESC;

-- Check RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public';

-- Count content by type
SELECT 
  (SELECT COUNT(*) FROM news) as news_count,
  (SELECT COUNT(*) FROM articles) as articles_count,
  (SELECT COUNT(*) FROM videos) as videos_count;

-- Check published content
SELECT 
  (SELECT COUNT(*) FROM news WHERE published = true) as published_news,
  (SELECT COUNT(*) FROM articles WHERE published = true) as published_articles,
  (SELECT COUNT(*) FROM videos WHERE published = true) as published_videos;
```

## Getting Help

1. **Check Documentation**:
   - `README.md` - Project overview
   - `ADMIN_USER_GUIDE.md` - User guide
   - `ADMIN_DASHBOARD_SUMMARY.md` - Technical details
   - `IMPLEMENTATION_COMPLETE.md` - Implementation summary

2. **Check Logs**:
   - Browser console (F12)
   - Terminal where dev server is running
   - Supabase logs in dashboard

3. **Common File Locations**:
   - Environment variables: `.env.local`
   - Database migrations: `supabase/migrations/`
   - Components: `components/`
   - Pages: `app/`
   - Actions: `app/actions/`
   - Types: `lib/types/`

4. **Reset Everything** (Last Resort):
   ```bash
   # Stop dev server
   # Delete generated files
   rm -rf .next node_modules
   
   # Reinstall
   npm install
   
   # Restart
   npm run dev
   ```

## Contact Support

If issues persist:
1. Check GitHub issues (if applicable)
2. Contact system administrator
3. Review Supabase documentation: https://supabase.com/docs
4. Review Next.js documentation: https://nextjs.org/docs

---

**Last Updated**: February 27, 2026
**Version**: 1.0.0
