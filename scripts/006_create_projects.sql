-- Create projects table for CMS management
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  image_url TEXT,
  demo_url TEXT,
  github_url TEXT,
  technologies TEXT[], -- Array of technologies used
  category TEXT NOT NULL, -- 'web', 'mobile', 'design', 'other'
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on projects"
  ON projects
  FOR SELECT
  TO public
  USING (is_visible = true);

-- Create indexes
CREATE INDEX idx_projects_display_order ON projects(display_order);
CREATE INDEX idx_projects_featured ON projects(featured) WHERE featured = true;
CREATE INDEX idx_projects_category ON projects(category);
