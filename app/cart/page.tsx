import type { Metadata } from 'next'
import CartClient from './CartClient'

export const metadata: Metadata = {
  title: 'Your Cart',
  description: 'Review your selected Maison & Co pieces before checkout.',
  robots: { index: false, follow: false },
}

export default function CartPage() {
  return <CartClient />
}
