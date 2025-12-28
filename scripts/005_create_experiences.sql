-- Create experiences table for CMS management
CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  location TEXT,
  start_date DATE NOT NULL,
  end_date DATE, -- NULL means current position
  description TEXT,
  technologies TEXT[], -- Array of technologies used
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on experiences"
  ON experiences
  FOR SELECT
  TO public
  USING (is_visible = true);

-- Create index for ordering
CREATE INDEX idx_experiences_display_order ON experiences(display_order);
CREATE INDEX idx_experiences_start_date ON experiences(start_date DESC);
