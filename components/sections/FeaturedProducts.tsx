'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ProductCard from '@/components/ui/ProductCard'
import { Product } from '@/lib/types'

interface FeaturedProductsProps {
  products: Product[]
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="section-padding bg-[#F2EEE8]" aria-labelledby="featured-heading">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-sans text-[12px] font-medium tracking-widest uppercase text-muted mb-3"
            >
              Featured Pieces
            </motion.p>
            <motion.h2
              id="featured-heading"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif font-light text-foreground tracking-tighter leading-none"
              style={{ fontSize: 'clamp(36px, 4vw, 52px)' }}
            >
              Signature works.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block"
          >
            <Link
              href="/products"
              className="font-sans text-[12px] font-medium tracking-widest uppercase text-foreground flex items-center gap-2 hover:text-accent transition-colors duration-200"
            >
              View All Pieces
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-serif text-[24px] text-muted font-light">
              Products coming soon.
            </p>
          </div>
        )}

        {/* Mobile CTA */}
        <div className="mt-10 flex justify-center lg:hidden">
          <Link
            href="/products"
            className="btn btn-primary text-[12px] px-8 py-4"
          >
            View All Pieces
          </Link>
        </div>
      </div>
    </section>
  )
}
