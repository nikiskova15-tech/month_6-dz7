import { describe, expect, it } from 'vitest'

import { contrastRatio, generateShades, hexToHsl, hslToHex, normalizeHex } from './colorMath'
import { generateColors } from './generate'

describe('color math', () => {
  it('round trips RGB based colors through HSL', () => { expect(hslToHex(hexToHsl('#B6363F'))).toBe('#B6363F') })
  it('validates HEX and calculates WCAG contrast', () => { expect(normalizeHex('#abc123')).toBe('#ABC123'); expect(normalizeHex('oops')).toBeNull(); expect(contrastRatio('#000000', '#FFFFFF')).toBe(21) })
  it('creates an ordered shade ramp', () => { expect(generateShades('#4F46E5').map((shade) => shade.step)).toEqual([50,100,200,300,400,500,600,700,800,900,950]) })
  it('keeps locked colors during generation', () => { const colors = Array.from({ length: 5 }, (_, i) => ({ id: `${i}`, hex: '#FF0000', isLocked: i === 2 })); expect(generateColors('triadic', colors)[2]).toEqual(colors[2]) })
})
