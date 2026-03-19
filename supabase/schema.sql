-- ============================================================
-- Maison & Co — Supabase Schema
-- Paste this into your Supabase SQL Editor and run it
-- ============================================================

-- Products table
create table products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  description text,
  price numeric(10,2) not null,
  category text not null, -- 'living-room' | 'bedroom' | 'dining'
  material text,
  image_url text,
  images text[], -- array of additional image URLs
  in_stock boolean default true,
  featured boolean default false,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table products enable row level security;

-- Allow public read access
create policy "Products are publicly readable"
  on products for select
  using (true);

-- Seed data: 12 sample products
insert into products (name, slug, description, price, category, material, image_url, featured) values
('Oslo Sofa', 'oslo-sofa', 'Clean Scandinavian lines with deep cushioning. Perfect for modern living rooms.', 1890.00, 'living-room', 'Linen / Oak', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', true),
('Kyoto Armchair', 'kyoto-armchair', 'A statement piece with Japanese-inspired minimalism and premium bouclé fabric.', 890.00, 'living-room', 'Bouclé / Walnut', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800', true),
('Arco Floor Lamp', 'arco-floor-lamp', 'Iconic arc silhouette in matte black steel. Dimmable LED included.', 340.00, 'living-room', 'Steel / Marble base', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', false),
('Bergen Bed Frame', 'bergen-bed-frame', 'Solid oak bed frame with upholstered headboard. Available in King and Queen.', 2200.00, 'bedroom', 'Oak / Linen', 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800', true),
('Notte Nightstand', 'notte-nightstand', 'Two-drawer nightstand in smoked oak with brass hardware.', 420.00, 'bedroom', 'Smoked Oak / Brass', 'https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=800', false),
('Forma Dresser', 'forma-dresser', '6-drawer dresser with soft-close mechanism and geometric brass handles.', 1100.00, 'bedroom', 'Oak / Brass', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', false),
('Tosa Dining Table', 'tosa-dining-table', 'Live-edge walnut dining table. Seats 6–8. Each piece is unique.', 3200.00, 'dining', 'Live-edge Walnut', 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=800', true),
('Renne Dining Chair', 'renne-dining-chair', 'Wishbone-inspired design in ash wood with woven paper cord seat.', 310.00, 'dining', 'Ash / Paper Cord', 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800', true),
('Noma Bench', 'noma-bench', 'Multifunctional bench for dining or entryway. Solid oak, seats 3.', 580.00, 'dining', 'Solid Oak', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', false),
('Alto Shelf Unit', 'alto-shelf-unit', 'Open modular shelving in black steel and oak. 5 tiers.', 760.00, 'living-room', 'Steel / Oak', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', false),
('Petal Coffee Table', 'petal-coffee-table', 'Sculptural coffee table with organic curved form in travertine and brass.', 1450.00, 'living-room', 'Travertine / Brass', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', true),
('Cove Wardrobe', 'cove-wardrobe', 'Sliding door wardrobe with interior organiser. Matte white with oak legs.', 2800.00, 'bedroom', 'MDF / Oak', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', false);
