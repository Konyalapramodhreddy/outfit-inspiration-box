CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  plan TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
-- Allow anyone (anon/authenticated) to insert a booking, no public reads.
CREATE POLICY "anyone_can_insert_booking" ON public.bookings
  FOR INSERT TO anon, authenticated WITH CHECK (true);