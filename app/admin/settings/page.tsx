import { getSettings } from '@/lib/settings'
import SettingsClient from './SettingsClient'

export const metadata = {
  title: 'Site Settings | Maison & Co Admin',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  const settings = await getSettings()
  return <SettingsClient initial={settings} />
}
