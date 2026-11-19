import { copyText } from '@/shared/lib/hooks'
export async function copyColor(hex: string): Promise<void> {
  await copyText(hex)
  window.dispatchEvent(new CustomEvent('paintbox:toast', { detail: `${hex} скопирован` }))
}
