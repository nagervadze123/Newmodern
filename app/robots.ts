import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/cart', '/api/'],
      },
    ],
    sitemap: 'https://maison-co.vercel.app/sitemap.xml',
    host: 'https://maison-co.vercel.app',
  }
}
