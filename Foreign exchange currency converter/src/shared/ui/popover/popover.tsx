import { useState, type ReactNode } from 'react'

import { cn } from '@/shared/lib/cn'

export interface PopoverProps {
  trigger: ReactNode
  children: ReactNode
  className?: string
  label?: string
}

export function Popover({ trigger, children, className, label = 'Open options' }: PopoverProps) {
  const [open, setOpen] = useState(false)
  return <div className={cn('relative inline-block')}><button type="button" aria-label={label} aria-expanded={open} onClick={() => setOpen(!open)}>{trigger}</button>{open && <div className={cn('absolute right-0 top-full z-30 mt-2 min-w-48 rounded-xl border border-slate-700 bg-slate-900 p-3 text-slate-100 shadow-xl', className)}>{children}</div>}</div>
}

