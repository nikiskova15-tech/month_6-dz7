import { useEffect } from 'react'

export function ToastProvider() {
  useEffect(() => {
    const toast = (event: Event): void => {
      const message = (event as CustomEvent<string>).detail
      const node = document.createElement('div')
      node.textContent = message
      node.className = 'toast-message'
      document.body.append(node)
      window.setTimeout(() => node.remove(), 2200)
    }
    window.addEventListener('paintbox:toast', toast)
    return () => window.removeEventListener('paintbox:toast', toast)
  }, [])
  return null
}
