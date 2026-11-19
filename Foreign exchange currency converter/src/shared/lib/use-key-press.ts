import { useEffect } from 'react'

export function useKeyPress(key: string, handler: (event: KeyboardEvent) => void): void {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === key) handler(event)
    }
    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [key, handler])
}
