'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { motion } from 'framer-motion'

export default function LoginClient() {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') || '/admin'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Login failed.')
        return
      }

      router.push(from)
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-foreground flex items-center justify-center mx-auto mb-6">
            <Lock size={20} className="text-surface" strokeWidth={1.5} />
          </div>
          <h1 className="font-serif text-[32px] font-light text-foreground tracking-tighter">
            Admin Access
          </h1>
          <p className="font-sans text-[14px] text-muted mt-2">
            Maison & Co CMS
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              required
              autoFocus
              className="w-full border border-border bg-surface text-foreground font-sans text-[14px] px-4 py-3.5 pr-12 focus:outline-none focus:border-foreground transition-colors placeholder:text-muted"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
              aria-label={show ? 'Hide password' : 'Show password'}
            >
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <p className="font-sans text-[13px] text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="btn btn-primary w-full py-3.5 text-[12px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying…' : 'Enter Admin'}
          </button>
        </form>

        <p className="text-center font-sans text-[12px] text-muted mt-8">
          Set <code className="text-foreground">ADMIN_PASSWORD</code> in your environment variables.
        </p>
      </motion.div>
    </div>
  )
}
