import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react'

import { cn, formatNumber } from '@/shared/lib'

export interface RateChangeBadgeProps {
  percent: number | null
  className?: string
}

export function RateChangeBadge({ percent, className }: RateChangeBadgeProps) {
  if (percent === null || !Number.isFinite(percent)) return <span className={cn('inline-flex items-center gap-1 text-xs text-slate-400', className)}><Minus size={14} aria-hidden="true" />N/A</span>
  const positive = percent >= 0
  const Icon = positive ? ArrowUpRight : ArrowDownRight
  return <span className={cn('inline-flex items-center gap-1 text-xs tabular-nums', positive ? 'text-emerald-400' : 'text-rose-400', className)}><Icon size={14} aria-hidden="true" />{positive ? '+' : ''}{formatNumber(percent, 2)}%</span>
}
