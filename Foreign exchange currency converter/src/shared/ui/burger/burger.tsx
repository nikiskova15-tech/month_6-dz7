import { Menu, X } from 'lucide-react'

import { cn } from '@/shared/lib/cn'

export interface BurgerProps {
  open: boolean
  onClick: () => void
  className?: string
  label?: string
}

export function Burger({ open, onClick, className, label }: BurgerProps) {
  const accessibleLabel = label ?? (open ? 'Close menu' : 'Open menu')
  return <button type="button" aria-label={accessibleLabel} aria-expanded={open} onClick={onClick} className={cn('inline-flex size-10 items-center justify-center rounded-lg text-slate-200 hover:bg-slate-800', className)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
}
