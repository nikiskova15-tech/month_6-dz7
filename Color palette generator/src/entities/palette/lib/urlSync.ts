import { STARTER_COLORS } from '../../../shared/config/starterPalettes'
import { PALETTE_TYPES, type ColorItem, type PaletteType } from '../model/types'

import { normalizeHex } from './colorMath'
const makeColor = (hex: string): ColorItem => ({ id: `${hex}-${Math.random().toString(36).slice(2)}`, hex, isLocked: false })
export function readPaletteFromUrl(): { colors: [ColorItem, ColorItem, ColorItem, ColorItem, ColorItem]; type: PaletteType } {
  const query = new URLSearchParams(window.location.search)
  const raw = query.get('colors')?.split('-')
  const type = query.get('type')
  if (raw?.length === 5 && raw.every((hex) => normalizeHex(hex) !== null) && type && PALETTE_TYPES.includes(type as PaletteType)) return { colors: raw.map((hex) => makeColor(normalizeHex(hex)!)) as [ColorItem, ColorItem, ColorItem, ColorItem, ColorItem], type: type as PaletteType }
  return { colors: STARTER_COLORS.map(makeColor) as [ColorItem, ColorItem, ColorItem, ColorItem, ColorItem], type: 'analogous' }
}
export function syncPaletteUrl(colors: ColorItem[], type: PaletteType): void {
  const query = new URLSearchParams(window.location.search)
  query.set('colors', colors.map((c) => c.hex.slice(1)).join('-'))
  query.set('type', type)
  window.history.replaceState(null, '', `${window.location.pathname}?${query.toString()}${window.location.hash}`)
}
