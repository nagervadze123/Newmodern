import { supabase } from './supabase'

export interface SiteSettings {
  hero_headline: string
  hero_subtitle: string
  hero_cta1_text: string
  hero_cta2_text: string
  hero_background_image: string
  marquee_items: string[]
  editorial_headline: string
  editorial_cta_text: string
  editorial_background_image: string
  site_name: string
  footer_copyright: string
  contact_email: string
}

export const defaultSettings: SiteSettings = {
  hero_headline: 'Objects made to endure.',
  hero_subtitle:
    'Heirloom-quality furniture for homes with intention. Each piece is handcrafted by master artisans using sustainably sourced materials.',
  hero_cta1_text: 'Shop Collection',
  hero_cta2_text: 'Explore Lookbook',
  hero_background_image:
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1800&q=80',
  marquee_items: [
    'Free Delivery',
    'Handcrafted',
    'Sustainable Materials',
    'Made to Last',
    'Designed in Europe',
    '10-Year Warranty',
  ],
  editorial_headline: 'Built for generations, not seasons.',
  editorial_cta_text: 'Discover the Collection',
  editorial_background_image:
    'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=1600&q=80',
  site_name: 'Maison & Co',
  footer_copyright: `© ${new Date().getFullYear()} Maison & Co. All rights reserved.`,
  contact_email: 'hello@maison-co.com',
}

export async function getSettings(): Promise<SiteSettings> {
  try {
    const { data, error } = await supabase.from('settings').select('key, value')
    if (error || !data) return defaultSettings

    const map: Record<string, string> = {}
    data.forEach(({ key, value }: { key: string; value: string }) => {
      if (value !== null && value !== undefined) map[key] = value
    })

    return {
      hero_headline: map.hero_headline ?? defaultSettings.hero_headline,
      hero_subtitle: map.hero_subtitle ?? defaultSettings.hero_subtitle,
      hero_cta1_text: map.hero_cta1_text ?? defaultSettings.hero_cta1_text,
      hero_cta2_text: map.hero_cta2_text ?? defaultSettings.hero_cta2_text,
      hero_background_image:
        map.hero_background_image ?? defaultSettings.hero_background_image,
      marquee_items: map.marquee_items
        ? JSON.parse(map.marquee_items)
        : defaultSettings.marquee_items,
      editorial_headline:
        map.editorial_headline ?? defaultSettings.editorial_headline,
      editorial_cta_text:
        map.editorial_cta_text ?? defaultSettings.editorial_cta_text,
      editorial_background_image:
        map.editorial_background_image ?? defaultSettings.editorial_background_image,
      site_name: map.site_name ?? defaultSettings.site_name,
      footer_copyright: map.footer_copyright ?? defaultSettings.footer_copyright,
      contact_email: map.contact_email ?? defaultSettings.contact_email,
    }
  } catch {
    return defaultSettings
  }
}

export async function saveSettings(
  updates: Partial<Record<string, string>>
): Promise<void> {
  const rows = Object.entries(updates).map(([key, value]) => ({ key, value }))
  const { error } = await supabase.from('settings').upsert(rows, { onConflict: 'key' })
  if (error) throw error
}
