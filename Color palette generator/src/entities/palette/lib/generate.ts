import type { ColorItem, PaletteType } from '../model/types'

import { hslToHex, hexToHsl } from './colorMath'

const id = (): string => globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)
const rand = (min: number, max: number): number => min + Math.random() * (max - min)
const wrap = (h: number): number => (h + 360) % 360
export function generateColors(type: PaletteType, existing: ColorItem[]): [ColorItem, ColorItem, ColorItem, ColorItem, ColorItem] {
  const locked = existing.filter((c) => c.isLocked)
  const baseHue = locked.length ? hexToHsl(locked[0]!.hex).h : rand(0, 360)
  const offsets: Record<PaletteType, number[]> = { random: [0, 38, 145, 208, 320], monochrome: [0, 0, 0, 0, 0], analogous: [-28, -14, 0, 14, 28], complementary: [0, 180, 0, 180, 0], triadic: [0, 120, 240, 120, 240] }
  const result = existing.map((color, index): ColorItem => {
    if (color.isLocked) return color
    const hue = type === 'random' ? wrap(baseHue + offsets[type][index]! + rand(-9, 9)) : wrap(baseHue + offsets[type][index]! + (type === 'monochrome' ? 0 : rand(-5, 5)))
    const saturation = type === 'monochrome' ? rand(38, 78) : rand(45, 82)
    const lightnesses = [rand(72, 88), rand(54, 72), rand(38, 58), rand(28, 48), rand(46, 66)]
    let lightness = lightnesses[index]!
    if (locked.length && existing.some((c) => c.isLocked && Math.abs(hexToHsl(c.hex).l - lightness) < 8)) lightness = lightness < 50 ? lightness + 12 : lightness - 12
    return { id: id(), hex: hslToHex({ h: hue, s: saturation, l: lightness }), isLocked: false }
  })
  return result as [ColorItem, ColorItem, ColorItem, ColorItem, ColorItem]
}
