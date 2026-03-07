# Database Schema Documentation

## Overview

This document describes the complete database schema for the Law Firm Web Application using Supabase (PostgreSQL).

## Entity Relationship Diagram

```
┌─────────────────────┐
│   auth.users        │ (Supabase Auth)
│─────────────────────│
│ id (UUID) PK        │
│ email               │
│ encrypted_password  │
│ created_at          │
└──────────┬──────────┘
           │
           │ 1:1
           │
┌──────────▼──────────┐
│   profiles          │
│─────────────────────│
│ id (UUID) PK, FK    │◄─────┐
│ username (unique)   │      │
│ role (admin/user)   │      │
│ created_at          │      │
└─────────────────────┘      │
                             │
                             │ RLS Policies Check
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
┌───────▼────────┐  ┌────────▼───────┐  ┌────────▼───────┐
│   articles     │  │     news       │  │    videos      │
│────────────────│  │────────────────│  │────────────────│
│ id (UUID) PK   │  │ id (UUID) PK   │  │ id (UUID) PK   │
│ title          │  │ title          │  │ title          │
│ slug (unique)  │  │ slug (unique)  │  │ slug (unique)  │
│ content        │  │ content        │  │ description    │
│ image          │  │ image          │  │ video_url      │
│ video_url      │  │ published      │  │ thumbnail      │
│ pdf_url        │  │ created_at     │  │ published      │
│ tags[]         │  │ updated_at     │  │ created_at     │
│ seo_meta       │  └────────────────┘  │ updated_at     │
│ published      │                      └────────────────┘
│ created_at     │
│ updated_at     │
└────────────────┘

┌─────────────────────┐
│     settings        │
│─────────────────────│
│ id (UUID) PK        │
│ firm_name           │
│ address             │
│ phone               │
│ email               │
│ social_links (JSON) │
│ created_at          │
│ updated_at          │
└─────────────────────┘
(Singleton - only 1 row)

┌─────────────────────┐
│ storage.objects     │ (Supabase Storage)
│─────────────────────│
│ id (UUID) PK        │
│ bucket_id           │
│ name                │
│ owner               │
│ created_at          │
└─────────────────────┘
```

## Tables

### 1. profiles

Stores user account information, linked to Supabase Auth.

| Column     | Type         | Constraints           | Description                    |
|------------|--------------|----------------------|--------------------------------|
| id         | UUID         | PK, FK → auth.users  | User ID from Supabase Auth     |
| username   | TEXT         | UNIQUE, NOT NULL     | Unique username for login      |
| role       | TEXT         | NOT NULL, CHECK      | 'admin' or 'user'              |
| created_at | TIMESTAMPTZ  | DEFAULT NOW()        | Account creation timestamp     |

**Indexes:**
- `idx_profiles_username` on username
- `idx_profiles_role` on role

**RLS Policies:**
- Admin users can view all profiles
- Users can view their own profile
- Only admins can insert/update/delete profiles

---

### 2. articles

Stores legal articles, guides, and blog posts.

| Column     | Type         | Constraints           | Description                    |
|------------|--------------|----------------------|--------------------------------|
| id         | UUID         | PK, DEFAULT gen_random_uuid() | Unique article ID    |
| title      | TEXT         | NOT NULL             | Article title                  |
| slug       | TEXT         | UNIQUE, NOT NULL     | URL-friendly identifier        |
| content    | TEXT         | NOT NULL             | HTML content                   |
| image      | TEXT         | NULL                 | Featured image URL             |
| video_url  | TEXT         | NULL                 | Embedded video URL             |
| pdf_url    | TEXT         | NULL                 | PDF attachment URL             |
| tags       | TEXT[]       | NULL                 | Array of tags                  |
| seo_meta   | JSONB        | NULL                 | SEO metadata (title, desc, keywords) |
| published  | BOOLEAN      | DEFAULT false        | Publication status             |
| created_at | TIMESTAMPTZ  | DEFAULT NOW()        | Creation timestamp             |
| updated_at | TIMESTAMPTZ  | DEFAULT NOW()        | Last update timestamp          |

**Indexes:**
- `idx_articles_slug` on slug
- `idx_articles_published` on published
- `idx_articles_created_at` on created_at DESC
- `idx_articles_tags` GIN index on tags (for array searches)

**Triggers:**
- `update_articles_updated_at` - Auto-updates updated_at on UPDATE

**RLS Policies:**
- Public can view published articles
- Authenticated users can view all articles
- Authenticated users can insert/update/delete articles

**SEO Meta Structure:**
```json
{
  "title": "Article SEO Title",
  "description": "Article meta description",
  "keywords": ["keyword1", "keyword2", "keyword3"]
}
```

---

### 3. news

Stores news items and firm updates.

| Column     | Type         | Constraints           | Description                    |
|------------|--------------|----------------------|--------------------------------|
| id         | UUID         | PK, DEFAULT gen_random_uuid() | Unique news ID       |
| title      | TEXT         | NOT NULL             | News title                     |
| slug       | TEXT         | UNIQUE, NOT NULL     | URL-friendly identifier        |
| content    | TEXT         | NOT NULL             | HTML content                   |
| image      | TEXT         | NULL                 | Featured image URL             |
| published  | BOOLEAN      | DEFAULT false        | Publication status             |
| created_at | TIMESTAMPTZ  | DEFAULT NOW()        | Creation timestamp             |
| updated_at | TIMESTAMPTZ  | DEFAULT NOW()        | Last update timestamp          |

**Indexes:**
- `idx_news_slug` on slug
- `idx_news_published` on published
- `idx_news_created_at` on created_at DESC

**Triggers:**
- `update_news_updated_at` - Auto-updates updated_at on UPDATE

**RLS Policies:**
- Public can view published news
- Authenticated users can view all news
- Authenticated users can insert/update/delete news

---

### 4. videos

Stores video content and tutorials.

| Column      | Type         | Constraints           | Description                    |
|-------------|--------------|----------------------|--------------------------------|
| id          | UUID         | PK, DEFAULT gen_random_uuid() | Unique video ID      |
| title       | TEXT         | NOT NULL             | Video title                    |
| slug        | TEXT         | UNIQUE, NOT NULL     | URL-friendly identifier        |
| description | TEXT         | NULL                 | Video description              |
| video_url   | TEXT         | NOT NULL             | YouTube/Vimeo URL              |
| thumbnail   | TEXT         | NULL                 | Video thumbnail URL            |
| published   | BOOLEAN      | DEFAULT false        | Publication status             |
| created_at  | TIMESTAMPTZ  | DEFAULT NOW()        | Creation timestamp             |
| updated_at  | TIMESTAMPTZ  | DEFAULT NOW()        | Last update timestamp          |

**Indexes:**
- `idx_videos_slug` on slug
- `idx_videos_published` on published
- `idx_videos_created_at` on created_at DESC

**Triggers:**
- `update_videos_updated_at` - Auto-updates updated_at on UPDATE

**RLS Policies:**
- Public can view published videos
- Authenticated users can view all videos
- Authenticated users can insert/update/delete videos

---

### 5. settings

Stores firm-wide settings (singleton table - only one row).

| Column       | Type         | Constraints           | Description                    |
|--------------|--------------|----------------------|--------------------------------|
| id           | UUID         | PK, DEFAULT gen_random_uuid() | Settings ID        |
| firm_name    | TEXT         | NOT NULL             | Law firm name                  |
| address      | TEXT         | NULL                 | Firm address                   |
| phone        | TEXT         | NULL                 | Contact phone                  |
| email        | TEXT         | NULL                 | Contact email                  |
| social_links | JSONB        | NULL                 | Social media links             |
| created_at   | TIMESTAMPTZ  | DEFAULT NOW()        | Creation timestamp             |
| updated_at   | TIMESTAMPTZ  | DEFAULT NOW()        | Last update timestamp          |

**Indexes:**
- `idx_settings_singleton` - Ensures only one row exists

**Triggers:**
- `update_settings_updated_at` - Auto-updates updated_at on UPDATE

**RLS Policies:**
- Public can view settings
- Only admins can insert/update settings

**Social Links Structure:**
```json
{
  "facebook": "https://facebook.com/page",
  "twitter": "https://twitter.com/handle",
  "linkedin": "https://linkedin.com/company/name",
  "instagram": "https://instagram.com/handle"
}
```

---

## Functions

### update_updated_at_column()

Automatically updates the `updated_at` column when a row is modified.

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

**Used by:**
- articles
- news
- videos
- settings

---

### get_content_stats()

Returns statistics about all content in the database.

```sql
CREATE OR REPLACE FUNCTION get_content_stats()
RETURNS TABLE (
  total_articles BIGINT,
  published_articles BIGINT,
  total_news BIGINT,
  published_news BIGINT,
  total_videos BIGINT,
  published_videos BIGINT,
  total_users BIGINT
)
```

**Usage:**
```sql
SELECT * FROM get_content_stats();
```

**Returns:**
```
total_articles | published_articles | total_news | published_news | total_videos | published_videos | total_users
---------------|-------------------|------------|----------------|--------------|------------------|-------------
10             | 10                | 10         | 10             | 10           | 10               | 1
```

---

### get_recent_content(limit)

Returns the most recent content across all types.

```sql
CREATE OR REPLACE FUNCTION get_recent_content(content_limit INT DEFAULT 5)
RETURNS TABLE (
  content_type TEXT,
  id UUID,
  title TEXT,
  slug TEXT,
  published BOOLEAN,
  created_at TIMESTAMPTZ
)
```

**Usage:**
```sql
SELECT * FROM get_recent_content(10);
```

---

## Storage

### Bucket: uploads

Stores uploaded files (images, PDFs).

**Configuration:**
- Public: Yes
- File size limit: 5 MB
- Allowed types: image/jpeg, image/png, image/webp, image/gif, application/pdf

**Policies:**
- Public can view files
- Authenticated users can upload/update/delete files

**File paths:**
```
uploads/
  ├── articles/
  │   ├── image1.jpg
  │   └── document.pdf
  ├── news/
  │   └── image2.jpg
  └── videos/
      └── thumbnail.jpg
```

---

## Row Level Security (RLS)

All tables have RLS enabled for security.

### Public Access
- Can view published articles, news, videos
- Can view settings
- Cannot modify anything

### Authenticated Users
- Can view all content (published and unpublished)
- Can create, update, delete articles, news, videos
- Cannot modify profiles or settings (unless admin)

### Admin Users
- Full access to all tables
- Can manage user profiles
- Can update settings
- Can manage all content

---

## Indexes Strategy

### Performance Indexes
- **Slug indexes**: Fast lookups by URL slug
- **Published indexes**: Filter published/unpublished content
- **Created_at indexes**: Sort by date (DESC for recent first)
- **GIN index on tags**: Fast array searches

### Unique Indexes
- **Username**: Prevent duplicate usernames
- **Slugs**: Prevent duplicate URLs
- **Settings singleton**: Ensure only one settings row

---

## Data Integrity

### Constraints
- Foreign keys ensure referential integrity
- CHECK constraints validate enum values (role)
- UNIQUE constraints prevent duplicates
- NOT NULL constraints ensure required fields

### Cascading Deletes
- Deleting a user from auth.users automatically deletes their profile

### Triggers
- Automatic timestamp updates
- Maintains data consistency

---

## Sample Queries

### Get all published articles with tags
```sql
SELECT id, title, slug, tags, created_at
FROM articles
WHERE published = true
  AND 'Cyber Crimes' = ANY(tags)
ORDER BY created_at DESC;
```

### Get content statistics
```sql
SELECT * FROM get_content_stats();
```

### Search across all content
```sql
SELECT 'article' as type, title, slug FROM articles WHERE title ILIKE '%cyber%'
UNION ALL
SELECT 'news' as type, title, slug FROM news WHERE title ILIKE '%cyber%'
UNION ALL
SELECT 'video' as type, title, slug FROM videos WHERE title ILIKE '%cyber%'
ORDER BY title;
```

### Get recent activity
```sql
SELECT * FROM get_recent_content(10);
```

---

## Backup Strategy

### Automated Backups
Supabase provides automatic daily backups.

### Manual Backup
```sql
-- Export all data
COPY (SELECT * FROM articles) TO '/tmp/articles_backup.csv' CSV HEADER;
COPY (SELECT * FROM news) TO '/tmp/news_backup.csv' CSV HEADER;
COPY (SELECT * FROM videos) TO '/tmp/videos_backup.csv' CSV HEADER;
```

---

## Migration History

1. `001_create_profiles_table.sql` - User profiles
2. `002_create_news_table.sql` - News content
3. `003_create_articles_table.sql` - Article content
4. `004_create_videos_table.sql` - Video content
5. `005_create_settings_table.sql` - Firm settings
6. `006_enable_rls_profiles.sql` - Profile security
7. `007_enable_rls_news.sql` - News security
8. `008_enable_rls_articles.sql` - Article security
9. `009_enable_rls_videos.sql` - Video security
10. `010_enable_rls_settings.sql` - Settings security
11. `011_add_image_to_articles.sql` - Article images

---

## Performance Considerations

### Query Optimization
- Use indexes for WHERE, ORDER BY clauses
- Limit results with LIMIT clause
- Use prepared statements to prevent SQL injection

### Caching Strategy
- Cache published content on frontend
- Invalidate cache on content updates
- Use Supabase realtime for live updates

### Scaling
- Indexes handle up to millions of rows efficiently
- RLS policies are optimized by Supabase
- Connection pooling handled by Supabase

---

## Security Best Practices

1. **Never expose service_role key** in frontend code
2. **Use RLS policies** for all data access
3. **Validate input** on both client and server
4. **Sanitize HTML content** before rendering
5. **Use HTTPS** for all connections
6. **Rotate passwords** regularly
7. **Monitor auth logs** for suspicious activity

---

## Monitoring

### Key Metrics
- Query performance (Dashboard > Database > Query Performance)
- Storage usage (Dashboard > Storage)
- Auth activity (Dashboard > Auth > Users)
- API usage (Dashboard > Settings > API)

### Alerts
Set up alerts for:
- High query latency
- Storage quota exceeded
- Failed authentication attempts
- RLS policy violations

---

**Last Updated**: March 7, 2026
**Database Version**: PostgreSQL 15.x (Supabase)
**Schema Version**: 1.0
