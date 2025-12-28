-- Seed skills data
INSERT INTO skills (name, category, proficiency, icon, display_order, is_visible) VALUES
  ('React', 'frontend', 95, 'react', 1, true),
  ('Next.js', 'frontend', 90, 'nextjs', 2, true),
  ('TypeScript', 'frontend', 90, 'typescript', 3, true),
  ('Tailwind CSS', 'frontend', 85, 'tailwind', 4, true),
  ('Node.js', 'backend', 80, 'nodejs', 5, true),
  ('PostgreSQL', 'backend', 75, 'postgresql', 6, true),
  ('Supabase', 'backend', 85, 'supabase', 7, true),
  ('Git', 'tools', 90, 'git', 8, true),
  ('Figma', 'design', 70, 'figma', 9, true),
  ('UI/UX Design', 'design', 75, 'design', 10, true);

-- Seed experiences data
INSERT INTO experiences (company, position, location, start_date, end_date, description, technologies, display_order, is_visible) VALUES
  (
    'Tech Startup Inc.',
    'Senior Frontend Developer',
    'Remote',
    '2022-01-01',
    NULL,
    'Leading frontend development for a SaaS platform serving 10,000+ users. Implemented modern React patterns and improved performance by 40%.',
    ARRAY['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    1,
    true
  ),
  (
    'Digital Agency Co.',
    'Frontend Developer',
    'New York, NY',
    '2020-06-01',
    '2021-12-31',
    'Developed responsive websites and web applications for diverse clients. Collaborated with designers and backend teams.',
    ARRAY['React', 'JavaScript', 'SCSS', 'Node.js'],
    2,
    true
  ),
  (
    'Freelance',
    'Web Developer',
    'Remote',
    '2019-01-01',
    '2020-05-31',
    'Built custom websites and web applications for small businesses and startups.',
    ARRAY['HTML', 'CSS', 'JavaScript', 'WordPress'],
    3,
    true
  );

-- Seed projects data
INSERT INTO projects (title, description, long_description, image_url, demo_url, github_url, technologies, category, featured, display_order, is_visible) VALUES
  (
    'E-Commerce Platform',
    'A full-stack e-commerce platform with real-time inventory management',
    'Built a comprehensive e-commerce solution featuring product management, shopping cart, checkout process, and admin dashboard. Integrated Stripe for payments and implemented real-time inventory updates.',
    '/placeholder.svg?height=400&width=600',
    'https://demo.example.com',
    'https://github.com/example/ecommerce',
    ARRAY['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'Tailwind CSS'],
    'web',
    true,
    1,
    true
  ),
  (
    'Task Management App',
    'A collaborative task management application with team features',
    'Developed a task management system with drag-and-drop functionality, real-time collaboration, and team workspace management. Implemented authentication and role-based access control.',
    '/placeholder.svg?height=400&width=600',
    'https://demo.example.com/tasks',
    'https://github.com/example/tasks',
    ARRAY['React', 'Node.js', 'PostgreSQL', 'WebSocket'],
    'web',
    true,
    2,
    true
  ),
  (
    'Portfolio Website Builder',
    'A no-code portfolio website builder for creatives',
    'Created a user-friendly platform allowing designers and developers to build custom portfolio websites without coding. Features drag-and-drop editor, template library, and custom domain support.',
    '/placeholder.svg?height=400&width=600',
    'https://demo.example.com/builder',
    null,
    ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    'web',
    true,
    3,
    true
  ),
  (
    'Weather Dashboard',
    'Real-time weather tracking with beautiful visualizations',
    'Built a weather dashboard that displays current conditions, forecasts, and historical data with interactive charts and maps.',
    '/placeholder.svg?height=400&width=600',
    'https://demo.example.com/weather',
    'https://github.com/example/weather',
    ARRAY['React', 'Chart.js', 'Weather API'],
    'web',
    false,
    4,
    true
  );
