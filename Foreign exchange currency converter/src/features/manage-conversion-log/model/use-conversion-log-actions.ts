import { useCallback } from 'react'

import { useConversionStore } from '@/entities/conversion'

import { downloadConversionLogCsv } from '../lib/conversion-csv'
import { createConversionLogItem, type NewConversionInput } from '../lib/record-conversion'

import type { ConversionLogItem } from '@/entities/conversion'

export function useConversionLogActions() {
  const addLogItem = useConversionStore((state) => state.addLogItem)
  const removeLogItem = useConversionStore((state) => state.removeLogItem)
  const clearLog = useConversionStore((state) => state.clearLog)
  const items = useConversionStore((state) => state.log)

  const record = useCallback((input: NewConversionInput): ConversionLogItem | null => {
    const item = createConversionLogItem(input)
    if (item !== null) addLogItem(item)
    return item
  }, [addLogItem])
  const remove = useCallback((id: string) => removeLogItem(id), [removeLogItem])
  const clear = useCallback(() => clearLog(), [clearLog])
  const exportCsv = useCallback(() => downloadConversionLogCsv(items), [items])

  return { record, remove, clear, exportCsv }
}

