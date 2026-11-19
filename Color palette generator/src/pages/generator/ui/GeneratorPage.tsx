import { useEffect } from 'react'

import { usePaletteStore } from '@/entities/palette'
import { PaletteDots } from '@/entities/palette'
import { ControlBar } from '@/widgets/control-bar'
import { Header } from '@/widgets/header'
import { PaletteCanvas } from '@/widgets/palette-canvas'
import { PreviewShowcase } from '@/widgets/preview-showcase'

export function GeneratorPage() {
  const { mode, colors, saved, undo, redo, restoreSaved } = usePaletteStore()
  useEffect(() => {
    const historyKeys = (event: KeyboardEvent): void => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'z') return
      event.preventDefault(); if (event.shiftKey) redo(); else undo()
    }
    window.addEventListener('keydown', historyKeys)
    return () => window.removeEventListener('keydown', historyKeys)
  }, [undo, redo])
  return <main className="min-h-screen bg-[#f8f9fa] text-slate-900"><Header /><section className="mx-auto flex min-h-[calc(100vh-77px)] max-w-[1600px] flex-col"><div className="flex items-end justify-between px-8 pt-8 max-md:px-4 max-md:pt-6"><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-slate-400">Color system · {String(colors.length).padStart(2, '0')} colors</p><h1 className="mt-2 text-2xl font-semibold tracking-tight">{mode === 'palette' ? 'Find your next palette' : 'See your palette in context'}</h1><p className="mt-1 text-sm text-slate-500">{mode === 'palette' ? 'A little color can change everything.' : 'Your colors, brought to life in a real interface.'}</p></div><span className="hidden items-center gap-2 text-xs text-slate-400 sm:flex"><kbd className="rounded-md border border-slate-200 bg-white px-2 py-1 font-mono text-[10px]">SPACE</kbd> to generate</span></div>{mode === 'palette' ? <PaletteCanvas /> : <PreviewShowcase />}<div className="flex flex-1 items-end justify-between px-8 pb-5 max-md:px-4"><div className="flex items-center gap-3 text-xs text-slate-400"><span className="font-mono">01 — 05</span><span className="h-px w-8 bg-slate-300" /><span>Built for good taste</span></div>{saved.length > 0 && <div className="flex items-center gap-2"><span className="text-xs text-slate-400">Saved · {saved.length}</span><div className="flex">{saved.slice(0, 4).map((palette, i) => <button key={`${palette.colors[0].id}-${i}`} title="Восстановить сохранённую палитру" aria-label={`Восстановить сохранённую палитру ${i + 1}`} onClick={() => restoreSaved(i)} className="-ml-1 rounded-full border-2 border-[#f8f9fa] focus-visible:outline-2 focus-visible:outline-violet-500"><PaletteDots colors={palette.colors} /></button>)}</div></div>}</div><div className="pb-4"><ControlBar /></div></section></main>
}
