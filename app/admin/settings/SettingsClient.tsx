'use client'

import { useState, useCallback } from 'react'
import { Plus, Trash2, GripVertical, Save } from 'lucide-react'
import ImageUpload from '@/components/ui/ImageUpload'
import Toast from '@/components/ui/Toast'
import { SiteSettings, saveSettings } from '@/lib/settings'

interface SettingsClientProps {
  initial: SiteSettings
}

type TabKey = 'hero' | 'marquee' | 'editorial' | 'general'

const tabs: { key: TabKey; label: string }[] = [
  { key: 'hero', label: 'Hero Section' },
  { key: 'marquee', label: 'Marquee Strip' },
  { key: 'editorial', label: 'Editorial Banner' },
  { key: 'general', label: 'General' },
]

export default function SettingsClient({ initial }: SettingsClientProps) {
  const [form, setForm] = useState<SiteSettings>(initial)
  const [activeTab, setActiveTab] = useState<TabKey>('hero')
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: 'success' | 'error' }>({
    visible: false,
    message: '',
    type: 'success',
  })

  const set = useCallback(<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }, [])

  // Marquee helpers
  const addMarqueeItem = () => set('marquee_items', [...form.marquee_items, ''])
  const removeMarqueeItem = (i: number) =>
    set('marquee_items', form.marquee_items.filter((_, idx) => idx !== i))
  const updateMarqueeItem = (i: number, val: string) =>
    set(
      'marquee_items',
      form.marquee_items.map((item, idx) => (idx === i ? val : item))
    )
  const moveMarqueeItem = (i: number, dir: -1 | 1) => {
    const items = [...form.marquee_items]
    const j = i + dir
    if (j < 0 || j >= items.length) return
    ;[items[i], items[j]] = [items[j], items[i]]
    set('marquee_items', items)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const updates: Record<string, string> = {
        hero_headline: form.hero_headline,
        hero_subtitle: form.hero_subtitle,
        hero_cta1_text: form.hero_cta1_text,
        hero_cta2_text: form.hero_cta2_text,
        hero_background_image: form.hero_background_image,
        marquee_items: JSON.stringify(form.marquee_items.filter(Boolean)),
        editorial_headline: form.editorial_headline,
        editorial_cta_text: form.editorial_cta_text,
        editorial_background_image: form.editorial_background_image,
        site_name: form.site_name,
        footer_copyright: form.footer_copyright,
        contact_email: form.contact_email,
      }
      await saveSettings(updates)
      setToast({ visible: true, message: 'Settings saved successfully.', type: 'success' })
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Failed to save settings.'
      setToast({ visible: true, message: msg, type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const inputCls =
    'w-full border border-border bg-surface text-foreground font-sans text-[14px] px-4 py-3 focus:outline-none focus:border-foreground transition-colors placeholder:text-muted'
  const labelCls = 'block font-sans text-[12px] font-medium tracking-widest uppercase text-muted mb-2'

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-sans text-[12px] font-medium tracking-widest uppercase text-muted mb-1">
            CMS
          </p>
          <h1 className="font-serif text-[36px] font-light text-foreground tracking-tighter">
            Site Settings
          </h1>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn btn-primary px-6 py-3 text-[12px] flex items-center gap-2 disabled:opacity-50"
        >
          <Save size={14} />
          {saving ? 'Saving…' : 'Save All'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-border mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-shrink-0 px-5 py-3 font-sans text-[12px] font-medium tracking-widest uppercase transition-colors duration-150 border-b-2 -mb-px ${
              activeTab === tab.key
                ? 'border-foreground text-foreground'
                : 'border-transparent text-muted hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── HERO ── */}
      {activeTab === 'hero' && (
        <div className="space-y-6">
          <div>
            <label className={labelCls}>Hero Headline</label>
            <textarea
              value={form.hero_headline}
              onChange={(e) => set('hero_headline', e.target.value)}
              rows={2}
              className={inputCls + ' resize-none'}
              placeholder="Objects made to endure."
            />
            <p className="font-sans text-[12px] text-muted mt-1.5">
              Shown as large serif text on the homepage hero. Keep under 6 words for best impact.
            </p>
          </div>

          <div>
            <label className={labelCls}>Hero Subtitle</label>
            <textarea
              value={form.hero_subtitle}
              onChange={(e) => set('hero_subtitle', e.target.value)}
              rows={3}
              className={inputCls + ' resize-none'}
              placeholder="Heirloom-quality furniture…"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Primary CTA Button</label>
              <input
                type="text"
                value={form.hero_cta1_text}
                onChange={(e) => set('hero_cta1_text', e.target.value)}
                className={inputCls}
                placeholder="Shop Collection"
              />
            </div>
            <div>
              <label className={labelCls}>Secondary CTA Button</label>
              <input
                type="text"
                value={form.hero_cta2_text}
                onChange={(e) => set('hero_cta2_text', e.target.value)}
                className={inputCls}
                placeholder="Explore Lookbook"
              />
            </div>
          </div>

          <ImageUpload
            label="Hero Background Image"
            bucket="hero-images"
            value={form.hero_background_image}
            onChange={(url) => set('hero_background_image', url)}
          />
        </div>
      )}

      {/* ── MARQUEE ── */}
      {activeTab === 'marquee' && (
        <div className="space-y-4">
          <p className="font-sans text-[14px] text-muted leading-relaxed">
            These items scroll continuously across the strip below the hero. Drag the arrows to reorder.
          </p>

          <div className="space-y-2">
            {form.marquee_items.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex flex-col gap-0.5">
                  <button
                    type="button"
                    onClick={() => moveMarqueeItem(i, -1)}
                    disabled={i === 0}
                    aria-label="Move up"
                    className="text-muted hover:text-foreground transition-colors disabled:opacity-20 text-[10px] leading-none"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => moveMarqueeItem(i, 1)}
                    disabled={i === form.marquee_items.length - 1}
                    aria-label="Move down"
                    className="text-muted hover:text-foreground transition-colors disabled:opacity-20 text-[10px] leading-none"
                  >
                    ▼
                  </button>
                </div>
                <GripVertical size={16} className="text-border flex-shrink-0" />
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateMarqueeItem(i, e.target.value)}
                  className={inputCls + ' flex-1'}
                  placeholder={`Item ${i + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeMarqueeItem(i)}
                  aria-label="Remove item"
                  className="flex-shrink-0 text-muted hover:text-foreground transition-colors p-2"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addMarqueeItem}
            className="flex items-center gap-2 font-sans text-[12px] font-medium tracking-widest uppercase text-foreground border border-border px-4 py-2.5 hover:bg-border/20 transition-colors"
          >
            <Plus size={14} />
            Add Item
          </button>
        </div>
      )}

      {/* ── EDITORIAL ── */}
      {activeTab === 'editorial' && (
        <div className="space-y-6">
          <div>
            <label className={labelCls}>Banner Headline</label>
            <textarea
              value={form.editorial_headline}
              onChange={(e) => set('editorial_headline', e.target.value)}
              rows={2}
              className={inputCls + ' resize-none'}
              placeholder="Built for generations, not seasons."
            />
          </div>

          <div>
            <label className={labelCls}>CTA Button Text</label>
            <input
              type="text"
              value={form.editorial_cta_text}
              onChange={(e) => set('editorial_cta_text', e.target.value)}
              className={inputCls}
              placeholder="Discover the Collection"
            />
          </div>

          <ImageUpload
            label="Banner Background Image"
            bucket="hero-images"
            value={form.editorial_background_image}
            onChange={(url) => set('editorial_background_image', url)}
          />
        </div>
      )}

      {/* ── GENERAL ── */}
      {activeTab === 'general' && (
        <div className="space-y-6">
          <div>
            <label className={labelCls}>Site Name</label>
            <input
              type="text"
              value={form.site_name}
              onChange={(e) => set('site_name', e.target.value)}
              className={inputCls}
              placeholder="Maison & Co"
            />
            <p className="font-sans text-[12px] text-muted mt-1.5">
              Shown in the navbar logo and footer.
            </p>
          </div>

          <div>
            <label className={labelCls}>Footer Copyright Text</label>
            <input
              type="text"
              value={form.footer_copyright}
              onChange={(e) => set('footer_copyright', e.target.value)}
              className={inputCls}
              placeholder="© 2026 Maison & Co. All rights reserved."
            />
          </div>

          <div>
            <label className={labelCls}>Contact Email</label>
            <input
              type="email"
              value={form.contact_email}
              onChange={(e) => set('contact_email', e.target.value)}
              className={inputCls}
              placeholder="hello@maison-co.com"
            />
          </div>
        </div>
      )}

      {/* Floating save on mobile */}
      <div className="mt-10 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn btn-primary px-8 py-3.5 text-[12px] flex items-center gap-2 disabled:opacity-50"
        >
          <Save size={14} />
          {saving ? 'Saving…' : 'Save All Changes'}
        </button>
      </div>

      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />
    </div>
  )
}
