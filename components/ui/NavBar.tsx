'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getCart, getCartCount } from '@/lib/cart'

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const updateCount = () => setCartCount(getCartCount(getCart()))
    updateCount()
    window.addEventListener('cart-updated', updateCount)
    return () => window.removeEventListener('cart-updated', updateCount)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isTransparent = isHome && !scrolled && !menuOpen

  const navLinks = [
    { href: '/products', label: 'Shop' },
    { href: '/products?category=living-room', label: 'Living Room' },
    { href: '/products?category=bedroom', label: 'Bedroom' },
    { href: '/products?category=dining', label: 'Dining' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent
            ? 'bg-transparent'
            : 'bg-surface/90 nav-blur border-b border-border'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className={`font-serif text-[22px] lg:text-[26px] font-medium tracking-tighter transition-colors duration-300 ${
                isTransparent ? 'text-surface' : 'text-foreground'
              }`}
            >
              Maison & Co
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-sans text-[12px] font-medium tracking-widest uppercase transition-colors duration-200 hover:opacity-60 ${
                    isTransparent ? 'text-surface' : 'text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-4">
              <Link
                href="/cart"
                aria-label={`Shopping cart, ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
                className={`relative transition-colors duration-200 hover:opacity-60 ${
                  isTransparent ? 'text-surface' : 'text-foreground'
                }`}
              >
                <ShoppingBag size={22} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-accent text-surface font-sans text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu toggle */}
              <button
                className={`lg:hidden transition-colors duration-200 ${
                  isTransparent ? 'text-surface' : 'text-foreground'
                }`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background pt-16 lg:hidden"
          >
            <nav className="flex flex-col gap-0 px-6 pt-8" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    className="block font-serif text-[36px] font-light text-foreground py-3 border-b border-border hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <Link
                  href="/cart"
                  className="flex items-center gap-3 font-sans text-[13px] text-muted tracking-widest uppercase"
                >
                  <ShoppingBag size={18} strokeWidth={1.5} />
                  Cart ({cartCount})
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
