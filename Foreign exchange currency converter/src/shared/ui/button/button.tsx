import { cn } from '@/shared/lib/cn'

import type { ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ className, variant = 'secondary', size = 'md', type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={cn('inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors disabled:pointer-events-none disabled:opacity-50', 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400', { 'bg-emerald-400 text-slate-950 hover:bg-emerald-300': variant === 'primary', 'border border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800': variant === 'secondary', 'text-slate-300 hover:bg-slate-800 hover:text-white': variant === 'ghost', 'bg-rose-500/10 text-rose-300 hover:bg-rose-500/20': variant === 'danger', 'px-3 py-1.5 text-xs': size === 'sm', 'px-4 py-2 text-sm': size === 'md', 'px-5 py-3 text-base': size === 'lg' }, className)} {...props} />
}
