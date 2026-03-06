-- Enable Row Level Security on news table
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Public can view published news
CREATE POLICY "Public can view published news"
  ON news FOR SELECT
  USING (published = true);

-- Authenticated users can view all news
CREATE POLICY "Authenticated users can view all news"
  ON news FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Authenticated users can insert news
CREATE POLICY "Authenticated users can insert news"
  ON news FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Authenticated users can update news
CREATE POLICY "Authenticated users can update news"
  ON news FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Authenticated users can delete news
CREATE POLICY "Authenticated users can delete news"
  ON news FOR DELETE
  USING (auth.uid() IS NOT NULL);
