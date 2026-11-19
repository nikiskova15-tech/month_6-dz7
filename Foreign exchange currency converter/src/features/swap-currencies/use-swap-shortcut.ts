import { useEffect } from 'react'

export function useSwapShortcut(onSwap: () => void, enabled = true): void {
  useEffect(() => {
    if (!enabled) return
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target
      const editing = target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
      if (event.altKey && event.key.toLowerCase() === 's' && !editing) {
        event.preventDefault()
        onSwap()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onSwap, enabled])
}
