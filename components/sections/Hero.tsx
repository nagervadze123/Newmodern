'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end" aria-label="Hero">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1800&q=80"
          alt="Luxury furniture living room — Maison & Co flagship collection"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-10 pb-20 lg:pb-28">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-[12px] font-medium tracking-widest uppercase text-accent mb-6"
          >
            New Collection 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="font-serif font-light text-surface leading-none tracking-tighter mb-8"
            style={{ fontSize: 'clamp(60px, 9vw, 116px)' }}
          >
            Objects made to<br />
            <em className="italic">endure.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-sans text-[16px] text-surface/70 leading-relaxed max-w-xl mb-10"
          >
            Heirloom-quality furniture for homes with intention.
            Each piece is handcrafted by master artisans using sustainably sourced materials.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link href="/products" className="btn btn-primary text-[12px] px-8 py-4">
              Shop Collection
            </Link>
            <Link href="/products?featured=true" className="btn btn-ghost-light text-[12px] px-8 py-4">
              Explore Lookbook
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 right-10 hidden lg:flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <div className="w-px h-12 bg-surface/30 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 right-0 bg-accent"
              animate={{ y: ['0%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ height: '40%' }}
            />
          </div>
          <span className="font-sans text-[10px] tracking-widest uppercase text-surface/40 [writing-mode:vertical-lr]">
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  )
}
