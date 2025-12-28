-- Create skills table for CMS management
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'frontend', 'backend', 'tools', 'design'
  proficiency INTEGER NOT NULL CHECK (proficiency >= 1 AND proficiency <= 100),
  icon TEXT, -- Icon name or URL
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on skills"
  ON skills
  FOR SELECT
  TO public
  USING (is_visible = true);

-- Create index for ordering
CREATE INDEX idx_skills_display_order ON skills(display_order);
