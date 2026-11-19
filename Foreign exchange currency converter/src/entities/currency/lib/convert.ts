import type { CurrencyCode } from '../model/types'

export interface ConversionResult {
  amount: number
  rate: number
  result: number
}

export function calculateConversion(amount: number, rate: number): ConversionResult {
  if (!Number.isFinite(amount) || amount < 0) throw new RangeError('Amount must be a finite, non-negative number')
  if (!Number.isFinite(rate) || rate <= 0) throw new RangeError('Rate must be a finite positive number')
  return { amount, rate, result: amount * rate }
}

export function getRate(rates: Readonly<Record<string, number>>, from: CurrencyCode, to: CurrencyCode): number | undefined {
  if (from === to) return 1
  return rates[to]
}

