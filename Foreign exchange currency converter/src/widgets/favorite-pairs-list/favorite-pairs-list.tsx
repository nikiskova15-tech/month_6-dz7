import { useQueries } from '@tanstack/react-query'
import { ArrowRight, Star } from 'lucide-react'

import { useConversionStore } from '@/entities/conversion'
import { currencyQueryKeys, requestLatestRates, type CurrencyPair } from '@/entities/currency'
import { cn, formatNumber } from '@/shared/lib'
import { Skeleton } from '@/shared/ui'

export interface FavoritePairsListProps {
  onSelectPair: (pair: CurrencyPair) => void
}

export function FavoritePairsList({ onSelectPair }: FavoritePairsListProps) {
  const favorites = useConversionStore((state) => state.favorites)
  const queries = useQueries({ queries: favorites.map((pair) => ({
    queryKey: currencyQueryKeys.latest(pair.from, [pair.to]),
    queryFn: ({ signal }: { signal: AbortSignal }) => requestLatestRates(pair.from, [pair.to], signal),
    enabled: pair.from !== pair.to,
    staleTime: 5 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  })) })

  return <section className={cn('rounded-3xl border border-slate-800 bg-[#131a26] p-5 sm:p-6')} aria-labelledby="favorites-heading">
    <div className={cn('mb-4 flex items-center gap-2')}><Star size={16} className={cn('text-amber-300')} fill="currentColor" /><h2 id="favorites-heading" className={cn('font-semibold text-white')}>Favorite pairs</h2></div>
    {favorites.length === 0 ? <p className={cn('rounded-xl border border-dashed border-slate-800 px-4 py-6 text-center text-sm text-slate-500')}>Star a pair to keep it here.</p> : <ul className={cn('space-y-2')}>{favorites.map((pair, index) => {
      const query = queries[index]
      const rate = pair.from === pair.to ? 1 : query?.data?.data.rates[pair.to]
      return <li key={`${pair.from}-${pair.to}`}><button type="button" onClick={() => onSelectPair(pair)} className={cn('flex w-full items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/40 px-3 py-3 text-left hover:border-slate-600')}><span><span className={cn('block text-sm font-medium text-slate-200')}>{pair.from} <ArrowRight className={cn('inline')} size={13} /> {pair.to}</span><span className={cn('mt-1 block font-mono text-xs text-slate-500')}>{query?.isLoading ? <Skeleton className={cn('h-3 w-20')} /> : rate === undefined ? 'Rate unavailable' : formatNumber(rate, 6)}</span></span><span className={cn('text-[10px] uppercase tracking-wide text-slate-500')}>{query?.isError ? 'Retry on open' : query?.data?.stale ? 'Cached' : 'Latest'}</span></button></li>
    })}</ul>}
  </section>
}


