import type { ReactNode } from 'react'

import { contrastText } from '../lib/colorMath'
import type { ColorItem } from '../model/types'

import { cn } from '@/shared/lib/cn'

export function PaletteDots({ colors, className }: { colors: ColorItem[]; className?: string }) {
  return <span className={cn('inline-flex -space-x-1', className)} aria-label="Текущие цвета палитры">{colors.map((color) => <i key={color.id} className="size-3 rounded-full border-2 border-white" style={{ backgroundColor: color.hex }} />)}</span>
}
export type ColorColumnProps = { color: ColorItem; index: number; actions?: ReactNode; onHexClick: () => void }
export function ColorColumn({ color, index, actions, onHexClick }: ColorColumnProps) {
  return <div className="color-column group relative flex min-h-[290px] flex-1 flex-col justify-between overflow-hidden rounded-2xl p-4 shadow-sm transition-[flex] duration-300 hover:flex-[1.08] max-md:min-h-0 max-md:min-h-[92px] max-md:flex-row max-md:items-center" style={{ backgroundColor: color.hex }}>
    <div className="flex items-start justify-between"><span className="text-xs font-medium opacity-70">0{index + 1}</span><div style={{ color: contrastText(color.hex) }} className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">{actions}</div></div>
    <button style={{ color: contrastText(color.hex) }} className="w-fit rounded-md font-mono text-sm font-semibold tracking-wide hover:underline focus-visible:outline-2 focus-visible:outline-offset-4" onClick={onHexClick} aria-label={`Скопировать цвет ${color.hex}`}>{color.hex}</button>
  </div>
}
