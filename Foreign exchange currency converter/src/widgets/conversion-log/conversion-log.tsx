import { Download, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { useConversionStore } from '@/entities/conversion'
import { useConversionLogActions, ClearLogDialog } from '@/features/manage-conversion-log'
import { cn, formatCurrency } from '@/shared/lib'
import { Button } from '@/shared/ui'

export function ConversionLog() {
  const log = useConversionStore((state) => state.log)
  const { remove, clear, exportCsv } = useConversionLogActions()
  const [confirmClear, setConfirmClear] = useState(false)

  return <section className={cn('rounded-3xl border border-slate-800 bg-[#131a26] p-5 sm:p-6')} aria-labelledby="conversion-log-heading">
    <div className={cn('mb-4 flex flex-wrap items-center justify-between gap-3')}><div><h2 id="conversion-log-heading" className={cn('font-semibold text-white')}>Conversion history</h2><p className={cn('mt-1 text-xs text-slate-500')}>Saved on this device</p></div><div className={cn('flex gap-2')}><Button size="sm" disabled={log.length === 0} onClick={exportCsv}><Download size={14} />CSV</Button><Button size="sm" variant="danger" disabled={log.length === 0} onClick={() => setConfirmClear(true)}><Trash2 size={14} />Clear</Button></div></div>
    {log.length === 0 ? <p className={cn('rounded-xl border border-dashed border-slate-800 px-4 py-8 text-center text-sm text-slate-500')}>Your conversions will appear here.</p> : <div className={cn('overflow-x-auto')}><table className={cn('w-full min-w-[520px] text-left text-sm')}><thead className={cn('text-xs text-slate-500')}><tr><th className={cn('pb-3 pr-3 font-medium')}>Date</th><th className={cn('pb-3 pr-3 font-medium')}>Pair</th><th className={cn('pb-3 pr-3 text-right font-medium')}>Amount</th><th className={cn('pb-3 pr-3 text-right font-medium')}>Result</th><th className={cn('pb-3 text-right font-medium')}>Remove</th></tr></thead><tbody className={cn('divide-y divide-slate-800')}>{log.map((item) => <tr key={item.id} className={cn('text-slate-300')}><td className={cn('py-3 pr-3 text-xs text-slate-500')}>{new Date(item.timestamp).toLocaleString()}</td><td className={cn('py-3 pr-3 font-medium text-slate-200')}>{item.from} → {item.to}</td><td className={cn('py-3 pr-3 text-right font-mono')}>{formatCurrency(item.amount, item.from)}</td><td className={cn('py-3 pr-3 text-right font-mono')}>{formatCurrency(item.result, item.to)}</td><td className={cn('py-3 text-right')}><button type="button" aria-label={`Remove conversion ${item.from} to ${item.to}`} onClick={() => remove(item.id)} className={cn('rounded-lg p-2 text-slate-500 hover:bg-slate-800 hover:text-rose-300')}><Trash2 size={15} /></button></td></tr>)}</tbody></table></div>}
    <ClearLogDialog open={confirmClear} onClose={() => setConfirmClear(false)} onConfirm={clear} />
  </section>
}


