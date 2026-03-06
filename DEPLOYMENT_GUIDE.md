# Deployment Guide - Law Firm Web Application

## Pre-Deployment Checklist

### 1. Environment Variables
Create a `.env.local` file with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 2. Database Setup

#### Run Migrations
Execute all migration files in order:
```bash
cd supabase/migrations
# Run each migration file in Supabase SQL Editor
```

#### Seed Initial Data
Run the seed file to create initial admin user and settings:
```bash
# Execute supabase/seed.sql in Supabase SQL Editor
```

#### Default Admin Credentials
- Username: `admin`
- Password: `admin123` (Change immediately after first login!)

### 3. Supabase Storage Buckets
Create the following storage buckets in Supabase:
- `images` - For news images, article images, video thumbnails
- `videos` - For uploaded video files

Set bucket policies to:
- Public read access
- Authenticated write access

### 4. Build and Test

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build for production
npm run build

# Test production build locally
npm start
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   - Push code to GitHub/GitLab/Bitbucket
   - Import project in Vercel dashboard

2. **Configure Environment Variables**
   - Add all environment variables in Vercel project settings
   - Ensure `NEXT_PUBLIC_SITE_URL` matches your domain

3. **Deploy**
   - Vercel will automatically deploy on push to main branch
   - Custom domain can be configured in project settings

4. **Post-Deployment**
   - Verify all pages load correctly
   - Test admin login
   - Create test content
   - Verify public pages display content

### Option 2: Self-Hosted (Docker)

1. **Create Dockerfile** (already included in project)

2. **Build Docker Image**
```bash
docker build -t law-firm-app .
```

3. **Run Container**
```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
  -e SUPABASE_SERVICE_ROLE_KEY=your_service_key \
  -e NEXT_PUBLIC_SITE_URL=https://yourdomain.com \
  law-firm-app
```

### Option 3: Other Platforms

The application can be deployed to:
- **Netlify**: Similar to Vercel
- **AWS Amplify**: Full AWS integration
- **DigitalOcean App Platform**: Simple deployment
- **Railway**: Easy deployment with database

## Post-Deployment Configuration

### 1. Update Firm Settings
1. Log in to admin dashboard at `/admin/login`
2. Navigate to Settings
3. Update:
   - Firm name
   - Address
   - Phone number
   - Email
   - Social media links

### 2. Create Content
1. **News**: Add firm updates and announcements
2. **Articles**: Publish legal insights and expertise
3. **Videos**: Upload or link educational videos

### 3. User Management
1. Create additional admin users if needed
2. Create content user accounts for staff
3. Change default admin password

### 4. SEO Configuration
1. Verify sitemap is accessible at `/sitemap.xml`
2. Verify robots.txt at `/robots.txt`
3. Submit sitemap to Google Search Console
4. Configure Google Analytics (optional)

## Monitoring and Maintenance

### Performance Monitoring
- Use Vercel Analytics or Google Analytics
- Monitor Core Web Vitals
- Check Lighthouse scores regularly

### Error Monitoring
Consider integrating:
- **Sentry**: Error tracking and monitoring
- **LogRocket**: Session replay and debugging
- **Datadog**: Full-stack monitoring

### Regular Maintenance
- **Weekly**: Review and publish new content
- **Monthly**: Check for security updates
- **Quarterly**: Review analytics and optimize

## Security Best Practices

### 1. Change Default Credentials
Immediately change the default admin password after first login.

### 2. Enable 2FA (Future Enhancement)
Consider implementing two-factor authentication for admin accounts.

### 3. Regular Backups
- Supabase provides automatic backups
- Consider additional backup strategy for critical data

### 4. SSL/TLS
- Ensure HTTPS is enabled (automatic on Vercel)
- Use strong SSL certificates

### 5. Rate Limiting
Consider implementing rate limiting for:
- Login attempts
- API endpoints
- Form submissions

## Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Database Connection Issues
- Verify Supabase URL and keys
- Check RLS policies are enabled
- Ensure migrations are applied

### Image Upload Issues
- Verify storage buckets exist
- Check bucket policies
- Ensure file size limits are configured

### Authentication Issues
- Verify Supabase Auth is enabled
- Check middleware configuration
- Ensure session cookies are working

## Support and Documentation

### Internal Documentation
- `README.md` - Project overview and setup
- `IMPLEMENTATION_SUMMARY.md` - Implementation details
- `PERFORMANCE.md` - Performance optimization guide
- `ACCESSIBILITY.md` - Accessibility compliance guide

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## Rollback Procedure

If issues occur after deployment:

1. **Vercel**: Use "Rollback" button in deployments tab
2. **Docker**: Revert to previous image version
3. **Database**: Restore from Supabase backup

## Performance Optimization

### After Deployment
1. Enable Vercel Analytics
2. Configure CDN for static assets
3. Optimize images in Supabase Storage
4. Enable compression for API responses

### Monitoring Metrics
- Page load time < 3 seconds
- Time to Interactive < 5 seconds
- Lighthouse score > 90

## Scaling Considerations

### Traffic Growth
- Supabase scales automatically
- Vercel handles traffic spikes
- Consider CDN for global distribution

### Database Optimization
- Add indexes for frequently queried fields
- Implement connection pooling
- Monitor query performance

## Compliance

### GDPR (if applicable)
- Add privacy policy page
- Implement cookie consent
- Provide data export functionality

### Accessibility
- Application meets WCAG 2.1 Level AA
- Regular accessibility audits recommended
- See ACCESSIBILITY.md for details

## Contact and Support

For technical support or questions:
- Review documentation in project root
- Check Supabase dashboard for database issues
- Review Vercel logs for deployment issues

---

**Deployment Date**: _To be filled_  
**Deployed By**: _To be filled_  
**Production URL**: _To be filled_  
**Admin URL**: _To be filled_/admin/login
