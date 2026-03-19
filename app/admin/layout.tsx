'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Settings, LayoutDashboard, Package, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { href: '/admin/settings', icon: Settings, label: 'Site Settings', exact: false },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Don't show sidebar on login page
  if (pathname === '/admin/login') return <>{children}</>

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  const Sidebar = () => (
    <nav className="flex flex-col h-full" aria-label="Admin navigation">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-border">
        <Link href="/" className="font-serif text-[20px] font-medium tracking-tighter text-foreground block">
          Maison & Co
        </Link>
        <p className="font-sans text-[11px] tracking-widest uppercase text-muted mt-1">
          Admin Panel
        </p>
      </div>

      {/* Nav */}
      <div className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, icon: Icon, label, exact }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 font-sans text-[13px] font-medium transition-colors duration-150 ${
              isActive(href, exact)
                ? 'bg-foreground text-surface'
                : 'text-muted hover:text-foreground hover:bg-border/40'
            }`}
          >
            <Icon size={16} strokeWidth={1.5} />
            {label}
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="px-3 pb-4 border-t border-border pt-4">
        <Link
          href="/products"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 font-sans text-[13px] text-muted hover:text-foreground transition-colors"
        >
          <Package size={16} strokeWidth={1.5} />
          View Store
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 font-sans text-[13px] text-muted hover:text-foreground transition-colors w-full text-left"
        >
          <LogOut size={16} strokeWidth={1.5} />
          Log Out
        </button>
      </div>
    </nav>
  )

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 flex-shrink-0 border-r border-border bg-surface sticky top-0 h-screen overflow-y-auto">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-foreground/30" />
          <aside className="absolute left-0 top-0 bottom-0 w-56 bg-surface flex flex-col shadow-xl z-50">
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-surface sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
            className="text-foreground"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span className="font-serif text-[18px] font-medium tracking-tighter">Admin</span>
          <div className="w-5" />
        </div>

        <main className="flex-1 p-6 lg:p-10 max-w-5xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
