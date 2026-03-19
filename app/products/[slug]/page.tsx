import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Product } from '@/lib/types'
import ProductDetailClient from './ProductDetailClient'

interface ProductPageProps {
  params: { slug: string }
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) return null
    return data
  } catch {
    return null
  }
}

async function getRelatedProducts(category: string, currentId: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .neq('id', currentId)
      .limit(4)

    if (error) return []
    return data || []
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.slug)
  if (!product) return { title: 'Product Not Found' }

  const price = product.price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  })

  return {
    title: `${product.name} — ${price}`,
    description:
      product.description ||
      `Shop the ${product.name} by Maison & Co. ${product.material ? `Made from ${product.material}.` : ''} Free delivery included.`,
    alternates: {
      canonical: `https://maison-co.vercel.app/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Maison & Co`,
      description:
        product.description ||
        `${product.name} — handcrafted luxury furniture by Maison & Co.`,
      url: `https://maison-co.vercel.app/products/${product.slug}`,
      images: product.image_url
        ? [
            {
              url: product.image_url,
              width: 800,
              height: 1000,
              alt: `${product.name} by Maison & Co`,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Maison & Co`,
      description: product.description || `${product.name} — luxury furniture by Maison & Co.`,
      images: product.image_url ? [product.image_url] : [],
    },
  }
}

export async function generateStaticParams() {
  try {
    const { data } = await supabase.from('products').select('slug')
    return (data || []).map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug)
  if (!product) notFound()

  const related = await getRelatedProducts(product.category, product.id)

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image_url,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'Maison & Co',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price,
      availability: product.in_stock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `https://maison-co.vercel.app/products/${product.slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} related={related} />
    </>
  )
}
