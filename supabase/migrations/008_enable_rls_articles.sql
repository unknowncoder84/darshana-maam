-- Enable Row Level Security on articles table
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Public can view published articles
CREATE POLICY "Public can view published articles"
  ON articles FOR SELECT
  USING (published = true);

-- Authenticated users can view all articles
CREATE POLICY "Authenticated users can view all articles"
  ON articles FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Authenticated users can insert articles
CREATE POLICY "Authenticated users can insert articles"
  ON articles FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Authenticated users can update articles
CREATE POLICY "Authenticated users can update articles"
  ON articles FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Authenticated users can delete articles
CREATE POLICY "Authenticated users can delete articles"
  ON articles FOR DELETE
  USING (auth.uid() IS NOT NULL);
