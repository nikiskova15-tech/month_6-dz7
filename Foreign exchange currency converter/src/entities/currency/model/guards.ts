import type { CurrencyCode, CurrencyInfo, ExchangeRatesResponse, TimeSeriesResponse } from './types'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isDate(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`))
}

function isPositiveRateRecord(value: unknown): value is Record<string, number> {
  return isRecord(value) && Object.entries(value).every(([code, rate]) => /^[A-Z]{3}$/.test(code) && typeof rate === 'number' && Number.isFinite(rate) && rate > 0)
}

export function isCurrenciesResponse(value: unknown): value is Record<string, string> {
  return isRecord(value) && Object.entries(value).length > 0 && Object.entries(value).every(([code, name]) => /^[A-Z]{3}$/.test(code) && typeof name === 'string')
}

export function isExchangeRatesResponse(value: unknown): value is ExchangeRatesResponse {
  return isRecord(value)
    && typeof value.amount === 'number'
    && Number.isFinite(value.amount)
    && typeof value.base === 'string'
    && /^[A-Z]{3}$/.test(value.base)
    && isDate(value.date)
    && isPositiveRateRecord(value.rates)
}

export function isTimeSeriesResponse(value: unknown): value is TimeSeriesResponse {
  if (!isRecord(value) || typeof value.amount !== 'number' || !Number.isFinite(value.amount)
    || typeof value.base !== 'string' || !/^[A-Z]{3}$/.test(value.base)
    || !isDate(value.start_date) || !isDate(value.end_date) || !isRecord(value.rates)) return false

  return Object.entries(value.rates).every(([date, rates]) => isDate(date) && isPositiveRateRecord(rates))
}

export function isCurrencyCode(value: string, currencies: readonly CurrencyInfo[]): value is CurrencyCode {
  return currencies.some((currency) => currency.code === value)
}

