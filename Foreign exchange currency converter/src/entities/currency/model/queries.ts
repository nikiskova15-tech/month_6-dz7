import { useQuery } from '@tanstack/react-query'

import { requestCurrencies, requestHistoricalRates, requestLatestRates } from '../api'

import type { ChartRange } from './types'

export const currencyQueryKeys = {
  all: ['currencies'] as const,
  latest: (base: string, symbols: readonly string[]) => ['rates', 'latest', base, [...symbols].sort()] as const,
  history: (from: string, to: string, range: ChartRange) => ['rates', 'history', from, to, range] as const,
}

export function useCurrencies() {
  return useQuery({
    queryKey: currencyQueryKeys.all,
    queryFn: ({ signal }) => requestCurrencies(signal),
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 7 * 24 * 60 * 60 * 1000,
  })
}

export function useLatestRates(base: string, symbols: readonly string[]) {
  const uniqueSymbols = [...new Set(symbols)].filter((symbol) => symbol !== base)
  return useQuery({
    queryKey: currencyQueryKeys.latest(base, uniqueSymbols),
    queryFn: ({ signal }) => requestLatestRates(base, uniqueSymbols, signal),
    enabled: uniqueSymbols.length > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  })
}

export function useHistoricalRates(from: string, to: string, range: ChartRange) {
  return useQuery({
    queryKey: currencyQueryKeys.history(from, to, range),
    queryFn: ({ signal }) => requestHistoricalRates(from, to, range, signal),
    enabled: from !== to,
    staleTime: 30 * 60 * 1000,
    gcTime: 6 * 60 * 60 * 1000,
  })
}

