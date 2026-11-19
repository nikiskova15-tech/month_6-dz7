import { cn } from '@/shared/lib/cn'

import type { HTMLAttributes, ReactNode } from 'react'

export interface TooltipProps extends HTMLAttributes<HTMLSpanElement> {
  content: string
  children: ReactNode
}

export function Tooltip({ content, children, className, ...props }: TooltipProps) {
  return <span className={cn('group relative inline-flex', className)} {...props}><span tabIndex={0} aria-describedby={`tooltip-${content.replaceAll(' ', '-')}`}>{children}</span><span id={`tooltip-${content.replaceAll(' ', '-')}`} role="tooltip" className={cn('pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-700 px-2 py-1 text-xs text-white group-hover:block group-focus-within:block')}>{content}</span></span>
}

