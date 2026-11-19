import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '../lib/cn'
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost'; children: ReactNode }
export function Button({ variant = 'secondary', className, children, ...props }: ButtonProps) {
  return <button className={cn('inline-flex items-center justify-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium transition hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 disabled:pointer-events-none disabled:opacity-45', variant === 'primary' ? 'bg-slate-950 text-white hover:bg-slate-800' : variant === 'ghost' ? 'bg-transparent text-slate-600 hover:bg-slate-100' : 'border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50', className)} {...props}>{children}</button>
}
