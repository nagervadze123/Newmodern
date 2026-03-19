'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'ghost-light'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'px-6 py-3 text-[11px]',
      md: 'px-8 py-[14px] text-[12px]',
      lg: 'px-10 py-4 text-[13px]',
    }

    const variantClasses = {
      primary: 'btn btn-primary',
      ghost: 'btn btn-ghost',
      'ghost-light': 'btn btn-ghost-light',
    }

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={`${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button
