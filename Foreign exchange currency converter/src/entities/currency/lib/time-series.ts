import type { HistoricalPoint, TimeSeriesResponse } from '../model/types'

export function toHistoricalPoints(series: TimeSeriesResponse, target: string): HistoricalPoint[] {
  return Object.entries(series.rates)
    .flatMap(([date, values]) => {
      const rate = values[target]
      return rate === undefined ? [] : [{ date, rate }]
    })
    .sort((left, right) => left.date.localeCompare(right.date))
}

