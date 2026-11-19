import { Redo2, Undo2 } from 'lucide-react'

import { usePaletteStore } from '@/entities/palette'
import { IconButton } from '@/shared/ui'
export function HistoryButtons() {
  const { undo, redo, past, future } = usePaletteStore()
  return <div className="flex items-center gap-0.5"><IconButton title="Отменить (Ctrl/⌘ Z)" aria-label="Отменить" disabled={!past.length} onClick={undo}><Undo2 size={17} /></IconButton><IconButton title="Повторить (Ctrl/⌘ Shift Z)" aria-label="Повторить" disabled={!future.length} onClick={redo}><Redo2 size={17} /></IconButton></div>
}
