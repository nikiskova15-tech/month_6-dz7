import { cn } from '@/shared/lib'
import { ConversionLog } from '@/widgets/conversion-log'

export function HistoryPage() {
  return <main className={cn('mx-auto grid min-h-[65vh] max-w-7xl content-start gap-6 px-4 py-8 sm:px-6 sm:py-12')}><div><p className={cn('text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400')}>Your activity</p><h1 className={cn('mt-1 text-3xl font-semibold text-white')}>Conversion history</h1><p className={cn('mt-2 max-w-xl text-sm text-slate-400')}>Review, remove, or export conversions saved in this browser.</p></div><ConversionLog /></main>
}


