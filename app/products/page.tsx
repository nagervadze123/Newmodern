import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import { Product, Category, SortOption } from '@/lib/types'
import ProductsClient from './ProductsClient'

interface ProductsPageProps {
  searchParams: { category?: string; sort?: string; minPrice?: string; maxPrice?: string }
}

export async function generateMetadata({ searchParams }: ProductsPageProps): Promise<Metadata> {
  const category = searchParams.category as Category | undefined
  const categoryLabels: Record<string, string> = {
    'living-room': 'Living Room Furniture',
    bedroom: 'Bedroom Furniture',
    dining: 'Dining Furniture',
  }
  const categoryLabel = category ? categoryLabels[category] : 'All Furniture'
  const title = `${categoryLabel} | Shop Maison & Co`
  const description = `Shop our curated collection of ${categoryLabel.toLowerCase()} — handcrafted from premium, sustainable materials. Free delivery included.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://maison-co.vercel.app/products${category ? `?category=${category}` : ''}`,
    },
    openGraph: {
      title,
      description,
      url: `https://maison-co.vercel.app/products`,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200',
          width: 1200,
          height: 630,
          alt: `Maison & Co ${categoryLabel}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

async function getProducts(category?: string): Promise<Product[]> {
  try {
    let query = supabase.from('products').select('*')

    if (category && category !== 'all') {
      query = query.eq('category', category)
    }

    const { data, error } = await query.order('created_at', { ascending: false })
    if (error) throw error
    return data || []
  } catch {
    return []
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const category = searchParams.category as Category | undefined
  const products = await getProducts(category)

  return <ProductsClient initialProducts={products} initialCategory={category || 'all'} />
}
