-- ============================================================================
-- ADMIN QUICK REFERENCE QUERIES
-- ============================================================================
-- Common SQL queries for managing your law firm database
-- ============================================================================

-- ============================================================================
-- USER MANAGEMENT
-- ============================================================================

-- View all users
SELECT id, username, role, created_at 
FROM profiles 
ORDER BY created_at DESC;

-- Create a new admin user (after creating in Supabase Auth)
-- Replace 'USER_UUID' with the UUID from auth.users
INSERT INTO profiles (id, username, role)
VALUES ('USER_UUID', 'newadmin', 'admin');

-- Change user role to admin
UPDATE profiles 
SET role = 'admin' 
WHERE username = 'username_here';

-- Change user role to regular user
UPDATE profiles 
SET role = 'user' 
WHERE username = 'username_here';

-- Delete a user profile
DELETE FROM profiles WHERE username = 'username_here';

-- ============================================================================
-- CONTENT STATISTICS
-- ============================================================================

-- Get all content statistics
SELECT * FROM get_content_stats();

-- Count published vs unpublished articles
SELECT 
  COUNT(*) FILTER (WHERE published = true) as published,
  COUNT(*) FILTER (WHERE published = false) as draft,
  COUNT(*) as total
FROM articles;

-- Count published vs unpublished news
SELECT 
  COUNT(*) FILTER (WHERE published = true) as published,
  COUNT(*) FILTER (WHERE published = false) as draft,
  COUNT(*) as total
FROM news;

-- Count published vs unpublished videos
SELECT 
  COUNT(*) FILTER (WHERE published = true) as published,
  COUNT(*) FILTER (WHERE published = false) as draft,
  COUNT(*) as total
FROM videos;

-- ============================================================================
-- ARTICLES MANAGEMENT
-- ============================================================================

-- View all articles
SELECT id, title, slug, published, created_at 
FROM articles 
ORDER BY created_at DESC;

-- View only published articles
SELECT id, title, slug, created_at 
FROM articles 
WHERE published = true 
ORDER BY created_at DESC;

-- View only draft articles
SELECT id, title, slug, created_at 
FROM articles 
WHERE published = false 
ORDER BY created_at DESC;

-- Find article by slug
SELECT * FROM articles WHERE slug = 'article-slug-here';

-- Search articles by title
SELECT id, title, slug, published 
FROM articles 
WHERE title ILIKE '%search_term%'
ORDER BY created_at DESC;

-- Search articles by tag
SELECT id, title, slug, tags 
FROM articles 
WHERE 'Cyber Crimes' = ANY(tags)
ORDER BY created_at DESC;

-- Publish an article
UPDATE articles 
SET published = true 
WHERE slug = 'article-slug-here';

-- Unpublish an article
UPDATE articles 
SET published = false 
WHERE slug = 'article-slug-here';

-- Delete an article
DELETE FROM articles WHERE slug = 'article-slug-here';

-- Get most recent articles
SELECT id, title, slug, created_at 
FROM articles 
ORDER BY created_at DESC 
LIMIT 10;

-- ============================================================================
-- NEWS MANAGEMENT
-- ============================================================================

-- View all news
SELECT id, title, slug, published, created_at 
FROM news 
ORDER BY created_at DESC;

-- View only published news
SELECT id, title, slug, created_at 
FROM news 
WHERE published = true 
ORDER BY created_at DESC;

-- Find news by slug
SELECT * FROM news WHERE slug = 'news-slug-here';

-- Search news by title
SELECT id, title, slug, published 
FROM news 
WHERE title ILIKE '%search_term%'
ORDER BY created_at DESC;

-- Publish news
UPDATE news 
SET published = true 
WHERE slug = 'news-slug-here';

-- Unpublish news
UPDATE news 
SET published = false 
WHERE slug = 'news-slug-here';

-- Delete news
DELETE FROM news WHERE slug = 'news-slug-here';

-- ============================================================================
-- VIDEOS MANAGEMENT
-- ============================================================================

-- View all videos
SELECT id, title, slug, published, created_at 
FROM videos 
ORDER BY created_at DESC;

-- View only published videos
SELECT id, title, slug, created_at 
FROM videos 
WHERE published = true 
ORDER BY created_at DESC;

-- Find video by slug
SELECT * FROM videos WHERE slug = 'video-slug-here';

-- Search videos by title
SELECT id, title, slug, published 
FROM videos 
WHERE title ILIKE '%search_term%'
ORDER BY created_at DESC;

-- Publish video
UPDATE videos 
SET published = true 
WHERE slug = 'video-slug-here';

-- Unpublish video
UPDATE videos 
SET published = false 
WHERE slug = 'video-slug-here';

-- Delete video
DELETE FROM videos WHERE slug = 'video-slug-here';

-- ============================================================================
-- SETTINGS MANAGEMENT
-- ============================================================================

-- View current settings
SELECT * FROM settings;

-- Update firm name
UPDATE settings 
SET firm_name = 'New Firm Name';

-- Update contact information
UPDATE settings 
SET 
  address = 'New Address',
  phone = '+91 1234567890',
  email = 'newemail@example.com';

-- Update social media links
UPDATE settings 
SET social_links = '{
  "facebook": "https://facebook.com/yourpage",
  "twitter": "https://twitter.com/yourpage",
  "linkedin": "https://linkedin.com/company/yourpage",
  "instagram": "https://instagram.com/yourpage"
}'::jsonb;

-- ============================================================================
-- BULK OPERATIONS
-- ============================================================================

-- Publish all draft articles
UPDATE articles 
SET published = true 
WHERE published = false;

-- Unpublish all articles
UPDATE articles 
SET published = false 
WHERE published = true;

-- Delete all unpublished articles
DELETE FROM articles WHERE published = false;

-- Delete all unpublished news
DELETE FROM news WHERE published = false;

-- Delete all unpublished videos
DELETE FROM videos WHERE published = false;

-- ============================================================================
-- DATA CLEANUP
-- ============================================================================

-- Delete old unpublished content (older than 30 days)
DELETE FROM articles 
WHERE published = false 
  AND created_at < NOW() - INTERVAL '30 days';

DELETE FROM news 
WHERE published = false 
  AND created_at < NOW() - INTERVAL '30 days';

DELETE FROM videos 
WHERE published = false 
  AND created_at < NOW() - INTERVAL '30 days';

-- ============================================================================
-- SEARCH AND FILTER
-- ============================================================================

-- Find all content created in the last 7 days
SELECT 'article' as type, title, created_at FROM articles WHERE created_at > NOW() - INTERVAL '7 days'
UNION ALL
SELECT 'news' as type, title, created_at FROM news WHERE created_at > NOW() - INTERVAL '7 days'
UNION ALL
SELECT 'video' as type, title, created_at FROM videos WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;

-- Find all content updated in the last 7 days
SELECT 'article' as type, title, updated_at FROM articles WHERE updated_at > NOW() - INTERVAL '7 days'
UNION ALL
SELECT 'news' as type, title, updated_at FROM news WHERE updated_at > NOW() - INTERVAL '7 days'
UNION ALL
SELECT 'video' as type, title, updated_at FROM videos WHERE updated_at > NOW() - INTERVAL '7 days'
ORDER BY updated_at DESC;

-- ============================================================================
-- BACKUP QUERIES
-- ============================================================================

-- Export all articles (copy result to save as backup)
SELECT * FROM articles ORDER BY created_at;

-- Export all news (copy result to save as backup)
SELECT * FROM news ORDER BY created_at;

-- Export all videos (copy result to save as backup)
SELECT * FROM videos ORDER BY created_at;

-- Export all profiles (copy result to save as backup)
SELECT * FROM profiles ORDER BY created_at;

-- ============================================================================
-- ANALYTICS QUERIES
-- ============================================================================

-- Most used tags in articles
SELECT tag, COUNT(*) as count
FROM articles, unnest(tags) as tag
GROUP BY tag
ORDER BY count DESC;

-- Content creation by month
SELECT 
  DATE_TRUNC('month', created_at) as month,
  COUNT(*) as count
FROM articles
GROUP BY month
ORDER BY month DESC;

-- Published vs unpublished ratio
SELECT 
  'articles' as content_type,
  COUNT(*) FILTER (WHERE published = true) as published,
  COUNT(*) FILTER (WHERE published = false) as unpublished,
  ROUND(100.0 * COUNT(*) FILTER (WHERE published = true) / COUNT(*), 2) as publish_rate
FROM articles
UNION ALL
SELECT 
  'news' as content_type,
  COUNT(*) FILTER (WHERE published = true),
  COUNT(*) FILTER (WHERE published = false),
  ROUND(100.0 * COUNT(*) FILTER (WHERE published = true) / COUNT(*), 2)
FROM news
UNION ALL
SELECT 
  'videos' as content_type,
  COUNT(*) FILTER (WHERE published = true),
  COUNT(*) FILTER (WHERE published = false),
  ROUND(100.0 * COUNT(*) FILTER (WHERE published = true) / COUNT(*), 2)
FROM videos;

-- ============================================================================
-- MAINTENANCE QUERIES
-- ============================================================================

-- Check for duplicate slugs (should return empty)
SELECT slug, COUNT(*) 
FROM articles 
GROUP BY slug 
HAVING COUNT(*) > 1;

SELECT slug, COUNT(*) 
FROM news 
GROUP BY slug 
HAVING COUNT(*) > 1;

SELECT slug, COUNT(*) 
FROM videos 
GROUP BY slug 
HAVING COUNT(*) > 1;

-- Find articles without images
SELECT id, title, slug 
FROM articles 
WHERE image IS NULL OR image = '';

-- Find videos without thumbnails
SELECT id, title, slug 
FROM videos 
WHERE thumbnail IS NULL OR thumbnail = '';

-- Check database size
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- ============================================================================
-- RESET DATABASE (USE WITH CAUTION!)
-- ============================================================================

-- Delete all content (keeps structure)
-- TRUNCATE articles, news, videos CASCADE;

-- Delete all users except admin
-- DELETE FROM profiles WHERE role != 'admin';

-- Reset to initial state (delete all data)
-- TRUNCATE articles, news, videos, profiles CASCADE;
-- Then re-run the seed data from complete_setup.sql

-- ============================================================================
-- END OF ADMIN QUERIES
-- ============================================================================
