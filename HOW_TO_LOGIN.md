# 🔐 How to Login - SIMPLE STEPS

## The server is running at: http://localhost:3000

## STEP 1: Clear Your Browser Storage
1. Open your browser
2. Press F12 to open Developer Tools
3. Go to the "Console" tab
4. Type this command and press Enter:
```javascript
localStorage.clear()
```
5. Close the Developer Tools

## STEP 2: Go to Login Page
Navigate to: **http://localhost:3000/admin/login**

## STEP 3: Enter Credentials
Type these credentials:
- Username: `admin`
- Password: `admin123`

## STEP 4: Click "Sign In"
The button will show "Signing in..." for a moment, then you'll be redirected to the dashboard.

## ✅ You should now see the Admin Dashboard!

---

## If it still doesn't work:

1. **Close your browser completely** (all windows)
2. **Open a new browser window**
3. Go directly to: http://localhost:3000/admin/login
4. Try logging in again with admin/admin123

---

## Demo Credentials:
- **Admin** (Full Access): username `admin`, password `admin123`
- **User** (Content Only): username `user`, password `user123`

---

## What I Fixed:
1. Removed all complex AuthContext dependencies from login
2. Login page now directly stores session in localStorage
3. Admin layout reads directly from localStorage (no React state conflicts)
4. No more redirect loops!

The login is now SUPER SIMPLE - just localStorage and basic redirects.
