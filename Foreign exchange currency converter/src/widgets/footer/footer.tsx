import { cn } from '@/shared/lib'

export function Footer() {
  return <footer className={cn('border-t border-slate-800 px-4 py-6 text-center text-xs text-slate-500')}><p>Reference rates from the European Central Bank via Frankfurter.</p><p className={cn('mt-1')}>Rates update on ECB business days. Data is for informational purposes.</p></footer>
}


