-- Enable Row Level Security on settings table
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Public can view settings
CREATE POLICY "Public can view settings"
  ON settings FOR SELECT
  USING (true);

-- Only admin users can update settings
CREATE POLICY "Admin users can update settings"
  ON settings FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Only admin users can insert settings
CREATE POLICY "Admin users can insert settings"
  ON settings FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
