import { motion, useReducedMotion } from 'motion/react'

import { usePaletteStore } from '@/entities/palette'
import { ColorColumn } from '@/entities/palette'
import { copyColor } from '@/features/copy-color'
import { ShadesButton } from '@/features/inspect-shades'
import { LockButton } from '@/features/toggle-color-lock'
export function PaletteCanvas() {
  const colors = usePaletteStore((s) => s.colors)
  const reduced = useReducedMotion()
  return <div className="flex min-h-[min(66vh,620px)] gap-3 px-8 py-8 max-md:min-h-0 max-md:flex-col max-md:gap-2 max-md:px-4 max-md:py-5">{colors.map((color, index) => <motion.div key={color.id} className="flex min-w-0 flex-1" animate={{ backgroundColor: 'transparent' }} transition={{ duration: reduced ? 0 : 0.45 }}><ColorColumn color={color} index={index} onHexClick={() => void copyColor(color.hex)} actions={<><ShadesButton hex={color.hex} /><LockButton index={index} locked={color.isLocked} /></>} /></motion.div>)}</div>
}
