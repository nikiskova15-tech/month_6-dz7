import { fetchJson } from '@/shared/api'
import { API_BASE_URL } from '@/shared/config'

import { isCurrenciesResponse, isExchangeRatesResponse, isTimeSeriesResponse } from '../model/guards'

import type { ChartRange, ExchangeRatesResponse, TimeSeriesResponse } from '../model/types'
import type { CachedResponse } from '@/shared/api'

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setUTCDate(result.getUTCDate() + days)
  return result
}

function dateString(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function rangeStart(range: ChartRange, now: Date): Date {
  const daysByRange: Record<ChartRange, number> = { '1D': 7, '1W': 10, '1M': 30, '1Y': 365, '5Y': 365 * 5 }
  return addDays(now, -daysByRange[range])
}

export async function requestCurrencies(signal?: AbortSignal): Promise<CachedResponse<Record<string, string>>> {
  return fetchJson(`${API_BASE_URL}/currencies`, isCurrenciesResponse, signal)
}

export async function requestLatestRates(base: string, symbols: readonly string[], signal?: AbortSignal): Promise<CachedResponse<ExchangeRatesResponse>> {
  const query = new URLSearchParams({ base, symbols: symbols.join(',') })
  return fetchJson(`${API_BASE_URL}/latest?${query.toString()}`, isExchangeRatesResponse, signal)
}

export async function requestHistoricalRates(
  from: string,
  to: string,
  range: ChartRange,
  signal?: AbortSignal,
  now = new Date(),
): Promise<CachedResponse<TimeSeriesResponse>> {
  const start = dateString(rangeStart(range, now))
  const end = dateString(now)
  const query = new URLSearchParams({ base: from, symbols: to })
  return fetchJson(`${API_BASE_URL}/${start}..${end}?${query.toString()}`, isTimeSeriesResponse, signal)
}

