import { useEffect } from 'react'
export function useKeyboardShortcut(key: string, handler: (event: KeyboardEvent) => void, enabled = true): void {
  useEffect(() => {
    if (!enabled) return
    const listener = (event: KeyboardEvent): void => { if (event.key.toLowerCase() === key.toLowerCase()) handler(event) }
    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [key, handler, enabled])
}
export async function copyText(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text)
  else { const input = document.createElement('textarea'); input.value = text; document.body.append(input); input.select(); document.execCommand('copy'); input.remove() }
}
