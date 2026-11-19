import { cn } from '@/shared/lib'
import { Modal, Button } from '@/shared/ui'

export interface ClearLogDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export function ClearLogDialog({ open, onClose, onConfirm }: ClearLogDialogProps) {
  return <Modal open={open} onClose={onClose} title="Clear conversion history"><p className={cn('mb-5 text-sm text-slate-300')}>This will permanently remove all saved conversions from this device.</p><div className={cn('flex justify-end gap-2')}><Button onClick={onClose}>Cancel</Button><Button variant="danger" onClick={() => { onConfirm(); onClose() }}>Clear history</Button></div></Modal>
}


