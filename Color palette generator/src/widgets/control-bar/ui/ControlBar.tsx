import { ArrowRight, Sparkles } from 'lucide-react'
import { useEffect } from 'react'

import { usePaletteStore, PALETTE_TYPES, TYPE_LABELS } from '@/entities/palette'
import { useGeneratePalette } from '@/features/generate-palette'
import { Button } from '@/shared/ui'
export function ControlBar() {
  const { type, setType } = usePaletteStore()
  const generate = useGeneratePalette()
  useEffect(() => {
    const handle = (event: KeyboardEvent): void => {
      const target = event.target
      const ignored = target instanceof HTMLElement && (target.matches('input, textarea, select, button, [role="button"], [role="tab"], [contenteditable="true"]') || target.isContentEditable)
      if (event.code !== 'Space' || event.repeat || ignored || document.querySelector('[role="dialog"]')) return
      event.preventDefault(); generate()
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [generate])
  return <section className="sticky bottom-4 z-10 mx-auto flex w-fit max-w-[calc(100%-2rem)] items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 p-2.5 shadow-[0_12px_45px_-18px_rgba(15,23,42,.3)] backdrop-blur max-md:bottom-2 max-md:flex-wrap max-md:justify-center"><div className="flex items-center gap-1 overflow-x-auto px-1">{PALETTE_TYPES.map((item) => <button key={item} onClick={() => setType(item)} aria-pressed={type === item} className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-violet-500 ${item === type ? 'bg-violet-50 text-violet-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>{TYPE_LABELS[item]}</button>)}</div><Button variant="primary" className="h-10 px-4" onClick={generate}><Sparkles size={15} />Generate <kbd className="ml-1 rounded border border-white/30 px-1.5 py-0.5 font-mono text-[10px]">Space</kbd><ArrowRight className="ml-1" size={14} /></Button></section>
}
