import { Palette } from 'lucide-react'

import { usePaletteStore } from '@/entities/palette'
import { ExportMenu } from '@/features/export-palette'
import { HistoryButtons } from '@/features/history-undo-redo'
import { SaveButton } from '@/features/save-palette'
import { SegmentedControl } from '@/shared/ui'
export function Header() {
  const { colors, mode, setMode } = usePaletteStore()
  return <header className="flex min-h-[76px] items-center justify-between gap-4 border-b border-slate-200/80 bg-white px-8 max-md:px-4"><a href="#" className="flex items-center gap-2.5 font-semibold tracking-tight text-slate-900"><span className="grid size-9 place-items-center rounded-xl bg-slate-950 text-white"><Palette size={19} /></span><span>paintbox<span className="text-violet-500">.</span></span><span className="ml-1 hidden sm:inline"><i className="inline-flex">{colors.map((c) => <i key={c.id} className="-ml-1 size-2.5 rounded-full border border-white" style={{ backgroundColor: c.hex }} />)}</i></span></a><div className="flex items-center gap-4"><SegmentedControl label="Режим отображения" value={mode} options={[{ value: 'palette', label: 'Palette' }, { value: 'preview', label: 'Preview' }]} onChange={setMode} /><span className="h-7 w-px bg-slate-200" /><HistoryButtons /><SaveButton /><ExportMenu /></div></header>
}
