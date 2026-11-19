import type { TimeSeriesResponse } from '../model/types'

export function calculatePercentChange(previous: number, current: number): number | null {
  if (!Number.isFinite(previous) || !Number.isFinite(current) || previous <= 0) return null
  return ((current - previous) / previous) * 100
}

export function getLatestDailyChange(series: TimeSeriesResponse, target: string): number | null {
  const dates = Object.keys(series.rates).sort()
  if (dates.length < 2) return null
  const previousDate = dates.at(-2)
  const currentDate = dates.at(-1)
  if (previousDate === undefined || currentDate === undefined) return null
  const previous = series.rates[previousDate]?.[target]
  const current = series.rates[currentDate]?.[target]
  if (previous === undefined || current === undefined) return null
  return calculatePercentChange(previous, current)
}

