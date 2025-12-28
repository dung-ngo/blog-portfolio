-- Add color column to blog_posts table for category colors
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS category_color TEXT DEFAULT '#fbbf24';

-- Update existing posts with default colors based on category
UPDATE public.blog_posts 
SET category_color = CASE 
  WHEN category = 'animal-welfare' THEN '#10b981'
  WHEN category = 'ai-related' THEN '#3b82f6'
  WHEN category = 'career-guidance' THEN '#f59e0b'
  ELSE '#fbbf24'
END
WHERE category_color = '#fbbf24';
