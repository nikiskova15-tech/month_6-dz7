import { useEffect } from 'react'

import type { ChartRange } from '@/entities/currency'

const ranges: readonly ChartRange[] = ['1D', '1W', '1M', '1Y', '5Y']

export function useChartRangeShortcut(onChange: (range: ChartRange) => void, enabled = true): void {
  useEffect(() => {
    if (!enabled) return
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target
      const editing = target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
      const index = Number(event.key) - 1
      if (!editing && index >= 0 && index < ranges.length) onChange(ranges[index])
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onChange, enabled])
}
