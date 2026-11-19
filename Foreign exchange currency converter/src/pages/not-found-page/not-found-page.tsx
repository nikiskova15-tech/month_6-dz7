import { Link } from 'react-router-dom'

import { cn } from '@/shared/lib'

export function NotFoundPage() {
  return <main className={cn('grid min-h-[65vh] place-items-center px-4 py-16 text-center')}><div><p className={cn('font-mono text-sm text-emerald-400')}>404 · PAGE NOT FOUND</p><h1 className={cn('mt-3 text-4xl font-semibold text-white')}>This route doesn’t exist</h1><p className={cn('mx-auto mt-3 max-w-md text-sm text-slate-400')}>The page may have moved or the address may be incorrect.</p><Link to="/" className={cn('mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-400 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-300')}>Back to converter</Link></div></main>
}


