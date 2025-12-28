-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for timestamp sorting
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert contact submissions
CREATE POLICY "contact_submissions_insert_all"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

-- Policy: Block public read (only admin should view submissions)
-- For demo purposes, we allow reading for now
CREATE POLICY "contact_submissions_select_all"
  ON public.contact_submissions FOR SELECT
  USING (true);
