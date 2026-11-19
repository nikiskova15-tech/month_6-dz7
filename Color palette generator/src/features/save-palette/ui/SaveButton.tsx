import { Bookmark } from 'lucide-react'

import { usePaletteStore } from '@/entities/palette'
import { IconButton } from '@/shared/ui'
export function SaveButton() { const save = usePaletteStore((s) => s.save); return <IconButton title="Сохранить палитру" aria-label="Сохранить палитру" onClick={save}><Bookmark size={17} /></IconButton> }
