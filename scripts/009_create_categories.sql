-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL DEFAULT '#fbbf24',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default categories including Unassigned
INSERT INTO public.categories (name, slug, color) VALUES
  ('Unassigned', 'unassigned', '#6b7280'),
  ('Animal Welfare', 'animal-welfare', '#10b981'),
  ('AI Related', 'ai-related', '#3b82f6'),
  ('Career Guidance', 'career-guidance', '#f59e0b')
ON CONFLICT (slug) DO NOTHING;

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read categories
CREATE POLICY "categories_select_all"
  ON public.categories FOR SELECT
  USING (true);

-- Policy: Allow public insert for demo purposes
CREATE POLICY "categories_insert_all"
  ON public.categories FOR INSERT
  WITH CHECK (true);

-- Policy: Allow public update for demo purposes
CREATE POLICY "categories_update_all"
  ON public.categories FOR UPDATE
  USING (true);

-- Policy: Allow public delete for demo purposes
CREATE POLICY "categories_delete_all"
  ON public.categories FOR DELETE
  USING (true);
