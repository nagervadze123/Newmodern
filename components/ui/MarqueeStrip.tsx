interface MarqueeStripProps {
  items?: string[]
}

const DEFAULT_ITEMS = [
  'Free Delivery',
  'Handcrafted',
  'Sustainable Materials',
  'Made to Last',
  'Designed in Europe',
  '10-Year Warranty',
]

export default function MarqueeStrip({ items }: MarqueeStripProps) {
  const list = items && items.length > 0 ? items : DEFAULT_ITEMS
  const repeated = [...list, ...list, ...list, ...list]

  return (
    <div className="overflow-hidden bg-foreground py-4 border-y border-foreground">
      <div className="flex items-center animate-marquee whitespace-nowrap will-change-transform">
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 mx-6">
            <span className="font-sans text-[12px] font-medium tracking-widest uppercase text-surface">
              {item}
            </span>
            <span className="text-accent text-lg leading-none">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
