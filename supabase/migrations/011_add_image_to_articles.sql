-- Add image column to articles table
ALTER TABLE articles ADD COLUMN IF NOT EXISTS image TEXT;

-- Add comment
COMMENT ON COLUMN articles.image IS 'URL of the featured image for the article';
