'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, ShoppingBag, ArrowRight, Package } from 'lucide-react'
import { CartItem } from '@/lib/types'
import {
  getCart,
  removeFromCart,
  updateQuantity,
  getCartTotal,
} from '@/lib/cart'

export default function CartClient() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setCart(getCart())
    setMounted(true)

    const handleUpdate = () => setCart(getCart())
    window.addEventListener('cart-updated', handleUpdate)
    return () => window.removeEventListener('cart-updated', handleUpdate)
  }, [])

  const handleRemove = (id: string) => {
    const updated = removeFromCart(id)
    setCart(updated)
    window.dispatchEvent(new Event('cart-updated'))
  }

  const handleQuantity = (id: string, qty: number) => {
    const updated = updateQuantity(id, qty)
    setCart(updated)
    window.dispatchEvent(new Event('cart-updated'))
  }

  const total = getCartTotal(cart)
  const delivery = total > 0 ? 0 : 0 // Free delivery always
  const tax = total * 0.08
  const grandTotal = total + tax

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background pt-16 lg:pt-20">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
          <h1
            className="font-serif font-light text-foreground tracking-tighter"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            Your Cart
          </h1>
          <p className="font-sans text-[14px] text-muted mt-1">
            {cart.length === 0
              ? 'Your cart is empty.'
              : `${cart.reduce((s, i) => s + i.quantity, 0)} item${cart.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10 lg:py-16">
        {cart.length === 0 ? (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 max-w-md mx-auto"
          >
            <ShoppingBag size={48} strokeWidth={1} className="text-border mx-auto mb-6" />
            <h2 className="font-serif text-[32px] font-light text-foreground mb-3">
              Your cart is empty
            </h2>
            <p className="font-sans text-[15px] text-muted mb-8 leading-relaxed">
              Discover our collection of handcrafted furniture and find pieces you'll treasure for a lifetime.
            </p>
            <Link href="/products" className="btn btn-primary text-[12px] px-8 py-4">
              Explore Collection
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.article
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-5 py-6 border-b border-border"
                  >
                    {/* Image */}
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="flex-shrink-0 relative overflow-hidden bg-[#F0EDE8]"
                      style={{ width: 120, height: 150 }}
                    >
                      {item.product.image_url && (
                        <Image
                          src={item.product.image_url}
                          alt={item.product.name}
                          fill
                          sizes="120px"
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Link
                            href={`/products/${item.product.slug}`}
                            className="font-serif text-[22px] font-medium text-foreground hover:text-accent transition-colors duration-200 block leading-tight"
                          >
                            {item.product.name}
                          </Link>
                          {item.product.material && (
                            <p className="font-sans text-[12px] text-muted tracking-wide uppercase mt-1">
                              {item.product.material}
                            </p>
                          )}
                        </div>
                        <p className="font-serif text-[22px] font-medium price-accent flex-shrink-0">
                          ${(item.product.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 0 })}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity */}
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() => handleQuantity(item.product.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="w-9 h-9 flex items-center justify-center text-foreground hover:bg-border/30 transition-colors font-sans text-[16px]"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-sans text-[13px] font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantity(item.product.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                            className="w-9 h-9 flex items-center justify-center text-foreground hover:bg-border/30 transition-colors font-sans text-[16px]"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => handleRemove(item.product.id)}
                          aria-label={`Remove ${item.product.name} from cart`}
                          className="flex items-center gap-1.5 font-sans text-[12px] text-muted hover:text-foreground transition-colors"
                        >
                          <Trash2 size={14} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>

              {/* Continue shopping */}
              <div className="pt-6">
                <Link
                  href="/products"
                  className="font-sans text-[12px] font-medium tracking-widest uppercase text-foreground flex items-center gap-2 hover:text-accent transition-colors duration-200"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order summary */}
            <aside className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="border border-border p-6 lg:p-8 sticky top-24"
              >
                <h2 className="font-serif text-[24px] font-medium text-foreground mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between font-sans text-[14px]">
                    <span className="text-muted">Subtotal</span>
                    <span className="text-foreground font-medium">
                      ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between font-sans text-[14px]">
                    <span className="text-muted">Delivery</span>
                    <span className="text-accent font-medium">Free</span>
                  </div>
                  <div className="flex justify-between font-sans text-[14px]">
                    <span className="text-muted">Estimated Tax (8%)</span>
                    <span className="text-foreground">
                      ${tax.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-sans text-[14px] font-medium text-foreground">Total</span>
                    <span className="font-serif text-[28px] font-medium price-accent">
                      ${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <button
                  className="btn btn-primary w-full py-4 text-[12px] flex items-center justify-center gap-2"
                  aria-label="Proceed to checkout"
                >
                  Proceed to Checkout
                  <ArrowRight size={14} />
                </button>

                {/* Trust badges */}
                <div className="mt-6 flex items-center justify-center gap-2 text-muted">
                  <Package size={14} strokeWidth={1.5} />
                  <span className="font-sans text-[12px]">Free white-glove delivery included</span>
                </div>
              </motion.div>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}
