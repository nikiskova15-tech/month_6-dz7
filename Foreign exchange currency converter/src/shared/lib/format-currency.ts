export function formatCurrency(
  value: number,
  currency: string,
  locale = 'en-US',
  maximumFractionDigits = 2,
): string {
  if (!Number.isFinite(value)) return '—'
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits,
    }).format(value)
  } catch {
    return `${new Intl.NumberFormat(locale, { maximumFractionDigits }).format(value)} ${currency}`
  }
}

export function formatNumber(value: number, maximumFractionDigits = 4, locale = 'en-US'): string {
  if (!Number.isFinite(value)) return '—'
  return new Intl.NumberFormat(locale, { maximumFractionDigits }).format(value)
}
