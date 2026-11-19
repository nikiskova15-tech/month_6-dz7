import { useMemo } from 'react'

import { getLatestDailyChange, RateChangeBadge, useHistoricalRates, useLatestRates, type CurrencyPair } from '@/entities/currency'
import { cn, formatNumber } from '@/shared/lib'
import { Skeleton } from '@/shared/ui'

const marketPairs: readonly CurrencyPair[] = [
  { from: 'EUR', to: 'USD' },
  { from: 'USD', to: 'JPY' },
  { from: 'GBP', to: 'USD' },
  { from: 'USD', to: 'CHF' },
  { from: 'AUD', to: 'USD' },
]

function TickerPair({ pair, onSelect }: { pair: CurrencyPair; onSelect: (pair: CurrencyPair) => void }) {
  const latest = useLatestRates(pair.from, [pair.to])
  const history = useHistoricalRates(pair.from, pair.to, '1W')
  const rate = latest.data?.data.rates[pair.to]
  const change = history.data === undefined ? null : getLatestDailyChange(history.data.data, pair.to)
  if (latest.isLoading || history.isLoading) return <div className={cn('min-w-36 rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3')}><Skeleton className={cn('mb-2 h-3 w-16')} /><Skeleton className={cn('h-4 w-24')} /></div>
  return <button type="button" onClick={() => onSelect(pair)} className={cn('min-w-36 rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-left transition-colors hover:border-slate-600 hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-emerald-400')}><span className={cn('block text-[11px] font-medium text-slate-400')}>{pair.from} / {pair.to}</span><span className={cn('mt-1 flex items-center justify-between gap-3')}><span className={cn('font-mono text-sm text-slate-100')}>{rate === undefined ? '—' : formatNumber(rate, 5)}</span><RateChangeBadge percent={change} /></span></button>
}

export interface MarketTickerProps {
  onSelectPair: (pair: CurrencyPair) => void
}

export function MarketTicker({ onSelectPair }: MarketTickerProps) {
  const pairs = useMemo(() => marketPairs, [])
  return <section aria-label="Popular exchange rates" className={cn('overflow-hidden')}><div className={cn('mb-3 flex items-end justify-between')}><h2 className={cn('text-sm font-semibold text-slate-200')}>Market snapshot</h2><span className={cn('text-[11px] text-slate-500')}>Daily ECB rates · last business day</span></div><div className={cn('flex gap-3 overflow-x-auto pb-2')}>{pairs.map((pair) => <TickerPair key={`${pair.from}-${pair.to}`} pair={pair} onSelect={onSelectPair} />)}</div></section>
}


