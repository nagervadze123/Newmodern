import Link from 'next/link'
import { Settings, Package, ArrowRight, Image as ImageIcon } from 'lucide-react'

export const metadata = {
  title: 'Admin Dashboard | Maison & Co',
  robots: { index: false, follow: false },
}

const cards = [
  {
    href: '/admin/settings',
    icon: Settings,
    title: 'Site Settings',
    description:
      'Edit hero headline, marquee text, editorial banner, site name, and all images.',
  },
  {
    href: '/products',
    icon: Package,
    title: 'Products',
    description:
      'Manage your product catalogue directly in the Supabase dashboard.',
    external: true,
  },
]

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-10">
        <p className="font-sans text-[12px] font-medium tracking-widest uppercase text-muted mb-1">
          Welcome back
        </p>
        <h1 className="font-serif text-[40px] font-light text-foreground tracking-tighter">
          Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {cards.map(({ href, icon: Icon, title, description, external }) => (
          <Link
            key={href}
            href={href}
            target={external ? '_blank' : undefined}
            className="group block border border-border bg-surface p-6 hover:border-foreground transition-colors duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 border border-border flex items-center justify-center text-muted group-hover:border-foreground group-hover:text-foreground transition-colors">
                <Icon size={18} strokeWidth={1.5} />
              </div>
              <ArrowRight
                size={16}
                className="text-muted group-hover:text-foreground transition-colors mt-1"
              />
            </div>
            <h2 className="font-serif text-[22px] font-medium text-foreground mb-2">
              {title}
            </h2>
            <p className="font-sans text-[13px] text-muted leading-relaxed">
              {description}
            </p>
          </Link>
        ))}
      </div>

      {/* Info box */}
      <div className="mt-8 border border-border p-5 bg-surface">
        <div className="flex gap-3">
          <ImageIcon size={16} strokeWidth={1.5} className="text-accent flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-sans text-[13px] font-medium text-foreground mb-1">
              Image uploads require Storage buckets
            </p>
            <p className="font-sans text-[13px] text-muted leading-relaxed">
              Before uploading images, run{' '}
              <code className="text-foreground text-[12px]">supabase/storage-setup.sql</code>{' '}
              in your Supabase SQL editor and create buckets named{' '}
              <code className="text-foreground text-[12px]">product-images</code> and{' '}
              <code className="text-foreground text-[12px]">hero-images</code> in the Storage
              section.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
