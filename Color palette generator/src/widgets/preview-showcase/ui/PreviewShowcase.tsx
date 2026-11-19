import { ArrowRight, Check, Menu, Play, Sparkles } from 'lucide-react'

import { usePaletteStore } from '@/entities/palette'
import { hexToHsl, contrastRatio } from '@/entities/palette'
import { useGeneratePalette } from '@/features/generate-palette'
import { LockButton } from '@/features/toggle-color-lock'
import { PreviewThemeButton } from '@/features/toggle-preview-theme'
import { cn } from '@/shared/lib/cn'

export function PreviewShowcase() {
  const { colors, previewTheme } = usePaletteStore()
  const generate = useGeneratePalette()
  const sorted = [...colors].sort((a, b) => hexToHsl(b.hex).l - hexToHsl(a.hex).l)
  const light = previewTheme === 'light'
  const bg = (light ? sorted[0] : sorted[4])!.hex
  const surface = (light ? sorted[1] : sorted[3])!.hex
  const inkCandidate = (light ? sorted[4] : sorted[0])!.hex
  const ink = contrastRatio(inkCandidate, bg) >= 4.5 ? inkCandidate : contrastRatio('#000000', bg) >= contrastRatio('#FFFFFF', bg) ? '#000000' : '#FFFFFF'
  const accents = colors.filter((c) => c.hex !== bg && c.hex !== surface && c.hex !== inkCandidate).sort((a, b) => hexToHsl(b.hex).s - hexToHsl(a.hex).s)
  const accent = accents[0]?.hex ?? colors[2]!.hex
  const secondary = accents[1]?.hex ?? colors[3]!.hex
  return <div className={cn('relative mx-8 my-7 overflow-hidden rounded-3xl border shadow-sm max-md:mx-4', light ? 'border-slate-200' : 'border-slate-700')} style={{ backgroundColor: bg, color: ink }}>
    <div className="flex items-center justify-between border-b px-8 py-4 max-md:px-4" style={{ borderColor: `${ink}20` }}><div className="flex items-center gap-2 font-semibold"><span className="grid size-8 place-items-center rounded-xl" style={{ backgroundColor: accent, color: '#fff' }}><Sparkles size={16} /></span>studio<span style={{ color: accent }}>.</span></div><nav className="flex items-center gap-7 text-xs opacity-75 max-sm:hidden"><a href="#work">Work</a><a href="#process">Process</a><a href="#about">About</a></nav><div className="flex items-center gap-2"><PreviewThemeButton /><button aria-label="Открыть меню" className="sm:hidden"><Menu size={18} /></button><button className="rounded-full px-4 py-2 text-xs font-semibold text-white" style={{ backgroundColor: accent }}>Let’s talk <ArrowRight className="ml-1 inline" size={13} /></button></div></div>
    <div className="grid min-h-[360px] grid-cols-2 items-center gap-6 px-12 py-12 max-md:grid-cols-1 max-md:px-5 max-md:py-8"><div><span className="mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-medium" style={{ backgroundColor: secondary, color: ink }}><i className="size-1.5 rounded-full" style={{ backgroundColor: accent }} />Independent design studio</span><h2 className="max-w-xl text-5xl font-semibold leading-[1.08] tracking-[-.055em] max-sm:text-4xl">Ideas into <span style={{ color: accent }}>impact.</span></h2><p className="mt-5 max-w-sm text-sm leading-6 opacity-65">We build clear, thoughtful digital experiences for brands ready to move forward.</p><div className="mt-7 flex gap-3"><button className="rounded-xl px-5 py-3 text-sm font-medium text-white" style={{ backgroundColor: accent }}>Explore our work <ArrowRight className="ml-2 inline" size={14} /></button><button className="flex items-center gap-2 rounded-xl border px-4 py-3 text-sm" style={{ borderColor: `${ink}30` }}><Play size={14} />Our approach</button></div><div className="mt-9 flex gap-6 text-[11px] opacity-60"><span><Check className="mr-1 inline text-emerald-500" size={13} />Strategy first</span><span><Check className="mr-1 inline text-emerald-500" size={13} />Made with care</span></div></div><div className="relative mx-auto w-full max-w-sm"><div className="absolute -inset-4 rounded-[2rem] opacity-20 blur-2xl" style={{ backgroundColor: secondary }} /><div className="relative aspect-[4/3] overflow-hidden rounded-3xl p-5" style={{ backgroundColor: surface }}><div className="flex items-center justify-between text-xs opacity-60"><span>FIELD NOTES · 001</span><span>2025</span></div><div className="mt-9 flex h-[58%] items-center justify-center rounded-2xl" style={{ backgroundColor: accent }}><div className="grid size-28 place-items-center rounded-full border border-white/50 text-white"><span className="text-center text-3xl font-light">form<br /><span className="text-xs tracking-widest">& function</span></span></div></div><div className="mt-4 flex items-end justify-between"><div><p className="text-lg font-medium">Objects in motion</p><p className="mt-1 text-xs opacity-50">Brand identity · Digital</p></div><span className="grid size-9 place-items-center rounded-full" style={{ backgroundColor: secondary }}><ArrowRight size={15} /></span></div></div></div></div>
    <div className="flex items-center justify-between border-t px-8 py-3 text-[10px] uppercase tracking-widest opacity-50 max-md:px-4" style={{ borderColor: `${ink}20` }}><span>Palette applied to a live interface</span><span>Thoughtful by design · Est. 2025</span></div>
    <div className="absolute bottom-14 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-2xl border border-white/60 bg-white/90 p-1.5 text-slate-700 shadow-xl backdrop-blur"><button onClick={generate} className="rounded-lg bg-slate-950 px-3 py-2 text-xs font-medium text-white">Generate <kbd className="ml-1 font-mono opacity-70">Space</kbd></button>{colors.map((c, i) => <span key={c.id} className="rounded-lg" style={{ backgroundColor: c.hex }}><LockButton index={i} locked={c.isLocked} /></span>)}</div>
  </div>
}
