import { X } from 'lucide-react'

import { cn } from '@/shared/lib/cn'

import type { ReactNode } from 'react'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  className?: string
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  if (!open) return null
  return <div className={cn('fixed inset-0 z-50 grid place-items-center bg-slate-950/70 p-4')} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section role="dialog" aria-modal="true" aria-label={title} className={cn('w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-5 text-slate-100 shadow-2xl', className)}><header className={cn('mb-4 flex items-center justify-between')}><h2 className={cn('text-lg font-semibold')}>{title}</h2><button type="button" aria-label="Close dialog" onClick={onClose} className={cn('rounded-lg p-2 hover:bg-slate-800')}><X size={18} /></button></header>{children}</section></div>
}

