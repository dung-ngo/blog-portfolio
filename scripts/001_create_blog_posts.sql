-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('animal-welfare', 'ai-related', 'career-guidance')),
  cover_image TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for category filtering
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published blog posts
CREATE POLICY "blog_posts_select_published"
  ON public.blog_posts FOR SELECT
  USING (published = true);

-- Policy: Allow public insert for demo purposes (you may want to restrict this later)
CREATE POLICY "blog_posts_insert_all"
  ON public.blog_posts FOR INSERT
  WITH CHECK (true);

-- Policy: Allow public update for demo purposes (you may want to restrict this later)
CREATE POLICY "blog_posts_update_all"
  ON public.blog_posts FOR UPDATE
  USING (true);
