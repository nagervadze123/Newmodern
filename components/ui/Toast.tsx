'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, AlertCircle } from 'lucide-react'

export type ToastType = 'success' | 'error'

interface ToastProps {
  message: string
  type?: ToastType
  visible: boolean
  onClose: () => void
  duration?: number
}

export default function Toast({
  message,
  type = 'success',
  visible,
  onClose,
  duration = 3500,
}: ToastProps) {
  useEffect(() => {
    if (!visible) return
    const t = setTimeout(onClose, duration)
    return () => clearTimeout(t)
  }, [visible, duration, onClose])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.97 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-4 shadow-xl"
          style={{
            background: type === 'success' ? 'var(--color-foreground)' : '#b91c1c',
            color: 'white',
            minWidth: 260,
          }}
          role="alert"
          aria-live="polite"
        >
          {type === 'success' ? (
            <Check size={16} className="flex-shrink-0 text-accent" />
          ) : (
            <AlertCircle size={16} className="flex-shrink-0 text-red-300" />
          )}
          <span className="font-sans text-[13px] font-medium flex-1">{message}</span>
          <button
            onClick={onClose}
            aria-label="Dismiss notification"
            className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
