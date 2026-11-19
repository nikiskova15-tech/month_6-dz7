import { cn } from '@/shared/lib'

import type { ChartRange } from '@/entities/currency'

const ranges: readonly ChartRange[] = ['1D', '1W', '1M', '1Y', '5Y']

export interface ChartRangeSwitchProps {
  value: ChartRange
  onChange: (range: ChartRange) => void
  className?: string
}

export function ChartRangeSwitch({ value, onChange, className }: ChartRangeSwitchProps) {
  return <div role="group" aria-label="Chart date range" className={cn('inline-flex rounded-xl border border-slate-800 bg-slate-950 p-1', className)}>{ranges.map((range, index) => <button key={range} type="button" title={`${range} · shortcut ${index + 1}`} aria-pressed={value === range} onClick={() => onChange(range)} className={cn('rounded-lg px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-emerald-400', value === range ? 'bg-slate-800 text-emerald-300' : 'text-slate-400 hover:text-slate-100')}>{range}</button>)}</div>
}

