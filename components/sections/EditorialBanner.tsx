'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function EditorialBanner() {
  return (
    <section className="relative overflow-hidden" aria-label="Editorial banner" style={{ minHeight: '60vh' }}>
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=1600&q=80"
          alt="Maison & Co dining collection — luxury handcrafted furniture"
          fill
          sizes="100vw"
          className="object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-foreground/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[60vh] flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full py-20">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-sans text-[12px] font-medium tracking-widest uppercase text-accent mb-6"
            >
              The Maison Standard
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif font-light text-surface leading-none tracking-tighter mb-8"
              style={{ fontSize: 'clamp(44px, 6vw, 80px)' }}
            >
              Built for<br />
              <em className="italic">generations,</em><br />
              not seasons.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="font-sans text-[16px] text-surface/60 leading-relaxed max-w-lg mb-10"
            >
              Every joint, every finish, every material — selected for longevity.
              Because we believe furniture should outlast trends by decades.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.38 }}
            >
              <Link href="/products" className="btn btn-ghost-light text-[12px] px-8 py-4">
                Discover the Collection
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
