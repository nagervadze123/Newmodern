'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Product } from '@/lib/types'
import { addToCart } from '@/lib/cart'
import { ShoppingBag } from 'lucide-react'

interface ProductCardProps {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    // Dispatch custom event for cart count update
    window.dispatchEvent(new Event('cart-updated'))
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
    >
      <Link href={`/products/${product.slug}`} className="block group product-card">
        {/* Image */}
        <div className="relative overflow-hidden bg-[#F0EDE8]" style={{ aspectRatio: '4/5' }}>
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={`${product.name} — ${product.material || ''} furniture by Maison & Co`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-[#E8E3DC]" />
          )}

          {/* Add to cart overlay */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <button
              onClick={handleAddToCart}
              aria-label={`Add ${product.name} to cart`}
              className="w-full py-3.5 bg-foreground text-surface font-sans text-[11px] font-medium tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-accent transition-colors duration-200"
            >
              <ShoppingBag size={14} />
              Add to Cart
            </button>
          </div>

          {/* Out of stock badge */}
          {!product.in_stock && (
            <div className="absolute top-3 left-3 bg-foreground text-surface font-sans text-[10px] font-medium tracking-widest uppercase px-2.5 py-1">
              Sold Out
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4 border-t border-border">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-serif text-[18px] font-medium text-foreground leading-tight mb-0.5">
                {product.name}
              </h3>
              {product.material && (
                <p className="font-sans text-[12px] text-muted tracking-wide uppercase">
                  {product.material}
                </p>
              )}
            </div>
            <p className="font-serif text-[20px] font-medium price-accent flex-shrink-0 mt-0.5">
              ${product.price.toLocaleString('en-US', { minimumFractionDigits: 0 })}
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
