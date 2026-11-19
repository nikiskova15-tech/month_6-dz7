import { exportToCsv, formatCsv, type CsvCell } from '@/shared/lib'

import type { ConversionLogItem } from '@/entities/conversion'

export function conversionLogToCsv(items: readonly ConversionLogItem[]): string {
  return formatCsv(getConversionRows(items))
}

function getConversionRows(items: readonly ConversionLogItem[]): CsvCell[][] {
  return [
    ['Timestamp', 'From', 'To', 'Amount', 'Result', 'Rate'],
    ...items.map((item) => [new Date(item.timestamp).toISOString(), item.from, item.to, item.amount, item.result, item.rate]),
  ]
}

export function downloadConversionLogCsv(items: readonly ConversionLogItem[]): void {
  exportToCsv('fx-checker-conversions.csv', getConversionRows(items))
}

