import { Moon, Sun } from 'lucide-react'

import { usePaletteStore } from '@/entities/palette'
import { IconButton } from '@/shared/ui'
export function PreviewThemeButton() { const theme = usePaletteStore((s) => s.previewTheme); const toggle = usePaletteStore((s) => s.togglePreviewTheme); return <IconButton aria-label={`Тема превью: ${theme}`} title="Сменить тему превью" onClick={toggle}>{theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}</IconButton> }
