-- Enable Row Level Security on videos table
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Public can view published videos
CREATE POLICY "Public can view published videos"
  ON videos FOR SELECT
  USING (published = true);

-- Authenticated users can view all videos
CREATE POLICY "Authenticated users can view all videos"
  ON videos FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Authenticated users can insert videos
CREATE POLICY "Authenticated users can insert videos"
  ON videos FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Authenticated users can update videos
CREATE POLICY "Authenticated users can update videos"
  ON videos FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- Authenticated users can delete videos
CREATE POLICY "Authenticated users can delete videos"
  ON videos FOR DELETE
  USING (auth.uid() IS NOT NULL);
