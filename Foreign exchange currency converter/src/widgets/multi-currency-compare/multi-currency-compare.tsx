import { Plus, X } from 'lucide-react'
import { useMemo, useState } from 'react'

import { calculateConversion, useCurrencies, useLatestRates, type CurrencyInfo } from '@/entities/currency'
import { CurrencyPicker } from '@/features/select-currency'
import { cn, formatCurrency } from '@/shared/lib'
import { Button, Skeleton } from '@/shared/ui'

export interface MultiCurrencyCompareProps {
  from: string
  amount: number
}

export function MultiCurrencyCompare({ from, amount }: MultiCurrencyCompareProps) {
  const [targets, setTargets] = useState<string[]>(['EUR', 'GBP', 'JPY'])
  const [newTarget, setNewTarget] = useState('')
  const currencyQuery = useCurrencies()
  const currencies = useMemo(() => Object.entries(currencyQuery.data?.data ?? {}).map(([code, name]): CurrencyInfo => ({ code, name })), [currencyQuery.data?.data])
  const rateQuery = useLatestRates(from, targets)
  const candidates = currencies.filter((currency) => currency.code !== from && !targets.includes(currency.code))

  function addTarget(code: string): void {
    if (code !== from && !targets.includes(code)) {
      setTargets((current) => [...current, code])
      setNewTarget('')
    }
  }

  return <section className={cn('rounded-3xl border border-slate-800 bg-[#131a26] p-5 sm:p-6')} aria-labelledby="compare-heading">
    <div className={cn('mb-4 flex items-center justify-between gap-3')}><div><h2 id="compare-heading" className={cn('font-semibold text-white')}>Compare currencies</h2><p className={cn('mt-1 text-xs text-slate-500')}>{amount} {from} converted side by side</p></div>{rateQuery.isError && <Button size="sm" onClick={() => { void rateQuery.refetch() }}>Retry</Button>}</div>
    {rateQuery.isError && <p role="alert" className={cn('mb-3 text-xs text-rose-300')}>{rateQuery.error.message}</p>}
    <div className={cn('divide-y divide-slate-800')}>{targets.map((target) => {
      const rate = target === from ? 1 : rateQuery.data?.data.rates[target]
      const converted = rate === undefined ? undefined : calculateConversion(amount, rate).result
      return <div key={target} className={cn('flex items-center justify-between gap-3 py-3 first:pt-0')}><div><p className={cn('text-xs text-slate-500')}>{from} → {target}</p>{rateQuery.isLoading ? <Skeleton className={cn('mt-2 h-5 w-28')} /> : <p className={cn('mt-1 font-mono text-lg font-semibold text-slate-100')}>{converted === undefined ? '—' : formatCurrency(converted, target)}</p>}</div><button type="button" aria-label={`Remove ${target}`} onClick={() => setTargets((current) => current.filter((code) => code !== target))} className={cn('rounded-lg p-2 text-slate-500 hover:bg-slate-800 hover:text-slate-200')}><X size={16} /></button></div>
    })}</div>
    {candidates.length > 0 && <div className={cn('mt-4 flex items-end gap-2')}><div className={cn('min-w-0 flex-1')}><CurrencyPicker currencies={candidates} value={newTarget || candidates[0]?.code || ''} label="Add comparison" onChange={setNewTarget} /></div><Button aria-label="Add selected currency" disabled={!newTarget} onClick={() => addTarget(newTarget)}><Plus size={16} />Add</Button></div>}
  </section>
}


