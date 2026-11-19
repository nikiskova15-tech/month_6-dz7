import { cn } from '@/shared/lib'
import { Badge } from '@/shared/ui'

export interface CurrencyBadgeProps {
  code: string
  name?: string
  className?: string
}

export function CurrencyBadge({ code, name, className }: CurrencyBadgeProps) {
  return <Badge className={cn('gap-2 border-slate-700 bg-slate-800 font-mono', className)} title={name ?? code}><span className={cn('size-2 rounded-full bg-emerald-400')} aria-hidden="true" />{code}</Badge>
}

