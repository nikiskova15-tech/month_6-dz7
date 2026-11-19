import { useState } from 'react'

import { cn } from '@/shared/lib'
import { CurrencyConverter } from '@/widgets/currency-converter'
import { MarketTicker } from '@/widgets/market-ticker'
import { MultiCurrencyCompare } from '@/widgets/multi-currency-compare'
import { RateHistoryChart } from '@/widgets/rate-history-chart'

import type { CurrencyPair } from '@/entities/currency'

export function MarketsPage() {
  const [pair, setPair] = useState<CurrencyPair>({ from: 'EUR', to: 'USD' })
  const [amount, setAmount] = useState('100')
  return <div className={cn('mx-auto grid max-w-7xl gap-7 px-4 py-6 sm:px-6 sm:py-10')}><div><p className={cn('text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400')}>Market overview</p><h1 className={cn('mt-1 text-3xl font-semibold text-white')}>Currencies at a glance</h1></div><MarketTicker onSelectPair={setPair} /><div className={cn('grid items-start gap-7 lg:grid-cols-2')}><div className={cn('space-y-7')}><CurrencyConverter pair={pair} amount={amount} onPairChange={setPair} onAmountChange={setAmount} /><RateHistoryChart pair={pair} /></div><MultiCurrencyCompare from={pair.from} amount={Number(amount) >= 0 ? Number(amount) : 0} /></div></div>
}


