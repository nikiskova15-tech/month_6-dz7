import { Lock, LockOpen } from 'lucide-react'

import { usePaletteStore } from '@/entities/palette'
import { IconButton } from '@/shared/ui'
export function LockButton({ index, locked }: { index: number; locked: boolean }) { const toggle = usePaletteStore((s) => s.toggleLock); return <IconButton className="size-8" aria-label={`${locked ? 'Разблокировать' : 'Заблокировать'} цвет ${index + 1}`} title={locked ? 'Разблокировать' : 'Заблокировать'} onClick={() => toggle(index)}>{locked ? <Lock size={15} /> : <LockOpen size={15} />}</IconButton> }
