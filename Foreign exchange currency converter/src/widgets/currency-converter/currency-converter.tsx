import { ArrowLeftRight, RefreshCw } from 'lucide-react'
import { useEffect, useMemo } from 'react'

import { calculateConversion, useCurrencies, useLatestRates, type CurrencyInfo, type CurrencyPair } from '@/entities/currency'
import { useConversionLogActions } from '@/features/manage-conversion-log'
import { CurrencyPicker } from '@/features/select-currency'
import { SwapButton } from '@/features/swap-currencies'
import { FavoriteToggle } from '@/features/toggle-favorite-pair'
import { MAX_CONVERSION_AMOUNT } from '@/shared/config'
import { cn, formatCurrency, formatNumber, useDebounce } from '@/shared/lib'
import { Button, Input, Skeleton } from '@/shared/ui'

export interface CurrencyConverterProps {
  pair: CurrencyPair
  amount: string
  onPairChange: (pair: CurrencyPair) => void
  onAmountChange: (amount: string) => void
}

function toCurrencyList(data: Record<string, string> | undefined): CurrencyInfo[] {
  if (data === undefined) return []
  return Object.entries(data).map(([code, name]) => ({ code, name }))
}

export function CurrencyConverter({ pair, amount, onPairChange, onAmountChange }: CurrencyConverterProps) {
  const currenciesQuery = useCurrencies()
  const currencies = useMemo(() => toCurrencyList(currenciesQuery.data?.data), [currenciesQuery.data?.data])
  const amountValue = Number(amount)
  const amountIsValid = amount.trim() !== '' && Number.isFinite(amountValue) && amountValue >= 0 && amountValue <= MAX_CONVERSION_AMOUNT
  const ratesQuery = useLatestRates(pair.from, [pair.to])
  const rate = pair.from === pair.to ? 1 : ratesQuery.data?.data.rates[pair.to]
  const conversion = rate !== undefined && amountIsValid ? calculateConversion(amountValue, rate) : undefined
  const reverseRate = rate !== undefined && rate > 0 ? 1 / rate : undefined
  const debouncedAmount = useDebounce(amount, 900)
  const { record } = useConversionLogActions()
  useEffect(() => {
    const value = Number(debouncedAmount)
    if (!Number.isFinite(value) || value < 0 || value > MAX_CONVERSION_AMOUNT || rate === undefined) return
    record({ from: pair.from, to: pair.to, amount: value, result: value * rate, rate })
  }, [debouncedAmount, pair.from, pair.to, rate, record])

  function changePair(next: CurrencyPair): void {
    onPairChange(next)
  }

  const stale = currenciesQuery.data?.stale === true || ratesQuery.data?.stale === true
  const updatedAt = Math.max(currenciesQuery.data?.updatedAt ?? 0, ratesQuery.data?.updatedAt ?? 0)

  return <section className={cn('rounded-3xl border border-slate-800 bg-[#131a26] p-5 shadow-xl sm:p-7')} aria-labelledby="converter-heading">
    <div className={cn('mb-6 flex items-start justify-between gap-4')}><div><p className={cn('text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400')}>Currency converter</p><h1 id="converter-heading" className={cn('mt-1 text-2xl font-semibold text-white')}>Convert at ECB reference rates</h1></div><FavoriteToggle pair={pair} /></div>
    {stale && <div role="status" className={cn('mb-4 rounded-xl border border-amber-700/50 bg-amber-500/10 px-3 py-2 text-xs text-amber-200')}>Offline or showing cached data · updated {updatedAt ? new Date(updatedAt).toLocaleString() : 'previously'}</div>}
    {(ratesQuery.isError || currenciesQuery.isError) && <div role="alert" className={cn('mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-rose-800 bg-rose-500/10 px-3 py-2 text-sm text-rose-200')}><span>{ratesQuery.error?.message ?? currenciesQuery.error?.message ?? 'Could not load currency data'}</span><Button size="sm" onClick={() => { void currenciesQuery.refetch(); void ratesQuery.refetch() }}><RefreshCw size={14} />Retry</Button></div>}
    {ratesQuery.isLoading && <div aria-label="Loading exchange rate" className={cn('mb-4 space-y-2')}><Skeleton className={cn('h-4 w-36')} /><Skeleton className={cn('h-3 w-52')} /></div>}
    {currenciesQuery.isLoading ? <div className={cn('grid gap-3 sm:grid-cols-2')}><Skeleton className={cn('h-20')} /><Skeleton className={cn('h-20')} /></div> : <div className={cn('grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end')}>
      <div className={cn('sm:col-span-3')}><label htmlFor="amount-input" className={cn('mb-2 block text-xs font-medium text-slate-400')}>You send</label><Input id="amount-input" type="number" min="0" max={MAX_CONVERSION_AMOUNT} step="any" inputMode="decimal" value={amount} aria-invalid={amount !== '' && !amountIsValid} onChange={(event) => onAmountChange(event.target.value)} placeholder="0" />{!amountIsValid && amount !== '' && <p className={cn('mt-1 text-xs text-rose-300')}>Enter a non-negative amount up to 1 billion.</p>}</div>
      <CurrencyPicker currencies={currencies} value={pair.from} label="From currency" onChange={(from) => changePair({ ...pair, from })} enableSearchShortcut />
      <SwapButton onSwap={() => changePair({ from: pair.to, to: pair.from })} className={cn('justify-self-center sm:mb-0.5')} />
      <CurrencyPicker currencies={currencies} value={pair.to} label="To currency" onChange={(to) => changePair({ ...pair, to })} />
    </div>}
    <div className={cn('mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 sm:p-5')}>
      {conversion ? <><p className={cn('text-xs text-slate-400')}>You receive</p><p className={cn('mt-1 break-all text-3xl font-semibold tracking-tight text-white sm:text-4xl')}>{formatCurrency(conversion.result, pair.to)}</p><div className={cn('mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 pt-3 text-xs text-slate-400')}><span>1 {pair.from} = {formatNumber(rate ?? 1, 6)} {pair.to}</span><span>1 {pair.to} = {formatNumber(reverseRate ?? 1, 6)} {pair.from}</span></div></> : <p className={cn('text-sm text-slate-500')}>Enter an amount to see the converted value.</p>}
      <Button variant="primary" size="sm" className={cn('mt-4')} disabled={!conversion} onClick={() => { if (conversion && rate !== undefined) record({ from: pair.from, to: pair.to, amount: conversion.amount, result: conversion.result, rate }) }}><ArrowLeftRight size={14} />Fix conversion</Button>
    </div>
    <p className={cn('mt-4 text-[11px] text-slate-500')}>Daily ECB data · rates update on business days. This is a reference rate, not a transaction quote.</p>
  </section>
}


