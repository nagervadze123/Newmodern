import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import { Product } from '@/lib/types'
import { getSettings } from '@/lib/settings'
import Hero from '@/components/sections/Hero'
import MarqueeStrip from '@/components/ui/MarqueeStrip'
import CategoryCards from '@/components/sections/CategoryCards'
import FeaturedProducts from '@/components/sections/FeaturedProducts'
import EditorialBanner from '@/components/sections/EditorialBanner'
import WhyChooseUs from '@/components/sections/WhyChooseUs'

export const metadata: Metadata = {
  title: 'Maison & Co | Luxury Handcrafted Furniture',
  description:
    'Discover Maison & Co — luxury handcrafted furniture for the discerning home. Sustainably made from premium materials, designed to endure for generations.',
  alternates: {
    canonical: 'https://maison-co.vercel.app',
  },
  openGraph: {
    title: 'Maison & Co | Luxury Handcrafted Furniture',
    description:
      'Discover Maison & Co — luxury handcrafted furniture for the discerning home. Sustainably made to last a lifetime.',
    url: 'https://maison-co.vercel.app',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200',
        width: 1200,
        height: 630,
        alt: 'Maison & Co luxury furniture',
      },
    ],
  },
}

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(8)
    if (error) throw error
    return data || []
  } catch {
    return []
  }
}

export default async function HomePage() {
  const [products, settings] = await Promise.all([
    getFeaturedProducts(),
    getSettings(),
  ])

  return (
    <>
      <Hero settings={settings} />
      <MarqueeStrip items={settings.marquee_items} />
      <CategoryCards />
      <FeaturedProducts products={products} />
      <EditorialBanner settings={settings} />
      <WhyChooseUs />
    </>
  )
}
