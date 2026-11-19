import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '../lib/cn'
export function IconButton({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return <button className={cn('inline-flex size-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-white/80 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-violet-500 disabled:opacity-35', className)} {...props}>{children}</button>
}
