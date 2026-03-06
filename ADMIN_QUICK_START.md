# Admin Dashboard - Quick Start Guide

## 🚀 Getting Started

### Step 1: Start the Development Server
```bash
cd law-firm-web-app
npm run dev
```

### Step 2: Access the Admin Portal
Open your browser and navigate to:
```
http://localhost:3000/admin/login
```

### Step 3: Login with Demo Credentials

#### Admin Account (Full Access)
- **Username**: `admin`
- **Password**: `admin123`
- **Access**: All features including Calendar, Users, and Settings

#### User Account (Content Management Only)
- **Username**: `user`
- **Password**: `user123`
- **Access**: Dashboard, Articles, News, Videos only

## 📋 What You Can Do

### As Admin:
1. **Dashboard** - View statistics and quick actions
2. **Articles** - Create, edit, delete legal articles
3. **News** - Manage news items
4. **Videos** - Manage video content
5. **Calendar** - Track court dates, meetings, and deadlines
6. **Users** - Create and manage user accounts
7. **Settings** - Update firm information and social media links

### As User:
1. **Dashboard** - View statistics and quick actions
2. **Articles** - Create, edit, delete legal articles
3. **News** - Manage news items
4. **Videos** - Manage video content

## 🎯 Key Features

### Sidebar Navigation
- Click the collapse button (<<) to minimize sidebar to icons only
- Click expand button (>>) to restore full sidebar
- Active page is highlighted in blue

### Top Header
- Shows current page name and date
- **Quick Add Article** button - Fast access to create new article
- **View Site** button - Opens public website in new tab

### Calendar (Admin Only)
- Click any date to add an event
- Choose event type: Court Hearing, Meeting, or Deadline
- Events are color-coded for easy identification
- View upcoming events below the calendar

### User Management (Admin Only)
- Create new users with username and password
- Assign roles: Admin or User
- Edit user roles
- Delete users

## 🎨 Design Features

- **Professional Color Scheme**: Deep blue (#001f3f) with white/grey backgrounds
- **Smooth Animations**: Hover effects and transitions throughout
- **Responsive Layout**: Works on desktop and tablet
- **Modern UI**: Clean, minimalist design inspired by divorciofamilia.com

## ⚠️ Demo Mode Notes

- All data is temporary and stored in browser memory
- Changes are lost when you refresh the page
- No actual backend database is used
- Perfect for testing and demonstration

## 🔒 Security Features

- Authentication required for all admin pages
- Role-based access control (RBAC)
- Automatic redirect to login for unauthenticated users
- "Access Denied" pages for unauthorized access attempts

## 📱 Navigation Tips

1. Use the sidebar to navigate between sections
2. The current page is always highlighted
3. Logout button is at the bottom of the sidebar
4. Quick actions are available on the dashboard

## 🐛 Troubleshooting

### Can't Login?
- Make sure you're using the correct credentials
- Check that you're on the login page: `/admin/login`
- Try refreshing the page

### Page Not Loading?
- Check that the development server is running
- Look for errors in the browser console (F12)
- Try clearing browser cache and localStorage

### Access Denied?
- You may be logged in as a User trying to access admin-only features
- Logout and login as Admin to access Calendar, Users, or Settings

## 📞 Need Help?

If you encounter any issues:
1. Check the browser console for errors (F12)
2. Verify you're using the correct demo credentials
3. Make sure the development server is running
4. Try logging out and logging back in

## ✨ Enjoy Your Admin Dashboard!

The system is fully functional and ready for testing. Explore all the features and see how the role-based access control works by logging in with different accounts.
