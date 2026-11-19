declare const currencyCodeBrand: unique symbol

export type CurrencyCode = string & { readonly [currencyCodeBrand]: 'CurrencyCode' }

export interface CurrencyInfo {
  code: string
  name: string
  symbol?: string
}

export interface ExchangeRatesResponse {
  amount: number
  base: string
  date: string
  rates: Record<string, number>
}

export interface TimeSeriesResponse {
  amount: number
  base: string
  start_date: string
  end_date: string
  rates: Record<string, Record<string, number>>
}

export interface CurrencyPair {
  from: string
  to: string
}

export type ChartRange = '1D' | '1W' | '1M' | '1Y' | '5Y'

export interface HistoricalPoint {
  date: string
  rate: number
}

