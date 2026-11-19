import type { CurrencyInfo } from '@/entities/currency'

export function filterCurrencies(currencies: readonly CurrencyInfo[], query: string): CurrencyInfo[] {
  const normalized = query.trim().toLocaleLowerCase()
  if (normalized.length === 0) return [...currencies]
  return currencies.filter(({ code, name }) => code.toLocaleLowerCase().includes(normalized) || name.toLocaleLowerCase().includes(normalized))
}

