import { useEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useCurrencies, isCurrencyCode, type CurrencyInfo, type CurrencyPair } from '@/entities/currency'
import { cn } from '@/shared/lib'
import { ConversionLog } from '@/widgets/conversion-log'
import { CurrencyConverter } from '@/widgets/currency-converter'
import { FavoritePairsList } from '@/widgets/favorite-pairs-list'
import { MarketTicker } from '@/widgets/market-ticker'
import { MultiCurrencyCompare } from '@/widgets/multi-currency-compare'
import { RateHistoryChart } from '@/widgets/rate-history-chart'

const defaultPair: CurrencyPair = { from: 'USD', to: 'EUR' }
const defaultAmount = '100'
const maximumAmount = 1_000_000_000

function currencyList(data: Record<string, string> | undefined): CurrencyInfo[] {
  return data === undefined ? [] : Object.entries(data).map(([code, name]) => ({ code, name }))
}

function validAmount(value: string | null): string | null {
  if (value === null || value.trim() === '') return null
  const amount = Number(value)
  return Number.isFinite(amount) && amount >= 0 && amount <= maximumAmount ? value : null
}

export function ConverterPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const currenciesQuery = useCurrencies()
  const currencies = useMemo(() => currencyList(currenciesQuery.data?.data), [currenciesQuery.data?.data])
  const didValidateInitialParams = useRef(false)
  const pair: CurrencyPair = { from: searchParams.get('from') ?? defaultPair.from, to: searchParams.get('to') ?? defaultPair.to }
  const amount = searchParams.get('amount') ?? defaultAmount
  const parsedAmount = Number(amount)
  const amountIsValid = amount.trim() !== '' && Number.isFinite(parsedAmount) && parsedAmount >= 0 && parsedAmount <= maximumAmount

  useEffect(() => {
    if (currencies.length === 0 || didValidateInitialParams.current) return
    const fromValue = searchParams.get('from')
    const toValue = searchParams.get('to')
    const from = fromValue !== null && isCurrencyCode(fromValue, currencies) ? fromValue : defaultPair.from
    const to = toValue !== null && isCurrencyCode(toValue, currencies) ? toValue : defaultPair.to
    const amountValue = validAmount(searchParams.get('amount')) ?? defaultAmount
    didValidateInitialParams.current = true
    const next = new URLSearchParams(searchParams)
    next.set('from', from)
    next.set('to', to)
    next.set('amount', amountValue)
    if (next.toString() !== searchParams.toString()) setSearchParams(next, { replace: true })
  }, [currencies, searchParams, setSearchParams])

  function updatePair(nextPair: CurrencyPair): void {
    const next = new URLSearchParams(searchParams)
    next.set('from', nextPair.from)
    next.set('to', nextPair.to)
    setSearchParams(next, { replace: true })
  }

  function updateAmount(nextAmount: string): void {
    const next = new URLSearchParams(searchParams)
    next.set('amount', nextAmount)
    setSearchParams(next, { replace: true })
  }

  return <div className={cn('mx-auto grid max-w-7xl gap-7 px-4 py-6 sm:px-6 sm:py-10')}>
    <MarketTicker onSelectPair={updatePair} />
    <div className={cn('grid items-start gap-7 lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.8fr)]')}><div className={cn('space-y-7')}><CurrencyConverter pair={pair} amount={amount} onPairChange={updatePair} onAmountChange={updateAmount} /><RateHistoryChart pair={pair} /></div><aside className={cn('space-y-7')}><FavoritePairsList onSelectPair={updatePair} />{amountIsValid && <MultiCurrencyCompare from={pair.from} amount={parsedAmount} />}<ConversionLog /></aside></div>
  </div>
}


