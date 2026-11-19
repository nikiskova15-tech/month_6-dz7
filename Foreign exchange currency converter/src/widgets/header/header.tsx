import { ArrowLeftRight } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { ThemeToggle } from '@/features/toggle-theme'
import { cn } from '@/shared/lib'
import { Burger } from '@/shared/ui'

const links = [
  { to: '/', label: 'Converter' },
  { to: '/markets', label: 'Markets' },
  { to: '/history', label: 'History' },
] as const

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  return <header className={cn('sticky top-0 z-30 border-b border-slate-800 bg-[#0b0f17]/95 backdrop-blur dark:bg-[#0b0f17]/95')}>
    <div className={cn('mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6')}>
      <NavLink to="/" className={cn('inline-flex items-center gap-2 text-lg font-bold tracking-tight text-white')}><span className={cn('inline-flex size-8 items-center justify-center rounded-lg bg-emerald-400 text-slate-950')}><ArrowLeftRight size={18} /></span>FX Checker</NavLink>
      <nav aria-label="Main navigation" className={cn('hidden items-center gap-1 md:flex')}>{links.map((link) => <NavLink key={link.to} to={link.to} end={link.to === '/'} className={({ isActive }) => cn('rounded-lg px-3 py-2 text-sm transition-colors', isActive ? 'bg-slate-800 text-emerald-300' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100')}>{link.label}</NavLink>)}</nav>
      <div className={cn('flex items-center gap-2')}><ThemeToggle /><div className={cn('md:hidden')}><Burger open={menuOpen} onClick={() => setMenuOpen((open) => !open)} /></div></div>
    </div>
    {menuOpen && <nav aria-label="Mobile navigation" className={cn('border-t border-slate-800 bg-[#0b0f17] px-4 py-3 md:hidden')}>{links.map((link) => <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={() => setMenuOpen(false)} className={({ isActive }) => cn('block rounded-lg px-3 py-3 text-sm', isActive ? 'text-emerald-300' : 'text-slate-300')}>{link.label}</NavLink>)}</nav>}
  </header>
}


