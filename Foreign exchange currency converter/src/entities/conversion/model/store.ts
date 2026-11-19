import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { ConversionLogItem, FavoritePair } from './types'

interface ConversionState {
  favorites: FavoritePair[]
  log: ConversionLogItem[]
  addFavorite: (pair: FavoritePair) => void
  removeFavorite: (pair: FavoritePair) => void
  toggleFavorite: (pair: FavoritePair) => void
  addLogItem: (item: ConversionLogItem) => void
  removeLogItem: (id: string) => void
  clearLog: () => void
}

function samePair(a: FavoritePair, b: FavoritePair): boolean {
  return a.from === b.from && a.to === b.to
}

export const useConversionStore = create<ConversionState>()(persist((set, get) => ({
  favorites: [],
  log: [],
  addFavorite: (pair) => set((state) => state.favorites.some((favorite) => samePair(favorite, pair)) ? state : { favorites: [...state.favorites, pair] }),
  removeFavorite: (pair) => set((state) => ({ favorites: state.favorites.filter((favorite) => !samePair(favorite, pair)) })),
  toggleFavorite: (pair) => {
    const exists = get().favorites.some((favorite) => samePair(favorite, pair))
    if (exists) get().removeFavorite(pair)
    else get().addFavorite(pair)
  },
  addLogItem: (item) => set((state) => {
    const latest = state.log[0]
    if (latest !== undefined && latest.from === item.from && latest.to === item.to && latest.amount === item.amount && latest.result === item.result) return state
    return { log: [item, ...state.log] }
  }),
  removeLogItem: (id) => set((state) => ({ log: state.log.filter((item) => item.id !== id) })),
  clearLog: () => set({ log: [] }),
}), {
  name: 'fx-checker-conversions-v1',
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({ favorites: state.favorites, log: state.log }),
}))

