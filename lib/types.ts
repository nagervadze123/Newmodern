export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  category: 'living-room' | 'bedroom' | 'dining'
  material: string | null
  image_url: string | null
  images: string[] | null
  in_stock: boolean
  featured: boolean
  created_at: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export type SortOption = 'price-asc' | 'price-desc' | 'newest'

export type Category = 'all' | 'living-room' | 'bedroom' | 'dining'
