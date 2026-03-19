'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '@/components/ui/ProductCard'
import { Product, Category, SortOption } from '@/lib/types'

interface ProductsClientProps {
  initialProducts: Product[]
  initialCategory: Category | 'all'
}

const categories: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All Pieces' },
  { value: 'living-room', label: 'Living Room' },
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'dining', label: 'Dining' },
]

const materials = ['Oak', 'Walnut', 'Linen', 'Bouclé', 'Brass', 'Steel', 'Marble', 'Travertine']

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

export default function ProductsClient({ initialProducts, initialCategory }: ProductsClientProps) {
  const [category, setCategory] = useState<Category | 'all'>(initialCategory)
  const [sort, setSort] = useState<SortOption>('newest')
  const [maxPrice, setMaxPrice] = useState(5000)
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [filterOpen, setFilterOpen] = useState(false)

  const toggleMaterial = (mat: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat]
    )
  }

  const filtered = useMemo(() => {
    let result = [...initialProducts]

    // Category filter
    if (category !== 'all') {
      result = result.filter((p) => p.category === category)
    }

    // Price filter
    result = result.filter((p) => p.price <= maxPrice)

    // Material filter
    if (selectedMaterials.length > 0) {
      result = result.filter((p) =>
        selectedMaterials.some((mat) =>
          p.material?.toLowerCase().includes(mat.toLowerCase())
        )
      )
    }

    // Sort
    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
    else result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    return result
  }, [initialProducts, category, sort, maxPrice, selectedMaterials])

  const FilterSidebar = () => (
    <aside className="w-full lg:w-64 flex-shrink-0" aria-label="Product filters">
      {/* Categories */}
      <div className="mb-8">
        <h3 className="font-sans text-[11px] font-medium tracking-widest uppercase text-muted mb-4">
          Category
        </h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat.value}>
              <button
                onClick={() => setCategory(cat.value)}
                className={`font-sans text-[14px] transition-colors duration-200 block w-full text-left py-1 ${
                  category === cat.value
                    ? 'text-foreground font-medium'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {cat.label}
                {category === cat.value && (
                  <span className="ml-2 inline-block w-4 h-px bg-accent align-middle" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <div className="mb-8 border-t border-border pt-8">
        <h3 className="font-sans text-[11px] font-medium tracking-widest uppercase text-muted mb-4">
          Max Price
        </h3>
        <input
          type="range"
          min={100}
          max={5000}
          step={50}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full"
          aria-label="Maximum price filter"
        />
        <div className="flex justify-between mt-2">
          <span className="font-sans text-[13px] text-muted">$100</span>
          <span className="font-sans text-[13px] font-medium text-foreground">
            ${maxPrice.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Material */}
      <div className="border-t border-border pt-8">
        <h3 className="font-sans text-[11px] font-medium tracking-widest uppercase text-muted mb-4">
          Material
        </h3>
        <div className="space-y-2">
          {materials.map((mat) => (
            <label key={mat} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedMaterials.includes(mat)}
                onChange={() => toggleMaterial(mat)}
                className="flex-shrink-0"
              />
              <span className="font-sans text-[14px] text-muted group-hover:text-foreground transition-colors duration-200">
                {mat}
              </span>
            </label>
          ))}
        </div>
        {selectedMaterials.length > 0 && (
          <button
            onClick={() => setSelectedMaterials([])}
            className="mt-4 font-sans text-[12px] text-accent hover:underline"
          >
            Clear materials
          </button>
        )}
      </div>
    </aside>
  )

  return (
    <div className="min-h-screen bg-background pt-16 lg:pt-20">
      {/* Page header */}
      <div className="border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
          <p className="font-sans text-[12px] font-medium tracking-widest uppercase text-muted mb-2">
            Maison & Co
          </p>
          <h1 className="font-serif font-light text-foreground tracking-tighter"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
            {category === 'all'
              ? 'All Pieces'
              : categories.find((c) => c.value === category)?.label}
          </h1>
          <p className="font-sans text-[14px] text-muted mt-2">
            {filtered.length} piece{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10">
        {/* Mobile filter toggle + sort */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 font-sans text-[12px] font-medium tracking-widest uppercase text-foreground border border-border px-4 py-2.5"
          >
            <SlidersHorizontal size={14} />
            {filterOpen ? 'Close Filters' : 'Filters'}
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="font-sans text-[12px] border border-border bg-background text-foreground px-3 py-2.5 focus:outline-none focus:border-accent"
            aria-label="Sort products"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Mobile filter panel */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden lg:hidden mb-8 border border-border p-6"
            >
              <FilterSidebar />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-12">
          {/* Desktop sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {/* Desktop sort */}
            <div className="hidden lg:flex items-center justify-end mb-8">
              <div className="flex items-center gap-3">
                <span className="font-sans text-[12px] text-muted tracking-widest uppercase">
                  Sort:
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="font-sans text-[12px] border border-border bg-background text-foreground px-3 py-2 focus:outline-none focus:border-accent"
                  aria-label="Sort products"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-serif text-[28px] text-muted font-light mb-4">
                  No pieces found.
                </p>
                <button
                  onClick={() => {
                    setCategory('all')
                    setMaxPrice(5000)
                    setSelectedMaterials([])
                  }}
                  className="font-sans text-[12px] text-accent hover:underline tracking-widest uppercase"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
