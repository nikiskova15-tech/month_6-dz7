import { MAX_CONVERSION_AMOUNT } from '@/shared/config'

import type { ConversionLogItem } from '@/entities/conversion'

export interface NewConversionInput {
  from: string
  to: string
  amount: number
  result: number
  rate: number
  timestamp?: number
}

export function createConversionLogItem(input: NewConversionInput): ConversionLogItem | null {
  if (!/^[A-Z]{3}$/.test(input.from) || !/^[A-Z]{3}$/.test(input.to)) return null
  if (!Number.isFinite(input.amount) || input.amount < 0 || input.amount > MAX_CONVERSION_AMOUNT) return null
  if (!Number.isFinite(input.result) || input.result < 0 || !Number.isFinite(input.rate) || input.rate <= 0) return null
  return {
    id: globalThis.crypto.randomUUID(),
    from: input.from,
    to: input.to,
    amount: input.amount,
    result: input.result,
    rate: input.rate,
    timestamp: input.timestamp ?? Date.now(),
  }
}

