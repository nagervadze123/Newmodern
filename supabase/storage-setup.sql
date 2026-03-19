-- ============================================================
-- Maison & Co — Supabase Storage Setup
-- Paste into Supabase SQL Editor and run
-- ============================================================

-- Create buckets (run these in Supabase Dashboard → Storage → New Bucket,
-- OR use the SQL below via the storage API)

-- NOTE: Bucket creation via SQL requires pg_net or the dashboard.
-- Use the Supabase Dashboard to create buckets manually:
--   1. Go to Storage → New Bucket → Name: "product-images" → Public: ON
--   2. Go to Storage → New Bucket → Name: "hero-images"    → Public: ON
-- Then run the RLS policies below.

-- ============================================================
-- RLS Policies for product-images bucket
-- ============================================================

-- Public read access
create policy "Public read product-images"
  on storage.objects for select
  to public
  using (bucket_id = 'product-images');

-- Allow anon uploads (protected by admin panel auth)
create policy "Anon upload product-images"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'product-images');

-- Allow updates
create policy "Anon update product-images"
  on storage.objects for update
  to anon
  using (bucket_id = 'product-images');

-- Allow deletes
create policy "Anon delete product-images"
  on storage.objects for delete
  to anon
  using (bucket_id = 'product-images');

-- ============================================================
-- RLS Policies for hero-images bucket
-- ============================================================

create policy "Public read hero-images"
  on storage.objects for select
  to public
  using (bucket_id = 'hero-images');

create policy "Anon upload hero-images"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'hero-images');

create policy "Anon update hero-images"
  on storage.objects for update
  to anon
  using (bucket_id = 'hero-images');

create policy "Anon delete hero-images"
  on storage.objects for delete
  to anon
  using (bucket_id = 'hero-images');
