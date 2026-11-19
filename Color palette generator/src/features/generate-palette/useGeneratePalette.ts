import { useCallback } from 'react'

import { usePaletteStore } from '@/entities/palette'
export function useGeneratePalette(): () => void {
  const generate = usePaletteStore((s) => s.generate)
  return useCallback(() => {
    if (!generate()) window.dispatchEvent(new CustomEvent('paintbox:toast', { detail: 'Все цвета заблокированы' }))
  }, [generate])
}
