import { Check, Copy, Download, Link2 } from 'lucide-react'
import { useState } from 'react'

import { usePaletteStore } from '@/entities/palette'
import { copyText } from '@/shared/lib/hooks'
import { Button } from '@/shared/ui'
export function ExportMenu() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const colors = usePaletteStore((s) => s.colors)
  const copy = async (value: string): Promise<void> => { await copyText(value); setCopied(true); window.setTimeout(() => setCopied(false), 1500) }
  const css = colors.map((color, i) => `  --color-${i + 1}: ${color.hex};`).join('\n')
  const url = `${window.location.origin}${window.location.pathname}?colors=${colors.map((c) => c.hex.slice(1)).join('-')}&type=${usePaletteStore.getState().type}`
  return <div className="relative"><Button onClick={() => setOpen((v) => !v)} aria-expanded={open}><Copy size={15} /> Copy palette</Button>{open && <><button className="fixed inset-0 z-20 cursor-default" aria-label="Закрыть меню экспорта" onClick={() => setOpen(false)} /><div className="absolute right-0 top-12 z-30 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"><p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Export palette</p><button className="export-row" onClick={() => void copy(`:root {\n${css}\n}`)}><Copy size={15} />CSS variables{copied && <Check className="ml-auto text-emerald-500" size={15} />}</button><button className="export-row" onClick={() => void copy(colors.map((c) => c.hex).join(', '))}><Copy size={15} />HEX list</button><button className="export-row" onClick={() => void copy(url)}><Link2 size={15} />Share URL</button><a className="export-row" href={`data:text/plain;charset=utf-8,${encodeURIComponent(`:root {\n${css}\n}`)}`} download="paintbox.css"><Download size={15} />Download CSS</a></div></>}</div>
}
