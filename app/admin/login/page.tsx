import { Suspense } from 'react'
import LoginClient from './LoginClient'

export const metadata = {
  title: 'Admin Login | Maison & Co',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginClient />
    </Suspense>
  )
}
