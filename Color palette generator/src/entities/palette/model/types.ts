export type PaletteType = 'random' | 'monochrome' | 'analogous' | 'complementary' | 'triadic'
export type ColorItem = { id: string; hex: string; isLocked: boolean; name?: string }
export type Palette = { id: string; colors: [ColorItem, ColorItem, ColorItem, ColorItem, ColorItem]; type: PaletteType }
export type HSLColor = { h: number; s: number; l: number }
export const PALETTE_TYPES: PaletteType[] = ['random', 'monochrome', 'analogous', 'complementary', 'triadic']
export const TYPE_LABELS: Record<PaletteType, string> = { random: 'Random', monochrome: 'Mono', analogous: 'Analogous', complementary: 'Complementary', triadic: 'Triadic' }
