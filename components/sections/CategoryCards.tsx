'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const categories = [
  {
    slug: 'living-room',
    label: 'Living Room',
    tagline: 'Where life unfolds',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80',
    alt: 'Luxury living room furniture — sofas, armchairs and coffee tables by Maison & Co',
  },
  {
    slug: 'bedroom',
    label: 'Bedroom',
    tagline: 'Rest, restored',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=900&q=80',
    alt: 'Luxury bedroom furniture — beds, nightstands and dressers by Maison & Co',
  },
  {
    slug: 'dining',
    label: 'Dining',
    tagline: 'Gather beautifully',
    image: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=900&q=80',
    alt: 'Luxury dining furniture — tables, chairs and benches by Maison & Co',
  },
]

export default function CategoryCards() {
  return (
    <section className="section-padding bg-background" aria-labelledby="collections-heading">
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
              Our Collections
            </motion.p>
            <motion.h2
              id="collections-heading"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif font-light text-foreground tracking-tighter leading-none"
              style={{ fontSize: 'clamp(36px, 4vw, 52px)' }}
            >
              Curated spaces,<br />
              <em>crafted with care.</em>
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
              View All
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <Link
                href={`/products?category=${cat.slug}`}
                className="block relative overflow-hidden group"
                style={{ aspectRatio: i === 1 ? '3/4' : '3/4' }}
              >
                <Image
                  src={cat.image}
                  alt={cat.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <p className="font-sans text-[11px] font-medium tracking-widest uppercase text-surface/60 mb-1">
                    {cat.tagline}
                  </p>
                  <h3 className="font-serif text-[32px] lg:text-[38px] font-light text-surface leading-none tracking-tight">
                    {cat.label}
                  </h3>
                  <div className="flex items-center gap-2 mt-3 text-accent opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span className="font-sans text-[12px] font-medium tracking-widest uppercase">
                      Explore
                    </span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
