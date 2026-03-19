import type { Metadata } from 'next'
import './globals.css'
import NavBar from '@/components/ui/NavBar'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Maison & Co | Luxury Handcrafted Furniture',
    template: '%s | Maison & Co',
  },
  description:
    'Maison & Co crafts heirloom-quality furniture for discerning homes. Discover our collections of handcrafted sofas, beds, dining tables and more — sustainably made to last a lifetime.',
  keywords: ['luxury furniture', 'handcrafted furniture', 'sustainable furniture', 'designer furniture', 'Maison Co'],
  authors: [{ name: 'Maison & Co' }],
  creator: 'Maison & Co',
  metadataBase: new URL('https://maison-co.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://maison-co.vercel.app',
    siteName: 'Maison & Co',
    title: 'Maison & Co | Luxury Handcrafted Furniture',
    description:
      'Maison & Co crafts heirloom-quality furniture for discerning homes. Sustainably made to last a lifetime.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200',
        width: 1200,
        height: 630,
        alt: 'Maison & Co luxury furniture',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maison & Co | Luxury Handcrafted Furniture',
    description:
      'Maison & Co crafts heirloom-quality furniture for discerning homes. Sustainably made to last a lifetime.',
    images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
