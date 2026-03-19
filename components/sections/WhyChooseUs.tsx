'use client'

import { motion } from 'framer-motion'
import { Hammer, Leaf, Truck, Shield } from 'lucide-react'

const pillars = [
  {
    icon: Hammer,
    title: 'Master Craftsmanship',
    description:
      'Every piece is made by hand in our European workshops. Techniques passed down through generations of artisans ensure a finish that no machine can replicate.',
  },
  {
    icon: Leaf,
    title: 'Sustainability First',
    description:
      'We source timber only from FSC-certified forests and use water-based, VOC-free finishes. Our commitment to the planet is as serious as our commitment to beauty.',
  },
  {
    icon: Truck,
    title: 'Free White-Glove Delivery',
    description:
      'Complimentary delivery and in-home placement is included with every order. Our team will install and inspect each piece before leaving your home.',
  },
  {
    icon: Shield,
    title: '10-Year Warranty',
    description:
      'We stand behind every joint, every finish. If anything fails due to craftsmanship — we repair or replace it, free of charge, for a full decade.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-background" aria-labelledby="why-heading">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div className="max-w-xl mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-sans text-[12px] font-medium tracking-widest uppercase text-muted mb-3"
          >
            Our Promise
          </motion.p>
          <motion.h2
            id="why-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif font-light text-foreground tracking-tighter leading-none"
            style={{ fontSize: 'clamp(36px, 4vw, 52px)' }}
          >
            Why Maison & Co?
          </motion.h2>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col"
              >
                <div className="w-10 h-10 flex items-center justify-center border border-accent/40 text-accent mb-6">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-[22px] font-medium text-foreground mb-3 leading-tight">
                  {pillar.title}
                </h3>
                <p className="font-sans text-[14px] text-muted leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Divider with stat */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 pt-12 border-t border-border grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            { stat: '20+', label: 'Years of craftsmanship' },
            { stat: '4,000+', label: 'Pieces delivered' },
            { stat: '38', label: 'Countries served' },
            { stat: '98%', label: 'Customer satisfaction' },
          ].map((item, i) => (
            <div key={i}>
              <p className="font-serif text-[48px] lg:text-[56px] font-light text-foreground tracking-tighter leading-none price-accent">
                {item.stat}
              </p>
              <p className="font-sans text-[13px] text-muted mt-2">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
