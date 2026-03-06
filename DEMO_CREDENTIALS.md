# 🎭 Demo Mode - Test Credentials

The application is now running in **DEMO MODE** with hardcoded credentials for testing purposes.

## Demo Login Credentials

### Admin Account (Full Access)
```
Username: admin
Password: admin123
```

**Access to:**
- ✅ Dashboard with statistics
- ✅ News management
- ✅ Articles management
- ✅ Videos management
- ✅ User management
- ✅ Firm settings
- ✅ Calendar widget

### User Account (Content Management Only)
```
Username: user
Password: user123
```

**Access to:**
- ✅ Dashboard with statistics
- ✅ News management
- ✅ Articles management
- ✅ Videos management
- ❌ User management (Admin only)
- ❌ Firm settings (Admin only)

## How to Login

1. **Start the application:**
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   - Go to `http://localhost:3000`

3. **Access login page:**
   - Scroll to footer and click "Admin Login" (lock icon)
   - OR go directly to: `http://localhost:3000/admin/login`

4. **Enter credentials:**
   - Use either admin or user credentials above
   - Click "Sign In"

5. **You're in!**
   - You'll be redirected to the admin dashboard

## Features You Can Test

### As Admin
1. **Dashboard**
   - View content statistics
   - See calendar widget
   - Access quick actions

2. **Content Management**
   - Create/edit/delete news items
   - Create/edit/delete articles
   - Create/edit/delete videos
   - Toggle publish status

3. **User Management**
   - View user list (demo users)
   - Create new users (demo only - won't persist)
   - Edit user roles
   - Delete users

4. **Settings**
   - Update firm information
   - Modify contact details
   - Update social links

### As User
1. **Dashboard**
   - View content statistics
   - Access quick actions

2. **Content Management**
   - Create/edit/delete news items
   - Create/edit/delete articles
   - Create/edit/delete videos
   - Toggle publish status

3. **Restricted Access**
   - Cannot access User Management
   - Cannot access Settings
   - Sidebar won't show these options

## Important Notes

⚠️ **Demo Mode Limitations:**
- Data is NOT saved to a database
- Content changes are temporary (lost on refresh)
- User management changes are not persisted
- Images won't actually upload (demo only)
- Session stored in browser localStorage

⚠️ **For Production Use:**
- You MUST set up Supabase
- Replace demo auth with real Supabase auth
- Follow the setup guide in `QUICK_START.md`

## Testing Scenarios

### Test 1: Admin Login
1. Login as admin (admin/admin123)
2. Verify you see all menu items
3. Check calendar widget appears
4. Try accessing User Management
5. Try accessing Settings

### Test 2: User Login
1. Logout (if logged in)
2. Login as user (user/user123)
3. Verify User Management is hidden
4. Verify Settings is hidden
5. Verify you can access content pages

### Test 3: Invalid Login
1. Try logging in with wrong credentials
2. Verify error message appears
3. Verify you stay on login page

### Test 4: Session Persistence
1. Login as admin
2. Refresh the page
3. Verify you're still logged in
4. Navigate to different pages
5. Verify session persists

### Test 5: Logout
1. Login as any user
2. Click logout button
3. Verify redirect to login page
4. Try accessing admin pages
5. Verify redirect back to login

## Switching to Production

When ready for production:

1. **Set up Supabase** (see `QUICK_START.md`)
2. **Update `.env.local`** with real credentials
3. **Replace AuthContext** with Supabase version
4. **Run database migrations**
5. **Create real admin user**

## Quick Commands

```bash
# Start development server
npm run dev

# Stop server
Ctrl + C

# Clear browser cache
Cmd/Ctrl + Shift + Delete

# View in browser
http://localhost:3000
```

## Troubleshooting

**Can't login?**
- Make sure you're using exact credentials (case-sensitive)
- Clear browser cache and try again
- Check browser console for errors

**Session lost on refresh?**
- Check browser localStorage is enabled
- Try a different browser
- Clear cookies and try again

**Pages not loading?**
- Make sure `npm run dev` is running
- Check terminal for errors
- Try restarting the dev server

---

**Demo Mode Active** 🎭
Ready to test the admin dashboard without any setup!

Start testing now: `npm run dev` → `http://localhost:3000/admin/login`
