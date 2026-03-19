'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, ChevronLeft, Check, Package, Leaf, Shield } from 'lucide-react'
import { Product } from '@/lib/types'
import { addToCart } from '@/lib/cart'
import ProductCard from '@/components/ui/ProductCard'

interface ProductDetailClientProps {
  product: Product
  related: Product[]
}

export default function ProductDetailClient({ product, related }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  const allImages = [
    product.image_url,
    ...(product.images || []),
  ].filter(Boolean) as string[]

  // Fallback if only one image, show a slightly different crop
  if (allImages.length === 1) {
    allImages.push(product.image_url + '&crop=entropy')
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    window.dispatchEvent(new Event('cart-updated'))
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  const categoryLabels: Record<string, string> = {
    'living-room': 'Living Room',
    bedroom: 'Bedroom',
    dining: 'Dining',
  }

  return (
    <div className="min-h-screen bg-background pt-16 lg:pt-20">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6 border-b border-border">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 font-sans text-[12px] text-muted">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href={`/products?category=${product.category}`}
                className="hover:text-foreground transition-colors"
              >
                {categoryLabels[product.category]}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground">{product.name}</li>
          </ol>
        </nav>
      </div>

      {/* Product */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main image */}
            <div className="relative overflow-hidden bg-[#F0EDE8]" style={{ aspectRatio: '4/5' }}>
              {allImages[activeImage] && (
                <Image
                  src={allImages[activeImage]}
                  alt={`${product.name} — ${product.material || ''} furniture by Maison & Co`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              )}
              {!product.in_stock && (
                <div className="absolute top-4 left-4 bg-foreground text-surface font-sans text-[11px] font-medium tracking-widest uppercase px-3 py-1.5">
                  Sold Out
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-3 mt-3">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1} of ${product.name}`}
                    className={`relative flex-shrink-0 overflow-hidden transition-all duration-200 ${
                      activeImage === i
                        ? 'ring-1 ring-foreground ring-offset-1'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                    style={{ width: 72, height: 90 }}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      sizes="72px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            <p className="font-sans text-[12px] font-medium tracking-widest uppercase text-muted mb-3">
              {categoryLabels[product.category]}
            </p>

            <h1
              className="font-serif font-light text-foreground tracking-tighter leading-none mb-4"
              style={{ fontSize: 'clamp(36px, 4vw, 52px)' }}
            >
              {product.name}
            </h1>

            {product.material && (
              <p className="font-sans text-[13px] text-muted tracking-wide uppercase mb-6">
                {product.material}
              </p>
            )}

            <p className="font-serif text-[40px] font-light price-accent tracking-tighter mb-8">
              ${product.price.toLocaleString('en-US', { minimumFractionDigits: 0 })}
            </p>

            {product.description && (
              <p className="font-sans text-[15px] text-foreground/80 leading-relaxed mb-8 border-t border-border pt-8">
                {product.description}
              </p>
            )}

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="w-10 h-12 flex items-center justify-center font-sans text-[18px] text-foreground hover:bg-border/30 transition-colors"
                >
                  −
                </button>
                <span className="w-10 text-center font-sans text-[14px] font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                  className="w-10 h-12 flex items-center justify-center font-sans text-[18px] text-foreground hover:bg-border/30 transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.in_stock}
                className={`flex-1 flex items-center justify-center gap-3 py-3.5 font-sans text-[12px] font-medium tracking-widest uppercase transition-all duration-300 ${
                  added
                    ? 'bg-accent text-surface'
                    : product.in_stock
                    ? 'bg-foreground text-surface hover:bg-accent'
                    : 'bg-border text-muted cursor-not-allowed'
                }`}
                aria-label={`Add ${quantity} ${product.name} to cart`}
              >
                {added ? (
                  <>
                    <Check size={16} />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
                  </>
                )}
              </button>
            </div>

            {/* Trust icons */}
            <div className="border-t border-border pt-8 grid grid-cols-3 gap-4">
              {[
                { icon: Package, text: 'Free Delivery' },
                { icon: Leaf, text: 'Sustainably Made' },
                { icon: Shield, text: '10-Year Warranty' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center text-center gap-2">
                  <Icon size={18} strokeWidth={1.5} className="text-accent" />
                  <span className="font-sans text-[11px] text-muted">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="section-padding border-t border-border" aria-labelledby="related-heading">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <div className="mb-10">
              <p className="font-sans text-[12px] font-medium tracking-widest uppercase text-muted mb-2">
                You Might Also Like
              </p>
              <h2
                id="related-heading"
                className="font-serif font-light text-foreground tracking-tighter"
                style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}
              >
                Related Pieces
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
