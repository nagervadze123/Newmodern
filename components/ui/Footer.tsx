'use client'

import Link from 'next/link'
import { Instagram, Twitter, BookMarked } from 'lucide-react'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="bg-foreground text-surface">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-16 lg:pt-20 pb-8">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-surface/10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-serif text-[26px] font-medium tracking-tighter text-surface block mb-4">
              Maison & Co
            </Link>
            <p className="font-sans text-[14px] text-surface/60 leading-relaxed max-w-xs">
              Heirloom-quality furniture crafted for the discerning home. Sustainably made to last a lifetime.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                aria-label="Follow Maison & Co on Instagram"
                className="text-surface/50 hover:text-accent transition-colors duration-200"
              >
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a
                href="#"
                aria-label="Follow Maison & Co on Twitter"
                className="text-surface/50 hover:text-accent transition-colors duration-200"
              >
                <Twitter size={18} strokeWidth={1.5} />
              </a>
              <a
                href="#"
                aria-label="Follow Maison & Co on Pinterest"
                className="text-surface/50 hover:text-accent transition-colors duration-200"
              >
                <BookMarked size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-sans text-[11px] font-medium tracking-widest uppercase text-surface/40 mb-5">
              Shop
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/products', label: 'All Products' },
                { href: '/products?category=living-room', label: 'Living Room' },
                { href: '/products?category=bedroom', label: 'Bedroom' },
                { href: '/products?category=dining', label: 'Dining' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-[14px] text-surface/60 hover:text-surface transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-sans text-[11px] font-medium tracking-widest uppercase text-surface/40 mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {[
                { href: '#', label: 'About Us' },
                { href: '#', label: 'Sustainability' },
                { href: '#', label: 'Craftsmanship' },
                { href: '#', label: 'Trade Program' },
                { href: '#', label: 'Contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-[14px] text-surface/60 hover:text-surface transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-sans text-[11px] font-medium tracking-widest uppercase text-surface/40 mb-5">
              Stay in Touch
            </h3>
            <p className="font-sans text-[14px] text-surface/60 mb-4 leading-relaxed">
              New collections, design stories, and exclusive offers — delivered to your inbox.
            </p>
            {subscribed ? (
              <p className="font-sans text-[14px] text-accent">Thank you for subscribing.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full bg-surface/10 border border-surface/20 text-surface placeholder:text-surface/30 font-sans text-[14px] px-4 py-3 focus:outline-none focus:border-accent transition-colors duration-200"
                />
                <button
                  type="submit"
                  className="btn btn-ghost-light w-full py-3 text-[11px]"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[12px] text-surface/30">
            © {new Date().getFullYear()} Maison & Co. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Shipping Policy'].map((item) => (
              <Link
                key={item}
                href="#"
                className="font-sans text-[12px] text-surface/30 hover:text-surface/60 transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
