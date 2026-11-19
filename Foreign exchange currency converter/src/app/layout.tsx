import { Outlet } from 'react-router-dom'

import { cn } from '@/shared/lib'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

export function AppLayout() {
  return <div className={cn('min-h-screen bg-[#0b0f17] text-slate-100')}><Header /><Outlet /><Footer /></div>
}

