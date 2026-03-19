import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://maison-co.vercel.app'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products?category=living-room`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products?category=bedroom`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products?category=dining`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Dynamic product pages
  let productPages: MetadataRoute.Sitemap = []
  try {
    const { data } = await supabase
      .from('products')
      .select('slug, created_at')
      .order('created_at', { ascending: false })

    if (data) {
      productPages = data.map((p) => ({
        url: `${baseUrl}/products/${p.slug}`,
        lastModified: new Date(p.created_at),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    }
  } catch {
    // Return static pages only if Supabase is unavailable
  }

  return [...staticPages, ...productPages]
}
