import { Star } from 'lucide-react'
import { useCallback } from 'react'

import { useConversionStore } from '@/entities/conversion'
import { cn } from '@/shared/lib'

import type { CurrencyPair } from '@/entities/currency'

export interface FavoriteToggleProps {
  pair: CurrencyPair
  className?: string
}

export function FavoriteToggle({ pair, className }: FavoriteToggleProps) {
  const favorites = useConversionStore((state) => state.favorites)
  const toggleFavorite = useConversionStore((state) => state.toggleFavorite)
  const isFavorite = favorites.some((favorite) => favorite.from === pair.from && favorite.to === pair.to)
  const handleClick = useCallback(() => toggleFavorite(pair), [toggleFavorite, pair])
  return <button type="button" aria-pressed={isFavorite} aria-label={isFavorite ? 'Remove pair from favorites' : 'Add pair to favorites'} title={isFavorite ? 'Remove from favorites' : 'Add to favorites'} onClick={handleClick} className={cn('inline-flex size-10 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-800 hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-amber-300', isFavorite && 'text-amber-300', className)}><Star size={18} fill={isFavorite ? 'currentColor' : 'none'} /></button>
}

