import { Layers3 } from 'lucide-react'
import { useState } from 'react'

import { generateShades } from '@/entities/palette'
import { copyText } from '@/shared/lib/hooks'
import { IconButton } from '@/shared/ui'
export function ShadesButton({ hex }: { hex: string }) {
  const [open, setOpen] = useState(false)
  const copyShade = async (shade: string): Promise<void> => { await copyText(shade); window.dispatchEvent(new CustomEvent('paintbox:toast', { detail: `${shade} скопирован` })) }
  return <div className="relative"><IconButton className="size-8" title="Показать оттенки" aria-label="Показать оттенки" onClick={() => setOpen((v) => !v)}><Layers3 size={15} /></IconButton>{open && <div className="absolute right-0 top-9 z-30 w-48 rounded-xl border border-slate-200 bg-white p-2 text-slate-800 shadow-lg">{generateShades(hex).map(({ step, hex: shade }) => <button key={step} className="flex w-full items-center gap-2 rounded-md px-1 py-1 text-xs hover:bg-slate-50" onClick={() => void copyShade(shade)}><i className="size-5 rounded" style={{ backgroundColor: shade }} />{step}<code className="ml-auto font-mono">{shade}</code></button>)}</div>}</div>
}
