import { ArrowDownUp } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { motion } from 'motion/react'

import { cn } from '@/shared/lib'
import { Button } from '@/shared/ui'

import { useSwapShortcut } from '../use-swap-shortcut'

export interface SwapButtonProps {
  onSwap: () => void
  disabled?: boolean
  className?: string
  enableShortcut?: boolean
}

export function SwapButton({ onSwap, disabled = false, className, enableShortcut = true }: SwapButtonProps) {
  useSwapShortcut(onSwap, enableShortcut && !disabled)
  const reduceMotion = useReducedMotion()
  return <Button type="button" variant="ghost" disabled={disabled} aria-label="Swap currencies (Alt+S)" title="Swap currencies · Alt+S" onClick={onSwap} className={className}><motion.span aria-hidden="true" whileTap={reduceMotion ? undefined : { rotate: 180 }} transition={{ duration: 0.2 }}><ArrowDownUp size={18} /></motion.span><span className={cn('sr-only')}>Alt+S</span></Button>
}

