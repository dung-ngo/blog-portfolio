-- Remove the CHECK constraint from blog_posts category column
ALTER TABLE public.blog_posts DROP CONSTRAINT IF EXISTS blog_posts_category_check;

-- Add category_color column if it doesn't exist
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS category_color TEXT DEFAULT '#fbbf24';

-- Update existing posts to use 'unassigned' if category doesn't match
UPDATE public.blog_posts 
SET category = 'unassigned' 
WHERE category NOT IN ('animal-welfare', 'ai-related', 'career-guidance', 'unassigned');
