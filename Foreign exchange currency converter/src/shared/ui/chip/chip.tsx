import { X } from 'lucide-react'

import { cn } from '@/shared/lib/cn'

import type { ButtonHTMLAttributes } from 'react'

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  removable?: boolean
}

export function Chip({ children, className, removable = false, ...props }: ChipProps) {
  return <button type="button" className={cn('inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 hover:border-slate-500', className)} {...props}>{children}{removable && <X aria-hidden="true" size={13} />}</button>
}
