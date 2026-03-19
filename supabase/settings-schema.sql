-- ============================================================
-- Maison & Co — Settings Table
-- Paste into Supabase SQL Editor and run
-- ============================================================

create table if not exists settings (
  key text primary key,
  value text,
  updated_at timestamp with time zone default now()
);

-- Trigger to auto-update updated_at
create or replace function update_settings_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger settings_updated_at
  before update on settings
  for each row execute function update_settings_timestamp();

-- RLS
alter table settings enable row level security;

create policy "Settings are publicly readable"
  on settings for select using (true);

create policy "Settings are writable"
  on settings for all using (true) with check (true);

-- Seed default values
insert into settings (key, value) values
  ('hero_headline', 'Objects made to endure.'),
  ('hero_subtitle', 'Heirloom-quality furniture for homes with intention. Each piece is handcrafted by master artisans using sustainably sourced materials.'),
  ('hero_cta1_text', 'Shop Collection'),
  ('hero_cta2_text', 'Explore Lookbook'),
  ('hero_background_image', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1800&q=80'),
  ('marquee_items', '["Free Delivery","Handcrafted","Sustainable Materials","Made to Last","Designed in Europe","10-Year Warranty"]'),
  ('editorial_headline', 'Built for generations, not seasons.'),
  ('editorial_cta_text', 'Discover the Collection'),
  ('editorial_background_image', 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=1600&q=80'),
  ('site_name', 'Maison & Co'),
  ('footer_copyright', '© 2026 Maison & Co. All rights reserved.'),
  ('contact_email', 'hello@maison-co.com')
on conflict (key) do nothing;
