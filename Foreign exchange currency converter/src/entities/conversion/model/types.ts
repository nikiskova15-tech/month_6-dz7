export interface ConversionLogItem {
  id: string
  from: string
  to: string
  amount: number
  result: number
  rate: number
  timestamp: number
}

export interface FavoritePair {
  from: string
  to: string
}

