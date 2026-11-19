import type { HSLColor } from '../model/types'

export const normalizeHex = (hex: string): string | null => {
  const value = hex.trim().replace(/^#/, '')
  return /^[\da-fA-F]{6}$/.test(value) ? `#${value.toUpperCase()}` : null
}
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const valid = normalizeHex(hex)
  if (!valid) throw new Error('Invalid HEX color')
  const n = Number.parseInt(valid.slice(1), 16)
  return { r: n >> 16, g: (n >> 8) & 255, b: n & 255 }
}
export function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('').toUpperCase()}`
}
export function hexToHsl(hex: string): HSLColor {
  const { r: rr, g: gg, b: bb } = hexToRgb(hex)
  const r = rr / 255, g = gg / 255, b = bb / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min
  let h = 0, s = 0
  const l = (max + min) / 2
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1))
    if (max === r) h = ((g - b) / d) % 6
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h *= 60
  }
  return { h: (h + 360) % 360, s: s * 100, l: l * 100 }
}
export function hslToHex({ h, s, l }: HSLColor): string {
  const hue = ((h % 360) + 360) % 360 / 360, sat = Math.max(0, Math.min(100, s)) / 100, light = Math.max(0, Math.min(100, l)) / 100
  const chroma = (1 - Math.abs(2 * light - 1)) * sat
  const x = chroma * (1 - Math.abs((hue * 6) % 2 - 1)), m = light - chroma / 2
  const sectors: [number, number, number][] = [[chroma, x, 0], [x, chroma, 0], [0, chroma, x], [0, x, chroma], [x, 0, chroma], [chroma, 0, x]]
  const [r, g, b] = sectors[Math.floor(hue * 6) % 6]!
  return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255)
}
const luminance = (hex: string): number => Object.values(hexToRgb(hex)).map((v) => { const c = v / 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4 }).reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i]!, 0)
export function contrastRatio(a: string, b: string): number { const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05) }
export function contrastText(hex: string): '#000000' | '#FFFFFF' { return contrastRatio(hex, '#000000') >= contrastRatio(hex, '#FFFFFF') ? '#000000' : '#FFFFFF' }
export function generateShades(hex: string): { step: number; hex: string }[] {
  const base = hexToHsl(hex)
  return [50,100,200,300,400,500,600,700,800,900,950].map((step) => ({ step, hex: hslToHex({ h: base.h, s: base.s * (step < 500 ? 0.72 + step / 1800 : 1), l: 98 - (step / 1000) * 88 }) }))
}

